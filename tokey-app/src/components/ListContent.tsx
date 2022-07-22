import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export default function ListContent({
  icon,
  text,
  onClick,
}: {
  icon: React.ReactElement;
  text: string;
  onClick?: () => void;
}) {
  return (
    <ListItem onClick={onClick} disablePadding>
      <ListItemButton>
        <ListItemIcon style={{ minWidth: "40px" }}>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}
