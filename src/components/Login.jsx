import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';
import { FaGoogle,FaFacebook } from 'react-icons/fa';
import { backend_url } from '../context/HardCodedValues';

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '', // email OR phone
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState(null);

  const navigate = useNavigate();
  const { login } = useAuth(); // from AuthContext

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
    const newErrors = {};

    if (!formData.identifier) {
      newErrors.identifier = "Email or Phone is required";
    } else {
      // check if identifier is email or phone
      const phoneRegex = /^\d{10}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!phoneRegex.test(formData.identifier) && !emailRegex.test(formData.identifier)) {
        newErrors.identifier = "Enter a valid email or 10-digit phone number";
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setLoginStatus(null);
    
    try {
      const response = await fetch(`${backend_url}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: formData.identifier, // email or phone
          password: formData.password
        }),
        credentials: "include" // to send/receive cookies
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setLoginStatus({
          type: "success",
          message: "Login successful! Redirecting...",
        });
        
        // ✅ store user & role in AuthContext
        login(data.role, data.token);

        // ✅ redirect based on role
        if (data.role === "customer") {
          navigate("/customer");
        } else if (data.role === "buddy") {
          navigate("/buddy");
        } else {
          navigate("/"); // fallback
        }
      } else {
        setLoginStatus({
          type: "error",
          message: data.message || "Login failed",
        });
      }
    } catch (error) {
      setLoginStatus({ type: 'error', message: 'Network error. Please try again.' });
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleGoogleLogin = () =>{
    alert("work on progress");
  }
  const handleFacebookLogin = () =>{
    alert("work on progress");
  }
  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md space-y-8">
      {/* Logo
      <div className="flex justify-center">
        <div className="rounded-full bg-blue-100 p-4">
          <svg
            className="w-12 h-12 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
      </div> */}

      {/* Title */}
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome Back</h2>
        <p className="mt-2 text-sm text-gray-600">
          Sign in to your account
        </p>
      </div>

      {/* Form */}
      <div className="bg-white py-8 px-6 shadow-lg rounded-xl sm:px-10 border border-blue-100">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email / Phone */}
          <div>
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
              Email or Phone
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="identifier"
                name="identifier"
                type="text"
                autoComplete="username"
                value={formData.identifier}
                onChange={handleChange}
                className={`appearance-none block w-full px-3 py-3 border ${errors.identifier ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="Enter your email or phone number"
              />
            </div>
            {errors.identifier && (
              <p className="mt-2 text-sm text-red-600">{errors.identifier}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className={`appearance-none block w-full px-3 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="Enter your password"
              />
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          {/* Status Message */}
          {loginStatus && (
            <div className={`rounded-md p-4 ${loginStatus.type === 'success' ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className={`text-sm text-center ${loginStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                {loginStatus.message}
              </div>
            </div>
          )}

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition duration-300"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : 'Sign in'}
            </button>
          </div>

          {/* Divider */}
          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full inline-flex justify-center items-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <FaGoogle className="text-red-500 text-lg" />
              <span className="text-sm font-medium">Google</span>
            </button>

            <button
              type="button"
              onClick={handleFacebookLogin}
              className="w-full inline-flex justify-center items-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <FaFacebook className="text-blue-600 text-lg" />
              <span className="text-sm font-medium">Facebook</span>
            </button>
          </div>

          {/* Signup link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              New user?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Create a new account
              </Link>
            </p>
          </div>
        </form>

        {/* Terms */}
        <p className="mt-6 text-center text-sm text-gray-500">
          By signing in, you agree to our{" "}
          <Link to="/terms" className="text-blue-600 hover:text-blue-500">Terms of Service</Link> and{" "}
          <Link to="/privacy" className="text-blue-600 hover:text-blue-500">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  </div>
);

};

export default Login;
