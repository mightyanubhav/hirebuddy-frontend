import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { backend_url } from "../../context/HardCodedValues";
import { useNavigate } from "react-router-dom";

const Header = ({ credits, setCredits }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    profileImage: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(`${backend_url}/customer/me`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setProfileData(data.user);
        setFormData({
          name: data.user.name || "",
          phone: data.user.phone || "",
          profileImage: null,
        });
        setImagePreview(data.user.profileImage?.url || null);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchUserProfile();
    }
  }, [user?.token]);

  const handleProfileClick = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/customer/me`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setProfileData(data.user);
      setFormData({
        name: data.user.name || "",
        phone: data.user.phone || "",
        profileImage: null,
      });
      setImagePreview(data.user.profileImage?.url || null);
      setProfileModalOpen(true);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    const token = user?.token;
    if (!token) return alert("Please log in");

    setIsSaving(true);
    const form = new FormData();
    form.append("name", formData.name);
    form.append("phone", formData.phone);
    if (formData.profileImage) {
      form.append("profileImage", formData.profileImage);
    }

    try {
      const { data } = await axios.put(
        `${backend_url}/customer/profileEdit`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProfileData(data.user); // Update profile data with response
      setImagePreview(data.user.profileImage?.url || null);
      alert("Profile updated successfully");
      setProfileModalOpen(false);
    } catch (err) {
      console.error("Profile update failed:", err);
      alert("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImage: file });
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleLogout = async () => {
    const token = user?.token;
    try {
      await fetch(`${backend_url}/user/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      logout();
      navigate("/login", { replace: true });
    }
  };

  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) return resolve(true);
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleBuyCredits = async () => {
    const token = user?.token;
    if (!token) return alert("Please log in to buy credits");

    setIsProcessing(true);
    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setIsProcessing(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `${backend_url}/payment/create-order`,
        { amount: 500 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const options = {
        key: "rzp_test_R9zYZpwuU3bt98",
        amount: data.amount,
        currency: "INR",
        order_id: data.orderId,
        name: "HireBuddy Credits",
        description: "Buy more buddy credits",
        handler: async function (response) {
          await axios.post(
            "/api/payment/verify",
            {
              orderId: data.orderId,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          alert("Payment successful! Credits added.");
          setCredits((prev) => prev + 10);
        },
        theme: { color: "#2563eb" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong with payment.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Get user's profile image or fallback to initial
  const getUserAvatar = () => {
    if (profileData?.profileImage?.url) {
      return (
        <img
          src={profileData.profileImage.url}
          alt={profileData?.name || "User"}
          className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
          onError={(e) => {
            // Fallback if image fails to load
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
      );
    }
    return (
      <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
        <span className="text-white font-semibold text-sm">
          {profileData?.name?.charAt(0)?.toUpperCase() ||
            user?.name?.charAt(0)?.toUpperCase() ||
            "U"}
        </span>
      </div>
    );
  };

  const getMobileUserAvatar = () => {
    if (profileData?.profileImage?.url) {
      return (
        <img
          src={profileData.profileImage.url}
          alt={profileData?.name || "User"}
          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
          onError={(e) => {
            // Fallback if image fails to load
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
      );
    }
    return (
      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
        <span className="text-white font-semibold">
          {profileData?.name?.charAt(0)?.toUpperCase() ||
            user?.name?.charAt(0)?.toUpperCase() ||
            "U"}
        </span>
      </div>
    );
  };

  // Get display name - prioritize profileData from API
  const getDisplayName = () => {
    return profileData?.name || user?.name || "User";
  };

  // Show loading state while fetching user data
  if (loading) {
    return (
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-gray-900">HireBuddy</h1>
                <p className="text-xs text-gray-500">By Anubhav</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="animate-pulse bg-gray-200 h-8 w-20 rounded-lg"></div>
              <div className="animate-pulse bg-gray-200 h-9 w-9 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm fixed top-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-gray-900">HireBuddy</h1>
              <p className="text-xs text-gray-500">By Anubhav</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {/* Credits Display */}
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <div className="absolute w-4 h-4 border-2 border-emerald-200 rounded-full animate-ping"></div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-gray-600">
                    Credits:
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    {credits}
                  </span>
                </div>
              </div>
            </div>

            {/* Buy Credits Button */}
            <button
              onClick={handleBuyCredits}
              disabled={isProcessing}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm shadow-md hover:shadow-lg transform hover:scale-105"
            >
              {isProcessing ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              )}
              <span>{isProcessing ? "Processing..." : "Buy Credits"}</span>
            </button>

            {/* Divider */}
            <div className="h-8 w-px bg-gray-300"></div>

            {/* User Profile */}
            <div
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity duration-200 group"
              onClick={handleProfileClick}
            >
              <div className="flex flex-col items-end">
                <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {getDisplayName()}
                </p>
                <p className="text-xs text-gray-500">View Profile</p>
              </div>
              {getUserAvatar()}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-2.5 rounded-xl transition-all duration-200 border border-transparent hover:border-red-200"
              title="Logout"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile Credits */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-gray-50 to-blue-50 px-3 py-1.5 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
              <span className="text-sm font-bold text-gray-900">{credits}</span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-3 animate-in slide-in-from-top duration-300">
            {/* User Info Card */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {getDisplayName()}
                  </p>
                  <p className="text-xs text-gray-500">Customer</p>
                </div>
                <div
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={handleProfileClick}
                >
                  {getMobileUserAvatar()}
                </div>
              </div>

              {/* Buy Credits Button */}
              <button
                onClick={handleBuyCredits}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-lg mb-3"
              >
                {isProcessing ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                )}
                <span>{isProcessing ? "Processing..." : "Buy Credits"}</span>
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full bg-white hover:bg-red-50 text-gray-700 hover:text-red-700 px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 border border-gray-200 hover:border-red-200 text-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}

        {/* Enhanced Profile Modal */}
        {profileModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform animate-in slide-in-up duration-300 max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Edit Profile</h2>
                  <button
                    onClick={() => setProfileModalOpen(false)}
                    className="text-white hover:text-blue-200 transition-colors p-1 rounded-lg"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto">
                <form onSubmit={handleProfileSave} className="space-y-6">
                  {/* Profile Image Upload */}
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Profile preview"
                          className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                        />
                      ) : profileData?.profileImage?.url ? (
                        <img
                          src={profileData.profileImage.url}
                          alt="Current profile"
                          className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center border-4 border-blue-100 shadow-lg">
                          <span className="text-white font-bold text-2xl">
                            {getDisplayName().charAt(0)?.toUpperCase() || "U"}
                          </span>
                        </div>
                      )}
                      <label
                        htmlFor="profileImage"
                        className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </label>
                      <input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Click camera to change photo
                    </p>
                  </div>

                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setProfileModalOpen(false)}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSaving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
