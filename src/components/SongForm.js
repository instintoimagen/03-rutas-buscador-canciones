import React, { useState } from "react";

const initialForm = {
  artist: "",
  song: "",
};

const SongForm = ({ handleSearch, handleSaveSong }) => {
  const [form, setForm] = useState(initialForm);
  // para desactivar btn "agregar", luego 1ra busqueda:
  const [isDisable, setIsDisable] = useState(true);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.artist || !form.song) {
      alert("Datos incompletos");
      setIsDisable(true);
      return;
    }

    handleSearch(form);
    setForm(initialForm);
    setIsDisable(false);
  };

  return (
    <div className="FormConsola">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="artist"
          placeholder="Nombre del Intérprete"
          onChange={handleChange}
          value={form.artist}
        />
        <input
          type="text"
          name="song"
          placeholder="Nombre de la Canción"
          onChange={handleChange}
          value={form.song}
        />
        <input type="submit" value="Buscar" />

        {!isDisable && (
          <input
            type="button"
            onClick={handleSaveSong}
            value="Agregar canción"
            /*  disabled={isDisable && "disabled"} */
          />
        )}
      </form>
    </div>
  );
};

export default SongForm;
