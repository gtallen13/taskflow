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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-slate-500">
          Productivity overview
        </p>
      </div>

      <DashboardMetrics
        tasks={tasks}
      />

      <div className="grid grid-cols-2 gap-6">
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