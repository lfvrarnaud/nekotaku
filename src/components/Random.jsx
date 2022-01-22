import { useEffect, useState } from "react";
import Button from "@mui/material/Button";

import { fetchMangas } from "./../service/service_api";
import Cards from "./Cards";

const Random = () => {
  let randomNumber = Math.floor(Math.random() * (50000 - 1 + 1) + 1);
  const [mangas, setMangas] = useState([]);
  const [alea, setAlea] = useState(randomNumber);

  const random = () => {
    setAlea(randomNumber);
  };

  useEffect(() => {
    fetchMangas(1, alea).then((data) => {
      setMangas([...data]);
    });
  }, [alea]);

  return (
    <div className="randomCards">
      <h3>choisir un manga aléatoire</h3>
      {mangas.map(({ attributes, id }) => (
        <Cards
          attributes={attributes}
          image={attributes.posterImage.small}
          id={id}
        />
      ))}
      <Button className="button" variant="contained" onClick={random}>
        Random
      </Button>
    </div>
  );
};

export default Random;
