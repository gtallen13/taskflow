"use client";

import { useEffect, useState } from "react";

import TaskTable from "../../../../components/tasks/task-table";
import TaskDialog from "../../../../components/tasks/task-dialog";
import {
  subscribeToTasks,
} from "../../../../services/tasks";

import { Task } from "../../../../types/task";
import { useAuth } from "../../../../context/AuthContext";
export default function TasksPage() {
  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [search, setSearch] =
  useState("");
  const [loading, setLoading] =
    useState(true);

  const [statusFilter, setStatusFilter] = useState("all");
  const [
    priorityFilter,
    setPriorityFilter,
  ] = useState("all");

  const {user} =useAuth();
  const filteredTasks =
  tasks.filter((task) => {
    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const matchesStatus =
      statusFilter === "all"
        ? true
        : task.status ===
          statusFilter;
    const matchesPriority =
      priorityFilter === "all"
        ? true
        : task.priority ===
          priorityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });
  useEffect(() => {
    if (!user) return;

    const unsubscribe =
      subscribeToTasks(
        user.uid,
        (tasks) => {
          setTasks(tasks);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Tasks
        </h1>

        <div className="flex justify-end">
          <TaskDialog
            trigger={
              <button className="rounded-lg bg-black px-4 py-2 text-white cursor-pointer">
                New Task
              </button>
            }
          />
      </div>

        <p className="text-slate-500">
          Manage your daily work
        </p>
      </div>
      

      <div className="flex gap-4">
        <input
        placeholder="Search tasks..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full rounded-lg border bg-white p-2"
        />
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="rounded-lg border bg-white p-2 cursor-pointer"
        >
          <option value="all">
            All Statuses
          </option>

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

        <select
          value={priorityFilter}
          onChange={(e) =>
            setPriorityFilter(
              e.target.value
            )
          }
          className="cursor-pointer rounded-lg border bg-white p-2"
        >
          <option value="all">
            All Priorities
          </option>

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
      </div>
      

      {loading ? (
        <div className="rounded-xl border bg-white p-10">
          Loading tasks...
        </div>
      ) : (
        <TaskTable tasks={filteredTasks}/>
      )}
    </div>
  );
}