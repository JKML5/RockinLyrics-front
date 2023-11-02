// @see https://github.com/chintan9/plyr-react

import React, { forwardRef } from 'react';
import { usePlyr } from 'plyr-react';
import 'plyr-react/plyr.css';
import styled from 'styled-components';
import '../css/plyr.css';

const StyledAudioPlayer = styled.div`
  width: 100%;
  background-color: #000000;
  padding: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
`;

const AudioPlayer = forwardRef((props, ref) => {
  // eslint-disable-next-line react/prop-types
  const { source, options = null } = props;
  const raptorRef = usePlyr(ref, { options, source });

  React.useEffect(() => {
    const { current } = ref;
    if (current.plyr.source === null) return;

    const api = current;
    api.plyr.on('ready', () => console.log("I'm ready"));
    api.plyr.on('canplay', () => {
      api.plyr.play();
    });
    api.plyr.on('ended', () => console.log("I'm Ended"));
  });

  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <StyledAudioPlayer>
      <video ref={raptorRef} className="plyr-react plyr" />
    </StyledAudioPlayer>
  );
});

export default AudioPlayer;
