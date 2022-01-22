import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useHistory } from "react-router";
import { fetchSearch } from "../service/service_api";

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const onSearchInputChange = (_, value) => {
    setIsLoading(true);

    fetchSearch(value).then((data) => {
      setSearchResults(
        data.map((option) => ({
          label: option.attributes.canonicalTitle,
          id: option.id,
        }))
      );

      setIsLoading(false);
    });
  };

  const onSearchSelected = (_, value) => {
    history.push(`/manga/${value.id}`);
  };

  return (
    <Autocomplete
      sx={{ width: 300 }}
      freeSolo
      id="search"
      loading={isLoading}
      disableClearable
      onInputChange={onSearchInputChange}
      onChange={onSearchSelected}
      options={searchResults}
      renderInput={(params) => (
        <TextField
          {...params}
          className="text-area"
          label="Recherche..."
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
}
