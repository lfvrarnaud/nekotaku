import { useState } from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

const FormActus = () => {
  const [messageModal, setMessageModal] = useState("");
  const [formActus, setFormActus] = useState({
    title: "",
    image: "",
    article: "",
    sign: "",
  });

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const actusPost = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formActus),
    };

    const response = await fetch(
      `${process.env.REACT_APP_NEKOTAKU_API}/actus`,
      requestOptions
    );

    if (response.status === 201) {
      setMessageModal("Votre article a bien été publié");
      setOpen(true);
    } else if (response.status === 400) {
      setMessageModal("erreur: champs invalide");
      setOpen(true);
    } else {
      setMessageModal("unexpected error");
      setOpen(true);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    actusPost();
  };

  const handle = (e) => {
    e.persist();
    const newArticle = { ...formActus };
    newArticle[e.target.name] = e.target.value;
    setFormActus(newArticle);
  };

  return (
    <div className="form-actus">
      <Modal
        open={open}
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "",
        }}
      >
        <Box
          className="modal-actus"
          sx={{
            position: "relative",
            width: 400,
            bgcolor: "var(--secondary)",
            color: "var(--primary)",
            border: "2px solid var(--primary)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
          }}
        >
          <h4>{messageModal}</h4>
          <Button
            variant="contained"
            className="close-actus-modal"
            onClick={handleClose}
          >
            OK
          </Button>
        </Box>
      </Modal>
      <div>
        <Box>
          <h3>Nouvelles Actus</h3>
          <div className="form">
            <FormControl>
              <form>
                <div className="actus-form">
                  <TextField
                    className="input"
                    type="text"
                    name="title"
                    placeholder="titre de l'article"
                    required
                    onChange={(e) => handle(e)}
                    id="title"
                    value={formActus.title}
                    label="titre"
                    variant="standard"
                  />
                  <TextField
                    className="input"
                    type="url"
                    name="image"
                    placeholder="https://url-de-l'image"
                    required
                    onChange={(e) => handle(e)}
                    id="actus-image"
                    value={formActus.image}
                    label="img url"
                    variant="standard"
                  />
                  <TextField
                    className="input"
                    type="text"
                    name="article"
                    placeholder="article"
                    required
                    onChange={(e) => handle(e)}
                    id="article"
                    value={formActus.article}
                    label="article"
                    variant="standard"
                    multiline
                    rows={6}
                  />
                  <TextField
                    className="input"
                    type="text"
                    name="sign"
                    placeholder="signature"
                    required
                    onChange={(e) => handle(e)}
                    id="sign"
                    value={formActus.sign}
                    label="signature"
                    variant="standard"
                  />
                  <Button
                    variant="contained"
                    className="modal-button"
                    size="small"
                    onClick={submit}
                  >
                    Envoyer
                  </Button>
                </div>
              </form>
            </FormControl>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default FormActus;
