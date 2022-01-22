import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const Actu = ({ actu }) => {
  return (
    <div className="actuCard">
      <Card>
        <CardMedia component="img" image={actu.image} alt="actu image" />
        <div className="actu-text">
          <h3 className="actu-title">{actu.title}</h3>
          <p className="actu-content">{actu.text}</p>
          <div className="actu-footer">
            <p>{actu.signature}</p>
            <p>date: {actu.date}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Actu;
