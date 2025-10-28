// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  ShoppingBag,
  CreditCard,
  Heart,
  MessageSquare,
  Bell,
  MapPin,
  Settings,
  LogOut,
  Package,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import OverviewPage from './OverviewPage';
import ProfilePage from './ProfilePage';
import { Link, useNavigate } from 'react-router-dom';
import Cakespage from './Cakespage';

// Import all page components
// import OverviewPage from './pages/OverviewPage';
// import ProfilePage from './pages/ProfilePage';
// import OrdersPage from './pages/OrdersPage';
// import PaymentsPage from './pages/PaymentsPage';
// import FavoritesPage from './pages/FavoritesPage';
// import ReviewsPage from './pages/ReviewsPage';
// import NotificationsPage from './pages/NotificationsPage';
// import DeliveryPage from './pages/DeliveryPage';
// import SettingsPage from './pages/SettingsPage';

const Userdashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Always closed by default
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isScreenChecked, setIsScreenChecked] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(false);
      if (mobile) {
        setIsSidebarExpanded(true);
      }
      setIsScreenChecked(true);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const sidebarItems = [
    { id: 'overview', label: 'Dashboard', icon: Package },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'cakes', label: 'Cakes', icon: ShoppingBag },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'delivery', label: 'Delivery Info', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSidebarExpansion = () => {
    if (!isMobile) {
      setIsSidebarExpanded(!isSidebarExpanded);
    }
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const overlayVariants = {
    open: {
      opacity: 1,
      transition: { duration: 0.3 }
    },
    closed: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'overview': return <OverviewPage />;
      case 'profile': return <ProfilePage />;
        case 'cakes': return <Cakespage />;
      //   case 'payments': return <PaymentsPage />;
      //   case 'favorites': return <FavoritesPage />;
      //   case 'reviews': return <ReviewsPage />;
      //   case 'notifications': return <NotificationsPage />;
      //   case 'delivery': return <DeliveryPage />;
      //   case 'settings': return <SettingsPage />;
      //   default: return <OverviewPage />;
    }
  };


  // const user = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("UserData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const navigate = useNavigate()

  if (!isScreenChecked) return null;
  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed bg-black/40 backdrop-blur-sm  inset-0 bg-opacity-50 z-40"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={isMobile ? "closed" : "open"}
        animate={isMobile ? (isSidebarOpen ? "open" : "closed") : "open"}
        variants={sidebarVariants}
        className={`${isMobile ? 'fixed' : 'relative'
          } ${isSidebarExpanded && !isMobile ? 'w-64' : 'w-16'
          } bg-white shadow-lg z-50 transition-all duration-300 ${isMobile ? 'w-64 h-full' : ''
          }`}
      >
        {/* Sidebar Header */}
        <div className={`p-4 border-b border-gray-200 ${!isSidebarExpanded && !isMobile ? 'px-2' : ''}`}>
          <div className="flex items-center justify-between">
            {(isSidebarExpanded || isMobile) && (
              <div className="flex items-center space-x-3">
                {/* <img
                  src="/api/placeholder/40/40"
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                /> */}
                <div className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">
                  {user?.fullname ? user.fullname.charAt(0).toUpperCase() : "?"}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">{user?.fullname || "Guest User"}</h3>
                  <p className="text-xs text-gray-600">Welcome back!</p>
                </div>
              </div>
            )}

            {!isMobile && (
              <button
                onClick={toggleSidebarExpansion}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isSidebarExpanded ?
                  <ChevronLeft className="h-4 w-4 text-gray-600" /> :
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                }
              </button>
            )}

            {isMobile && (
              <button
                onClick={closeSidebar}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-2">
          <ul className="space-y-1">
            {sidebarItems.map(item => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      if (isMobile) closeSidebar();
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors group ${activeTab === item.id
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                      } ${!isSidebarExpanded && !isMobile ? 'justify-center' : ''}`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {(isSidebarExpanded || isMobile) && <span className="text-sm">{item.label}</span>}

                    {/* Tooltip for collapsed sidebar */}
                    {!isSidebarExpanded && !isMobile && (
                      <div className="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                        {item.label}
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-2 right-2">
          {/* <Link to="/login" className="font-medium hover:text-primary-dark transition-colors"> */}
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("UserData");
              navigate("/login");
            }}
            className={` w-full flex items-center space-x-3 px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors group ${!isSidebarExpanded && !isMobile ? 'justify-center' : ''}`}>
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {(isSidebarExpanded || isMobile) && <span className="text-sm">Logout</span>}

            {!isSidebarExpanded && !isMobile && (
              <div className="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                Logout
              </div>
            )}
          </button>
          {/* </Link> */}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-4 flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Userdashboard;



