'use client'

import { Menu } from "lucide-react";
import {useEffect, useState} from "react";
import {getUserProfile} from "@/lib/api";


export default function Header({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) {
  const [user, setUser] = useState<{ name: string; profileImage: string } | null>(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile()
        setUser(userData)
      } catch (error) {
        console.error('Failed to fetch user profile:', error)
      }
    }

    fetchUserProfile()
  }, [])

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <button
            onClick={onToggleSidebar}
            className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center">
            <span className="text-gray-700 text-sm font-medium">Aathiq Ahamed</span>
            <img
              className="h-8 w-8 rounded-full ml-4"
              src="https://via.placeholder.com/150"
              alt="User avatar"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
