'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  ShieldAlert,
  Lock,
  AlertTriangle,
  Home,
  ArrowLeft,
  Mail
} from 'lucide-react';

// ===== COMPONENT =====

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Icon Section */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block"
            >
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldAlert className="w-12 h-12 text-white" />
              </div>
            </motion.div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Access Denied
            </h1>
            <p className="text-white text-opacity-90 text-sm">
              You don't have permission to view this page
            </p>
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-8">
            <div className="space-y-4 mb-6">
              {/* Error Message */}
              <div className="flex items-start space-x-3 p-4 bg-red-50 border border-red-100 rounded-lg">
                <Lock className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-red-900 mb-1">
                    Unauthorized Access
                  </h3>
                  <p className="text-xs text-red-700">
                    This page is restricted. Your current role does not have the required permissions to access this content.
                  </p>
                </div>
              </div>

              {/* Possible Reasons */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-900 flex items-center">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2" />
                  Possible reasons:
                </p>
                <ul className="text-xs text-gray-600 space-y-2 ml-6">
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <span>Your account role doesn't have access to this feature</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <span>This page is restricted to administrators only</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <span>Your session may have expired</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.back()}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Go Back</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/teacher')}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
              >
                <Home className="w-5 h-5" />
                <span>Go to Dashboard</span>
              </motion.button>
            </div>

            {/* Contact Admin */}
            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-600 mb-3">
                Need access to this page?
              </p>
              <button
                onClick={() => router.push('/teacher/settings')}
                className="inline-flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Administrator</span>
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Error Code: 403 - Forbidden
          </p>
        </div>
      </motion.div>
    </div>
  );
}