import { Button } from "@mui/material";
import { continueWithGoogle } from "../../firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";

const ContinueWithGoogle = () => {
  return (
    <Button
      variant="outlined"
      sx={{
        minHeight: "55px",
        borderColor: "primary.dark",
        "&": {
          color: "primary.dark",
        },
      }}
      startIcon={<GoogleIcon />}
      fullWidth
      onClick={() => continueWithGoogle()}
    >
      Continue with Google
    </Button>
  );
};

export default ContinueWithGoogle;
