import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './CardNav.css';
import { LanguageContext } from '../App';
import DecryptedText from './DecryptedText';
import LanguageToggle from './LanguageToggle';

const CardNav = ({
    logo,
    logoAlt = 'Logo',
    items,
    className = '',
    ease = 'power3.out',
    baseColor = '#fff',
    menuColor,
    buttonBgColor,
    buttonTextColor
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t, language, setLanguage } = useContext(LanguageContext);
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const langRef = useRef(language);
    const navRef = useRef(null);
    const cardsRef = useRef([]);
    const tlRef = useRef(null);

    const isRTL = language === 'ar';

    const smartNavigate = (path, hash = null) => {
        const isHomePage = location.pathname === '/';

        if (hash) {
            if (isHomePage) {
                // On home page, scroll to section
                const element = document.getElementById(hash);
                console.log(hash, element)
                if (element) {
                    toggleMenu();
                    gsap.to(window, { duration: 1, scrollTo: { y: `#${hash}`, offsetY: 120 } });
                }
            } else {
                // Not on home page, navigate to home with hash
                navigate(`/#${hash}`);
                // Then let the home page handle the scroll when it loads
            }
        } else {
            // Regular navigation
            navigate(path);
        }
    };

    const calculateHeight = () => {
        const navEl = navRef.current;
        if (!navEl) return 260;

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (isMobile) {
            const contentEl = navEl.querySelector('.card-nav-content');
            if (contentEl) {
                const wasVisible = contentEl.style.visibility;
                const wasPointerEvents = contentEl.style.pointerEvents;
                const wasPosition = contentEl.style.position;
                const wasHeight = contentEl.style.height;

                contentEl.style.visibility = 'visible';
                contentEl.style.pointerEvents = 'auto';
                contentEl.style.position = 'static';
                contentEl.style.height = 'auto';

                // contentEl.offsetHeight;

                const topBar = 60;
                const padding = 16;
                const contentHeight = contentEl.scrollHeight;

                contentEl.style.visibility = wasVisible;
                contentEl.style.pointerEvents = wasPointerEvents;
                contentEl.style.position = wasPosition;
                contentEl.style.height = wasHeight;

                return topBar + contentHeight + padding;
            }
        }
        return 260;
    };

    const createTimeline = () => {
        const navEl = navRef.current;
        if (!navEl) return null;

        gsap.set(navEl, { height: 60, overflow: 'hidden' });
        gsap.set(cardsRef.current, { y: 50, opacity: 0 });

        const tl = gsap.timeline({ paused: true });

        tl.to(navEl, {
            height: calculateHeight,
            duration: 0.4,
            ease
        });

        tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

        return tl;
    };

    useLayoutEffect(() => {
        const tl = createTimeline();
        tlRef.current = tl;

        return () => {
            tl?.kill();
            tlRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ease, items]);

    useLayoutEffect(() => {
        const handleResize = () => {
            if (!tlRef.current) return;

            if (isExpanded) {
                const newHeight = calculateHeight();
                gsap.set(navRef.current, { height: newHeight });

                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    newTl.progress(1);
                    tlRef.current = newTl;
                }
            } else {
                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    tlRef.current = newTl;
                }
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isExpanded]);

    const toggleMenu = () => {
        const tl = tlRef.current;
        // console.log(isExpanded, isHamburgerOpen, tl)
        if (!tl) return;
        if (!isExpanded) {
            setIsHamburgerOpen(true);
            setIsExpanded(true);
            tl.play(0);
        } else {
            setIsHamburgerOpen(false);
            tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
            tl.reverse();
        }
    };

    const setCardRef = i => el => {
        if (el) cardsRef.current[i] = el;
    };

    const handleLanguageClick = (langCode) => {
        toggleMenu();
        langRef.current = langCode;
        return false;
    }

    useEffect(() => {
        if ((language !== langRef) && isExpanded === false && isHamburgerOpen === false) {
            setLanguage(langRef.current);
        }
    }, [isExpanded, isHamburgerOpen])

    return (
        <div className={`card-nav-container ${className}`}>
            <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`} style={{ backgroundColor: baseColor }}>
                <div className="card-nav-top">
                    <div
                        className={`hamburger-menu cursor-target ${isHamburgerOpen ? 'open' : ''}`}
                        onClick={toggleMenu}
                        role="button"
                        aria-label={isExpanded ? 'Close menu' : 'Open menu'}
                        tabIndex={0}
                        style={{ color: menuColor || '#000' }}
                    >
                        <div className="hamburger-line" />
                        <div className="hamburger-line" />
                    </div>

                    <div className="logo-container">
                        <div onClick={() => smartNavigate('/')} className='cursor-target'>
                            <DecryptedText
                                text='Brand Naem'
                                animateOn='hover'
                                revealDirection={isRTL ? "right" : "left"}
                            />
                        </div>
                    </div>
                </div>

                <div className="card-nav-content" aria-hidden={!isExpanded}>
                    {(items || []).slice(0, 3).map((item, idx) => (
                        <div
                            key={`${item.label}-${idx}`}
                            className="nav-card"
                            ref={setCardRef(idx)}
                            style={{ backgroundColor: item.bgColor, color: item.textColor }}
                        >
                            <div className="nav-card-label">{item.label}</div>
                            <div className="nav-card-links">
                                {item.links?.map((lnk, i) => {
                                    if (lnk.langCode) {
                                        return (
                                            <div
                                                key={`${lnk.langCode}-${i}`}
                                                className="cursor-target"
                                                aria-label={`Switch to ${lnk.label}`}
                                                onClick={() => handleLanguageClick(lnk.langCode)}
                                            >
                                                <DecryptedText
                                                    text={lnk.label}
                                                    animateOn='hover'
                                                    revealDirection={isRTL ? "right" : "left"}
                                                />
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div
                                                key={`${lnk.label}-navLink`}
                                                className="nav-card-link cursor-target"
                                                // to={lnk.href}
                                                // onClick={toggleMenu}
                                                onClick={() => {
                                                    console.log(lnk.href)
                                                    smartNavigate(lnk.href.mainpath, lnk.href.sub)
                                                }}
                                                aria-label={lnk.ariaLabel}>
                                                <DecryptedText
                                                    text={lnk.label}
                                                    animateOn='hover'
                                                    revealDirection={isRTL ? "right" : "left"}
                                                />
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default CardNav;
