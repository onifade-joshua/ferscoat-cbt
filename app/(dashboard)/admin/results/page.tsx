"use client"

import { useState } from "react";
import {
  GraduationCap,
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  Search,
  Filter,
  Download,
  User,
  AlertCircle,
  TrendingUp,
  FileText,
  Award,
  ThumbsUp,
  ThumbsDown,
  X,
  Calendar,
  BookOpen,
  BarChart3,
  Mail,
  Send,
} from "lucide-react";

interface StudentResult {
  id: number;
  studentName: string;
  studentId: string;
  email: string;
  class: string;
  term: string;
  session: string;
  subjects: SubjectScore[];
  totalScore: number;
  averageScore: number;
  position: number;
  grade: string;
  remarks: string;
  status: "pending" | "approved" | "rejected";
  submittedBy: string;
  submittedAt: string;
  teacherComment?: string;
  principalComment?: string;
}

interface SubjectScore {
  subject: string;
  ca1: number;
  ca2: number;
  exam: number;
  total: number;
  grade: string;
  remark: string;
}

export default function ResultApprovalPage() {
  const [showViewModal, setShowViewModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState<StudentResult | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("pending");
  const [filterClass, setFilterClass] = useState("all");
  const [filterTerm, setFilterTerm] = useState("all");
  const [rejectReason, setRejectReason] = useState("");
  const [principalComment, setPrincipalComment] = useState("");

  const results: StudentResult[] = [
    {
      id: 1,
      studentName: "Adeyemi Oluwaseun",
      studentId: "STD001",
      email: "adeyemi.o@school.edu",
      class: "SS3",
      term: "First Term",
      session: "2024/2025",
      subjects: [
        { subject: "Mathematics", ca1: 18, ca2: 20, exam: 55, total: 93, grade: "A1", remark: "Excellent" },
        { subject: "English Language", ca1: 17, ca2: 19, exam: 52, total: 88, grade: "A1", remark: "Excellent" },
        { subject: "Physics", ca1: 16, ca2: 18, exam: 50, total: 84, grade: "A1", remark: "Excellent" },
        { subject: "Chemistry", ca1: 15, ca2: 17, exam: 48, total: 80, grade: "A1", remark: "Very Good" },
        { subject: "Biology", ca1: 17, ca2: 19, exam: 51, total: 87, grade: "A1", remark: "Excellent" },
      ],
      totalScore: 432,
      averageScore: 86.4,
      position: 1,
      grade: "A1",
      remarks: "Outstanding performance",
      status: "pending",
      submittedBy: "Mr. Johnson David",
      submittedAt: "2025-12-07T10:30:00",
      teacherComment: "Oluwaseun has shown exceptional dedication and understanding across all subjects.",
    },
    {
      id: 2,
      studentName: "Okonkwo Chidinma",
      studentId: "STD002",
      email: "okonkwo.c@school.edu",
      class: "SS2",
      term: "First Term",
      session: "2024/2025",
      subjects: [
        { subject: "Mathematics", ca1: 15, ca2: 16, exam: 45, total: 76, grade: "B2", remark: "Very Good" },
        { subject: "English Language", ca1: 16, ca2: 17, exam: 47, total: 80, grade: "A1", remark: "Very Good" },
        { subject: "Economics", ca1: 14, ca2: 15, exam: 43, total: 72, grade: "B2", remark: "Good" },
        { subject: "Government", ca1: 15, ca2: 16, exam: 46, total: 77, grade: "B2", remark: "Very Good" },
        { subject: "Literature", ca1: 16, ca2: 17, exam: 48, total: 81, grade: "A1", remark: "Very Good" },
      ],
      totalScore: 386,
      averageScore: 77.2,
      position: 5,
      grade: "B2",
      remarks: "Good performance, can do better",
      status: "pending",
      submittedBy: "Mrs. Adebayo Grace",
      submittedAt: "2025-12-07T09:15:00",
      teacherComment: "Chidinma is a diligent student who shows consistent improvement.",
    },
    {
      id: 3,
      studentName: "Ibrahim Musa",
      studentId: "STD003",
      email: "ibrahim.m@school.edu",
      class: "SS1",
      term: "First Term",
      session: "2024/2025",
      subjects: [
        { subject: "Mathematics", ca1: 12, ca2: 13, exam: 38, total: 63, grade: "C4", remark: "Credit" },
        { subject: "English Language", ca1: 13, ca2: 14, exam: 40, total: 67, grade: "C4", remark: "Credit" },
        { subject: "Physics", ca1: 11, ca2: 12, exam: 35, total: 58, grade: "C5", remark: "Credit" },
        { subject: "Chemistry", ca1: 12, ca2: 13, exam: 37, total: 62, grade: "C4", remark: "Credit" },
        { subject: "Biology", ca1: 13, ca2: 14, exam: 39, total: 66, grade: "C4", remark: "Credit" },
      ],
      totalScore: 316,
      averageScore: 63.2,
      position: 15,
      grade: "C4",
      remarks: "Needs improvement",
      status: "pending",
      submittedBy: "Mr. Oladipo Samuel",
      submittedAt: "2025-12-07T08:45:00",
      teacherComment: "Musa needs to put in more effort, especially in sciences.",
    },
    {
      id: 4,
      studentName: "Eze Chiamaka",
      studentId: "STD004",
      email: "eze.c@school.edu",
      class: "SS3",
      term: "First Term",
      session: "2024/2025",
      subjects: [
        { subject: "Mathematics", ca1: 17, ca2: 19, exam: 53, total: 89, grade: "A1", remark: "Excellent" },
        { subject: "English Language", ca1: 16, ca2: 18, exam: 51, total: 85, grade: "A1", remark: "Excellent" },
        { subject: "Physics", ca1: 15, ca2: 17, exam: 49, total: 81, grade: "A1", remark: "Very Good" },
        { subject: "Chemistry", ca1: 16, ca2: 18, exam: 50, total: 84, grade: "A1", remark: "Excellent" },
        { subject: "Further Maths", ca1: 17, ca2: 19, exam: 52, total: 88, grade: "A1", remark: "Excellent" },
      ],
      totalScore: 427,
      averageScore: 85.4,
      position: 2,
      grade: "A1",
      remarks: "Excellent performance",
      status: "approved",
      submittedBy: "Mr. Johnson David",
      submittedAt: "2025-12-06T14:20:00",
      teacherComment: "Chiamaka consistently demonstrates high academic standards.",
      principalComment: "Keep up the excellent work!",
    },
    {
      id: 5,
      studentName: "Bello Fatima",
      studentId: "STD005",
      email: "bello.f@school.edu",
      class: "SS2",
      term: "First Term",
      session: "2024/2025",
      subjects: [
        { subject: "Mathematics", ca1: 10, ca2: 11, exam: 32, total: 53, grade: "C6", remark: "Credit" },
        { subject: "English Language", ca1: 11, ca2: 12, exam: 34, total: 57, grade: "C5", remark: "Credit" },
        { subject: "Economics", ca1: 9, ca2: 10, exam: 30, total: 49, grade: "D7", remark: "Pass" },
        { subject: "Commerce", ca1: 10, ca2: 11, exam: 33, total: 54, grade: "C6", remark: "Credit" },
        { subject: "Accounting", ca1: 11, ca2: 12, exam: 35, total: 58, grade: "C5", remark: "Credit" },
      ],
      totalScore: 271,
      averageScore: 54.2,
      position: 28,
      grade: "C6",
      remarks: "Poor performance, needs serious improvement",
      status: "rejected",
      submittedBy: "Mrs. Adebayo Grace",
      submittedAt: "2025-12-05T11:10:00",
      teacherComment: "Fatima needs extra support and must attend remedial classes.",
    },
  ];

  const stats = [
    {
      icon: FileText,
      label: "Pending Review",
      value: "18",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      icon: CheckCircle,
      label: "Approved",
      value: "142",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      icon: XCircle,
      label: "Rejected",
      value: "8",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
    },
    {
      icon: Award,
      label: "Avg. Score",
      value: "73.2%",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
  ];

  const getGradeColor = (grade: string) => {
    if (grade.includes("A")) return "bg-green-100 text-green-700 border-green-200";
    if (grade.includes("B")) return "bg-blue-100 text-blue-700 border-blue-200";
    if (grade.includes("C")) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    if (grade.includes("D")) return "bg-orange-100 text-orange-700 border-orange-200";
    return "bg-red-100 text-red-700 border-red-200";
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

  const handleViewResult = (result: StudentResult) => {
    setSelectedResult(result);
    setShowViewModal(true);
  };

  const handleApprove = (result: StudentResult) => {
    setSelectedResult(result);
    setPrincipalComment("");
    setShowApproveModal(true);
  };

  const handleReject = (result: StudentResult) => {
    setSelectedResult(result);
    setRejectReason("");
    setShowRejectModal(true);
  };

  const handleConfirmApprove = () => {
    console.log("Approving result:", selectedResult?.id, "Comment:", principalComment);
    alert("Result approved successfully! Notification sent to student.");
    setShowApproveModal(false);
  };

  const handleConfirmReject = () => {
    console.log("Rejecting result:", selectedResult?.id, "Reason:", rejectReason);
    alert("Result rejected! Teacher will be notified to make corrections.");
    setShowRejectModal(false);
  };

  const filteredResults = results.filter((result) => {
    const matchesSearch =
      result.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.class.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || result.status === filterStatus;
    const matchesClass = filterClass === "all" || result.class === filterClass;
    const matchesTerm = filterTerm === "all" || result.term === filterTerm;
    return matchesSearch && matchesStatus && matchesClass && matchesTerm;
  });

  const classes = ["PRY1", "PRY2", "PRY3", "PRY4", "PRY5", "PRY6", "JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];
  const terms = ["First Term", "Second Term", "Third Term"];

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
                  Result Approval
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">
                  Review and approve student results
                </p>
              </div>
            </div>
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm">
              <Download className="w-4 h-4" />
              Export Report
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
                placeholder="Search by student name, ID, or class..."
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
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
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
                value={filterTerm}
                onChange={(e) => setFilterTerm(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
              >
                <option value="all">All Terms</option>
                {terms.map((term) => (
                  <option key={term} value={term}>{term}</option>
                ))}
              </select>
              <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {filteredResults.length === 0 ? (
            <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No Results Found</h3>
              <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredResults.map((result) => (
              <div
                key={result.id}
                className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900">{result.studentName}</h3>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                          {result.studentId}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getGradeColor(result.grade)}`}>
                          Grade: {result.grade}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {result.class}
                        </span>
                        <span>•</span>
                        <span>{result.term}</span>
                        <span>•</span>
                        <span>{result.session}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          Position: {result.position}
                        </span>
                      </div>
                    </div>
                    {getStatusBadge(result.status)}
                  </div>

                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Total Score</p>
                        <p className="text-lg font-bold text-gray-900">{result.totalScore}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Average</p>
                        <p className="text-lg font-bold text-gray-900">{result.averageScore}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Subjects</p>
                        <p className="text-lg font-bold text-gray-900">{result.subjects.length}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Position</p>
                        <p className="text-lg font-bold text-gray-900">{result.position}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleViewResult(result)}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-200 flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      View Details
                    </button>
                    {result.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleApprove(result)}
                          className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-semibold hover:bg-green-200 flex items-center gap-1"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(result)}
                          className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-semibold hover:bg-red-200 flex items-center gap-1"
                        >
                          <ThumbsDown className="w-3 h-3" />
                          Reject
                        </button>
                      </>
                    )}
                    {result.status === "approved" && (
                      <button
                        onClick={() => alert("Sending result to " + result.email)}
                        className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-200 flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        Send to Student
                      </button>
                    )}
                  </div>

                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <User className="w-3 h-3" />
                    Submitted by: {result.submittedBy} • {new Date(result.submittedAt).toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {showViewModal && selectedResult && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowViewModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Student Result Details</h2>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{selectedResult.studentName}</h3>
                    <div className="flex flex-wrap gap-2 mt-1 text-sm text-gray-600">
                      <span>{selectedResult.studentId}</span>
                      <span>•</span>
                      <span>{selectedResult.class}</span>
                      <span>•</span>
                      <span>{selectedResult.email}</span>
                    </div>
                  </div>
                  {getStatusBadge(selectedResult.status)}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Total Score</p>
                  <p className="text-xl font-bold text-gray-900">{selectedResult.totalScore}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Average</p>
                  <p className="text-xl font-bold text-gray-900">{selectedResult.averageScore}%</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Position</p>
                  <p className="text-xl font-bold text-gray-900">{selectedResult.position}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Grade</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold border ${getGradeColor(selectedResult.grade)}`}>
                    {selectedResult.grade}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Subject Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">Subject</th>
                        <th className="px-3 py-2 text-center font-semibold text-gray-700">CA1</th>
                        <th className="px-3 py-2 text-center font-semibold text-gray-700">CA2</th>
                        <th className="px-3 py-2 text-center font-semibold text-gray-700">Exam</th>
                        <th className="px-3 py-2 text-center font-semibold text-gray-700">Total</th>
                        <th className="px-3 py-2 text-center font-semibold text-gray-700">Grade</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">Remark</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedResult.subjects.map((subject, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-3 py-2 font-medium text-gray-900">{subject.subject}</td>
                          <td className="px-3 py-2 text-center text-gray-700">{subject.ca1}</td>
                          <td className="px-3 py-2 text-center text-gray-700">{subject.ca2}</td>
                          <td className="px-3 py-2 text-center text-gray-700">{subject.exam}</td>
                          <td className="px-3 py-2 text-center font-bold text-gray-900">{subject.total}</td>
                          <td className="px-3 py-2 text-center">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${getGradeColor(subject.grade)}`}>
                              {subject.grade}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-gray-600">{subject.remark}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {selectedResult.teacherComment && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Teacher's Comment
                  </h3>
                  <p className="text-sm text-gray-700">{selectedResult.teacherComment}</p>
                </div>
              )}

              {selectedResult.principalComment && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Principal's Comment
                  </h3>
                  <p className="text-sm text-gray-700">{selectedResult.principalComment}</p>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Term</p>
                    <p className="font-semibold text-gray-900">{selectedResult.term}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Session</p>
                    <p className="font-semibold text-gray-900">{selectedResult.session}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Submitted By</p>
                    <p className="font-semibold text-gray-900">{selectedResult.submittedBy}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Submitted At</p>
                    <p className="font-semibold text-gray-900">{new Date(selectedResult.submittedAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {selectedResult.status === "pending" && (
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      handleApprove(selectedResult);
                    }}
                    className="flex-1 px-6 py-3 bg-green-100 text-green-700 rounded-lg font-semibold hover:bg-green-200 transition-all flex items-center justify-center gap-2"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    Approve Result
                  </button>
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      handleReject(selectedResult);
                    }}
                    className="px-6 py-3 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition-all flex items-center justify-center gap-2"
                  >
                    <ThumbsDown className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showApproveModal && selectedResult && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowApproveModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg"
          >
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Approve Result</h2>
                  <p className="text-sm text-gray-500 mt-1">Add principal's comment and approve</p>
                </div>
                <button
                  onClick={() => setShowApproveModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{selectedResult.studentName}</h3>
                    <p className="text-sm text-gray-600">{selectedResult.class} - Average: {selectedResult.averageScore}%</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Principal's Comment</label>
                <textarea
                  value={principalComment}
                  onChange={(e) => setPrincipalComment(e.target.value)}
                  placeholder="Enter your comment for the student..."
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">This comment will appear on the student's report card</p>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-700 flex items-start gap-2">
                  <Mail className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  Upon approval, the student will receive an email notification with their result at {selectedResult.email}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleConfirmApprove}
                  disabled={!principalComment.trim()}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve & Send
                </button>
                <button
                  onClick={() => setShowApproveModal(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showRejectModal && selectedResult && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowRejectModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg"
          >
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Reject Result</h2>
                  <p className="text-sm text-gray-500 mt-1">Provide a reason for rejection</p>
                </div>
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
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
                    <h3 className="font-semibold text-gray-900">{selectedResult.studentName}</h3>
                    <p className="text-sm text-gray-600">{selectedResult.class} - Submitted by {selectedResult.submittedBy}</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Reason for Rejection</label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Explain why this result is being rejected (e.g., incorrect scores, missing subjects, calculation errors)..."
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">The teacher will be notified to make necessary corrections</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleConfirmReject}
                  disabled={!rejectReason.trim()}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Confirm Rejection
                </button>
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}