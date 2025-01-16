'use client'

import { useState, useEffect } from 'react'
import { Eye } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getUsers } from '@/lib/api'

interface User {
    id: string;
    name: string;
    email: string;
    country: string;
    status: 'active' | 'inactive';
    // Add other user properties here
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([{
        id: "0001",
        name: "Aathiq",
        email: "aathiqahamed333@gmail.com",
        country: "Srilanka",
        status: 'active'
    }])
    const [searchTerm, setSearchTerm] = useState('')
    const [countryFilter, setCountryFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userData = await getUsers()
                setUsers(userData)
            } catch (error) {
                console.error('Failed to fetch users:', error)
            }
        }

        fetchUsers()
    }, [])

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (countryFilter === '' || user.country === countryFilter) &&
        (statusFilter === '' || user.status === statusFilter)
    )

    const countries = Array.from(new Set(users.map(user => user.country)))

    return (
        <div className="container mx-auto  py-8 ">
            <h1 className="text-3xl font-bold mb-6 text-primary-700 ">Users</h1>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="md:w-1/3"
                />
                <Select value={countryFilter} onValueChange={setCountryFilter}>
                    <SelectTrigger className="md:w-1/4">
                        <SelectValue placeholder="Filter by country" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Countries</SelectItem>
                        {countries.map(country => (
                            <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="md:w-1/4">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredUsers.map((user) => (
                        <TableRow key={user.id} className="hover:bg-gray-50 transition-colors">
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.country}</TableCell>
                            <TableCell>{user.status}</TableCell>
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" size="sm" onClick={() => setSelectedUser(user)}>
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader >
                                            <DialogTitle>User Details</DialogTitle>
                                        </DialogHeader>
                                        {selectedUser && (
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <span className="font-bold">Name:</span>
                                                    <span className="col-span-3">{selectedUser.name}</span>
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <span className="font-bold">Email:</span>
                                                    <span className="col-span-3">{selectedUser.email}</span>
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <span className="font-bold">Country:</span>
                                                    <span className="col-span-3">{selectedUser.country}</span>
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <span className="font-bold">Status:</span>
                                                    <span className="col-span-3">{selectedUser.status}</span>
                                                </div>
                                                {/* Add more user details here */}
                                            </div>
                                        )}
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

