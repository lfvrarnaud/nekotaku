import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function Categories({ value, onChange }) {
  return (
    <div className="buttons-categories">
      <ToggleButtonGroup
        value={value}
        color="secondary"
        className="ToggleButton"
        exclusive
        onChange={(event) => onChange(event.target.value)}
      >
        <ToggleButton value="shounen">Shonen</ToggleButton>
        <ToggleButton value="shoujo">Shojo</ToggleButton>
        <ToggleButton value="seinen">Seinen</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
