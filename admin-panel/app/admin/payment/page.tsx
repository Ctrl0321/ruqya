"use client"

import { useState, useEffect } from "react"
import { AdminView } from "./AdminView"
import { EmployeeView } from "./EmployeeView"

// Mock function to get user role - replace with your actual auth logic
const getUserRole = () => {
    // Simulating an async operation
    return new Promise<"admin" | "employee">((resolve) => {
        setTimeout(() => {
            // For demo purposes, randomly return admin or employee
            resolve(Math.random() > 0.5 ? "admin" : "employee")
        }, 1000)
    })
}

export default function PaymentPage() {
    const [userRole, setUserRole] = useState<"admin" | "employee" | null>(null)

    useEffect(() => {
        getUserRole().then(setUserRole)
    }, [])

    if (!userRole) {
        return <div>Loading...</div>
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Payment Management</h1>
            {userRole === "admin" ? <AdminView /> : <EmployeeView />}
        </div>
    )
}

