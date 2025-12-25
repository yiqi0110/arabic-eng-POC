import React, { useContext } from 'react';
import { LanguageContext } from '../App';
import DecryptedText from './DecryptedText';

const ProductSection = () => {
  const { t, language } = useContext(LanguageContext);

  const isRTL = language === 'ar';

  const productCategories = [
    {
      id: 'mens',
      title: t('products.mens'),
      description: t('products.mensDesc')
    },
    {
      id: 'womens',
      title: t('products.womens'),
      description: t('products.womensDesc')
    },
    {
      id: 'kids',
      title: t('products.kids'),
      description: t('products.kidsDesc')
    },
    {
      id: 'lifestyle',
      title: t('products.lifestyle'),
      description: t('products.lifestyleDesc')
    }
  ];

  return (
    <section id="products" className="products-section">
      <div className="container">
        <h2 className="section-title">
          <DecryptedText
            text={t('products.title')}
            animateOn='hover'
            revealDirection={isRTL ? "right" : "left"}
          />
        </h2>
        <div className="products-grid">
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
        </div>
      </div>
    </section>
  );
};

export default ProductSection;