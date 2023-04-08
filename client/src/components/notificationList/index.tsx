import { Badge, MenuItem, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import FlexContainer from "../../containers/flexContainer";
import { ReduxState } from "../../interfaces";
import ProfilePicture from "../profilePicture";
import * as moment from "moment-timezone";
import { URL } from "../../constants";
import { setNotifications } from "../../state";
import { useNavigate } from "react-router-dom";

function NotificationList() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const notifications = useSelector((state: ReduxState) => state.notifications);
  const token = useSelector((state: ReduxState) => state.user?.token);

  const getTime = (time: string) => {
    const hours = moment().utc().diff(moment(time)) / 3600000;

    return Math.round(hours) > 0
      ? `${Math.round(hours)}h`
      : `${Math.round(hours * 60)}m`;
  };

  const handleNotification = (notificationInfo: { [key: string]: any }) => {

    let previousNotifications: Array<{ [key: string]: any }> = JSON.parse(
      JSON.stringify(notifications)
    );
    const notificationIndex = previousNotifications.findIndex(
      (obj) => obj.id == notificationInfo?.id
    );
    previousNotifications[notificationIndex]["status"] = "SEEN";
    dispatch(setNotifications({ notifications: previousNotifications }));

    fetch(URL.MARK_NOTIFICATION_SEEN(notificationInfo?._id), {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });

    navigate(`/profile/${notificationInfo?.sender?._id}`);

  };

  if (!notifications?.length) {
    return (
      <MenuItem
        sx={{
          width: "35vw",
          minHeight: "2.8vh",
          textTransform: "capitalize",
        }}
      >
        <Typography variant={"body1"}>No Notifications Found</Typography>
      </MenuItem>
    );
  }

  return (
    <>
      {notifications.map((notification) => (
        <MenuItem
          onClick={() => handleNotification(notification)}
          key={`notification_${notification?._id}`}
          sx={{
            width: "35vw",
            minHeight: "2.8rem",
            textTransform: "capitalize",
            whiteSpace: "break-spaces",
          }}
        >
          <FlexContainer
            gap={"1rem"}
            width="80%"
            justifyContent={"flex-start !important"}
          >

            <Badge
              color="error"
              variant="dot"
              sx={
                notification?.status === "NOT_SEEN"
                  ? { marginRight: "10px" }
                  : { marginRight: "10px", visibility: "hidden" }
              }
            />

            <ProfilePicture
              image={notification?.sender?.profilePicture}
              size={"30px"}
            />
            <Typography variant="body1">{notification.text}</Typography>
          </FlexContainer>
          <FlexContainer width="20%" justifyContent={"flex-end !important"}>
            <p style={{ textAlign: "right" }}>
              <sub> {getTime(notification?.createdAt)} </sub>
            </p>
          </FlexContainer>
        </MenuItem>
      ))}
    </>
  );
}

export default NotificationList;
