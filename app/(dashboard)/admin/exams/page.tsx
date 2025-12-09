"use client"

import { useState } from "react";
import {
  GraduationCap,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Clock,
  FileText,
  Calendar,
  BookOpen,
  AlertCircle,
  X,
  Save,
  Copy,
  BarChart3,
  Download,
  Play,
  Pause,
  StopCircle,
  CheckCircle,
  XCircle,
  Settings,
} from "lucide-react";

interface Exam {
  id: number;
  title: string;
  subject: string;
  class: string;
  term: string;
  session: string;
  duration: number;
  totalMarks: number;
  passMark: number;
  totalQuestions: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  status: "draft" | "scheduled" | "active" | "completed" | "cancelled";
  studentsEnrolled: number;
  studentsCompleted: number;
  instructions: string;
  createdBy: string;
  createdAt: string;
  allowReview: boolean;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  showResultsImmediately: boolean;
}

export default function ExamManagementPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterClass, setFilterClass] = useState("all");
  const [filterSubject, setFilterSubject] = useState("all");

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    class: "",
    term: "",
    session: "",
    duration: 60,
    totalMarks: 100,
    passMark: 50,
    totalQuestions: 50,
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    instructions: "",
    allowReview: true,
    shuffleQuestions: true,
    shuffleOptions: true,
    showResultsImmediately: false,
  });

  const exams: Exam[] = [
    {
      id: 1,
      title: "First Term Mathematics Examination",
      subject: "Mathematics",
      class: "SS3",
      term: "First Term",
      session: "2024/2025",
      duration: 90,
      totalMarks: 100,
      passMark: 50,
      totalQuestions: 50,
      startDate: "2025-12-15",
      endDate: "2025-12-15",
      startTime: "09:00",
      endTime: "12:00",
      status: "scheduled",
      studentsEnrolled: 45,
      studentsCompleted: 0,
      instructions: "Answer all questions. Use of calculator is allowed. Show all workings.",
      createdBy: "Mr. Johnson David",
      createdAt: "2025-12-01T10:30:00",
      allowReview: true,
      shuffleQuestions: true,
      shuffleOptions: true,
      showResultsImmediately: false,
    },
    {
      id: 2,
      title: "English Language First Term Exam",
      subject: "English Language",
      class: "SS2",
      term: "First Term",
      session: "2024/2025",
      duration: 120,
      totalMarks: 100,
      passMark: 50,
      totalQuestions: 60,
      startDate: "2025-12-10",
      endDate: "2025-12-10",
      startTime: "09:00",
      endTime: "13:00",
      status: "active",
      studentsEnrolled: 52,
      studentsCompleted: 38,
      instructions: "Read all passages carefully before answering. Answer all sections.",
      createdBy: "Mrs. Adebayo Grace",
      createdAt: "2025-11-25T14:20:00",
      allowReview: false,
      shuffleQuestions: true,
      shuffleOptions: true,
      showResultsImmediately: false,
    },
    {
      id: 3,
      title: "Physics Mid-Term Assessment",
      subject: "Physics",
      class: "SS1",
      term: "First Term",
      session: "2024/2025",
      duration: 60,
      totalMarks: 50,
      passMark: 25,
      totalQuestions: 40,
      startDate: "2025-11-20",
      endDate: "2025-11-20",
      startTime: "10:00",
      endTime: "14:00",
      status: "completed",
      studentsEnrolled: 48,
      studentsCompleted: 48,
      instructions: "This is a mid-term assessment covering topics 1-5.",
      createdBy: "Mr. Oladipo Samuel",
      createdAt: "2025-11-10T09:15:00",
      allowReview: true,
      shuffleQuestions: false,
      shuffleOptions: true,
      showResultsImmediately: true,
    },
    {
      id: 4,
      title: "Chemistry Practical Exam",
      subject: "Chemistry",
      class: "SS3",
      term: "First Term",
      session: "2024/2025",
      duration: 45,
      totalMarks: 40,
      passMark: 20,
      totalQuestions: 30,
      startDate: "2025-12-20",
      endDate: "2025-12-20",
      startTime: "13:00",
      endTime: "16:00",
      status: "draft",
      studentsEnrolled: 0,
      studentsCompleted: 0,
      instructions: "Draft exam - still being prepared.",
      createdBy: "Mrs. Adebayo Grace",
      createdAt: "2025-12-05T16:45:00",
      allowReview: true,
      shuffleQuestions: true,
      shuffleOptions: false,
      showResultsImmediately: false,
    },
  ];

  const stats = [
    {
      icon: FileText,
      label: "Total Exams",
      value: "24",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      icon: Play,
      label: "Active Exams",
      value: "3",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      icon: Calendar,
      label: "Scheduled",
      value: "8",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      icon: CheckCircle,
      label: "Completed",
      value: "13",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ];

  const classes = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];
  const subjects = [
    "Mathematics",
    "English Language",
    "Physics",
    "Chemistry",
    "Biology",
    "Economics",
    "Government",
    "Literature",
    "Further Mathematics",
    "Geography",
    "Civic Education",
    "Commerce",
    "Accounting",
  ];
  const terms = ["First Term", "Second Term", "Third Term"];
  const sessions = ["2023/2024", "2024/2025", "2025/2026"];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">Draft</span>;
      case "scheduled":
        return <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">Scheduled</span>;
      case "active":
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Active</span>;
      case "completed":
        return <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">Completed</span>;
      case "cancelled":
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Cancelled</span>;
      default:
        return null;
    }
  };

  const handleCreateExam = () => {
    console.log("Creating exam:", formData);
    alert("Exam created successfully!");
    setShowCreateModal(false);
    resetForm();
  };

  const handleEditExam = () => {
    console.log("Updating exam:", selectedExam?.id, formData);
    alert("Exam updated successfully!");
    setShowEditModal(false);
  };

  const handleDeleteExam = () => {
    console.log("Deleting exam:", selectedExam?.id);
    alert("Exam deleted successfully!");
    setShowDeleteModal(false);
  };

  const handleDuplicateExam = (exam: Exam) => {
    console.log("Duplicating exam:", exam.id);
    alert(`Exam "${exam.title}" duplicated successfully!`);
  };

  const handleChangeStatus = (exam: Exam, newStatus: string) => {
    console.log("Changing status:", exam.id, "to", newStatus);
    alert(`Exam status changed to ${newStatus}!`);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subject: "",
      class: "",
      term: "",
      session: "",
      duration: 60,
      totalMarks: 100,
      passMark: 50,
      totalQuestions: 50,
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      instructions: "",
      allowReview: true,
      shuffleQuestions: true,
      shuffleOptions: true,
      showResultsImmediately: false,
    });
  };

  const populateFormWithExam = (exam: Exam) => {
    setFormData({
      title: exam.title,
      subject: exam.subject,
      class: exam.class,
      term: exam.term,
      session: exam.session,
      duration: exam.duration,
      totalMarks: exam.totalMarks,
      passMark: exam.passMark,
      totalQuestions: exam.totalQuestions,
      startDate: exam.startDate,
      endDate: exam.endDate,
      startTime: exam.startTime,
      endTime: exam.endTime,
      instructions: exam.instructions,
      allowReview: exam.allowReview,
      shuffleQuestions: exam.shuffleQuestions,
      shuffleOptions: exam.shuffleOptions,
      showResultsImmediately: exam.showResultsImmediately,
    });
  };

  const filteredExams = exams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.class.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || exam.status === filterStatus;
    const matchesClass = filterClass === "all" || exam.class === filterClass;
    const matchesSubject = filterSubject === "all" || exam.subject === filterSubject;
    return matchesSearch && matchesStatus && matchesClass && matchesSubject;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Exam Management
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">
                  Create and manage CBT examinations
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Create Exam</span>
              <span className="sm:hidden">New</span>
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-3 border border-gray-200"
              >
                <div className={`w-8 h-8 rounded-lg ${stat.bgColor} flex items-center justify-center mb-2`}>
                  <stat.icon className={`w-4 h-4 ${stat.textColor}`} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="p-3 sm:p-6 space-y-4">
        <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-200 shadow-sm">
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by exam title, subject, or class..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
              >
                <option value="all">All Classes</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
              >
                <option value="all">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Apply</span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {filteredExams.length === 0 ? (
            <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No Exams Found</h3>
              <p className="text-sm text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create First Exam
              </button>
            </div>
          ) : (
            filteredExams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900">{exam.title}</h3>
                        {getStatusBadge(exam.status)}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {exam.subject}
                        </span>
                        <span>•</span>
                        <span>{exam.class}</span>
                        <span>•</span>
                        <span>{exam.term}</span>
                        <span>•</span>
                        <span>{exam.session}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Duration</p>
                        <p className="text-sm font-bold text-gray-900 flex items-center justify-center gap-1">
                          <Clock className="w-3 h-3" />
                          {exam.duration} min
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Questions</p>
                        <p className="text-sm font-bold text-gray-900">{exam.totalQuestions}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Total Marks</p>
                        <p className="text-sm font-bold text-gray-900">{exam.totalMarks}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Students</p>
                        <p className="text-sm font-bold text-gray-900">
                          {exam.studentsCompleted}/{exam.studentsEnrolled}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3 text-xs text-gray-700">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-3 h-3 text-blue-600" />
                      <span className="font-semibold">Schedule:</span>
                    </div>
                    <p>
                      {new Date(exam.startDate).toLocaleDateString()} at {exam.startTime} - {exam.endTime}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setSelectedExam(exam);
                        setShowViewModal(true);
                      }}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-200 flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      View
                    </button>
                    <button
                      onClick={() => {
                        setSelectedExam(exam);
                        populateFormWithExam(exam);
                        setShowEditModal(true);
                      }}
                      className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-200 flex items-center gap-1"
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDuplicateExam(exam)}
                      className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs font-semibold hover:bg-purple-200 flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      Duplicate
                    </button>
                    {exam.status === "completed" && (
                      <button
                        onClick={() => alert(`Viewing results for ${exam.title}`)}
                        className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-semibold hover:bg-green-200 flex items-center gap-1"
                      >
                        <BarChart3 className="w-3 h-3" />
                        Results
                      </button>
                    )}
                    {exam.status === "draft" && (
                      <button
                        onClick={() => handleChangeStatus(exam, "scheduled")}
                        className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-xs font-semibold hover:bg-orange-200 flex items-center gap-1"
                      >
                        <Play className="w-3 h-3" />
                        Schedule
                      </button>
                    )}
                    {exam.status === "active" && (
                      <button
                        onClick={() => handleChangeStatus(exam, "completed")}
                        className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-semibold hover:bg-yellow-200 flex items-center gap-1"
                      >
                        <StopCircle className="w-3 h-3" />
                        End
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSelectedExam(exam);
                        setShowDeleteModal(true);
                      }}
                      className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-semibold hover:bg-red-200 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Create/Edit Exam Modal */}
      {(showCreateModal || showEditModal) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setShowCreateModal(false);
            setShowEditModal(false);
            resetForm();
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {showCreateModal ? "Create New Exam" : "Edit Exam"}
                </h2>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Exam Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., First Term Mathematics Examination"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Class *</label>
                  <select
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
                  >
                    <option value="">Select Class</option>
                    {classes.map((cls) => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Term *</label>
                  <select
                    value={formData.term}
                    onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
                  >
                    <option value="">Select Term</option>
                    {terms.map((term) => (
                      <option key={term} value={term}>{term}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Session *</label>
                  <select
                    value={formData.session}
                    onChange={(e) => setFormData({ ...formData, session: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
                  >
                    <option value="">Select Session</option>
                    {sessions.map((session) => (
                      <option key={session} value={session}>{session}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Duration (minutes) *</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Total Questions *</label>
                  <input
                    type="number"
                    value={formData.totalQuestions}
                    onChange={(e) => setFormData({ ...formData, totalQuestions: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Total Marks *</label>
                  <input
                    type="number"
                    value={formData.totalMarks}
                    onChange={(e) => setFormData({ ...formData, totalMarks: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pass Mark *</label>
                  <input
                    type="number"
                    value={formData.passMark}
                    onChange={(e) => setFormData({ ...formData, passMark: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date *</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">End Date *</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Start Time *</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">End Time *</label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Instructions</label>
                  <textarea
                    value={formData.instructions}
                    onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                    placeholder="Enter exam instructions for students..."
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>

                <div className="sm:col-span-2 bg-gray-50 rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold text-gray-900 text-sm mb-3">Exam Settings</h3>
                  
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.allowReview}
                      onChange={(e) => setFormData({ ...formData, allowReview: e.target.checked })}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700">Allow Review</span>
                      <p className="text-xs text-gray-500">Students can review their answers before submission</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.shuffleQuestions}
                      onChange={(e) => setFormData({ ...formData, shuffleQuestions: e.target.checked })}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700">Shuffle Questions</span>
                      <p className="text-xs text-gray-500">Randomize question order for each student</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.shuffleOptions}
                      onChange={(e) => setFormData({ ...formData, shuffleOptions: e.target.checked })}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700">Shuffle Options</span>
                      <p className="text-xs text-gray-500">Randomize answer options for each question</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.showResultsImmediately}
                      onChange={(e) => setFormData({ ...formData, showResultsImmediately: e.target.checked })}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700">Show Results Immediately</span>
                      <p className="text-xs text-gray-500">Display results right after exam submission</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={showCreateModal ? handleCreateExam : handleEditExam}
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {showCreateModal ? "Create Exam" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Exam Modal */}
      {showViewModal && selectedExam && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowViewModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Exam Details</h2>
                  {getStatusBadge(selectedExam.status)}
                </div>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedExam.title}</h3>
                <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {selectedExam.subject}
                  </span>
                  <span>•</span>
                  <span>{selectedExam.class}</span>
                  <span>•</span>
                  <span>{selectedExam.term}</span>
                  <span>•</span>
                  <span>{selectedExam.session}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <p className="text-xs text-gray-600 font-medium">Duration</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{selectedExam.duration} min</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-green-600" />
                    <p className="text-xs text-gray-600 font-medium">Questions</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{selectedExam.totalQuestions}</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart3 className="w-4 h-4 text-purple-600" />
                    <p className="text-xs text-gray-600 font-medium">Total Marks</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{selectedExam.totalMarks}</p>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 font-medium mb-1">Pass Mark</p>
                  <p className="text-lg font-bold text-gray-900">{selectedExam.passMark}</p>
                </div>

                <div className="bg-indigo-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 font-medium mb-1">Enrolled</p>
                  <p className="text-lg font-bold text-gray-900">{selectedExam.studentsEnrolled}</p>
                </div>

                <div className="bg-teal-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 font-medium mb-1">Completed</p>
                  <p className="text-lg font-bold text-gray-900">{selectedExam.studentsCompleted}</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  <h4 className="font-semibold text-gray-900">Schedule</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Date:</span> {new Date(selectedExam.startDate).toLocaleDateString()}</p>
                  <p><span className="font-medium">Time:</span> {selectedExam.startTime} - {selectedExam.endTime}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Instructions</h4>
                <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-4">{selectedExam.instructions}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Exam Settings</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {selectedExam.allowReview ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className="text-sm text-gray-700">Allow Review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedExam.shuffleQuestions ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className="text-sm text-gray-700">Shuffle Questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedExam.shuffleOptions ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className="text-sm text-gray-700">Shuffle Options</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedExam.showResultsImmediately ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className="text-sm text-gray-700">Show Results Immediately</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 text-sm">
                <p className="text-gray-600"><span className="font-medium">Created by:</span> {selectedExam.createdBy}</p>
                <p className="text-gray-600"><span className="font-medium">Created at:</span> {new Date(selectedExam.createdAt).toLocaleString()}</p>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    populateFormWithExam(selectedExam);
                    setShowEditModal(true);
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Exam
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedExam && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
          >
            <div className="p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Delete Exam?</h3>
              <p className="text-sm text-gray-600 text-center mb-6">
                Are you sure you want to delete "{selectedExam.title}"? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteExam}
                  className="flex-1 px-6 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}