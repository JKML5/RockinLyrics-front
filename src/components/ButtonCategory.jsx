import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryLead, setCategoryBV1, setCategoryBV2 } from '../store';
import StyledButton from './shared/StyledButton';

function ButtonCategory() {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const StyledButtonCategory = styled(StyledButton)`
    font-size: 16px;
    color: white;
    background-color: #2a2a2a;
  `;

  const handleClick = () => {
    switch (category) {
      case 'BV1':
        dispatch(setCategoryBV2());
        break;
      case 'BV2':
        dispatch(setCategoryLead());
        break;
      default:
        dispatch(setCategoryBV1());
        break;
    }
  };

  return (
    <StyledButtonCategory type="button" onClick={handleClick}>
      {category}
    </StyledButtonCategory>
  );
}

export default ButtonCategory;
