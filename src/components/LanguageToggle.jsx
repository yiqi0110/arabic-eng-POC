import React, { useContext } from 'react';
import { LanguageContext } from '../App';

const LanguageToggle = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' }
  ];

  return (
    <div className="language-toggle">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`language-btn cursor-target ${language === lang.code ? 'active' : ''}`}
          aria-label={`Switch to ${lang.name}`}
        >
          <span className="flag">{lang.flag}</span>
          <span className="language-name">{lang.name}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;