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
  }
}

export default CustomTheme;