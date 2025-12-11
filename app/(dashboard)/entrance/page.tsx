'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
  Users,
  CheckCircle,
  Download,
  Send,
  Printer,
  X,
  FileText,
  MapPin,
  Mail,
  Phone,
  Target,
  BookOpen,
  AlertCircle
} from 'lucide-react';

// ===== TYPE DEFINITIONS =====

interface EntranceExam {
  id: number;
  title: string;
  academicYear: string;
  examDate: string;
  examTime: string;
  duration: number;
  totalQuestions: number;
  passingScore: number;
  venue: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  registeredStudents: number;
  completedStudents: number;
  subjects: string[];
  classLevel: string;
}

interface Applicant {
  id: number;
  name: string;
  email: string;
  phone: string;
  appliedFor: string;
  registrationDate: string;
  examStatus: 'pending' | 'completed' | 'passed' | 'failed';
  score?: number;
  applicationNumber: string;
  dateOfBirth?: string;
  parentName?: string;
  parentPhone?: string;
  address?: string;
}

interface FormData {
  title: string;
  classLevel: string;
  academicYear: string;
  examDate: string;
  examTime: string;
  duration: string;
  totalQuestions: string;
  passingScore: string;
  venue: string;
  subjects: string[];
}

// ===== COMPONENT =====

export default function EntranceExamPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showApplicantDetails, setShowApplicantDetails] = useState<boolean>(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [examToDelete, setExamToDelete] = useState<number | null>(null);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    classLevel: '',
    academicYear: '2025/2026',
    examDate: '',
    examTime: '',
    duration: '120',
    totalQuestions: '100',
    passingScore: '50',
    venue: '',
    subjects: []
  });

  // Available subjects
  const availableSubjects = [
    'Mathematics',
    'English Language',
    'General Knowledge',
    'Science',
    'Reasoning',
    'Verbal Aptitude',
    'Quantitative Aptitude',
    'Basic Technology',
    'Social Studies'
  ];

  // Class levels
  const classLevels = [
    'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6',
    'JSS 1', 'JSS 2', 'JSS 3',
    'SS 1 (Science)', 'SS 1 (Arts)', 'SS 1 (Commercial)',
    'SS 2 (Science)', 'SS 2 (Arts)', 'SS 2 (Commercial)',
    'SS 3 (Science)', 'SS 3 (Arts)', 'SS 3 (Commercial)'
  ];

  // Entrance Exams Data
  const [entranceExams, setEntranceExams] = useState<EntranceExam[]>([
    {
      id: 1,
      title: 'JSS 1 Entrance Examination 2025/2026',
      classLevel: 'JSS 1',
      academicYear: '2025/2026',
      examDate: '2025-12-20',
      examTime: '09:00 AM',
      duration: 120,
      totalQuestions: 100,
      passingScore: 50,
      venue: 'Main Hall A',
      status: 'upcoming',
      registeredStudents: 150,
      completedStudents: 0,
      subjects: ['Mathematics', 'English Language', 'General Knowledge']
    },
    {
      id: 2,
      title: 'SS 1 (Science) Entrance Examination 2025/2026',
      classLevel: 'SS 1 (Science)',
      academicYear: '2025/2026',
      examDate: '2025-12-22',
      examTime: '10:00 AM',
      duration: 150,
      totalQuestions: 120,
      passingScore: 60,
      venue: 'Science Lab Complex',
      status: 'upcoming',
      registeredStudents: 89,
      completedStudents: 0,
      subjects: ['Mathematics', 'English Language', 'Science', 'Reasoning']
    },
    {
      id: 3,
      title: 'Primary 1 Entrance Examination 2025/2026',
      classLevel: 'Primary 1',
      academicYear: '2025/2026',
      examDate: '2025-12-18',
      examTime: '08:30 AM',
      duration: 90,
      totalQuestions: 50,
      passingScore: 40,
      venue: 'Primary Wing Hall',
      status: 'upcoming',
      registeredStudents: 75,
      completedStudents: 0,
      subjects: ['Basic Mathematics', 'English Language', 'General Knowledge']
    },
    {
      id: 4,
      title: 'JSS 1 Entrance Examination 2024/2025',
      classLevel: 'JSS 1',
      academicYear: '2024/2025',
      examDate: '2024-12-15',
      examTime: '09:00 AM',
      duration: 120,
      totalQuestions: 100,
      passingScore: 50,
      venue: 'Main Hall A',
      status: 'completed',
      registeredStudents: 200,
      completedStudents: 198,
      subjects: ['Mathematics', 'English Language', 'General Knowledge']
    }
  ]);

  // Applicants Data
  const applicants: Applicant[] = [
    {
      id: 1,
      name: 'Emmanuel Adeola',
      email: 'emmanuel.adeola@email.com',
      phone: '+234 801 234 5678',
      appliedFor: 'JSS 1',
      registrationDate: '2025-11-15',
      examStatus: 'pending',
      applicationNumber: 'APP-2025-001',
      dateOfBirth: '2013-05-20',
      parentName: 'Mr. Adeola Johnson',
      parentPhone: '+234 801 111 2222',
      address: '15 Admiralty Way, Lekki, Lagos'
    },
    {
      id: 2,
      name: 'Chioma Okonkwo',
      email: 'chioma.okonkwo@email.com',
      phone: '+234 802 345 6789',
      appliedFor: 'SS 1 (Science)',
      registrationDate: '2025-11-16',
      examStatus: 'pending',
      applicationNumber: 'APP-2025-002',
      dateOfBirth: '2010-08-14',
      parentName: 'Mrs. Okonkwo Grace',
      parentPhone: '+234 802 222 3333',
      address: '8 Banana Island Road, Ikoyi, Lagos'
    },
    {
      id: 3,
      name: 'Ibrahim Mohammed',
      email: 'ibrahim.mohammed@email.com',
      phone: '+234 803 456 7890',
      appliedFor: 'JSS 1',
      registrationDate: '2024-11-10',
      examStatus: 'passed',
      score: 78,
      applicationNumber: 'APP-2024-156',
      dateOfBirth: '2012-03-25',
      parentName: 'Alhaji Mohammed Ibrahim',
      parentPhone: '+234 803 333 4444',
      address: '22 Maitama District, Abuja'
    },
    {
      id: 4,
      name: 'Grace Adeyemi',
      email: 'grace.adeyemi@email.com',
      phone: '+234 804 567 8901',
      appliedFor: 'JSS 1',
      registrationDate: '2024-11-12',
      examStatus: 'passed',
      score: 85,
      applicationNumber: 'APP-2024-157',
      dateOfBirth: '2012-11-08',
      parentName: 'Dr. Adeyemi Peter',
      parentPhone: '+234 804 444 5555',
      address: '45 Victoria Island, Lagos'
    },
    {
      id: 5,
      name: 'David Okafor',
      email: 'david.okafor@email.com',
      phone: '+234 805 678 9012',
      appliedFor: 'SS 1 (Science)',
      registrationDate: '2024-11-14',
      examStatus: 'failed',
      score: 42,
      applicationNumber: 'APP-2024-158',
      dateOfBirth: '2010-07-19',
      parentName: 'Mr. Okafor Emmanuel',
      parentPhone: '+234 805 555 6666',
      address: '12 Independence Layout, Enugu'
    },
    {
      id: 6,
      name: 'Fatima Abubakar',
      email: 'fatima.abubakar@email.com',
      phone: '+234 806 789 0123',
      appliedFor: 'Primary 1',
      registrationDate: '2025-11-20',
      examStatus: 'pending',
      applicationNumber: 'APP-2025-003',
      dateOfBirth: '2018-02-10',
      parentName: 'Mrs. Abubakar Zainab',
      parentPhone: '+234 806 666 7777',
      address: '30 Guzape District, Abuja'
    }
  ];

  // Filter applicants
  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = 
      applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || applicant.examStatus === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Stats
  const totalApplicants = applicants.length;
  const pendingExams = applicants.filter(a => a.examStatus === 'pending').length;
  const passedApplicants = applicants.filter(a => a.examStatus === 'passed').length;
  const upcomingExams = entranceExams.filter(e => e.status === 'upcoming').length;

  const getStatusBadge = (status: string) => {
    const badges = {
      upcoming: 'bg-blue-100 text-blue-700',
      ongoing: 'bg-green-100 text-green-700',
      completed: 'bg-gray-100 text-gray-700'
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-700';
  };

  const getExamStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-700',
      completed: 'bg-blue-100 text-blue-700',
      passed: 'bg-green-100 text-green-700',
      failed: 'bg-red-100 text-red-700'
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-700';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newExam: EntranceExam = {
      id: entranceExams.length + 1,
      title: formData.title || `${formData.classLevel} Entrance Examination ${formData.academicYear}`,
      classLevel: formData.classLevel,
      academicYear: formData.academicYear,
      examDate: formData.examDate,
      examTime: formData.examTime,
      duration: parseInt(formData.duration),
      totalQuestions: parseInt(formData.totalQuestions),
      passingScore: parseInt(formData.passingScore),
      venue: formData.venue,
      status: 'upcoming',
      registeredStudents: 0,
      completedStudents: 0,
      subjects: formData.subjects
    };

    setEntranceExams(prev => [...prev, newExam]);
    setShowCreateModal(false);
    
    // Reset form
    setFormData({
      title: '',
      classLevel: '',
      academicYear: '2025/2026',
      examDate: '',
      examTime: '',
      duration: '120',
      totalQuestions: '100',
      passingScore: '50',
      venue: '',
      subjects: []
    });
  };

  const handleDeleteExam = () => {
    if (examToDelete) {
      setEntranceExams(prev => prev.filter(exam => exam.id !== examToDelete));
      setShowDeleteConfirm(false);
      setExamToDelete(null);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Entrance Examination
            </h1>
            <p className="text-sm text-gray-600 mt-1">Manage entrance exams for new student intakes</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Exam</span>
          </motion.button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          <motion.div variants={itemVariants} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalApplicants}</p>
                <p className="text-xs text-gray-600">Total Applicants</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{pendingExams}</p>
                <p className="text-xs text-gray-600">Pending Exams</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{passedApplicants}</p>
                <p className="text-xs text-gray-600">Passed</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{upcomingExams}</p>
                <p className="text-xs text-gray-600">Upcoming Exams</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scheduled Exams Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
        >
          <div className="p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Scheduled Entrance Exams</h2>
                <p className="text-sm text-gray-600 mt-1">Upcoming and past entrance examinations</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-4">
            {entranceExams.map((exam, index) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{exam.title}</h3>
                        <p className="text-sm text-gray-600">Academic Year: {exam.academicYear}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusBadge(exam.status)}`}>
                        {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-3">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span>{exam.examDate}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span>{exam.examTime}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-purple-600" />
                        <span>{exam.duration} mins</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <FileText className="w-4 h-4 text-green-600" />
                        <span>{exam.totalQuestions} Qs</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="w-4 h-4 text-orange-600" />
                        <span>{exam.registeredStudents} Registered</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {exam.subjects.map((subject, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                          {subject}
                        </span>
                      ))}
                    </div>

                    {exam.status === 'completed' && (
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-2 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="font-medium">{exam.completedStudents} Completed</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Target className="w-4 h-4" />
                          <span>Pass Mark: {exam.passingScore}%</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex lg:flex-col gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 lg:flex-none px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-200 transition-all flex items-center justify-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </motion.button>
                    {exam.status === 'upcoming' && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 lg:flex-none px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-semibold hover:bg-green-200 transition-all flex items-center justify-center space-x-2"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setExamToDelete(exam.id);
                            setShowDeleteConfirm(true);
                          }}
                          className="flex-1 lg:flex-none px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-200 transition-all flex items-center justify-center space-x-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </motion.button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Applicants Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
        >
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Applicants Management</h2>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or application number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                />
              </div>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm font-medium"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="passed">Passed</option>
                <option value="failed">Failed</option>
              </select>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2.5 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </motion.button>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Applied For
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApplicants.map((applicant, index) => (
                  <motion.tr
                    key={applicant.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {applicant.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{applicant.name}</p>
                          <p className="text-xs text-gray-500">{applicant.applicationNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        <p>{applicant.email}</p>
                        <p className="text-xs">{applicant.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">{applicant.appliedFor}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getExamStatusBadge(applicant.examStatus)}`}>
                        {applicant.examStatus.charAt(0).toUpperCase() + applicant.examStatus.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {applicant.score !== undefined ? (
                        <span className={`text-sm font-bold ${
                          applicant.score >= 50 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {applicant.score}%
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setSelectedApplicant(applicant);
                            setShowApplicantDetails(true);
                          }}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-all"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-blue-600" />
                        </motion.button>
                        {applicant.examStatus === 'passed' && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 hover:bg-green-50 rounded-lg transition-all"
                            title="Send Admission Letter"
                          >
                            <Send className="w-4 h-4 text-green-600" />
                          </motion.button>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 hover:bg-purple-50 rounded-lg transition-all"
                          title="Print"
                        >
                          <Printer className="w-4 h-4 text-purple-600" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden divide-y divide-gray-200">
            {filteredApplicants.map((applicant, index) => (
              <motion.div
                key={applicant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4"
              >
                <div className="flex items-start space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {applicant.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900">{applicant.name}</h3>
                    <p className="text-xs text-gray-500">{applicant.applicationNumber}</p>
                    <p className="text-xs text-gray-600 mt-1">{applicant.appliedFor}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getExamStatusBadge(applicant.examStatus)}`}>
                    {applicant.examStatus}
                  </span>
                </div>

                <div className="space-y-2 mb-3">
                  <p className="text-xs text-gray-600">{applicant.email}</p>
                  <p className="text-xs text-gray-600">{applicant.phone}</p>
                  {applicant.score !== undefined && (
                    <p className={`text-sm font-bold ${
                      applicant.score >= 50 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      Score: {applicant.score}%
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedApplicant(applicant);
                      setShowApplicantDetails(true);
                    }}
                    className="flex-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-all flex items-center justify-center space-x-1"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View</span>
                  </button>
                  {applicant.examStatus === 'passed' && (
                    <button className="flex-1 px-3 py-2 bg-green-50 text-green-700 rounded-lg text-xs font-semibold hover:bg-green-100 transition-all flex items-center justify-center space-x-1">
                      <Send className="w-3 h-3" />
                      <span>Admit</span>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredApplicants.length === 0 && (
            <div className="text-center py-12">
              <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No applicants found</h3>
              <p className="text-sm text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Create Exam Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">Create New Entrance Exam</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateExam} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Exam Title (Optional)
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Leave blank for auto-generated title"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Class Level <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="classLevel"
                      value={formData.classLevel}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select class level</option>
                      {classLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Academic Year <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="academicYear"
                      value={formData.academicYear}
                      onChange={handleInputChange}
                      required
                      placeholder="2025/2026"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Exam Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="examDate"
                      value={formData.examDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Exam Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      name="examTime"
                      value={formData.examTime}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Duration (mins) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                      min="30"
                      max="300"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Total Questions <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="totalQuestions"
                      value={formData.totalQuestions}
                      onChange={handleInputChange}
                      required
                      min="10"
                      max="200"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Passing Score (%) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="passingScore"
                      value={formData.passingScore}
                      onChange={handleInputChange}
                      required
                      min="0"
                      max="100"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Venue <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Main Hall A, Science Lab Complex"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subjects <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {availableSubjects.map(subject => (
                      <label
                        key={subject}
                        className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
                      >
                        <input
                          type="checkbox"
                          checked={formData.subjects.includes(subject)}
                          onChange={() => handleSubjectToggle(subject)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{subject}</span>
                      </label>
                    ))}
                  </div>
                  {formData.subjects.length === 0 && (
                    <p className="text-xs text-red-500 mt-1">Please select at least one subject</p>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formData.subjects.length === 0}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create Exam
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Applicant Details Modal */}
      <AnimatePresence>
        {showApplicantDetails && selectedApplicant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowApplicantDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">Applicant Details</h2>
                <button
                  onClick={() => setShowApplicantDetails(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Applicant Header */}
                <div className="flex items-center space-x-4 pb-6 border-b border-gray-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {selectedApplicant.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedApplicant.name}</h3>
                    <p className="text-sm text-gray-600">{selectedApplicant.applicationNumber}</p>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${getExamStatusBadge(selectedApplicant.examStatus)}`}>
                      {selectedApplicant.examStatus.charAt(0).toUpperCase() + selectedApplicant.examStatus.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Personal Information */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
                    <Users className="w-4 h-4 mr-2 text-blue-600" />
                    Personal Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Email</p>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <p className="text-sm text-gray-900">{selectedApplicant.email}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Phone</p>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <p className="text-sm text-gray-900">{selectedApplicant.phone}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Date of Birth</p>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <p className="text-sm text-gray-900">{selectedApplicant.dateOfBirth || 'N/A'}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Registration Date</p>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <p className="text-sm text-gray-900">{selectedApplicant.registrationDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Parent/Guardian Information */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
                    <Users className="w-4 h-4 mr-2 text-green-600" />
                    Parent/Guardian Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Parent Name</p>
                      <p className="text-sm text-gray-900">{selectedApplicant.parentName || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Parent Phone</p>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <p className="text-sm text-gray-900">{selectedApplicant.parentPhone || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-purple-600" />
                    Address
                  </h4>
                  <p className="text-sm text-gray-900">{selectedApplicant.address || 'N/A'}</p>
                </div>

                {/* Application Details */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-orange-600" />
                    Application Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Applied For</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedApplicant.appliedFor}</p>
                    </div>
                    {selectedApplicant.score !== undefined && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Exam Score</p>
                        <p className={`text-xl font-bold ${
                          selectedApplicant.score >= 50 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {selectedApplicant.score}%
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  {selectedApplicant.examStatus === 'passed' && (
                    <button className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center justify-center space-x-2">
                      <Send className="w-4 h-4" />
                      <span>Send Admission Letter</span>
                    </button>
                  )}
                  <button className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center justify-center space-x-2">
                    <Printer className="w-4 h-4" />
                    <span>Print Details</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Delete Exam</h3>
                  <p className="text-sm text-gray-600">This action cannot be undone</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete this entrance exam? All associated data will be permanently removed.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteExam}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}