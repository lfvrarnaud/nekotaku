import { inputClasses } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const Character = ({ attributes }) => {
  return (
    <Card className="characterCard">
      <div
        className="chapter-content"
        style={{
          backgroundImage: `url(${attributes.image.original})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <div className="character-filter" />

        <p className="character-name">{attributes.name}</p>
      </div>
    </Card>
  );
};

export default Character;
