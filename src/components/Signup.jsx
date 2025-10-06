import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaLock,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";
import { backend_url } from "../context/HardCodedValues";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "customer",
  });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Include uppercase, lowercase & number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "phone") {
      const digits = value.replace(/\D/g, '');
      if (digits.length <= 10) {
        setFormData({ ...formData, [name]: digits });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setMessage("");
    
    try {
      const response = await fetch(`${backend_url}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setStep(2);
        setMessage({
          type: "success",
          text: "OTP sent to your email! Check SPAM folder if needed."
        });
      } else {
        setMessage({
          type: "error", 
          text: data.error || "Failed to sign up. Please try again."
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Network error. Please check your connection.",
        msg: error
      });
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    
    if (!otp.trim()) {
      setMessage({
        type: "error",
        text: "Please enter the OTP"
      });
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(`${backend_url}/user/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          phone: formData.phone, 
          otp: otp.trim() 
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage({
          type: "success",
          text: "Account created successfully! Redirecting..."
        });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage({
          type: "error",
          text: data.error || "Invalid OTP. Please try again."
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Network error. Please try again.",
        msg: error
      });
    }
    setLoading(false);
  };

  const handleBackToStep1 = () => {
    setStep(1);
    setMessage("");
    setOtp("");
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backend_url}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage({
          type: "success",
          text: "OTP resent to your email!"
        });
      } else {
        setMessage({
          type: "error",
          text: data.error || "Failed to resend OTP"
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to resend OTP. Please try again.",
        msg: error
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Mobile: Single Column Layout */}
        <div className="md:hidden">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Mobile Header */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 text-center">
              <h1 className="text-2xl font-bold mb-2">
                {step === 1 ? "Create Account" : "Verify OTP"}
              </h1>
              <p className="opacity-90">
                {step === 1 
                  ? `Join as ${formData.role}` 
                  : `Enter OTP sent to ${formData.email}`
                }
              </p>
            </div>

            {/* Mobile Content */}
            <div className="p-6">
              {step === 2 && (
                <button
                  onClick={handleBackToStep1}
                  className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
                >
                  <FaArrowLeft className="mr-2" />
                  Back to details
                </button>
              )}

              {message && (
                <div
                  className={`p-3 rounded-lg mb-4 text-sm ${
                    message.type === "success" 
                      ? "bg-green-50 border border-green-200 text-green-700" 
                      : "bg-red-50 border border-red-200 text-red-700"
                  }`}
                >
                  {message.text}
                </div>
              )}

              {step === 1 ? (
                <form onSubmit={handleSignup} className="space-y-4">
                  {/* Role Selection */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      I want to:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, role: "customer"})}
                        className={`p-2 text-sm rounded-lg border-2 text-center transition-all ${
                          formData.role === "customer"
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 bg-white text-gray-700"
                        }`}
                      >
                        Find Buddies
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, role: "buddy"})}
                        className={`p-2 text-sm rounded-lg border-2 text-center transition-all ${
                          formData.role === "buddy"
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 bg-white text-gray-700"
                        }`}
                      >
                        Be a Buddy
                      </button>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                            errors.name ? "border-red-300" : "border-gray-300"
                          }`}
                          placeholder="Full name"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                            errors.email ? "border-red-300" : "border-gray-300"
                          }`}
                          placeholder="Email address"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <div className="relative">
                        <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                            errors.phone ? "border-red-300" : "border-gray-300"
                          }`}
                          placeholder="10-digit number"
                          maxLength="10"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`block w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                            errors.password ? "border-red-300" : "border-gray-300"
                          }`}
                          placeholder="Create password"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      {errors.password ? (
                        <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                      ) : (
                        <p className="mt-1 text-xs text-gray-500">
                          8+ chars with uppercase, lowercase & number
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
                  >
                    {loading ? "Sending OTP..." : "Send OTP"}
                  </button>

                  <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 font-medium">
                      Log In
                    </Link>
                  </p>
                </form>
              ) : (
                /* OTP Verification Mobile */
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaEnvelope className="text-blue-600 text-xl" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Verify Your Email
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      Enter OTP sent to:
                    </p>
                    <p className="font-medium text-gray-800 text-sm">{formData.email}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                      OTP Code
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                        setOtp(value);
                      }}
                      className="w-full text-center text-lg font-mono px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 tracking-widest"
                      placeholder="000000"
                      maxLength="6"
                    />
                  </div>

                  <div className="space-y-2">
                    <button
                      type="submit"
                      disabled={loading || otp.length !== 6}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
                    >
                      {loading ? "Verifying..." : "Verify OTP"}
                    </button>

                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={loading}
                      className="w-full text-blue-600 py-2 rounded-lg hover:bg-blue-50 disabled:opacity-50 font-medium text-sm"
                    >
                      Resend OTP
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Desktop: Two Column Layout */}
        <div className="hidden md:flex min-h-[calc(100vh-2rem)] items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl">
            <div className="flex">
              {/* Left Info Section */}
              <div className="w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 flex flex-col justify-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    {formData.role === "customer" ? "Find Trusted Buddies" : "Start Earning Today"}
                  </h2>
                  <p className="opacity-90 mb-6">
                    {formData.role === "customer" 
                      ? "Join thousands finding reliable service providers."
                      : "Join our network of skilled professionals."
                    }
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <FaCheckCircle className="text-green-300 flex-shrink-0" />
                      <span className="text-sm">Secure & verified platform</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaCheckCircle className="text-green-300 flex-shrink-0" />
                      <span className="text-sm">Easy {formData.role === "customer" ? "booking" : "earning"} process</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaCheckCircle className="text-green-300 flex-shrink-0" />
                      <span className="text-sm">24/7 customer support</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Form Section */}
              <div className="w-1/2 p-8">
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="text-center mb-6">
                    {step === 2 && (
                      <button
                        onClick={handleBackToStep1}
                        className="flex items-center text-blue-600 hover:text-blue-700 mb-4 mx-auto text-sm"
                      >
                        <FaArrowLeft className="mr-2" />
                        Back to details
                      </button>
                    )}
                    
                    <h1 className="text-2xl font-bold text-gray-800">
                      {step === 1 ? "Create Account" : "Verify OTP"}
                    </h1>
                    <p className="text-gray-600 mt-1 text-sm">
                      {step === 1 ? `Join as ${formData.role}` : `Enter OTP sent to ${formData.email}`}
                    </p>
                  </div>

                  {/* Message */}
                  {message && (
                    <div
                      className={`p-3 rounded-lg mb-4 text-sm ${
                        message.type === "success" 
                          ? "bg-green-50 border border-green-200 text-green-700" 
                          : "bg-red-50 border border-red-200 text-red-700"
                      }`}
                    >
                      {message.text}
                    </div>
                  )}

                  {/* Form Content */}
                  <div className="flex-1">
                    {step === 1 ? (
                      <form onSubmit={handleSignup} className="space-y-4">
                        {/* Role Selection */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            I want to:
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => setFormData({...formData, role: "customer"})}
                              className={`p-3 rounded-lg border-2 text-center transition-all ${
                                formData.role === "customer"
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                              }`}
                            >
                              Find Buddies
                            </button>
                            <button
                              type="button"
                              onClick={() => setFormData({...formData, role: "buddy"})}
                              className={`p-3 rounded-lg border-2 text-center transition-all ${
                                formData.role === "buddy"
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                              }`}
                            >
                              Be a Buddy
                            </button>
                          </div>
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name
                            </label>
                            <div className="relative">
                              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                  errors.name ? "border-red-300" : "border-gray-300"
                                }`}
                                placeholder="Full name"
                              />
                            </div>
                            {errors.name && (
                              <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email
                            </label>
                            <div className="relative">
                              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                  errors.email ? "border-red-300" : "border-gray-300"
                                }`}
                                placeholder="Email address"
                              />
                            </div>
                            {errors.email && (
                              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Phone
                            </label>
                            <div className="relative">
                              <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                  errors.phone ? "border-red-300" : "border-gray-300"
                                }`}
                                placeholder="10-digit number"
                                maxLength="10"
                              />
                            </div>
                            {errors.phone && (
                              <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Password
                            </label>
                            <div className="relative">
                              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                              <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`block w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                  errors.password ? "border-red-300" : "border-gray-300"
                                }`}
                                placeholder="Create password"
                              />
                              <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                              </button>
                            </div>
                            {errors.password ? (
                              <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                            ) : (
                              <p className="mt-1 text-xs text-gray-500">
                                8+ chars with uppercase, lowercase & number
                              </p>
                            )}
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium mt-2"
                        >
                          {loading ? "Sending OTP..." : "Send OTP"}
                        </button>
                      </form>
                    ) : (
                      /* OTP Verification Desktop */
                      <form onSubmit={handleVerifyOtp} className="space-y-6">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaEnvelope className="text-blue-600 text-2xl" />
                          </div>
                          <h2 className="text-xl font-semibold text-gray-800">
                            Verify Your Email
                          </h2>
                          <p className="text-gray-600 mt-2">
                            Enter the 6-digit OTP sent to:
                          </p>
                          <p className="font-medium text-gray-800">{formData.email}</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                            OTP Code
                          </label>
                          <input
                            type="text"
                            value={otp}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                              setOtp(value);
                            }}
                            className="w-full text-center text-xl font-mono px-3 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 tracking-widest"
                            placeholder="000000"
                            maxLength="6"
                          />
                        </div>

                        <div className="space-y-3">
                          <button
                            type="submit"
                            disabled={loading || otp.length !== 6}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
                          >
                            {loading ? "Verifying..." : "Verify OTP"}
                          </button>

                          <button
                            type="button"
                            onClick={handleResendOtp}
                            disabled={loading}
                            className="w-full text-blue-600 py-2 rounded-lg hover:bg-blue-50 disabled:opacity-50 font-medium"
                          >
                            Resend OTP
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                  {/* Login Link - Only show on step 1 */}
                  {step === 1 && (
                    <p className="text-center text-sm text-gray-600 mt-4 pt-4 border-t">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Log In
                      </Link>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;