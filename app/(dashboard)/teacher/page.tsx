"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Calendar,
  PlayCircle,
  CheckCircle,
  ChevronRight,
  Menu,
  Bell,
  User,
  LogOut,
  Settings,
  Home,
  FileText,
  BarChart3,
  Users,
  Shield,
  ClipboardList,
  X,
  Plus,
  Edit,
  Eye,
  AlertCircle,
  PieChart,
  Activity,
  BookMarked,
} from "lucide-react";
import SchoolLogo from "../../assets/ferscoat-logo-1.jpg";

// ===== TYPE DEFINITIONS =====

type UserRole = "admin" | "teacher" | "student";

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
  allowedRoles: UserRole[];
}

interface UserData {
  role: UserRole;
  name: string;
  email: string;
  department?: string;
  employeeId?: string;
}

interface ClassData {
  id: number;
  name: string;
  students: number;
  avgScore: number;
  activeExams: number;
  subjects: string[];
}

interface ExamData {
  id: number;
  title: string;
  class: string;
  date: string;
  time: string;
  duration: string;
  totalStudents: number;
  completed: number;
  status: "active" | "scheduled" | "completed";
}

interface ActivityItem {
  action: string;
  student: string;
  exam: string;
  time: string;
  type: "submission" | "question" | "completion" | "alert";
}

// ===== COMPONENT =====

export default function TeacherDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  // Get user from localStorage (set during login)
  const [userData, setUserData] = useState<UserData>({
    role: "teacher",
    name: "Sarah Johnson",
    email: "teacher@ferscoat.edu",
    department: "Mathematics",
    employeeId: "TCH-2024-001",
  });

  useEffect(() => {
    // Get user from localStorage on mount
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

  // Close sidebar when clicking outside on mobile
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

  // Navigation items with role-based access
  const allNavItems: NavItem[] = [
    {
      icon: Home,
      label: "Dashboard",
      path: `/${userData.role}`,
      allowedRoles: ["admin", "teacher", "student"],
    },
    {
      icon: ClipboardList,
      label: "Questions",
      path: `/${userData.role}/questions`,
      allowedRoles: ["admin", "teacher"],
    },
    {
      icon: BookOpen,
      label: "Exams",
      path: `/${userData.role}/exams`,
      allowedRoles: ["admin", "teacher", "student"],
    },
    {
      icon: BarChart3,
      label: "Results",
      path: `/${userData.role}/results`,
      allowedRoles: ["admin", "teacher", "student"],
    },
    {
      icon: Users,
      label: "My Classes",
      path: `/${userData.role}/classes`,
      allowedRoles: ["teacher"],
    },
    {
      icon: Calendar,
      label: "Schedule",
      path: `/${userData.role}/schedule`,
      allowedRoles: ["admin", "teacher", "student"],
    },
    {
      icon: Settings,
      label: "Settings",
      path: `/${userData.role}/settings`,
      allowedRoles: ["admin", "teacher", "student"],
    },
  ];

  // Filter navigation items based on user role
  const navItems = allNavItems.filter((item) =>
    item.allowedRoles.includes(userData.role)
  );

  // Teacher-specific stats
  const stats = [
    {
      icon: Users,
      label: "Total Students",
      value: "156",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      change: "+8",
      trend: "up",
    },
    {
      icon: BookOpen,
      label: "Active Exams",
      value: "7",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      change: "+2",
      trend: "up",
    },
    {
      icon: ClipboardList,
      label: "Question Bank",
      value: "324",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      change: "+45",
      trend: "up",
    },
    {
      icon: TrendingUp,
      label: "Class Average",
      value: "82%",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      change: "+5%",
      trend: "up",
    },
  ];

  // Classes managed by teacher
  const classes: ClassData[] = [
    {
      id: 1,
      name: "Class 12A",
      students: 35,
      avgScore: 85,
      activeExams: 2,
      subjects: ["Mathematics", "Physics"],
    },
    {
      id: 2,
      name: "Class 11B",
      students: 42,
      avgScore: 78,
      activeExams: 1,
      subjects: ["Mathematics"],
    },
    {
      id: 3,
      name: "Class 10C",
      students: 38,
      avgScore: 81,
      activeExams: 3,
      subjects: ["Mathematics", "Statistics"],
    },
    {
      id: 4,
      name: "Class 12B",
      students: 41,
      avgScore: 88,
      activeExams: 1,
      subjects: ["Advanced Mathematics"],
    },
  ];

  // Active and upcoming exams
  const exams: ExamData[] = [
    {
      id: 1,
      title: "Mathematics Final Exam",
      class: "Class 12A",
      date: "2025-12-08",
      time: "10:00 AM",
      duration: "2 hours",
      totalStudents: 35,
      completed: 12,
      status: "active",
    },
    {
      id: 2,
      title: "Physics Mid-term",
      class: "Class 11B",
      date: "2025-12-10",
      time: "2:00 PM",
      duration: "1.5 hours",
      totalStudents: 42,
      completed: 0,
      status: "scheduled",
    },
    {
      id: 3,
      title: "Statistics Quiz",
      class: "Class 10C",
      date: "2025-12-06",
      time: "9:00 AM",
      duration: "1 hour",
      totalStudents: 38,
      completed: 28,
      status: "active",
    },
  ];

  // Recent activity
  const recentActivity: ActivityItem[] = [
    {
      action: "New submission",
      student: "John Doe",
      exam: "Mathematics Final",
      time: "5 mins ago",
      type: "submission",
    },
    {
      action: "Question added",
      student: "You",
      exam: "Physics Chapter 5",
      time: "1 hour ago",
      type: "question",
    },
    {
      action: "Exam completed",
      student: "Jane Smith",
      exam: "Statistics Quiz",
      time: "2 hours ago",
      type: "completion",
    },
    {
      action: "Low score alert",
      student: "Mike Johnson",
      exam: "Mathematics Test",
      time: "3 hours ago",
      type: "alert",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Get role badge styling
  const getRoleBadge = () => {
    const badges: Record<
      UserRole,
      { color: string; label: string; icon: React.ReactNode }
    > = {
      admin: {
        color: "bg-purple-100 text-purple-700 border-purple-200",
        label: "Administrator",
        icon: <Shield className="w-3 h-3" />,
      },
      teacher: {
        color: "bg-blue-100 text-blue-700 border-blue-200",
        label: "Teacher",
        icon: <BookOpen className="w-3 h-3" />,
      },
      student: {
        color: "bg-green-100 text-green-700 border-green-200",
        label: "Student",
        icon: <User className="w-3 h-3" />,
      },
    };
    return badges[userData.role];
  };

  const roleBadge = getRoleBadge();

  const handleNavClick = (path: string) => {
    router.push(path);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    // Clear user session
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("userRole");
      document.cookie = "userRole=; path=/; max-age=0";
    }

    // Redirect to login
    router.push("/login");
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "submission":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "question":
        return <Plus className="w-4 h-4 text-blue-600" />;
      case "completion":
        return <Award className="w-4 h-4 text-purple-600" />;
      case "alert":
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActivityBg = (type: string) => {
    switch (type) {
      case "submission":
        return "bg-green-50";
      case "question":
        return "bg-blue-50";
      case "completion":
        return "bg-purple-50";
      case "alert":
        return "bg-orange-50";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
        className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-40 sidebar-shadow flex flex-col"
      >
        {/* Fixed Header Section */}
        <div className="flex-shrink-0 p-4 sm:p-6 pb-3 border-b border-gray-100">
          {/* Header with close button on mobile */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <img
                src={SchoolLogo.src}
                alt="School Logo"
                className=" w-8 h-12 xs:w-12 sm:w-12 md:w-13 lg:w-12 object-containmx-auto rounded-4xl"/>
 
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Ferscoat CBT
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
          <div className={`px-3 py-2 rounded-lg border ${roleBadge.color}`}>
            <div className="flex items-center justify-center space-x-2">
              {roleBadge.icon}
              <span className="text-xs font-semibold">{roleBadge.label}</span>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation Section */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
          <nav className="space-y-2">
            {navItems.map((item, index) => {
              const isActive =
                pathname === item.path || pathname.startsWith(`${item.path}/`);

              return (
                <motion.button
                  key={index}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="font-medium text-sm sm:text-base">
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* Fixed Bottom User Section */}
        <div className="flex-shrink-0 p-4 sm:p-6 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm flex-shrink-0">
              {userData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-xs sm:text-sm truncate">
                {userData.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {userData.department || userData.email}
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-3 sm:px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium">Logout</span>
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
                  Teacher Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 truncate hidden sm:block">
                  Welcome back, {userData.name.split(" ")[0]}! 👋
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push(`/${userData.role}/questions/new`)}
                className="hidden sm:flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">New Question</span>
              </motion.button>

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
                onClick={() => router.push(`/${userData.role}/settings`)}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              </motion.button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-3 sm:p-6 space-y-4 sm:space-y-6">
          {/* Quick Actions - Mobile Only */}
          <div className="sm:hidden">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push(`/${userData.role}/questions/new`)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Question</span>
            </motion.button>
          </div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
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
                <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* My Classes */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                      My Classes
                    </h2>
                    <button
                      onClick={() => router.push(`/${userData.role}/classes`)}
                      className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
                    >
                      <span>View All</span>
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-6">
                  {classes.map((classItem, index) => (
                    <motion.div
                      key={classItem.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border border-gray-200 cursor-pointer"
                      onClick={() =>
                        router.push(`/${userData.role}/classes/${classItem.id}`)
                      }
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                            {classItem.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {classItem.students} Students
                          </p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-lg sm:text-xl font-bold text-green-600">
                            {classItem.avgScore}%
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {classItem.subjects.map((subject, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-gray-600">
                          {classItem.activeExams} active exam
                          {classItem.activeExams !== 1 ? "s" : ""}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Active Exams */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-4 sm:mt-6"
              >
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                      Active & Upcoming Exams
                    </h2>
                    <button
                      onClick={() => router.push(`/${userData.role}/exams`)}
                      className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
                    >
                      <span>View All</span>
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {exams.map((exam, index) => (
                    <motion.div
                      key={exam.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{
                        backgroundColor: "rgba(59, 130, 246, 0.05)",
                      }}
                      className="p-4 sm:p-6 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-3">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                              {exam.title}
                            </h3>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold w-fit ${
                                exam.status === "active"
                                  ? "bg-green-100 text-green-700"
                                  : exam.status === "scheduled"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {exam.status === "active"
                                ? "Active"
                                : exam.status === "scheduled"
                                ? "Scheduled"
                                : "Completed"}
                            </span>
                          </div>

                          <p className="text-sm text-gray-600 mb-2">
                            {exam.class}
                          </p>

                          <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                            <div className="flex items-center space-x-1.5 sm:space-x-2">
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span className="truncate">{exam.time}</span>
                            </div>
                            <div className="flex items-center space-x-1.5 sm:space-x-2">
                              <Users className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span className="truncate">
                                {exam.completed}/{exam.totalStudents} completed
                              </span>
                            </div>
                            <div className="flex items-center space-x-1.5 sm:space-x-2">
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span className="truncate">{exam.duration}</span>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          {exam.status === "active" && (
                            <div className="mt-3">
                              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                <span>Completion Progress</span>
                                <span>
                                  {Math.round(
                                    (exam.completed / exam.totalStudents) * 100
                                  )}
                                  %
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all"
                                  style={{
                                    width: `${
                                      (exam.completed / exam.totalStudents) *
                                      100
                                    }%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex sm:flex-col gap-2 sm:ml-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              router.push(
                                `/${userData.role}/exams/${exam.id}/monitor`
                              )
                            }
                            className={`flex-1 sm:w-auto px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 text-xs sm:text-sm ${
                              exam.status === "active"
                                ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl"
                                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                            }`}
                          >
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>
                              {exam.status === "active" ? "Monitor" : "View"}
                            </span>
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              router.push(
                                `/${userData.role}/exams/${exam.id}/edit`
                              )
                            }
                            className="flex-1 sm:w-auto px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all flex items-center justify-center space-x-2 text-xs sm:text-sm"
                          >
                            <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Edit</span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                      Recent Activity
                    </h2>
                    <Activity className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div className="p-4 sm:p-6 space-y-3">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className={`p-3 rounded-lg border border-gray-200 cursor-pointer transition-all ${getActivityBg(
                        activity.type
                      )}`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900">
                            {activity.action}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {activity.student} • {activity.exam}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 border-t border-gray-200">
                  <button
                    onClick={() => router.push(`/${userData.role}/activity`)}
                    className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center space-x-1"
                  >
                    <span>View All Activity</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-4 sm:p-6 shadow-lg mt-4 sm:mt-6 text-white"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">This Week</h3>
                  <PieChart className="w-6 h-6 opacity-80" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-90">Exams Created</span>
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-90">Questions Added</span>
                    <span className="text-2xl font-bold">45</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-90">Papers Graded</span>
                    <span className="text-2xl font-bold">28</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push(`/${userData.role}/analytics`)}
                  className="w-full mt-4 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg font-semibold transition-all text-sm"
                >
                  View Full Analytics
                </motion.button>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
