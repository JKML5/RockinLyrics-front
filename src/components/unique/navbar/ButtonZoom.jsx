import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import MenuButton from '../../common/MenuButton';
import { incrementFontSize, decrementFontSize } from '../../../store';
import zoomInImgSrc from '../../../assets/images/zoom-in.svg';
import zoomOutImgSrc from '../../../assets/images/zoom-out.svg';

const Button = styled(MenuButton)`
  padding: 8px;
`;

function ButtonZoom({ increment }) {
  const dispatch = useDispatch();

  return increment ? (
    <Button type="button" onClick={() => dispatch(incrementFontSize())}>
      <img src={zoomInImgSrc} alt="Zoom in" />
    </Button>
  ) : (
    <Button type="button" onClick={() => dispatch(decrementFontSize())}>
      <img src={zoomOutImgSrc} alt="Zoom out" />
    </Button>
  );
}

ButtonZoom.propTypes = {
  increment: PropTypes.bool.isRequired,
};

export default ButtonZoom;
