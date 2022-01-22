import { useHistory } from "react-router";
import { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UserContext from "../context/UserContext";

const CardRow = ({ attributes, image, id }) => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  const showMangaPages = () => {
    const url = `/manga/${id}`;
    history.push(url);
  };

  function isBookmarked() {
    return user && user.bookmarks.includes(parseInt(id, 10));
  }

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
    <Card className="card-row-container">
      <CardMedia component="img" image={image} alt="manga couv" />
      <div className="cards-row-content row-no-flex">
        <CardContent className="cards-row-content">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="cards-row-content row-title "
          >
            {attributes.canonicalTitle}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="cards-row-content card-row-extra "
          >
            <p className="rank">Rank: {attributes.popularityRank}</p>
            <p>
              Volumes:{" "}
              {attributes.volumeCount === 0
                ? "non annoncé"
                : attributes.volumeCount}
            </p>
            <p>Statut: {attributes.endDate ? "terminé" : "en cours"}</p>
          </Typography>
        </CardContent>
        <CardActions className="cards-row-button">
          {user && (
            <div onClick={handleClickRead}>
              {isBookmarked() ? (
                <BookmarkAddedIcon color="white" />
              ) : (
                <BookmarkBorderIcon color="white" />
              )}
            </div>
          )}

          <AddCircleIcon color="white" onClick={showMangaPages} />
        </CardActions>
      </div>
    </Card>
  );
};
export default CardRow;
