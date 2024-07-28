import styled from 'styled-components';
import PropTypes from 'prop-types';
import imageSrc from '../../../assets/images/url.png';
import TutorialButton from '../../common/TutorialButton';

const Image = styled.img`
  height: 18px;
  filter: ${({ theme }) => theme.tutorial.iconFilter};
`;

const ButtonDrive = ({ url }) => {
  return (
    <TutorialButton to={url}>
      <Image src={imageSrc} alt="URL" />
    </TutorialButton>
  );
};

ButtonDrive.propTypes = {
  url: PropTypes.string,
};

export default ButtonDrive;
