import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { toggleGender } from '../store';
import maleImgSrc from '../assets/male.svg';
import femaleImgSrc from '../assets/female.svg';
import StyledButton from './shared/StyledButton';

function ButtonGender() {
  const dispatch = useDispatch();
  const selectedGender = useSelector((state) => state.gender);

  const StyledButtonGender = styled(StyledButton)`
    background-color: ${selectedGender === 'M' ? '#3b5998' : '#dd4b39'};
  `;

  const StyledImg = styled.img`
    filter: invert(1);
  `;

  const handleClick = () => {
    dispatch(toggleGender());
  };

  const imgSrc = selectedGender === 'M' ? maleImgSrc : femaleImgSrc;

  return (
    <StyledButtonGender type="button" onClick={handleClick}>
      <StyledImg src={imgSrc} alt={selectedGender} />
    </StyledButtonGender>
  );
}

export default ButtonGender;
