import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};
const ModalPut = ({ user, open, handleClose }) => {
  const [newUser, setNewUser] = useState(user);

  function onUserChange(e) {
    setNewUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  const saveUser = async () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    };
    await fetch(`${process.env.REACT_APP_NEKOTAKU_API}/users`, requestOptions).then(
      (response) => response
    );
    handleClose();
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form className="form-change-info">
            <div className="info-user">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={newUser.email}
                onChange={onUserChange}
              />
            </div>

            <div className="info-user">
              <label htmlFor="username">Pseudo</label>
              <input
                type="text"
                id="username"
                name="username"
                value={newUser.username}
                onChange={onUserChange}
              />
            </div>
            <Button onClick={saveUser} variant="contained">
              Valider
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalPut;
