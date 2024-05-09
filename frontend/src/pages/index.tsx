import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { ThemeProvider } from "@emotion/react";
import Loading from "../components/loading";
import THEME from "../mui-theme";
import ProtectedRoute from "../components/protected";
import Home from "./home";
import Login from "./login";

const App = () => (
  <Suspense fallback={<Loading />}>
    <ThemeProvider theme={THEME}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route
            path="/home/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<p> Page Not found! </p>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </Suspense>
);

export default App;
