import { useState, useContext } from "react";
import ReactCardFlip from "react-card-flip";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import UserContext from "../context/UserContext";

function Cards({ attributes, image, id }) {
  const { user, setUser } = useContext(UserContext);
  const [isFlipped, setIsFlipped] = useState(false);

  const history = useHistory();

  function isBookmarked() {
    return user && user.bookmarks.includes(parseInt(id, 10));
  }

  const handleIsFlipped = () => {
    setIsFlipped(!isFlipped);
  };
  const showMangaPages = () => {
    const url = `/manga/${id}`;
    history.push(url);
  };

  const handleClickRead = async () => {
    const newBookmark = { manga_id: id, user_id: user.id };
    if (!isBookmarked()) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBookmark),
      };

      await fetch(
        `${process.env.REACT_APP_NEKOTAKU_API}/bookmark`,
        requestOptions
      );

      setUser({
        ...user,
        bookmarks: [...user.bookmarks, parseInt(id, 10)],
      });
    } else {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBookmark),
      };

      await fetch(
        `${process.env.REACT_APP_NEKOTAKU_API}/bookmark`,
        requestOptions
      );

      setUser({
        ...user,
        bookmarks: user.bookmarks.filter(
          (bookmark) => bookmark !== parseInt(id, 10)
        ),
      });
    }
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div className="recto library_container">
        <div className="cards">
          <Card sx={{ maxWidth: 345 }}>
            <div
              className="card-content"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "top",
              }}
            >
              <div className="card-filter" />
              <div className="card-text">
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="cards-title"
                  color="text.secondary"
                >
                  {attributes.canonicalTitle}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="cads-text"
                >
                  <p className="rank">Rank: {attributes.popularityRank}</p>
                  <div className="cards-info">
                    <p>
                      Volumes:{" "}
                      {attributes.volumeCount === 0
                        ? "non annoncé"
                        : attributes.volumeCount}
                    </p>
                    <p>Statut: {attributes.endDate ? "terminé" : "en cours"}</p>
                  </div>
                </Typography>
                <CardActions className="cards-button">
                  <Button
                    variant="contained"
                    className="button"
                    size="small"
                    bgcolor="secondary"
                    onClick={handleIsFlipped}
                  >
                    Synopsis
                  </Button>
                  {user && (
                    <div onClick={handleClickRead}>
                      {isBookmarked() ? (
                        <BookmarkAddedIcon color="white" />
                      ) : (
                        <BookmarkBorderIcon color="white" />
                      )}
                    </div>
                  )}
                  <Fab
                    color="primary"
                    aria-label="add"
                    size="small"
                    onClick={showMangaPages}
                  >
                    <AddIcon />
                  </Fab>
                </CardActions>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="verso library_container">
        <div className="cards">
          <Card sx={{ maxWidth: 345 }} className="verso-cards">
            <div>
              <CardContent className="verso-container">
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="cards-title"
                >
                  {attributes.canonicalTitle}
                </Typography>
                <Typography>
                  <p>{attributes.synopsis}</p>
                </Typography>
              </CardContent>
            </div>
            <CardActions className="cards-button">
              <Button
                variant="contained"
                className="button"
                size="small"
                onClick={handleIsFlipped}
              >
                Synopsis
              </Button>
              {user && (
                <div onClick={handleClickRead}>
                  {isBookmarked() ? (
                    <BookmarkAddedIcon />
                  ) : (
                    <BookmarkBorderIcon />
                  )}
                </div>
              )}

              <AddCircleIcon onClick={showMangaPages} />
            </CardActions>
          </Card>
        </div>
      </div>
    </ReactCardFlip>
  );
}

export default Cards;
