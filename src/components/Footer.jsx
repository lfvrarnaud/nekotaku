import { useContext } from "react";
import { useHistory } from "react-router";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Button } from "@mui/material";
import UserContext from "../context/UserContext";

const Footer = ({ handleOpen }) => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const logout = () => {
    setUser("");
  };
  const userPages = () => {
    const username = user.username;
    const url = `/user/${username}`;
    history.push(url);
  };

  return (
    <footer>
      <div className="footer-user">
        {!user && (
          <div className="register">
            <h4>INSCRIVEZ-VOUS, C'EST GRATUIT !</h4>
            <p>
              Créez votre compte dès maintenant pour gérer votre collection,
              noter, critiquer, commenter et découvrir de nouvelles oeuvres !
            </p>
            <Button color="secondary" variant="outlined" onClick={handleOpen}>
              je m'inscris
            </Button>
          </div>
        )}
        {user && (
          <div className="logout">
            <h4>ようこそ!</h4>
            <Button color="secondary" variant="outlined" onClick={userPages}>
              Mon compte
            </Button>
            <Button color="secondary" variant="outlined" onClick={logout}>
              logout
            </Button>
          </div>
        )}
      </div>
      <div className="footer-center">
        <div className="social-media">
          <p>Retrouvez nous sur les réseaux:</p>
          <div>
            <a
              href="https://twitter.com/kafemanga?"
              target="_blank"
              rel="noreferrer"
            >
              <TwitterIcon color="secondary" />
            </a>
            <a
              href="https://github.com/WildCodeSchool/nekotaku"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon color="secondary" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCKCakBTkVE8e8BkRw7Gwmnw"
              target="_blank"
              rel="noreferrer"
            >
              <YouTubeIcon color="secondary" />
            </a>
          </div>
          <div />
        </div>
        <div className="copyright">
          <p>Copyright © 2021 Nekotaku. Tous droits réservés.</p>
        </div>
      </div>
      <div className="propos">
        <h4>A PROPOS DE NEKOTAKU</h4>
        <p>
          Le réseau Nekotaku regroupe des sites thématiques autour des Manga
        </p>
        <p>
          Vous pouvez gérer vos collections grâce à un outil 100% gratuit. Les
          sites du réseau Nekotaku sont des sites d'information et d'actualité.
          Merci de ne pas nous contacter pour obtenir du scantrad (scan
          d'ouvrages par chapitre), du fansub ou des adresses de sites de
          streaming illégaux.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
