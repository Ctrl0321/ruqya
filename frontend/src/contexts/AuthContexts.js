'use client'

import React, { createContext, useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import {getOwnProfile} from "@/lib/api"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

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

        initializeAuth()
    }, [])

    const login = async (token) => {
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
            await fetch('/api/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            })
            setUser(null)
            router.push('/')
        } catch (error) {
            console.error('Logout failed:', error)
            throw error
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
