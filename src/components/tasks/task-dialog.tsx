"use client";

import {
  useState,
} from "react";

import {
  createTask,
  updateTask,
} from "../../services/tasks";

import {
  Task,
} from "../../types/task";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import {
  TaskPriority,
  TaskStatus,
} from "../../types/task";

import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";

interface Props {
  task?: Task;
  trigger: React.ReactNode;
}

export default function TaskDialog({
  task,
  trigger,
}: Props) {
  const [open, setOpen] =
    useState(false);

  const [title, setTitle] =
    useState(task?.title || "");

  const [
    description,
    setDescription,
  ] = useState(
    task?.description || ""
  );

  const [tags, setTags] =
  useState(
    task?.tags.join(", ") || ""
  );

  const [priority, setPriority] =
  useState<TaskPriority>(
    task?.priority || "medium"
  );

  const [status, setStatus] =
  useState<TaskStatus>(
    task?.status || "todo"
  );

  const [recurring, setRecurring] =
  useState(
    task?.recurring || false
  );

  const [
    recurringType,
    setRecurringType,
  ] = useState<
    "daily" | "weekly" | "monthly"
  >(
    task?.recurringType ||
      "weekly"
  );
  const [dueDate, setDueDate] =
  useState(
    task?.dueDate || ""
  );

  const { user } = useAuth();

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      priority:
        priority as any,
      status:
        status as any,
        
      updatedAt:
        new Date().toISOString(),
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      recurring,
      recurringType,
      dueDate,
    };

    if (!user) {
      toast.error("You must be logged in");
      return;
    }

    if (task) {
      await updateTask(
        task.id,
        payload
      );

    } else {
      await createTask({
        ...payload,

        estimatedHours: 0,

        actualHours: 0,

        elapsedTimeSeconds: 0,

        createdAt:
          new Date().toISOString(),

        completedAt: null,

        userId: user.uid,

        timerRunning: false,
      });
    }

    setOpen(false);
    toast.success(
    task
      ? "Task updated"
      : "Task created"
    );
    setTitle("");
    setDescription("");
    setDueDate("");
    setTags("");
    setPriority("medium");
    setRecurring(false);
  };
  
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>

      <DialogContent className="
    max-h-[90vh]
    max-w-3xl
    overflow-y-auto
    rounded-3xl
    border
    border-[#E5E5E5]
    bg-white
  ">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-2xl font-bold text-[#14213D]">
            {task
              ? "Task Details"
              : "Create Task"}
          </DialogTitle>

          <p className="text-sm text-slate-500">
            {task
              ? "Update and manage task information"
              : "Create a new task and define how it should be tracked"}
          </p>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 pt-4"
        >
          <div className="rounded-2xl border border-[#E5E5E5] bg-[#F7F8FA] p-5">
            <h3 className="mb-4 font-semibold text-[#14213D]">
              Task Information
            </h3>
            <input
              placeholder="Title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-xl
                border
                border-[#E5E5E5]
                bg-white
                px-4
                py-3
                focus:border-[#FCA311]
                focus:outline-none
                "
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-xl
                border
                border-[#E5E5E5]
                bg-white
                px-4
                py-3
                focus:border-[#FCA311]
                focus:outline-none
                "
            />
          </div>

          
          <div className="rounded-2xl border border-[#E5E5E5] bg-[#F7F8FA] p-5">
            <h3 className="mb-4 font-semibold text-[#14213D]">
              Workflow
            </h3>

            <div className="grid grid-cols-2 gap-4">

              Priority

              Status

            </div>
            <select
              value={priority}
              onChange={(e) =>
                  setPriority(
                      e.target.value as TaskPriority
                  )
              }
              className="w-full rounded-lg border p-2 cursor-pointer"
            >
              <option value="high">
                High
              </option>

              <option value="medium">
                Medium
              </option>

              <option value="low">
                Low
              </option>
            </select>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as TaskStatus
                  )
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#E5E5E5]
                  bg-white
                  px-4
                  py-3
                  cursor-pointer
                ">
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
            </div>
          </div>
          
          <div className="rounded-2xl border border-[#E5E5E5] bg-[#F7F8FA] p-5 ">
            <h3 className="mb-4 font-semibold text-[#14213D]">
              Scheduling
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center gap-2 text-sm">
                Due date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) =>
                  setDueDate(
                    e.target.value
                  )
                }
                className="w-full rounded-lg border p-2"
              />
              <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={recurring}
                onChange={(e) =>
                  setRecurring(
                    e.target.checked
                  )
                }
                className="cursor-pointer"
              />Recurring Task
              </label>
              {recurring && (
              <select
                value={recurringType}
                onChange={(e) =>
                  setRecurringType(
                    e.target.value as
                      | "daily"
                      | "weekly"
                      | "monthly"
                  )
                }
                className="w-full rounded-lg border p-2"
              >
                <option value="daily">
                  Daily
                </option>

                <option value="weekly">
                  Weekly
                </option>

                <option value="monthly">
                  Monthly
                </option>
              </select>
              )}
            </div>
          </div>
          
          <div className="rounded-2xl border border-[#E5E5E5] bg-[#F7F8FA] p-5">
            <h3 className="mb-4 font-semibold text-[#14213D]">
              Organization
            </h3>
            <input
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) =>
                setTags(e.target.value)
              }
              className="w-full rounded-lg border p-2"
            />
            {tags && (
              <div className="mt-3 flex flex-wrap gap-2">
                {tags
                  .split(",")
                  .map((tag) =>
                    tag.trim()
                  )
                  .filter(Boolean)
                  .map((tag) => (
                    <span
                      key={tag}
                      className="
                        rounded-full
                        bg-[#14213D]/10
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-[#14213D]
                      "
                    >
                      #{tag}
                    </span>
                  ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t pt-5">
            <button
              type="button"
              onClick={() =>
                setOpen(false)
              }
              className="
                cursor-pointer
                rounded-xl
                border
                border-[#E5E5E5]
                px-5
                py-3
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                cursor-pointer
                rounded-xl
                bg-[#FCA311]
                px-6
                py-3
                font-medium
                text-[#14213D]
                transition
                hover:shadow-lg
              "
            >
              {task
                ? "Save Changes"
                : "Create Task"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}