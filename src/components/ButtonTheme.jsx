import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store';
import darkImgSrc from '../assets/dark.svg';
import lightImgSrc from '../assets/light.svg';
import FooterButton from './shared/FooterButton';

const Button = styled(FooterButton)`
  background-color: ${({ theme }) =>
    theme === 'light' ? '#F39F18' : '#0F056B'};
`;

const Icon = styled.img`
  filter: invert(1);
  width: 50px;
`;

function ButtonTheme() {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleClick = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(toggleTheme(newTheme));
  };

  const icon =
    theme === 'light' ? (
      <Icon src={lightImgSrc} alt="Light" />
    ) : (
      <Icon src={darkImgSrc} alt="Dark" />
    );

  return (
    <Button theme={theme} type="button" onClick={handleClick}>
      {icon}
    </Button>
  );
}

export default ButtonTheme;
