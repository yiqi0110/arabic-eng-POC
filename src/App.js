import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import TargetCursor from './components/TargetCursor';
import CardNav from './components/CardNav';
import HomePage from './pages/HomePage';
import TestScroll from './pages/TestScroll';
import en from './locales/en.json';
import ar from './locales/ar.json';
import ja from './locales/ja.json';
import './styles.css';
import PageNotFound from './pages/PageNotFound';


// Create translations object
const translations = { en, ar, ja };

// Grab Users browser language
const userLanguage = localStorage.getItem('language') ?? (navigator.language.substring(0, 2) || navigator.userLanguage?.substring(0, 2) || "en");

// Create context for language
export const LanguageContext = createContext();

function App() {
  const [language, setLanguage] = useState(userLanguage);

  // Load saved language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        // Fallback to English if translation not found
        let fallbackValue = translations.en;
        for (const fallbackKey of keys) {
          fallbackValue = fallbackValue[fallbackKey];
        }
        return fallbackValue || key;
      }
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <Router>
        <div className="app">
          <TargetCursor
            spinDuration={2}
            hideDefaultCursor={true}
            parallaxOn={true}
          />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* <Route path="/testScroll" element={<TestScroll />} /> */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageContext.Provider>
  );
}

export default App;