import { Pill, AlertCircle, User, Calendar, Stethoscope } from 'lucide-react';
import Card from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import { useApp } from "@/context/AppContext";
import { medicalHistory } from "@/utils/mockData";

const medicationColors: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  orange: 'bg-orange-100 text-orange-700',
};

export default function MedicalHistory() {
  const { tr, isRTL, lang } = useApp();
  const { patient, diagnoses, medications, allergies, doctor } = medicalHistory;

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div className={isRTL ? 'text-right' : ''}>
        <h1 className="text-2xl font-bold text-gray-900">{tr.medicalHistoryTitle}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{isRTL ? 'ملفك الطبي الشامل' : 'Your comprehensive medical file'}</p>
      </div>

      {/* Patient info */}
      <Card className="p-5">
        <div className={`flex items-center gap-4 mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <img
            src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=120"
            alt="Patient"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-100 shadow-sm"
          />
          <div className={isRTL ? 'text-right' : ''}>
            <p className="text-lg font-bold text-gray-900">
              {lang === 'ar' ? patient.name : patient.nameEn}
            </p>
            <div className={`flex items-center gap-3 text-sm text-gray-500 mt-1 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {tr.age}: {patient.age}
              </span>
              <span className="text-gray-300">|</span>
              <span>{tr.male}</span>
              <span className="text-gray-300">|</span>
              <span>{lang === 'ar' ? 'فصيلة الدم' : 'Blood Type'}: {patient.bloodType}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Diagnoses */}
      <Card className="p-5">
        <div className={`flex items-center gap-2.5 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
            <Stethoscope className="w-4 h-4 text-blue-500" />
          </div>
          <h2 className="text-base font-bold text-gray-900">{tr.diagnosis}</h2>
        </div>
        <div className="space-y-3">
          {diagnoses.map((d) => (
            <div key={d.id} className={`flex items-center justify-between p-3.5 bg-gray-50 rounded-xl ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={isRTL ? 'text-right' : ''}>
                <p className="text-sm font-semibold text-gray-800">
                  {lang === 'ar' ? d.nameAr : d.nameEn}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {isRTL ? `منذ ${d.since}` : `Since ${d.since}`}
                </p>
              </div>
              <StatusBadge status={d.severity as 'normal' | 'slightlyHigh'} />
            </div>
          ))}
        </div>
      </Card>

      {/* Medications */}
      <Card className="p-5">
        <div className={`flex items-center gap-2.5 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center">
            <Pill className="w-4 h-4 text-green-500" />
          </div>
          <h2 className="text-base font-bold text-gray-900">{tr.medications}</h2>
        </div>
        <div className="space-y-3">
          {medications.map((med) => (
            <div key={med.id} className={`flex items-center gap-4 p-3.5 bg-gray-50 rounded-xl ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`px-2.5 py-1.5 rounded-lg text-xs font-bold ${medicationColors[med.color]}`}>
                {med.dose}
              </div>
              <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                <p className="text-sm font-semibold text-gray-800">
                  {lang === 'ar' ? med.nameAr : med.nameEn}
                </p>
                <div className={`flex items-center gap-1 text-xs text-gray-400 mt-0.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Calendar className="w-3 h-3" />
                  {med.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Allergies */}
      <Card className="p-5">
        <div className={`flex items-center gap-2.5 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center">
            <AlertCircle className="w-4 h-4 text-red-500" />
          </div>
          <h2 className="text-base font-bold text-gray-900">{tr.allergies}</h2>
        </div>
        <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {allergies.map((a) => (
            <span key={a.id} className="px-3.5 py-1.5 bg-red-50 text-red-600 text-sm font-semibold rounded-xl border border-red-100">
              {lang === 'ar' ? a.nameAr : a.nameEn}
            </span>
          ))}
        </div>
      </Card>

      {/* Doctor */}
      <Card className="p-5">
        <div className={`flex items-center gap-2.5 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-8 h-8 bg-teal-50 rounded-xl flex items-center justify-center">
            <User className="w-4 h-4 text-teal-500" />
          </div>
          <h2 className="text-base font-bold text-gray-900">{tr.doctor}</h2>
        </div>
        <div className={`flex items-center gap-4 p-4 bg-teal-50/50 rounded-xl border border-teal-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Stethoscope className="w-5 h-5 text-teal-600" />
          </div>
          <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
            <p className="text-sm font-bold text-gray-900">
              {lang === 'ar' ? doctor.nameAr : doctor.nameEn}
            </p>
            <p className="text-xs text-teal-600 font-medium mt-0.5">{doctor.specialty}</p>
            <div className={`flex gap-4 mt-2 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-xs text-gray-500">
                {tr.lastVisit}: <span className="font-semibold text-gray-700">{doctor.lastVisit}</span>
              </span>
              <span className="text-xs text-gray-500">
                {tr.nextVisit}: <span className="font-semibold text-blue-600">{doctor.nextVisit}</span>
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
