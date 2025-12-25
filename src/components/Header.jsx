import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';
import LanguageToggle from './LanguageToggle';
import DecryptedText from '../components/DecryptedText';


const Header = () => {
  const { t, language } = useContext(LanguageContext);

  const isRTL = language === 'ar';

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/" className={["logo-link", "cursor-target"].join(" ")}>
              <h1>
                <DecryptedText
                  text={t('siteTitle')}
                  animateOn='hover'
                  revealDirection={isRTL ? "right" : "left"}
                />
              </h1>
            </Link>
          </div>

          <nav className="nav">
            <ul className="nav-list">
              <li className="nav-item">
                <a href="#home" className="nav-link cursor-target">{t('nav.home')}</a>
              </li>
              <li className="nav-item">
                <a href="#about" className="nav-link cursor-target">{t('nav.about')}</a>
              </li>
              <li className="nav-item">
                <a href="#products" className="nav-link cursor-target">{t('nav.products')}</a>
              </li>
              <li className="nav-item">
                <a href="#contact" className="nav-link cursor-target">{t('nav.contact')}</a>
              </li>
            </ul>
          </nav>

          <LanguageToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;