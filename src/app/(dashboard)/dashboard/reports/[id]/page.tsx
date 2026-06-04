"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { WeeklyReport } from "../../../../../types/report";

import {
  getReportById,
} from "../../../../../services/reports";

import { toast } from "sonner";
import Link from "next/link";
export default function ReportDetailsPage() {
  const params =
    useParams();

  const [report, setReport] =
    useState<
      WeeklyReport | null
    >(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadReport =
      async () => {
        try {
          const data =
            await getReportById(
              params.id as string
            );

          if (!data) {
            toast.error(
              "Report not found"
            );

            return;
          }

          setReport(data);
        } catch (error) {
          console.error(error);

          toast.error(
            "Failed to load report"
          );
        } finally {
          setLoading(false);
        }
      };

    loadReport();
  }, [params.id]);

  if (loading) {
    return (
      <div>
        Loading report...
      </div>
    );
  }

  if (!report) {
    return (
      <div>
        Report not found
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <Link
            href="/dashboard/reports"
            className="inline-flex cursor-pointer rounded-lg border px-4 py-2 hover:bg-slate-50"
            >
            ← Back to Reports
        </Link>
      <div>
        <h1 className="text-3xl font-bold">
          Weekly Report
        </h1>

        <p className="text-slate-500">
          Detailed productivity summary
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-xl border bg-white p-4">
          <p className="text-sm text-slate-500">
            Week Start
          </p>

          <p className="font-medium">
            {new Date(
              report.weekStart
            ).toLocaleDateString()}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-4">
          <p className="text-sm text-slate-500">
            Week End
          </p>

          <p className="font-medium">
            {new Date(
              report.weekEnd
            ).toLocaleDateString()}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-4">
          <p className="text-sm text-slate-500">
            Total Hours
          </p>

          <p className="font-medium">
            {report.totalHours.toFixed(
              1
            )}
            h
          </p>
        </div>

        <div className="rounded-xl border bg-white p-4">
          <p className="text-sm text-slate-500">
            Generated
          </p>

          <p className="font-medium">
            {new Date(
              report.generatedAt
            ).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Completed Tasks
        </h2>

        <table className="w-full">
          <thead>
            <tr>
              <th className="p-3 text-left">
                Task
              </th>

              <th className="p-3 text-left">
                Description
              </th>

              <th className="p-3 text-left">
                Duration
              </th>
            </tr>
          </thead>

          <tbody>
            {report.completedTasks.map(
              (task) => (
                <tr
                  key={task.id}
                  className="border-t"
                >
                  <td className="p-3">
                    {task.title}
                  </td>

                  <td className="p-3">
                    {
                      task.description
                    }
                  </td>

                  <td className="p-3">
                    {task.actualHours.toFixed(
                      1
                    )}
                    h
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">
          In Progress Tasks
        </h2>

        <table className="w-full">
          <thead>
            <tr>
              <th className="p-3 text-left">
                Task
              </th>

              <th className="p-3 text-left">
                Description
              </th>
            </tr>
          </thead>

          <tbody>
            {report.inProgressTasks.map(
              (task) => (
                <tr
                  key={task.id}
                  className="border-t"
                >
                  <td className="p-3">
                    {task.title}
                  </td>

                  <td className="p-3">
                    {
                      task.description
                    }
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}