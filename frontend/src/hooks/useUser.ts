import { useState, useEffect } from "react";
import { signInObserver } from "../firebase/auth";
import type { User } from "firebase/auth";

const useUser = () => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    signInObserver((user) => {
      setUser(user);
    });
  }, []);

  console.log(user);
  return user;
};

export default useUser;
