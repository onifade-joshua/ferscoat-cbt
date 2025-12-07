"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import {
  Shield,
  Users,
  BookOpen,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Menu,
  Bell,
  User,
  LogOut,
  Settings,
  Home,
  ClipboardList,
  BarChart3,
  Calendar,
  MessageSquare,
  X,
  Eye,
  Check,
  XCircle,
  Send,
  Activity,
  DollarSign,
  Award,
  Target,
} from "lucide-react";
import SchoolLogo from "../../../app/assets/ferscoat-logo-1.jpg";

// ===== TYPE DEFINITIONS =====

type UserRole = "admin" | "teacher" | "student";

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
}

interface UserData {
  role: UserRole;
  name: string;
  email: string;
}

interface PendingItem {
  id: number;
  type: "exam" | "question" | "result";
  title: string;
  submittedBy: string;
  submittedDate: string;
  category?: string;
  status: "pending" | "approved" | "rejected";
}

interface SystemAlert {
  id: number;
  type: "info" | "warning" | "error" | "success";
  message: string;
  time: string;
}

// ===== COMPONENT =====

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const [userData, setUserData] = useState<UserData>({
    role: "admin",
    name: "Admin User",
    email: "admin@ferscoat.edu",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          setUserData(user);
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigation items
  const navItems: NavItem[] = [
    { icon: Home, label: "Dashboard", path: "/admin" },
    { icon: Users, label: "Users Management", path: "/admin/users" },
    {
      icon: ClipboardList,
      label: "Question Approval",
      path: "/admin/questions",
    },
    { icon: BookOpen, label: "Exam Management", path: "/admin/exams" },
    { icon: BarChart3, label: "Results Approval", path: "/admin/results" },
    {
      icon: MessageSquare,
      label: "Announcements",
      path: "/admin/announcements",
    },
    { icon: Calendar, label: "Schedule", path: "/admin/schedule" },
    { icon: Activity, label: "System Logs", path: "/admin/logs" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  // Dashboard stats
  const stats = [
    {
      icon: Users,
      label: "Total Users",
      value: "1,247",
      change: "+12%",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      breakdown: "856 Students, 345 Teachers, 46 Staff",
    },
    {
      icon: ClipboardList,
      label: "Pending Approvals",
      value: "23",
      change: "+5",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      breakdown: "12 Questions, 8 Exams, 3 Results",
    },
    {
      icon: BookOpen,
      label: "Active Exams",
      value: "15",
      change: "+3",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      breakdown: "Across all departments",
    },
    {
      icon: Award,
      label: "System Health",
      value: "98.5%",
      change: "+0.5%",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      breakdown: "All systems operational",
    },
  ];

  // Pending approvals
  const pendingApprovals: PendingItem[] = [
    {
      id: 1,
      type: "question",
      title: "Mathematics - Calculus Questions (Set A)",
      submittedBy: "Sarah Johnson",
      submittedDate: "2025-12-06",
      category: "WAEC",
      status: "pending",
    },
    {
      id: 2,
      type: "exam",
      title: "Physics Final Examination",
      submittedBy: "Michael Chen",
      submittedDate: "2025-12-05",
      category: "CA",
      status: "pending",
    },
    {
      id: 3,
      type: "question",
      title: "English Language - Essay Questions",
      submittedBy: "David Williams",
      submittedDate: "2025-12-05",
      category: "JAMB",
      status: "pending",
    },
    {
      id: 4,
      type: "result",
      title: "Class 12A - Mathematics Results",
      submittedBy: "Sarah Johnson",
      submittedDate: "2025-12-04",
      category: "Term Exam",
      status: "pending",
    },
  ];

  // System alerts
  const systemAlerts: SystemAlert[] = [
    {
      id: 1,
      type: "warning",
      message: "Server load at 85% - Consider scaling resources",
      time: "5 mins ago",
    },
    {
      id: 2,
      type: "info",
      message: "23 new user registrations today",
      time: "1 hour ago",
    },
    {
      id: 3,
      type: "success",
      message: "Backup completed successfully",
      time: "2 hours ago",
    },
    {
      id: 4,
      type: "error",
      message: "Failed login attempts detected from IP 192.168.1.100",
      time: "3 hours ago",
    },
  ];

  // Recent activities
  const recentActivities = [
    {
      action: "Question approved",
      user: "Admin",
      time: "10 mins ago",
      type: "success",
    },
    {
      action: "New exam created",
      user: "Sarah Johnson",
      time: "25 mins ago",
      type: "info",
    },
    {
      action: "Result published",
      user: "Admin",
      time: "1 hour ago",
      type: "success",
    },
    {
      action: "User account created",
      user: "System",
      time: "2 hours ago",
      type: "info",
    },
    {
      action: "Question rejected",
      user: "Admin",
      time: "3 hours ago",
      type: "warning",
    },
  ];

  const getRoleBadge = () => {
    return {
      color: "bg-purple-100 text-purple-700 border-purple-200",
      label: "Administrator",
      icon: <Shield className="w-3 h-3" />,
    };
  };

  const roleBadge = getRoleBadge();

  const handleNavClick = (path: string) => {
    router.push(path);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("userRole");
      document.cookie = "userRole=; path=/; max-age=0";
    }
    router.push("/login");
  };

  const getApprovalIcon = (type: string) => {
    switch (type) {
      case "question":
        return <ClipboardList className="w-5 h-5" />;
      case "exam":
        return <BookOpen className="w-5 h-5" />;
      case "result":
        return <BarChart3 className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-700";
      case "warning":
        return "bg-yellow-100 text-yellow-700";
      case "error":
        return "bg-red-100 text-red-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-40 shadow-xl flex flex-col"
      >
        {/* Logo + Role */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <img
                src={SchoolLogo.src}
                alt="School Logo"
                className=" w-8 h-12 xs:w-12 sm:w-12 md:w-13 lg:w-12 object-containmx-auto rounded-4xl"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Admin Portal
              </span>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Role Badge */}
          <div
            className={`px-3 py-2 rounded-lg border text-center ${roleBadge.color}`}
          >
            <div className="flex items-center justify-center gap-2">
              {roleBadge.icon}
              <span className="text-xs font-semibold">{roleBadge.label}</span>
            </div>
          </div>
        </div>

        {/* Nav Menu */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <nav className="space-y-1">
            {navItems.map((item, index) => {
              const isActive =
                pathname === item.path || pathname.startsWith(`${item.path}/`);

              return (
                <motion.button
                  key={index}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium text-sm">{item.label}</span>
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* User + Logout */}
        <div className="p-5 border-t border-gray-100 bg-white">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
              {userData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>

            <div className="flex flex-col truncate">
              <p className="font-semibold text-gray-900 text-sm truncate">
                {userData.name}
              </p>
              <p className="text-xs text-gray-500 truncate">{userData.email}</p>
            </div>
          </div>

          <motion.button
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-all"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-medium">Logout</span>
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="transition-all duration-300 lg:ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              </motion.button>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
                  Admin Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 truncate hidden sm:block">
                  Welcome back, {userData.name.split(" ")[0]}! 👋
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => router.push("/admin/settings")}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              </motion.button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-3 sm:p-6 space-y-4 sm:space-y-6">
          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}
                  >
                    <stat.icon
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.textColor}`}
                    />
                  </div>
                  <div
                    className={`px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r ${stat.color} text-white text-[10px] sm:text-xs font-semibold rounded-full`}
                  >
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">
                  {stat.label}
                </p>
                <p className="text-xs text-gray-400">{stat.breakdown}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Pending Approvals */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                      Pending Approvals
                    </h2>
                    <button
                      onClick={() => router.push("/admin/approvals")}
                      className="text-xs sm:text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                      View All
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {pendingApprovals.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-10 h-10 rounded-lg ${
                            item.type === "question"
                              ? "bg-blue-100"
                              : item.type === "exam"
                              ? "bg-green-100"
                              : "bg-purple-100"
                          } flex items-center justify-center flex-shrink-0`}
                        >
                          {getApprovalIcon(item.type)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                                {item.title}
                              </h3>
                              <p className="text-xs text-gray-600">
                                By {item.submittedBy}
                              </p>
                            </div>
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full whitespace-nowrap">
                              {item.category}
                            </span>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs text-gray-500">
                              {item.submittedDate}
                            </span>
                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() =>
                                  router.push(`/admin/${item.type}s/${item.id}`)
                                }
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-200"
                              >
                                <Eye className="w-3 h-3 inline mr-1" />
                                View
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold hover:bg-green-200"
                              >
                                <Check className="w-3 h-3 inline mr-1" />
                                Approve
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-semibold hover:bg-red-200"
                              >
                                <XCircle className="w-3 h-3 inline mr-1" />
                                Reject
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar Widgets */}
            <div className="space-y-4 sm:space-y-6">
              {/* System Alerts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <h2 className="text-lg font-bold text-gray-900">
                    System Alerts
                  </h2>
                </div>

                <div className="p-4 space-y-3">
                  {systemAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-3 rounded-lg border ${getAlertColor(
                        alert.type
                      )}`}
                    >
                      <p className="text-xs font-medium">{alert.message}</p>
                      <p className="text-xs opacity-75 mt-1">{alert.time}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <h2 className="text-lg font-bold text-gray-900">
                    Recent Activity
                  </h2>
                </div>

                <div className="p-4 space-y-3">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 ${getActivityColor(
                          activity.type
                        )}`}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-900">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.user} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl p-4 sm:p-6 shadow-lg text-white"
              >
                <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/admin/announcements/new")}
                    className="w-full flex items-center space-x-2 px-4 py-3 bg-violet-400 bg-opacity-20 hover:bg-opacity-30 rounded-lg font-medium transition-all text-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span className="text-white">Send Announcement</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/admin/users/new")}
                    className="w-full flex items-center space-x-2 px-4 py-3 bg-violet-400 bg-opacity-20 hover:bg-opacity-30 rounded-lg font-medium transition-all text-sm"
                  >
                    <Users className="w-4 h-4" />
                    <span className="text-white">Add New User</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/admin/logs")}
                    className="w-full flex items-center space-x-2 px-4 py-3 bg-violet-400 bg-opacity-20 hover:bg-opacity-30 rounded-lg font-medium transition-all text-sm"
                  >
                    <Activity className="w-4 h-4" />
                    <span className="text-white">View System Logs</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
