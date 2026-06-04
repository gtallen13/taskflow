import { Task } from "../../types/task";

interface Props {
  tasks: Task[];
}

export default function UpcomingTasks({
  tasks,
}: Props) {
  const upcoming =
    tasks
      .filter(
        (task) =>
          task.status !==
            "completed" &&
          task.dueDate
      )
      .sort(
        (a, b) =>
          new Date(
            a.dueDate!
          ).getTime() -
          new Date(
            b.dueDate!
          ).getTime()
      )
      .slice(0, 5);

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">
        Upcoming Tasks
      </h2>

      {upcoming.length ===
      0 ? (
        <p className="text-slate-500">
          No upcoming tasks.
        </p>
      ) : (
        <div className="space-y-3">
          {upcoming.map(
            (task) => (
              <div
                key={task.id}
                className="flex items-center justify-between border-b pb-3"
              >
                <div>
                  <p className="font-medium">
                    {task.title}
                  </p>

                  <p className="text-sm text-slate-500">
                    {
                      task.priority
                    }
                  </p>
                </div>

                <span className="text-sm text-slate-500">
                  {new Date(
                    task.dueDate!
                  ).toLocaleDateString()}
                </span>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}