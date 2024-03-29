import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import MenuButton from './shared/MenuButton';
import { incrementFontSize, decrementFontSize } from '../store';
import zoomInImgSrc from '../assets/zoom-in.svg';
import zoomOutImgSrc from '../assets/zoom-out.svg';

const Button = styled(MenuButton)`
  font-size: 16px;
  color: white;
  background-color: #2a2a2a;
  padding: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  filter: invert(1);
`;

function ButtonZoom({ increment }) {
  const dispatch = useDispatch();

  return increment ? (
    <Button type="button" onClick={() => dispatch(incrementFontSize())}>
      <Image src={zoomInImgSrc} alt="Zoom in" />
    </Button>
  ) : (
    <Button type="button" onClick={() => dispatch(decrementFontSize())}>
      <Image src={zoomOutImgSrc} alt="Zoom out" />
    </Button>
  );
}

ButtonZoom.propTypes = {
  increment: PropTypes.bool.isRequired,
};

export default ButtonZoom;
