import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import StyledButton from './shared/StyledButton';
import { incrementFontSize, decrementFontSize } from '../store';
import zoomInImgSrc from '../assets/zoom-in.svg';
import zoomOutImgSrc from '../assets/zoom-out.svg';

function ButtonZoom({ increment }) {
  const dispatch = useDispatch();

  const Button = styled(StyledButton)`
    font-size: 16px;
    color: white;
    background-color: #2a2a2a;
  `;

  const Img = styled.img`
    filter: invert(1);
  `;

  return increment ? (
    <Button type="button" onClick={() => dispatch(incrementFontSize())}>
      <Img src={zoomInImgSrc} alt="Zoom in" />
    </Button>
  ) : (
    <Button type="button" onClick={() => dispatch(decrementFontSize())}>
      <Img src={zoomOutImgSrc} alt="Zoom out" />
    </Button>
  );
}

ButtonZoom.propTypes = {
  increment: PropTypes.bool.isRequired,
};

export default ButtonZoom;
