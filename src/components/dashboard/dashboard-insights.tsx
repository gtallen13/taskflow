import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Flame,
} from "lucide-react";

import { Task } from "../../types/task";

interface Props {
  tasks: Task[];
}

export default function DashboardInsights({
  tasks,
}: Props) {
  const now = new Date();

  const weekStart = new Date();
  weekStart.setDate(
    now.getDate() - 7
  );

  const completedThisWeek =
    tasks.filter((task) => {
      if (!task.completedAt)
        return false;

      return (
        new Date(
          task.completedAt
        ) >= weekStart
      );
    }).length;

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

  const inProgressTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "in_progress"
    ).length;

  const totalHours =
    tasks.reduce(
      (
        total,
        task
      ) =>
        total +
        task.actualHours,
      0
    );

  return (
    <div className="rounded-3xl border border-[#E5E5E5] bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-[#14213D]">
        Insights
      </h2>

      <p className="mb-6 text-sm text-slate-500">
        Recommendations based on your current workload
      </p>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-1 h-5 w-5 text-green-600" />

          <div>
            <p className="font-medium">
              Productivity
            </p>

            <p className="text-sm text-slate-500">
              You completed{" "}
              {completedThisWeek} task
              {completedThisWeek !==
              1
                ? "s"
                : ""}{" "}
              this week.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock3 className="mt-1 h-5 w-5 text-[#FCA311]" />

          <div>
            <p className="font-medium">
              Time Tracked
            </p>

            <p className="text-sm text-slate-500">
              Total tracked
              time:{" "}
              {totalHours.toFixed(
                1
              )}
              h
            </p>
          </div>
        </div>

        {overdueTasks > 0 && (
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-1 h-5 w-5 text-red-600" />

            <div>
              <p className="font-medium">
                Attention Needed
              </p>

              <p className="text-sm text-slate-500">
                You have{" "}
                {
                  overdueTasks
                }{" "}
                overdue task
                {overdueTasks !==
                1
                  ? "s"
                  : ""}
                .
              </p>
            </div>
          </div>
        )}

        {inProgressTasks > 5 && (
          <div className="flex items-start gap-3">
            <Flame className="mt-1 h-5 w-5 text-[#FCA311]" />

            <div>
              <p className="font-medium">
                Focus Area
              </p>

              <p className="text-sm text-slate-500">
                You currently
                have{" "}
                {
                  inProgressTasks
                }{" "}
                tasks in
                progress.
                Consider
                finishing some
                before starting
                new work.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}