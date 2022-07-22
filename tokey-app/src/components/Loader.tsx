import { Box } from "@mui/system";
import { Loading } from "@nextui-org/react";

export default function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Loading size="lg" />
    </Box>
  );
}
