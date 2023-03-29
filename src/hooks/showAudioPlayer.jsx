import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';

/**
 * Player audio
 */
export default function showAudioPlayer(googleId) {
  return (
    <Plyr
      source={{
        type: 'audio',
        sources: [{ src: `https://drive.google.com/uc?id=${googleId}` }],
      }}
      options={{
        controls: [
          'play-large',
          'play',
          'progress',
          'current-time',
          'mute',
          'volume',
          'settings',
        ],
        settings: ['speed'],
        autoplay: true,
        speed: { selected: 1, options: [0.5, 0.75, 1] },
      }}
    />
  );
}
