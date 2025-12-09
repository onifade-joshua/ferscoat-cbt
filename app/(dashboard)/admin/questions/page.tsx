"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  BookOpen,
  Filter,
  Search,
  AlertCircle,
  FileText,
  Users,
  TrendingUp,
  Menu,
  Bell,
  X,
  ThumbsUp,
  ThumbsDown,
  Timer,
  Save,
} from "lucide-react";

interface Question {
  id: number;
  subject: string;
  class: string;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: string;
  source: "WAEC" | "JAMB" | "NECO" | "Teacher";
  submittedBy: string;
  submittedAt: string;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "pending" | "approved" | "rejected";
  examDuration?: number;
}

export default function QuestionApprovalPage() {
  const [showViewModal, setShowViewModal] = useState(false);
  const [showTimeSettingModal, setShowTimeSettingModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("pending");
  const [filterSource, setFilterSource] = useState("all");
  const [filterClass, setFilterClass] = useState("all");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  
  const [examSettings, setExamSettings] = useState({
    subject: "",
    class: "",
    duration: 60,
    totalQuestions: 1,
  });

  const questions: Question[] = [
    {
      id: 1,
      subject: "Mathematics",
      class: "SS3",
      topic: "Quadratic Equations",
      question: "Solve the equation: x² - 5x + 6 = 0",
      options: ["x = 2 or x = 3", "x = 1 or x = 6", "x = -2 or x = -3", "x = 5 or x = 1"],
      correctAnswer: "x = 2 or x = 3",
      source: "WAEC",
      submittedBy: "WAEC API",
      submittedAt: "2025-12-07T09:30:00",
      difficulty: "Medium",
      status: "pending",
    },
    {
      id: 2,
      subject: "English Language",
      class: "SS2",
      topic: "Comprehension",
      question: "Choose the word that best completes the sentence: The student was _____ for his outstanding performance.",
      options: ["rewarded", "punished", "ignored", "rejected"],
      correctAnswer: "rewarded",
      source: "JAMB",
      submittedBy: "JAMB API",
      submittedAt: "2025-12-07T10:15:00",
      difficulty: "Easy",
      status: "pending",
    },
    {
      id: 3,
      subject: "Physics",
      class: "SS3",
      topic: "Newton's Laws of Motion",
      question: "What is the SI unit of force?",
      options: ["Newton", "Joule", "Watt", "Pascal"],
      correctAnswer: "Newton",
      source: "NECO",
      submittedBy: "NECO API",
      submittedAt: "2025-12-07T11:00:00",
      difficulty: "Easy",
      status: "pending",
    },
    {
      id: 4,
      subject: "Chemistry",
      class: "SS1",
      topic: "Periodic Table",
      question: "Which element has the atomic number 6?",
      options: ["Oxygen", "Carbon", "Nitrogen", "Hydrogen"],
      correctAnswer: "Carbon",
      source: "Teacher",
      submittedBy: "Mr. Adeyemi John",
      submittedAt: "2025-12-06T14:20:00",
      difficulty: "Easy",
      status: "pending",
    },
    {
      id: 5,
      subject: "Biology",
      class: "SS2",
      topic: "Human Digestive System",
      question: "Which organ is primarily responsible for the absorption of nutrients?",
      options: ["Stomach", "Small intestine", "Large intestine", "Liver"],
      correctAnswer: "Small intestine",
      source: "Teacher",
      submittedBy: "Mrs. Okonkwo Peace",
      submittedAt: "2025-12-06T15:45:00",
      difficulty: "Medium",
      status: "approved",
      examDuration: 45,
    },
    {
      id: 6,
      subject: "Mathematics",
      class: "JSS3",
      topic: "Algebra",
      question: "Simplify: 3x + 2x - 5x",
      options: ["0", "10x", "x", "-x"],
      correctAnswer: "0",
      source: "WAEC",
      submittedBy: "WAEC API",
      submittedAt: "2025-12-05T16:30:00",
      difficulty: "Easy",
      status: "rejected",
    },
  ];

  const stats = [
    {
      icon: FileText,
      label: "Pending Review",
      value: "24",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      icon: CheckCircle,
      label: "Approved",
      value: "156",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      icon: XCircle,
      label: "Rejected",
      value: "12",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
    },
    {
      icon: TrendingUp,
      label: "Approval Rate",
      value: "93%",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ];

  const getSourceColor = (source: string) => {
    switch (source) {
      case "WAEC":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "JAMB":
        return "bg-green-100 text-green-700 border-green-200";
      case "NECO":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Teacher":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Hard":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">Pending</span>;
      case "approved":
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Approved</span>;
      case "rejected":
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Rejected</span>;
      default:
        return null;
    }
  };

  const handleApprove = (questionId: number) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      setSelectedQuestion(question);
      setExamSettings({
        subject: question.subject,
        class: question.class,
        duration: 60,
        totalQuestions: 1,
      });
      setShowTimeSettingModal(true);
    }
  };

  const handleReject = (questionId: number) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      setSelectedQuestion(question);
      setShowRejectModal(true);
    }
  };

  const handleConfirmReject = () => {
    console.log("Rejecting question:", selectedQuestion?.id, "Reason:", rejectReason);
    alert(`Question rejected successfully!`);
    setShowRejectModal(false);
    setRejectReason("");
  };

  const handleViewQuestion = (question: Question) => {
    setSelectedQuestion(question);
    setShowViewModal(true);
  };

  const handleSaveExamSettings = () => {
    console.log("Saving exam settings:", examSettings);
    alert(`Question approved! Exam duration set to ${examSettings.duration} minutes for ${examSettings.subject} - ${examSettings.class}`);
    setShowTimeSettingModal(false);
  };

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = 
      question.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.question.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || question.status === filterStatus;
    const matchesSource = filterSource === "all" || question.source === filterSource;
    const matchesClass = filterClass === "all" || question.class === filterClass;
    return matchesSearch && matchesStatus && matchesSource && matchesClass;
  });

  const classes = ["PRY1", "PRY2", "PRY3", "PRY4", "PRY5", "PRY6", "JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Question Approval
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">
                  Review and approve exam questions
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setShowMobileMenu(!showMobileMenu)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              </motion.button>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {stats.map((stat, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-3 border border-gray-200">
                <div className={`w-8 h-8 rounded-lg ${stat.bgColor} flex items-center justify-center mb-2`}>
                  <stat.icon className={`w-4 h-4 ${stat.textColor}`} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </header>

      <main className="p-3 sm:p-6 space-y-4">
        <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-200 shadow-sm">
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input type="text" placeholder="Search by subject, topic, or question..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white">
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <select value={filterSource} onChange={(e) => setFilterSource(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white">
                <option value="all">All Sources</option>
                <option value="WAEC">WAEC</option>
                <option value="JAMB">JAMB</option>
                <option value="NECO">NECO</option>
                <option value="Teacher">Teacher</option>
              </select>
              <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white">
                <option value="all">All Classes</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </motion.button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {filteredQuestions.length === 0 ? (
            <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No Questions Found</h3>
              <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredQuestions.map((question, index) => (
              <motion.div key={question.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900">{question.subject}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getSourceColor(question.source)}`}>{question.source}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(question.difficulty)}`}>{question.difficulty}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" />{question.class}</span>
                        <span>•</span>
                        <span>{question.topic}</span>
                        <span>•</span>
                        <span>{question.submittedBy}</span>
                      </div>
                    </div>
                    {getStatusBadge(question.status)}
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700 font-medium mb-2">{question.question}</p>
                    <div className="space-y-1.5">
                      {question.options.map((option, idx) => (
                        <div key={idx} className={`text-xs p-2 rounded-lg ${option === question.correctAnswer ? "bg-green-100 text-green-800 font-semibold" : "bg-white text-gray-700"}`}>
                          {String.fromCharCode(65 + idx)}. {option}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleViewQuestion(question)} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-200 flex items-center gap-1">
                      <Eye className="w-3 h-3" />View Details
                    </motion.button>
                    {question.status === "pending" && (
                      <>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleApprove(question.id)} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-semibold hover:bg-green-200 flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />Approve
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleReject(question.id)} className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-semibold hover:bg-red-200 flex items-center gap-1">
                          <ThumbsDown className="w-3 h-3" />Reject
                        </motion.button>
                      </>
                    )}
                    {question.status === "approved" && question.examDuration && (
                      <div className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" />{question.examDuration} mins
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </main>

      <AnimatePresence>
        {showViewModal && selectedQuestion && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowViewModal(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Question Details</h2>
                  <button onClick={() => setShowViewModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Subject</h3>
                    <p className="text-sm text-gray-900">{selectedQuestion.subject}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Class</h3>
                    <p className="text-sm text-gray-900">{selectedQuestion.class}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Topic</h3>
                    <p className="text-sm text-gray-900">{selectedQuestion.topic}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Difficulty</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(selectedQuestion.difficulty)}`}>{selectedQuestion.difficulty}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Question</h3>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedQuestion.question}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Options</h3>
                  <div className="space-y-2">
                    {selectedQuestion.options.map((option, idx) => (
                      <div key={idx} className={`p-3 rounded-lg ${option === selectedQuestion.correctAnswer ? "bg-green-100 border-2 border-green-500" : "bg-gray-50 border border-gray-200"}`}>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-700">{String.fromCharCode(65 + idx)}.</span>
                          <span className={option === selectedQuestion.correctAnswer ? "font-semibold text-green-800" : "text-gray-900"}>{option}</span>
                          {option === selectedQuestion.correctAnswer && <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Source</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getSourceColor(selectedQuestion.source)}`}>{selectedQuestion.source}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Status</h3>
                    {getStatusBadge(selectedQuestion.status)}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Submitted By</h3>
                    <p className="text-sm text-gray-900">{selectedQuestion.submittedBy}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Submitted At</h3>
                    <p className="text-sm text-gray-900">{new Date(selectedQuestion.submittedAt).toLocaleString()}</p>
                  </div>
                </div>
                {selectedQuestion.status === "pending" && (
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setShowViewModal(false); handleApprove(selectedQuestion.id); }} className="flex-1 px-6 py-3 bg-green-100 text-green-700 rounded-lg font-semibold hover:bg-green-200 transition-all flex items-center justify-center gap-2">
                      <ThumbsUp className="w-4 h-4" />Approve Question
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setShowViewModal(false); handleReject(selectedQuestion.id); }} className="px-6 py-3 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition-all flex items-center justify-center gap-2">
                      <ThumbsDown className="w-4 h-4" />Reject
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTimeSettingModal && selectedQuestion && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowTimeSettingModal(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Set Exam Time</h2>
                    <p className="text-sm text-gray-500 mt-1">Configure exam duration for this question</p>
                  </div>
                  <button onClick={() => setShowTimeSettingModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="p-4 sm:p-6 space-y-4">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{selectedQuestion.subject}</h3>
                      <p className="text-sm text-gray-600">{selectedQuestion.class} - {selectedQuestion.topic}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <input type="text" value={examSettings.subject} onChange={(e) => setExamSettings({ ...examSettings, subject: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Class</label>
                  <input type="text" value={examSettings.class} onChange={(e) => setExamSettings({ ...examSettings, class: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Timer className="w-4 h-4" />
                    Exam Duration (minutes)
                  </label>
                  <input type="number" min="5" max="180" value={examSettings.duration} onChange={(e) => setExamSettings({ ...examSettings, duration: parseInt(e.target.value) || 60 })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
                  <p className="text-xs text-gray-500 mt-1">Recommended: 60 minutes per question</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Summary</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Subject: <span className="font-semibold text-gray-900">{examSettings.subject}</span></p>
                    <p>Class: <span className="font-semibold text-gray-900">{examSettings.class}</span></p>
                    <p>Duration: <span className="font-semibold text-gray-900">{examSettings.duration} minutes</span></p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSaveExamSettings} className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <Save className="w-4 h-4" />Approve & Save
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowTimeSettingModal(false)} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all">
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRejectModal && selectedQuestion && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowRejectModal(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Reject Question</h2>
                    <p className="text-sm text-gray-500 mt-1">Provide a reason for rejecting this question</p>
                  </div>
                  <button onClick={() => setShowRejectModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="p-4 sm:p-6 space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{selectedQuestion.subject}</h3>
                      <p className="text-sm text-gray-600">{selectedQuestion.class} - {selectedQuestion.topic}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Reason for Rejection</label>
                  <textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="Explain why this question is being rejected..." rows={4} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm resize-none" />
                  <p className="text-xs text-gray-500 mt-1">This will help the submitter improve future questions</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleConfirmReject} disabled={!rejectReason.trim()} className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2">
                    <XCircle className="w-4 h-4" />Confirm Rejection
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowRejectModal(false)} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all">
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}