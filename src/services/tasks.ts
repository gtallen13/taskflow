import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where
} from "firebase/firestore";

import { db } from "../../firebase/config";

import { Task } from "../types/task";

const tasksCollection = collection(
  db,
  "tasks"
);

export const createTask = async (
  task: Omit<Task, "id">
) => {
  return await addDoc(
    tasksCollection,
    task
  );
};

export const updateTask = async (
  id: string,
  data: Partial<Task>
) => {
  const taskRef = doc(db, "tasks", id);

  return await updateDoc(taskRef, data);
};

export const deleteTask = async (
  id: string
) => {
  const taskRef = doc(db, "tasks", id);

  return await deleteDoc(taskRef);
};

export const subscribeToTasks = (
  userId: string,
  callback: (tasks: Task[]) => void
) => {
  const q = query(
    tasksCollection,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Task[];

    callback(tasks);
  });
};

export const startTaskTimer =
  async (taskId: string) => {
    const taskRef = doc(
      db,
      "tasks",
      taskId
    );

    await updateDoc(taskRef, {
      timerRunning: true,

      timerStartedAt:
        new Date().toISOString(),
    });
  };

  export const stopTaskTimer =
  async (
    taskId: string,
    elapsedSeconds: number
  ) => {
    const taskRef = doc(
      db,
      "tasks",
      taskId
    );

    await updateDoc(taskRef, {
      timerRunning: false,

      timerStartedAt: null,

      elapsedTimeSeconds:
        elapsedSeconds,

      actualHours:
        elapsedSeconds / 3600,
    });
  };

export const updateTaskStatus =
async (
  id: string,
  status:
    | "todo"
    | "in_progress"
    | "completed"
) => {
  const taskRef = doc(
    db,
    "tasks",
    id
  );

  await updateDoc(taskRef, {
    status,

    completedAt:
      status ===
      "completed"
        ? new Date().toISOString()
        : null,

    updatedAt:
      new Date().toISOString(),
  });
};