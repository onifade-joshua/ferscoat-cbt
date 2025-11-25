'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  AlertCircle,
  Bell,
  Download,
  MapPin,
  User,
  Filter
} from 'lucide-react';

// ===== TYPE DEFINITIONS =====

type EventType = 'exam' | 'practice' | 'assignment' | 'result';

interface ExamEvent {
  id: number;
  title: string;
  subject: string;
  type: EventType;
  date: string; // YYYY-MM-DD format
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  duration: string;
  location: string;
  instructor: string;
  status: 'upcoming' | 'today' | 'completed';
  description?: string;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: ExamEvent[];
}

// ===== COMPONENT =====

export default function SchedulePage() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Sample schedule data - CBT focused
  const events: ExamEvent[] = [
    {
      id: 1,
      title: 'Mathematics Final Exam',
      subject: 'Mathematics',
      type: 'exam',
      date: '2025-12-05',
      startTime: '10:00',
      endTime: '12:00',
      duration: '2 hours',
      location: 'Computer Lab A',
      instructor: 'Prof. Johnson',
      status: 'upcoming',
      description: 'Final examination covering all topics from semester'
    },
    {
      id: 2,
      title: 'English Language Test',
      subject: 'English',
      type: 'exam',
      date: '2025-12-03',
      startTime: '14:00',
      endTime: '15:30',
      duration: '1.5 hours',
      location: 'Computer Lab B',
      instructor: 'Mrs. Smith',
      status: 'upcoming',
      description: 'Reading comprehension and grammar assessment'
    },
    {
      id: 3,
      title: 'Physics Mid-term',
      subject: 'Physics',
      type: 'exam',
      date: '2025-12-07',
      startTime: '09:00',
      endTime: '11:00',
      duration: '2 hours',
      location: 'Computer Lab C',
      instructor: 'Dr. Williams',
      status: 'upcoming',
      description: 'Mid-term examination - Mechanics and Thermodynamics'
    },
    {
      id: 4,
      title: 'Chemistry Quiz',
      subject: 'Chemistry',
      type: 'exam',
      date: '2025-12-10',
      startTime: '11:00',
      endTime: '12:00',
      duration: '1 hour',
      location: 'Computer Lab D',
      instructor: 'Dr. Brown',
      status: 'upcoming',
      description: 'Quick assessment on organic chemistry'
    },
    {
      id: 5,
      title: 'Biology Practice Test',
      subject: 'Biology',
      type: 'practice',
      date: '2025-12-12',
      startTime: '13:00',
      endTime: '14:30',
      duration: '1.5 hours',
      location: 'Computer Lab A',
      instructor: 'Mrs. Davis',
      status: 'upcoming',
      description: 'Practice test for final preparation'
    },
    {
      id: 6,
      title: 'History Assignment Due',
      subject: 'History',
      type: 'assignment',
      date: '2025-12-08',
      startTime: '23:59',
      endTime: '23:59',
      duration: 'All Day',
      location: 'Online Submission',
      instructor: 'Mr. Anderson',
      status: 'upcoming',
      description: 'Submit essay on World War II'
    },
    {
      id: 7,
      title: 'Mathematics Result Release',
      subject: 'Mathematics',
      type: 'result',
      date: '2025-12-15',
      startTime: '09:00',
      endTime: '09:00',
      duration: '-',
      location: 'Online Portal',
      instructor: 'Prof. Johnson',
      status: 'upcoming',
      description: 'Mid-term examination results will be available'
    }
  ];

  const subjects: string[] = ['all', 'Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'History'];

  // Get days in current month
  const getDaysInMonth = (date: Date): { daysInMonth: number; startingDayOfWeek: number } => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  // Get events for a specific date
  const getEventsForDate = (date: Date): ExamEvent[] => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => {
      if (selectedSubject !== 'all' && event.subject !== selectedSubject) return false;
      return event.date === dateStr;
    });
  };

  // Check if date is today
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Navigate months
  const navigateMonth = (direction: number): void => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Get month and year string
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  // Get event color based on type
  const getEventColor = (type: EventType): string => {
    const colors: Record<EventType, string> = {
      exam: 'bg-blue-500',
      practice: 'bg-green-500',
      assignment: 'bg-purple-500',
      result: 'bg-yellow-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  // Get upcoming events (next 7 days)
  const upcomingEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return events
      .filter(event => {
        const eventDate = new Date(event.date);
        const daysDiff = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return daysDiff >= 0 && daysDiff <= 7;
      })
      .filter(event => selectedSubject === 'all' || event.subject === selectedSubject)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  }, [events, selectedSubject]);

  // Get calendar days
  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  // Calculate days to show (including previous/next month padding)
  const calendarDays: CalendarDay[] = useMemo(() => {
    const days: CalendarDay[] = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      const date = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: isToday(date),
        events: []
      });
    }

    // Add days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: isToday(date),
        events: getEventsForDate(date)
      });
    }

    // Add empty cells for days after month ends to complete the grid
    const remainingCells = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: isToday(date),
        events: []
      });
    }

    return days;
  }, [currentDate, daysInMonth, startingDayOfWeek, events, selectedSubject]);

  // Get event type badge
  const getEventTypeBadge = (type: EventType): { label: string; color: string } => {
    const badges: Record<EventType, { label: string; color: string }> = {
      exam: { label: 'Exam', color: 'bg-blue-100 text-blue-700' },
      practice: { label: 'Practice', color: 'bg-green-100 text-green-700' },
      assignment: { label: 'Assignment', color: 'bg-purple-100 text-purple-700' },
      result: { label: 'Result', color: 'bg-yellow-100 text-yellow-700' }
    };
    return badges[type];
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
            <h1 className="text-3xl font-bold text-gray-900">Exam Schedule</h1>
            <p className="text-gray-600 mt-1">Plan your study time and track exam dates</p>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
            >
              <Bell className="w-5 h-5" />
              <span>Set Reminders</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5" />
              <span>Export</span>
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
            >
              {/* Calendar Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{monthName}</h2>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => navigateMonth(-1)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentDate(new Date())}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm"
                    >
                      Today
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => navigateMonth(1)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </motion.button>
                  </div>
                </div>

                {/* Subject Filter */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {subjects.map((subject) => (
                    <motion.button
                      key={subject}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSubject(subject)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                        selectedSubject === subject
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {subject === 'all' ? 'All Subjects' : subject}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="p-6">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((calendarDay, index) => {
                    const dayNumber = calendarDay.date.getDate();
                    const hasEvents = calendarDay.events.length > 0;

                    return (
                      <motion.div
                        key={index}
                        whileHover={{ scale: hasEvents ? 1.05 : 1 }}
                        onClick={() => hasEvents && setSelectedDate(calendarDay.date)}
                        className={`aspect-square p-2 rounded-lg border-2 transition-all ${
                          calendarDay.isToday
                            ? 'border-blue-600 bg-blue-50'
                            : hasEvents && calendarDay.isCurrentMonth
                            ? 'border-blue-200 bg-blue-50/50 hover:border-blue-400 cursor-pointer'
                            : calendarDay.isCurrentMonth
                            ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            : 'border-transparent bg-gray-50/50'
                        }`}
                      >
                        <div className="flex flex-col h-full">
                          <span
                            className={`text-sm font-semibold ${
                              calendarDay.isToday
                                ? 'text-blue-600'
                                : calendarDay.isCurrentMonth
                                ? 'text-gray-900'
                                : 'text-gray-400'
                            }`}
                          >
                            {dayNumber}
                          </span>
                          {hasEvents && calendarDay.isCurrentMonth && (
                            <div className="flex-1 flex flex-col justify-end space-y-1 mt-1">
                              {calendarDay.events.slice(0, 2).map((event) => (
                                <div
                                  key={event.id}
                                  className={`h-1.5 rounded-full ${getEventColor(event.type)}`}
                                  title={event.title}
                                />
                              ))}
                              {calendarDay.events.length > 2 && (
                                <span className="text-xs text-blue-600 font-semibold">
                                  +{calendarDay.events.length - 2}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Upcoming Events Section */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Upcoming Events</h3>
                <p className="text-sm text-gray-600 mt-1">Next 7 days</p>
              </div>

              <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
                {upcomingEvents.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No upcoming events</p>
                  </div>
                ) : (
                  upcomingEvents.map((event, index) => {
                    const typeBadge = getEventTypeBadge(event.type);
                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => {
                          if (event.type === 'exam' || event.type === 'practice') {
                            router.push(`/student/take-exam/${event.id}`);
                          }
                        }}
                        className={`p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 ${
                          (event.type === 'exam' || event.type === 'practice') ? 'cursor-pointer' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full ${getEventColor(event.type)} mt-2 flex-shrink-0`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className="font-semibold text-gray-900 truncate">{event.title}</h4>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${typeBadge.color} ml-2`}>
                                {typeBadge.label}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{event.subject}</p>

                            <div className="space-y-1 text-xs text-gray-600">
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-3 h-3" />
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="w-3 h-3" />
                                <span>
                                  {event.startTime} - {event.endTime} ({event.duration})
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <MapPin className="w-3 h-3" />
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <User className="w-3 h-3" />
                                <span>{event.instructor}</span>
                              </div>
                            </div>

                            {event.description && (
                              <p className="mt-2 text-xs text-gray-500 line-clamp-2">{event.description}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </motion.div>

            {/* Legend */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Event Types</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded bg-blue-500" />
                  <span className="text-sm text-gray-700">Computer-Based Exam</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded bg-green-500" />
                  <span className="text-sm text-gray-700">Practice Test</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded bg-purple-500" />
                  <span className="text-sm text-gray-700">Assignment Deadline</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded bg-yellow-500" />
                  <span className="text-sm text-gray-700">Result Release</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Selected Date Details Modal */}
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedDate(null)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedDate.toLocaleDateString('default', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h3>
                <button
                  onClick={() => setSelectedDate(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <AlertCircle className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="space-y-3">
                {getEventsForDate(selectedDate).map((event) => {
                  const typeBadge = getEventTypeBadge(event.type);
                  return (
                    <div
                      key={event.id}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{event.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${typeBadge.color}`}>
                          {typeBadge.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{event.subject}</p>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{event.startTime} - {event.endTime}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>{event.instructor}</span>
                        </div>
                      </div>
                      {event.description && (
                        <p className="mt-3 text-sm text-gray-500">{event.description}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}