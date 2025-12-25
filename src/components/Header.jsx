import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';
import LanguageToggle from './LanguageToggle';
import DecryptedText from '../components/DecryptedText';
import CardNav from './CardNav';


const NavLinks = ({
  linkDest,
  linkText
}) => {
  return (
    <>
      <Link to={linkDest}>{linkText}</Link>
    </>
  )
}


const Header = () => {
  const { t, language } = useContext(LanguageContext);

  const items = [
    {
      label: "Us",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: t('nav.about'), ariaLabel: t('nav.about'), href: "/#about" },
        { label: t('nav.contact'), ariaLabel: t('nav.contact'), href: "/#contact" }
      ]
    },
    {
      label: t('nav.products'),
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: t('products.mens'), ariaLabel: t('products.mens') },
        { label: t('products.womens'), ariaLabel: t('products.womens') },
        { label: t('products.kids'), ariaLabel: t('products.kids') },
        { label: t('products.lifestyle'), ariaLabel: t('products.lifestyle') }
      ]
    },
    {
      label: "Languages",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "English", ariaLabel: "English", langCode: "en"},
        { label: "العربية", ariaLabel: "العربية", langCode: "ar" },
        { label: "日本語", ariaLabel: "日本語", langCode: "ja" }
      ]
    }
  ];

  const isRTL = language === 'ar';

  return (
    <header className="header">
      {/* <div className="container"> */}
        <div className="header-content">
          <CardNav
            items={items}
            baseColor="#fff"
            menuColor="#000"
            buttonBgColor="#111"
            buttonTextColor="#fff"
            ease="power3.out"
          />
        </div>
      {/* </div> */}
    </header>
    //       <div className="logo">
    //         <Link to="/" className={["logo-link", "cursor-target"].join(" ")}>
    //           <h1>
    //             <DecryptedText
    //               text={t('siteTitle')}
    //               animateOn='hover'
    //               className='cursor-target'
    //               revealDirection={isRTL ? "right" : "left"}
    //             />
    //           </h1>
    //         </Link>
    //       </div>

    //       <nav className="nav">
    //         <ul className="nav-list">
    //           <li className="nav-item">
    //             <a href="#home" className="nav-link cursor-target">{t('nav.home')}</a>
    //           </li>
    //           <li className="nav-item">
    //             <a href="#about" className="nav-link cursor-target">{t('nav.about')}</a>
    //           </li>
    //           <li className="nav-item">
    //             <a href="#products" className="nav-link cursor-target">{t('nav.products')}</a>
    //           </li>
    //           <li className="nav-item">
    //             <a href="#contact" className="nav-link cursor-target">{t('nav.contact')}</a>
    //           </li>
    //         </ul>
    //       </nav>

    //       <LanguageToggle />
  );
};

export default Header;