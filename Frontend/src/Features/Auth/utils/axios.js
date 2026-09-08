import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    headers: {
        "Content-Type" : 'application/json'
    },
    withCredentials: true,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('access_token');
        if(accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

//  RESPONSE INTERCEPTOR    
api.interceptors.response.use(
    (response) => response.data,

    async(error) => {
        const originalRequest = error.config;

            const authEndpoints = ['/users/login/', '/users/register/', '/users/verify-otp/', '/users/token-refresh/'];
            const isAuthEndpoint = authEndpoints.some((url) => originalRequest.url.includes(url));        

        if(error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
            originalRequest._retry = true; //prevent infinite retry loops
            
            const refreshToken = localStorage.getItem('refresh_token');
            if(!refreshToken) {
                handleLogout();
                return Promise.reject(error)
            }

            try {
                
                const { data } = await axios.post('http://localhost:8000/users/token-refresh/', {
                    refresh: refreshToken,
                });


                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);


                originalRequest.headers.Authorization = `Bearer ${data.access}`;
                return api(originalRequest);
                
            } catch (refreshError) {
                handleLogout();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error)
    }
);


function handleLogout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
    window.location.href = '/login';
}

export default api;