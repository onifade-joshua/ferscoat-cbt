'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Clock,
  Calendar,
  FileText,
  PlayCircle,
  CheckCircle,
  AlertCircle,
  Search,
  Users,
  Award,
  TrendingUp
} from 'lucide-react';

// ===== TYPE DEFINITIONS =====

interface ExamBase {
  id: number;
  title: string;
  subject: string;
  totalQuestions: number;
  duration: number;
}

interface AvailableExam extends ExamBase {
  description: string;
  startDate: string;
  endDate: string;
  passingScore: number;
  status: 'active' | 'upcoming';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  instructor: string;
  attempts: number;
  maxAttempts: number;
}

interface CompletedExam extends ExamBase {
  completedDate: string;
  score: number;
  grade: string;
  status: 'completed';
}

interface PracticeExam extends ExamBase {
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'practice';
}

type Exam = AvailableExam | CompletedExam | PracticeExam;

interface ExamsData {
  available: AvailableExam[];
  completed: CompletedExam[];
  practice: PracticeExam[];
}

interface StatusBadge {
  label: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

// ===== COMPONENT =====

export default function ExamsPage(){
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'available' | 'completed' | 'practice'>('available');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sample exam data
  const exams: ExamsData = {
    available: [
      {
        id: 1,
        title: 'Mathematics Final Exam',
        subject: 'Mathematics',
        description: 'Comprehensive exam covering algebra, calculus, and geometry',
        startDate: '2025-11-25',
        endDate: '2025-11-30',
        duration: 120,
        totalQuestions: 50,
        passingScore: 50,
        status: 'active',
        difficulty: 'Hard',
        instructor: 'Prof. Johnson',
        attempts: 0,
        maxAttempts: 1
      },
      {
        id: 2,
        title: 'English Language Test',
        subject: 'English',
        description: 'Reading comprehension, grammar, and essay writing',
        startDate: '2025-11-03',
        endDate: '2025-11-05',
        duration: 90,
        totalQuestions: 40,
        passingScore: 50,
        status: 'active',
        difficulty: 'Medium',
        instructor: 'Mrs. Smith',
        attempts: 0,
        maxAttempts: 1
      },
      {
        id: 3,
        title: 'Physics Mid-term',
        subject: 'Physics',
        description: 'Mechanics, thermodynamics, and electromagnetism',
        startDate: '2025-11-07',
        endDate: '2025-11-10',
        duration: 120,
        totalQuestions: 45,
        passingScore: 50,
        status: 'upcoming',
        difficulty: 'Hard',
        instructor: 'Dr. Williams',
        attempts: 0,
        maxAttempts: 2
      }
    ],
    completed: [
      {
        id: 4,
        title: 'Biology Test',
        subject: 'Biology',
        completedDate: '2025-10-28',
        score: 92,
        totalQuestions: 50,
        duration: 110,
        grade: 'A',
        status: 'completed'
      },
      {
        id: 5,
        title: 'Chemistry Quiz',
        subject: 'Chemistry',
        completedDate: '2025-10-25',
        score: 78,
        totalQuestions: 30,
        duration: 45,
        grade: 'B',
        status: 'completed'
      }
    ],
    practice: [
      {
        id: 6,
        title: 'Math Practice Test 1',
        subject: 'Mathematics',
        description: 'Practice questions for upcoming exam',
        totalQuestions: 30,
        duration: 60,
        difficulty: 'Medium',
        status: 'practice'
      },
      {
        id: 7,
        title: 'English Practice Quiz',
        subject: 'English',
        description: 'Grammar and vocabulary practice',
        totalQuestions: 25,
        duration: 45,
        difficulty: 'Easy',
        status: 'practice'
      }
    ]
  };

  const getDifficultyColor = (difficulty: 'Easy' | 'Medium' | 'Hard'): string => {
    const colors: Record<string, string> = {
      Easy: 'bg-green-100 text-green-700',
      Medium: 'bg-yellow-100 text-yellow-700',
      Hard: 'bg-red-100 text-red-700'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-700';
  };

  const getStatusBadge = (status: 'active' | 'upcoming' | 'completed' | 'practice'): StatusBadge => {
    const badges: Record<string, StatusBadge> = {
      active: { label: 'Available Now', color: 'bg-green-500', icon: PlayCircle },
      upcoming: { label: 'Upcoming', color: 'bg-blue-500', icon: Clock },
      completed: { label: 'Completed', color: 'bg-gray-500', icon: CheckCircle },
      practice: { label: 'Practice Mode', color: 'bg-purple-500', icon: BookOpen }
    };
    return badges[status] || badges.active;
  };

  const filteredExams = exams[activeTab]?.filter((exam: Exam) =>
    exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.subject.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const isAvailableExam = (exam: Exam): exam is AvailableExam => {
    return 'startDate' in exam && 'endDate' in exam;
  };

  const isCompletedExam = (exam: Exam): exam is CompletedExam => {
    return 'completedDate' in exam && 'score' in exam;
  };

  const isPracticeExam = (exam: Exam): exam is PracticeExam => {
    return exam.status === 'practice';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">Examinations</h1>
          <p className="text-gray-600 mt-1">Browse and take your exams</p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Available Exams</p>
                <p className="text-3xl font-bold text-blue-600">{exams.available.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completed</p>
                <p className="text-3xl font-bold text-green-600">{exams.completed.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Practice Tests</p>
                <p className="text-3xl font-bold text-purple-600">{exams.practice.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search and Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
        >
          {/* Search Bar */}
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exams by title or subject..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-gray-200">
            {[
              { value: 'available' as const, label: 'Available', count: exams.available.length },
              { value: 'completed' as const, label: 'Completed', count: exams.completed.length },
              { value: 'practice' as const, label: 'Practice', count: exams.practice.length }
            ].map((tab) => (
              <motion.button
                key={tab.value}
                whileHover={{ y: -2 }}
                onClick={() => setActiveTab(tab.value)}
                className={`px-6 py-3 font-semibold transition-all relative ${
                  activeTab === tab.value
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label} ({tab.count})
                {activeTab === tab.value && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredExams.length === 0 ? (
            <div className="col-span-2 bg-white rounded-xl p-12 text-center border border-gray-200">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Exams Found</h3>
              <p className="text-gray-600">Try adjusting your search or check back later</p>
            </div>
          ) : (
            filteredExams.map((exam: Exam, index: number) => {
              const badge = getStatusBadge(exam.status);
              const BadgeIcon = badge.icon;

              return (
                <motion.div
                  key={exam.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{exam.title}</h3>
                        <p className="text-blue-100 text-sm">{exam.subject}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${badge.color} text-white`}>
                        <BadgeIcon className="w-3 h-3" />
                        <span>{badge.label}</span>
                      </div>
                    </div>
                    {(isAvailableExam(exam) || isPracticeExam(exam)) && (
                      <p className="text-sm text-blue-100">{exam.description}</p>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Available Exams */}
                    {isAvailableExam(exam) && (
                      <>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{exam.startDate}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{exam.duration} mins</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <FileText className="w-4 h-4" />
                            <span>{exam.totalQuestions} Questions</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>{exam.instructor}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(exam.difficulty)}`}>
                            {exam.difficulty}
                          </span>
                          <span className="text-sm text-gray-600">
                            Attempts: {exam.attempts}/{exam.maxAttempts}
                          </span>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => router.push(`/student/take-exam/${exam.id}`)}
                          disabled={exam.status !== 'active'}
                          className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all ${
                            exam.status === 'active'
                              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <PlayCircle className="w-5 h-5" />
                          <span>{exam.status === 'active' ? 'Start Exam' : 'Not Available Yet'}</span>
                        </motion.button>
                      </>
                    )}

                    {/* Completed Exams */}
                    {isCompletedExam(exam) && (
                      <>
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-center flex-1">
                            <p className="text-3xl font-bold text-blue-600">{exam.score}%</p>
                            <p className="text-sm text-gray-600">Score</p>
                          </div>
                          <div className="text-center flex-1">
                            <p className="text-3xl font-bold text-green-600">{exam.grade}</p>
                            <p className="text-sm text-gray-600">Grade</p>
                          </div>
                          <div className="text-center flex-1">
                            <p className="text-3xl font-bold text-purple-600">{exam.totalQuestions}</p>
                            <p className="text-sm text-gray-600">Questions</p>
                          </div>
                        </div>

                        <div className="text-sm text-gray-600 mb-4">
                          <div className="flex items-center justify-between">
                            <span>Completed on {exam.completedDate}</span>
                            <span>Duration: {exam.duration} mins</span>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => router.push('/student/results')}
                          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl"
                        >
                          View Detailed Results
                        </motion.button>
                      </>
                    )}

                    {/* Practice Exams */}
                    {isPracticeExam(exam) && (
                      <>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{exam.duration} mins</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <FileText className="w-4 h-4" />
                            <span>{exam.totalQuestions} Questions</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(exam.difficulty)}`}>
                            {exam.difficulty}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 mb-4">{exam.description}</p>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => router.push(`/student/take-exam/${exam.id}`)}
                          className="w-full py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                        >
                          <PlayCircle className="w-5 h-5" />
                          <span>Start Practice</span>
                        </motion.button>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}