'use client'
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path ? 'text-RuqyaGreen' : 'text-gray-700';

  return (
    <header>
      <nav className={`${isActive('/') ? "bg-gradient-to-l from-[#E6E6FA33] to-[#E6E6FA] bg-[#FFFFFF]" : "bg-white"}  shadow-md p-1 font-fullsansbold color-header`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              <img src="/logo.png" alt="Ruqya logo" width="150" height="100" />
            </Link>
          </div>
          <div className="hidden md:flex flex-grow justify-center items-center px-3">
            <img src="/nav-flower.svg" alt="Navigation Center" width="33" className="-mr-4"/>
            <img src='/nav-line.svg' alt="Navigation Center" width="700"/>
          </div>
          <div className="hidden md:flex space-x-4 mt-1">
            <Link href="/" className={`${isActive('/')} hover:text-gray-900`}>Home</Link>
            <Link href="/BookRaqis" className={`${isActive('/BookRaqis')} hover:text-gray-900`}>Book Raqis</Link>
            <Link href="/SelfRuqyah" className={`${isActive('/SelfRuqyah')} hover:text-gray-900`}>Self-Ruqyah</Link>
            <Link href="/MyProfile" className={`${isActive('/MyProfile')} hover:text-gray-900`}>My Profile</Link>
          </div>
          <div className="md:hidden sm:block">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <Link href="/" className={`${isActive('/')} block px-4 py-2 hover:bg-gray-100`}>Home</Link>
            <Link href="/BookRaqis" className={`${isActive('/BookRaqis')} block px-4 py-2 hover:bg-gray-100`}>Book Raqis</Link>
            <Link href="/SelfRuqyah" className={`${isActive('/SelfRuqyah')} block px-4 py-2 hover:bg-gray-100`}>Self-Ruqyah</Link>
            <Link href="/MyProfile" className={`${isActive('/MyProfile')} block px-4 py-2 hover:bg-gray-100`}>My Profile</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
