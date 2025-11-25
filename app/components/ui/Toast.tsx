'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useEffect } from 'react';

// ===== TYPE DEFINITIONS =====

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  type: ToastType;
  title: string;
  message?: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';
}

// ===== COMPONENT =====

export default function Toast({
  type,
  title,
  message,
  isVisible,
  onClose,
  duration = 5000,
  position = 'top-right'
}: ToastProps) {
  
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info
  };

  const colors = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-500',
      icon: 'text-green-600',
      text: 'text-green-900'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-500',
      icon: 'text-red-600',
      text: 'text-red-900'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-500',
      icon: 'text-yellow-600',
      text: 'text-yellow-900'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      icon: 'text-blue-600',
      text: 'text-blue-900'
    }
  };

  const positionClasses = {
    'top-right': 'top-6 right-6',
    'top-center': 'top-6 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-6 right-6',
    'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2'
  };

  const Icon = icons[type];
  const colorScheme = colors[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={`fixed ${positionClasses[position]} z-[9999] max-w-md w-full mx-4`}
        >
          <div
            className={`${colorScheme.bg} ${colorScheme.border} border-l-4 rounded-lg shadow-2xl p-4 flex items-start space-x-3`}
          >
            <Icon className={`w-6 h-6 ${colorScheme.icon} flex-shrink-0 mt-0.5`} />
            
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold ${colorScheme.text} mb-1`}>
                {title}
              </h3>
              {message && (
                <p className="text-sm text-gray-600">
                  {message}
                </p>
              )}
            </div>

            <button
              onClick={onClose}
              className="flex-shrink-0 p-1 hover:bg-gray-200 rounded transition-colors"
              aria-label="Close notification"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Progress bar */}
          {duration > 0 && (
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
              className={`h-1 ${colorScheme.border.replace('border', 'bg')} rounded-b origin-left`}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}