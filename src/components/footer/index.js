import React from 'react';
import './index.css';

const Footer = () => (
<div className="footer">
  <div className="container">
    <div className="footer__list">
      <div>
        <a href="./" className="footer__link">О нас</a>
        <a href="./" className="footer__link ml20">Поддержка</a>
        <a href="./" className="footer__link ml20">Пресса</a>
        <a href="./" className="footer__link ml20">Api</a>
        <a href="./" className="footer__link ml20">Вакансии</a>
        <a href="./" className="footer__link ml20">Конфеденциальность</a>
        <a href="./" className="footer__link ml20">Условия</a>
        <a href="./" className="footer__link ml20">Директория</a>
        <a href="./" className="footer__link ml20">Профили</a>
        <a href="./" className="footer__link ml20">Хэштеги</a>
        <a href="./" className="footer__link ml20">Язык</a>
      </div>
      <div className="footer__copyright">
        <span>© 2018 Angiegram</span>
      </div>
    </div>
  </div>
</div>
);

export default Footer;