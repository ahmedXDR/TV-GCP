import { Button } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { logout } from "../firebase/auth";

export const LogoutButton = () => {
  return (
    <Button
      onClick={logout}
      startIcon={<Logout />}
      variant="text"
      size="large"
      sx={{
        padding: "10px 25px",
        width: "fit-content",
        margin: "auto",
      }}
    >
      Logout
    </Button>
  );
};
