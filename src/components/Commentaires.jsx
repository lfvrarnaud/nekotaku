import { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import UserContext from "../context/UserContext";

function Commentaires() {
  const { user, setUser } = useContext(UserContext);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const interval = setInterval(() => fetchMessages(), 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const apiMessage = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input,
        username: user ? user.username : "Anonymous",
      }),
    };

    const response = await fetch(
      `${process.env.REACT_APP_NEKOTAKU_API}/messenger`,
      requestOptions
    );

    if (response.status === 201) {
      setInput("");
      fetchMessages();
    } else if (response.status === 400) {
      alert("erreur: champs invalide");
    } else {
      alert("unexpected error!");
    }
  };
  function handle(e) {
    setInput(e.target.value);
  }

  const submit = (e) => {
    e.preventDefault();
    apiMessage();
  };

  const [getMessage, setGetMessage] = useState([]);

  async function fetchMessages() {
    fetch(`${process.env.REACT_APP_NEKOTAKU_API}/messenger`)
      .then((response) => response.json())
      .then((json) => {
        setGetMessage(json);
      });
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <>
      <form onSubmit={(e) => sendMessage(e)}>
        <div className="commentaires-container">
          <Box
            sx={{
              "& > :not(style)": { m: 1 },
              border: "solid #003F4F 1px",
              borderRadius: "1%",
              maxWidth: 300,
              minHeight: 700,
              background: "linear-gradient(45deg, #596A92 30%, #C18FBC 90%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="commentaires-input-title">
              <Typography color=" bold primary">
                <p>Commentaires</p>
              </Typography>
            </div>
            <div className="commentaires-input-container">
              <Box
                sx={{
                  "& > :not(style)": { m: 1 },
                  border: "solid #003F4F 1px",
                  borderRadius: "1%",
                  maxWidth: 300,
                  minHeight: 300,
                  textAlign: "flex",
                  bgcolor: "white",
                  wordWrap: "break-word",
                }}
              >
                {getMessage.map((message) => (
                  <p>
                    {message.username}: {message.input}
                  </p>
                ))}
              </Box>
            </div>
            <div className="commentaires-input-container">
              <div className="input-flex">
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <TextField
                    sx={{
                      bgcolor: "background.default",
                      borderRadius: "50px",
                      marginBottom: "10px",
                      outline: "none",
                    }}
                    id="username"
                    value={user ? user.username : "Anonyme"}
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle
                            sx={{
                              color: "#003F4F",
                              mr: 1,
                              my: 0.5,
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </Box>
              </div>
              <div className="input-flex">
                <Box>
                  <TextField
                    sx={{
                      bgcolor: "background.default",
                      marginBottom: "10px",
                      borderRadius: "50px",
                    }}
                    id="input"
                    placeholder="Aa"
                    value={input}
                    onChange={(e) => handle(e)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TextSnippetIcon
                            sx={{ color: "#003F4F", mr: 1, my: 0.5 }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </Box>
              </div>
              <div className="input-flex button-flex">
                <Button
                  sx={{ bgcolor: "background.default", borderRadius: "20px" }}
                  type="submit"
                  variant="outlined"
                  size="small"
                  onClick={submit}
                >
                  Envoyer
                </Button>
              </div>
            </div>
          </Box>
        </div>
      </form>
    </>
  );
}

export default Commentaires;
