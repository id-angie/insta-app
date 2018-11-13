import React from 'react';

import './index.scss';

const Footer = () => (
<div className="footer">
  <div className="container">
    <div className="footer__block">
      <div className="footer__list">
        <a href="#link" className="footer__link">О нас</a>
        <a href="#link" className="footer__link">Поддержка</a>
        <a href="#link" className="footer__link">Пресса</a>
        <a href="#link" className="footer__link">Api</a>
        <a href="#link" className="footer__link">Вакансии</a>
        <a href="#link" className="footer__link">Конфеденциальность</a>
        <a href="#link" className="footer__link">Условия</a>
        <a href="#link" className="footer__link">Директория</a>
        <a href="#link" className="footer__link">Профили</a>
        <a href="#link" className="footer__link">Хэштеги</a>
        <a href="#link" className="footer__link">Язык</a>
      </div>
      <div className="footer__copyright">
        <span>© 2018 Angiegram</span>
      </div>
    </div>
  </div>
</div>
);

export default Footer;