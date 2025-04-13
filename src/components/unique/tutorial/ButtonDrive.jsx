import styled from 'styled-components';
import PropTypes from 'prop-types';
import imageSrc from '../../../assets/images/url.png';
import TutorialButton from '../../common/TutorialButton';

const Image = styled.img`
  height: 18px;
  filter: ${({ theme }) => theme.tutorial.iconFilter};
`;

const ButtonDrive = ({ url, openInNewTab = false }) => {
  if (openInNewTab) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'inline-block' }}
      >
        <Image src={imageSrc} alt="URL" />
      </a>
    );
  }

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
