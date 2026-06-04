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

        tags: [],

        estimatedHours: 0,

        actualHours: 0,

        elapsedTimeSeconds: 0,

        dueDate: "",
        status:"todo",
        createdAt:
          new Date().toISOString(),

        completedAt: null,

        userId: user!.uid,

        recurring: false,

        timerRunning: false,
      });
    }

    setOpen(false);
    toast.success(
    task
      ? "Task updated"
      : "Task created"
);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {task
              ? "Edit Task"
              : "Create Task"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-2"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-2"
          />

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
          
          <input
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) =>
              setTags(e.target.value)
            }
            className="w-full rounded-lg border p-2"
          />

          <label className="flex items-center gap-2 text-sm">
            Priority
          </label>
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
            />

            Recurring Task
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

          <button
            type="submit"
            className="w-full rounded-lg bg-black py-2 text-white cursor-pointer"
          >
            {task
              ? "Save Changes"
              : "Create Task"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}