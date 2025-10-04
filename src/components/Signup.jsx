import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaGoogle,
  FaFacebook,
  FaEye,
  FaEyeSlash,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaLock,
  FaCheckCircle,
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
    role: "buddy",
  });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  // ✅ Validation rules
  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    const phoneRegex = /^\+?[1-9]\d{9,14}$/; // allows E.164 or plain numbers
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be 8+ chars, include uppercase, lowercase, number & special char";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch(`${backend_url}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setStep(2);
        setMessage("OTP sent successfully. Please check your phone.");
      } else {
        setMessage(data.error || "Failed to sign up");
      }
    } catch (e) {
      setMessage("Network error. Please try again.", e.message);
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${backend_url}/user/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formData.phone, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Signup successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(data.error || "Invalid OTP");
      }
    } catch (e) {
      setMessage("Network error. Please try again.", e.message);
    }
    setLoading(false);
  };

  const handleGoogleSignup = () => {
    alert("work on progress");
  };
  const handleFacebookSignup = () => {
    alert("work on progress");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl">
        <div className="md:flex">
          {/* Left Info */}
          <div className="md:w-1/2 bg-gradient-to-b from-blue-600 to-indigo-700 text-white p-10 hidden md:flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Join HireBuddy Network</h2>
            <p className="opacity-90">
              Sign up to connect with trusted buddies and unlock experiences.
            </p>
            <div className="space-y-4 mt-6">
              <div className="flex items-center">
                <FaCheckCircle className="text-green-300 mr-2" />
                <span>Verified buddies for every service</span>
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="text-green-300 mr-2" />
                <span>Secure sign-up with OTP & role-based access</span>
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="text-green-300 mr-2" />
                <span>Flexible booking options</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="md:w-1/2 p-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                Create Account
              </h1>
              <p className="text-gray-600 mt-2">
                {step === 1 ? "Fill in your details" : "Enter OTP"}
              </p>
            </div>

            {message && (
              <div
                className={`p-3 rounded-lg mb-6 ${
                  message.includes("success")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message}
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleSignup} className="space-y-4">
                {/* Name */}
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Full Name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Email Address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Phone (e.g. +91755552671)"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>

                {/* Password */}
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

                {/* Role */}
                <div>
                  <span className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </span>
                  <div className="flex space-x-6">
                    <label className="inline-flex items-center space-x-2">
                      <input
                        type="radio"
                        name="role"
                        value="customer"
                        checked={formData.role === "customer"}
                        onChange={handleInputChange}
                      />
                      <span>Customer</span>
                    </label>
                    <label className="inline-flex items-center space-x-2">
                      <input
                        type="radio"
                        name="role"
                        value="buddy"
                        checked={formData.role === "buddy"}
                        onChange={handleInputChange}
                      />
                      <span>Buddy</span>
                    </label>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Sending OTP..." : "Sign Up"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <h2 className="text-xl font-semibold text-center">
                  Verify OTP
                </h2>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full text-center px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 tracking-widest"
                  placeholder="Enter OTP"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </form>
            )}

            <div className="my-6 flex items-center">
              <hr className="flex-grow border-gray-300" />
              <span className="px-3 text-gray-500 text-sm">
                or sign up with
              </span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGoogleSignup} // implement later
                className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-gray-300 
               text-gray-700 font-medium hover:bg-red-50 transition-colors duration-200"
              >
                <FaGoogle className="text-red-500 text-lg" />
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={handleFacebookSignup} // implement later
                className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-gray-300 
               text-gray-700 font-medium hover:bg-blue-50 transition-colors duration-200"
              >
                <FaFacebook className="text-blue-600 text-lg" />
                <span>Continue with Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
