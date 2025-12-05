// ===================================
// FILE: src/lib/auth/roleUtils.ts
// ===================================

export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface UserPermissions {
  canViewQuestions: boolean;
  canViewExams: boolean;
  canViewResults: boolean;
  canViewSchedule: boolean;
  canViewSettings: boolean;
  canViewUsers: boolean;
  canViewDashboard: boolean;
}

// Dummy user database (replace with real database later)
const USERS_DB = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@ferscoat.edu',
    password: 'admin123',
    role: 'admin' as UserRole
  },
  {
    id: '2',
    name: 'Prof. Johnson',
    email: 'teacher@ferscoat.edu',
    password: 'teacher123',
    role: 'teacher' as UserRole
  },
  {
    id: '3',
    name: 'John Student',
    email: 'student@ferscoat.edu',
    password: 'student123',
    role: 'student' as UserRole
  }
];

// Simulated permission settings (controlled by admin)
const PERMISSION_SETTINGS = {
  student: {
    canViewResults: false, // Admin can enable this
    canViewSettings: false, // Admin can enable this
    canViewExams: true,
    canViewSchedule: true
  },
  teacher: {
    canViewExams: false, // Admin can enable this
    canViewResults: false // Admin can enable this
  }
};

// Authenticate user by email and password
export const authenticateUser = (email: string, password: string): User | null => {
  const user = USERS_DB.find(u => u.email === email && u.password === password);
  
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  return null;
};

// Save user session
export const saveUserSession = (user: User): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('userRole', user.role);
    document.cookie = `userRole=${user.role}; path=/; max-age=86400`; // 24 hours
  }
};

// Get current user from session
export const getCurrentUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      return JSON.parse(userJson);
    }
  }
  return null;
};

// Logout user
export const logoutUser = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    document.cookie = 'userRole=; path=/; max-age=0';
  }
};

// Check if user has permission
export const hasPermission = (userRole: UserRole, requiredRoles: UserRole[]): boolean => {
  return requiredRoles.includes(userRole);
};

// Get user permissions based on role and admin settings
export const getUserPermissions = (role: UserRole): UserPermissions => {
  // Admin has all permissions
  if (role === 'admin') {
    return {
      canViewDashboard: true,
      canViewQuestions: true,
      canViewExams: true,
      canViewResults: true,
      canViewSchedule: true,
      canViewSettings: true,
      canViewUsers: true
    };
  }

  // Teacher permissions (some controlled by admin)
  if (role === 'teacher') {
    return {
      canViewDashboard: true,
      canViewQuestions: true, // Always visible for teachers
      canViewExams: PERMISSION_SETTINGS.teacher.canViewExams, // Controlled by admin
      canViewResults: PERMISSION_SETTINGS.teacher.canViewResults, // Controlled by admin
      canViewSchedule: true, // Always visible
      canViewSettings: true, // Always visible
      canViewUsers: false
    };
  }

  // Student permissions (some controlled by admin)
  if (role === 'student') {
    return {
      canViewDashboard: true,
      canViewQuestions: false, // Never visible for students
      canViewExams: PERMISSION_SETTINGS.student.canViewExams, // Controlled by admin
      canViewResults: PERMISSION_SETTINGS.student.canViewResults, // Controlled by admin
      canViewSchedule: PERMISSION_SETTINGS.student.canViewSchedule, // Controlled by admin
      canViewSettings: PERMISSION_SETTINGS.student.canViewSettings, // Controlled by admin
      canViewUsers: false
    };
  }

  // Default: no permissions
  return {
    canViewDashboard: false,
    canViewQuestions: false,
    canViewExams: false,
    canViewResults: false,
    canViewSchedule: false,
    canViewSettings: false,
    canViewUsers: false
  };
};

// Admin function to update permissions (for future use)
export const updateStudentPermissions = (
  canViewResults: boolean,
  canViewSettings: boolean
): void => {
  PERMISSION_SETTINGS.student.canViewResults = canViewResults;
  PERMISSION_SETTINGS.student.canViewSettings = canViewSettings;
  // In real app, this would update the database
};

// Admin function to update teacher permissions (for future use)
export const updateTeacherPermissions = (
  canViewExams: boolean,
  canViewResults: boolean
): void => {
  PERMISSION_SETTINGS.teacher.canViewExams = canViewExams;
  PERMISSION_SETTINGS.teacher.canViewResults = canViewResults;
  // In real app, this would update the database
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

// Get role from email (useful for determining role during signup)
export const getRoleFromEmail = (email: string): UserRole => {
  if (email.includes('admin')) return 'admin';
  if (email.includes('teacher')) return 'teacher';
  return 'student';
};