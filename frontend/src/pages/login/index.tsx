import { Box, Typography } from "@mui/material";
// import LoginForm from "./form";
import ContinueWithGoogle from "./google-auth";

// const OrDivider = () => (
//   <Box className="flex items-center gap-4">
//     <Divider sx={{ width: "100%", bgcolor: "graytext" }} />
//     <Typography
//       sx={{
//         position: "absolute",
//         width: "fit-content",
//         bgcolor: "white",
//         fontSize: "12px",
//         px: "10px",
//         margin: "auto",
//         left: 0,
//         right: 0,
//       }}
//     >
//       OR
//     </Typography>
//   </Box>
// );

const LoginPage = () => (
  <Box className="relative w-full min-h-screen flex items-center justify-center overflow-clip">
    <Box className="relative z-10 bg-white w-max flex flex-col gap-7 p-12 border rounded-md">
      <Typography variant="h3">Login</Typography>
      {/* <LoginForm />
      <OrDivider /> */}
      <ContinueWithGoogle />
    </Box>
    <Box className="absolute bg-blue-950 opacity-5 w-[1000px] h-[1000px] m-auto rounded-full -bottom-[300px]"></Box>
  </Box>
);

export default LoginPage;
