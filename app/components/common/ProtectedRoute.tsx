'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, hasPermission, UserRole } from '../../lib/auth/roleUtils';
import { ShieldAlert } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo = '/student'
}: ProtectedRouteProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const user = getCurrentUser();

    // 🔒 If user is not logged in → redirect
    if (!user) {
      setIsAuthorized(false);
      setIsLoading(false);

      setTimeout(() => {
        router.push(redirectTo);
      }, 2000);

      return;
    }

    // 🔐 Verify if user role is allowed
    const authorized = hasPermission(user.role, allowedRoles);

    if (!authorized) {
      setIsAuthorized(false);

      setTimeout(() => {
        router.push(redirectTo);
      }, 2000);
    } else {
      setIsAuthorized(true);
    }

    setIsLoading(false);
  }, [allowedRoles, redirectTo, router]);

  // ⏳ Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // ❌ Access Denied Screen
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">
            You dont have permission to access this page.
          </p>
          <p className="text-sm text-gray-500">Redirecting...</p>
        </div>
      </div>
    );
  }

  // 🎉 Authorized → render page
  return <>{children}</>;
}
