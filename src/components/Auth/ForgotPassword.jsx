import { useState } from "react";

// Packages and Libraries
import { useNavigate } from "react-router-dom";

// Images
import netra3Icon from "../../assets/images/netraIcon.png"
import authImage from "../../assets/images/authImage.png"

export default function ForgotPassword({ handleLogin }) {

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("")

  const [codeSent, setCodeSent] = useState(false)

  const handleCodeSent = () => setCodeSent(true)

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email });
  };

const navigateToResetPassword = () => navigate("/resetPassword")

  return (
    <div className="flex bg-white min-h-screen">
      {/* Left section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 py-12">
        {/* Logo & Tagline */}
        <div className="mb-8 flex flex-row items-center">
          <img src={netra3Icon} alt="Logo" className="h-25 mb-2" />
          <h1 className="text-2xl font-semibold text-[var(--theme-color)]">Your AI Guardian</h1>
        </div>

        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-1">Forgot Password</h2>
          <p className="text-gray-500 mb-6">Enter the email address associated with your account and we will send you a verification code to reset your password</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type={codeSent ? "text" : "email" } 
              placeholder={codeSent ? "Type Code" : "Enter your email"} 
              value={codeSent ? code : email}
              onChange={codeSent ? (e) => setCode(e.target.value) : (e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
              required
            />

            <button type="submit" className="w-full py-4 bg-[var(--theme-color)] text-white rounded-md hover:bg-white border border-[var(--theme-color)] hover:text-[var(--theme-color)] transition" 
            onClick={codeSent ? navigateToResetPassword : handleCodeSent} >
              Continue
            </button>

          </form>

        </div>
      </div>

      {/* Right section */}
      <div className="hidden md:block w-1/2 relative">
        <img
          src={authImage} // Replace with your image path
          alt="Security Camera"
          className="h-screen w-300 object-right absolute top-0 left-0 right-0 bottom-0"
        />
      </div>
    </div>
  );
}
