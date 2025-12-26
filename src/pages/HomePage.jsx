import React, { useContext, useState, useEffect, useRef } from 'react';
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import ScrollTrigger from 'gsap/src/ScrollTrigger';
import { LanguageContext } from '../App';
import ProductSection from '../components/ProductSection';
import DecryptedText from '../components/DecryptedText';
import bgImage from '../assets/hangers-1850082_1920.jpg';
import mainImage from '../assets/main-23908470245.jpg';
import aboutImage from '../assets/office-230498230445.jpg';

const HomePage = () => {
  const { t, language } = useContext(LanguageContext);
  const homeRef = useRef(null);
  const containerRef = useRef(null);
  const parallaxRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "none", duration: 2 });

  const isRTL = language === 'ar';

  // 1. HERO SECTION TEXT ANIMATION ON PAGE LOAD
  useGSAP(() => {
    // Text slide-in animation on page load
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo("#home-hero-title",
      {
        xPercent: isRTL ? 150 : -150,
        opacity: 0,
        scale: 0.8
      },
      {
        xPercent: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        delay: 0.3
      }
    )
      .fromTo("#home-hero-desc",
        {
          xPercent: isRTL ? 100 : -100,
          opacity: 0,
          y: 30
        },
        {
          xPercent: 0,
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1
        },
        "-=0.8"
      );

    // // Pulsing animation for hero text
    // gsap.to("#home-hero-title", {
    //   y: -10,
    //   duration: 2,
    //   repeat: -1,
    //   yoyo: true,
    //   ease: "sine.inOut",
    //   delay: 2
    // });

  }, { scope: homeRef, dependencies: [language] });

  // 2. SNAPPING SMOOTH SECTIONS WITH PARALLAX BACKGROUND
  useGSAP(() => {
    // // Setup parallax background
    // gsap.to(parallaxRef.current, {
    //   backgroundPosition: isRTL ? "100% 0%" : "0% 0%",
    //   ease: "none",
    //   scrollTrigger: {
    //     trigger: containerRef.current,
    //     start: "top top",
    //     end: "bottom bottom",
    //     scrub: true,
    //     invalidateOnRefresh: true
    //   }
    // });

    // Create snap sections for About, Products, Contact
    const sections = gsap.utils.toArray(".snap-section");

    sections.forEach((section, index) => {
      // Each section gets a unique animation
      gsap.fromTo(section,
        {
          opacity: 0,
          y: 100,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            toggleActions: "play none none reverse",
            snap: {
              snapTo: 1 / (sections.length - 1),
              duration: { min: 0.3, max: 0.8 },
              delay: 0,
              ease: "power3.inOut"
            }
          }
        }
      );

      // Add subtle background color shift between sections
      if (section.id) {
        gsap.to(parallaxRef.current, {
          backgroundColor: index === 0 ? "#0a1929" :
            index === 1 ? "#1a2b3a" :
              index === 2 ? "#2c3e50" : "#34495e",
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            scrub: true
          }
        });
      }
    });

    // Smooth scrolling between sections with snap
    ScrollTrigger.create({
      snap: {
        snapTo: (progress, self) => {
          // Find closest section
          const sections = gsap.utils.toArray(".snap-section");
          const progressPerSection = 1 / (sections.length - 1);
          const closestIndex = Math.round(progress / progressPerSection);
          return closestIndex * progressPerSection;
        },
        duration: { min: 0.3, max: 0.8 },
        delay: 0,
        ease: "power3.inOut"
      },
      start: "top top",
      end: "max",
      // markers: true
    });

  }, { scope: containerRef, dependencies: [language] });

  // 3. INDIVIDUAL SECTION ANIMATIONS
  useGSAP(() => {
    // About section animation
    gsap.fromTo(".about-section .section-title",
      { rotation: isRTL ? -5 : 5, opacity: 0 },
      {
        rotation: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
          toggleActions: "play none none reverse"
        }
      }
    );

    // Contact section animations
    gsap.fromTo(".contact-item",
      {
        x: isRTL ? 50 : -50,
        opacity: 0,
        stagger: 0.2
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".contact-info",
          start: "top 70%",
          scrub: 1
        }
      }
    );

    // Form elements animation
    gsap.fromTo(".form-group",
      {
        y: 30,
        opacity: 0,
        stagger: 0.1
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 80%",
          scrub: 1
        }
      }
    );

  }, { dependencies: [language] });

  // Add parallax background styles
  // const parallaxStyle = {
  //   position: 'fixed',
  //   top: 0,
  //   left: 0,
  //   width: '100%',
  //   height: '100%',
  //   backgroundImage: `url(${bgImage})`,
  //   backgroundSize: 'cover',
  //   backgroundPosition: isRTL ? '100% 0%' : '0% 0%',
  //   backgroundAttachment: 'fixed',
  //   zIndex: -1,
  //   opacity: 0.15,
  //   filter: 'blur(1px) brightness(0.8)'
  // };

  return (
    <div className="home-page" dir={isRTL ? 'rtl' : 'ltr'} ref={containerRef}>
      {/* Parallax Background */}
      {/* <div id="parallaxBG" ref={parallaxRef} style={parallaxStyle} /> */}

      {/* Hero Section */}
      <section ref={homeRef} id="home" className="hero-section snap-section">
        <div className="container">
          <div className="hero-content">
            <div id="main-img-container">
              <img id="main-img" src={mainImage}></img>
            </div>
            <div id="main-text-container">
              <h1 className="hero-title" id="home-hero-title">
                <DecryptedText
                  text={t('home.welcome')}
                  animateOn='hover'
                  revealDirection={isRTL ? "right" : "left"}
                />
              </h1>
              <p className="hero-subtitle" id="home-hero-desc">
                {t('home.subtitle')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section snap-section">
        <div className="container">
          <div id="about-img-container">
            <img id="about-img" src={aboutImage}></img>
          </div>
          <h2 className="section-title">
            <DecryptedText
              text={t('about.title')}
              animateOn='hover'
              revealDirection={isRTL ? "right" : "left"}
              speed={t('about.title').length < 5 ? 150 : 50}
            />
          </h2>
          <div className="about-content">
            <p>
              {t('about.content')}
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <ProductSection />

      {/* Contact Section */}
      <section id="contact" className="contact-section snap-section">
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
      </section>
    </div>
  );
};

export default HomePage;