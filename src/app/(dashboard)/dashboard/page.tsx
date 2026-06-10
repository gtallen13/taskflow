"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  subscribeToTasks,
} from "../../../services/tasks";

import { Task } from "../../../types/task";

import DashboardStats from "../../../components/dashboard/dashboard-stats";
import DashboardMetrics from "@/components/dashboard/dashboard-metrics";
import NotificationsPanel from "../../../components/dashboard/notifications-panel";

import UpcomingTasks from "@/components/dashboard/upcoming-tasks";
import {
  generateNotifications,
} from "../../../lib/notifications";
import {useAuth} from "../../../context/AuthContext"
export default function DashboardPage() {
  const { user } =
    useAuth();

  const [tasks, setTasks] =
    useState<Task[]>([]);

  useEffect(() => {
    if (!user) return;

    const unsubscribe =
      subscribeToTasks(
        user.uid,
        setTasks
      );

    return () =>
      unsubscribe();
  }, [user]);

  const notifications =
    generateNotifications(
      tasks
    );

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-[#14213D] p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-[#E5E5E5]">
          Track productivity, monitor progress and stay focused.
        </p>
      </div>

      <DashboardMetrics
        tasks={tasks}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <NotificationsPanel
          notifications={
            notifications
          }
        />

        <UpcomingTasks
          tasks={tasks}
        />
      </div>
    </div>
  );
}