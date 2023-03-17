import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setCategoryLead, setCategoryBV1, setCategoryBV2 } from '../store';

function ButtonCategory({ category }) {
  const selectedCategory = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const handleClick = () => {
    switch (category) {
      case 'BV1':
        dispatch(setCategoryBV1());
        break;
      case 'BV2':
        dispatch(setCategoryBV2());
        break;
      default:
        dispatch(setCategoryLead());
        break;
    }
  };

  return (
    <button
      type="button"
      className={`footer__button footer__button--category ${
        selectedCategory === category ? 'selected' : ''
      }`}
      onClick={handleClick}
    >
      {category}
    </button>
  );
}

ButtonCategory.propTypes = {
  category: PropTypes.string.isRequired,
};

export default ButtonCategory;
