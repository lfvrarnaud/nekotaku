import { useContext, useEffect, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import UserParams from "./UserParams";
import UserContext from "../context/UserContext";
import FormActus from "./FormActus";
import { fetchRead } from "../service/service_api";
import SkeletonCard from "./SkeletonCard";
import Cards from "./Cards";

const User = () => {
  const { user } = useContext(UserContext);
  const [showSettings, setShowSettings] = useState(false);
  const [mangas, setMangas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const bookmarkList = user.bookmarks.join(",").split(",");
  const result = [];
  const itemPerSlice = 20;

  const splicList = () => {
    bookmarkList.forEach((_, i) => {
      if (i % itemPerSlice === 0) {
        result.push(bookmarkList.slice(i, i + itemPerSlice));
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchRead(user.bookmarks.join(",")).then((data) => {
      if (data !== undefined) {
        setMangas(data);
        setIsLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    splicList();
    setIsLoading(true);
    Promise.all(result.map((idList) => fetchRead(idList))).then((data) => {
      if (data !== undefined) {
        setMangas(data.flat());
        setIsLoading(false);
      }
    });
  }, []);
  return (
    <div className="user-container">
      <div className="user-presntation">
        <img
          src="http://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
          alt=""
          className="user-avatar"
        />
        <div className="user-description">
          <h2 className="username">{user.username}</h2>
          <div className="user-setting">
            <p>inscrit depuis le: {user.created}</p>
            <SettingsIcon
              color="secondary"
              variant="large"
              onClick={() => setShowSettings(!showSettings)}
            />
          </div>
          {showSettings && <UserParams />}
        </div>
        <div className="post-actu">{user.role && <FormActus />}</div>
      </div>
      <h3>Mes favoris</h3>
      {mangas.length !== 0 && (
        <div className="library-read">
          {mangas.map(({ attributes, id }) => (
            <Cards
              attributes={attributes}
              image={attributes.posterImage.small}
              id={id}
            />
          ))}
          {isLoading && (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default User;
