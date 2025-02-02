"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { PiBookBookmarkLight } from "react-icons/pi";
import { FaBookBookmark } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileProfileDropdownOpen, setMobileProfileDropdownOpen] = useState(false);
  const pathname = usePathname();
  const profileDropdownRef = useRef(null);

  const isActive = (path) => (pathname === path ? "text-RuqyaGreen" : "text-gray-700");
  const isCurrent = (path) => (pathname === path ? "bg-gradient-to-l from-[#E6E6FA33] to-[#E6E6FA] bg-RuqyaLightPurple md:bg-white" : "bg-white");

  const handleLinkClick = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 1000);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header>
      <nav className={`${isCurrent("/")} px-4 py-4 shadow-md font-extrabold color-header`}>
        <div className="flex justify-between items-center mx-5 md:mx-8">
          <div className="text-xl min-w-32">
            <Link href="/" className="text-gray-700 w-40 hover:text-gray-900">
              <img src="/logo.png" alt="Ruqya logo" width="150" height="100" />
            </Link>
          </div>
          <div className="hidden md:flex flex-grow justify-center items-center mx-5">
            <img src="/nav-flower.svg" alt="Navigation Center" width="33" className="-mr-4" />
            <img src="/nav-line.svg" alt="Navigation Center" width="1600" />
          </div>
          <div className="hidden md:flex space-x-8 gap-5">
            <Link href="/" className={`${isActive("/")} hover:text-gray-900 text-center`}>
              Home
            </Link>
            <Link href="/BookRaqis" className={`${isActive("/BookRaqis")} w-24 text-center hover:text-gray-900`}>
              Book Raqis
            </Link>
            <Link href="/SelfRuqyah" className={`${isActive("/SelfRuqyah")} w-24 text-center hover:text-gray-900`}>
              Self-Ruqyah
            </Link>
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className={`${isActive("/MyProfile")} w-24 hover:text-gray-900 flex items-center md:w-32`}
              >
                My Profile
                <svg 
                  className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${
                    profileDropdownOpen ? 'rotate-180' : ''
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <Link href="/MyProfile" className="px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center">
                    <FaEdit className="w-4 h-4 mr-2" />
                    My Profile
                  </Link>
                  <Link href="/MyBookings" className=" px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center">
                    <FaBookBookmark  className="w-5 -ml-1 h-4 mr-2" />
                    My Bookings
                  </Link>
                  <Link href="/Logout" className="px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center">
                    <LuLogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="md:hidden sm:block z-50">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <>
            <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />
            <div className="md:hidden fixed right-0 top-0 h-full w-[80%] max-w-[320px] bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out">
              <div className="flex flex-col h-full overflow-y-auto">
                <div className="p-4 border-b border-gray-200">
                  <Link href="/" onClick={handleLinkClick}>
                    <img src="/logo.png" alt="Ruqya logo" width="120" className="mx-auto" />
                  </Link>
                </div>
                
                <div className="flex flex-col p-4 space-y-3">
                  <Link 
                    href="/" 
                    className={`${isActive("/")} px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200`} 
                    onClick={handleLinkClick}
                  >
                    Home
                  </Link>
                  <Link 
                    href="/BookRaqis" 
                    className={`${isActive("/BookRaqis")} px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200`} 
                    onClick={handleLinkClick}
                  >
                    Book Raqis
                  </Link>
                  <Link 
                    href="/SelfRuqyah" 
                    className={`${isActive("/SelfRuqyah")} px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200`} 
                    onClick={handleLinkClick}
                  >
                    Self-Ruqyah
                  </Link>
                  
                  <div className="border-t border-gray-200 pt-3">
                    <button
                      onClick={() => setMobileProfileDropdownOpen(!mobileProfileDropdownOpen)}
                      className={`${isActive("/MyProfile")} w-full px-4 py-3 rounded-lg flex items-center justify-between ${
                        mobileProfileDropdownOpen ? "bg-RuqyaGreen text-white" : "hover:bg-gray-100"
                      } transition-colors duration-200`}
                    >
                      <span>My Profile</span>
                      <svg 
                        className={`w-4 h-4 transform transition-transform duration-200 ${
                          mobileProfileDropdownOpen ? 'rotate-180' : ''
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    
                    {mobileProfileDropdownOpen && (
                      <div className="mt-2 bg-gray-50 rounded-lg">
                        <Link 
                          href="/MyProfile" 
                          className="px-6 py-3 text-gray-700 hover:bg-gray-100 flex items-center rounded-t-lg" 
                          onClick={handleLinkClick}
                        >
                          <FaEdit className="w-4 h-4 mr-3" />
                          View Profile
                        </Link>
                        <Link 
                          href="/MyBookings" 
                          className="px-6 py-3 text-gray-700 hover:bg-gray-100 flex items-center" 
                          onClick={handleLinkClick}
                        >
                          <FaBookBookmark className="w-4 h-4 mr-3" />
                          My Bookings
                        </Link>
                        <Link 
                          href="/Logout" 
                          className="px-6 py-3 text-gray-700 hover:bg-gray-100 flex items-center rounded-b-lg" 
                          onClick={handleLinkClick}
                        >
                          <LuLogOut className="w-4 h-4 mr-3" />
                          Logout
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
