"use client";
import React, { useState, useEffect } from "react";
import EditProfilePopup from "@/components/ui/popup/editPofile";
import Input from "@/components/ui/input/input";
import UserData from "@/data/user";
import countryList from "react-select-country-list";
import Select from "react-select";

const MyProfile = () => {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDataSaved, setIsDataSaved] = useState(false);
  const [formData, setFormData] = useState({
    firstName: UserData.firstName,
    email: UserData.email,
    gender: UserData.gender,
    dob: UserData.DOB,
    country: UserData.country,
    language: UserData.language,
    mobile: UserData.mobile,
    password: "",
    confirmPassword: ""
  });
  const [popupData, setPopupData] = useState(null);

  const options = countryList().getData();

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  };

  const handleEditButtonClick = () => {
    if (!popupData) {
      setPopupData({ ...formData });
    }
    setIsEditPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsEditPopupOpen(false);
  };

  const handleSaveButtonClick = () => {
    if (popupData.password !== popupData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setFormData({ ...popupData });
    setIsDataSaved(true);
    setIsEditPopupOpen(false);

    alert(`Updated Data:\n${JSON.stringify({
      firstName: popupData.firstName,
      email: popupData.email,
      gender: popupData.gender,
      dob: popupData.dob,
      country: popupData.country,
      language: popupData.language,
      mobile: popupData.mobile,
    }, null, 2)}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPopupData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCountryChange = (selectedOption) => {
    setPopupData(prevState => ({ ...prevState, country: selectedOption.label }));
  };

  useEffect(() => {
    if (isEditPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isEditPopupOpen]);

  // useEffect(() => {
  //   if (isDataSaved) {
  //     alert("Data saved");
  //     setIsDataSaved(false);
  //   }
  // }, [isDataSaved]);

  return (
    <div className="p-6 mb-32 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>
      <div className="profile-details grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 bg-white p-6 rounded-lg shadow-lg">
        <p>
          <strong>First Name:</strong> {formData.firstName}
        </p>
        <p>
          <strong>Email:</strong> {formData.email}
        </p>
        <p>
          <strong>Gender:</strong> {formData.gender}
        </p>
        <p>
          <strong>Age:</strong> {calculateAge(formData.dob)}
        </p>
        <p>
          <strong>Country:</strong> {formData.country}
        </p>
        <p>
          <strong>Language:</strong> {formData.language}
        </p>
        <p>
          <strong>Mobile Number:</strong> {formData.mobile}
        </p>
      </div>
      <button onClick={handleEditButtonClick} className="bg-teal-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-teal-600 transition duration-300">
        Edit Profile
      </button>
      {isEditPopupOpen && popupData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg relative w-full max-w-3xl mx-4 md:mx-0 shadow-lg">
            <div className="bg-gray-200 p-4 flex justify-between rounded-t-lg items-center">
              <span className="text-gray-600 text-lg">Edit Profile Details</span>
              <div className="w-7 h-7 bg-red-600 rounded-sm flex items-center justify-center">
              <button onClick={handleClosePopup} className="text-white -mt-1 text-lg font-bold">
                &times;
              </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[80vh]">
              <div className="flex flex-col md:grid gap-6 md:grid-cols-2">
                <div className="relative mb-6">
                  <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-1 w-auto">First Name</label>
                  <div className="flex justify-center items-center rounded-full border px-4 py-3 border-teal-500 focus:ring-teal-500">
                    <Input type="text" name="firstName" defaultValue={popupData.firstName} onChange={handleChange} placeholder="First Name" className="text-sm w-full" />
                  </div>
                </div>
                <div className="relative mb-6">
                  <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-1 w-auto">Email</label>
                  <div className="flex justify-center items-center rounded-full border px-4 py-3 border-teal-500 focus:ring-teal-500">
                    <Input type="email" name="email" defaultValue={popupData.email} onChange={handleChange} placeholder="Email" className="text-sm w-full" />
                  </div>
                </div>
                <div className="relative mb-6">
                  <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-1 w-auto">Gender</label>
                  <div className="flex justify-center items-center rounded-full border px-4 py-3 border-teal-500 focus:ring-teal-500">
                    <select name="gender" defaultValue={popupData.gender} onChange={handleChange} className="text-sm w-full bg-transparent appearance-none">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="relative mb-6">
                  <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-1 w-auto">Date of Birth</label>
                  <div className="flex justify-center items-center rounded-full border px-4 py-3 border-teal-500 focus:ring-teal-500">
                    <Input type="date" name="dob" defaultValue={popupData.dob} onChange={handleChange} className="text-sm w-full" />
                  </div>
                </div>
                <div className="relative mb-6">
                  <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-2 mb-2 w-auto">Country</label>
                  <div className="flex justify-center items-center rounded-full border px-4 py-1 border-teal-500 focus:ring-teal-500">
                    <Select
                      options={options}
                      defaultValue={options.find(option => option.label === popupData.country)}
                      onChange={handleCountryChange}
                      className="text-sm w-full bg-transparent"
                      styles={{
                        control: (base) => ({
                          ...base,
                          border: 'none',
                          boxShadow: 'none',
                          '&:hover': { border: 'none' }
                        }),
                        dropdownIndicator: (base) => ({
                          ...base,
                          display: 'none'
                        }),
                        indicatorSeparator: (base) => ({
                          ...base,
                          display: 'none'
                        })
                      }}
                    />
                  </div>
                </div>
                <div className="relative mb-6">
                  <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-1 w-auto">Language</label>
                  <div className="flex justify-center items-center rounded-full border px-4 py-3 border-teal-500 focus:ring-teal-500">
                    <select name="language" defaultValue={popupData.language} onChange={handleChange} className="text-sm w-full bg-transparent appearance-none">
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Chinese">Chinese</option>
                    </select>
                  </div>
                </div>
                <div className="relative mb-6">
                  <label className="te`x`t-sm text-gray-600 absolute -top-3 left-4 bg-white px-1 w-auto">Mobile Number</label>
                  <div className="flex justify-center items-center rounded-full border px-4 py-3 border-teal-500 focus:ring-teal-500">
                    <Input type="number" name="mobile" defaultValue={popupData.mobile} onChange={handleChange} placeholder="Mobile Number" className="text-sm w-full" />
                  </div>
                </div>
                <div className="md:grid md:grid-cols-2 col-span-2 gap-6">
                  <h3 className="col-span-2 text-lg font-semibold mb-6">Change Password</h3>
                  <div className="relative mb-6 ">
                    <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-1 w-auto">Password</label>
                    <div className="flex justify-center items-center rounded-full border px-4 py-3 border-teal-500 focus:ring-teal-500">
                      <Input type="password" name="password" defaultValue={popupData.password} onChange={handleChange} placeholder="Create a Password" className="text-sm w-full" />
                    </div>
                  </div>
                  <div className="relative mb-6">
                    <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-1 w-auto">Confirm Password</label>
                    <div className="flex justify-center items-center rounded-full border px-4 py-3 border-teal-500 focus:ring-teal-500">
                      <Input type="password" name="confirmPassword" defaultValue={popupData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="text-sm w-full" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 col-span-2 gap-6">
                  <button onClick={handleClosePopup} className="w-full bg-gray-500 hover:bg-gray-600 text-white rounded-full py-3 mt-5 transition duration-300">
                    Cancel
                  </button>
                  <button onClick={handleSaveButtonClick} className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-full py-3 mt-5 transition duration-300">
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
