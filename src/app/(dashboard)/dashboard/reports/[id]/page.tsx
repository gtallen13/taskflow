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
      <div className="flex gap-3">
        <Link
          href="/dashboard/reports"
          className="
            rounded-xl
            border
            px-4
            py-2
            hover:bg-slate-50
          "
        >
          ← Back
        </Link>
      </div>
      <div
        className="
          rounded-3xl
          bg-gradient-to-r
          from-[#000000]
          via-[#14213D]
          to-[#14213D]
          p-8
          text-white
        "
      >
        <div className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-sm">
          Productivity Report
        </div>

        <h1 className="text-4xl font-bold">
          Weekly Report
        </h1>

        <p className="mt-2 text-slate-300">
          {new Date(
            report.weekStart
          ).toLocaleDateString()}
          {" - "}
          {new Date(
            report.weekEnd
          ).toLocaleDateString()}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className=" rounded-3xl border border-[#E5E5E5]bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Week Start
          </p>

          <p className="font-medium">
            {new Date(
              report.weekStart
            ).toLocaleDateString()}
          </p>
        </div>

        <div className=" rounded-3xl border border-[#E5E5E5]bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Week End
          </p>

          <p className="font-medium">
            {new Date(
              report.weekEnd
            ).toLocaleDateString()}
          </p>
        </div>

        <div className=" rounded-3xl border border-[#E5E5E5]bg-white p-6 shadow-sm">
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

        <div className=" rounded-3xl border border-[#E5E5E5]bg-white p-6 shadow-sm">
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
      <div className="rounded-3xl border border-[#E5E5E5] bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#14213D]">
          Executive Summary
        </h2>

        <p className="mt-4 text-slate-600">
          During this reporting period,
          {` `}
          <span className="font-semibold">
            {
              report.completedTasks
                .length
            }
          </span>
          {` `}
          tasks were completed with
          a total of
          {` `}
          <span className="font-semibold">
            {report.totalHours.toFixed(
              1
            )}
            h
          </span>
          {` `}
          tracked.
        </p>

        <p className="mt-3 text-slate-600">
          There are currently
          {` `}
          <span className="font-semibold">
            {
              report.inProgressTasks
                .length
            }
          </span>
          {` `}
          tasks still in progress.
        </p>
      </div>
      <div className="rounded-xl border bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Completed Tasks
        </h2>
          
          <div className="space-y-3">
          {report.completedTasks.map(
            (task) => (
              <div
                key={task.id}
                className="
                  rounded-2xl
                  border
                  border-[#E5E5E5]
                  p-4
                "
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-[#14213D]">
                      {task.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {
                        task.description
                      }
                    </p>
                  </div>

                  <div className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    {task.actualHours.toFixed(
                      1
                    )}
                    h
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">
          In Progress Tasks
        </h2>

        <div className="space-y-3">
          {report.inProgressTasks.map(
            (task) => (
              <div
                key={task.id}
                className="
                  rounded-2xl
                  border
                  border-[#E5E5E5]
                  p-4
                "
              >
                <h3 className="font-semibold text-[#14213D]">
                  {task.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {
                    task.description
                  }
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}