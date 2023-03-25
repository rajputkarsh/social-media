import { Typography } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import FlexContainer from "../../containers/flexContainer";
import WidgetContainer from "../../containers/widgetContainer"

function MessageBox({ friendId }: {friendId: string | undefined | null}) {
  const divRef = useRef<HTMLElement | null>(null);
  const [topOffset, setTopOffset] = useState(0);

  
  useEffect(() => {
    setTopOffset(divRef?.current?.offsetTop || 0);
  }, []);

  return (
    <WidgetContainer ref={divRef} height={`calc(95vh - ${topOffset}px)`} overflow={'auto'}>
      {
        !friendId && (
          <FlexContainer justifyContent={'center !important'}>
            <Typography variant='h4'>
              Please select a chat to continue
            </Typography>
          </FlexContainer>
        )
      }      
    </WidgetContainer>
  )
}

export default MessageBox