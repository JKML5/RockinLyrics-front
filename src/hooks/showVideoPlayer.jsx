/**
 * Player video
 */
export default function showVideoPlayer(googleId) {
  return (
    <video
      className="player__video"
      controls
      autoPlay
      src={`https://drive.google.com/uc?id=${googleId}`}
    >
      Your browser does not support the video element.
    </video>
  );
}
