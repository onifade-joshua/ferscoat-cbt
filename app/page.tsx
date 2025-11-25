'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  BookOpen,
  Users,
  Award,
  Clock,
  Shield,
  BarChart,
  ChevronRight,
  // CheckCircle,
  Sparkles
} from 'lucide-react'

export default function LandingPage() {
  const router = useRouter()

  const features = [
    {
      icon: BookOpen,
      title: 'Smart Question Bank',
      description:
        'Comprehensive question management system with subject categorization and easy import/export.'
    },
    {
      icon: Clock,
      title: 'Automated Testing',
      description:
        'Timed exams with automatic submission and real-time progress tracking.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description:
        'Advanced security measures to prevent cheating and ensure exam integrity.'
    },
    {
      icon: BarChart,
      title: 'Detailed Analytics',
      description:
        'Comprehensive performance reports and insights for students and teachers.'
    },
    {
      icon: Users,
      title: 'Multi-Role Access',
      description:
        'Separate dashboards for administrators, teachers, and students.'
    },
    {
      icon: Award,
      title: 'Instant Results',
      description:
        'Get immediate feedback with automatic grading and detailed score breakdowns.'
    }
  ]

  const benefits = [
    'JAMB & WAEC-style test interface',
    'Question randomization for each student',
    'Auto-save answers as you go',
    'Mobile-friendly responsive design',
    'Export results to PDF or Excel',
    'Practice mode for exam preparation'
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop:blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                FERSCOAT INTERNATIONAL SCHOOL CBT
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <button
                onClick={() => router.push('/login')}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push('/login')}
                className="px-6 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl translate-y-0 hover:-translate-y-0.5"
              >
                Get Started
              </button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">
                Next-Generation CBT Platform
              </span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Modern Computer-Based
              <br />
              <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Testing Platform
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Streamline your examination process with our advanced CBT system.
              Create, manage, and grade exams effortlessly while providing
              students with a seamless testing experience.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/login')}
                className="px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all flex items-center gap-2"
              >
                <span>Start Free Trial</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-blue-600 transition-all"
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>

          {/* Hero Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-20"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-indigo-400 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-4">
                    <div className="h-12 bg-linear-to-r from-blue-100 to-indigo-100 rounded-lg"></div>
                    <div className="h-32 bg-gray-100 rounded-lg"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-20 bg-blue-50 rounded-lg"></div>
                      <div className="h-20 bg-indigo-50 rounded-lg"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-20 bg-green-50 rounded-lg"></div>
                    <div className="h-20 bg-yellow-50 rounded-lg"></div>
                    <div className="h-20 bg-purple-50 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Modern Testing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make examination management simple
              and effective
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-linear-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all shadow-lg hover:shadow-xl"
              >
                <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
