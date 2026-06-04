import { Task } from "../types/task";

export const generateWeeklyReport =
  (tasks: Task[]) => {
    const now = new Date();

    const weekAgo =
      new Date();

    weekAgo.setDate(
      now.getDate() - 7
    );

    const completedTasks =
      tasks.filter((task) => {
        if (
          !task.completedAt
        )
          return false;

        const completedDate =
          new Date(
            task.completedAt
          );

        return (
          completedDate >=
            weekAgo &&
          completedDate <= now
        );
      });

    const inProgressTasks =
      tasks.filter(
        (task) =>
          task.status ===
          "in_progress"
      );

    const totalHours =
      completedTasks.reduce(
        (acc, task) =>
          acc +
          task.actualHours,
        0
      );

    return {
      weekStart:
        weekAgo.toISOString(),

      weekEnd:
        now.toISOString(),

      generatedAt:
        now.toISOString(),

      totalHours,

      completedTasks,

      inProgressTasks,
    };
  };