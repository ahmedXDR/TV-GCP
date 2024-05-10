import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  onAuthStateChanged,
  getIdToken,
  type User,
} from "firebase/auth";
import app from "./config";

const googleProvider = new GoogleAuthProvider();

export const auth = getAuth(app);
export const continueWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInEmailPassword = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);
export const signInObserver = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback);
export const getUserAccessToken = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not logged in");
  }
  return getIdToken(user);
};
