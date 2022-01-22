import { useEffect, useState } from "react";
import Actu from "../Actu";

const Actus = () => {
  const [actus, setActus] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_NEKOTAKU_API}/actus`)
      .then((response) => response.json())
      .then((json) => {
        setActus(json);
      });
  }, []);

  return (
    <>
      <h2> dernieres actualitées</h2>
      <div className="actus-cards-container">
        {actus.map((actu) => (
          <Actu actu={actu} />
        ))}
      </div>
    </>
  );
};

export default Actus;
