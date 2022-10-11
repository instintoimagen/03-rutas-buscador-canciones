import React, { useState, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import SongForm from "./SongForm";
import SongDetails from "./SongDetails";
import Loader from "./Loader";
import { helpHttp } from "../helpers/helpHttp";
import Error404 from "../pages/Error404";
import SongTable from "./SongTable";
import SongPage from "../pages/SongPage";

let mySongsInit = JSON.parse(localStorage.getItem("mySongs")) || [];

const SongSearch = (footerPosition) => {
  const [search, setSearch] = useState(null);
  const [lyric, setLyric] = useState(null);
  const [bio, setBio] = useState(null);
  const [loading, setLoading] = useState(false);
  // Guardar en localStorage
  const [mySongs, setMySongs] = useState(mySongsInit);

  useEffect(() => {
    if (search === null) return;
    const fetchData = async () => {
      const { artist, song } = search;

      let artistUrl = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artist}`;
      let songUrl = `https://private-anon-578d7f8fc7-lyricsovh.apiary-mock.com/v1/${artist}/${song}`; // sino usar: https://api.lyrics.ovh/v1/

      //  console.log(artistUrl, songUrl);

      setLoading(true);

      const [artistRes, songRes] = await Promise.all([
        helpHttp().get(artistUrl),
        helpHttp().get(songUrl),
      ]);

      // console.log(artistRes, songRes);

      setBio(artistRes);
      setLyric(songRes);
      setLoading(false);
      footerPosition.footerPosition(); // actualizará hook y el footer cambia la propiedad de CSS position, de fixex a static
    };

    fetchData();

    // Envía la búsqueda al localStorage
    localStorage.setItem("mySongs", JSON.stringify(mySongs));
  }, [search, mySongs]);

  const handleSearch = (data) => {
    //console.log(data);
    setSearch(data);
  };

  const handleSaveSong = () => {
    alert("Guardando Datos");
    let currentSong = {
      search,
      lyric,
      bio,
    };

    // con spread, que tome lo que ya trae "mySongs" (almacenado en el localStorage) más la nueva búsqueda (el objeto currentSong). Luego actualizamos setMySongs con lo que acababos de guardar en "songs", y el useEffect lo guardará en localStorage
    let songs = [...mySongs, currentSong];
    setMySongs(songs);
    setSearch(null);
    localStorage.setItem("mySongs", JSON.stringify(songs));
  };

  const handleDeleteSong = (id) => {
    let isDelete = window.confirm(
      `¿Eliminar la canción "${mySongs[id].search.song}" de las favoritas?`
    );
    if (isDelete) {
      // ELIMINAR de localStorage: Usando ".filter", Cuando el índice de la canción sea diferente del "id" que le pasamos, entonces lo agregamos a "songs". O sea que con este filtro estamos excluyendo el elemento que queremos borrar del localStorage
      let songs = mySongs.filter((el, index) => index !== id);
      setMySongs(songs);
      localStorage.setItem("mySongs", JSON.stringify(songs));
    }
  };

  const [videos, setVideos] = useState(null);

  useEffect(() => {
    if (bio === null) return;

    const videoYT = async () => {
      const idArtist = bio.artists[0].idArtist;

      let videoUrl = `https://theaudiodb.com/api/v1/json/2/mvid.php?i=${idArtist}`;

      const videosRes = await Promise.all([helpHttp().get(videoUrl)]);

      //console.log(videosRes);

      setVideos(videosRes);
    };

    videoYT();
  }, [bio]);

  return (
    <div>
      <HashRouter>
        <header>
          <a href="/">
            <h1>Buscador Letras e Intérpretes</h1>
          </a>
        </header>
        {loading && <Loader />}
        <article className="grid-1-3">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SongForm
                    handleSearch={handleSearch}
                    handleSaveSong={handleSaveSong}
                  />
                  <SongTable
                    mySongs={mySongs}
                    handleDeleteSong={handleDeleteSong}
                  />
                  {search && !loading && (
                    <SongDetails
                      search={search}
                      lyric={lyric}
                      bio={bio}
                      videos={videos}
                    />
                  )}
                  {!search && (
                    <img
                      className="music1"
                      src="./assets/cassette.jpg"
                      alt="cassetes"
                    />
                  )}
                  {!bio && (
                    <img
                      className="music2"
                      src="./assets/vinilos.jpg"
                      alt="discos"
                    />
                  )}
                </>
              }
            ></Route>
            <Route
              path="/canciones/:id"
              element={<SongPage mySongs={mySongs} />}
            />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </article>
      </HashRouter>
    </div>
  );
};

export default SongSearch;

// the Audio Db token: BFFAE
// URL para: Return all the Music videos for a known TADB_Artist_ID
// theaudiodb.com/api/v1/json/BFFAE/mvid.php?i=112024
