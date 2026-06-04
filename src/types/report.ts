import { Task } from "./task";

export interface WeeklyReport {
  id: string;
  userId: string;
  weekStart: string;

  weekEnd: string;

  generatedAt: string;

  totalHours: number;

  completedTasks: Task[];

  inProgressTasks: Task[];

  aiSummary?: string;
}