"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Users,
  Award,
  Clock,
  Shield,
  BarChart,
  ChevronRight,
  Sparkles,
  LucideIcon,
  Mail,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";

import SchoolLogo from "../app/assets/ferscoat-logo-1.jpg";
import SchoolbuildingLogo from "../app/assets/fca-building-1.png";
import CookiesPreference from './components/cookiesPreference/CookiesPreference';

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function LandingPage() {
  const router = useRouter();
   const [showCookies, setShowCookies] = useState(true);

  const features: FeatureItem[] = [
    {
      icon: Clock,
      title: "Automated Testing",
      description: "Timed exams with automatic submission & progress tracking.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Exam integrity with anti-cheat and secure delivery.",
    },
    {
      icon: BarChart,
      title: "Detailed Analytics",
      description: "Performance insights for students & teachers.",
    },
    {
      icon: Users,
      title: "Multi-Role Access",
      description: "Separate dashboards for admin, teacher & student.",
    },
    {
      icon: Award,
      title: "Instant Results",
      description: "Automatic grading with detailed score breakdowns.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <img
                src={SchoolLogo.src}
                alt="School Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-md object-contain"
              />
              <span className="text-sm sm:text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                FERSCOAT INT'L SCHOOL CBT
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 sm:gap-4"
            >
              <button
                onClick={() => router.push("/login")}
                className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm text-gray-700 font-medium hover:text-blue-600 transition"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push("/login")}
                className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md sm:rounded-lg shadow hover:shadow-lg transition-all"
              >
                Entrance Exam
              </button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-28 sm:pt-32 pb-16 px-4 sm:px-6 relative overflow-hidden">
        {/* Background circles */}
        <div className="absolute top-0 -left-20 w-56 h-56 sm:w-[500px] sm:h-[500px] bg-blue-300 rounded-full blur-[120px] opacity-25"></div>
        <div className="absolute -bottom-20 right-0 w-56 h-56 sm:w-[500px] sm:h-[500px] bg-indigo-300 rounded-full blur-[120px] opacity-25"></div>

        <div className="max-w-7xl mx-auto relative">
          {/* HERO TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-3 py-1 sm:py-2 bg-blue-100 text-blue-700 rounded-full mb-4 sm:mb-6 text-xs sm:text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span className="font-medium">Next-Generation CBT Platform</span>
            </motion.div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
              All-In-One
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Computer-Based Testing System
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 max-w-xs sm:max-w-2xl mx-auto">
              Smart, secure, and easy-to-use CBT platform for schools of all sizes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/login")}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl font-semibold shadow-md sm:shadow-xl flex items-center gap-2 text-sm sm:text-base"
              >
                Start Free Trial
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white border border-gray-200 text-gray-700 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base shadow-sm sm:shadow-md"
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>

          {/* HERO IMAGE */}
          {/* HERO IMAGE (FLEX MODE) */}
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4, duration: 0.7 }}
  className="mt-12 sm:mt-16 flex flex-col lg:flex-row items-center 
             gap-6 lg:gap-10 w-full px-4 sm:px-6 md:px-8"
>
  {/* School Building Image */}
  <div className="relative w-full lg:w-1/2 flex-shrink-0">
    {/* Glow */}
    <div className="absolute inset-0 bg-gradient-to-r 
                    from-blue-500 to-indigo-500 rounded-2xl 
                    blur-3xl opacity-20"></div>

    <div className="relative bg-white rounded-2xl shadow-xl 
                    p-3 sm:p-4 border border-gray-100 overflow-hidden">
      <img
        src={SchoolbuildingLogo.src}
        alt="School Building"
        className="w-full h-52 xs:h-60 sm:h-72 md:h-80 lg:h-96 
                   object-cover rounded-xl"
      />

      {/* Floating Badge */}
      <div className="absolute top-4 left-4 bg-blue-600 text-white 
                      text-xs sm:text-sm md:text-base px-3 py-1 
                      rounded-full shadow-lg flex items-center gap-2">
        <Shield className="w-4 h-4" />
        Accredited Centre
      </div>

      {/* Small bottom badge */}
      <div className="absolute bottom-4 right-4 bg-white text-gray-700 
                      text-xs px-2 py-1 rounded-full shadow">
        School Facility
      </div>
    </div>
  </div>

  {/* CBT Online Image */}
  <div className="relative w-full lg:w-1/2 flex-shrink-0">
    {/* Glow */}
    <div className="absolute inset-0 bg-gradient-to-r 
                    from-indigo-500 to-purple-500 rounded-2xl 
                    blur-3xl opacity-20"></div>

    <div className="relative bg-white rounded-2xl shadow-xl p-3 sm:p-4 
                    border border-gray-100 overflow-hidden">
      <img
        src="https://images.pexels.com/photos/31115182/pexels-photo-31115182.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
        alt="CBT Online Exam"
        className="w-full h-52 xs:h-60 sm:h-72 md:h-80 lg:h-96 
                   object-cover rounded-xl"
      />

      {/* Floating Badge */}
      <div className="absolute top-4 left-4 bg-purple-600 text-white 
                      text-xs sm:text-sm md:text-base px-3 py-1 
                      rounded-full shadow-lg flex items-center gap-2">
        <BarChart className="w-4 h-4" />
        Online CBT Exam
      </div>

      {/* Bottom badge */}
      <div className="absolute bottom-4 right-4 bg-white text-gray-700 
                      text-xs px-2 py-1 rounded-full shadow">
        Powered by Tech
      </div>
    </div>
  </div>
</motion.div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Everything You Need for Modern Testing
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-xs sm:max-w-2xl mx-auto mt-2">
              Powerful features designed to simplify your entire exam process
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-md sm:shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-50 border-t border-gray-100 mt-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About with logo */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <img
                  src={SchoolLogo.src}
                  alt="School Logo"
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                />
                <h3 className="text-lg font-bold text-gray-900 mb-0">FERSCOAT CBT</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base mt-2">
                Modern computer-based testing platform for schools. Streamline exams, track performance, and ensure secure testing for all students.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-3 sm:mb-4">Quick Links</h4>
              <ul className="space-y-1 sm:space-y-2">
                <li><a href="#features" className="text-gray-600 hover:text-blue-600 transition">Features</a></li>
                <li><a href="#pricing" className="text-gray-600 hover:text-blue-600 transition">Pricing</a></li>
                <li><a href="/login" className="text-gray-600 hover:text-blue-600 transition">Login</a></li>
                <li><a href="#contact" className="text-gray-600 hover:text-blue-600 transition">Contact</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-3 sm:mb-4">Resources</h4>
              <ul className="space-y-1 sm:space-y-2">
                <li><a href="#blog" className="text-gray-600 hover:text-blue-600 transition">Blog</a></li>
                <li><a href="#docs" className="text-gray-600 hover:text-blue-600 transition">Documentation</a></li>
                <li><a href="#faq" className="text-gray-600 hover:text-blue-600 transition">FAQ</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-3 sm:mb-4">Contact Us</h4>
              <ul className="space-y-1 sm:space-y-2 text-gray-600 text-sm sm:text-base">
                <li className="flex items-center gap-2"><Mail className="w-4 h-4 sm:w-5 sm:h-5" /> info@ferscoat.com</li>
                <li className="flex items-center gap-2"><Github className="w-4 h-4 sm:w-5 sm:h-5" /> <a href="https://github.com/ferscoat" className="hover:text-blue-600 transition">Github</a></li>
                <li className="flex items-center gap-2"><Twitter className="w-4 h-4 sm:w-5 sm:h-5" /> <a href="https://twitter.com/ferscoat" className="hover:text-blue-600 transition">Twitter</a></li>
                <li className="flex items-center gap-2"><Linkedin className="w-4 h-4 sm:w-5 sm:h-5" /> <a href="https://linkedin.com/company/ferscoat" className="hover:text-blue-600 transition">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 border-t border-gray-100 pt-4 text-center text-gray-500 text-sm sm:text-base">
            &copy; {new Date().getFullYear()} FERSCOAT INT'L SCHOOL. All rights reserved.
          </div>
        </div>

        {/* Cookies popup */}
        <CookiesPreference/>
      </footer>
    </div>
  );
}
