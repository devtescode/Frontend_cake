import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Camera, Edit3, Save, X } from 'lucide-react';
import { API_URLS } from '../../utils/apiConfig';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    profileImage: '',
    createdAt: ''
  });
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    pendingQuantity: 0,
    pendingAmount: 0
  });
  const [imageFile, setImageFile] = useState(null);

  const user = JSON.parse(localStorage.getItem("UserData"));
  const userId = user.id;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await axios.get(API_URLS.userprofileupdate(userId));
        setProfile(res.data.profile);
        setStats(res.data.stats);
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };
    if (userId) fetchProfileData();
  }, [userId]);

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setProfile(prev => ({ ...prev, profileImage: URL.createObjectURL(file) }));
    }
  };
  const [loading, setLoading] = useState(false);
  const handleSave = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("address", profile.address);
      formData.append("bio", profile.bio);
      if (imageFile) formData.append("profileImage", imageFile);

      await axios.put(API_URLS.updateprofile(userId), formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setIsEditing(false);
      // alert("Profile updated successfully!");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Updated successfully!",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error("Error updating profile", error);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Profile Settings</h1>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="bg-pink-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-pink-600">
            <Edit3 className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            {/* <button onClick={handleSave} className="bg-pink-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-pink-600">
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button> */}
            <button
              type="submit"
              disabled={loading}
              onClick={handleSave}
              className={`w-30 flex items-center justify-center gap-2 bg-pink-600 text-white py-2 rounded-lg font-semibold transition duration-300 ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-pink-700"
                }`}
            >
              {loading && (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  {/* <span>Save...</span> */}
                  {/* <Save className="h-4 w-4" />
                  <span>Save</span> */}
                </>
              )}
              <Save className="h-4 w-4" />
              <span>{loading ? "Saving" : "Save"}</span>
            </button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-500">
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      {/* Profile Info */}
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8 pb-8 border-b border-gray-200">
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          {/* Avatar or first letter */}
          {profile.profileImage ? (
            <img
              src={profile.profileImage}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-gray-200"
            />
          ) : (
            <div className="w-full h-full rounded-full border-4 border-gray-200 bg-gray-200 flex items-center justify-center text-gray-700 text-2xl md:text-4xl font-bold">
              {profile.fullName && profile.fullName.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Camera icon for editing */}
          {isEditing && (
            <label className="absolute bottom-0 right-0 z-50 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 flex items-center justify-center">
              <Camera className="h-4 w-4" />
              <input
                type="file"
                name="profileImage"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>

        <div className="text-center sm:text-left">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">{profile.fullName}</h2>
          <p className="text-gray-600">Account Created: {new Date(profile.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Profile Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Non-editable fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">{profile.fullName}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">{profile.email}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">{profile.phone}</p>
        </div>

        {/* Editable fields */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          {isEditing ? (
            <input
              type="text"
              value={profile.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">{profile.address || "No Address yet"}</p>
          )}
        </div>
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
          {isEditing ? (
            <textarea
              value={profile.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">{profile.bio || "No Bio yet"}</p>
          )}
        </div>
      </div>

      {/* Account Stats */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Statistics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <StatCard value={stats.totalOrders} label="Paid Quantity" color="blue" />
          <StatCard value={`₦${stats.totalSpent.toLocaleString()}`} label="Paid Amount" color="green" />
          <StatCard value={stats.pendingQuantity} label="Pending Quantity" color="yellow" />
          <StatCard value={`₦${stats.pendingAmount.toLocaleString()}`} label="Pending Amount" color="red" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ value, label, color }) => (
  <div className={`bg-${color}-50 rounded-lg p-4 text-center`}>
    <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
    <p className={`text-sm text-${color}-800`}>{label}</p>
  </div>
);

export default ProfilePage;
