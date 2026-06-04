import { Task } from "../../types/task";

interface Props {
  tasks: Task[];
}

export default function DashboardMetrics({
  tasks,
}: Props) {
  const now = new Date();

  const weekStart =
    new Date();

  weekStart.setDate(
    now.getDate() - 7
  );

  const completedThisWeek =
    tasks.filter((task) => {
      if (
        !task.completedAt
      )
        return false;

      return (
        new Date(
          task.completedAt
        ) >= weekStart
      );
    }).length;

  const activeTasks =
    tasks.filter(
      (task) =>
        task.status !==
        "completed"
    ).length;

  const overdueTasks =
    tasks.filter(
      (task) =>
        task.status !==
          "completed" &&
        task.dueDate &&
        new Date(
          task.dueDate
        ) < now
    ).length;

  const hoursThisWeek =
    tasks
      .filter(
        (task) =>
          task.completedAt &&
          new Date(
            task.completedAt
          ) >= weekStart
      )
      .reduce(
        (
          total,
          task
        ) =>
          total +
          task.actualHours,
        0
      );

  const cards = [
    {
      label:
        "Completed This Week",
      value:
        completedThisWeek,
    },
    {
      label:
        "Active Tasks",
      value: activeTasks,
    },
    {
      label:
        "Overdue Tasks",
      value:
        overdueTasks,
    },
    {
      label:
        "Hours This Week",
      value:
        hoursThisWeek.toFixed(
          1
        ),
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md"
        >
          <p className="text-sm text-slate-500">
            {card.label}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}