import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, ShieldCheck } from "lucide-react"
import { setPasswordSchema } from "../schemas/authSchemas"
import { useNavigate, useLocation } from "react-router"
import { confirmPasswordReset } from "../services/authService"
import toast from "react-hot-toast"

/**
 * SetNewPasswordPage
 *
 * Expects to receive via React Router location.state:
 *   - phone {string} The raw phone number (024...) — passed from OtpVerificationPage
 *
 * After a successful password reset, navigates the user to login.
 */
export default function SetNewPasswordPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const { phone_number = "", token = "" } = location.state || {}

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  // const password = watch("password")

  // Simple strength indicator
//   function getStrength(pw) {
//     if (!pw) return null
//     if (pw.length < 8) return { label: "Too short", color: "bg-red-400", width: "w-1/4" }
//     if (pw.length < 10) return { label: "Weak", color: "bg-orange-400", width: "w-2/4" }
//     if (!/[A-Z]/.test(pw) || !/\d/.test(pw)) return { label: "Fair", color: "bg-yellow-400", width: "w-3/4" }
//     return { label: "Strong", color: "bg-[#1D9E75]", width: "w-full" }
//   }

//   const strength = getStrength(password)

  async function onSubmit(data) {
    try {
      const response = await confirmPasswordReset({phone_number, token, password: data.password});
      toast.success(response.detail || "Password updated successfully");
      navigate("/login", {
        state: {
          message: "Password updated. Sign in with your new password"
        }
      })
      
    } catch (error) {
      const message = error.response?.data?.detail || error.response?.data?.message || "Could not reset your password, Try again"
      toast.error(message);
    }
    // console.log("Resetting password:", payload)

    // Send user to login after successful reset
    navigate("/login", {
      state: { message: "Password updated. Sign in with your new password." },
    })
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">

        {/* Icon + heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#1D9E75] mb-4">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Set new password</h1>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Choose a strong password for your account.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

          {/* New password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New password
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                className="w-full h-11 px-3 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-primary/20 focus:border-primary
                  focus:ring-2 focus:ring-[#1D9E75]/20 focus:border-[#1D9E75]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Strength bar */}
            {/* {password && strength && (
              <div className="mt-2">
                <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${strength.color} ${strength.width}`} />
                </div>
                <p className={`text-xs mt-1 font-medium
                  ${strength.label === "Strong" ? "text-[#0F6E56]" : ""}
                  ${strength.label === "Fair" ? "text-yellow-600" : ""}
                  ${strength.label === "Weak" ? "text-orange-500" : ""}
                  ${strength.label === "Too short" ? "text-red-500" : ""}`}
                >
                  {strength.label}
                </p>
              </div>
            )} */}

            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm password
            </label>
            <div className="relative">
              <input
                {...register("confirmPassword")}
                type={showConfirm ? "text" : "password"}
                placeholder="Repeat your password"
                className="w-full h-11 px-3 pr-10 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder-gray-400 outline-none transition
                focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Checklist */}
          {/* <ul className="space-y-1.5 pt-1">
            {[
              { label: "At least 8 characters", pass: password.length >= 8 },
              { label: "Contains an uppercase letter", pass: /[A-Z]/.test(password) },
              { label: "Contains a number", pass: /\d/.test(password) },
            ].map(({ label, pass }) => (
              <li key={label} className="flex items-center gap-2 text-xs">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0
                  ${pass ? "bg-[#1D9E75]" : "bg-gray-200"}`}
                >
                  {pass && (
                    <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="2 6 5 9 10 3"/>
                    </svg>
                  )}
                </span>
                <span className={pass ? "text-gray-700" : "text-gray-400"}>{label}</span>
              </li>
            ))}
          </ul> */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 rounded-lg bg-[#1D9E75] hover:bg-[#189065] text-white text-sm font-semibold transition disabled:opacity-60 mt-2"
          >
            {isSubmitting ? "Saving…" : "Save new password"}
          </button>

        </form>

      </div>
    </div>
  )
}