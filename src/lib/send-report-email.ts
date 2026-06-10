import emailjs from "@emailjs/browser";

import { WeeklyReport } from "../types/report";

export const sendReportEmail = async ( email: string, report: WeeklyReport) => {
  
    const tasksList = report.completedTasks.map( (task) =>
          `• ${task.title} (${task.actualHours.toFixed(1)}h)`).join("\n");

  return emailjs.send(
    process.env
      .NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env
      .NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    {
      to_email: email,

      week: `${new Date(
        report.weekStart
      ).toLocaleDateString()}
      -
      ${new Date(
        report.weekEnd
      ).toLocaleDateString()}`,

      total_hours:
        report.totalHours.toFixed(
          1
        ),

      tasks_table: tasksList,
    },

    process.env
      .NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  );
  };