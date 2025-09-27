// pages/ProfilePage.jsx
import React, { useState } from 'react';
import { Camera, Edit3, Save, X } from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    address: '123 Main St, Apt 4B, New York, NY 10001',
    bio: 'Passionate cake lover and food enthusiast. Always looking for the next sweet adventure!'
  });

  const [profileImage, setProfileImage] = useState('/api/placeholder/120/120');

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    setIsEditing(false);
    // Show success message
  };

  const handleCancel = () => {
    // Reset form data if needed
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-1">Manage your personal information and preferences</p>
        </div>
        
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <Edit3 className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        {/* Profile Picture Section */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8 pb-8 border-b border-gray-200">
          <div className="relative">
            <img 
              src={profileImage} 
              alt="Profile" 
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gray-200"
            />
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">{profileData.fullName}</h2>
            <p className="text-gray-600">Cake Lover Since 2023</p>
            <p className="text-sm text-gray-500 mt-1">Member ID: CL2023001</p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            {isEditing ? (
              <input 
                type="text" 
                value={profileData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">{profileData.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            {isEditing ? (
              <input 
                type="email" 
                value={profileData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">{profileData.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            {isEditing ? (
              <input 
                type="tel" 
                value={profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">{profileData.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
            {isEditing ? (
              <input 
                type="date" 
                value={profileData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">{profileData.dateOfBirth}</p>
            )}
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            {isEditing ? (
              <input 
                type="text" 
                value={profileData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">{profileData.address}</p>
            )}
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            {isEditing ? (
              <textarea 
                value={profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">{profileData.bio}</p>
            )}
          </div>
        </div>

        {/* Account Statistics */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Statistics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-sm text-blue-800">Total Orders</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-600">$485.50</p>
              <p className="text-sm text-green-800">Total Spent</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-purple-600">8</p>
              <p className="text-sm text-purple-800">Favorite Cakes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
