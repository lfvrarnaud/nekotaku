import Card from "@mui/material/Card";

const Reaction = ({ attributes }) => {
  return (
    <div className="reactionCard">
      <p>{attributes.reaction}</p>
    </div>
  );
};

export default Reaction;
