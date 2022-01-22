import { useState, useEffect } from "react";
import MangaPages from "../MangaPages";
import { fetchIdManga } from "../../service/service_api";

const Manga = (props) => {
  const [idManga, setIdManga] = useState([]);
  const [poster, setPoster] = useState([]);
  const { params } = props.match;

  useEffect(() => {
    fetchIdManga(params.id).then((data) => {
      setIdManga(data.attributes);
      setPoster(data.attributes.posterImage);
    });
  }, [params.id]);

  return (
    <>
      <MangaPages attributes={idManga} image={poster} params={params} />
    </>
  );
};

export default Manga;
