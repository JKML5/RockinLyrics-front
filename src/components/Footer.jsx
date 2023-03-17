import React from 'react';
import '../css/Footer.css';
import ButtonMale from './ButtonMale';
import ButtonFemale from './ButtonFemale';
import ButtonRole from './ButtonCategory';

function Footer() {
  return (
    <div className="footer">
      <ButtonFemale />
      <ButtonMale />
      <div className="footer__separator" />
      <ButtonRole category="LEAD" />
      <ButtonRole category="BV1" />
      <ButtonRole category="BV2" />
    </div>
  );
}

export default Footer;
