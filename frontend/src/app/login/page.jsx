"use client";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/ui/input/input";
import Button from "@/components/ui/buttons/DefaultButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login, googleSignup } from "@/lib/api";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";

import bg from "@/assets/images/bg.jpeg";
import logo from "@/assets/images/logo.png";

import { ErrorMessage } from "@/components/shared/common/ErrorMessage";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({ message: "", type: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({ message: "", type: "" });

    try {
      const response = await login(email, password);

      if (response && response.role === "user") {
        localStorage.setItem("fe-token", response.token);
        setLoading(false);
        setError({ message: "Login Successful", type: "success" });
        const redirectPath = localStorage.getItem("redirectPath") || "/";
        localStorage.removeItem("redirectPath");
        router.push(redirectPath);
      } else {
        setLoading(false);
        setError({ message: "Invalid login credentials", type: "error" });
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      if (err.response && err.response.status === 404) {
        setError({ message: "Invalid login credentials", type: "error" });
      } else {
        setError({ message: err.response?.message || "An error occurred", type: "error" });
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError({ message: "", type: "" });
      
      const result = await signInWithPopup(auth, googleProvider);
      
      if (!result?.user?.email) {
        throw new Error("No email provided from Google");
      }

      // Extract required user data
      const userData = {
        tokenId: result._tokenResponse.idToken,
        email: result.user.email,
        name: result.user.displayName || "",
        photoURL: result.user.photoURL || "",
        uid: result.user.uid,
        idToken: result._tokenResponse.idToken
      };

      console.log(result);
      // Send to backend
      const response = await googleSignup(userData.idToken);
      
      if (response && response.token) {
        localStorage.setItem("fe-token", response.token);
        setError({ message: "Login Successful", type: "success" });
        const redirectPath = localStorage.getItem("redirectPath") || "/";
        localStorage.removeItem("redirectPath");
        router.push(redirectPath);
      } else {
        throw new Error("Invalid response from server");
      }

    } catch (error) {
      console.error("Google Sign-in Error:", error);
      setError({ 
        message: error.response?.data?.message || error.message || "Failed to sign in with Google", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative text-sm md:text-lg">
      <Image src={bg} alt="Background" layout="fill" objectFit="cover" className="absolute inset-0 z-0 w-full h-full object-cover blur-sm" />
      <div className="absolute inset-0 z-0 w-full h-full bg-gradient-to-t from-white via-transparent"></div>
      <div className="absolute inset-0 z-0 w-full h-full top-2 bg-gradient-to-t from-white via-transparent"></div>
      <div className="w-full flex items-center justify-center relative z-10 p-4">
        {/* Left side - Image */}
        <div className="hidden lg:block">
          {/* <Image
            src={logo}
            alt="Person praying"
            width={600}
            height={800}
            className="object-cover"
            priority
          /> */}
        </div>

        {/* Center side - Form */}
        <div className="w-full max-w-md mx-auto -mt-5 md:mt-20">
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Image src={logo} alt="Prophetic Ruqyah" width={200} height={50} className="h-12 w-auto" />
            </div>

            <h1 className="text-2xl text-gray-700 text-center mb-8 pb-3 w-full border-b-2">Login</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              {error.message && <ErrorMessage message={error.message} type={error.type} />}
              <div className="relative mb-4">
                <label className="text-sm text-gray-600 absolute -top-3 left-8 bg-white px-1">Email Address</label>
                <div className="flex justify-center items-center rounded-full border px-2 py-1 border-teal-500 focus:ring-teal-500">
                  <Input type="email" name="email" placeholder="Enter your Email Address here" className="text-sm" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>

              <div className="relative mb-4">
                <label className="text-sm text-gray-600 absolute -top-3 left-8 bg-white px-1">Password</label>
                <div className="flex justify-center items-center rounded-full border px-2 py-1 border-teal-500 focus:ring-teal-500">
                  <Input type="password" name="password" placeholder="Enter your password" className="text-sm" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>

              <div className="mt-5">
                <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-full py-3" onClick={handleSubmit}>
                  Login
                </button>
              </div>
              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>
              <div className="mt-5 rounded-3xl">
                <Button 
                  type="button" 
                  variant="outline" 
                  bg={true} 
                  text="Log In with Google" 
                  color={"RuqyaGreen"} 
                  className="w-full rounded-3xl py-3 border-2"
                  onClick={handleGoogleSignIn}
                />
              </div>
              <p className="text-center text-sm text-gray-600 mt-8">
                Don't have an Account?{" "}
                
                <Link href="/signup" className="text-blue-600 hover:underline">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
