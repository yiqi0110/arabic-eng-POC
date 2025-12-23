import React, { useContext } from 'react';
import { LanguageContext } from '../App';
import ProductSection from '../components/ProductSection';
import DecryptedText from '../components/DecryptedText';

const HomePage = () => {
  const { t, language } = useContext(LanguageContext);

  const isRTL = language === 'ar';
  // const isTTB = language === 'ja'; // TODO: add top-to-bottom for japanese language, maybe...

  return (
    <div className="home-page" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <DecryptedText
                text={t('home.welcome')}
                animateOn='hover'
                revealDirection={isRTL ? "right" : "left"}
              />
            </h1>
            <p className="hero-subtitle">{t('home.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <h2 className="section-title">
            <DecryptedText
              text={t('about.title')}
              animateOn='hover'
              revealDirection={isRTL ? "right" : "left"}
            />
          </h2>
          <div className="about-content">
            <p>{t('about.content')}</p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <ProductSection />

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title">
            <DecryptedText
              text={t('contact.title')}
              animateOn='hover'
              revealDirection={isRTL ? "right" : "left"}
            />
          </h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <h3>{t('contact.email')}</h3>
                <p>info@globalstore.com</p>
              </div>
              <div className="contact-item">
                <h3>{t('contact.phone')}</h3>
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="contact-item">
                <h3>{t('contact.address')}</h3>
                <p>123 Global Street, World City, WC 10001</p>
              </div>
            </div>

            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">{t('contact.form.name')}</label>
                <input type="text" id="name" placeholder={t('contact.form.name')} />
              </div>
              <div className="form-group">
                <label htmlFor="email">{t('contact.form.email')}</label>
                <input type="email" id="email" placeholder={t('contact.form.email')} />
              </div>
              <div className="form-group">
                <label htmlFor="message">{t('contact.form.message')}</label>
                <textarea id="message" rows="4" placeholder={t('contact.form.message')}></textarea>
              </div>
              <button type="submit" className="submit-btn">
                {t('contact.form.send')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;