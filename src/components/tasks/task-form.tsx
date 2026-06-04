"use client";

import { useState } from "react";

import { createTask } from "../../services/tasks";

import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
export default function TaskForm() {
  const { user } = useAuth();

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState("medium");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in");
      return;
    }
    await createTask({
      title,
      description,
      priority:
        priority as any,

      status: "todo",

      tags: [],

      estimatedHours: 0,

      actualHours: 0,

      dueDate: "",

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),

      completedAt: null,

      userId: user.uid,

      recurring: false,

      timerRunning: false,
      elapsedTimeSeconds: 0,
    });

    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border bg-white p-4"
    >
      <h2 className="text-xl font-semibold">
        Create Task
      </h2>

      <input
        placeholder="Task title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
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

      <select
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value)
        }
        className="w-full rounded-lg border p-2"
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

      <button
        type="submit"
        className="rounded-lg bg-black px-4 py-2 text-white"
      >
        Create Task
      </button>
    </form>
  );
}