import { Link } from "react-router-dom";
import hireBuddyLogo from "../assets/personJump.png"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid: 2 columns on mobile, 4 on md */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Logo & Social */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center mb-4">
              <img
                src={hireBuddyLogo}
                alt="hire-buddy logo"
                className="h-8 w-8 mr-2"
              />
              <p className="font-bold text-lg">HireBuddy</p>
            </div>
            <p className="text-gray-400 mb-4 text-sm">
              Making daily life easier, more enjoyable, and stress-free.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="" className="text-gray-400 hover:text-white text-lg">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="" className="text-gray-400 hover:text-white text-lg">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="" className="text-gray-400 hover:text-white text-lg">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="" className="text-gray-400 hover:text-white text-lg">
                <i className="fab fa-linkedin-in"></i>
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-base mb-2">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="" className="text-gray-400 hover:text-white">Features</Link></li>
              <li><Link to="" className="text-gray-400 hover:text-white">Pricing</Link></li>
              <li><Link to="" className="text-gray-400 hover:text-white">Case Studies</Link></li>
              <li><Link to="" className="text-gray-400 hover:text-white">Reviews</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-base mb-2">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="" className="text-gray-400 hover:text-white">About</Link></li>
              <li><Link to="" className="text-gray-400 hover:text-white">Careers</Link></li>
              <li><Link to="" className="text-gray-400 hover:text-white">Contact</Link></li>
              <li><Link to="" className="text-gray-400 hover:text-white">Partners</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold text-base mb-2">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="" className="text-gray-400 hover:text-white">Support</Link></li>
              <li><Link to="" className="text-gray-400 hover:text-white">FAQ</Link></li>
              <li><Link to="" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} HireBuddy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};


export default Footer;