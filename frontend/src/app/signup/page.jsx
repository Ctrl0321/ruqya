"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {BorderInput} from "@/components/ui/input/input";
import Button from "@/components/ui/buttons/DefaultButton";
import { signup, googleSignup } from "@/lib/api";
import { ErrorMessage } from "@/components/shared/common/ErrorMessage";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";


function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      await signup(formData.email, formData.name, formData.password);
      setSuccess(true);
      setError({message: "Registration successful!", type:"success"});
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await signInWithPopup(auth, googleProvider);

      if (!result?.user?.email) {
        setError("Failed to sign up with Google");
        return;
      }

      const userData = {
        tokenId: result._tokenResponse.idToken,
        email: result.user.email,
        name: result.user.displayName || "",
        photoURL: result.user.photoURL || "",
        uid: result.user.uid,
        idToken: result._tokenResponse.idToken,
      };

      const response = await googleSignup(userData.idToken);

      if (response && response.token) {
        localStorage.setItem("fe-token", response.token);
        setError({ message: "Registration successful!", type: "success" });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Firebase Error:", error);
      setError("Failed to sign up with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center  relative">
      <Image src={"/svg/auth-bg.svg"} alt="Background" layout="fill" objectFit="cover" className="absolute inset-0 z-0 w-full h-full object-cover" />
      <div className="absolute inset-0 z-0 w-full h-full bg-gradient-to-t from-white via-transparent"></div>
      {/* <div className="absolute inset-0 z-0 w-full h-full top-2 bg-gradient-to-t from-white via-transparent"></div> */}
      <div className="w-full flex items-center justify-center relative z-10 ">
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
        <div className="w-full max-w-md mx-auto md:mt-10 animate-fade-in" style={{ animationDelay: `500ms` }}>
          <div className="bg-white rounded-3xl p-8 shadow-xl m-5">
            {/* Logo */}
            <div className="flex justify-center mb-6">
            <Link href="/">
                <Image src={"/images/logo.png"} alt="Prophetic Ruqyah" width={200} height={50} className="h-12 w-auto" />
              </Link>
            </div>

            <h1 className="text-2xl text-gray-700 text-center mb-8 font-bold pb-3 border-b-2">Registration</h1>

            {error && <ErrorMessage message={error} type={success ? "success" : "error"} />}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative mb-4">
                  <BorderInput
                    type="text"
                    name="name"
                    label="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name here"
                    className="text-sm"
                  />
              </div>

              <div className="relative mb-4">
                  <BorderInput
                    type="email"
                    name="email"
                    label="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your Email Address here"
                    className="text-sm"
                  />
              </div>

              <div className="relative mb-4">
                  <BorderInput
                    type="password"
                    name="password"
                    label="Password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a Password"
                    className="text-sm"
                  />
              </div>

              <div className="relative mb-4">
                  <BorderInput
                    type="password"
                    name="confirmPassword"
                    label="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your created password"
                    className="text-sm"
                  />
              </div>

              <div className="mt-10">
                <Button
                  type="submit"
                  bg={true}
                  text={loading ? "Signing up..." : "Sign Up"}
                  color={"RuqyaGreen"}
                  disabled={loading}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-full py-3 mt-5"
                />
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
                <button
                  type="button"
                  className="login-with-google-btn w-full rounded-lg"
                  onClick={handleGoogleSignUp}
                >
                  Sign Up with Google
                </button>
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
