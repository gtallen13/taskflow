"use client";

import { useState,useEffect } from "react";
import { toast } from "sonner";

import { Task } from "../../types/task";
import { updateTask } from "../../services/tasks";
import { formatTime } from "../../lib/time";

interface Props {
  task: Task;
  displaySeconds: number;
}

export default function TimeEditor({
  task,
  displaySeconds,
}: Props) {
  const [hours, setHours] =
    useState(
      Math.floor(
        displaySeconds / 3600
      )
    );

  const [minutes, setMinutes] =
    useState(
      Math.floor(
        (displaySeconds %
          3600) /
          60
      )
    );

  const [seconds, setSeconds] =
    useState(
      displaySeconds % 60
    );

  const handleSave =
    async () => {
      const totalSeconds =
        Math.max(
          0,
          Number(hours) || 0
        ) *
          3600 +
        Math.min(
          59,
          Math.max(
            0,
            Number(minutes) || 0
          )
        ) *
          60 +
        Math.min(
          59,
          Math.max(
            0,
            Number(seconds) || 0
          )
        );

      await updateTask(
        task.id,
        {
          elapsedTimeSeconds:
            totalSeconds,

          actualHours:
            Number(
              (
                totalSeconds /
                3600
              ).toFixed(2)
            ),
        }
      );

      toast.success(
        "Time updated"
      );
    };
    useEffect(() => {
  setHours(
    Math.floor(
      displaySeconds / 3600
    )
  );

  setMinutes(
    Math.floor(
      (displaySeconds % 3600) / 60
    )
  );

  setSeconds(
    displaySeconds % 60
  );
}, [displaySeconds]);
  return (
    <div className="space-y-2">
      <div className="font-mono text-sm">
        {formatTime(
          displaySeconds
        )}
      </div>

      <div className="flex items-center gap-1">
        <input
          type="number"
          min="0"
          value={hours}
          disabled={
            task.timerRunning
          }
          onChange={(e) =>
            setHours(
              Number(
                e.target.value
              )
            )
          }
          className="w-14 rounded border px-1 py-1 text-center font-mono text-xs"
        />

        <span>:</span>

        <input
          type="number"
          min="0"
          max="59"
          value={minutes}
          disabled={
            task.timerRunning
          }
          onChange={(e) =>
            setMinutes(
              Number(
                e.target.value
              )
            )
          }
          className="w-14 rounded border px-1 py-1 text-center font-mono text-xs"
        />

        <span>:</span>

        <input
          type="number"
          min="0"
          max="59"
          value={seconds}
          disabled={
            task.timerRunning
          }
          onChange={(e) =>
            setSeconds(
              Number(
                e.target.value
              )
            )
          }
          className="w-14 rounded border px-1 py-1 text-center font-mono text-xs"
        />

        <button
          onClick={
            handleSave
          }
          disabled={
            task.timerRunning ||
            task.status ===
              "completed"
          }
          className="cursor-pointer rounded bg-blue-500 px-2 py-1 text-xs text-white disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Save
        </button>
      </div>
    </div>
  );
}