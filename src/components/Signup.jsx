import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Link } from "react-router-dom";
import { backend_url } from "../context/HardCodedValues";
const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Signup form, 2: OTP verification
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(formData);
      const response = await fetch(`${backend_url}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
      setMessage(e + "Netrowk error pls try again");
    }

    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${backend_url}/user/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: formData.phone,
          otp: otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Signup successful! Redirecting to login...");
        // Redirect to login after a delay
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage(data.error || "Invalid OTP");
      }
    } catch (e) {
      setMessage(e + "Network error. Please try again.");
    }

    setLoading(false);
  };

  const handleOAuthLogin = (provider) => {
    setMessage(`⚙️ ${provider} login is under work. Enter details manually.`);
    // You can later enable this redirect when ready
    // window.location.href = `/api/auth/${provider}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl">
        <div className="md:flex">
          {/* Left side - Illustration and info */}
          <div className="md:w-1/2 bg-gradient-to-b from-blue-600 to-indigo-700 text-white p-10 hidden md:flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
              <p className="opacity-90">
                Create an account to access exclusive features and content.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaCheckCircle className="text-green-300 mr-2" />
                <span>Secure authentication with OTP</span>
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="text-green-300 mr-2" />
                <span>Multiple OAuth provider options</span>
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="text-green-300 mr-2" />
                <span>Role-based access control</span>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="md:w-1/2 p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Create Account
              </h1>
              <p className="text-gray-600 mt-2">
                {step === 1
                  ? "Fill in your details to get started"
                  : "Enter the OTP sent to your phone"}
              </p>
            </div>

            {message && (
              <div
                className={`p-3 rounded-lg mb-6 ${
                  message.includes("successful")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message}
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Full Name"
                      required
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Email Address"
                      required
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onFocus={() => {
                        if (!formData.phone.startsWith("+91")) {
                          setFormData((prev) => ({ ...prev, phone: "+91" }));
                        }
                      }}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Phone Number"
                      required
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-gray-400" />
                      ) : (
                        <FaEye className="text-gray-400" />
                      )}
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="buddy">Buddy</option>
                      <option value="customer">Customer</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50"
                >
                  {loading ? "Sending OTP..." : "Sign Up"}
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleOAuthLogin("google")}
                    className="inline-flex justify-center items-center space-x-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                  >
                    <FaGoogle className="text-red-500" />
                    <span>Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOAuthLogin("facebook")}
                    className="inline-flex justify-center items-center space-x-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                  >
                    <FaFacebook className="text-blue-600" />
                    <span>Facebook</span>
                  </button>
                </div>

                <div className="text-center mt-6">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Log in
                    </Link>
                  </p>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                    <FaPhone className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="mt-4 text-xl font-medium text-gray-900">
                    Verify Your Phone
                  </h2>
                  <p className="mt-2 text-sm text-red-600">
                    {/* We've sent a verification code to {formData.phone} */}
                    Free Twilio subscription ended. Enter otp 12345
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Verification Code
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-xl tracking-widest"
                      placeholder="Enter 5-digit code"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Change phone number
                  </button>
                </div>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Didn't receive the code?{" "}
                    <button
                      type="button"
                      onClick={handleSignup}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Resend OTP
                    </button>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
