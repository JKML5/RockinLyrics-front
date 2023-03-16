import React from 'react';
import '../css/Footer.css';
import ButtonMale from './ButtonMale';
import ButtonFemale from './ButtonFemale';

function Footer() {
  return (
    <div className="footer">
      <ButtonMale />
      <ButtonFemale />

      <div className="footer__separator" />
      <button type="button" className="footer__button footer__button--lead">
        Lead
      </button>
      <button type="button" className="footer__button footer__button--bv1">
        BV1
      </button>
      <button type="button" className="footer__button footer__button--bv2">
        BV2
      </button>
      <div className="footer__separator" />
      <button type="button" className="footer__button footer__button--zoom">
        Zoom
      </button>
      <button type="button" className="footer__button footer__button--dezoom">
        Dézoom
      </button>
    </div>
  );
}

export default Footer;
