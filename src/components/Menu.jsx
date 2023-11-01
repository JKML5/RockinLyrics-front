import styled from 'styled-components';
import React from 'react';
import ButtonGender from './ButtonGender';
import ButtonRole from './ButtonCategory';
import ButtonTheme from './ButtonTheme';
import ButtonZoom from './ButtonZoom';

const StyledMenu = styled.div`
  background-color: #000000;
  padding: 8px;
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

function Menu() {
  return (
    <StyledMenu>
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
    </StyledMenu>
  );
}

export default Menu;
