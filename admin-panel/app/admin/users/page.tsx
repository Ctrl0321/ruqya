"use client";

import { useState, useEffect } from "react";
import { Eye, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getUsers, updateUserRole } from "@/lib/api";
import { toast } from "@/components/ui/toast";
import { useAuth } from "@/contexts/AuthContexts";
import {getCountryLabel} from "@/lib/utils";

interface User {
  _id: string;
  name: string;
  email: string;
  country: string;
  status: "active" | "inactive";
  role: "super-admin" | "admin" | "user";
}

const roleOptions = ["super-admin", "admin", "user"];

export default function UsersPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isRoleChangeDialogOpen, setIsRoleChangeDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers();
        setUsers(userData);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (countryFilter === "all" ||
        countryFilter === "" ||
        user.country === countryFilter) &&
      (statusFilter === "all" ||
        statusFilter === "" ||
        user.status === statusFilter)
  );

  const countries = Array.from(new Set(users.map((user) => user.country)));

  const handleRoleChange = async (userId: string, newRole: string) => {
    setSelectedUser(users.find((user) => user._id === userId) || null);
    setNewRole(newRole);
    setIsRoleChangeDialogOpen(true);
  };

  const confirmRoleChange = async () => {
    if (!selectedUser) return;

    try {
      await updateUserRole(selectedUser._id, newRole);
      setUsers(
        users.map((user) =>
          user._id === selectedUser._id
            ? { ...user, role: newRole as User["role"] }
            : user
        )
      );
      toast({
        title: "Success",
        description: "User role updated successfully.",
      });
    } catch (error) {
      console.error("Failed to update user role:", error);
      toast({
        title: "Error",
        description: "Failed to update user role. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRoleChangeDialogOpen(false);
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary-700">Users</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className=" border border-gray-300 shadow-sm rounded p-2 pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <Select value={countryFilter} onValueChange={setCountryFilter}>
          <SelectTrigger className="md:w-1/4 border border-gray-300 shadow-sm rounded p-2">
            <SelectValue placeholder="Filter by country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {getCountryLabel(country)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="md:w-1/4 border border-gray-300 shadow-sm rounded p-2">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Name</TableHead>
              <TableHead className="font-bold">Email</TableHead>
              <TableHead className="font-bold">Country</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="font-bold">Role</TableHead>
              <TableHead className="font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell> {getCountryLabel(user.country ?? "ae")}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>
                  {currentUser?.role === "super-admin" ? (
                    <Select
                      value={user.role}
                      onValueChange={(newRole) =>
                        handleRoleChange(user._id, newRole)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    user.role
                  )}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      {/*<Button*/}
                      {/*    variant="outline"*/}
                      {/*    size="sm"*/}
                      {/*    onClick={() => setSelectedUser(user)}*/}
                      {/*    className="transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-md"*/}
                      {/*>*/}
                      <Eye
                        onClick={() => setSelectedUser(user)}
                        className="h-4 w-4 mr-2 cursor-pointer"
                      />
                      {/*</Button>*/}
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>User Details</DialogTitle>
                      </DialogHeader>
                      {selectedUser && (
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-bold">Name:</span>
                            <span className="col-span-3">
                              {selectedUser.name}
                            </span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-bold">Email:</span>
                            <span className="col-span-3">
                              {selectedUser.email}
                            </span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-bold">Country:</span>
                            <span className="col-span-3">
                              {selectedUser.country}
                            </span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-bold">Status:</span>
                            <span
                              className={`col-span-3 px-2 py-1 rounded-full text-xs font-semibold ${
                                selectedUser.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {selectedUser.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-bold">Role:</span>
                            <span className="col-span-3">
                              {selectedUser.role}
                            </span>
                          </div>
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

      <Dialog
        open={isRoleChangeDialogOpen}
        onOpenChange={setIsRoleChangeDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Role Change</DialogTitle>
            <DialogDescription>
              Are you sure you want to change the role of {selectedUser?.name}{" "}
              to {newRole}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRoleChangeDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={confirmRoleChange}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
