import { useState, useEffect } from "react";
import Random from "../Random";
import { fetchIdManga } from "../../service/service_api";
import Cards from "../Cards";
import Categories from "../Categories";
import SliderPrincipal from "../SliderPrincipal";
import SliderFanReco from "../SliderFanReco";
import SliderLastUpdate from "../SliderLastUpdate";

const Recommandation = () => {
  const [mangas, setMangas] = useState([]);
  const [viewReco, setViewReco] = useState("shounen");
  const [recoMangas, setRecoMangas] = useState([41017, 9590, 9158]);
  const [typeOfManga, setTypeOfManga] = useState("Shonen");

  useEffect(() => {
    Promise.all(recoMangas.map((id) => fetchIdManga(id))).then((results) =>
      setMangas(results)
    );
  }, [recoMangas]);

  const onViewChange = (event) => {
    setViewReco(event);
    if (event === "shounen") {
      setRecoMangas([41017, 9590, 9158]);
      setTypeOfManga("Shonen");
    }
    if (event === "shoujo") {
      setRecoMangas([11152, 2839, 26938]);
      setTypeOfManga("Shojo");
    }
    if (event === "seinen") {
      setRecoMangas([906, 36091, 36506]);
      setTypeOfManga("Seinen");
    }
  };

  return (
    <>
      <div>
        <h2>Nos recommandations {typeOfManga}</h2>
        <div className="reco-categories">
          <Categories value={viewReco} onChange={onViewChange} />
        </div>
        <div className="reco-mangas">
          {mangas.map((manga) => (
            <Cards
              attributes={manga.attributes}
              image={manga.attributes.posterImage.small}
              id={manga.id}
            />
          ))}
        </div>
      </div>
      <div className="reco-central">
        <div className="home-silder">
          <h3>Prochaines Sorties Mangas</h3>
          <SliderLastUpdate />
          <h3>Recommandés par les fans</h3>
          <SliderFanReco />
        </div>
        <Random />
      </div>
      <div className="home-silder">
        <div>
          <h3>Mangas les plus Populaires</h3>
          <SliderPrincipal />
        </div>
      </div>
    </>
  );
};

export default Recommandation;
