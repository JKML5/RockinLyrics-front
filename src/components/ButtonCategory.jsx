import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setCategoryLead, setCategoryBV1, setCategoryBV2 } from '../store';

function ButtonCategory({ category }) {
  const selectedCategory = useSelector((state) => state.category);
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
    filter: ${category === selectedCategory
      ? 'brightness(1)'
      : 'brightness(0.4)'};
    display: flex;
    align-items: center;
    justify-content: center;
  `;

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
    <StyledButton
      type="button"
      className={`footer__button footer__button--category ${
        selectedCategory === category ? 'selected' : ''
      }`}
      onClick={handleClick}
    >
      {category}
    </StyledButton>
  );
}

ButtonCategory.propTypes = {
  category: PropTypes.string.isRequired,
};

export default ButtonCategory;
