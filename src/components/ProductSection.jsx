import React, { useContext } from 'react';
import gsap from 'gsap';
import { LanguageContext } from '../App';
import DecryptedText from './DecryptedText';
import mensImage from '../assets/men-4842771_1280.jpg';
import womensImage from '../assets/dubai-5029018_1280.jpg';
import kidsImage from '../assets/kids-29834734.jpg';
import lifestyleImage from '../assets/lifestyle-2398434759384.jpg';

import './ProductSection.css';

const FlowingMenu = ({ items = [] }) => {
  return (
    <div className="menu-wrap">
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
}

const MenuItem = ({ link = null, title, image = null }) => {
  const itemRef = React.useRef(null);
  const marqueeRef = React.useRef(null);
  const marqueeInnerRef = React.useRef(null);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const distMetric = (x, y, x2, y2) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const handleMouseEnter = ev => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = ev => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  const repeatedMarqueeContent = Array.from({ length: 4 }).map((_, idx) => (
    <React.Fragment key={idx}>
      <span>{title}</span>
      <div className="marquee__img" style={{ backgroundImage: `url(${image})` }} />
    </React.Fragment>
  ));

  return (
    <div className="menu__item cursor-target" ref={itemRef}>
      <a className="menu__item-link" href={link} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {title}
      </a>
      <div className="marquee" ref={marqueeRef}>
        <div className="marquee__inner-wrap" ref={marqueeInnerRef}>
          <div className="marquee__inner" aria-hidden="true">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
}


const ProductSection = () => {
  const { t, language } = useContext(LanguageContext);

  const isRTL = language === 'ar';

  const productCategories = [
    {
      id: 'mens',
      title: t('products.mens'),
      description: t('products.mensDesc'),
      image: mensImage
    },
    {
      id: 'womens',
      title: t('products.womens'),
      description: t('products.womensDesc'),
      image: womensImage
    },
    {
      id: 'kids',
      title: t('products.kids'),
      description: t('products.kidsDesc'),
      image: kidsImage
    },
    {
      id: 'lifestyle',
      title: t('products.lifestyle'),
      description: t('products.lifestyleDesc'),
      image: lifestyleImage
    }
  ];

  return (
    <section id="products" className="products-section snap-section">
      <div className="container">
        <h2 className="section-title">
          <DecryptedText
            text={t('products.title')}
            animateOn='hover'
            revealDirection={isRTL ? "right" : "left"}
          />
        </h2>
        {/* <div className="products-grid">
          {productCategories.map((category) => (
            <div key={category.id} className={["product-card", "cursor-target"].join(" ")}>
              <h3 className="product-title">
                <DecryptedText
                  text={category.title}
                  animateOn='hover'
                  revealDirection={isRTL ? "right" : "left"}
                />
              </h3>
              <p className="product-description">{category.description}</p>
            </div>
          ))}
        </div> */}
        <FlowingMenu items={productCategories} />
      </div>
    </section>
  );
};

export default ProductSection;