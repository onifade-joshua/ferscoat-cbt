'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Upload,
  FileText,
  Edit,
  Trash2,
  Eye,
  Filter,
  Search,
  Download,
  Copy,
  CheckCircle,
  AlertCircle,
  FileSpreadsheet,
  File
} from 'lucide-react';
import Toast, { ToastType } from '../../../components/ui/Toast';

// ===== TYPE DEFINITIONS =====

interface Question {
  id: number;
  text: string;
  subject: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  createdBy: string;
  createdAt: string;
  status: 'active' | 'draft' | 'archived';
}

interface ToastState {
  isVisible: boolean;
  type: ToastType;
  title: string;
  message?: string;
}

// ===== COMPONENT =====

export default function QuestionsManagementPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: 'What is the capital of France?',
      subject: 'Geography',
      topic: 'European Capitals',
      difficulty: 'Easy',
      type: 'multiple_choice',
      options: ['London', 'Paris', 'Berlin', 'Madrid'],
      correctAnswer: 'Paris',
      explanation: 'Paris has been the capital of France since the 12th century.',
      createdBy: 'Prof. Johnson',
      createdAt: '2025-11-20',
      status: 'active'
    },
    {
      id: 2,
      text: 'Solve for x: 2x + 5 = 15',
      subject: 'Mathematics',
      topic: 'Linear Equations',
      difficulty: 'Medium',
      type: 'multiple_choice',
      options: ['3', '5', '7', '10'],
      correctAnswer: '5',
      explanation: 'Subtract 5 from both sides: 2x = 10, then divide by 2: x = 5',
      createdBy: 'Prof. Johnson',
      createdAt: '2025-11-19',
      status: 'active'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [toast, setToast] = useState<ToastState>({
    isVisible: false,
    type: 'info',
    title: '',
    message: ''
  });

  // Show toast
  const showToast = (type: ToastType, title: string, message?: string) => {
    setToast({ isVisible: true, type, title, message });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const subjects = ['all', 'Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'Geography', 'History'];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

  // Filter questions
  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         q.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || q.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];

    if (!allowedTypes.includes(file.type)) {
      showToast('error', 'Invalid File Type', 'Please upload PDF, Word, Excel, or CSV files only');
      return;
    }

    setIsUploading(true);

    try {
      // Simulate file upload and processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Simulate adding questions from file
      const newQuestions: Question[] = Array.from({ length: 10 }, (_, i) => ({
        id: questions.length + i + 1,
        text: `Imported question ${i + 1} from ${file.name}`,
        subject: 'Mathematics',
        topic: 'Imported Topic',
        difficulty: 'Medium' as const,
        type: 'multiple_choice' as const,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'Option A',
        createdBy: 'Prof. Johnson',
        createdAt: new Date().toISOString().split('T')[0],
        status: 'draft' as const
      }));

      setQuestions(prev => [...prev, ...newQuestions]);
      setShowImportModal(false);
      showToast('success', 'Import Successful', `${newQuestions.length} questions imported from ${file.name}`);
    } catch (error) {
      showToast('error', 'Import Failed', 'Failed to process the file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Delete question
  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      setQuestions(prev => prev.filter(q => q.id !== id));
      showToast('success', 'Question Deleted', 'The question has been removed');
    }
  };

  // Duplicate question
  const handleDuplicate = (question: Question) => {
    const newQuestion: Question = {
      ...question,
      id: questions.length + 1,
      text: `${question.text} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'draft'
    };
    setQuestions(prev => [...prev, newQuestion]);
    showToast('success', 'Question Duplicated', 'A copy has been created in drafts');
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: string): string => {
    const colors: Record<string, string> = {
      Easy: 'bg-green-100 text-green-700',
      Medium: 'bg-yellow-100 text-yellow-700',
      Hard: 'bg-red-100 text-red-700'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-700';
  };

  // Get status color
  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-700',
      draft: 'bg-yellow-100 text-yellow-700',
      archived: 'bg-gray-100 text-gray-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <Toast
        type={toast.type}
        title={toast.title}
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
        duration={5000}
      />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Question Bank</h1>
            <p className="text-gray-600 mt-1">Create, import, and manage exam questions</p>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowImportModal(true)}
              className="px-4 py-2 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-semibold flex items-center space-x-2 hover:bg-blue-50"
            >
              <Upload className="w-5 h-5" />
              <span>Import Questions</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Create Question</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Questions', value: questions.length, color: 'from-blue-500 to-blue-600', icon: FileText },
            { label: 'Active', value: questions.filter(q => q.status === 'active').length, color: 'from-green-500 to-green-600', icon: CheckCircle },
            { label: 'Drafts', value: questions.filter(q => q.status === 'draft').length, color: 'from-yellow-500 to-yellow-600', icon: Edit },
            { label: 'Subjects', value: new Set(questions.map(q => q.subject)).size, color: 'from-purple-500 to-purple-600', icon: FileSpreadsheet }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
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
                placeholder="Search questions..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Subject Filter */}
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject === 'all' ? 'All Subjects' : subject}
                </option>
              ))}
            </select>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff}>
                  {diff === 'all' ? 'All Difficulties' : diff}
                </option>
              ))}
            </select>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold flex items-center space-x-2 hover:bg-gray-200"
            >
              <Download className="w-5 h-5" />
              <span>Export</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Questions Found</h3>
              <p className="text-gray-600 mb-4">Start by creating or importing questions</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold"
              >
                Create First Question
              </motion.button>
            </div>
          ) : (
            filteredQuestions.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        {question.subject}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(question.status)}`}>
                        {question.status}
                      </span>
                      <span className="text-xs text-gray-500">#{question.id}</span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{question.text}</h3>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>📚 {question.topic}</span>
                      <span>👤 {question.createdBy}</span>
                      <span>📅 {question.createdAt}</span>
                      <span>🎯 {question.type.replace('_', ' ')}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setSelectedQuestion(question);
                        setShowPreviewModal(true);
                      }}
                      className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                      title="Preview"
                    >
                      <Eye className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => showToast('info', 'Edit Feature', 'Question editor coming soon')}
                      className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDuplicate(question)}
                      className="p-2 hover:bg-purple-50 text-purple-600 rounded-lg transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(question.id)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => !isUploading && setShowImportModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Import Questions</h3>
            <p className="text-gray-600 mb-6">Upload questions from PDF, Word, Excel, or CSV files</p>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center mb-6">
              <input
                type="file"
                id="file-upload"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className={`cursor-pointer ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isUploading ? (
                  <>
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg font-semibold text-gray-900 mb-2">Processing File...</p>
                    <p className="text-sm text-gray-600">Please wait while we import your questions</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-gray-900 mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-600">
                      PDF, Word, Excel, or CSV (Max 10MB)
                    </p>
                  </>
                )}
              </label>
            </div>

            {/* Supported Formats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { icon: File, label: 'PDF', ext: '.pdf' },
                { icon: FileText, label: 'Word', ext: '.doc, .docx' },
                { icon: FileSpreadsheet, label: 'Excel/CSV', ext: '.xlsx, .csv' }
              ].map((format, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <format.icon className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{format.label}</p>
                    <p className="text-xs text-gray-600">{format.ext}</p>
                  </div>
                </div>
              ))}
            </div>

            {!isUploading && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowImportModal(false)}
                className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200"
              >
                Cancel
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && selectedQuestion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowPreviewModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Question Preview</h3>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(selectedQuestion.difficulty)}`}>
                  {selectedQuestion.difficulty}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                  {selectedQuestion.subject}
                </span>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">Question:</label>
                <p className="text-lg text-gray-900 mt-1">{selectedQuestion.text}</p>
              </div>

              {selectedQuestion.options && (
                <div>
                  <label className="text-sm font-semibold text-gray-700">Options:</label>
                  <div className="mt-2 space-y-2">
                    {selectedQuestion.options.map((option, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border-2 ${
                          option === selectedQuestion.correctAnswer
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold">{String.fromCharCode(65 + index)}.</span>
                          <span>{option}</span>
                          {option === selectedQuestion.correctAnswer && (
                            <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedQuestion.explanation && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <label className="text-sm font-semibold text-blue-900">Explanation:</label>
                  <p className="text-sm text-blue-800 mt-1">{selectedQuestion.explanation}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="text-gray-600">Topic:</label>
                  <p className="font-semibold">{selectedQuestion.topic}</p>
                </div>
                <div>
                  <label className="text-gray-600">Type:</label>
                  <p className="font-semibold">{selectedQuestion.type.replace('_', ' ')}</p>
                </div>
                <div>
                  <label className="text-gray-600">Created By:</label>
                  <p className="font-semibold">{selectedQuestion.createdBy}</p>
                </div>
                <div>
                  <label className="text-gray-600">Date:</label>
                  <p className="font-semibold">{selectedQuestion.createdAt}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Create Modal Placeholder */}
      {showCreateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowCreateModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Create New Question</h3>
            <p className="text-gray-600 mb-6">Question creation form will be implemented here</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCreateModal(false)}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg"
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}