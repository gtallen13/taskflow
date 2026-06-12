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


  const totalTasks = tasks.length;

  const todoTasks =
    tasks.filter(
      (t) => t.status === "todo"
    ).length;

  const inProgressTasks =
    tasks.filter(
      (t) =>
        t.status ===
        "in_progress"
    ).length;

  const completedTasks =
    tasks.filter(
      (t) =>
        t.status ===
        "completed"
    ).length;
  return (
    <div className="space-y-6">
    
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#14213D]">
            Tasks
          </h1>

          <p className="mt-1 text-slate-500">
            Manage and track your work
          </p>
        </div>

        <TaskDialog
          trigger={
            <button className="cursor-pointer rounded-xl bg-[#FCA311] px-5 py-3 font-medium text-[#14213D] shadow-sm transition hover:shadow-lg">
              + New Task
            </button>
          }
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#E5E5E5] bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Tasks
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#14213D]">
            {totalTasks}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#E5E5E5] bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Todo
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#14213D]">
            {todoTasks}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#E5E5E5] bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            In Progress
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#FCA311]">
            {inProgressTasks}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#E5E5E5] bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Completed
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {completedTasks}
          </h2>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E5E5E5] bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            border-[#E5E5E5]
            bg-[#F7F8FA]
            px-4
            py-3
            focus:border-[#FCA311]
            focus:outline-none
            "
          />
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="
              cursor-pointer
              rounded-xl
              border
              border-[#E5E5E5]
              bg-white
              px-4
              py-3"
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