export const weeklyData = [
  { day: 'daySat', sugar: 105, pressure: 125, pressureLow: 80 },
  { day: 'daySun', sugar: 110, pressure: 128, pressureLow: 82 },
  { day: 'dayMon', sugar: 108, pressure: 132, pressureLow: 84 },
  { day: 'dayTue', sugar: 112, pressure: 126, pressureLow: 79 },
  { day: 'dayWed', sugar: 115, pressure: 138, pressureLow: 88 },
  { day: 'dayThu', sugar: 107, pressure: 130, pressureLow: 83 },
  { day: 'dayFri', sugar: 110, pressure: 130, pressureLow: 85 },
];

export const latestReadings = {
  sugar: { value: 110, unit: 'mg/dL', status: 'normal' as const },
  pressure: { value: '130/85', systolic: 130, diastolic: 85, status: 'warning' as const },
};

export const chatMessages = [
  { role: 'user' as const, text: 'أشعر بدوار' },
  { role: 'bot' as const, text: 'هل يمكنك قياس ضغط الدم الآن؟' },
];

export const sidebarItems = [
  { key: 'dashboard', icon: 'LayoutDashboard' },
  { key: 'readings', icon: 'ClipboardList' },
  { key: 'medicalHistory', icon: 'FileText' },
  { key: 'personalizedTips', icon: 'Lightbulb' },
  { key: 'aiAssistant', icon: 'Bot' },
  { key: 'settings', icon: 'Settings' },
];
