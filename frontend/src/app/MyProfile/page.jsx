"use client";
import React, { useState, useEffect } from "react";
import EditProfilePopup from "@/components/ui/popup/editPofile";
import { countries, languages } from "@/lib/constance";
import CustomSelect from "@/components/ui/input/select";
import Loading from "@/components/shared/common/LoadingSpinner"
import {getOwnProfile, updateUserProfile} from "@/lib/api";
import { ErrorMessage } from "@/components/shared/common/ErrorMessage";
import { getCountryLabel, getLanguageLabel } from "@/lib/utils";
import { camelCase, startCase } from "lodash";

const MyProfile = () => {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDataSaved, setIsDataSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    dob: "",
    country: "",
    language: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [popupData, setPopupData] = useState({
    name: "",
    email: "",
    gender: "",
    dob: "",
    country: "",
    language: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getOwnProfile();
        if (!data) {
          throw new Error("No data returned from API");
        }
        setUserData(data);
        setFormData({
          name: startCase(data.name) || "",
          email: data.email || "",
          gender: data.gender || "",
          dob: data.DOB || "",
          country: data.country || "",
          language: data.language || "",
          mobile: data.mobile || "",
          password: "",
          confirmPassword: "",
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
        setUserData(null);
      }
    };

    fetchUserData();
  }, []);

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const validateMobile = (number) => {
    const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
    return phoneRegex.test(number);
  };

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handleEditButtonClick = () => {
    setPopupData({ ...formData });
    setIsEditPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsEditPopupOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPopupData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = (selectedOption, selectName) => {
    if (!selectedOption) return;
    
    setPopupData(prevState => ({
      ...prevState,
      [selectName]: selectedOption.value
    }));
  };

  const handleSaveButtonClick = async () => {
    // Only check passwords if both password fields have values
    if (popupData.password || popupData.confirmPassword) {
      if (popupData.password !== popupData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
    }

    // Only validate mobile if it has been changed
    if (popupData.mobile && popupData.mobile !== formData.mobile) {
      if (!validateMobile(popupData.mobile)) {
        alert("Please enter mobile number in format: (XXX) XXX-XXXX");
        return;
      }
    }

    const changedValues = {};
    Object.keys(popupData).forEach(key => {
      // Only include values that are different from the original and not empty
      if (popupData[key] && popupData[key] !== formData[key]) {
        changedValues[key] = popupData[key];
      }
    });

    // Remove password fields if they're empty
    if (!changedValues.password) {
      delete changedValues.password;
      delete changedValues.confirmPassword;
    }

    if (Object.keys(changedValues).length === 0) {
      alert("No changes made");
      return;
    }

    // Update only the changed values
    setFormData(prevState => ({
      ...prevState,
      ...changedValues
    }));

    try {
      await updateUserProfile({
        ...formData,
        ...changedValues
      });
      setIsDataSaved(true);
      setIsEditPopupOpen(false);

      const displayChanges = {};
      Object.keys(changedValues).forEach(key => {
        if (key !== 'password' && key !== 'confirmPassword') {
          const label = key.charAt(0).toUpperCase() + key.slice(1);
          displayChanges[label] = changedValues[key];
        }
      });

      if (Object.keys(displayChanges).length > 0) {
        alert(`Updated Values:\n${JSON.stringify(displayChanges, null, 2)}`);
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      alert('Error updating user profile. Please try again later.');
    }
  };

  useEffect(() => {
    if (isEditPopupOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
      document.body.style.width = "auto";
    }
  }, [isEditPopupOpen]);

  useEffect(() => {
    const handleScroll = (event) => {
      event.preventDefault();
    };

    if (isEditPopupOpen) {
      window.addEventListener("scroll", handleScroll, { passive: false });
    } else {
      window.removeEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isEditPopupOpen]);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen text-black">
        <ErrorMessage message="Error fetching user data. Please try again later." />
      </div>
    );
  }

  return (
    <div className="p-6 mb-10 min-h-screen">
      <div className="w-full"> {/* Changed from max-w-4xl mx-auto to w-full */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-40 bg-gradient-to-r from-teal-500 to-teal-600"> {/* Increased height from h-32 to h-40 */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="w-32 h-32 rounded-full bg-teal-600 border-4 border-white flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {formData.name ? formData.name.charAt(0).toUpperCase() : "?"}
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 px-8 pb-8"> {/* Increased padding */}
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">{formData.name}</h1> {/* Increased text size */}
            <p className="text-center text-gray-600 mb-8">{formData.email}</p> {/* Increased bottom margin */}

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8"> {/* Changed grid layout */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium text-gray-800">{formData.gender || "Not specified"}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Age & Birthday</p>
                    <p className="font-medium text-gray-800">
                      {formData.dob ? `${calculateAge(formData.dob)} years (${formatDate(formData.dob)})` : "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Country</p>
                    <p className="font-medium text-gray-800">{getCountryLabel(formData.country) || "Not specified"}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Language</p>
                    <p className="font-medium text-gray-800">{getLanguageLabel(formData.language) || "Not specified"}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow md:col-span-2">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mobile Number</p>
                    <p className="font-medium text-gray-800">{formData.mobile || "Not specified"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center"> {/* Increased top margin */}
              <button 
                onClick={handleEditButtonClick} 
                className="inline-flex items-center px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-full transition duration-300 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Keep existing edit popup code */}
      {isEditPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg relative w-full max-w-3xl mx-4 md:mx-0 shadow-lg">
            <div className="bg-gray-200 p-4 flex justify-between rounded-t-lg items-center">
              <span className="text-gray-600 text-lg">Edit Profile Details</span>
              <div className="w-7 h-7 bg-red-600 rounded-sm flex items-center justify-center">
                <button onClick={handleClosePopup} className="text-white text-lg font-bold">
                  &times;
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[80vh]">
              <div className="flex flex-col md:grid gap-6 md:grid-cols-2">
                <div className="relative mb-6">
                  <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-1 w-auto">First Name</label>
                  <div className="flex justify-center items-center rounded-full border px-4 py-1 border-teal-500 focus:ring-teal-500">
                    <input
                      type="text"
                      name="name"
                      value={popupData.name}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="text-sm w-full outline-none"
                    />
                  </div>
                </div>
                <div className="relative mb-6">
                  <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-1 w-auto">Email</label>
                  <div className="flex justify-center items-center rounded-full border px-4 py-1 border-teal-500 focus:ring-teal-500">
                    <input
                      type="email"
                      name="email"
                      value={popupData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="text-sm w-full outline-none"
                    />
                  </div>
                </div>
                <div className="relative mb-6">
                  <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-1 w-auto">Gender</label>
                  <div className="flex justify-center items-center rounded-full border px-4 py-1 border-teal-500 focus:ring-teal-500">
                    <CustomSelect 
                      options={genderOptions} 
                      value={genderOptions.find(option => option.value === popupData.gender) || null}
                      onChange={(option) => handleSelectChange(option, 'gender')}
                      name="gender" 
                      placeholder="Select Gender"
                    />
                  </div>
                </div>
                <div className="relative mb-6">
                  <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-1 w-auto">Date of Birth</label>
                  <div className="flex justify-center items-center rounded-full border px-4 py-1 border-teal-500 focus:ring-teal-500">
                    <input
                      type="date"
                      name="dob"
                      value={popupData.dob}
                      onChange={handleChange}
                      className="text-sm w-full outline-none"
                    />
                  </div>
                </div>
                <div className="relative mb-6">
                  <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-2 mb-2 w-auto">Country</label>
                  <div className="flex justify-center items-center rounded-full border px-4 py-1 border-teal-500 focus:ring-teal-500">
                    <CustomSelect 
                      options={countries} 
                      value={countries.find(option => option.value === popupData.country) || null}
                      onChange={(option) => handleSelectChange(option, 'country')}
                      name="country" 
                      placeholder="Select Country"
                    />
                  </div>
                </div>
                <div className="relative mb-6">
                  <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-1 w-auto">Language</label>
                  <div className="flex justify-center items-center rounded-full border px-4 py-1 border-teal-500 focus:ring-teal-500">
                    <CustomSelect 
                      options={languages} 
                      value={languages.find(option => option.value === popupData.language) || null}
                      onChange={(option) => handleSelectChange(option, 'language')}
                      name="language" 
                      placeholder="Select Language"
                    />
                  </div>
                </div>
                <div className="relative mb-6">
                  <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-1 w-auto">Mobile Number</label>
                  <div className="flex justify-center items-center rounded-full border px-4 py-1 border-teal-500 focus:ring-teal-500">
                    <input
                      type="tel"
                      name="mobile"
                      value={popupData.mobile}
                      onChange={handleChange}
                      placeholder="(XXX) XXX-XXXX"
                      className="text-sm w-full outline-none"
                    />
                  </div>
                </div>
                <div className="md:grid md:grid-cols-2 col-span-2 gap-6">
                  <h3 className="col-span-2 text-lg font-semibold mb-6">Change Password</h3>
                  <div className="relative mb-6 ">
                    <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-1 w-auto">Password</label>
                    <div className="flex justify-center items-center rounded-full border px-4 py-1 border-teal-500 focus:ring-teal-500">
                      <input
                        type="password"
                        name="password"
                        value={popupData.password}
                        onChange={handleChange}
                        placeholder="Create a Password"
                        className="text-sm w-full outline-none"
                      />
                    </div>
                  </div>
                  <div className="relative mb-6">
                    <label className="text-sm text-gray-600 absolute -top-3 left-4 bg-white px-1 w-auto">Confirm Password</label>
                    <div className="flex justify-center items-center rounded-full border px-4 py-1 border-teal-500 focus:ring-teal-500">
                      <input
                        type="password"
                        name="confirmPassword"
                        value={popupData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        className="text-sm w-full outline-none"
                      />
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