import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "../../firebase/config";

import { UserSettings } from "../types/user-settings";

export const getUserSettings =
  async (
    userId: string
  ) => {
    const docRef = doc(
      db,
      "userSettings",
      userId
    );

    const snapshot =
      await getDoc(docRef);

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.data() as UserSettings;
  };

export const saveUserSettings =
  async (
    settings: UserSettings
  ) => {
    const docRef = doc(
      db,
      "userSettings",
      settings.userId
    );

    await setDoc(
      docRef,
      settings
    );
  };