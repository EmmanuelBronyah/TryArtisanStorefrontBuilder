import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import LoginPage from "./Features/Auth/pages/loginPage";
import AuthFlow from "./Features/Auth/pages/authFlow";
import ForgotPasswordPage from "./Features/Auth/pages/forgotPasswordPage";
import OtpVerificationPage from "./Features/Auth/pages/otpVerificationPage";
import SetNewPasswordPage from "./Features/Auth/pages/setNewPassword";
import { AuthProvider } from "./Features/Auth/context/AuthContext";
import { ProtectedRoute } from "./Features/Auth/components/protectedRoute";
import HomePage from "./Features/Home/homePage";
import { Toaster } from "react-hot-toast";

function App() {
  return(
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-center"/>
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace/>}/>
          <Route path="register" element={<AuthFlow />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="forgotpassword" element={<ForgotPasswordPage />} />
          <Route path="verify-otp" element={<OtpVerificationPage />} />
          <Route path="set-new-password" element={<SetNewPasswordPage />} />

          {/* Protect routes */}          
          <Route element={<ProtectedRoute />}>
            <Route path="home" element={<HomePage />}/>
          </Route> 
        </Routes>
        

     

      </AuthProvider>
    </BrowserRouter>

  )
}

export default App;