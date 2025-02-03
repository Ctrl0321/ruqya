"use client";

import { useState, useEffect } from "react";
import { Search, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import {
  updateUserStatus,
  updateUserRole,
  getReviews, getRakis,
} from "@/lib/api";
import { useAuth } from "@/contexts/AuthContexts";
import {languages} from "@/lib/constance";
import {getCountryLabel} from "@/lib/utils";

interface Raki {
  _id: string;
  name: string;
  email: string;
  country: string;
  status: "active" | "inactive";
  role: "super-admin" | "admin" | "user";
  timezone: string;
  languages: string[];
  mobileNumber: string;
  yearOfExperience: number;
  description: string;
  firstTimeLogin: boolean;
  age: number;
}

interface Review {
  rakiId: string;
  meetingId: string;
  userId: string;
  points: number;
  comment: string;
}

export default function TutorsPage() {
  const [tutors, setTutors] = useState<Raki[]>([]);
  const [filteredTutors, setFilteredTutors] = useState<Raki[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTutor, setSelectedTutor] = useState<Raki | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [countryFilter, setCountryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const { user: currentUser } = useAuth();

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const tutorData = await getRakis();
        setTutors(tutorData);
        setFilteredTutors(tutorData);
      } catch (error) {
        console.error("Failed to fetch tutors:", error);
        toast({
          title: "Error",
          description: "Failed to fetch tutors. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchTutors();
  }, []);


  useEffect(() => {
    const filtered = tutors.filter(
      (tutor) =>
        (tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tutor.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (countryFilter === "all" ||countryFilter === "" || tutor.country === countryFilter) &&
        (statusFilter === "all" ||statusFilter === "" || tutor.status === statusFilter) &&
        (roleFilter === "all" ||roleFilter === "" || tutor.role === roleFilter)
    );
    setFilteredTutors(filtered);
  }, [tutors, searchTerm, countryFilter, statusFilter, roleFilter]);

  const handleStatusChange = async (
    tutorId: string,
    newStatus: "active" | "inactive"
  ) => {
    try {
      await updateUserStatus(tutorId, newStatus);
      setTutors(
        tutors.map((tutor) =>
          tutor._id === tutorId ? { ...tutor, status: newStatus } : tutor
        )
      );
      toast({
        title: "Success",
        description: "Tutor status updated successfully.",
      });
    } catch (error) {
      console.error("Failed to update tutor status:", error);
      toast({
        title: "Error",
        description: "Failed to update tutor status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRoleChange = async (
    tutorId: string,
    newRole: "super-admin" | "admin" | "user"
  ) => {
    try {
      await updateUserRole(tutorId, newRole);
      setTutors(
        tutors.map((tutor) =>
          tutor._id === tutorId ? { ...tutor, role: newRole } : tutor
        )
      );
      toast({
        title: "Success",
        description: "Tutor role updated successfully.",
      });
    } catch (error) {
      console.error("Failed to update tutor role:", error);
      toast({
        title: "Error",
        description: "Failed to update tutor role. Please try again.",
        variant: "destructive",
      });
    }
  };

  const fetchReviews = async (tutorId: string) => {
    try {
      const reviewData = await getReviews(tutorId);
      setReviews(reviewData);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      toast({
        title: "Error",
        description: "Failed to fetch reviews. Please try again.",
        variant: "destructive",
      });
    }
  };

  const countries = Array.from(new Set(tutors.map((tutor) => tutor.country)));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary-700">Rakis</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search tutors..."
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
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="md:w-1/4 border border-gray-300 shadow-sm rounded p-2">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            {/*<SelectItem value="super-admin">Super Admin</SelectItem>*/}
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="user">User</SelectItem>
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
            {filteredTutors.map((tutor) => (
              <TableRow
                key={tutor._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell>{tutor.name}</TableCell>
                <TableCell>{tutor.email}</TableCell>
                <TableCell>{ getCountryLabel(tutor.country)
                    ?? "SriLanka"}</TableCell>
                <TableCell>
                  {currentUser?.role === "super-admin" ? (
                    <Select
                      value={tutor.status}
                      onValueChange={(value: "active" | "inactive") =>
                        handleStatusChange(tutor._id, value)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    tutor.status
                  )}
                </TableCell>
                <TableCell>
                  {currentUser?.role === "super-admin" ? (
                    <Select
                      value={tutor.role}
                      onValueChange={(
                        value: "super-admin" | "admin" | "user"
                      ) => handleRoleChange(tutor._id, value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="super-admin">Super Admin</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    tutor.role
                  )}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      {/*<Button*/}
                      {/*    variant="outline"*/}
                      {/*    size="sm"*/}
                      {/*    onClick={() => {*/}
                      {/*        setSelectedTutor(tutor)*/}
                      {/*        fetchReviews(tutor._id)*/}
                      {/*    }}*/}
                      {/*>*/}
                      <Eye
                        onClick={() => {
                          setSelectedTutor(tutor);
                          fetchReviews(tutor._id);
                        }}
                        className="h-4 w-4 mr-2 cursor-pointer"
                      />
                      {/*    View*/}
                      {/*</Button>*/}
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Tutor Details</DialogTitle>
                      </DialogHeader>
                      {selectedTutor && (
                        <div className="grid gap-4 py-4">
                          <div>Name: {selectedTutor.name}</div>
                          <div>Email: {selectedTutor.email}</div>
                          <div>Country: {selectedTutor.country}</div>
                          <div>Timezone: {selectedTutor.timezone}</div>
                          <div>
                            Languages: {selectedTutor.languages.join(", ")}
                          </div>
                          <div>Mobile: {selectedTutor.mobileNumber}</div>
                          <div>
                            Experience: {selectedTutor.yearOfExperience} years
                          </div>
                          <div>Age: {selectedTutor.age}</div>
                          <div>Description: {selectedTutor.description}</div>
                          <div>Reviews:</div>
                          {reviews.map((review, index) => (
                            <div key={index}>
                              <div>Points: {review.points}</div>
                              <div>Comment: {review.comment}</div>
                            </div>
                          ))}
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
    </div>
  );
}
