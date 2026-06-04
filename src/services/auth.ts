import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "../../firebase/config";

const googleProvider =
  new GoogleAuthProvider();

export const login = (
  email: string,
  password: string
) =>
  signInWithEmailAndPassword(
    auth,
    email,
    password
  );

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const result =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  await updateProfile(
    result.user,
    {
      displayName: name,
    }
  );

  return result;
};

export const loginWithGoogle =
  () =>
    signInWithPopup(
      auth,
      googleProvider
    );

export const logout =
  () => signOut(auth);