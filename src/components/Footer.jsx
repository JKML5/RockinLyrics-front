import styled from 'styled-components';
import React from 'react';
import ButtonGender from './ButtonGender';
import ButtonRole from './ButtonCategory';
import ButtonTheme from './ButtonTheme';
import ButtonZoom from './ButtonZoom';

function Footer() {
  const StyledFooter = styled.footer`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    padding: 10px;
    position: fixed;
    bottom: 0;
  `;

  const StyledSeparator = styled.div`
    width: 1px;
    height: 40px;
    margin: 0 10px;
    background-color: #555555;
  `;

  return (
    <StyledFooter>
      <ButtonGender />
      <ButtonRole />
      <StyledSeparator />
      <ButtonTheme />
      <ButtonZoom increment />
      <ButtonZoom increment={false} />
    </StyledFooter>
  );
}

export default Footer;
