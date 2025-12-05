'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import {
  BookOpen,
  Settings,
  Home,
  BarChart3,
  Calendar,
  LogOut,
  Menu,
  FileText,
  Users,
  Shield,
  ClipboardList
} from 'lucide-react';
import { getCurrentUser, UserRole } from '../../lib/auth/roleUtils';

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
  allowedRoles: UserRole[];
}

export default function RoleBasedSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    setUser(getCurrentUser());
  }, [pathname]);

    const currentUser = user ?? {
    name: "Guest User",
    email: "guest@example.com",
    role: "student" as UserRole
  };
  // Navigation items with role-based access
  const navItems: NavItem[] = [
    { 
      icon: Home, 
      label: 'Dashboard', 
      path: `/${currentUser.role}`,
      allowedRoles: ['admin', 'teacher', 'student']
    },
    { 
      icon: FileText, 
      label: 'Questions', 
      path: `/${currentUser.role}/questions`,
      allowedRoles: ['admin', 'teacher'] // Only admin and teacher can see this
    },
    { 
      icon: BookOpen, 
      label: 'Exams', 
      path: `/${currentUser.role}/exams`,
      allowedRoles: ['admin', 'teacher', 'student']
    },
    { 
      icon: BarChart3, 
      label: 'Results', 
      path: `/${currentUser.role}/results`,
      allowedRoles: ['admin', 'teacher', 'student']
    },
    { 
      icon: Calendar, 
      label: 'Schedule', 
      path: `/${currentUser.role}/schedule`,
      allowedRoles: ['admin', 'teacher', 'student']
    },
    { 
      icon: Users, 
      label: 'Users', 
      path: '/admin/users',
      allowedRoles: ['admin'] // Only admin can see this
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: `/${currentUser.role}/settings`,
      allowedRoles: ['admin', 'teacher', 'student']
    }
  ];

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter(item => 
    item.allowedRoles.includes(currentUser.role)
  );

  const handleNavigation = (path: string, allowedRoles: UserRole[]) => {
    if (!allowedRoles.includes(currentUser.role)) {
      alert('⛔ Access Denied: You do not have permission to access this page.');
      return;
    }
    router.push(path);
  };

  const getRoleBadge = (role: UserRole) => {
    const badges = {
      admin: { color: 'bg-purple-100 text-purple-700', label: 'Administrator' },
      teacher: { color: 'bg-blue-100 text-blue-700', label: 'Teacher' },
      student: { color: 'bg-green-100 text-green-700', label: 'Student' }
    };
    return badges[role];
  };

  const badge = getRoleBadge(currentUser.role);

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: sidebarOpen ? 0 : -300 }}
      className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-40 sidebar-shadow"
    >
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Ferscoat CBT
          </span>
        </div>

        {/* Role Badge */}
        <div className={`mb-6 px-3 py-2 rounded-lg ${badge.color} text-center`}>
          <div className="flex items-center justify-center space-x-2">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-semibold">{badge.label}</span>
          </div>
        </div>

        <nav className="space-y-2">
          {filteredNavItems.map((item, index) => {
            const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
            
            return (
              <motion.button
                key={index}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNavigation(item.path, item.allowedRoles)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
            {currentUser.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900">{currentUser.name}</p>
            <p className="text-xs text-gray-500">{currentUser.email}</p>
          </div>
        </div>
        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/login')}
          className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </motion.button>
      </div>
    </motion.aside>
  );
}