import { useSelector, useDispatch } from 'react-redux';
import { setGenderFemale } from '../store';
import femaleImgSrc from '../assets/female.svg';

function ButtonFemale() {
  const gender = useSelector((state) => state.gender);

  const dispatch = useDispatch();

  const handleFemaleClick = () => {
    dispatch(setGenderFemale());
  };

  return (
    <button
      type="button"
      className={`footer__button footer__button--female ${
        gender === 'F' ? 'selected' : ''
      }`}
      onClick={handleFemaleClick}
    >
      <img src={femaleImgSrc} alt="F" className="footer__button__img" />
    </button>
  );
}

export default ButtonFemale;
