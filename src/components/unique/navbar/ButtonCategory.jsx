import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { switchCategory } from '../../../store';
import MenuButton from '../../common/MenuButton';

const CategoryButton = styled(MenuButton)`
  font-size: 16px;
`;

const ButtonCategory = () => {
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
};

export default ButtonCategory;
