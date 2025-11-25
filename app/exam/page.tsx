'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  Menu
} from 'lucide-react';

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

interface Exam {
  title: string;
  duration: string;
  totalQuestions: number;
  questions: Question[];
}

export default function ExamInterface() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState<number>(7200); // 2 hours in seconds
  const [showSubmitDialog, setShowSubmitDialog] = useState<boolean>(false);
  const [showQuestionNav, setShowQuestionNav] = useState<boolean>(false);

  // Sample exam data
  const exam: Exam = {
    title: 'Mathematics Final Exam',
    duration: '2 hours',
    totalQuestions: 50,
    questions: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      text: `Sample question ${i + 1}: What is the value of x in the equation 2x + 5 = 15?`,
      options: [
        { id: 'A', text: '5' },
        { id: 'B', text: '10' },
        { id: 'C', text: '7.5' },
        { id: 'D', text: '12.5' }
      ]
    }))
  };

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-save answers
  useEffect(() => {
    const autoSave = setInterval(() => {
      console.log('Auto-saving answers...', answers);
    }, 30000);

    return () => clearInterval(autoSave);
  }, [answers]);

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId: number, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const toggleFlag = (questionId: number) => {
    setFlagged(prev => {
      const newFlagged = new Set(prev);
      if (newFlagged.has(questionId)) {
        newFlagged.delete(questionId);
      } else {
        newFlagged.add(questionId);
      }
      return newFlagged;
    });
  };

  const handleAutoSubmit = () => {
    alert('Time is up! Your exam has been automatically submitted.');
  };

  const handleSubmit = () => {
    const answered = Object.keys(answers).length;
    const unanswered = exam.totalQuestions - answered;

    if (unanswered > 0) {
      const confirmSubmit = window.confirm(
        `You have ${unanswered} unanswered question(s). Do you want to submit anyway?`
      );
      if (!confirmSubmit) return;
    }

    alert('Exam submitted successfully!');
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestion(index);
    setShowQuestionNav(false);
  };

  const nextQuestion = () => {
    if (currentQuestion < exam.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const currentQ = exam.questions[currentQuestion];
  const isAnswered = answers[currentQ.id];
  const isFlagged = flagged.has(currentQ.id);
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = exam.totalQuestions - answeredCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-bold text-gray-900">{exam.title}</h1>
              <span className="hidden sm:block text-sm text-gray-500">
                Question {currentQuestion + 1} of {exam.totalQuestions}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <motion.div
                animate={timeLeft < 600 ? { scale: [1, 1.1, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1 }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-mono font-bold ${
                  timeLeft < 600
                    ? 'bg-red-100 text-red-700'
                    : timeLeft < 1800
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                <Clock className="w-5 h-5" />
                <span>{formatTime(timeLeft)}</span>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowQuestionNav(!showQuestionNav)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex">
        {/* Main Question Area */}
        <div className="flex-1 p-4 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              {/* Question Card */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 lg:p-8 mb-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="px-3 py-1 bg-blue-600 text-white rounded-lg font-semibold">
                        Q{currentQ.id}
                      </span>
                      {isFlagged && (
                        <span className="px-3 py-1 bg-yellow-500 text-white rounded-lg font-semibold flex items-center space-x-1">
                          <Flag className="w-4 h-4" />
                          <span>Flagged</span>
                        </span>
                      )}
                    </div>
                    <p className="text-lg text-gray-900 leading-relaxed">{currentQ.text}</p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleFlag(currentQ.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      isFlagged
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-gray-100 text-gray-400 hover:text-yellow-600'
                    }`}
                  >
                    <Flag className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {currentQ.options.map((option) => (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswerSelect(currentQ.id, option.id)}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        answers[currentQ.id] === option.id
                          ? 'border-blue-600 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${
                            answers[currentQ.id] === option.id
                              ? 'border-blue-600 bg-blue-600 text-white'
                              : 'border-gray-300 text-gray-600'
                          }`}
                        >
                          {option.id}
                        </div>
                        <span className="flex-1 text-gray-900">{option.text}</span>
                        {answers[currentQ.id] === option.id && (
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={previousQuestion}
                  disabled={currentQuestion === 0}
                  className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Previous</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSubmitDialog(true)}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Submit Exam</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextQuestion}
                  disabled={currentQuestion === exam.questions.length - 1}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      <AnimatePresence>
        {showSubmitDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowSubmitDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Submit Exam?</h3>
                <p className="text-gray-600">
                  You have answered {answeredCount} out of {exam.totalQuestions} questions.
                </p>
              </div>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl"
                >
                  Yes, Submit Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowSubmitDialog(false)}
                  className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200"
                >
                  Continue Exam
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
