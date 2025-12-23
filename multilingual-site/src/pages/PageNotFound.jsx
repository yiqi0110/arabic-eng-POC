import { useContext } from 'react';
import { LanguageContext } from '../App';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  const { t, language } = useContext(LanguageContext);

  const isRTL = language === 'ar';

  return (
    <div className="home-page" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">{t('error.pageNotFound.title')}</h1>
            <p className="hero-subtitle">{t('error.pageNotFound.description')}</p>
            <Link to="/">{t('error.pageNotFound.returnText')}</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageNotFound;