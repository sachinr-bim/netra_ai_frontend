import { useState,useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../reduxToolkit/slices/authSlice";

// Packages and Libraries
import { useNavigate,useLocation } from "react-router-dom";

// Images
import netra3Icon from "../../assets/images/netraIcon.png"
import authImage from "../../assets/images/authImage.png"

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  // Get email and token from location state
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
    if (location.state?.token) {
      // Ensure token is converted to number
      const tokenNumber = Number(location.state.token);
      if (!isNaN(tokenNumber)) {
        setToken(tokenNumber);
      } else {
        console.error("Invalid token received:", location.state.token);
        // Handle invalid token case if needed
      }
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      password: "",
      confirmPassword: "",
    };

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const resultAction = await dispatch(
        resetPassword({
          email,
          token: token, // Now guaranteed to be a number
          password: formData.password,
        })
      );

      if (resetPassword.fulfilled.match(resultAction)) {
        navigate("/passwordResetSuccess");
      }
    } catch (err) {
      console.error("Password reset failed:", err);
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
          <h2 className="text-3xl font-bold mb-1">Reset Your Password</h2>
          <p className="text-gray-500 mb-6">Reset your account password to login</p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                name="password"
                placeholder="New password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-4 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)]`}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Retype new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-4 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)]`}
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[var(--theme-color)] text-white rounded-md hover:bg-white border border-[var(--theme-color)] hover:text-[var(--theme-color)] transition"
              disabled={loading}
            >
              {loading ? "Processing..." : "Reset Password"}
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
