"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  subscribeToTasks,
} from "../../../../services/tasks";

import {
  createReport,
  getReports,
} from "../../../../services/reports";

import {
  generateWeeklyReport,
} from "../../../../lib/report-generator";

import { Task } from "../../../../types/task";

import { WeeklyReport } from "../../../../types/report";
import {
  sendReportEmail,
} from "../../../../lib/send-report-email";

import {useAuth} from "../../../../context/AuthContext"
import Link from "next/link";

export default function ReportsPage() {
  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [reports, setReports] =
    useState<
      WeeklyReport[]
    >([]);

  const [email, setEmail] =
  useState("");
  const [sending, setSending] =
  useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const unsubscribe =
      subscribeToTasks(
        user.uid,
        setTasks
      );

    loadReports();

    return () => unsubscribe();
  }, [user]);

  const loadReports =
    async () => {
      if (!user) return;
      const data =
        await getReports(user.uid);

      setReports(data);
    };

  const handleGenerateReport =
    async () => {
      if (!user) return;
      const report = {
        ...generateWeeklyReport(tasks),
        userId: user.uid,
      };

      await createReport(
        report
      );

      loadReports();
    };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>

          <h1 className="text-3xl font-bold">
            Reports
          </h1>

          <p className="text-slate-500">
            Weekly productivity summaries
          </p>
        </div>

        <button
          onClick={
            handleGenerateReport
          }
          className="cursor-pointer rounded-lg bg-black px-4 py-2 text-white"
        >
          Generate Report
        </button>
      </div>
      
      <div className="flex gap-4">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full rounded-lg border bg-white p-2"
        />
      </div>

      <div className="space-y-4">
        {reports.map(
          (report) => (
            <div
              key={report.id}
              className="rounded-xl border bg-white p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">
                    Weekly Report
                  </h2>

                  <p className="text-sm text-slate-500">
                    {new Date(
                      report.weekStart
                    ).toLocaleDateString()}{" "}
                    -
                    {" "}
                    {new Date(
                      report.weekEnd
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-slate-500">
                    Total Hours
                  </p>

                  <h2 className="text-2xl font-bold">
                    {report.totalHours.toFixed(
                      1
                    )}
                    h
                  </h2>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-slate-500">
                  Completed Tasks:
                  {" "}
                  {
                    report
                      .completedTasks
                      .length
                  }
                </p>

                <p className="text-sm text-slate-500">
                  In Progress:
                  {" "}
                  {
                    report
                      .inProgressTasks
                      .length
                  }
                </p>
              </div>
                
              <Link
                href={`/dashboard/reports/${report.id}`}
                className="inline-flex cursor-pointer rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
              >
                View Details
              </Link>
              <button
                onClick={async () => {
                  try {
                    setSending(true);

                    await sendReportEmail(
                      email,
                      report
                    );

                    alert(
                      "Report sent successfully!"
                    );
                  } catch (error) {
                    console.error(error);

                    alert(
                      "Failed to send report"
                    );
                  } finally {
                    setSending(false);
                  }
                }}
                className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white"
              >
                {
                  sending
                    ? "Sending..."
                    : "Send Report"
                }
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}