"use client";
import React, { useState, useEffect } from "react";
import EditProfilePopup from "@/components/ui/popup/editPofile";
import Input from "@/components/ui/input/input";

const MyProfile = () => {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDataSaved, setIsDataSaved] = useState(false);

  const handleEditButtonClick = () => {
    setIsEditPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsEditPopupOpen(false);
  };

  const handleSaveButtonClick = () => {
    setIsDataSaved(true);
    setIsEditPopupOpen(false);
  };

  useEffect(() => {
    if (isEditPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isEditPopupOpen]);

  useEffect(() => {
    if (isDataSaved) {
      alert("Data saved");
      setIsDataSaved(false);
    }
  }, [isDataSaved]);

  return (
    <div className="p-4 mb-32 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="profile-details grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <p>
          <strong>First Name:</strong> John
        </p>
        <p>
          <strong>Email:</strong> john.doe@example.com
        </p>
        <p>
          <strong>Gender:</strong> Male
        </p>
        <p>
          <strong>Age:</strong> 30
        </p>
        <p>
          <strong>Country:</strong> USA
        </p>
        <p>
          <strong>Language:</strong> English
        </p>
        <p>
          <strong>Mobile Number:</strong> +1234567890
        </p>
      </div>
      <button onClick={handleEditButtonClick} className="bg-teal-500 text-white px-4 py-2 rounded-full">
        Edit Profile
      </button>
      {isEditPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg relative w-full max-w-3xl mx-4 md:mx-0">
            <div className="bg-gray-200 p-2 flex justify-between rounded-t-lg mb-3 items-center">
              <span className="text-gray-600 mx-3">Edit Profile Details</span>
              <div className="w-5 h-5 rounded-sm bg-red-600 flex items-center justify-center">
                <button onClick={handleClosePopup} className="text-white leading-none -mt-1">
                  x
                </button>
              </div>
            </div>
            <div className="p-4 overflow-y-auto">
              <div className="grid grid-cols-2 gap-3 md:gap-6">
                <div className="relative mb-4">
                  <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-1 w-auto">First Name</label>
                  <div className="flex justify-center items-center rounded-full border px-2 py-1 border-teal-500 focus:ring-teal-500">
                    <Input type="text" placeholder="First Name" className="text-sm" />
                  </div>
                </div>
                <div className="relative mb-4">
                  <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-1 w-auto">Email</label>
                  <div className="flex justify-center  items-center rounded-full border px-2 py-1 border-teal-500 focus:ring-teal-500">
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
                  <div className="flex justify-center items-centeRr rounded-full border px-2 py-1 border-teal-500 focus:ring-teal-500">
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
                <div className="grid grid-cols-2 col-span-2 gap-3 md:gap-5">
                    <button onClick={handleClosePopup} className="w-full bg-gray-500 hover:bg-gray-600 text-white rounded-full py-3 mt-5">
                      Cancel
                    </button>
                    <button onClick={handleSaveButtonClick} className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-full py-3 mt-5">
                      Save
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
