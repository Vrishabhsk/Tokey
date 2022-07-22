/* eslint-disable no-restricted-globals */
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import GridViewIcon from "@mui/icons-material/GridView";
import KeyIcon from "@mui/icons-material/Key";
import DescriptionIcon from "@mui/icons-material/Description";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import LogoutIcon from "@mui/icons-material/Logout";
import ToolBarTab from "../Account/ToolBarTab";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ListContent from "../../components/ListContent";
import toast from "react-hot-toast";
import { Container, useTheme } from "@nextui-org/react";

const drawerWidth = 240;

function Layout({ children, refetch }: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const { theme }: any = useTheme();

  const LogoutUser = () => {
    localStorage.removeItem("email");
    removeCookie("token", { path: "/" });
    toast.success("Logged Out!");
    navigate("/");
  };

  const drawer = (
    <Container
      css={{ background: "$background", height: "100vh", display: "grid", padding: "0px" }}
    >
      <List>
        <ToolBarTab refetch={refetch} />
        <ListContent
          icon={<GridViewIcon style={{ color: theme?.colors?.iconColor?.value }} />}
          text="All Items"
          onClick={() => navigate("/vault/items")}
        />
        <ListContent
          onClick={() => navigate("/vault/pwds")}
          icon={<KeyIcon style={{ color: theme?.colors?.iconColor?.value }} />}
          text="Passwords"
        />
        <ListContent
          onClick={() => navigate("/vault/notes")}
          icon={<DescriptionIcon style={{ color: theme?.colors?.iconColor?.value }} />}
          text="Secure Notes"
        />
        <ListContent
          onClick={() => navigate("/vault/cards")}
          icon={<CreditCardIcon style={{ color: theme?.colors?.iconColor?.value }} />}
          text="Secure Cards"
        />
      </List>
      <List style={{ marginTop: "auto" }}>
        <ListContent
          onClick={() => navigate("/vault/create-pwd")}
          icon={<AddModeratorIcon style={{ color: theme?.colors?.iconColor?.value }} />}
          text="Password Generator"
        />
        <ListContent
          onClick={LogoutUser}
          icon={<LogoutIcon style={{ color: theme?.colors?.iconColor?.value }} />}
          text="Logout"
        />
      </List>
    </Container>
  );

  if (!location.pathname.includes("vault")) return children;

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer variant="permanent">{drawer}</Drawer>
      </Box>
      <Box component="main" sx={{ height: "100vh", width: "100%" }}>
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
