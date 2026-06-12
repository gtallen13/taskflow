import { Task } from "../../types/task";
import {
  CheckCircle2,
  Clock3,
  AlertTriangle,
  Trophy,
} from "lucide-react";

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

  const completionRate =
    tasks.length === 0
      ? 0
      : Math.round(
          (
            completedThisWeek /
            tasks.length
          ) * 100
        );

  const cards = [
    {
      label:
        "Completed",
      value:
        completedThisWeek,
      icon:
        CheckCircle2,
      color:
        "text-green-600",
      bg:
        "bg-green-50",
    },

    {
      label:
        "Active",
      value:
        activeTasks,
      icon:
        Clock3,
      color:
        "text-[#FCA311]",
      bg:
        "bg-[#FCA311]/10",
    },

    {
      label:
        "Overdue",
      value:
        overdueTasks,
      icon:
        AlertTriangle,
      color:
        "text-red-600",
      bg:
        "bg-red-50",
    },

    {
      label:
        "Score",
      value:
        `${completionRate}%`,
      icon:
        Trophy,
      color:
        "text-[#14213D]",
      bg:
        "bg-[#14213D]/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon =
          card.icon;

        return (
          <div
            key={
              card.label
            }
            className="
              rounded-3xl
              border
              border-[#E5E5E5]
              bg-white
              p-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {
                    card.label
                  }
                </p>

                <h2 className="mt-3 text-4xl font-bold text-[#14213D]">
                  {
                    card.value
                  }
                </h2>
              </div>

              <div
                className={`
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  ${card.bg}
                `}
              >
                <Icon
                  className={`h-7 w-7 ${card.color}`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}