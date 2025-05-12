import { useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, verifyPasswordToken } from "../../reduxToolkit/slices/authSlice";

// Packages and Libraries
import { useNavigate } from "react-router-dom";

// Images
import netra3Icon from "../../assets/images/netraIcon.png"
import authImage from "../../assets/images/authImage.png"

export default function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [tokenError, setTokenError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) setEmailError("");
  };

  const handleTokenChange = (e) => {
    const value = e.target.value;
    // Ensure only numbers are entered
    if (/^\d*$/.test(value)) {
      setCode(value);
      if (tokenError) setTokenError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!codeSent) {
      if (!validateEmail(email)) {
        setEmailError("Please enter a valid email address");
        return;
      }
      
      try {
        const resultAction = await dispatch(forgotPassword(email));
        if (forgotPassword.fulfilled.match(resultAction)) {
          setCodeSent(true);
        }
      } catch (err) {
        console.error("Failed to send code:", err);
      }
    } else {
      if (code.length !== 4) {  // Assuming 4-digit code
        setTokenError("Verification code must be 4 digits");
        return;
      }

      try {
        const resultAction = await dispatch(verifyPasswordToken({ 
          email, 
          token: parseInt(code) // Ensure token is sent as number
        }));
        
        if (verifyPasswordToken.fulfilled.match(resultAction)) {
          navigate("/resetPassword", { state: { email, token: parseInt(code) } });
          console.log('Code Data', email,code)
        }
      } catch (err) {
        console.error("Verification failed:", err);
        setTokenError("Invalid verification code. Please try again.");
      }
    }
  };

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
          <p className="text-gray-500 mb-6">
            {codeSent 
              ? `We've sent a verification code to ${email}` 
              : "Enter your email to receive a verification code"}
          </p>

          {/* Error displays */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          {emailError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {emailError}
            </div>
          )}
          {tokenError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {tokenError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!codeSent ? (
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                className={`w-full px-4 py-4 border ${
                  emailError ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)]`}
                required
              />
            ) : (
              <div>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Type code"
                  value={code}
                  onChange={handleTokenChange}
                  maxLength={4}
                  className={`w-full px-4 py-4 border ${
                    tokenError ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)]`}
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  Didn't receive code? <button 
                    type="button" 
                    onClick={() => dispatch(forgotPassword(email))}
                    className="text-[var(--theme-color)] hover:underline"
                  >
                    Resend code
                  </button>
                </p>
              </div>
            )}

            <button 
              type="submit" 
              className="w-full py-4 bg-[var(--theme-color)] text-white rounded-md hover:bg-white border border-[var(--theme-color)] hover:text-[var(--theme-color)] transition"
              disabled={loading}
            >
              {loading ? "Processing..." : codeSent ? "Verify Code" : "Send Code"}
            </button>
          </form>
        </div>
      </div>

      {/* Right section */}
      <div className="hidden md:block w-1/2 relative">
        <img
          src={authImage}
          alt="Security Camera"
          className="h-screen w-300 object-right absolute top-0 left-0 right-0 bottom-0"
        />
      </div>
    </div>
  );
}