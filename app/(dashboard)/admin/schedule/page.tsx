"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  Clock,
  Plus,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  BookOpen,
  Users,
  AlertCircle,
  X,
  Save,
  Grid,
  List,
  Download,
  FileText,
  CheckCircle,
  XCircle,
  MapPin,
  Bell,
} from "lucide-react";

interface ScheduledExam {
  id: number;
  examId: number;
  title: string;
  subject: string;
  class: string;
  term: string;
  session: string;
  date: string; // yyyy-mm-dd
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  duration: number;
  venue: string;
  invigilator: string;
  studentsEnrolled: number;
  totalMarks: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  notificationSent: boolean;
}

export default function SchedulePage() {
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduledExam | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterClass, setFilterClass] = useState("all");
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [formData, setFormData] = useState({
    examId: "",
    title: "",
    subject: "",
    class: "",
    term: "",
    session: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    invigilator: "",
    studentsEnrolled: "0",
    totalMarks: "100",
    sendNotification: true,
  });

  // initial sample data
  const initialExams: ScheduledExam[] = [
    {
      id: 1,
      examId: 1,
      title: "First Term Mathematics Examination",
      subject: "Mathematics",
      class: "SS3",
      term: "First Term",
      session: "2024/2025",
      date: "2025-12-15",
      startTime: "09:00",
      endTime: "10:30",
      duration: 90,
      venue: "Computer Lab 1",
      invigilator: "Mr. Johnson David",
      studentsEnrolled: 45,
      totalMarks: 100,
      status: "upcoming",
      notificationSent: true,
    },
    {
      id: 2,
      examId: 2,
      title: "English Language First Term Exam",
      subject: "English Language",
      class: "SS2",
      term: "First Term",
      session: "2024/2025",
      date: "2025-12-10",
      startTime: "09:00",
      endTime: "11:00",
      duration: 120,
      venue: "Computer Lab 2",
      invigilator: "Mrs. Adebayo Grace",
      studentsEnrolled: 52,
      totalMarks: 100,
      status: "ongoing",
      notificationSent: true,
    },
    {
      id: 3,
      examId: 3,
      title: "Physics Mid-Term Assessment",
      subject: "Physics",
      class: "SS1",
      term: "First Term",
      session: "2024/2025",
      date: "2025-12-09",
      startTime: "10:00",
      endTime: "11:00",
      duration: 60,
      venue: "ICT Center",
      invigilator: "Mr. Oladipo Samuel",
      studentsEnrolled: 48,
      totalMarks: 50,
      status: "ongoing",
      notificationSent: true,
    },
    {
      id: 4,
      examId: 4,
      title: "Chemistry Practical Exam",
      subject: "Chemistry",
      class: "SS3",
      term: "First Term",
      session: "2024/2025",
      date: "2025-12-20",
      startTime: "13:00",
      endTime: "13:45",
      duration: 45,
      venue: "Computer Lab 1",
      invigilator: "Mrs. Adebayo Grace",
      studentsEnrolled: 40,
      totalMarks: 40,
      status: "upcoming",
      notificationSent: false,
    },
    {
      id: 5,
      examId: 5,
      title: "Biology First Term Exam",
      subject: "Biology",
      class: "SS2",
      term: "First Term",
      session: "2024/2025",
      date: "2025-12-12",
      startTime: "14:00",
      endTime: "15:30",
      duration: 90,
      venue: "Computer Lab 2",
      invigilator: "Mr. Johnson David",
      studentsEnrolled: 50,
      totalMarks: 100,
      status: "upcoming",
      notificationSent: true,
    },
    {
      id: 6,
      examId: 6,
      title: "Economics Theory Exam",
      subject: "Economics",
      class: "SS3",
      term: "First Term",
      session: "2024/2025",
      date: "2025-11-28",
      startTime: "09:00",
      endTime: "11:00",
      duration: 120,
      venue: "Computer Lab 1",
      invigilator: "Mrs. Okonkwo Rita",
      studentsEnrolled: 38,
      totalMarks: 100,
      status: "completed",
      notificationSent: true,
    },
  ];

  const [scheduledExams, setScheduledExams] = useState<ScheduledExam[]>(initialExams);

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
  ];
  const terms = ["First Term", "Second Term", "Third Term"];
  const sessions = ["2023/2024", "2024/2025", "2025/2026"];
  const venues = [
    "Computer Lab 1",
    "Computer Lab 2",
    "ICT Center",
    "Science Lab",
    "Library Hall",
  ];
  const invigilators = [
    "Mr. Johnson David",
    "Mrs. Adebayo Grace",
    "Mr. Oladipo Samuel",
    "Mrs. Okonkwo Rita",
    "Mr. Ibrahim Musa",
    "Mrs. Chukwu Blessing",
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Upcoming</span>;
      case "ongoing":
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Ongoing</span>;
      case "completed":
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">Completed</span>;
      case "cancelled":
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Cancelled</span>;
      default:
        return null;
    }
  };

  const stats = [
    {
      icon: Calendar,
      label: "Total Scheduled",
      value: scheduledExams.length.toString(),
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      icon: Clock,
      label: "Today's Exams",
      value: scheduledExams.filter(
        (e) =>
          e.date === new Date().toISOString().split("T")[0] &&
          e.status !== "completed"
      ).length.toString(),
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      icon: CheckCircle,
      label: "Upcoming",
      value: scheduledExams.filter((e) => e.status === "upcoming").length.toString(),
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      icon: Users,
      label: "Total Students",
      value: scheduledExams.reduce((sum, e) => sum + e.studentsEnrolled, 0).toString(),
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = useMemo(
    () => getDaysInMonth(currentDate),
    [currentDate]
  );

  const getExamsForDate = (day: number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return scheduledExams.filter((exam) => exam.date === dateStr);
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // -- CRUD handlers
  const handleScheduleExam = () => {
    // simple validation
    if (!formData.title || !formData.date || !formData.startTime || !formData.endTime || !formData.class) {
      alert("Please fill Title, Class, Date, Start time and End time.");
      return;
    }

    const newId = Math.max(0, ...scheduledExams.map((s) => s.id)) + 1;
    const duration = calculateDuration(formData.startTime, formData.endTime);
    const newExam: ScheduledExam = {
      id: newId,
      examId: newId,
      title: formData.title,
      subject: formData.subject || "General",
      class: formData.class,
      term: formData.term || "First Term",
      session: formData.session || sessions[0],
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      duration,
      venue: formData.venue || venues[0],
      invigilator: formData.invigilator || invigilators[0],
      studentsEnrolled: Number(formData.studentsEnrolled || "0"),
      totalMarks: Number(formData.totalMarks || "100"),
      status: determineStatus(formData.date),
      notificationSent: !!formData.sendNotification,
    };

    setScheduledExams((prev) => [newExam, ...prev]);
    setShowScheduleModal(false);
    resetForm();
    alert("Exam scheduled successfully!");
  };

  const handleEditSchedule = () => {
    if (!selectedSchedule) return;
    if (!formData.title || !formData.date || !formData.startTime || !formData.endTime || !formData.class) {
      alert("Please fill Title, Class, Date, Start time and End time.");
      return;
    }
    const duration = calculateDuration(formData.startTime, formData.endTime);
    setScheduledExams((prev) =>
      prev.map((s) =>
        s.id === selectedSchedule.id
          ? {
              ...s,
              title: formData.title,
              subject: formData.subject,
              class: formData.class,
              term: formData.term,
              session: formData.session,
              date: formData.date,
              startTime: formData.startTime,
              endTime: formData.endTime,
              duration,
              venue: formData.venue,
              invigilator: formData.invigilator,
              studentsEnrolled: Number(formData.studentsEnrolled),
              totalMarks: Number(formData.totalMarks),
              status: determineStatus(formData.date),
              // keep notificationSent state if sendNotification unchecked, leave as is
              notificationSent: s.notificationSent || !!formData.sendNotification,
            }
          : s
      )
    );
    setShowEditModal(false);
    setSelectedSchedule(null);
    alert("Schedule updated successfully!");
  };

  const handleDeleteSchedule = () => {
    if (!selectedSchedule) return;
    setScheduledExams((prev) => prev.filter((s) => s.id !== selectedSchedule.id));
    setShowDeleteModal(false);
    setSelectedSchedule(null);
    alert("Schedule deleted successfully!");
  };

  const handleSendNotification = (schedule: ScheduledExam) => {
    setScheduledExams((prev) =>
      prev.map((s) => (s.id === schedule.id ? { ...s, notificationSent: true } : s))
    );
    alert(`Notification sent to ${schedule.studentsEnrolled} students for "${schedule.title}"`);
  };

  const resetForm = () => {
    setFormData({
      examId: "",
      title: "",
      subject: "",
      class: "",
      term: "",
      session: "",
      date: "",
      startTime: "",
      endTime: "",
      venue: "",
      invigilator: "",
      studentsEnrolled: "0",
      totalMarks: "100",
      sendNotification: true,
    });
  };

  const populateFormWithSchedule = (schedule: ScheduledExam) => {
    setFormData({
      examId: schedule.examId.toString(),
      title: schedule.title,
      subject: schedule.subject,
      class: schedule.class,
      term: schedule.term,
      session: schedule.session,
      date: schedule.date,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      venue: schedule.venue,
      invigilator: schedule.invigilator,
      studentsEnrolled: schedule.studentsEnrolled.toString(),
      totalMarks: schedule.totalMarks.toString(),
      sendNotification: false,
    });
  };

  const filteredSchedules = scheduledExams.filter((schedule) => {
    const matchesSearch =
      schedule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.class.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = filterClass === "all" || schedule.class === filterClass;
    const matchesSubject = filterSubject === "all" || schedule.subject === filterSubject;
    const matchesStatus = filterStatus === "all" || schedule.status === filterStatus;
    return matchesSearch && matchesClass && matchesSubject && matchesStatus;
  });

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // helpers
  function calculateDuration(start: string, end: string) {
    // start and end are "HH:MM"
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const startM = sh * 60 + sm;
    const endM = eh * 60 + em;
    const diff = endM - startM;
    return diff > 0 ? diff : 0;
  }

  function determineStatus(dateStr: string): ScheduledExam["status"] {
    const todayStr = new Date().toISOString().split("T")[0];
    if (dateStr < todayStr) return "completed";
    if (dateStr === todayStr) return "ongoing";
    return "upcoming";
  }

  // export CSV (simple)
  const handleExport = () => {
    if (!scheduledExams.length) {
      alert("No schedules to export");
      return;
    }
    const header = [
      "ID",
      "Title",
      "Subject",
      "Class",
      "Term",
      "Session",
      "Date",
      "StartTime",
      "EndTime",
      "Duration",
      "Venue",
      "Invigilator",
      "StudentsEnrolled",
      "TotalMarks",
      "Status",
      "NotificationSent",
    ];
    const rows = scheduledExams.map((s) => [
      s.id,
      s.title,
      s.subject,
      s.class,
      s.term,
      s.session,
      s.date,
      s.startTime,
      s.endTime,
      s.duration,
      s.venue,
      s.invigilator,
      s.studentsEnrolled,
      s.totalMarks,
      s.status,
      s.notificationSent ? "Yes" : "No",
    ]);

    const csvContent =
      [header, ...rows]
        .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `exam-schedules-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // close modals on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowScheduleModal(false);
        setShowEditModal(false);
        setShowDeleteModal(false);
        setShowViewModal(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Exam Schedule
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">
                  Manage exam dates, times and venues
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowScheduleModal(true);
              }}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Schedule Exam</span>
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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("calendar")}
                className={`px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all ${
                  viewMode === "calendar"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Grid className="w-4 h-4" />
                Calendar
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all ${
                  viewMode === "list"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <List className="w-4 h-4" />
                List
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleExport} className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2 text-sm">
                <Download className="w-4 h-4" />
                Export Schedule
              </button>
            </div>
          </div>

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
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
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
              <button
                onClick={() => {
                  // just re-evaluates filters (they already apply instantly)
                  // kept for parity with sample UI
                  // Could show a toast in real app
                }}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Apply</span>
              </button>
            </div>
          </div>
        </div>

        {viewMode === "calendar" ? (
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToday}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200"
                >
                  Today
                </button>
                <button
                  onClick={handlePreviousMonth}
                  className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center font-semibold text-gray-700 text-xs sm:text-sm py-2">
                  {day}
                </div>
              ))}

              {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square"></div>
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const examsForDay = getExamsForDate(day);
                const today = new Date();
                const isToday =
                  day === today.getDate() &&
                  currentDate.getMonth() === today.getMonth() &&
                  currentDate.getFullYear() === today.getFullYear();

                return (
                  <div
                    key={day}
                    className={`aspect-square border rounded-lg p-1 sm:p-2 cursor-pointer hover:bg-gray-50 transition-all ${
                      isToday ? "border-indigo-600 bg-indigo-50" : "border-gray-200"
                    }`}
                    onClick={() => {
                      const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                      setSelectedDate(selected);
                    }}
                  >
                    <div className={`text-xs sm:text-sm font-semibold mb-1 ${isToday ? "text-indigo-600" : "text-gray-900"}`}>
                      {day}
                    </div>
                    <div className="space-y-1">
                      {examsForDay.slice(0, 2).map((exam) => (
                        <div
                          key={exam.id}
                          className={`text-[10px] p-1 rounded truncate ${
                            exam.status === "ongoing"
                              ? "bg-green-100 text-green-700"
                              : exam.status === "upcoming"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                          title={exam.title}
                        >
                          {exam.class} {exam.subject}
                        </div>
                      ))}
                      {examsForDay.length > 2 && (
                        <div className="text-[10px] text-gray-500 font-semibold">
                          +{examsForDay.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedDate && (
              <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900">
                    Exams on {selectedDate.toLocaleDateString()}
                  </h3>
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="p-1 hover:bg-white rounded"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                <div className="space-y-2">
                  {getExamsForDate(selectedDate.getDate()).map((exam) => (
                    <div
                      key={exam.id}
                      className="bg-white p-3 rounded-lg flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900 text-sm">{exam.title}</h4>
                          {getStatusBadge(exam.status)}
                        </div>
                        <p className="text-xs text-gray-600">
                          {exam.startTime} - {exam.endTime} • {exam.venue}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedSchedule(exam);
                            populateFormWithSchedule(exam);
                            setShowViewModal(true);
                          }}
                          className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold hover:bg-indigo-200"
                        >
                          View
                        </button>
                        <button
                          onClick={() => {
                            setSelectedSchedule(exam);
                            populateFormWithSchedule(exam);
                            setShowEditModal(true);
                          }}
                          className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-semibold hover:bg-yellow-200"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedSchedule(exam);
                            setShowDeleteModal(true);
                          }}
                          className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-semibold hover:bg-red-200"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {getExamsForDate(selectedDate.getDate()).length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">No exams scheduled for this date</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSchedules.length === 0 ? (
              <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">No Schedules Found</h3>
                <p className="text-sm text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    resetForm();
                    setShowScheduleModal(true);
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Schedule First Exam
                </button>
              </div>
            ) : (
              filteredSchedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-base sm:text-lg font-bold text-gray-900">{schedule.title}</h3>
                          {getStatusBadge(schedule.status)}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            {schedule.subject}
                          </span>
                          <span>•</span>
                          <span>{schedule.class}</span>
                          <span>•</span>
                          <span>{schedule.term}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedSchedule(schedule);
                            populateFormWithSchedule(schedule);
                            setShowViewModal(true);
                          }}
                          className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold hover:bg-indigo-200"
                        >
                          <Eye className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedSchedule(schedule);
                            populateFormWithSchedule(schedule);
                            setShowEditModal(true);
                          }}
                          className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-semibold hover:bg-yellow-200"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedSchedule(schedule);
                            setShowDeleteModal(true);
                          }}
                          className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-semibold hover:bg-red-200"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-indigo-600" />
                          <span className="text-xs font-semibold text-gray-700">Date & Time</span>
                        </div>
                        <p className="text-sm font-bold text-gray-900">{new Date(schedule.date).toLocaleDateString()}</p>
                        <p className="text-xs text-gray-600">{schedule.startTime} - {schedule.endTime}</p>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-purple-600" />
                          <span className="text-xs font-semibold text-gray-700">Venue & Invigilator</span>
                        </div>
                        <p className="text-sm font-bold text-gray-900">{schedule.venue}</p>
                        <p className="text-xs text-gray-600">{schedule.invigilator}</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-600">Students Enrolled</p>
                          <p className="text-sm font-bold text-gray-900">{schedule.studentsEnrolled}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Total Marks</p>
                          <p className="text-sm font-bold text-gray-900">{schedule.totalMarks}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <button
                            onClick={() => handleSendNotification(schedule)}
                            className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700"
                          >
                            <Bell className="w-3 h-3 inline mr-1" />
                            Notify
                          </button>
                          <div className="text-xs text-gray-500 mt-1">
                            {schedule.notificationSent ? "Notified" : "Not notified"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* Create Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowScheduleModal(false)}></div>
          <div className="relative w-full max-w-2xl bg-white rounded-xl p-4 shadow-lg z-10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Schedule Exam</h3>
              <button onClick={() => setShowScheduleModal(false)} className="p-1"><X /></button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Exam Title" className="px-3 py-2 border rounded" />
                <select value={formData.class} onChange={(e) => setFormData({...formData, class: e.target.value})} className="px-3 py-2 border rounded">
                  <option value="">Select Class</option>
                  {classes.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="px-3 py-2 border rounded">
                  <option value="">Select Subject</option>
                  {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <select value={formData.term} onChange={(e) => setFormData({...formData, term: e.target.value})} className="px-3 py-2 border rounded">
                  <option value="">Select Term</option>
                  {terms.map(t => <option key={t} value={t}>{t}</option>)}
                </select>

                <select value={formData.session} onChange={(e) => setFormData({...formData, session: e.target.value})} className="px-3 py-2 border rounded">
                  <option value="">Select Session</option>
                  {sessions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>

                <select value={formData.venue} onChange={(e) => setFormData({...formData, venue: e.target.value})} className="px-3 py-2 border rounded">
                  <option value="">Select Venue</option>
                  {venues.map(v => <option key={v} value={v}>{v}</option>)}
                </select>

                <select value={formData.invigilator} onChange={(e) => setFormData({...formData, invigilator: e.target.value})} className="px-3 py-2 border rounded">
                  <option value="">Select Invigilator</option>
                  {invigilators.map(i => <option key={i} value={i}>{i}</option>)}
                </select>

                <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="px-3 py-2 border rounded" />
                <input type="time" value={formData.startTime} onChange={(e) => setFormData({...formData, startTime: e.target.value})} className="px-3 py-2 border rounded" />
                <input type="time" value={formData.endTime} onChange={(e) => setFormData({...formData, endTime: e.target.value})} className="px-3 py-2 border rounded" />

                <input type="number" min={0} value={formData.studentsEnrolled} onChange={(e) => setFormData({...formData, studentsEnrolled: e.target.value})} placeholder="Students Enrolled" className="px-3 py-2 border rounded" />
                <input type="number" min={0} value={formData.totalMarks} onChange={(e) => setFormData({...formData, totalMarks: e.target.value})} placeholder="Total Marks" className="px-3 py-2 border rounded" />
              </div>

              <div className="flex items-center gap-2">
                <input id="sendNotify" type="checkbox" checked={formData.sendNotification} onChange={(e) => setFormData({...formData, sendNotification: e.target.checked})} />
                <label htmlFor="sendNotify" className="text-sm text-gray-600">Send notification to students</label>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button onClick={() => setShowScheduleModal(false)} className="px-4 py-2 bg-gray-100 rounded">Cancel</button>
                <button onClick={handleScheduleExam} className="px-4 py-2 bg-indigo-600 text-white rounded flex items-center gap-2"><Save className="w-4 h-4" /> Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedSchedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => { setShowViewModal(false); setSelectedSchedule(null); }}></div>
          <div className="relative w-full max-w-xl bg-white rounded-xl p-4 shadow-lg z-10">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold">{selectedSchedule.title}</h3>
                <p className="text-xs text-gray-500">{selectedSchedule.subject} • {selectedSchedule.class} • {selectedSchedule.term}</p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(selectedSchedule.status)}
                <button onClick={() => { setShowViewModal(false); setSelectedSchedule(null); }} className="p-1"><X /></button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded p-3">
                <p className="text-xs text-gray-600">Date</p>
                <p className="font-bold">{new Date(selectedSchedule.date).toLocaleDateString()}</p>

                <p className="text-xs text-gray-600 mt-2">Time</p>
                <p>{selectedSchedule.startTime} - {selectedSchedule.endTime} ({selectedSchedule.duration} mins)</p>

                <p className="text-xs text-gray-600 mt-2">Venue</p>
                <p className="font-bold">{selectedSchedule.venue}</p>
              </div>

              <div className="bg-gray-50 rounded p-3">
                <p className="text-xs text-gray-600">Invigilator</p>
                <p className="font-bold">{selectedSchedule.invigilator}</p>

                <p className="text-xs text-gray-600 mt-2">Students Enrolled</p>
                <p className="font-bold">{selectedSchedule.studentsEnrolled}</p>

                <p className="text-xs text-gray-600 mt-2">Total Marks</p>
                <p className="font-bold">{selectedSchedule.totalMarks}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-4">
              <button onClick={() => {
                populateFormWithSchedule(selectedSchedule);
                setShowViewModal(false);
                setShowEditModal(true);
              }} className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded">Edit</button>
              <button onClick={() => { setShowViewModal(false); setSelectedSchedule(null); }} className="px-4 py-2 bg-gray-100 rounded">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedSchedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => { setShowEditModal(false); setSelectedSchedule(null); }}></div>
          <div className="relative w-full max-w-2xl bg-white rounded-xl p-4 shadow-lg z-10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Edit Schedule</h3>
              <button onClick={() => { setShowEditModal(false); setSelectedSchedule(null); }} className="p-1"><X /></button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Exam Title" className="px-3 py-2 border rounded" />
                <select value={formData.class} onChange={(e) => setFormData({...formData, class: e.target.value})} className="px-3 py-2 border rounded">
                  <option value="">Select Class</option>
                  {classes.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="px-3 py-2 border rounded">
                  <option value="">Select Subject</option>
                  {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <select value={formData.term} onChange={(e) => setFormData({...formData, term: e.target.value})} className="px-3 py-2 border rounded">
                  <option value="">Select Term</option>
                  {terms.map(t => <option key={t} value={t}>{t}</option>)}
                </select>

                <select value={formData.session} onChange={(e) => setFormData({...formData, session: e.target.value})} className="px-3 py-2 border rounded">
                  <option value="">Select Session</option>
                  {sessions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>

                <select value={formData.venue} onChange={(e) => setFormData({...formData, venue: e.target.value})} className="px-3 py-2 border rounded">
                  <option value="">Select Venue</option>
                  {venues.map(v => <option key={v} value={v}>{v}</option>)}
                </select>

                <select value={formData.invigilator} onChange={(e) => setFormData({...formData, invigilator: e.target.value})} className="px-3 py-2 border rounded">
                  <option value="">Select Invigilator</option>
                  {invigilators.map(i => <option key={i} value={i}>{i}</option>)}
                </select>

                <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="px-3 py-2 border rounded" />
                <input type="time" value={formData.startTime} onChange={(e) => setFormData({...formData, startTime: e.target.value})} className="px-3 py-2 border rounded" />
                <input type="time" value={formData.endTime} onChange={(e) => setFormData({...formData, endTime: e.target.value})} className="px-3 py-2 border rounded" />

                <input type="number" min={0} value={formData.studentsEnrolled} onChange={(e) => setFormData({...formData, studentsEnrolled: e.target.value})} placeholder="Students Enrolled" className="px-3 py-2 border rounded" />
                <input type="number" min={0} value={formData.totalMarks} onChange={(e) => setFormData({...formData, totalMarks: e.target.value})} placeholder="Total Marks" className="px-3 py-2 border rounded" />
              </div>

              <div className="flex items-center gap-2">
                <input id="sendNotifyEdit" type="checkbox" checked={formData.sendNotification} onChange={(e) => setFormData({...formData, sendNotification: e.target.checked})} />
                <label htmlFor="sendNotifyEdit" className="text-sm text-gray-600">Send notification to students</label>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button onClick={() => { setShowEditModal(false); setSelectedSchedule(null); }} className="px-4 py-2 bg-gray-100 rounded">Cancel</button>
                <button onClick={handleEditSchedule} className="px-4 py-2 bg-indigo-600 text-white rounded flex items-center gap-2"><Save className="w-4 h-4" /> Update</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedSchedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => { setShowDeleteModal(false); setSelectedSchedule(null); }}></div>
          <div className="relative w-full max-w-md bg-white rounded-xl p-4 shadow-lg z-10">
            <div className="flex items-center gap-3">
              <XCircle className="w-8 h-8 text-red-600" />
              <div>
                <h3 className="font-semibold">Delete Schedule</h3>
                <p className="text-sm text-gray-600">Are you sure you want to delete <strong>{selectedSchedule.title}</strong> scheduled on {new Date(selectedSchedule.date).toLocaleDateString()}?</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-4">
              <button onClick={() => { setShowDeleteModal(false); setSelectedSchedule(null); }} className="px-4 py-2 bg-gray-100 rounded">Cancel</button>
              <button onClick={handleDeleteSchedule} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
