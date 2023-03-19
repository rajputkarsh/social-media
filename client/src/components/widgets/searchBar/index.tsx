
import { Autocomplete, AutocompleteInputChangeReason, AutocompleteChangeReason, TextField, useTheme } from "@mui/material";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SETTINGS, URL } from "../../../constants";
import FlexContainer from "../../../containers/flexContainer";
import { CustomTheme, ReduxState, SearchOptions } from "../../../interfaces";

const MININUM_SEARCH_LENGTH = 3;

function SearchBar() {

  const [options, setOptions] = useState<Array<SearchOptions>>([SETTINGS.DEFAULT_SEARCH_OPTION]);
  const token = useSelector((state: ReduxState) => state.user?.token);
  const navigate = useNavigate();
  let previousController = useRef(new AbortController());

  const { palette } : { palette: CustomTheme } = useTheme();
  const neutralLight = palette.neutral.light;

  const getSearchResults = async (term: string) => {
    if (previousController.current) {
      previousController.current.abort();
    }
    const controller = new AbortController();
    const signal = controller.signal;
    previousController.current = controller;

    const response = await fetch(URL.SEARCH_TERM(term), {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      signal: signal,
     });    

     const data = await response.json();
     if(data.status !== 200) return;

     const newOptions = data?.data?.map((option: {[key: string]: any}) => {
      if(option.type == 'USER'){
        return {
          label: `${option.firstName} ${option.lastName} (${option.userName})`,
          id   : option._id,
          type : option.type,
        };
      }
     });

     setOptions((prev) => newOptions);
  };

  const handleInputChange = (event: React.SyntheticEvent, value: string, reason: AutocompleteInputChangeReason) => {
    if (value && value.length >= MININUM_SEARCH_LENGTH) {
      getSearchResults(value);
    } else {
      setOptions((prev) => [SETTINGS.DEFAULT_SEARCH_OPTION]);
    }
  };  

  const handleChange = (event: React.SyntheticEvent, option: SearchOptions | null, reason: AutocompleteChangeReason) => {
    if (!option) return;

    if(option.type == 'USER'){
      navigate(`/profile/${option.id}`)
    }

  }
  
  return (
    <FlexContainer
    sx={{
      backgroundColor: { neutralLight },
      borderRadius: "9px",
      gap: "0rem",
      padding: "0.1rem 0rem",
    }}
  >
    <Autocomplete
      options={options}
      popupIcon = {null}
      noOptionsText={SETTINGS.DEFAULT_SEARCH_OPTION.label}
      onInputChange={handleInputChange}
      onChange={handleChange}
      renderInput={(params) => <TextField sx={{width:'27rem'}} {...params} size='small' placeholder="Search..." />}
    />
  </FlexContainer>
  )
}

export default SearchBar;
