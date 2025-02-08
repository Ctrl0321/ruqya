'use client'

import React, { createContext, useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import {getOwnProfile} from "@/lib/api";

export interface UserDto {
    _id: string
    name: string
    email: string
    role: 'super-admin' | 'admin' | 'user'
    country:string
    languages:string[]
    mobileNumber:string
    yearOfExperience?:number
    description?:string
    firstTimeLogin?:boolean
    googleId?:string
    age:number
    password:string
    status:string
}

interface AuthContextType {
    user: UserDto | null
    login: (token: string) => Promise<void>
    logout: () => Promise<void>
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserDto | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const token = localStorage.getItem("token");


    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const userData = await getOwnProfile()
                setUser(userData)
            } catch (error) {

                console.error('Failed to fetch user profile:', error)
            } finally {
                setIsLoading(false)
            }
        }

        if (token) initializeAuth()

    }, [token])


    const login = async (token: string) => {
        try {
            const userData = await getOwnProfile()
            setUser(userData)
            router.push('/admin')
        } catch (error) {
            console.error('Login failed:', error)
            throw error
        }
    }

    const logout = async () => {
        try {
            await fetch('/api/logout', { method: 'POST' })
            setUser(null)
            router.push('/signin')
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

