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
  Menu,
  Bell,
  User,
  LogOut,
  Settings,
  Home,
  BarChart3,
  Users,
  Shield,
  ClipboardList,
  X,
  Plus,
  Search,
  Filter,
  ChevronRight,
  Edit,
  Trash2,
  MoreVertical,
  UserPlus,
  BookMarked,
  Target,
  Activity,
  CheckCircle,
  AlertCircle,
  Eye
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
  department?: string;
}

interface ClassItem {
  id: number;
  name: string;
  code: string;
  students: number;
  avgScore: number;
  activeExams: number;
  completedExams: number;
  subjects: string[];
  schedule: string;
  room: string;
  performance: 'excellent' | 'good' | 'average' | 'needs-attention';
  lastActivity: string;
}

// ===== COMPONENT =====

export default function TeacherClassesPage() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const [userData, setUserData] = useState<UserData>({
    role: 'teacher',
    name: 'Sarah Johnson',
    email: 'teacher@ferscoat.edu',
    department: 'Mathematics'
  });

  useEffect(() => {
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

  // Navigation items
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
      allowedRoles: ['admin', 'teacher']
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
      icon: Users, 
      label: 'My Classes', 
      path: `/${userData.role}/classes`,
      allowedRoles: ['teacher']
    },
    { 
      icon: Calendar, 
      label: 'Schedule', 
      path: `/${userData.role}/schedule`,
      allowedRoles: ['admin', 'teacher', 'student']
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: `/${userData.role}/settings`,
      allowedRoles: ['admin', 'teacher', 'student']
    }
  ];

  const navItems = allNavItems.filter(item => 
    item.allowedRoles.includes(userData.role)
  );

  // Classes data
  const classes: ClassItem[] = [
    {
      id: 1,
      name: 'Class 12A',
      code: 'MTH-12A-2025',
      students: 35,
      avgScore: 85,
      activeExams: 2,
      completedExams: 12,
      subjects: ['Mathematics', 'Physics'],
      schedule: 'Mon, Wed, Fri - 9:00 AM',
      room: 'Room 201',
      performance: 'excellent',
      lastActivity: '2 hours ago'
    },
    {
      id: 2,
      name: 'Class 11B',
      code: 'MTH-11B-2025',
      students: 42,
      avgScore: 78,
      activeExams: 1,
      completedExams: 10,
      subjects: ['Mathematics'],
      schedule: 'Tue, Thu - 10:00 AM',
      room: 'Room 203',
      performance: 'good',
      lastActivity: '5 hours ago'
    },
    {
      id: 3,
      name: 'Class 10C',
      code: 'MTH-10C-2025',
      students: 38,
      avgScore: 81,
      activeExams: 3,
      completedExams: 8,
      subjects: ['Mathematics', 'Statistics'],
      schedule: 'Mon, Wed - 11:00 AM',
      room: 'Room 105',
      performance: 'good',
      lastActivity: '1 day ago'
    },
    {
      id: 4,
      name: 'Class 12B',
      code: 'MTH-12B-2025',
      students: 41,
      avgScore: 88,
      activeExams: 1,
      completedExams: 15,
      subjects: ['Advanced Mathematics'],
      schedule: 'Tue, Thu, Fri - 2:00 PM',
      room: 'Room 202',
      performance: 'excellent',
      lastActivity: '3 hours ago'
    },
    {
      id: 5,
      name: 'Class 9A',
      code: 'MTH-9A-2025',
      students: 28,
      avgScore: 72,
      activeExams: 2,
      completedExams: 6,
      subjects: ['Basic Mathematics'],
      schedule: 'Mon, Wed, Fri - 1:00 PM',
      room: 'Room 104',
      performance: 'average',
      lastActivity: '4 hours ago'
    },
    {
      id: 6,
      name: 'Class 11A',
      code: 'MTH-11A-2025',
      students: 45,
      avgScore: 65,
      activeExams: 0,
      completedExams: 9,
      subjects: ['Mathematics', 'Algebra'],
      schedule: 'Tue, Thu - 3:00 PM',
      room: 'Room 206',
      performance: 'needs-attention',
      lastActivity: '6 hours ago'
    }
  ];

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
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userRole');
      document.cookie = 'userRole=; path=/; max-age=0';
    }
    router.push('/login');
  };

  const getPerformanceBadge = (performance: string) => {
    const badges = {
      'excellent': { color: 'bg-green-100 text-green-700', label: 'Excellent', icon: <CheckCircle className="w-3 h-3" /> },
      'good': { color: 'bg-blue-100 text-blue-700', label: 'Good', icon: <TrendingUp className="w-3 h-3" /> },
      'average': { color: 'bg-yellow-100 text-yellow-700', label: 'Average', icon: <Activity className="w-3 h-3" /> },
      'needs-attention': { color: 'bg-red-100 text-red-700', label: 'Needs Attention', icon: <AlertCircle className="w-3 h-3" /> }
    };
    return badges[performance as keyof typeof badges];
  };

  // Filter classes based on search and filter
  const filteredClasses = classes.filter(classItem => {
    const matchesSearch = classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         classItem.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         classItem.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || classItem.performance === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Summary stats
  const totalStudents = classes.reduce((sum, cls) => sum + cls.students, 0);
  const totalActiveExams = classes.reduce((sum, cls) => sum + cls.activeExams, 0);
  const overallAverage = Math.round(classes.reduce((sum, cls) => sum + cls.avgScore, 0) / classes.length);

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
        <div className="flex-shrink-0 p-4 sm:p-6 pb-3 border-b border-gray-100">
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

          <div className={`px-3 py-2 rounded-lg border ${roleBadge.color}`}>
            <div className="flex items-center justify-center space-x-2">
              {roleBadge.icon}
              <span className="text-xs font-semibold">{roleBadge.label}</span>
            </div>
          </div>
        </div>

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

        <div className="flex-shrink-0 p-4 sm:p-6 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm flex-shrink-0">
              {userData.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-xs sm:text-sm truncate">{userData.name}</p>
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
                  My Classes
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 truncate hidden sm:block">
                  Manage all your classes and students
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push(`/${userData.role}/classes/new`)}
                className="hidden sm:flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">New Class</span>
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
              onClick={() => router.push(`/${userData.role}/classes/new`)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Class</span>
            </motion.button>
          </div>

          {/* Summary Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{classes.length}</h3>
              <p className="text-xs sm:text-sm text-gray-600">Total Classes</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-green-50 flex items-center justify-center">
                  <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{totalStudents}</h3>
              <p className="text-xs sm:text-sm text-gray-600">Total Students</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{totalActiveExams}</h3>
              <p className="text-xs sm:text-sm text-gray-600">Active Exams</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-orange-50 flex items-center justify-center">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{overallAverage}%</h3>
              <p className="text-xs sm:text-sm text-gray-600">Overall Average</p>
            </motion.div>
          </motion.div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search classes by name, code, or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
              />
            </div>
            
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterOpen(!filterOpen)}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-sm sm:text-base font-medium"
              >
                <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Filter</span>
              </motion.button>

              {filterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                >
                  <div className="p-2">
                    <button
                      onClick={() => { setSelectedFilter('all'); setFilterOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm ${selectedFilter === 'all' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`}
                    >
                      All Classes
                    </button>
                    <button
                      onClick={() => { setSelectedFilter('excellent'); setFilterOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm ${selectedFilter === 'excellent' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`}
                    >
                      Excellent Performance
                    </button>
                    <button
                      onClick={() => { setSelectedFilter('good'); setFilterOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm ${selectedFilter === 'good' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`}
                    >
                      Good Performance
                    </button>
                    <button
                      onClick={() => { setSelectedFilter('average'); setFilterOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm ${selectedFilter === 'average' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`}
                    >
                      Average Performance
                    </button>
                    <button
                      onClick={() => { setSelectedFilter('needs-attention'); setFilterOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm ${selectedFilter === 'needs-attention' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`}
                    >
                      Needs Attention
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Classes Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {filteredClasses.map((classItem, index) => {
              const perfBadge = getPerformanceBadge(classItem.performance);
              
              return (
                <motion.div
                  key={classItem.id}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden cursor-pointer"
                  onClick={() => router.push(`/${userData.role}/classes/${classItem.id}`)}
                >
                  {/* Class Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold">{classItem.name}</h3>
                        <p className="text-xs opacity-90">{classItem.code}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedClass(selectedClass === classItem.id ? null : classItem.id);
                        }}
                        className="p-1 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="w-4 h-4" />
                      <span>{classItem.students} Students</span>
                    </div>
                  </div>

                  {/* Class Body */}
                  <div className="p-4">
                    {/* Performance Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${perfBadge.color}`}>
                        {perfBadge.icon}
                        <span>{perfBadge.label}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-lg font-bold text-gray-900">{classItem.avgScore}%</span>
                      </div>
                    </div>

                    {/* Subjects */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {classItem.subjects.map((subject, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                        <span>{classItem.activeExams} Active</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>{classItem.completedExams} Completed</span>
                      </div>
                    </div>

                    {/* Schedule & Room */}
                    <div className="pt-3 border-t border-gray-200 space-y-2">
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{classItem.schedule}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <div className="flex items-center space-x-2">
                          <BookMarked className="w-4 h-4" />
                          <span>{classItem.room}</span>
                        </div>
                        <span className="text-gray-400">{classItem.lastActivity}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Menu */}
                  <AnimatePresence>
                    {selectedClass === classItem.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-gray-200 bg-gray-50 overflow-hidden"
                      >
                        <div className="p-2 space-y-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/${userData.role}/classes/${classItem.id}`);
                            }}
                            className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-white rounded-lg transition-all"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View Details</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/${userData.role}/classes/${classItem.id}/edit`);
                            }}
                            className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-white rounded-lg transition-all"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Edit Class</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/${userData.role}/classes/${classItem.id}/students`);
                            }}
                            className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-white rounded-lg transition-all"
                          >
                            <UserPlus className="w-4 h-4" />
                            <span>Manage Students</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle delete
                            }}
                            className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete Class</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Empty State */}
          {filteredClasses.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12 text-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No Classes Found</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                {searchQuery ? 'Try adjusting your search or filters' : 'Get started by creating your first class'}
              </p>
              {!searchQuery && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push(`/${userData.role}/classes/new`)}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Your First Class</span>
                </motion.button>
              )}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}