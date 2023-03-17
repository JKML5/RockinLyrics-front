/**
 * Bloc d'affichage des paroles
 * @param {string} lyrics Paroles d'une chanson
 * @returns
 */
export default function showLyrics(lyrics) {
  return (
    <div
      className="tutorial__lyrics"
      dangerouslySetInnerHTML={{ __html: lyrics }}
    />
  );
}
