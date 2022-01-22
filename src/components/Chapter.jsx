import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const Chapter = ({ attributes, image }) => {
  return (
    <Card className="chapterCard">
      <div
        className="chapter-content"
        style={{
          backgroundImage: `url(${image.small})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <div className="chapter-filter" />
        <div className="chapter-text">
          <p>Chapitre {attributes.number}</p>
          {attributes.canonicalTitle ? (
            <p>{attributes.canonicalTitle}</p>
          ) : null}
        </div>
      </div>
    </Card>
  );
};

export default Chapter;
