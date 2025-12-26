import React, { useContext, useState, useEffect } from 'react';
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import ScrollTrigger from 'gsap/src/ScrollTrigger';
import { LanguageContext } from '../App';
import ProductSection from '../components/ProductSection';
import DecryptedText from '../components/DecryptedText';
// import ScrambledText from '../components/ScrambledText';

const HomePage = () => {
  // const [scrambleChar, setScrambleChar] = useState('*');
  const { t, language } = useContext(LanguageContext);

  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ease: "none", duration: 2});

  const isRTL = language === 'ar';

  useGSAP(() => {
    // const tl = gsap.timeline();

    // tl.from("#home", {xPercent: -100})
    // .from("#about", {xPercent: 100})
    // .from("#products", {yPercent: -100})
    // .from("#contact", {yPercent: 100})
    
    // ScrollTrigger.create({
    //   animation: tl,
    //   trigger: ".home-page",
    //   start: "top top",
    //   end: "+=4000",
    //   scrub: true,
    //   pin: true,
    //   anticipatePin: 1
    // })
  }, [])
 
  // useEffect(() => {
  //   switch (language) {
  //     case 'ar':
  //       setScrambleChar('ري');
  //       break;
  //     case 'ja':
  //       setScrambleChar('グス');
  //       break;
  //     default:
  //       setScrambleChar('GS');
  //       break;
  //   }
  // }, [language])

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
            <p className="hero-subtitle">
              {t('home.subtitle')}
              {/* <a href="/TestScroll" className="cursor-target">test</a> */}
            </p>
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
              speed={t('about.title').length < 5 ? 150 : 50}
            />
          </h2>
          <div className="about-content">
            {/* <ScrambledText
              radius={20}
              duration={1.2}
              speed={.25}
              scrambleChars={scrambleChar}>
              {t('about.content')}
            </ScrambledText> POSSIBLE UPGRADE FOR LATER. */}

            <p>
              {t('about.content')}
            </p>
          </div>
        </div>
      </section >

      {/* Products Section */}
      < ProductSection />

      {/* Contact Section */}
      < section id="contact" className="contact-section" >
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
                <input type="text" id="name" placeholder={t('contact.form.name')} className="cursor-target" />
              </div>
              <div className="form-group">
                <label htmlFor="email">{t('contact.form.email')}</label>
                <input type="email" id="email" placeholder={t('contact.form.email')} className="cursor-target" />
              </div>
              <div className="form-group">
                <label htmlFor="message">{t('contact.form.message')}</label>
                <textarea id="message" rows="4" placeholder={t('contact.form.message')} className="cursor-target"></textarea>
              </div>
              <button type="submit" className="submit-btn cursor-target">
                {t('contact.form.send')}
              </button>
            </form>
          </div>
        </div>
      </section >
    </div >
  );
};

export default HomePage;