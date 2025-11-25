'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  TrendingUp,
  TrendingDown,
  Download,
  Eye,
  Calendar,
  Clock,
  Target,
  BarChart3,
  CheckCircle,
  XCircle,
  Filter,
  Search
} from 'lucide-react';

export default function ResultsPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample results data
  const results = [
    {
      id: 1,
      examTitle: 'Mathematics Final Exam',
      subject: 'Mathematics',
      date: '2025-10-28',
      score: 92,
      totalQuestions: 50,
      correctAnswers: 46,
      duration: '1h 45m',
      grade: 'A',
      status: 'excellent',
      percentile: 95
    },
    {
      id: 2,
      examTitle: 'English Language Test',
      subject: 'English',
      date: '2025-10-25',
      score: 78,
      totalQuestions: 40,
      correctAnswers: 31,
      duration: '1h 20m',
      grade: 'B',
      status: 'good',
      percentile: 72
    },
    {
      id: 3,
      examTitle: 'Physics Mid-term',
      subject: 'Physics',
      date: '2025-10-22',
      score: 85,
      totalQuestions: 45,
      correctAnswers: 38,
      duration: '1h 55m',
      grade: 'B',
      status: 'good',
      percentile: 80
    },
    {
      id: 4,
      examTitle: 'Chemistry Quiz',
      subject: 'Chemistry',
      date: '2025-10-20',
      score: 68,
      totalQuestions: 30,
      correctAnswers: 20,
      duration: '45m',
      grade: 'C',
      status: 'average',
      percentile: 60
    },
    {
      id: 5,
      examTitle: 'Biology Test',
      subject: 'Biology',
      date: '2025-10-18',
      score: 94,
      totalQuestions: 50,
      correctAnswers: 47,
      duration: '1h 50m',
      grade: 'A',
      status: 'excellent',
      percentile: 98
    }
  ];

  // Statistics
  const stats = {
    totalExams: results.length,
    averageScore: Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length),
    highestScore: Math.max(...results.map(r => r.score)),
    passRate: Math.round((results.filter(r => r.score >= 50).length / results.length) * 100)
  };

  // Filter results
  const filteredResults = results.filter(result => {
    const matchesFilter = filter === 'all' || 
      (filter === 'excellent' && result.score >= 85) ||
      (filter === 'good' && result.score >= 70 && result.score < 85) ||
      (filter === 'average' && result.score < 70);
    
    const matchesSearch = result.examTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getGradeColor = (grade: string): string => {
    const colors: Record<string, string> = {
      'A': 'bg-green-100 text-green-700 border-green-200',
      'B': 'bg-blue-100 text-blue-700 border-blue-200',
      'C': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'D': 'bg-orange-100 text-orange-700 border-orange-200',
      'F': 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[grade] || colors['F'];
  };

  const getScoreColor = (score: number): string => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Exam Results</h1>
            <p className="text-gray-600 mt-1">Track your performance and progress</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <Download className="w-5 h-5" />
            <span>Export Report</span>
          </motion.button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Award, label: 'Total Exams', value: stats.totalExams, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50' },
            { icon: Target, label: 'Average Score', value: `${stats.averageScore}%`, color: 'from-green-500 to-green-600', bg: 'bg-green-50' },
            { icon: TrendingUp, label: 'Highest Score', value: `${stats.highestScore}%`, color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50' },
            { icon: BarChart3, label: 'Pass Rate', value: `${stats.passRate}%`, color: 'from-yellow-500 to-yellow-600', bg: 'bg-yellow-50' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all"
            >
              <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent' }} />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by exam or subject..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              {[
                { value: 'all', label: 'All' },
                { value: 'excellent', label: 'Excellent' },
                { value: 'good', label: 'Good' },
                { value: 'average', label: 'Average' }
              ].map((btn) => (
                <motion.button
                  key={btn.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(btn.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filter === btn.value
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {btn.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results List */}
        <div className="space-y-4">
          {filteredResults.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl p-12 text-center border border-gray-200"
            >
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Found</h3>
              <p className="text-gray-600">Try adjusting your filters or search query</p>
            </motion.div>
          ) : (
            filteredResults.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left Section */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${
                        result.score >= 85 ? 'from-green-500 to-green-600' :
                        result.score >= 70 ? 'from-blue-500 to-blue-600' :
                        'from-yellow-500 to-yellow-600'
                      } flex items-center justify-center text-white font-bold text-xl`}>
                        {result.score}%
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{result.examTitle}</h3>
                        <p className="text-sm text-gray-600 mb-3">{result.subject}</p>
                        
                        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{result.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{result.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>{result.correctAnswers}/{result.totalQuestions} Correct</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="flex items-center gap-4">
                    {/* Grade Badge */}
                    <div className={`px-4 py-2 rounded-lg border-2 font-bold text-2xl ${getGradeColor(result.grade)}`}>
                      {result.grade}
                    </div>

                    {/* Percentile */}
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{result.percentile}th</p>
                      <p className="text-xs text-gray-500">Percentile</p>
                    </div>

                    {/* View Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                      <Eye className="w-5 h-5" />
                      <span>View Details</span>
                    </motion.button>
                  </div>
                </div>

                {/* Performance Bar */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Performance</span>
                    <span className={`font-semibold ${getScoreColor(result.score)}`}>
                      {result.score >= 85 ? 'Excellent' : result.score >= 70 ? 'Good' : result.score >= 50 ? 'Average' : 'Below Average'}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.score}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-full bg-gradient-to-r ${
                        result.score >= 85 ? 'from-green-500 to-green-600' :
                        result.score >= 70 ? 'from-blue-500 to-blue-600' :
                        'from-yellow-500 to-yellow-600'
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}