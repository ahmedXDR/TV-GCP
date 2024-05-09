import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  browserSessionPersistence,
  getAuth,
  setPersistence,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import app from "./config";

export const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence);

const googleProvider = new GoogleAuthProvider();

export const continueWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInEmailPassword = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);
export const signInObserver = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback);
