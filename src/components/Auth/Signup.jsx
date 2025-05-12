import { useState } from "react";

// Redux
import { useDispatch,useSelector } from "react-redux";
import { signupUser } from "../../reduxToolkit/slices/authSlice";

// Packages and Libraries
import { useNavigate } from "react-router-dom";

// Icons
//import GoogleIcon from "../../assets/icons/GoogleIcon";

// Images
import netra3Icon from "../../assets/images/netraIcon.png"
import authImage from "../../assets/images/authImage.png"

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      acceptTerms: false
  });

  const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value
      }));
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.acceptTerms) {
          alert("Please accept the terms and conditions");
          return;
      }
      
      dispatch(signupUser({
          firstname: formData.firstName,
          lastname: formData.lastName,
          email: formData.email,
          password_hash: formData.password
      })).then((action) => {
          if (action.payload && !action.error) {
              navigate("/signupSuccess");
          }
      });
  };

  const navigateToLogin = () => navigate("/login");

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
                  <h2 className="text-2xl font-bold mb-1">Create an account</h2>
                  <p className="text-gray-500 mb-6">Collaborate with the best brands.</p>

                  {error && (
                      <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                          {error}
                      </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="flex gap-4">
                          <input 
                              type="text" 
                              name="firstName"
                              placeholder="First Name" 
                              value={formData.firstName} 
                              onChange={handleChange}
                              className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
                              required 
                          />
                          
                          <input 
                              type="text" 
                              name="lastName"
                              placeholder="Last Name" 
                              value={formData.lastName} 
                              onChange={handleChange}
                              className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
                              required 
                          />        
                      </div>
                      
                      <input
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
                          required
                      />

                      <input
                          type="password"
                          name="password"
                          placeholder="Enter password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
                          required
                      />

                      <div className="flex items-center justify-between text-md">
                          <label className="flex items-center gap-2">
                              <input 
                                  type="checkbox" 
                                  name="acceptTerms"
                                  checked={formData.acceptTerms} 
                                  onChange={handleChange} 
                                  className="accent-orange-500" 
                              />
                              <p>I accept all the Terms of <a className="text-[var(--theme-color)] hover:underline">Service</a> and <a className="text-[var(--theme-color)] hover:underline">Privacy Policy</a></p>
                          </label>
                      </div>

                      <button 
                          type="submit" 
                          className="w-full py-3 bg-[var(--theme-color)] text-white rounded-md hover:bg-white border border-[var(--theme-color)] hover:text-[var(--theme-color)] transition"
                          disabled={loading}
                      >
                          {loading ? 'Creating Account...' : 'Continue'}
                      </button>
                  </form>

                  <p className="text-sm mt-4 text-center text-gray-600">
                      Already have an account?{" "}
                      <a className="text-orange-500 cursor-pointer hover:underline" onClick={navigateToLogin}>
                          Login
                      </a>
                  </p>
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
