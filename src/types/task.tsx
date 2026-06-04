export type TaskPriority =
  | "high"
  | "medium"
  | "low";

export type TaskStatus =
  | "todo"
  | "in_progress"
  | "completed";

export interface Task {
  id: string;

  title: string;

  description: string;

  priority: TaskPriority;

  status: TaskStatus;

  tags: string[];

  estimatedHours: number;

  actualHours: number;

  elapsedTimeSeconds: number;

  dueDate: string;

  createdAt: string;

  updatedAt: string;

  completedAt?: string | null;

  userId: string;

  recurring: boolean;

  recurringType?:
    | "daily"
    | "weekly"
    | "monthly";

  timerRunning: boolean;

  timerStartedAt?: string | null;
}