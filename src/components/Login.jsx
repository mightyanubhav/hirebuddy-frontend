import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';
import { backend_url } from '../context/HardCodedValues';

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '', // email OR phone
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState(null);

  const navigate = useNavigate();
  const { login } = useAuth();

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
    // Clear status when user starts typing
    if (loginStatus) {
      setLoginStatus(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.identifier.trim()) {
      newErrors.identifier = "Email or Phone is required";
    } else {
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
          identifier: formData.identifier,
          password: formData.password
        }),
        credentials: "include"
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setLoginStatus({
          type: "success",
          message: "Login successful! Redirecting...",
        });
        
        login(data.role, data.token);

        if (data.role === "customer") {
          navigate("/customer");
        } else if (data.role === "buddy") {
          navigate("/buddy");
        } else {
          navigate("/");
        }
      } else {
        setLoginStatus({
          type: "error",
          message: data.error || "Login failed. Please check your credentials.",
        });
      }
    } catch (error) {
      setLoginStatus({ 
        type: 'error', 
        message: 'Network error. Please check your connection and try again.' 
      });
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    alert("Google login - under development");
  };

  const handleFacebookLogin = () => {
    alert("Facebook login - under development");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Mobile Header */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 text-center">
              <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
              <p className="opacity-90">Log in to your account</p>
            </div>

            {/* Mobile Form */}
            <div className="p-6">
              {loginStatus && (
                <div className={`rounded-lg p-3 mb-4 ${
                  loginStatus.type === 'success' 
                    ? 'bg-green-50 border border-green-200 text-green-700' 
                    : 'bg-red-50 border border-red-200 text-red-700'
                }`}>
                  <p className="text-sm text-center">{loginStatus.message}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email/Phone */}
                <div>
                  <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-1">
                    Email or Phone
                  </label>
                  <div className="relative">
                    {formData.identifier.includes('@') ? (
                      <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    ) : (
                      <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    )}
                    <input
                      id="identifier"
                      name="identifier"
                      type="text"
                      autoComplete="username"
                      value={formData.identifier}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.identifier ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Email or phone number"
                    />
                  </div>
                  {errors.identifier && (
                    <p className="mt-1 text-xs text-red-600">{errors.identifier}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.password ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                  )}
                </div>

                {/* Remember & Forgot */}
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
                      className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </span>
                  ) : (
                    'Log in'
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FaGoogle className="text-red-500" />
                  <span className="text-sm font-medium">Google</span>
                </button>

                <button
                  type="button"
                  onClick={handleFacebookLogin}
                  className="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FaFacebook className="text-blue-600" />
                  <span className="text-sm font-medium">Facebook</span>
                </button>
              </div>

              {/* Signup Link */}
              <div className="text-center mt-6 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  New user?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex min-h-[calc(100vh-2rem)] items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl">
            <div className="flex">
              {/* Left Section - Info */}
              <div className="w-1/2 bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 flex flex-col justify-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Welcome to HireBuddy</h2>
                  <p className="opacity-90 mb-6">
                    Log in to access your account and continue your journey with us.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                      <span className="text-sm">Secure & reliable platform</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                      <span className="text-sm">Instant access to services</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                      <span className="text-sm">24/7 customer support</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Form */}
              <div className="w-1/2 p-8">
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Log in</h1>
                    <p className="text-gray-600 mt-1">Welcome back to your account</p>
                  </div>

                  {/* Status Message */}
                  {loginStatus && (
                    <div className={`rounded-lg p-3 mb-4 ${
                      loginStatus.type === 'success' 
                        ? 'bg-green-50 border border-green-200 text-green-700' 
                        : 'bg-red-50 border border-red-200 text-red-700'
                    }`}>
                      <p className="text-sm text-center">{loginStatus.message}</p>
                    </div>
                  )}

                  {/* Form */}
                  <div className="flex-1">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Email/Phone */}
                      <div>
                        <label htmlFor="desktop-identifier" className="block text-sm font-medium text-gray-700 mb-1">
                          Email or Phone
                        </label>
                        <div className="relative">
                          {formData.identifier.includes('@') ? (
                            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          ) : (
                            <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          )}
                          <input
                            id="desktop-identifier"
                            name="identifier"
                            type="text"
                            autoComplete="username"
                            value={formData.identifier}
                            onChange={handleChange}
                            className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors.identifier ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="Enter your email or phone number"
                          />
                        </div>
                        {errors.identifier && (
                          <p className="mt-1 text-xs text-red-600">{errors.identifier}</p>
                        )}
                      </div>

                      {/* Password */}
                      <div>
                        <label htmlFor="desktop-password" className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <div className="relative">
                          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            id="desktop-password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`block w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors.password ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="Enter your password"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                        )}
                      </div>

                      {/* Remember & Forgot */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="desktop-remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="desktop-remember-me" className="ml-2 block text-sm text-gray-900">
                            Remember me
                          </label>
                        </div>

                        <div className="text-sm">
                          <Link
                            to="/forgot-password"
                            className="text-blue-600 hover:text-blue-500 font-medium"
                          >
                            Forgot password?
                          </Link>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors mt-2"
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Signing in...
                          </span>
                        ) : (
                          'Log in'
                        )}
                      </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                      </div>
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <FaGoogle className="text-red-500" />
                        <span className="text-sm font-medium">Google</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleFacebookLogin}
                        className="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <FaFacebook className="text-blue-600" />
                        <span className="text-sm font-medium">Facebook</span>
                      </button>
                    </div>
                  </div>

                  {/* Signup Link */}
                  <div className="text-center mt-6 pt-4 border-t">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;