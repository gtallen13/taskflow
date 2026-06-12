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
import PageHeader from "@/components/ui/ui/page-header";
import WeeklyActivityChart from "@/components/dashboard/weekly-activity-chart";
import DashboardInsights from "@/components/dashboard/dashboard-insights";
export default function DashboardPage() {
  const { user } =
    useAuth();
  const firstName = user?.displayName
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
      <div
  className="
    rounded-3xl
    bg-gradient-to-r
    from-[#000000]
    via-[#14213D]
    to-[#14213D]
    p-8
    text-white
    shadow-xl
  "
>
        <PageHeader
          title="Dashboard"
          subtitle="Here's your productivity snapshot for today."
          light
        />
        <p className="mt-2 text-lg text-slate-500">
          Welcome back, {firstName} 👋
        </p>
      </div>

      <DashboardMetrics
        tasks={tasks}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <DashboardInsights tasks={tasks}/>
        </div>
        <div>
          <UpcomingTasks tasks={tasks}/>
          <NotificationsPanel notifications={notifications}/>
        </div>
      </div>
        <WeeklyActivityChart tasks={tasks}/>
    </div>
  );
}