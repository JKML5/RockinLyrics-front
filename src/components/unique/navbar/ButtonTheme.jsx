import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../../store';
import darkImgSrc from '../../../assets/images/dark.svg';
import lightImgSrc from '../../../assets/images/light.svg';
import MenuButton from '../../common/MenuButton';

const Button = styled(MenuButton)`
  background-color: ${({ theme }) => theme.colors.themeButton};
`;

const Icon = styled.img`
  filter: invert(1);
  width: 50px;
`;

const ButtonTheme = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleTheme());
  };

  const icon =
    theme === 'light' ? (
      <Icon src={lightImgSrc} alt="Light" />
    ) : (
      <Icon src={darkImgSrc} alt="Dark" />
    );

  return (
    <Button type="button" onClick={handleClick}>
      {icon}
    </Button>
  );
};

export default ButtonTheme;
