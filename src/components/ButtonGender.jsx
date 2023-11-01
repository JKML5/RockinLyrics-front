import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { toggleGender } from '../store';
import maleImgSrc from '../assets/male.svg';
import femaleImgSrc from '../assets/female.svg';
import MenuButton from './shared/MenuButton';

const Button = styled(MenuButton)`
  background-color: ${({ gender }) => (gender === 'M' ? '#3b5998' : '#dd4b39')};
`;

const Icon = styled.img`
  width: 100%;
  height: auto;
  filter: invert(1);
`;

function ButtonGender() {
  const dispatch = useDispatch();
  const gender = useSelector((state) => state.gender);

  const handleClick = () => {
    dispatch(toggleGender());
  };

  const imgSrc = gender === 'M' ? maleImgSrc : femaleImgSrc;

  return (
    <Button gender={gender} type="button" onClick={handleClick}>
      <Icon src={imgSrc} alt={gender} />
    </Button>
  );
}

export default ButtonGender;
