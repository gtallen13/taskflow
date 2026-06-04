import { Task } from "../../types/task";

interface Props {
  tasks: Task[];
}

export default function DashboardStats({
  tasks,
}: Props) {
  const completed =
    tasks.filter(
      (t) =>
        t.status ===
        "completed"
    ).length;

  const inProgress =
    tasks.filter(
      (t) =>
        t.status ===
        "in_progress"
    ).length;

  const totalHours =
    tasks.reduce(
      (acc, task) =>
        acc +
        task.actualHours,
      0
    );

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="rounded-xl border bg-white p-4">
        <p className="text-sm text-slate-500">
          Completed
        </p>

        <h2 className="text-3xl font-bold">
          {completed}
        </h2>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <p className="text-sm text-slate-500">
          In Progress
        </p>

        <h2 className="text-3xl font-bold">
          {inProgress}
        </h2>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <p className="text-sm text-slate-500">
          Total Hours
        </p>

        <h2 className="text-3xl font-bold">
          {totalHours.toFixed(
            1
          )}
          h
        </h2>
      </div>
    </div>
  );
}