import styled from 'styled-components';
import React from 'react';
import ButtonGender from '../unique/navbar/ButtonGender';
import ButtonCategory from '../unique/navbar/ButtonCategory';
import ButtonTheme from '../unique/navbar/ButtonTheme';
import ButtonZoom from '../unique/navbar/ButtonZoom';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 15px;
`;

const Side = styled.div`
  display: flex;
`;

function Menu() {
  return (
    <Container>
      <Side>
        <ButtonGender />
        <ButtonCategory />
      </Side>
      <Side>
        <ButtonTheme />
        <ButtonZoom increment />
        <ButtonZoom increment={false} />
      </Side>
    </Container>
  );
}

export default Menu;
