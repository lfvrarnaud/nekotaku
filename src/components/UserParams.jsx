import { useState, useContext } from "react";
import { Button } from "@mui/material";
import ModalPut from "./ModalPut";
import UserContext from "../context/UserContext";

const UserParams = () => {
  const { user } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="user-container">
      <h1>Votre compte</h1>
      <div className="user">
        <ModalPut user={user} open={isOpen} handleClose={handleClose} />
        <div className="user-info">
          <p>Email : {user.email}</p>
        </div>
        <div className="bar-separation" />
        <div className="user-info">
          <p>Pseudo : {user.username}</p>
        </div>
        <div className="bar-separation" />
        <div className="user-info justify-center">
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => setIsOpen(true)}
          >
            Modifier votre profil
          </Button>
        </div>
        <div className="bar-separation" />
        <p>créé le : {Date(user.created)}</p>
      </div>
    </div>
  );
};

export default UserParams;
