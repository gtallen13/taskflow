import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const {
      email,
      report,
    } = body;

    const completedRows =
      report.completedTasks
        .map(
          (task: any) => `
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

    const html = `
<div style="font-family:Arial;padding:20px;">
  <h1>Weekly Productivity Report</h1>

  <p>
    Week:
    ${new Date(
      report.weekStart
    ).toLocaleDateString()}
    -
    ${new Date(
      report.weekEnd
    ).toLocaleDateString()}
  </p>

  <h2>Total Hours: ${report.totalHours.toFixed(
    1
  )}h</h2>

  <table
    style="
      width:100%;
      border-collapse:collapse;
      margin-top:20px;
    "
  >
    <thead>
      <tr style="background:#f3f4f6;">
        <th style="padding:8px;border:1px solid #ddd;">
          Task
        </th>

        <th style="padding:8px;border:1px solid #ddd;">
          Description
        </th>

        <th style="padding:8px;border:1px solid #ddd;">
          Duration
        </th>
      </tr>
    </thead>

    <tbody>
      ${completedRows}
    </tbody>
  </table>
</div>
`;

    await resend.emails.send({
      from:
        "onboarding@resend.dev",

      to: email,

      subject:
        "Weekly Productivity Report",

      html,
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Failed to send email",
      },
      { status: 500 }
    );
  }
}