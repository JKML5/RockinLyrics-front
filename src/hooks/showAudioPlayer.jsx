/**
 * Player audio
 */
export default function showAudioPlayer(googleId) {
  return (
    <audio
      className="player__audio"
      controls
      autoPlay
      src={`https://drive.google.com/uc?id=${googleId}`}
    >
      Your browser does not support the audio element.
    </audio>
  );
}
