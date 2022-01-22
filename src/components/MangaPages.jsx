import { useState, useEffect } from "react";
import {
  fetchChapter,
  fetchCharacter,
  fetchReaction,
} from "../service/service_api";
import ExtraManga from "./ExtraManga";
import SkeletonExtraManga from "./SkeletonExtraManga";

const ITEMS_PER_PAGE = 12;

const MangaPages = ({ params, attributes, image }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pageOffset, setPageOffset] = useState(0);
  const [extraManga, setExtraManga] = useState([]);
  const [view, setView] = useState("chapter");

  const resetExtra = () => {
    setExtraManga([]);
    setPageOffset(0);
  };

  const scrollHandler = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPageOffset(pageOffset + ITEMS_PER_PAGE);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (view === "chapter") {
      fetchChapter(params.id, pageOffset, ITEMS_PER_PAGE).then((data) => {
        if (data !== undefined) {
          setExtraManga([...extraManga, ...data]);
          setIsLoading(false);
        }
      });
    }
    if (view === "character") {
      fetchCharacter(params.id, pageOffset, ITEMS_PER_PAGE).then((data) => {
        if (data !== undefined) {
          setExtraManga([...extraManga, ...data]);
          setIsLoading(false);
        }
      });
    }
    if (view === "reaction") {
      fetchReaction(params.id, pageOffset, ITEMS_PER_PAGE).then((data) => {
        if (data !== undefined) {
          setExtraManga([...extraManga, ...data.data]);
          setIsLoading(false);
        }
      });
    }
  }, [pageOffset, view]);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  });

  const handleMenu = (value) => {
    if (value !== view) {
      setIsLoading(true);
      resetExtra();
      setView(value);
    }
  };
  return (
    <>
      <div
        className="banner"
        style={{
          backgroundImage: `url(${
            attributes.coverImage
              ? attributes.coverImage.original
              : "https://www.buzzwebzine.fr/wp-content/uploads/2020/09/100-meilleurs-animes.jpeg"
          })`,
          backgroundSize: "cover",
        }}
      />
      <div className="banner-filter" />
      <div className="head">
        <img src={image.small} alt="affiche du manga" className="manga-image" />
        <div className="manga-info">
          <h3 className="manga-title">{attributes.canonicalTitle}</h3>
          <ul className="info-list">
            <li>Rang: {attributes.popularityRank}</li>
            <li>
              {attributes.averageRating
                ? `Moyenne: ${attributes.averageRating}`
                : null}
            </li>
            <li>Volumes: {attributes.volumeCount}</li>
            <li>Statut: {attributes.endDate ? "terminé" : "en cours"}</li>
            <li>Publications: {attributes.serialization}</li>
          </ul>
          <p className="manga-synopsis">
            <em>Synopsis:</em> <br />
            {attributes.synopsis}
          </p>
        </div>
      </div>
      <div className="manga-extra-container">
        <nav className="navbar-extra">
          <ul>
            <li
              className={view === "chapter" ? "active-extra" : null}
              onClick={() => handleMenu("chapter")}
            >
              Chapitres
            </li>
            <li
              className={view === "character" ? "active-extra" : null}
              onClick={() => handleMenu("character")}
            >
              Personnages
            </li>
            <li
              className={view === "reaction" ? "active-extra" : null}
              onClick={() => handleMenu("reaction")}
            >
              Réactions des lecteurs
            </li>
          </ul>
        </nav>
        <div className="chapter-container">
          {extraManga.length !== 0 ? (
            extraManga.map(({ attributes }) => (
              <ExtraManga view={view} attributes={attributes} image={image} />
            ))
          ) : (
            <p>Nous n'avons pas cette ressource</p>
          )}
          {extraManga.length !== 0
            ? isLoading && <SkeletonExtraManga view={view} />
            : null}
        </div>
      </div>
    </>
  );
};

export default MangaPages;
