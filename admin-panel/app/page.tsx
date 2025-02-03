'use client'

import { useState} from 'react'
import { useRouter } from 'next/navigation'
import {login} from "@/lib/api";
import { toast } from "@/components/ui/use-toast"
import {Loader2} from "lucide-react";

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()


    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //
    //     if (token) {
    //         router.replace("/admin");
    //     }
    // }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await login(email, password)


            if (response && (response.role === "super-admin" || response.role === "admin")) {
                setLoading(false)
                toast({
                    title: "Login Successful",
                    description: "Welcome, Admin!",
                });
                router.push("/admin");

            } else {
                setLoading(false)
                toast({
                    title: "Unauthorized Access",
                    description: "You do not have permission to access this page.",
                });
            }
        } catch (err) {
            console.error(err);
            setLoading(false)
            toast({
                title: "Login Failed",
                description: "Invalid username or password.",
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center text-secondary-50">Sign In</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isLoading ? " Sign In..." : "  Sign In"}


                    </button>
                </form>
                {/*<div className="mt-6">*/}
                {/*    <button*/}
                {/*        onClick={() => signIn('google', { callbackUrl: '/admin' })}*/}
                {/*        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"*/}
                {/*    >*/}
                {/*        Sign in with Google*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

