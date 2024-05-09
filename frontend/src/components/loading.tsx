import { Box, CircularProgress } from "@mui/material";

const Loading = () => (
  <Box
    sx={{
      width: "100vw",
      height: "100svh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <CircularProgress />
  </Box>
);

export default Loading;
