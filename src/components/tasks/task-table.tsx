"use client";

import { Task } from "../../types/task";
import {
  updateTaskStatus,
} from "../../services/tasks";
import {
  Trash2,
  Pencil,
  Play,
  Square
} from "lucide-react";

import { deleteTask, startTaskTimer, stopTaskTimer } from "../../services/tasks";
import {
  formatTime,
} from "../../lib/time";

import { useState, useEffect } from "react";
import { toast } from "sonner";

import { updateTask } from "../../services/tasks";
interface Props {
  tasks: Task[];
}

import TaskDialog from "./task-dialog";
import TimeEditor from "./time-editor";
export default function TaskTable({
  tasks,
}: Props) {
  if (!tasks.length) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center text-slate-500">
        <div className="space-y-2">
          <p className="text-lg font-medium">
            No tasks yet
          </p>

          <p className="text-sm text-slate-500">
            Create your first task to get started.
          </p>
        </div>
      </div>
    );
  }

  const [liveTimes, setLiveTimes] =
  useState<
    Record<string, number>
  >({});

  useEffect(() => {
    const interval =
      setInterval(() => {
        const updatedTimes:
          Record<
            string,
            number
          > = {};

        tasks.forEach((task) => {
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

            const diff =
              Math.floor(
                (now - started) /
                  1000
              );

            updatedTimes[
              task.id
            ] =
              task.elapsedTimeSeconds +
              diff;
          } else {
            updatedTimes[
              task.id
            ] =
              task.elapsedTimeSeconds;
          }
        });

        setLiveTimes(
          updatedTimes
        );
      }, 1000);

    return () =>
      clearInterval(interval);
  }, [tasks]);
  return (
    <div className="h-1 bg-linear-to-r from-[#FCA311] via-[#FCA311] to-transparent">
      
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-gradient-to-r from-[#000000] via-[#14213D] to-[#14213D] text-white shadow-md">
          <tr className="text-left text-xs font-semibold uppercase tracking-[0.15em]">
            <th className="w-[420px] p-5">
              Task
            </th>

            <th className="w-[180px] p-5">
              Status
            </th>

            <th className="w-[240px] p-5">
              Schedule
            </th>

            <th className="w-[280px] p-5">
              Time
            </th>

            <th className="w-[160px] p-5">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="
                border-t
                border-[#E5E5E5]
                transition-all
                duration-200
                hover:bg-[#F7F8FA]
                hover:shadow-sm">
              <td className="p-4">
                <div>
                  <p className={`font-semibold text-[#14213D]
                    ${
                      task.status ===
                      "completed"
                        ? "text-slate-400 line-through opacity-70"

                        : ""}`}
                  >
                    {task.title}
                    {task.recurring && (
                      <span className="mt-1 inline-block rounded bg-[#FCA311]/20 text-[#14213D] px-2 py-1 text-xs">
                        Recurring •{" "}
                        {task.recurringType}
                      </span>
                    )}
                  </p>

                  <p className="text-sm text-slate-500">
                    {
                      task.description
                    }
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {task.tags.map((tag) => (
                      <span
                        key={tag}
                        className="
                          rounded-full
                          bg-[#14213D]/10
                          px-2
                          py-1
                          text-xs
                          text-[#14213D]
                        "
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </td>

              <td>
              {task.priority ===
              "high" ? (
                <span className="text-red-600 text-xs font-medium">
                  ▲ High
                </span>
              ) : task.priority ===
                "medium" ? (
                <span className="text-[#FCA311] text-xs font-medium">
                  ■ Medium
                </span>
              ) : (
                <span className="text-slate-500 text-xs font-medium">
                  ▼ Low
                </span>
              )}
            </td>

              <td className="p-4">
                <select
                  value={task.status}
                  onChange={(e) =>
                    updateTaskStatus(
                      task.id,
                      e.target.value as
                        | "todo"
                        | "in_progress"
                        | "completed"
                    )
                  }
                  className={`cursor-pointer rounded-full border px-2 py-1 text-xs capitalize font-medium border-[#E5E5E5]
                  ${
                    task.status ===
                    "completed"
                      ? "bg-green-100 text-green-700"

                      : task.status ===
                        "in_progress"
                      ? "bg-[#FCA311]/20 text-[#14213D]"

                      : "bg-[#E5E5E5] text-[#14213D]"
                  }`}
                >
                  <option value="todo">
                    Todo
                  </option>

                  <option value="in_progress">
                    In Progress
                  </option>

                  <option value="completed">
                    Completed
                  </option>
                </select>
              </td>
              
              <td className="p-5">
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-[#14213D]">
                      Due:
                    </span>

                    <div className="text-slate-500">
                      {task.dueDate || "—"}
                    </div>
                  </div>

                  <div>
                    <span className="font-medium text-[#14213D]">
                      Completed:
                    </span>

                    <div className="text-slate-500">
                      {task.completedAt
                        ? new Date(
                            task.completedAt
                          ).toLocaleDateString()
                        : "—"}
                    </div>
                  </div>
                </div>
              </td>
              
              <td className="p-4">
                <TimeEditor
                  task={task}
                  displaySeconds={
                    liveTimes[
                      task.id
                    ] ??
                    task.elapsedTimeSeconds
                  }
                />
              </td>

              <td className="p-4">

                {task.status !== "completed" &&
                  (task.timerRunning ? (
                    <button
                      onClick={() =>
                        stopTaskTimer(
                          task.id,
                          liveTimes[task.id] || 0
                        )
                      }
                      className="cursor-pointer text-[#14213D]"
                    >
                      <Square className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        startTaskTimer(task.id)
                      }
                      className="cursor-pointer text-[#FCA311]"
                    >
                      <Play className="h-4 w-4" />
                    </button>
                  ))}

                <div className="flex gap-2">
                  <TaskDialog
                    task={task}
                    trigger={
                      <button className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-[#14213D]/10
                        text-[#14213D]
                        transition
                        hover:bg-[#14213D]
                        hover:text-white
                        cursor-pointer
                        ">
                        <Pencil className="h-4 w-4" />
                      </button>
                    }
                  />

                  <button
                    onClick={async () => {
                      const confirmed =
                        confirm(
                          "Delete this task?"
                        );

                      if (!confirmed) return;

                      await deleteTask(task.id);

                      toast.success(
                        "Task deleted"
                      );
                    }}
                    className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-red-100
                    text-red-600
                    transition
                    hover:bg-red-500
                    hover:text-white
                    cursor-pointer">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}