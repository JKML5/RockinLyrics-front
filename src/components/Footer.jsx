import styled from 'styled-components';
import React from 'react';
import ButtonGender from './ButtonGender';
import ButtonRole from './ButtonCategory';
import ButtonTheme from './ButtonTheme';
import ButtonZoom from './ButtonZoom';

function Footer() {
  const StyledFooter = styled.footer`
    width: 100%;
    background-color: black;
    padding: 10px;
    position: fixed;
    bottom: 0;
  `;

  const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1024px;
    margin-left: auto;
    margin-right: auto;
  `;

  const Side = styled.div`
    display: flex;
  `;

  return (
    <StyledFooter>
      <Container>
        <Side>
          <ButtonGender />
          <ButtonRole />
        </Side>
        <Side>
          <ButtonTheme />
          <ButtonZoom increment />
          <ButtonZoom increment={false} />
        </Side>
      </Container>
    </StyledFooter>
  );
}

export default Footer;
