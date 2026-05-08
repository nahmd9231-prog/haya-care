import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center">
      <p className="text-sm text-gray-400">{t('footer')}</p>
    </footer>
  );
}
