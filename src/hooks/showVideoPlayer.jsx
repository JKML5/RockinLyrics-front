import styled from 'styled-components';

export default function showVideoPlayer(googleId) {
  const Video = styled.video`
    width: 100%;
  `;

  return (
    <Video controls autoPlay src={`https://drive.google.com/uc?id=${googleId}`}>
      Your browser does not support the video element.
    </Video>
  );
}
