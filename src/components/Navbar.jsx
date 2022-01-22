import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useHistory } from "react-router";
import Search from "./Search";
import UserContext from "../context/UserContext";
import Logo from "../assets/Nekotaku_txt-min.png";

const Navbar = ({ handleOpen }) => {
  const { user } = useContext(UserContext);
  const history = useHistory();

  const [showLinks, setShowLinks] = useState(false);

  const userPages = () => {
    const { username } = user;
    const url = `/user/${username}`;
    history.push(url);
  };
  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };
  const closeBurger = () => {
    setShowLinks(false);
  };

  return (
    <nav className={`navbar ${showLinks ? "showNav" : "hideNav"}`}>
      <img
        src={Logo}
        alt="Logo Nekotaku"
        style={{ height: "100px", width: "80px" }}
      />
      <div className="navbar-container">
        <div className="navbar-bot">
          <div className="navLinks">
            <Link className="navLink" to="/" onClick={closeBurger}>
              Accueil
            </Link>
            <Link
              className="navLink"
              to="/recommandation"
              onClick={closeBurger}
            >
              Recommandations
            </Link>
            <Link className="navLink" to="/actualitées" onClick={closeBurger}>
              Actus
            </Link>
            <Link className="navLink" to="/library" onClick={closeBurger}>
              Bibliothèque
            </Link>
            <Search />
            <div className="navbar-login">
              <AccountCircleIcon
                fontSize="large"
                onClick={!user ? handleOpen : userPages}
              />
              <div
                className="user-name"
                onClick={!user ? handleOpen : userPages}
              >
                {" "}
                {user ? <p>{user.username}</p> : <p>connexion</p>}{" "}
              </div>
            </div>
          </div>
          <button type="button" className="navBurger" onClick={handleShowLinks}>
            <span className="burgerBar" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
