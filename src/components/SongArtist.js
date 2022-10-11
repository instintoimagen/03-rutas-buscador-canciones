// import VideoYT from "./VideoYT";

const SongArtist = ({ artist, videosYT }) => {
  //console.log(videosYT);
  return (
    <section>
      <div style={{ textAlign: "center" }}>
        <h3>{artist.strArtist}</h3>
        <img
          src={artist.strArtistThumb}
          alt={artist.strArtist}
          style={{ maxWidth: "98%", maxHeight: "50vh" }}
        />
      </div>
      {/* <VideoYT datosYT={videosYT} /> */}
      <p>
        {artist.intBornYear} - {artist.intDiedYear || "Presente"}{" "}
      </p>
      <p>{artist.strCountry}</p>
      <p>
        {artist.strGenre} - {artist.strStyle}
      </p>
      <a
        href={`http://${artist.strWebsite}`}
        target="_blank"
        rel="noreferrer"
        style={{
          fontWeight: "bold",
          color: "inherit",
          textDecoration: "none",
          border: "thin solid #dedede",
          borderRadius: "0.25rem",
          padding: ".25rem",
          backgroundColor: "#444",
        }}
      >
        web oficial
      </a>
      <p>{artist.strBiographyES || artist.strBiographyEN}</p>
    </section>
  );
};

export default SongArtist;
