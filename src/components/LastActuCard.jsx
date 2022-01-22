import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import { width } from "@mui/system";

function LastActuCard({ lastActu }) {
  return (
    <div className="last-actu-container">
      <Card sx={{ minHeight: 500, width: "100%" }}>
        <div
          className="last-actu-card"
          style={{
            backgroundImage: `url(${lastActu.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: 500,
          }}
        >
          <div className="last-actu-filter" />
          <div className="last-actu-text">
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {lastActu.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {lastActu.text}
              </Typography>
            </CardContent>
            <CardActions>
              <p>{lastActu.signature}</p>
            </CardActions>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default LastActuCard;
