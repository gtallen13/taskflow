import { Task } from "../types/task";

export interface AppNotification {
  id: string;

  message: string;

  type:
    | "warning"
    | "info"
    | "danger";
}

export const generateNotifications =
  (tasks: Task[]) => {
    const notifications:
      AppNotification[] = [];

    const today =
      new Date();

    tasks.forEach((task) => {
      if (
        !task.dueDate ||
        task.status ===
          "completed"
      )
        return;

      const due =
        new Date(
          task.dueDate
        );

      const diff =
        due.getTime() -
        today.getTime();

      const days =
        Math.ceil(
          diff /
            (1000 *
              60 *
              60 *
              24)
        );

      if (days < 0) {
        notifications.push({
          id: task.id,

          type: "danger",

          message: `"${task.title}" is overdue`,
        });
      } else if (days <= 1) {
        notifications.push({
          id: task.id,

          type: "warning",

          message: `"${task.title}" is due soon`,
        });
      }
    });

    return notifications;
  };