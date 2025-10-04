import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthProvider"; // ✅ default export
import Landing from "./components/Landing/Landing";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CustomerDashboard from "./components/Customer/CustomerDashboard";
import BuddyDashboard from "./components/Buddy/BuddyDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import BuddyHireService from "./components/BuddyHireService";
import SupportPage from "./components/SupportPage";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/AboutUs";
import HowToOperate from "./components/HowToOperate";
import BuddyVerification from "./components/BuddyVerification";
import WhyUs from "./components/WhyUs";
import Careers from "./components/Careers";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="font-serif">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/services" element={<BuddyHireService/>}/>
            <Route path="/support" element={<SupportPage/>}/>
            <Route path="/contact" element={<ContactUs/>} />
            <Route path="/about" element={<AboutUs/>} />
            <Route path="/guides" element={<HowToOperate/>} />
            <Route path="/about-buddies" element={<BuddyVerification/>} />
            <Route path="/why-us" element={<WhyUs/>} />
            <Route path="/careers" element={<Careers/>} />
            {/* Protected Routes */}
            <Route
              path="/customer"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/buddy"
              element={
                <ProtectedRoute allowedRoles={["buddy"]}>
                  <BuddyDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Login />} />
          </Routes>
          
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
