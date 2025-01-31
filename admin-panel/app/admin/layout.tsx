'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar collapsed={sidebarCollapsed} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}

