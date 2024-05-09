import { useState, useEffect } from "react";
import { signInObserver } from "../firebase/auth";

const useLogin = () => {
  const [isLogged, setIsLogged] = useState<boolean>();

  useEffect(() => {
    signInObserver((user) => {
      setIsLogged(!!user);
    });
  }, []);

  return isLogged;
};

export default useLogin;
