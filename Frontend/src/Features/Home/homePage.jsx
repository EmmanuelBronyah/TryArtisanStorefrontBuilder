import { useAuth } from "../Auth/context/AuthContext"
import { useNavigate } from 'react-router'



export default function HomePage() {
    const {logout} = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        navigate("/login");
    }    
    
    return(
        <div>
            <h1>This is the homepage</h1>
            <button
            className="border px-4 py-2 mt-4"
            onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    )
} 