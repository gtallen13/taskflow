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
import { getUserSettings } from "@/services/settings";
import {useAuth} from "../../../../context/AuthContext"
import Link from "next/link";

export default function ReportsPage() {
  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [reports, setReports] =
    useState<
      WeeklyReport[]
    >([]);

  const [ reportEmail, setReportEmail,] = useState("");
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
    loadSettings();

    return () => unsubscribe();
  }, [user]);


const loadSettings =
  async () => {
    if (!user) return;

    const settings =
      await getUserSettings(
        user.uid
      );

    if (
      settings?.reportEmail
    ) {
      setReportEmail(
        settings.reportEmail
      );
    }
};

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
  const totalReports = reports.length;
  const totalHours =
    reports.reduce(
      (sum, report) =>
        sum + report.totalHours,
      0
    );

  const totalCompletedTasks =
    reports.reduce(
      (sum, report) =>
        sum +
        report.completedTasks
          .length,
      0
    );

  const averageHours =
    reports.length
      ? (
          totalHours /
          reports.length
        ).toFixed(1)
      : "0";
  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#14213D]">
            Reports
          </h1>

          <p className="mt-1 text-slate-500">
            Track productivity and share progress
          </p>
        </div>

        <button
          onClick={
            handleGenerateReport
          }
          className="
            cursor-pointer
            rounded-xl
            bg-[#FCA311]
            px-5
            py-3
            font-medium
            text-[#14213D]
            shadow-sm
            transition
            hover:shadow-lg
          "
        >
          Generate Report
        </button>
      </div>
      <div className="rounded-3xl border border-[#E5E5E5] bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-[#14213D]">
          Report Delivery
        </h2>

        <p className="mt-2 text-slate-500">
          Reports will be sent to:
        </p>

        <p className="mt-2 font-medium">
          {reportEmail ||
            "No email configured"}
        </p>

        <Link
          href="/dashboard/settings"
          className="
            mt-4
            inline-flex
            rounded-xl
            border
            px-4
            py-2
            text-sm
            transition
            hover:bg-slate-50
          "
        >
          Manage Settings
        </Link>
      </div>

      {reports.length === 0 ? (
        <div className="rounded-3xl border border-[#E5E5E5] bg-white p-12 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-[#14213D]">
            No Reports Yet
          </h2>

          <p className="mt-2 text-slate-500">
            Generate your first report to start tracking productivity.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {reports.map(
            (report) => (
              <div
                key={report.id}
                className="
                  rounded-3xl
                  border
                  border-[#E5E5E5]
                  bg-white
                  p-6
                  shadow-sm
                "
              >
                <div className="flex items-start justify-between">

                  <div>
                    <div className="mb-3 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      Generated
                    </div>

                    <h2 className="text-2xl font-bold text-[#14213D]">
                      Weekly Report
                    </h2>

                    <p className="mt-1 text-slate-500">
                      {new Date(
                        report.weekStart
                      ).toLocaleDateString()}
                      {" - "}
                      {new Date(
                        report.weekEnd
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-slate-500">
                      Tracked Hours
                    </p>

                    <h2 className="text-5xl font-bold text-[#14213D]">
                      {report.totalHours.toFixed(
                        1
                      )}
                    </h2>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">

                  <div className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    Completed:{" "}
                    {
                      report
                        .completedTasks
                        .length
                    }
                  </div>

                  <div className="rounded-full bg-[#FCA311]/15 px-3 py-1 text-sm text-[#14213D]">
                    In Progress:{" "}
                    {
                      report
                        .inProgressTasks
                        .length
                    }
                  </div>

                </div>

                <div className="mt-6 flex gap-3">

                  <Link
                    href={`/dashboard/reports/${report.id}`}
                    className="
                      rounded-xl
                      bg-[#14213D]
                      px-4
                      py-2
                      text-white
                      transition
                      hover:shadow-lg
                    "
                  >
                    View Report
                  </Link>

                  <button
                    onClick={async () => {
                      try {
                        setSending(
                          true
                        );

                        await sendReportEmail(
                          reportEmail,
                          report
                        );

                        alert(
                          "Report sent successfully!"
                        );
                      } catch (
                        error
                      ) {
                        console.error(
                          error
                        );

                        alert(
                          "Failed to send report"
                        );
                      } finally {
                        setSending(
                          false
                        );
                      }
                    }}
                    className="
                      rounded-xl
                      bg-[#FCA311]
                      px-4
                      py-2
                      font-medium
                      text-[#14213D]
                      transition
                      hover:shadow-lg
                    "
                  >
                    {sending
                      ? "Sending..."
                      : "Send Email"}
                  </button>

                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}