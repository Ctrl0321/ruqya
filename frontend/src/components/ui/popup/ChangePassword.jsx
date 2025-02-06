'use client';
import React, { useState } from "react";
import { ErrorMessage } from "@/components/shared/common/ErrorMessage";
import { BorderInput } from "@/components/ui/input/input";
const ChangePassword = ({ onClose, onSubmit }) => {
  const MIN_PASSWORD_LENGTH = 8; // Add this constant
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setError(null); // Clear error when user types
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setError(null); // Clear error when closing
    onClose();
  };

  const handleSubmit = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All password fields are required");
      return;
    }

    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      setError(`New password must be at least ${MIN_PASSWORD_LENGTH} characters long`);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    onSubmit(passwordData);
    handleClose();
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-50 pt-10 overflow-y-auto">
      <div className="bg-white rounded-lg relative w-full max-w-md mx-4 md:mx-0 shadow-lg mb-10">
        <div className="bg-gray-200 p-4 flex justify-between rounded-t-lg items-center">
          <span className="text-gray-600 text-lg">Change Password</span>
          <button onClick={handleClose} className="text-white px-3 py-1.5 rounded-lg font-sans bg-red-500 text-lg font-bold">
            &times;
          </button>
        </div>
        <div className="p-6">
          {error && <ErrorMessage message={error} />}
          <div className="flex flex-col gap-6">
            <div className="relative mb-6">
              <BorderInput
                label="Current Password"
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="relative mb-6">
              <BorderInput
                label="New Password"
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="relative mb-6">
              <BorderInput
                label="Confirm New Password"
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <button onClick={handleClose} className="w-full bg-gray-500 hover:bg-gray-600 text-white rounded-full py-3 transition duration-300">
                Cancel
              </button>
              <button onClick={handleSubmit} className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-full py-3 transition duration-300">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
