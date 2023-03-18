import { Palette } from "@mui/material";

interface CustomTheme extends Palette{
  background: {
    default: string,
    alt    : string,
  },
  neutral: {
    dark      : string,
    main      : string,
    mediumMain: string,
    medium    : string,
    light     : string,
  },
  text: {
    primary: string;
  }
}

export default CustomTheme;