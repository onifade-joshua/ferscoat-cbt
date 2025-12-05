'use client';

import { useState, useEffect } from 'react';
import {
  X,
  Settings,
  Shield,
  BarChart3,
  Users,
  Cookie,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';

// ---------------------------
// TYPES
// ---------------------------

type CookiePreferenceKeys = 'necessary' | 'analytics' | 'marketing' | 'functional';

type CookiePreferencesType = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
};

type CookieCategory = {
  id: CookiePreferenceKeys;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  required: boolean;
};

type StoredConsent = {
  preferences: CookiePreferencesType;
  timestamp: string;
  version: string;
};

const CookiePreferences = () => {
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [hasConsent, setHasConsent] = useState<boolean>(false);
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  const [preferences, setPreferences] = useState<CookiePreferencesType>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  // ---------------------------------
  // Prevent SSR crash & load settings
  // ---------------------------------
  useEffect(() => {
    setHasMounted(true);

    const storedConsent = localStorage.getItem('cookieConsent');
    if (!storedConsent) {
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }

    try {
      const parsed: StoredConsent = JSON.parse(storedConsent);
      setPreferences(parsed.preferences);
      setHasConsent(true);
    } catch (error) {
      console.error('Failed to parse stored consent:', error);
    }
  }, []);

  // --------------------------
  // ACTION HANDLERS
  // --------------------------

  const handleAcceptAll = () => {
    const newPreferences: CookiePreferencesType = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    savePreferences(newPreferences);
  };

  const handleRejectAll = () => {
    const newPreferences: CookiePreferencesType = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    savePreferences(newPreferences);
  };

  const handleSaveCustom = () => {
    savePreferences(preferences);
  };

  const savePreferences = (prefs: CookiePreferencesType) => {
    const consentData: StoredConsent = {
      preferences: prefs,
      timestamp: new Date().toISOString(),
      version: '1.0',
    };

    localStorage.setItem('cookieConsent', JSON.stringify(consentData));

    setShowBanner(false);
    setIsExpanded(false);
    setShowDetails(false);
    setHasConsent(true);

    if (prefs.analytics) console.log('Analytics cookies enabled');
    if (prefs.marketing) console.log('Marketing cookies enabled');
    if (prefs.functional) console.log('Functional cookies enabled');
  };

  const handlePreferenceChange = (type: CookiePreferenceKeys) => {
    setPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
    if (!isExpanded) setShowDetails(false);
  };

  // --------------------------
  // COOKIE CATEGORIES
  // --------------------------
  const cookieCategories: CookieCategory[] = [
    {
      id: 'necessary',
      title: 'Necessary Cookies',
      description: 'Essential for site functionality.',
      icon: Shield,
      required: true,
    },
    {
      id: 'functional',
      title: 'Functional Cookies',
      description: 'Enhance functionality and personalization.',
      icon: Settings,
      required: false,
    },
    {
      id: 'analytics',
      title: 'Analytics Cookies',
      description: 'Understand how visitors interact.',
      icon: BarChart3,
      required: false,
    },
    {
      id: 'marketing',
      title: 'Marketing Cookies',
      description: 'Track visitors across websites.',
      icon: Users,
      required: false,
    },
  ];

  if (!hasMounted) return null;

  return (
    <>
      {/* Floating Cookie Button */}
      {(hasConsent || !showBanner) && !isExpanded && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={toggleExpanded}
            className="group bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/25 hover:scale-110 transition-all duration-300"
          >
            <Cookie className="w-6 h-6" />
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
              !
            </div>
          </button>
        </div>
      )}

      {/* Cookie Banner */}
      {showBanner && !hasConsent && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]">
          <div className="bg-white/95 backdrop-blur-lg border rounded-2xl shadow-2xl">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <Cookie className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900">We use cookies</h3>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                We use cookies to enhance your browsing experience and analyze traffic.
              </p>

              <button
                onClick={handleAcceptAll}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition"
              >
                Accept All
              </button>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleRejectAll}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200"
                >
                  Reject All
                </button>
                <button
                  onClick={() => setIsExpanded(true)}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:border-gray-400"
                >
                  Customize
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expanded Modal */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-6">
          <div className="w-full max-w-2xl">
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                    <Cookie className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Cookie Preferences</h2>
                    <p className="text-sm text-gray-600">Manage your cookie settings</p>
                  </div>
                </div>
                <button onClick={toggleExpanded} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 max-h-96 overflow-y-auto">
                {/* Quick Actions */}
                {!showDetails && (
                  <>
                    <button
                      onClick={handleAcceptAll}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold mb-3"
                    >
                      Accept All Cookies
                    </button>

                    <div className="flex gap-3 mb-6">
                      <button
                        onClick={handleRejectAll}
                        className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
                      >
                        Reject All
                      </button>
                      <button
                        onClick={() => setShowDetails(true)}
                        className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg flex items-center justify-center gap-2"
                      >
                        Customize <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}

                {/* Detailed Controls */}
                {showDetails && (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Customize Preferences</h3>
                      <button
                        onClick={() => setShowDetails(false)}
                        className="text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm"
                      >
                        <ChevronUp className="w-4 h-4" /> Collapse
                      </button>
                    </div>

                    {cookieCategories.map((category) => {
                      const Icon = category.icon;

                      return (
                        <div
                          key={category.id}
                          className="border border-gray-200 rounded-lg p-4 mb-3"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-gray-100 rounded-lg">
                                <Icon className="w-4 h-4 text-gray-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-sm text-gray-900">
                                  {category.title}
                                </h4>
                                {category.required && (
                                  <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">
                                    Required
                                  </span>
                                )}
                              </div>
                            </div>

                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={preferences[category.id]}
                                disabled={category.required}
                                onChange={() =>
                                  !category.required &&
                                  handlePreferenceChange(category.id)
                                }
                              />
                              <div
                                className={`w-9 h-5 rounded-full transition-colors ${
                                  category.required
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : preferences[category.id]
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                                    : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                              >
                                <div
                                  className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                                    preferences[category.id]
                                      ? 'translate-x-4'
                                      : 'translate-x-0'
                                  }`}
                                />
                              </div>
                            </label>
                          </div>

                          <p className="text-xs text-gray-600">{category.description}</p>
                        </div>
                      );
                    })}

                    <button
                      onClick={handleSaveCustom}
                      className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                      Save Preferences
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookiePreferences;
