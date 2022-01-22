import { useState, useEffect } from "react";
import SliderFanReco from "../SliderFanReco";
import SliderPrincipal from "../SliderPrincipal";
import Commentaires from "../Commentaires";
import SliderLastUpdate from "../SliderLastUpdate";
import LastActuCard from "../LastActuCard";

const Home = () => {
  const [lastActu, setLastActu] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_NEKOTAKU_API}/actus`)
      .then((response) => response.json())
      .then((json) => {
        setLastActu(json[0]);
      });
  }, []);

  return (
    <div className="home-container">
      <div className="home-margin">
        <LastActuCard lastActu={lastActu} />
        <div className="home-silder">
          <h3>Prochaines Sorties Mangas</h3>
          <SliderLastUpdate />
          <h3>Recommandés par les fans</h3>
          <SliderFanReco />
        </div>
        <div className="home-bottom">
          <SliderPrincipal />
          <Commentaires />
        </div>
      </div>
    </div>
  );
};

export default Home;
