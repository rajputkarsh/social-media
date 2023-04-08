import { Button, Typography, useTheme } from "@mui/material";
import FlexContainer from "../../../containers/flexContainer";
import WidgetContainer from "../../../containers/widgetContainer";
import { CustomTheme } from "../../../interfaces";

const Advertisement = () => {
  const { palette }: { palette: CustomTheme } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetContainer>
      <FlexContainer>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexContainer>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="https://firebasestorage.googleapis.com/v0/b/social-media-70beb.appspot.com/o/Screenshot%20from%202023-04-09%2001-52-12.png?alt=media&token=26b4102a-73c4-44b6-8526-6ae11df72680"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexContainer>
        <Typography color={main}>Best Developer</Typography>
        <Button
          size="small"
          type="submit"
          onClick={() => window.open('https://utkarshrajput.com', '_blank')}
          sx={{
            backgroundColor: palette.primary.main,
            color: palette.background.alt,
            "&:hover": { color: palette.primary.main },
          }}        
        >
          Click Here
        </Button>
      </FlexContainer>
      <Typography color={medium} m="0.5rem 0">
          Hire the best MERN Stack developer today! Contact now for more details. <br/> Offer valid till stock lasts!
      </Typography>
    </WidgetContainer>
  );
};

export default Advertisement;