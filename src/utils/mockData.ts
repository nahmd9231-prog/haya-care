export const weeklyBloodSugar = [
  { day: 'mon', value: 108, normalMin: 70, normalMax: 130 },
  { day: 'tue', value: 115, normalMin: 70, normalMax: 130 },
  { day: 'wed', value: 122, normalMin: 70, normalMax: 130 },
  { day: 'thu', value: 105, normalMin: 70, normalMax: 130 },
  { day: 'fri', value: 118, normalMin: 70, normalMax: 130 },
  { day: 'sat', value: 110, normalMin: 70, normalMax: 130 },
  { day: 'sun', value: 112, normalMin: 70, normalMax: 130 },
];

export const weeklyBloodPressure = [
  { day: 'mon', systolic: 122, diastolic: 80 },
  { day: 'tue', systolic: 125, diastolic: 82 },
  { day: 'wed', systolic: 128, diastolic: 83 },
  { day: 'thu', systolic: 130, diastolic: 85 },
  { day: 'fri', systolic: 126, diastolic: 81 },
  { day: 'sat', systolic: 124, diastolic: 80 },
  { day: 'sun', systolic: 127, diastolic: 82 },
];

export const latestReadings = [
  {
    id: 1,
    type: 'bloodSugarFasting',
    value: '110 mg/dL',
    rawValue: 110,
    unit: 'mg/dL',
    status: 'normal',
    time: '07:30',
  },
  {
    id: 2,
    type: 'bloodPressure',
    value: '130/85 mmHg',
    rawValue: 130,
    unit: 'mmHg',
    status: 'slightlyHigh',
    time: '08:00',
  },
  {
    id: 3,
    type: 'heartRate',
    value: '74 bpm',
    rawValue: 74,
    unit: 'bpm',
    status: 'normal',
    time: '08:00',
  },
  {
    id: 4,
    type: 'oxygen',
    value: '98%',
    rawValue: 98,
    unit: '%',
    status: 'normal',
    time: '08:05',
  },
];

export const readingsHistory = [
  { id: 1, date: '2026-05-02', type: 'bloodSugarFasting', value: '110 mg/dL', status: 'normal' },
  { id: 2, date: '2026-05-02', type: 'bloodPressure', value: '130/85 mmHg', status: 'slightlyHigh' },
  { id: 3, date: '2026-05-01', type: 'bloodSugarFasting', value: '105 mg/dL', status: 'normal' },
  { id: 4, date: '2026-05-01', type: 'bloodPressure', value: '128/82 mmHg', status: 'normal' },
  { id: 5, date: '2026-04-30', type: 'bloodSugarFasting', value: '118 mg/dL', status: 'normal' },
  { id: 6, date: '2026-04-30', type: 'heartRate', value: '72 bpm', status: 'normal' },
  { id: 7, date: '2026-04-29', type: 'bloodPressure', value: '135/88 mmHg', status: 'slightlyHigh' },
  { id: 8, date: '2026-04-29', type: 'bloodSugarFasting', value: '122 mg/dL', status: 'normal' },
  { id: 9, date: '2026-04-28', type: 'oxygen', value: '97%', status: 'normal' },
  { id: 10, date: '2026-04-28', type: 'bloodPressure', value: '126/80 mmHg', status: 'normal' },
];

export const medicalHistory = {
  patient: {
    name: 'ناصر عبدالشافي خضير',
    nameEn: 'Nasser Abd_Elshafi Khodair',
    age: 53,
    gender: 'male',
    phone: '01208781276',
    nationalId: '5448526955145555',
    bloodType: 'A+',
  },
  diagnoses: [
    { id: 1, nameAr: 'ارتفاع ضغط الدم', nameEn: 'Hypertension', since: '2018', severity: 'slightlyHigh' },
    { id: 2, nameAr: 'السكري من النوع الثاني', nameEn: 'Type 2 Diabetes', since: '2020', severity: 'normal' },
  ],
  medications: [
    { id: 1, nameAr: 'أملوديبين 5 ملغ', nameEn: 'Amlodipine 5mg', dose: '1x', time: '9:00 AM', color: 'blue' },
    { id: 2, nameAr: 'ميتفورمين 500 ملغ', nameEn: 'Metformin 500mg', dose: '2x', time: '8:00 AM & 8:00 PM', color: 'green' },
    { id: 3, nameAr: 'أسبرين 81 ملغ', nameEn: 'Aspirin 81mg', dose: '1x', time: '9:00 AM', color: 'orange' },
  ],
  allergies: [
    { id: 1, nameAr: 'البنسلين', nameEn: 'Penicillin' },
    { id: 2, nameAr: 'الكودين', nameEn: 'Codeine' },
  ],
  doctor: {
    nameAr: 'د. محمد مشرف',
    nameEn: 'Dr. Mohamed Meshref',
    specialty: 'Internal Medicine',
    lastVisit: '2026-04-15',
    nextVisit: '2026-05-15',
  },
};

export const personalizedTips = [
  {
    id: 1,
    category: 'nutrition',
    icon: 'Salad',
    titleAr: 'التغذية الصحية',
    titleEn: 'Healthy Nutrition',
    contentAr: 'الأطعمة الغنية بالألياف تساعد على استقرار السكر مثل الشوفان والخضروات الورقية',
    contentEn: 'Fiber-rich foods help stabilize blood sugar, such as oats and leafy greens',
    priority: 'high',
  },
  {
    id: 2,
    category: 'hydration',
    icon: 'Droplets',
    titleAr: 'الترطيب',
    titleEn: 'Hydration',
    contentAr: 'اشرب 8 أكواب من الماء يومياً للمساعدة في تنظيم ضغط الدم',
    contentEn: 'Drink 8 glasses of water daily to help regulate blood pressure',
    priority: 'high',
  },
  {
    id: 3,
    category: 'exercise',
    icon: 'Activity',
    titleAr: 'النشاط البدني',
    titleEn: 'Physical Activity',
    contentAr: 'المشي 30 دقيقة يومياً يساعد على تحسين حساسية الإنسولين وضبط الضغط',
    contentEn: 'Walking 30 minutes daily improves insulin sensitivity and controls pressure',
    priority: 'medium',
  },
  {
    id: 4,
    category: 'sleep',
    icon: 'Moon',
    titleAr: 'النوم الجيد',
    titleEn: 'Quality Sleep',
    contentAr: 'حافظ على 7-8 ساعات نوم منتظمة لتحسين التحكم في السكر والضغط',
    contentEn: 'Maintain 7-8 hours of regular sleep to improve sugar and pressure control',
    priority: 'medium',
  },
  {
    id: 5,
    category: 'stress',
    icon: 'Heart',
    titleAr: 'إدارة التوتر',
    titleEn: 'Stress Management',
    contentAr: 'تقنيات الاسترخاء مثل التنفس العميق تساعد على خفض ضغط الدم',
    contentEn: 'Relaxation techniques like deep breathing help lower blood pressure',
    priority: 'low',
  },
  {
    id: 6,
    category: 'medication',
    icon: 'Pill',
    titleAr: 'الالتزام بالدواء',
    titleEn: 'Medication Adherence',
    contentAr: 'تناول أدويتك في نفس الوقت كل يوم لضمان فعاليتها القصوى',
    contentEn: 'Take your medications at the same time every day for maximum effectiveness',
    priority: 'high',
  },
];

export const initialChatMessages = [
  {
    id: 1,
    sender: 'bot',
    textAr: 'مرحباً بك! أنا مساعدك الصحي الذكي ، تم تطويري بواسطة المهندس أحمد ناصر خضير ، كيف تشعر اليوم؟',
    textEn: 'Welcome! I am your smart health assistant , i was developed by Eng / Ahmed Nasser Khodair , How are you feeling today?',
    time: '08:00',
  },
  {
    id: 2,
    sender: 'user',
    textAr: 'أشعر بدوار',
    textEn: 'I feel dizzy',
    time: '08:01',
  },
  {
    id: 3,
    sender: 'bot',
    textAr: 'أفهم قلقك. هل يمكنك قياس ضغط الدم الآن؟ الدوار قد يكون مرتبطاً بارتفاع أو انخفاض الضغط.',
    textEn: 'I understand your concern. Can you measure your blood pressure now? Dizziness may be related to high or low blood pressure.',
    time: '08:01',
  },
];

export const notifications = [
  {
    id: 1,
    type: 'warning',
    titleAr: 'تنبيه: ضغط الدم مرتفع قليلاً',
    titleEn: 'Alert: Blood pressure slightly high',
    time: '08:00',
    read: false,
  },
  {
    id: 2,
    type: 'reminder',
    titleAr: 'تذكير: حان وقت دواء الأملوديبين',
    titleEn: 'Reminder: Time for Amlodipine medication',
    time: '09:00',
    read: false,
  },
  {
    id: 3,
    type: 'tip',
    titleAr: 'نصيحة: اشرب كوب ماء الآن',
    titleEn: 'Tip: Drink a glass of water now',
    time: '10:30',
    read: true,
  },
];
