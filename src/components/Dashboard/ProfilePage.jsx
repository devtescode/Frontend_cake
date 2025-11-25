import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Camera, Edit3, Save, X } from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phonenumber: '',
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
        const res = await axios.get(`http://localhost:4500/usercake/userprofileupdate/${userId}`);
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

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("address", profile.address);
      formData.append("bio", profile.bio);
      if (imageFile) formData.append("profileImage", imageFile);

      await axios.put(`http://localhost:4500/usercake/updateprofile/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Profile Settings</h1>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600">
            <Edit3 className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600">
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-600">
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      {/* Profile Info */}
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8 pb-8 border-b border-gray-200">
        <div className="relative">
          <img
            src={profile.profileImage || "/api/placeholder/120/120"}
            alt="Profile"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gray-200"
          />
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600">
              <Camera className="h-4 w-4" />
              <input type="file" name="profileImage" className="hidden" onChange={handleImageChange} />
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
          <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">{profile.phonenumber}</p>
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
            <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">{profile.address}</p>
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
            <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">{profile.bio || "No bio yet"}</p>
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
