"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  User,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle,
  Info,
  Megaphone,
  Clock,
  TrendingUp,
  X,
  Send,
  Menu,
} from "lucide-react";

interface Announcement {
  id: number;
  title: string;
  message: string;
  type: "general" | "urgent" | "info" | "success";
  targetAudience: string[];
  createdBy: string;
  createdAt: string;
  expiresAt?: string;
  status: "active" | "scheduled" | "expired";
  views: number;
}

export default function AnnouncementsPage() {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("all");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    message: "",
    type: "general" as "general" | "urgent" | "info" | "success",
    targetAudience: [] as string[],
    expiresAt: "",
  });

  const announcements: Announcement[] = [
    {
      id: 1,
      title: "School Reopening Notification",
      message: "Dear students and parents, we are pleased to announce that school will reopen on January 8th, 2025. All students are expected to resume classes on this date. Please ensure all students are prepared with their materials and uniforms.",
      type: "general",
      targetAudience: ["students", "parents", "teachers"],
      createdBy: "Admin User",
      createdAt: "2025-12-07T10:30:00",
      expiresAt: "2026-01-08T00:00:00",
      status: "active",
      views: 245,
    },
    {
      id: 2,
      title: "URGENT: Exam Schedule Change",
      message: "The Mathematics final examination has been rescheduled from December 15th to December 18th. Please take note and prepare accordingly. All students must be present on the new date.",
      type: "urgent",
      targetAudience: ["students", "teachers"],
      createdBy: "Admin User",
      createdAt: "2025-12-06T14:20:00",
      status: "active",
      views: 189,
    },
    {
      id: 3,
      title: "New Learning Portal Features",
      message: "We've added new features to the learning portal including video lessons, interactive quizzes, and progress tracking. Check them out! These tools will help improve your learning experience.",
      type: "info",
      targetAudience: ["students", "teachers"],
      createdBy: "Admin User",
      createdAt: "2025-12-05T09:15:00",
      status: "active",
      views: 312,
    },
    {
      id: 4,
      title: "Outstanding Performance Recognition",
      message: "Congratulations to Class 12A for achieving the highest average score this semester! Keep up the excellent work. Your dedication and hard work are truly appreciated.",
      type: "success",
      targetAudience: ["students", "teachers", "parents"],
      createdBy: "Admin User",
      createdAt: "2025-12-04T16:45:00",
      status: "active",
      views: 428,
    },
    {
      id: 5,
      title: "Staff Meeting - December 10th",
      message: "All teaching staff are required to attend the monthly staff meeting on December 10th at 2:00 PM in the main conference room. Agenda will be shared via email.",
      type: "general",
      targetAudience: ["teachers", "staff"],
      createdBy: "Admin User",
      createdAt: "2025-12-03T11:00:00",
      status: "active",
      views: 67,
    },
  ];

  const stats = [
    {
      icon: Megaphone,
      label: "Total Announcements",
      value: "28",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      icon: Eye,
      label: "Total Views",
      value: "1,241",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      icon: AlertCircle,
      label: "Active",
      value: "12",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      icon: TrendingUp,
      label: "Engagement",
      value: "89%",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "urgent":
        return "bg-red-100 text-red-700 border-red-200";
      case "info":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "success":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "info":
        return <Info className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "success":
        return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />;
      default:
        return <Bell className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  const handleCreateAnnouncement = () => {
    console.log("Creating announcement:", newAnnouncement);
    setShowCreateModal(false);
    setNewAnnouncement({
      title: "",
      message: "",
      type: "general",
      targetAudience: [],
      expiresAt: "",
    });
  };

  const toggleAudience = (audience: string) => {
    setNewAnnouncement((prev) => ({
      ...prev,
      targetAudience: prev.targetAudience.includes(audience)
        ? prev.targetAudience.filter((a) => a !== audience)
        : [...prev.targetAudience, audience],
    }));
  };

  const handleViewAnnouncement = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setShowViewModal(true);
  };

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || announcement.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Megaphone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Announcements
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">
                  Manage school communications
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              </motion.button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-3 border border-gray-200"
              >
                <div className={`w-8 h-8 rounded-lg ${stat.bgColor} flex items-center justify-center mb-2`}>
                  <stat.icon className={`w-4 h-4 ${stat.textColor}`} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-3 sm:p-6 space-y-4">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white"
              >
                <option value="all">All Types</option>
                <option value="general">General</option>
                <option value="urgent">Urgent</option>
                <option value="info">Info</option>
                <option value="success">Success</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateModal(true)}
                className="px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-3">
          {filteredAnnouncements.map((announcement, index) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex gap-3">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${
                  announcement.type === "urgent" ? "bg-red-100" :
                  announcement.type === "info" ? "bg-blue-100" :
                  announcement.type === "success" ? "bg-green-100" :
                  "bg-gray-100"
                } flex items-center justify-center flex-shrink-0`}>
                  {getTypeIcon(announcement.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 flex-1">
                      {announcement.title}
                    </h3>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border flex-shrink-0 ${getTypeColor(announcement.type)}`}>
                      {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {announcement.createdBy}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(announcement.createdAt).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {announcement.views}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                    {announcement.message}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {announcement.targetAudience.map((audience, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium"
                      >
                        {audience.charAt(0).toUpperCase() + audience.slice(1)}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleViewAnnouncement(announcement)}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-200 flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      View
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-200 flex items-center gap-1"
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-semibold hover:bg-red-200 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Create Announcement Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Create Announcement</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Announcement Title
                  </label>
                  <input
                    type="text"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                    placeholder="Enter announcement title..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={newAnnouncement.message}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
                    placeholder="Enter your announcement message..."
                    rows={6}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Announcement Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {["general", "urgent", "info", "success"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setNewAnnouncement({ ...newAnnouncement, type: type as any })}
                        className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                          newAnnouncement.type === type
                            ? type === "urgent" ? "bg-red-100 text-red-700 border-2 border-red-500" :
                              type === "info" ? "bg-blue-100 text-blue-700 border-2 border-blue-500" :
                              type === "success" ? "bg-green-100 text-green-700 border-2 border-green-500" :
                              "bg-gray-100 text-gray-700 border-2 border-gray-500"
                            : "bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100"
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Target Audience
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {["students", "teachers", "parents", "staff"].map((audience) => (
                      <button
                        key={audience}
                        onClick={() => toggleAudience(audience)}
                        className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                          newAnnouncement.targetAudience.includes(audience)
                            ? "bg-purple-100 text-purple-700 border-2 border-purple-500"
                            : "bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100"
                        }`}
                      >
                        {audience.charAt(0).toUpperCase() + audience.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expiration Date (Optional)
                  </label>
                  <input
                    type="datetime-local"
                    value={newAnnouncement.expiresAt}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, expiresAt: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCreateAnnouncement}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Create Announcement
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Announcement Modal */}
      <AnimatePresence>
        {showViewModal && selectedAnnouncement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowViewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${
                      selectedAnnouncement.type === "urgent" ? "bg-red-100" :
                      selectedAnnouncement.type === "info" ? "bg-blue-100" :
                      selectedAnnouncement.type === "success" ? "bg-green-100" :
                      "bg-gray-100"
                    } flex items-center justify-center`}>
                      {getTypeIcon(selectedAnnouncement.type)}
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                        {selectedAnnouncement.title}
                      </h2>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border mt-1 ${getTypeColor(selectedAnnouncement.type)}`}>
                        {selectedAnnouncement.type.charAt(0).toUpperCase() + selectedAnnouncement.type.slice(1)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Message</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedAnnouncement.message}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Created By</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {selectedAnnouncement.createdBy}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Date Created</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {new Date(selectedAnnouncement.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Target Audience</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAnnouncement.targetAudience.map((audience, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs font-medium"
                      >
                        {audience.charAt(0).toUpperCase() + audience.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Total Views</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      {selectedAnnouncement.views} views
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Status</h3>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      {selectedAnnouncement.status.charAt(0).toUpperCase() + selectedAnnouncement.status.slice(1)}
                    </span>
                  </div>
                </div>

                {selectedAnnouncement.expiresAt && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Expires On</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {new Date(selectedAnnouncement.expiresAt).toLocaleString()}
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-3 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition-all flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Announcement
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}