import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store';
import darkImgSrc from '../assets/dark.svg';
import lightImgSrc from '../assets/light.svg';
import StyledButton from './shared/StyledButton';

function ButtonTheme() {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const StyledButtonTheme = styled(StyledButton)`
    background-color: ${() => (theme === 'light' ? '#F39F18' : '#0F056B')};
  `;

  const StyledImg = styled.img`
    filter: invert(1);
  `;

  const handleClick = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.body.classList = newTheme;
    dispatch(toggleTheme(newTheme));
  };

  return (
    <StyledButtonTheme
      type="button"
      className="footer__button footer__button--theme selected"
      onClick={handleClick}
    >
      {theme === 'light' ? (
        <StyledImg
          src={lightImgSrc}
          alt="Light"
          className="footer__button__img"
        />
      ) : (
        <StyledImg
          src={darkImgSrc}
          alt="Dark"
          className="footer__button__img"
        />
      )}
    </StyledButtonTheme>
  );
}

export default ButtonTheme;
