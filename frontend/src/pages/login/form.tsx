import { useState } from "react";
import {
  Box,
  Typography,
  OutlinedInput,
  FormLabel,
  Button,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { Email, Https, Visibility, VisibilityOff } from "@mui/icons-material";
import { signInEmailPassword } from "../../firebase/auth";
import { getErrorMessage } from "../../firebase/handler-errors";
import { LoginSchema } from "../../utils/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const submitCallback = async (data: any) => {
    try {
      await signInEmailPassword(data.email, data.password);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage) {
        alert(errorMessage);
        return;
      }
      const errorCode = (error as any).code;
      alert(getErrorMessage(errorCode));
    }
  };

  return (
    <Box
      component="form"
      sx={{
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "20px",
      }}
      onSubmit={handleSubmit(submitCallback)}
    >
      <Box>
        <Typography variant="h3">Login</Typography>
        <Typography variant="subtitle2">
          Welcome Back! It is nice to see you again.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "100%", sm: "400px" },
          gap: "3px",
        }}
      >
        <FormLabel
          htmlFor="email"
          sx={{
            fontSize: "17px",
            fontStyle: "normal",
            fontWeight: "700",
            color: "black",
          }}
        >
          Email
        </FormLabel>
        <OutlinedInput
          id="email"
          type="email"
          required
          placeholder="name@company.com"
          startAdornment={
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          }
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "5px",
              border: "1px solid #E0E0E9",
            },
            "& .MuiInputBase-input": {
              px: "10px",
              py: "18px",
            },
          }}
          {...register("email")}
        />
        {errors.email && (
          <FormHelperText error>
            {errors.email.message as string}
          </FormHelperText>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "100%", sm: "400px" },
          gap: "3px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <FormLabel
            htmlFor="password"
            sx={{
              fontSize: "17px",
              fontStyle: "normal",
              fontWeight: "700",
              color: "black",
            }}
          >
            Password
          </FormLabel>
        </Box>
        <OutlinedInput
          id="password"
          type={showPassword ? "text" : "password"}
          required
          placeholder="Enter your password"
          startAdornment={
            <InputAdornment position="start">
              <Https />
            </InputAdornment>
          }
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "5px",
              border: "1px solid #E0E0E9",
            },
            "& .MuiInputBase-input": {
              px: "10px",
              py: "18px",
            },
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          {...register("password")}
        />
        {errors.password && (
          <FormHelperText error>
            {errors.password.message as string}
          </FormHelperText>
        )}
      </Box>
      <Button
        variant="contained"
        type="submit"
        sx={{
          width: { xs: "100%", sm: "400px" },
          borderRadius: "5px",
          bgcolor: "primary.dark",
          color: "white",
          fontSize: "20px",
          fontStyle: "normal",
          fontWeight: "700",
          textTransform: "none",
          padding: "10px 0px",
        }}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Loading..." : "Login"}
      </Button>
    </Box>
  );
};

export default LoginForm;
