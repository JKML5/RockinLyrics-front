import { useDispatch } from 'react-redux';
import { setGenderFemale } from '../store';
import femaleImgSrc from '../assets/female.svg';

function ButtonFemale() {
  const dispatch = useDispatch();

  const handleFemaleClick = () => {
    dispatch(setGenderFemale());
  };

  return (
    <button
      type="button"
      className="footer__button footer__button--female"
      onClick={handleFemaleClick}
    >
      <img src={femaleImgSrc} alt="F" className="footer__button__img" />
    </button>
  );
}

export default ButtonFemale;
