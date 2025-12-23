import React, { useContext } from 'react';
import { LanguageContext } from '../App';
import DecryptedText from './DecryptedText';

const Header = () => {
  const { t, language } = useContext(LanguageContext);

  const isRTL = language === 'ar';

  return (
      <footer className="footer">
        <div className="container">
            <DecryptedText
                text={t('footer.copyright')}
                animateOn="hover"
                revealDirection={isRTL ? "right" : "left"}
            />
        </div>
      </footer>
  );
};

export default Header;