import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store';
import darkImgSrc from '../assets/dark.svg';
import lightImgSrc from '../assets/light.svg';

function ButtonTheme() {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const StyledButton = styled.button`
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 10px;
    margin: 0 10px;
    font-size: 18px;
    color: white;
    background-color: #2a2a2a;
    filter: brightness(0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const StyledImg = styled.img`
    filter: invert(1);
    width: 50px;
    height: 50px;
  `;

  const handleClick = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.body.classList = newTheme;
    dispatch(toggleTheme(newTheme));
  };

  return (
    <StyledButton
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
    </StyledButton>
  );
}

export default ButtonTheme;
