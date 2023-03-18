import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store';
import darkImgSrc from '../assets/dark.svg';
import lightImgSrc from '../assets/light.svg';

function ButtonTheme() {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleClick = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.body.classList = newTheme;
    dispatch(toggleTheme(newTheme));
  };

  return (
    <button
      type="button"
      className="footer__button footer__button--theme selected"
      onClick={handleClick}
    >
      {theme === 'light' ? (
        <img src={lightImgSrc} alt="Light" className="footer__button__img" />
      ) : (
        <img src={darkImgSrc} alt="Dark" className="footer__button__img" />
      )}
    </button>
  );
}

export default ButtonTheme;
