import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleGender } from '../store';
import maleImgSrc from '../assets/male.svg';
import femaleImgSrc from '../assets/female.svg';

function ButtonGender({ gender }) {
  const dispatch = useDispatch();
  const selectedGender = useSelector((state) => state.gender);

  const StyledButton = styled.button`
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 10px;
    margin: 0 10px;
    font-size: 18px;
    color: white;
    background-color: #2a2a2a;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${gender === 'M' ? '#3b5998' : '#dd4b39'};
    filter: ${gender === selectedGender ? 'brightness(1)' : 'brightness(0.4)'};
  `;

  const StyledImg = styled.img`
    filter: invert(1);
    width: 50px;
    height: 50px;
  `;

  const handleClick = () => {
    dispatch(toggleGender());
  };

  return gender === 'M' ? (
    <StyledButton
      type="button"
      className={`footer__button footer__button--male ${
        selectedGender === 'M' ? 'selected' : ''
      }`}
      onClick={handleClick}
    >
      <StyledImg src={maleImgSrc} alt={gender} />
    </StyledButton>
  ) : (
    <StyledButton
      type="button"
      className={`footer__button footer__button--female ${
        gender === 'F' ? 'selected' : ''
      }`}
      onClick={handleClick}
    >
      <StyledImg src={femaleImgSrc} alt={gender} />
    </StyledButton>
  );
}

ButtonGender.defaultProps = {
  gender: 'F',
};

ButtonGender.propTypes = {
  gender: PropTypes.string,
};

export default ButtonGender;
