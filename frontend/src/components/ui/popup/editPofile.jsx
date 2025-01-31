import React from "react";
import Input from "@/components/ui/input/input";

const EditProfilePopup = () => {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-6">
      <div className="relative mb-4">
        <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-1 w-auto">First Name</label>
        <div className="flex justify-center items-center rounded-full border px-2 py-1 border-teal-500 focus:ring-teal-500">
          <Input type="text" placeholder="First Name" className="text-sm" />
        </div>
      </div>
      <div className="relative mb-4">
        <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-1 w-auto">Email</label>
        <div className="flex justify-center items-center rounded-full border px-2 py-1 border-teal-500 focus:ring-teal-500">
          <Input type="email" placeholder="Email" className="text-sm" />
        </div>
      </div>
      <div className="relative mb-4">
        <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-1 w-auto">Gender</label>
        <div className="flex justify-center items-center rounded-full border px-2 py-1 border-teal-500 focus:ring-teal-500">
          <Input type="text" placeholder="Gender" className="text-sm" />
        </div>
      </div>
      <div className="relative mb-4">
        <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-1 w-auto">Age</label>
        <div className="flex justify-center items-center rounded-full border px-2 py-1 border-teal-500 focus:ring-teal-500">
          <Input type="number" placeholder="Age" className="text-sm" />
        </div>
      </div>
      <div className="relative mb-4">
        <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-1 w-auto">Country</label>
        <div className="flex justify-center items-center rounded-full border px-2 py-1 border-teal-500 focus:ring-teal-500">
          <Input type="text" placeholder="Country" className="text-sm" />
        </div>
      </div>
      <div className="relative mb-4">
        <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-1 w-auto">Language</label>
        <div className="flex justify-center items-center rounded-full border px-2 py-1 border-teal-500 focus:ring-teal-500">
          <Input type="text" placeholder="Language" className="text-sm" />
        </div>
      </div>
      <div className="relative mb-4">
        <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-1 w-auto">Mobile Number</label>
        <div className="flex justify-center items-center rounded-full border px-2 py-1 border-teal-500 focus:ring-teal-500">
          <Input type="text" placeholder="Mobile Number" className="text-sm" />
        </div>
      </div>
      <div className="grid grid-cols-2 col-span-2 gap-3 md:gap-5">
        <h3 className="col-span-2 mx-1 mb-2">Change Password</h3>
        <div className="relative mb-4">
          <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-1 w-auto">Password</label>
          <div className="flex justify-center items-center rounded-full border px-2 py-1 border-teal-500 focus:ring-teal-500">
            <Input type="password" placeholder="Create a Password" className="text-sm" />
          </div>
        </div>
        <div className="relative mb-4">
          <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-1 w-auto">Confirm Password</label>
          <div className="flex justify-center items-center rounded-full border px-2 py-1 border-teal-500 focus:ring-teal-500">
            <Input type="password" placeholder="Confirm Password" className="text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePopup;
