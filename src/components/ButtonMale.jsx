import { useDispatch } from 'react-redux';
import { setGenderMale } from '../store';
import maleImgSrc from '../assets/male.svg';

function ButtonMale() {
  const dispatch = useDispatch();

  const handleMaleClick = () => {
    dispatch(setGenderMale());
  };

  return (
    <button
      type="button"
      className="footer__button footer__button--male"
      onClick={handleMaleClick}
    >
      <img src={maleImgSrc} alt="M" className="footer__button__img" />
    </button>
  );
}

export default ButtonMale;
