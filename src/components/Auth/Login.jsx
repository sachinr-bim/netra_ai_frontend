import { useState } from "react";

// Packages and Libraries
import { useNavigate } from "react-router-dom";

// Icons
import GoogleIcon from "../../assets/icons/GoogleIcon";

// Images
import netra3Icon from "../../assets/images/netraIcon.png"
import authImage from "../../assets/images/authImage.png"

export default function Login({ handleLogin }) {

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password, rememberMe });
  };

  const navigateToSignUp = () => navigate("/signup")
  const navigateToForgotPassword = () => navigate("/forgotPassword")

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
          <h2 className="text-2xl font-bold mb-1">Sign in account</h2>
          <p className="text-gray-500 mb-6">Collaborate with the best brands.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
              required
            />

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
              required
            />

            <div className="flex items-center justify-between text-md">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="accent-orange-500" />
                Remember me
              </label>
              <a onClick={navigateToForgotPassword} className="text-[var(--theme-color)] hover:underline cursor-pointer">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="w-full py-3 bg-[var(--theme-color)] text-white rounded-md hover:bg-white border border-[var(--theme-color)] hover:text-[var(--theme-color)] transition" >
              Continue
            </button>

            {/* <div className="flex items-center gap-2 my-4">
              <div className="flex-grow border-t" />
              <span className="text-gray-400">Or</span>
              <div className="flex-grow border-t" />
            </div> */}

            {/* <button
              type="button"
              className="w-full py-3 border border-gray-300 rounded-md font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
            >
              <GoogleIcon height="2em" /> Sign up with Google
            </button> */}
          </form>

          <p className="text-sm mt-4 text-center text-gray-600">
            Don’t have an account?{" "}
            <a className="text-orange-500 cursor-pointer hover:underline" onClick={navigateToSignUp}>
              Signup
            </a>
          </p>
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
