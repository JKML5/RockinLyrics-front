/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react';
import { usePlyr } from 'plyr-react';
import 'plyr-react/plyr.css';
import styled from 'styled-components';
import '../../assets/css/plyr.css';

const StyledVideoPlayer = styled.div`
  width: 100%;
  background-color: #000000;
  padding: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 80px;

  audio {
    width: 100%;
  }
`;

const StyledAudioPlayer = styled.div`
  width: 100%;
  background-color: #000000;
  padding: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 80px;

  audio {
    width: 100%;
  }
`;

const PlyrInstance = forwardRef((props, ref) => {
  const { source, options, type = null } = props;
  const plyrRef = usePlyr(ref, { options, source });

  return type === 'video' ? (
    <StyledAudioPlayer>
      <video ref={plyrRef} className="plyr-react plyr" controls />
    </StyledAudioPlayer>
  ) : (
    <StyledAudioPlayer>
      <video ref={plyrRef} className="plyr-react plyr" controls />
    </StyledAudioPlayer>
  );
});

export default PlyrInstance;
