import Chapter from "./Chapter";
import Character from "./Character";
import Reaction from "./Reaction";

const ExtraManga = ({ view, attributes, image }) => {
  if (view === "chapter") {
    return <Chapter attributes={attributes} image={image} />;
  }

  if (view === "character") {
    return <Character attributes={attributes} />;
  }

  if (view === "reaction") {
    return <Reaction attributes={attributes} />;
  }
};

export default ExtraManga;
