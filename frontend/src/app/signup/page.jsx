"use client";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/ui/input/input";
import Button from "@/components/ui/buttons/DefaultButton";
import { useEffect } from "react";

import bg from "@/assets/images/bg.jpeg";
import logo from "@/assets/images/logo.png";

function SignUp() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 mb-56 relative">
      <Image src={bg} alt="Background" layout="fill" objectFit="cover" className="absolute inset-0 z-0 w-full h-full object-cover blur-sm" />
      <div className="absolute inset-0 z-0 w-full h-full bg-gradient-to-t from-white via-transparent"></div>
      <div className="absolute inset-0 z-0 w-full h-full top-2 bg-gradient-to-t from-white via-transparent"></div>
      <div className="w-full flex items-center justify-center relative z-10 p-4">
        {/* Left side - Image */}
        <div className="hidden lg:block">
          {/* <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sign%20up-s7G4xo2FweLQ6qO3qcwN2jivBqbEec.png"
            alt="Person praying"
            width={600}
            height={800}
            className="object-cover"
            priority
          /> */}
        </div>

        {/* Center side - Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Image
                src={logo}
                alt="Prophetic Ruqyah"
                width={200}
                height={50}
                className="h-12 w-auto"
              />
            </div>

            <h1 className="text-2xl text-gray-700 text-center mb-8 font-bold">Registration</h1>

            <form className="space-y-6">
              <div className="relative mb-4">
                <label className="text-sm text-gray-600 absolute -top-3 left-8 bg-white px-1">Full Name</label>
                <div className="flex justify-center items-center rounded-full border px-2 py-2 border-teal-500 focus:ring-teal-500">
                  <Input type="text" placeholder="Enter your full name here" className="" />
                </div>
              </div>

              <div className="relative mb-4">
                <label className="text-sm text-gray-600 absolute -top-3 left-8 bg-white px-1">Email Address</label>
                <div className="flex justify-center items-center rounded-full border px-2 py-2 border-teal-500 focus:ring-teal-500">
                  <Input type="email" placeholder="Enter your Email Address here" className="" />
                </div>
              </div>

              <div className="relative mb-4">
                <label className="text-sm text-gray-600 absolute -top-3 left-8 bg-white px-1">Password</label>
                <div className="flex justify-center items-center rounded-full border px-2 py-2 border-teal-500 focus:ring-teal-500">
                  <Input type="password" placeholder="Create a Password" className="" />
                </div>
              </div>

              <div className="relative mb-4">
                <label className="text-sm text-gray-600 absolute -top-3 left-8 bg-white px-1">Confirm Password</label>
                <div className="flex justify-center items-center rounded-full border px-2 py-2 border-teal-500 focus:ring-teal-500">
                  <Input type="password" placeholder="Re-enter your created password" className="" />
                </div>
              </div>
              <div className="mt-10">
                <Button type="submit" bg={true} text="Sign Up" color={"RuqyaGreen"} className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-full py-4 mt-12" />
              </div>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>
              <div className="mt-5">
                <Button type="button" variant="outline" bg={true} text="Sign Up with Google" color={"RuqyaGreen"} className="w-full rounded-full py-6 border-2" />
              </div>
              <p className="text-center text-sm text-gray-600 mt-8">
                Already have an Account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Log In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignUp;
