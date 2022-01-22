import { useState, useContext } from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import UserContext from "../context/UserContext";

const LoginModal = ({ open, handleClose }) => {
  const { user, setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setmail] = useState("");

  const [registerUser, setRegisterUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loginUser, setLoginUser] = useState({
    username: "",
    clearPassword: "",
  });

  const apiPost = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerUser),
    };

    const response = await fetch(
      `${process.env.REACT_APP_NEKOTAKU_API}/users`,
      requestOptions
    );

    if (response.status === 201) {
      alert("vous avez bien été inscrit");
      handleClose();
    } else if (response.status === 400) {
      alert("erreur: champs invalide");
    } else {
      alert("utilisateur ou mail deja existant");
    }
  };

  const apiLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginUser),
    };

    const response = await fetch(
      `${process.env.REACT_APP_NEKOTAKU_API}/login`,
      requestOptions
    );

    if (response.status === 400) {
      alert("erreur: champs obligatoire");
    } else if (response.status === 401) {
      alert("mot de passe ou pseudo incorrect");
    } else if (response.status === 500) {
      alert("unexpected error");
    } else {
      setUser(await response.json());
      handleClose();
    }
  };

  const submit = (e) => {
    e.preventDefault();
    apiPost();
  };

  const handle = (e) => {
    e.persist();
    const newUser = { ...registerUser };
    newUser[e.target.name] = e.target.value;
    setRegisterUser(newUser);
  };
  const handleLogin = (e) => {
    e.persist();
    const newLoginUser = { ...loginUser };
    newLoginUser[e.target.id] = e.target.value;
    setLoginUser(newLoginUser);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box>
        <div className="modal">
          <div className="singin">
            <h3 className="modal-title">Inscrivez-vous</h3>
            <div className="register">
              <form className="singin-form">
                <TextField
                  sx={{ marginTop: "20px" }}
                  type="text"
                  name="username"
                  placeholder="votre pseudo"
                  required
                  onChange={(e) => handle(e)}
                  id="username"
                  value={registerUser.username}
                  label="Pseudo"
                  variant="standard"
                />
                <TextField
                  sx={{ marginTop: "20px" }}
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  required
                  onChange={(e) => handle(e)}
                  id="email"
                  value={registerUser.email}
                  label="Email"
                  variant="standard"
                />
                <TextField
                  sx={{ marginTop: "20px" }}
                  type="password"
                  name="password"
                  placeholder="votre mdp"
                  required
                  onChange={(e) => handle(e)}
                  id="password"
                  value={registerUser.password}
                  label="Mot de Passe"
                  variant="standard"
                />
                <Button
                  sx={{ marginTop: "30px", marginBottom: "30px" }}
                  variant="contained"
                  className="modal-button singin-button"
                  color="secondary"
                  size="small"
                  onClick={submit}
                >
                  Inscription
                </Button>
              </form>
            </div>
          </div>
          <div className="login">
            <h3 className="modal-title">Connectez-vous</h3>
            <div className="loginForm">
              <form className="login-form">
                <TextField
                  sx={{ marginTop: "30px" }}
                  type="text"
                  name="username"
                  placeholder="votre pseudo"
                  required
                  onChange={(e) => handleLogin(e)}
                  id="username"
                  value={loginUser.username}
                  label="Pseudo"
                  variant="standard"
                />
                <TextField
                  sx={{ marginTop: "30px" }}
                  type="password"
                  name="clearPassword"
                  placeholder="votre mdp"
                  required
                  onChange={(e) => handleLogin(e)}
                  id="clearPassword"
                  value={loginUser.clearPassword}
                  label="Mot de Passe"
                  variant="standard"
                />
                <Button
                  sx={{ marginTop: "30px", marginBottom: "30px" }}
                  variant="contained"
                  className="modal-button login-button"
                  color="secondary"
                  size="small"
                  onClick={apiLogin}
                >
                  Connexion
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div className="clse-modal">
          <Button
            sx={{ marginLeft: "46%", marginTop: "30px" }}
            variant="contained"
            className="close-modal"
            color="secondary"
            onClick={handleClose}
            size="large"
          >
            Fermer
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default LoginModal;
