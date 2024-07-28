/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react';
import { usePlyr } from 'plyr-react';
import 'plyr-react/plyr.css';
import styled from 'styled-components';
import '../../assets/css/plyr.css';

const StyledAudioPlayer = styled.div`
  width: 100%;
  background-color: #000000;
  padding: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 80px;
`;

const PlyrInstance = forwardRef((props, ref) => {
  const { source, options = null } = props;
  const raptorRef = usePlyr(ref, { options, source });

  return (
    <StyledAudioPlayer>
      <audio ref={raptorRef} className="plyr-react plyr" />
    </StyledAudioPlayer>
  );
});

export default PlyrInstance;
