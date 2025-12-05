'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
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
  X
} from 'lucide-react';

// ===== TYPE DEFINITIONS =====

type UserRole = 'admin' | 'teacher' | 'student';

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
  className?: string;
}

// ===== COMPONENT =====

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  // Get user from localStorage (set during login)
  const [userData, setUserData] = useState<UserData>({
    role: 'student',
    name: 'John Student',
    email: 'student@ferscoat.edu',
    className: 'Class 12A'
  });

  useEffect(() => {
    // Get user from localStorage on mount
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          setUserData(user);
        } catch (error) {
          console.error('Error parsing user data:', error);
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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation items with role-based access
  const allNavItems: NavItem[] = [
    { 
      icon: Home, 
      label: 'Dashboard', 
      path: `/${userData.role}`,
      allowedRoles: ['admin', 'teacher', 'student']
    },
    { 
      icon: ClipboardList, 
      label: 'Questions', 
      path: `/${userData.role}/questions`,
      allowedRoles: ['admin', 'teacher'] // Only teachers and admins
    },
    { 
      icon: BookOpen, 
      label: 'Exams', 
      path: `/${userData.role}/exams`,
      allowedRoles: ['admin', 'teacher', 'student']
    },
    { 
      icon: BarChart3, 
      label: 'Results', 
      path: `/${userData.role}/results`,
      allowedRoles: ['admin', 'teacher', 'student']
    },
    { 
      icon: Calendar, 
      label: 'Schedule', 
      path: `/${userData.role}/schedule`,
      allowedRoles: ['admin', 'teacher', 'student']
    },
    { 
      icon: Users, 
      label: 'Users', 
      path: '/admin/users',
      allowedRoles: ['admin'] // Only admins
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: `/${userData.role}/settings`,
      allowedRoles: ['admin', 'teacher', 'student']
    }
  ];

  // Filter navigation items based on user role
  const navItems = allNavItems.filter(item => 
    item.allowedRoles.includes(userData.role)
  );

  const stats = [
    {
      icon: BookOpen,
      label: 'Exams Available',
      value: '5',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      icon: CheckCircle,
      label: 'Completed',
      value: '12',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      icon: TrendingUp,
      label: 'Average Score',
      value: '85%',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      icon: Award,
      label: 'Rank',
      value: '#12',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
  ];

  const upcomingExams = [
    {
      id: 1,
      title: 'Mathematics Final Exam',
      subject: 'Mathematics',
      date: '2025-11-05',
      time: '10:00 AM',
      duration: '2 hours',
      questions: 50,
      status: 'upcoming' as const,
    },
    {
      id: 2,
      title: 'English Language Test',
      subject: 'English',
      date: '2025-11-03',
      time: '2:00 PM',
      duration: '1.5 hours',
      questions: 40,
      status: 'active' as const,
    },
    {
      id: 3,
      title: 'Physics Mid-term',
      subject: 'Physics',
      date: '2025-11-07',
      time: '9:00 AM',
      duration: '2 hours',
      questions: 45,
      status: 'upcoming' as const,
    },
  ];

  const recentResults = [
    { subject: 'Biology', score: 92, grade: 'A', date: '2025-10-28' },
    { subject: 'Chemistry', score: 78, grade: 'B', date: '2025-10-25' },
    { subject: 'History', score: 85, grade: 'B', date: '2025-10-22' },
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
    const badges: Record<UserRole, { color: string; label: string; icon: React.ReactNode }> = {
      admin: { 
        color: 'bg-purple-100 text-purple-700 border-purple-200', 
        label: 'Administrator',
        icon: <Shield className="w-3 h-3" />
      },
      teacher: { 
        color: 'bg-blue-100 text-blue-700 border-blue-200', 
        label: 'Teacher',
        icon: <BookOpen className="w-3 h-3" />
      },
      student: { 
        color: 'bg-green-100 text-green-700 border-green-200', 
        label: 'Student',
        icon: <User className="w-3 h-3" />
      }
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
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userRole');
      document.cookie = 'userRole=; path=/; max-age=0';
    }
    
    // Redirect to login
    router.push('/login');
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
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
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
              const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
              
              return (
                <motion.button
                  key={index}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="font-medium text-sm sm:text-base">{item.label}</span>
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* Fixed Bottom User Section */}
        <div className="flex-shrink-0 p-4 sm:p-6 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm flex-shrink-0">
              {userData.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-xs sm:text-sm truncate">{userData.name}</p>
              <p className="text-xs text-gray-500 truncate">
                {userData.className || userData.email}
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
                  {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)} Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 truncate hidden sm:block">
                  Welcome back, {userData.name.split(' ')[0]}! 👋
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
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.textColor}`} />
                  </div>
                  <div className={`px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r ${stat.color} text-white text-[10px] sm:text-xs font-semibold rounded-full`}>
                    +12%
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Upcoming Exams */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">Upcoming Exams</h2>
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
                  {upcomingExams.map((exam, index) => (
                    <motion.div
                      key={exam.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                      className="p-4 sm:p-6 transition-colors cursor-pointer"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-3">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900">{exam.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold w-fit ${
                              exam.status === 'active' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {exam.status === 'active' ? 'Available Now' : 'Upcoming'}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                            <div className="flex items-center space-x-1.5 sm:space-x-2">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span className="truncate">{exam.date}</span>
                            </div>
                            <div className="flex items-center space-x-1.5 sm:space-x-2">
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span className="truncate">{exam.time}</span>
                            </div>
                            <div className="flex items-center space-x-1.5 sm:space-x-2">
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span className="truncate">{exam.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1.5 sm:space-x-2">
                              <FileText className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span className="truncate">{exam.questions} Questions</span>
                            </div>
                          </div>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => router.push(`/${userData.role}/take-exam/${exam.id}`)}
                          className={`w-full sm:w-auto sm:ml-4 px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 text-xs sm:text-sm ${
                            exam.status === 'active'
                              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                          disabled={exam.status !== 'active'}
                        >
                          <PlayCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{exam.status === 'active' ? 'Start Exam' : 'Not Available'}</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Recent Results */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent Results</h2>
                    <button
                      onClick={() => router.push(`/${userData.role}/results`)}
                      className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View All
                    </button>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  {recentResults.map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border border-gray-200 cursor-pointer"
                      onClick={() => router.push(`/${userData.role}/results`)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{result.subject}</h3>
                        <span className="text-xl sm:text-2xl font-bold text-blue-600">{result.score}%</span>
                      </div>
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className={`px-2 py-1 rounded-full font-semibold ${
                          result.grade === 'A' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          Grade {result.grade}
                        </span>
                        <span className="text-gray-500">{result.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}