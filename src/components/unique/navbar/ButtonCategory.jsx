import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { switchCategory } from '../../../store';
import MenuButton from '../../common/MenuButton';

const CategoryButton = styled(MenuButton)`
  font-size: 16px;
`;

const ButtonCategory = () => {
  const category = useSelector((state) => state.category);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!categories || categories.length === 0) return;
    dispatch(switchCategory());
  };

  // Si aucune catégorie n’est disponible en base → le bouton n'affiche rien
  if (!categories || categories.length === 0) {
    return (
      <CategoryButton type="button" disabled>
        …
      </CategoryButton>
    );
  }

  const displayValue = category;

  return (
    <CategoryButton type="button" onClick={handleClick}>
      {displayValue || '…'}
    </CategoryButton>
  );
};

export default ButtonCategory;
