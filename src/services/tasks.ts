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
  where,
  getDoc
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
  async (
    taskId: string
  ) => {
    const taskRef = doc(
      db,
      "tasks",
      taskId
    );

  const snapshot =
    await getDoc(taskRef);

  if (
    !snapshot.exists()
  ) {
    throw new Error(
      "Task not found"
    );
  }

  const task =
    snapshot.data();

  if (
    task.status ===
    "completed"
  ) {
    return;
  }

  if (
    task.timerRunning
  ) {
    return;
  }

  await updateDoc(
    taskRef,
    {
      timerRunning: true,

      timerStartedAt:
        new Date().toISOString(),

      status:
        task.status ===
        "todo"
          ? "in_progress"
          : task.status,
    }
  );
};

export const stopTaskTimer =
async (
  taskId: string,
  elapsedSeconds: number
) => {
  await updateTask(
    taskId,
    {
      timerRunning: false,

      timerStartedAt:
        null,

      elapsedTimeSeconds:
        elapsedSeconds,

      actualHours:
        Number(
          (
            elapsedSeconds /
            3600
          ).toFixed(2)
        ),
    }
  );
};

export const updateTaskStatus =
  async (
    taskId: string,
    status:
      | "todo"
      | "in_progress"
      | "completed"
  ) => {
    const taskRef = doc(
      db,
      "tasks",
      taskId
    );

    const snapshot =
      await getDoc(taskRef);

    if (
      !snapshot.exists()
    ) {
      return;
    }

    const task =
      snapshot.data();

    const updates: any = {
      status,
      updatedAt:
        new Date().toISOString(),
    };

    if (
      status ===
      "completed"
    ) {
      updates.completedAt =
        new Date().toISOString();

      if (
        task.timerRunning &&
        task.timerStartedAt
      ) {
        const started =
          new Date(
            task.timerStartedAt
          ).getTime();

        const now =
          Date.now();

        const additionalSeconds =
          Math.floor(
            (now - started) /
              1000
          );

        const finalSeconds =
          task.elapsedTimeSeconds +
          additionalSeconds;

        updates.elapsedTimeSeconds =
          finalSeconds;

        updates.actualHours =
          Number(
            (
              finalSeconds /
              3600
            ).toFixed(2)
          );
      }

      updates.timerRunning =
        false;

      updates.timerStartedAt =
        null;
    }

    if (
      status !==
      "completed"
    ) {
      updates.completedAt =
        null;
    }

    await updateDoc(
      taskRef,
      updates
    );
};