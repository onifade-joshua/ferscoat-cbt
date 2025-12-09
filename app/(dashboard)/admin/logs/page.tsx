"use client"

import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Search,
  Filter,
  Download,
  RefreshCw,
  Clock,
  User,
  Database,
  Shield,
  Zap,
  Server,
  Eye,
  X,
  ChevronDown,
  FileText,
  AlertCircle,
} from "lucide-react";

interface LogEntry {
  id: number;
  timestamp: string;
  level: "info" | "warning" | "error" | "success";
  category: "auth" | "database" | "api" | "system" | "user" | "security";
  message: string;
  user?: string;
  details?: string;
  ipAddress?: string;
  action?: string;
}

export default function SystemLogPage() {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [timeRange, setTimeRange] = useState("today");
  const [expandedLogs, setExpandedLogs] = useState<Set<number>>(new Set());

  const logs: LogEntry[] = [
    {
      id: 1,
      timestamp: "2025-12-07T14:32:15",
      level: "error",
      category: "database",
      message: "Database connection timeout",
      details: "Failed to connect to database after 3 retry attempts. Connection pool exhausted.",
      ipAddress: "192.168.1.10",
    },
    {
      id: 2,
      timestamp: "2025-12-07T14:30:42",
      level: "success",
      category: "auth",
      message: "User login successful",
      user: "john.doe@school.edu",
      action: "LOGIN",
      ipAddress: "192.168.1.25",
    },
    {
      id: 3,
      timestamp: "2025-12-07T14:28:18",
      level: "warning",
      category: "api",
      message: "API rate limit approaching",
      details: "Current usage: 950/1000 requests per hour. Consider upgrading plan.",
      ipAddress: "192.168.1.15",
    },
    {
      id: 4,
      timestamp: "2025-12-07T14:25:03",
      level: "info",
      category: "system",
      message: "System backup completed",
      details: "Daily backup completed successfully. Size: 2.3GB. Duration: 5m 32s",
    },
    {
      id: 5,
      timestamp: "2025-12-07T14:20:47",
      level: "error",
      category: "security",
      message: "Failed login attempt detected",
      user: "admin@school.edu",
      details: "Multiple failed login attempts (5) from suspicious IP address",
      ipAddress: "45.123.67.89",
      action: "FAILED_LOGIN",
    },
    {
      id: 6,
      timestamp: "2025-12-07T14:15:22",
      level: "success",
      category: "user",
      message: "New user registered",
      user: "sarah.jones@school.edu",
      action: "REGISTRATION",
      ipAddress: "192.168.1.42",
    },
    {
      id: 7,
      timestamp: "2025-12-07T14:10:55",
      level: "warning",
      category: "system",
      message: "High CPU usage detected",
      details: "CPU usage at 85% for the past 10 minutes. Consider scaling resources.",
    },
    {
      id: 8,
      timestamp: "2025-12-07T14:05:31",
      level: "info",
      category: "api",
      message: "External API call successful",
      details: "Successfully fetched exam questions from WAEC API. Retrieved 50 questions.",
    },
    {
      id: 9,
      timestamp: "2025-12-07T14:00:12",
      level: "error",
      category: "database",
      message: "Query execution failed",
      details: "Syntax error in SQL query. Table 'exam_results' does not exist.",
      user: "system",
    },
    {
      id: 10,
      timestamp: "2025-12-07T13:55:48",
      level: "success",
      category: "auth",
      message: "Password reset completed",
      user: "mike.wilson@school.edu",
      action: "PASSWORD_RESET",
      ipAddress: "192.168.1.33",
    },
  ];

  const stats = [
    {
      icon: Activity,
      label: "Total Logs",
      value: "1,247",
      change: "+12%",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      icon: XCircle,
      label: "Errors",
      value: "23",
      change: "-5%",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
    },
    {
      icon: AlertTriangle,
      label: "Warnings",
      value: "156",
      change: "+8%",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      icon: CheckCircle,
      label: "Success Rate",
      value: "98.2%",
      change: "+2.1%",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
  ];

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "error":
        return <XCircle className="w-4 h-4" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4" />;
      case "success":
        return <CheckCircle className="w-4 h-4" />;
      case "info":
        return <Info className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "error":
        return "bg-red-100 text-red-700 border-red-200";
      case "warning":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "success":
        return "bg-green-100 text-green-700 border-green-200";
      case "info":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "auth":
        return <Shield className="w-4 h-4" />;
      case "database":
        return <Database className="w-4 h-4" />;
      case "api":
        return <Zap className="w-4 h-4" />;
      case "system":
        return <Server className="w-4 h-4" />;
      case "user":
        return <User className="w-4 h-4" />;
      case "security":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "auth":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "database":
        return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case "api":
        return "bg-cyan-100 text-cyan-700 border-cyan-200";
      case "system":
        return "bg-slate-100 text-slate-700 border-slate-200";
      case "user":
        return "bg-pink-100 text-pink-700 border-pink-200";
      case "security":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleViewDetails = (log: LogEntry) => {
    setSelectedLog(log);
    setShowDetailsModal(true);
  };

  const toggleLogExpansion = (logId: number) => {
    const newExpanded = new Set(expandedLogs);
    if (newExpanded.has(logId)) {
      newExpanded.delete(logId);
    } else {
      newExpanded.add(logId);
    }
    setExpandedLogs(newExpanded);
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = filterLevel === "all" || log.level === filterLevel;
    const matchesCategory = filterCategory === "all" || log.category === filterCategory;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const handleExportLogs = () => {
    alert("Exporting logs as CSV...");
  };

  const handleRefresh = () => {
    alert("Refreshing logs...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  System Logs
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">
                  Monitor and track system activities
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <RefreshCw className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={handleExportLogs}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
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
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-600">{stat.label}</p>
                  <span className="text-xs text-green-600 font-semibold">{stat.change}</span>
                </div>
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
                placeholder="Search logs by message, category, or user..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              >
                <option value="all">All Levels</option>
                <option value="error">Error</option>
                <option value="warning">Warning</option>
                <option value="success">Success</option>
                <option value="info">Info</option>
              </select>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              >
                <option value="all">All Categories</option>
                <option value="auth">Authentication</option>
                <option value="database">Database</option>
                <option value="api">API</option>
                <option value="system">System</option>
                <option value="user">User</option>
                <option value="security">Security</option>
              </select>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Apply</span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {filteredLogs.length === 0 ? (
            <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
              <Activity className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No Logs Found</h3>
              <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div
                key={log.id}
                className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      <div className={`p-1.5 rounded-lg border ${getLevelColor(log.level)} flex-shrink-0 mt-0.5`}>
                        {getLevelIcon(log.level)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-sm sm:text-base font-semibold text-gray-900">{log.message}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getCategoryColor(log.category)} flex items-center gap-1`}>
                            {getCategoryIcon(log.category)}
                            {log.category}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(log.timestamp).toLocaleString()}
                          </span>
                          {log.user && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {log.user}
                              </span>
                            </>
                          )}
                          {log.ipAddress && (
                            <>
                              <span>•</span>
                              <span>{log.ipAddress}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleViewDetails(log)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-all flex-shrink-0"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  {log.details && (
                    <div className="ml-8">
                      <button
                        onClick={() => toggleLogExpansion(log.id)}
                        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold"
                      >
                        <ChevronDown
                          className={`w-3 h-3 transition-transform ${expandedLogs.has(log.id) ? "rotate-180" : ""}`}
                        />
                        {expandedLogs.has(log.id) ? "Hide" : "Show"} Details
                      </button>
                      {expandedLogs.has(log.id) && (
                        <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-700">{log.details}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {showDetailsModal && selectedLog && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowDetailsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Log Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <div className={`p-4 rounded-lg border-2 ${getLevelColor(selectedLog.level)}`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    {getLevelIcon(selectedLog.level)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{selectedLog.message}</h3>
                    <p className="text-sm capitalize">{selectedLog.level} Level</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Timestamp</h3>
                  <p className="text-sm text-gray-900">{new Date(selectedLog.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Category</h3>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(selectedLog.category)}`}>
                    {getCategoryIcon(selectedLog.category)}
                    {selectedLog.category}
                  </span>
                </div>
                {selectedLog.user && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">User</h3>
                    <p className="text-sm text-gray-900">{selectedLog.user}</p>
                  </div>
                )}
                {selectedLog.ipAddress && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">IP Address</h3>
                    <p className="text-sm text-gray-900 font-mono">{selectedLog.ipAddress}</p>
                  </div>
                )}
                {selectedLog.action && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Action</h3>
                    <p className="text-sm text-gray-900 font-mono">{selectedLog.action}</p>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Log ID</h3>
                  <p className="text-sm text-gray-900 font-mono">#{selectedLog.id}</p>
                </div>
              </div>

              {selectedLog.details && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Full Details</h3>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedLog.details}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => alert("Copying to clipboard...")}
                  className="flex-1 px-6 py-3 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Copy Details
                </button>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}