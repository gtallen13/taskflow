"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

import { Task } from "../../types/task";

interface Props {
  tasks: Task[];
}

export default function WeeklyActivityChart({
  tasks,
}: Props) {
  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const data = days.map(
    (day, index) => {
      const hours =
        tasks
          .filter((task) => {
            if (
              !task.completedAt
            )
              return false;

            return (
              new Date(
                task.completedAt
              ).getDay() ===
              index
            );
          })
          .reduce(
            (
              total,
              task
            ) =>
              total +
              task.actualHours,
            0
          );

      return {
        day,
        hours:
          Number(
            hours.toFixed(1)
          ),
      };
    }
  );

  return (
    <div
      className="
      rounded-3xl
      border
      border-[#E5E5E5]
      bg-white
      p-6
      shadow-sm
    "
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#14213D]">
          Weekly Activity
        </h2>

        <p className="text-sm text-slate-500">
          Hours tracked by day
        </p>
      </div>

      <div className="h-72">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={data}
          >
            <XAxis
              dataKey="day"
            />

            <Tooltip
            contentStyle={{
                borderRadius: "16px",
                border:
                "1px solid #E5E5E5",
            }}/>

            <Bar
              dataKey="hours"
              radius={[
                8,
                8,
                0,
                0,
              ]}
              fill="#FCA311"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}