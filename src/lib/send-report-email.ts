import emailjs from "@emailjs/browser";

import { WeeklyReport } from "../types/report";

export const sendReportEmail =
  async (
    email: string,
    report: WeeklyReport
  ) => {
    const tasksTable =
  report.completedTasks
    .map(
      (task) => `
<tr>
  <td style="padding:8px;border:1px solid #ddd;">
    ${task.title}
  </td>

  <td style="padding:8px;border:1px solid #ddd;">
    ${task.description}
  </td>

  <td style="padding:8px;border:1px solid #ddd;">
    ${task.actualHours.toFixed(
      1
    )}h
  </td>
</tr>
`
    )
    .join("");

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

        tasks_table:
          tasksTable,
      },

      process.env
        .NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );
  };