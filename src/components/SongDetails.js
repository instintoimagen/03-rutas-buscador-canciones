//import React, { useState, useEffect } from "react";
import Message from "./Message";
import SongArtist from "./SongArtist";
import SongLyrics from "./SongLyrics";

const SongDetails = ({ search, lyric, bio /* , videos  */ }) => {
  if (!lyric || !bio /*|| !videos */) return null;
  // console.log(videos);
  return (
    <>
      {lyric.error || lyric.err || lyric.name === "AbortError" ? (
        <Message
          msg={`Error: no se encuentra la canción "<em>${search.song}</em>".<small>\n Intente nombre completo</small>`}
          bgColor="#dc3545"
        />
      ) : (
        <SongLyrics
          artist={search.artist}
          title={search.song}
          lyrics={lyric.lyrics}
        />
      )}
      {bio.artists ? (
        <SongArtist
          artist={bio.artists[0]} /* videosYT={videos[0].mvids[0]} */
        />
      ) : (
        <Message
          msg={`Error: no se encuentra el intérprete '<em>${search.artist}</em><small>'.\n Intente nombre completo</small>`}
          bgColor="#dc3545"
        />
      )}
    </>
  );
};

export default SongDetails;
