import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { toggleGender } from '../store';
import maleImgSrc from '../assets/male.svg';
import femaleImgSrc from '../assets/female.svg';
import FooterButton from './shared/FooterButton';

function ButtonGender() {
  const dispatch = useDispatch();
  const selectedGender = useSelector((state) => state.gender);

  const GenderButton = styled(FooterButton)`
    background-color: ${selectedGender === 'M' ? '#3b5998' : '#dd4b39'};
  `;

  const StyledImg = styled.img`
    width: 100%;
    height: auto;
    filter: invert(1);
  `;

  const handleClick = () => {
    dispatch(toggleGender());
  };

  const imgSrc = selectedGender === 'M' ? maleImgSrc : femaleImgSrc;

  return (
    <GenderButton type="button" onClick={handleClick}>
      <StyledImg src={imgSrc} alt={selectedGender} />
    </GenderButton>
  );
}

export default ButtonGender;
