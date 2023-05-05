import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { switchCategory } from '../store';
import FooterButton from './shared/FooterButton';

const CategoryButton = styled(FooterButton)`
  font-size: 16px;
  color: white;
  background-color: #2a2a2a;
`;

function ButtonCategory() {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(switchCategory());
  };

  return (
    <CategoryButton type="button" onClick={handleClick}>
      {category}
    </CategoryButton>
  );
}

export default ButtonCategory;
