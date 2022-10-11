const SongLyrics = ({ artist, title, lyrics }) => {
  return (
    <section>
      <div style={{ textAlign: "center" }}>
        <h4>{title}</h4>
      </div>
      <blockquote style={{ whiteSpace: "pre-wrap" }}>{lyrics}</blockquote>
    </section>
  );
};

export default SongLyrics;
