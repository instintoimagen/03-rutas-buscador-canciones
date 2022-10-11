import React from "react";

const Footer = (position) => {
  return (
    <>
      <footer style={{ position: position.position }}>
        <a
          href="https://sergioortega.com.ar"
          target={"_blank"}
          rel={"noreferrer noopener"}
        >
          <h3>Sergio Ortega</h3>
        </a>
        <p>
          Este buscador utiliza las API{" "}
          <a
            href="https://www.theaudiodb.com/api_guide.php"
            target={"_blank"}
            rel={"noreferrer noopener"}
          >
            The Audio DB
          </a>{" "}
          y{" "}
          <a
            href="https://lyricsovh.docs.apiary.io"
            target={"_blank"}
            rel={"noreferrer noopener"}
          >
            Lyrics ovh.
          </a>{" "}
          Solo para fines demostrativos sin fines de lucro. Imágenes de{" "}
          <a
            href="https://www.pexels.com"
            target={"_blank"}
            rel={"noreferrer noopener"}
          >
            Pexels.
          </a>{" "}
          Créditos: Jadson Thomas, Tima Miroshnichenko y Cottonbro. Gracias! 🙂
        </p>
      </footer>
    </>
  );
};

export default Footer;
