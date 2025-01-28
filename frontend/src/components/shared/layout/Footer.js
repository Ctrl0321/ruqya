"use client";
import Link from "next/link";
import Input from "@/components/ui/input/input";
import Button from "@/components/ui/buttons/DefaultButton";
import Triangle from "@/assets/svg/triangle";
import { FaMosque, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Import the proper icons

function Footer() {
  return (
    <footer className="relative z-100 w-full pt-16 mt-40">
      <Triangle />
      <div className="bg-RuqyaLightPurple text-white text-sm">
        <div className="container px-4 mx-auto text-center md:text-left ">
          <div className="flex justify-center mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="space-y-4 order-3 md:order-1">
              <div className="border-b border-[#424867] opacity-50 pb-4 md:hidden"></div>
              <h3 className="text-[#424867] text-xl font-medium mb-6 flex items-center justify-center md:justify-start gap-2">
                <FaMosque className="text-[#424867]" /> {/* Add the icon here */}
                Prophetic Ruqyah
              </h3>
              <div className="space-y-3">
                <div className="flex flex-col md:items-start text-center m-auto w-56 md:w-auto gap-5  justify-start">
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <div className="hidden md:flex p-2 rounded-full bg-[#FFE4C7]">
                      <FaMapMarkerAlt />
                    </div>
                    <span className="text-[#424867]">Address goes here</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <div className="hidden md:flex p-2 rounded-full bg-[#FFE4C7]">
                      <FaPhoneAlt />
                    </div>
                    <span className="text-[#424867]">071 - 3833341</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <div className="hidden md:flex p-2 rounded-full bg-[#FFE4C7]">
                      <FaEnvelope />
                    </div>
                    <span className="text-[#424867]">pramudithakhp@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-4 text-lg md:text-sm order-2 md:order-2">
              {/* <h3 className="text-[#424867] text-xl font-medium mb-6">Quick Links</h3> */}
              <nav className="space-y-3">

              <Link href="/" className="block text-[#424867] hover:text-teal-600">
                  Home
                </Link>
                <Link href="/BookRaqis" className="block text-[#424867] hover:text-teal-600">
                  Book Raqis
                </Link>
                <Link href="SelfRuqyah" className="block text-[#424867] hover:text-teal-600">
                  Self-Ruqyah
                </Link>
                <Link href="MyProfile" className="block text-[#424867] hover:text-teal-600">
                  My Profile
                </Link>
              </nav>
            </div>

            {/* Newsletter Subscription */}
            <div className="space-y-4 order-1 md:order-3">
              <h3 className="text-[#424867] text-2xl font-bold mb-2">Be Our Subscribers</h3>
              <p className="text-[#424867] mb-6">to get the latest news about health from our experts</p>
              <div className="flex justify-center items-center gap-2 p-2 bg-white rounded-lg">
                <Input type="email" placeholder="example@gmail.com" className="border-none bg-transparent" />
                <Button color="RuqyaGreen" bg={true} text="Subscribe" className="rounded-lg" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-RuqyaGray border border-[#424867] text-white text-sm mt-5 min-h-10 flex flex-col md:flex-row justify-between items-center px-4 py-2">
          <div className="flex items-center gap-4 mb-2 md:mb-0">
            <span className="">Follow Us:</span>
            <Link href="https://facebook.com" target="_blank" className="hover:text-teal-600">
              <FaFacebook />
            </Link>
            <Link href="https://twitter.com" target="_blank" className="hover:text-teal-600">
              <FaTwitter />
            </Link>
            <Link href="https://instagram.com" target="_blank" className="hover:text-teal-600">
              <FaInstagram />
            </Link>
          </div>
          <div className="text-center">&copy; {new Date().getFullYear()} Prophetic Ruqyah. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
