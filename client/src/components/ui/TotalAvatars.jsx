import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import avatar1 from "../../images/avatar-1.webp";
import avatar2 from "../../images/avatar-2.webp";
import avatar3 from "../../images/avatar-3.webp";
import avatar4 from "../../images/avatar-4.webp";

export default function TotalAvatars() {
  return (
    <AvatarGroup total={24}>
      <Avatar alt="Remy Sharp" src={avatar1} />
      <Avatar alt="Travis Howard" src={avatar2} />
      <Avatar alt="Agnes Walker" src={avatar3} />
      <Avatar alt="Trevor Henderson" src={avatar4} />
    </AvatarGroup>
  );
}
