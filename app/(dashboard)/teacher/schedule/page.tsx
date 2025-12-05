'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Clock,
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Video,
  FileText,
  Edit,
  Trash2,
  Users
} from 'lucide-react';

// ===== TYPE DEFINITIONS =====

interface ScheduleEvent {
  id: number;
  title: string;
  type: 'class' | 'exam' | 'meeting' | 'event';
  className?: string;
  subject?: string;
  location: string;
  isOnline?: boolean;
  startTime: string;
  endTime: string;
  day: string;
  color: string;
  students?: number;
  description?: string;
}

// ===== COMPONENT =====

export default function SchedulePage() {
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const router = useRouter();

  // Days of the week
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Time slots (8 AM to 6 PM)
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  // Schedule events
  const scheduleEvents: ScheduleEvent[] = [
    {
      id: 1,
      title: 'Class 12A - Mathematics',
      type: 'class',
      className: 'Class 12A',
      subject: 'Advanced Calculus',
      location: 'Room 201',
      startTime: '09:00',
      endTime: '10:30',
      day: 'Monday',
      color: 'from-blue-500 to-blue-600',
      students: 35,
      description: 'Advanced Calculus - Chapter 5'
    },
    {
      id: 2,
      title: 'Class 11B - Mathematics',
      type: 'class',
      className: 'Class 11B',
      subject: 'Algebra',
      location: 'Room 203',
      startTime: '11:00',
      endTime: '12:30',
      day: 'Monday',
      color: 'from-green-500 to-green-600',
      students: 42
    },
    {
      id: 3,
      title: 'Faculty Meeting',
      type: 'meeting',
      location: 'Conference Room',
      isOnline: false,
      startTime: '14:00',
      endTime: '15:00',
      day: 'Monday',
      color: 'from-purple-500 to-purple-600',
      description: 'Monthly faculty meeting'
    },
    {
      id: 4,
      title: 'Mathematics Final Exam',
      type: 'exam',
      className: 'Class 12A',
      location: 'Exam Hall A',
      startTime: '10:00',
      endTime: '12:00',
      day: 'Tuesday',
      color: 'from-red-500 to-red-600',
      students: 35,
      description: 'Final examination for semester'
    },
    {
      id: 5,
      title: 'Class 10C - Statistics',
      type: 'class',
      className: 'Class 10C',
      subject: 'Statistics',
      location: 'Room 105',
      startTime: '13:00',
      endTime: '14:30',
      day: 'Tuesday',
      color: 'from-yellow-500 to-yellow-600',
      students: 38
    },
    {
      id: 6,
      title: 'Class 12A - Mathematics',
      type: 'class',
      className: 'Class 12A',
      subject: 'Advanced Calculus',
      location: 'Room 201',
      startTime: '09:00',
      endTime: '10:30',
      day: 'Wednesday',
      color: 'from-blue-500 to-blue-600',
      students: 35
    },
    {
      id: 7,
      title: 'Online Workshop',
      type: 'event',
      location: 'Zoom',
      isOnline: true,
      startTime: '15:00',
      endTime: '16:30',
      day: 'Wednesday',
      color: 'from-indigo-500 to-indigo-600',
      description: 'Teaching methodologies workshop'
    },
    {
      id: 8,
      title: 'Class 11B - Mathematics',
      type: 'class',
      className: 'Class 11B',
      subject: 'Algebra',
      location: 'Room 203',
      startTime: '10:00',
      endTime: '11:30',
      day: 'Thursday',
      color: 'from-green-500 to-green-600',
      students: 42
    },
    {
      id: 9,
      title: 'Class 12B - Advanced Math',
      type: 'class',
      className: 'Class 12B',
      subject: 'Advanced Mathematics',
      location: 'Room 202',
      startTime: '14:00',
      endTime: '15:30',
      day: 'Thursday',
      color: 'from-pink-500 to-pink-600',
      students: 41
    },
    {
      id: 10,
      title: 'Class 12A - Mathematics',
      type: 'class',
      className: 'Class 12A',
      subject: 'Advanced Calculus',
      location: 'Room 201',
      startTime: '09:00',
      endTime: '10:30',
      day: 'Friday',
      color: 'from-blue-500 to-blue-600',
      students: 35
    },
    {
      id: 11,
      title: 'Class 12B - Advanced Math',
      type: 'class',
      className: 'Class 12B',
      subject: 'Advanced Mathematics',
      location: 'Room 202',
      startTime: '14:00',
      endTime: '15:30',
      day: 'Friday',
      color: 'from-pink-500 to-pink-600',
      students: 41
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'class':
        return <BookOpen className="w-4 h-4" />;
      case 'exam':
        return <FileText className="w-4 h-4" />;
      case 'meeting':
        return <Users className="w-4 h-4" />;
      case 'event':
        return <Calendar className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getEventTypeBadge = (type: string) => {
    const badges = {
      'class': { color: 'bg-blue-100 text-blue-700', label: 'Class' },
      'exam': { color: 'bg-red-100 text-red-700', label: 'Exam' },
      'meeting': { color: 'bg-purple-100 text-purple-700', label: 'Meeting' },
      'event': { color: 'bg-indigo-100 text-indigo-700', label: 'Event' }
    };
    return badges[type as keyof typeof badges];
  };

  // Filter events
  const filteredEvents = scheduleEvents.filter(event => {
    if (filterType === 'all') return true;
    return event.type === filterType;
  });

  // Get events for a specific day
  const getEventsForDay = (day: string) => {
    return filteredEvents.filter(event => event.day === day);
  };

  // Get current week date range
  const getWeekDateRange = () => {
    const start = new Date(currentWeek);
    start.setDate(start.getDate() - start.getDay() + 1); // Monday
    const end = new Date(start);
    end.setDate(end.getDate() + 6); // Sunday
    
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newDate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Schedule</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your classes, exams, and meetings</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/teacher/schedule/new')}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Add Event</span>
          </motion.button>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          {/* Week Navigation */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigateWeek('prev')}
              className="p-2 hover:bg-white rounded-lg border border-gray-200 transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </motion.button>
            
            <div className="text-center">
              <p className="text-sm sm:text-base font-bold text-gray-900">{getWeekDateRange()}</p>
              <p className="text-xs text-gray-500">Week View</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigateWeek('next')}
              className="p-2 hover:bg-white rounded-lg border border-gray-200 transition-all"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </motion.button>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                filterType === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setFilterType('class')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                filterType === 'class'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Classes
            </button>
            <button
              onClick={() => setFilterType('exam')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                filterType === 'exam'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Exams
            </button>
            <button
              onClick={() => setFilterType('meeting')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                filterType === 'meeting'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Meetings
            </button>
          </div>
        </div>

        {/* Weekly Schedule Grid - Desktop */}
        <div className="hidden lg:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-8 border-b border-gray-200">
            <div className="p-4 bg-gray-50 border-r border-gray-200">
              <p className="text-sm font-semibold text-gray-600">Time</p>
            </div>
            {weekDays.map((day, index) => (
              <div key={index} className="p-4 bg-gray-50 border-r border-gray-200 last:border-r-0">
                <p className="text-sm font-semibold text-gray-900">{day}</p>
                <p className="text-xs text-gray-500">{getEventsForDay(day).length} events</p>
              </div>
            ))}
          </div>

          <div className="overflow-y-auto max-h-[600px]">
            {timeSlots.map((time, timeIndex) => (
              <div key={timeIndex} className="grid grid-cols-8 border-b border-gray-200 last:border-b-0">
                <div className="p-4 bg-gray-50 border-r border-gray-200 text-sm text-gray-600 font-medium">
                  {time}
                </div>
                {weekDays.map((day, dayIndex) => {
                  const dayEvents = getEventsForDay(day).filter(event => event.startTime === time);
                  
                  return (
                    <div key={dayIndex} className="p-2 border-r border-gray-200 last:border-r-0 min-h-[80px]">
                      {dayEvents.map((event) => (
                        <motion.div
                          key={event.id}
                          whileHover={{ scale: 1.02, y: -2 }}
                          onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                          className={`p-2 rounded-lg bg-gradient-to-r ${event.color} text-white cursor-pointer mb-2 last:mb-0`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold truncate">{event.title}</p>
                              <p className="text-xs opacity-90 truncate">{event.location}</p>
                              <p className="text-xs opacity-75">{event.startTime} - {event.endTime}</p>
                            </div>
                            {getEventIcon(event.type)}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet View - Day by Day */}
        <div className="lg:hidden space-y-4">
          {weekDays.map((day, dayIndex) => {
            const dayEvents = getEventsForDay(day);
            
            return (
              <motion.div
                key={dayIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: dayIndex * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold">{day}</h3>
                      <p className="text-xs opacity-90">{dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''}</p>
                    </div>
                    <Calendar className="w-6 h-6 opacity-80" />
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  {dayEvents.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="w-12 h-12 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">No events scheduled</p>
                    </div>
                  ) : (
                    dayEvents.sort((a, b) => a.startTime.localeCompare(b.startTime)).map((event, eventIndex) => {
                      const typeBadge = getEventTypeBadge(event.type);
                      
                      return (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: eventIndex * 0.05 }}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                          className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-all"
                        >
                          <div className={`p-3 bg-gradient-to-r ${event.color} text-white`}>
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h4 className="font-bold text-sm">{event.title}</h4>
                                {event.className && (
                                  <p className="text-xs opacity-90">{event.className}</p>
                                )}
                              </div>
                              {getEventIcon(event.type)}
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{event.startTime} - {event.endTime}</span>
                              </div>
                              {event.isOnline && (
                                <div className="flex items-center space-x-1">
                                  <Video className="w-3 h-3" />
                                  <span>Online</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="p-3 bg-white">
                            <div className="flex items-center justify-between mb-2">
                              <div className={`px-2 py-1 rounded-full text-xs font-semibold ${typeBadge.color}`}>
                                {typeBadge.label}
                              </div>
                              {event.students && (
                                <div className="flex items-center space-x-1 text-xs text-gray-600">
                                  <Users className="w-3 h-3" />
                                  <span>{event.students} students</span>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center space-x-2 text-xs text-gray-600">
                              <MapPin className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">{event.location}</span>
                            </div>

                            {event.description && (
                              <p className="text-xs text-gray-600 mt-2">{event.description}</p>
                            )}

                            {/* Expanded Actions */}
                            <AnimatePresence>
                              {selectedEvent === event.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-3 pt-3 border-t border-gray-200 flex gap-2"
                                >
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      router.push(`/teacher/schedule/${event.id}/edit`);
                                    }}
                                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-all"
                                  >
                                    <Edit className="w-3 h-3" />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Handle delete
                                    }}
                                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-red-50 text-red-700 rounded-lg text-xs font-semibold hover:bg-red-100 transition-all"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                    <span>Delete</span>
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
        >
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {scheduleEvents.filter(e => e.type === 'class').length}
                </p>
                <p className="text-xs text-gray-600">Classes</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {scheduleEvents.filter(e => e.type === 'exam').length}
                </p>
                <p className="text-xs text-gray-600">Exams</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {scheduleEvents.filter(e => e.type === 'meeting').length}
                </p>
                <p className="text-xs text-gray-600">Meetings</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {scheduleEvents.filter(e => e.type === 'event').length}
                </p>
                <p className="text-xs text-gray-600">Events</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}