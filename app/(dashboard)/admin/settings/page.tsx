"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Lock,
  Bell,
  Globe,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Eye,
  EyeOff,
  Building,
  Briefcase,
  Award,
  Calendar,
  XCircle,
} from "lucide-react";

/* ---------------------------
   TYPES
----------------------------*/
interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  employeeId: string;
  department: string;
  designation: string;
  qualification: string;
  dateOfJoining: string;
  dateOfBirth: string;
}

interface Notifications {
  emailNotifications: boolean;
  smsNotifications: boolean;
  examReminders: boolean;
  submissionAlerts: boolean;
  scheduleUpdates: boolean;
  lowScoreAlerts: boolean;
  systemUpdates: boolean;
}

interface Preferences {
  language: string;
  timezone: string;
  dateFormat: string;
  theme: string;
}

interface Security {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface TabItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

/* ---------------------------
   MAIN COMPONENT
----------------------------*/
export default function TeacherSettingsPage() {
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // PROFILE
  const [profile, setProfile] = useState<Profile>({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@ferscoat.edu",
    phone: "+234 801 234 5678",
    address: "45 Victoria Island, Lagos",
    employeeId: "TCH-2024-001",
    department: "Mathematics",
    designation: "Principal",
    qualification: "DR. Mathematics Education",
    dateOfJoining: "2020-09-01",
    dateOfBirth: "1988-03-15",
  });

  // NOTIFICATIONS
  const [notifications, setNotifications] = useState<Notifications>({
    emailNotifications: true,
    smsNotifications: false,
    examReminders: true,
    submissionAlerts: true,
    scheduleUpdates: true,
    lowScoreAlerts: true,
    systemUpdates: false,
  });

  // PREFERENCES
  const [preferences, setPreferences] = useState<Preferences>({
    language: "English",
    timezone: "Africa/Lagos",
    dateFormat: "DD/MM/YYYY",
    theme: "light",
  });

  // SECURITY
  const [security, setSecurity] = useState<Security>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const tabs: TabItem[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "preferences", label: "Preferences", icon: Globe },
  ];

  /* ---------------------------
     Persist & load from localStorage (client-only)
  ----------------------------*/
  useEffect(() => {
    // load saved state if any
    try {
      const raw = localStorage.getItem("admin-settings-v1");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.profile) setProfile((p) => ({ ...p, ...parsed.profile }));
        if (parsed.notifications) setNotifications((n) => ({ ...n, ...parsed.notifications }));
        if (parsed.preferences) setPreferences((pr) => ({ ...pr, ...parsed.preferences }));
      }
    } catch (e) {
      // ignore parse errors
      // console.warn("Failed to load settings:", e);
    }
  }, []);

  const persistAll = () => {
    try {
      localStorage.setItem(
        "admin-settings-v1",
        JSON.stringify({ profile, notifications, preferences })
      );
    } catch (e) {
      // ignore
    }
  };

  /* ---------------------------
     Save handlers
  ----------------------------*/
  const notifySaved = (message?: string) => {
    setErrorMessage(null);
    setSaved(true);
    if (message) {
      // optionally set message in UI (we used saved boolean + optional error)
    }
    setTimeout(() => setSaved(false), 2500);
  };

  const handleSaveProfile = () => {
    // simple validation
    if (!profile.firstName.trim() || !profile.lastName.trim() || !profile.email.trim()) {
      setErrorMessage("Please provide first name, last name and valid email.");
      return;
    }
    persistAll();
    notifySaved();
  };

  const handleSaveNotifications = () => {
    persistAll();
    notifySaved();
  };

  const handleSavePreferences = () => {
    persistAll();
    notifySaved();
  };

  const handlePasswordChange = () => {
    setErrorMessage(null);

    // Basic checks
    if (!security.currentPassword) {
      setErrorMessage("Please enter your current password.");
      return;
    }
    if (!security.newPassword || security.newPassword.length < 8) {
      setErrorMessage("New password must be at least 8 characters long.");
      return;
    }
    if (security.newPassword !== security.confirmPassword) {
      setErrorMessage("New password and confirmation do not match.");
      return;
    }

    // For this client-only example we "simulate" success.
    // In a real app, send API request to change password.
    setSecurity({ currentPassword: "", newPassword: "", confirmPassword: "" });
    notifySaved();
  };

  /* ---------------------------
     Helpers
  ----------------------------*/
  function prettyLabelFromKey(key: string) {
    // e.g. examReminders -> Exam Reminders
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  }

  // toggle notifications with proper typing
  const toggleNotification = (key: keyof Notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Build notification entries typed properly for mapping
  const notificationEntries = useMemo(
    () => Object.keys(notifications) as (keyof Notifications)[],
    [notifications]
  );

  // clear error after a little while
  useEffect(() => {
    if (!errorMessage) return;
    const t = setTimeout(() => setErrorMessage(null), 4500);
    return () => clearTimeout(t);
  }, [errorMessage]);

  /* ---------------------------
     RENDER
  ----------------------------*/
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-3 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Manage your account and preferences</p>
        </motion.div>

        {/* Success / Error Messages */}
        <div className="space-y-2">
          {saved && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span className="font-medium">Changes saved successfully!</span>
            </motion.div>
          )}

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center space-x-2"
            >
              <XCircle className="w-5 h-5" />
              <span className="font-medium">{errorMessage}</span>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-2 sm:p-4 space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    whileHover={{ x: 4 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all text-sm sm:text-base ${
                      activeTab === tab.id ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="font-medium">{tab.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
            >
              {/* PROFILE */}
              {activeTab === "profile" && (
                <div className="p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Profile Information</h2>

                  {/* Profile picture & basic info */}
                  <div className="flex items-center space-x-4 sm:space-x-6 mb-6 sm:mb-8">
                    <div className="relative">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
                        {profile.firstName[0]}{profile.lastName[0]}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute bottom-0 right-0 p-1.5 sm:p-2 bg-white rounded-full shadow-lg border-2 border-blue-600"
                        title="Change photo (not implemented)"
                      >
                        <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                      </motion.button>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                        {profile.firstName} {profile.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">{profile.employeeId}</p>
                      <p className="text-xs sm:text-sm text-blue-600 font-medium">{profile.designation}</p>
                      <p className="text-xs text-gray-500">{profile.department} Department</p>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        <input
                          type="text"
                          value={profile.department}
                          onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                          className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        <input
                          type="text"
                          value={profile.designation}
                          onChange={(e) => setProfile({ ...profile, designation: e.target.value })}
                          className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                      <div className="relative">
                        <Award className="absolute left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        <input
                          type="text"
                          value={profile.qualification}
                          onChange={(e) => setProfile({ ...profile, qualification: e.target.value })}
                          className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        <input
                          type="text"
                          value={profile.address}
                          onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                          className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                      <input
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date of Joining</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        <input
                          type="date"
                          value={profile.dateOfJoining}
                          disabled
                          className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                      <input
                        type="text"
                        value={profile.employeeId}
                        disabled
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSaveProfile}
                    className="mt-6 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
                  >
                    <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Save Changes</span>
                  </motion.button>
                </div>
              )}

              {/* SECURITY */}
              {activeTab === "security" && (
                <div className="p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Security Settings</h2>

                  <div className="space-y-4 sm:space-y-6 max-w-2xl">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          value={security.currentPassword}
                          onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                          className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter current password"
                        />
                        <button
                          onClick={() => setShowCurrentPassword((s) => !s)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          type="button"
                          aria-label="Toggle current password visibility"
                        >
                          {showCurrentPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={security.newPassword}
                          onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                          className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter new password"
                        />
                        <button
                          onClick={() => setShowNewPassword((s) => !s)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          type="button"
                          aria-label="Toggle new password visibility"
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={security.confirmPassword}
                          onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                          className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Confirm new password"
                        />
                        <button
                          onClick={() => setShowConfirmPassword((s) => !s)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          type="button"
                          aria-label="Toggle confirm password visibility"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />}
                        </button>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePasswordChange}
                      className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
                    >
                      <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Update Password</span>
                    </motion.button>
                  </div>
                </div>
              )}

              {/* NOTIFICATIONS */}
              {activeTab === "notifications" && (
                <div className="p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Notification Preferences</h2>

                  <div className="space-y-4">
                    {notificationEntries.map((key) => {
                      const value = notifications[key];
                      return (
                        <div key={key as string} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                          <div>
                            <p className="text-sm sm:text-base font-medium text-gray-900">
                              {prettyLabelFromKey(key as string)}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500">Receive notifications for this activity</p>
                          </div>

                          <button
                            onClick={() => toggleNotification(key)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? "bg-blue-600" : "bg-gray-300"}`}
                            aria-pressed={value}
                            aria-label={`${key} toggle`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? "translate-x-6" : "translate-x-1"}`} />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSaveNotifications}
                    className="mt-6 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
                  >
                    <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Save Preferences</span>
                  </motion.button>
                </div>
              )}

              {/* PREFERENCES */}
              {activeTab === "preferences" && (
                <div className="p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">General Preferences</h2>

                  <div className="space-y-4 sm:space-y-6 max-w-2xl">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                      <select
                        value={preferences.language}
                        onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>English</option>
                        <option>French</option>
                        <option>Spanish</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                      <select
                        value={preferences.timezone}
                        onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>Africa/Lagos</option>
                        <option>Africa/Accra</option>
                        <option>Africa/Nairobi</option>
                        <option>Europe/London</option>
                        <option>UTC</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                      <select
                        value={preferences.dateFormat}
                        onChange={(e) => setPreferences({ ...preferences, dateFormat: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>DD/MM/YYYY</option>
                        <option>MM/DD/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                      <select
                        value={preferences.theme}
                        onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSavePreferences}
                    className="mt-6 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
                  >
                    <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Save Preferences</span>
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
