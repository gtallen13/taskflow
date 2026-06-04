import {
  AppNotification,
} from "../../lib/notifications";

interface Props {
  notifications:
    AppNotification[];
}

export default function NotificationsPanel({
  notifications,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <h2 className="mb-4 text-lg font-semibold">
        Notifications
      </h2>

      <div className="space-y-2">
        {notifications.length ===
        0 ? (
          <p className="text-sm text-slate-500">
            No notifications
          </p>
        ) : (
          notifications.map(
            (
              notification
            ) => (
              <div
                key={
                  notification.id
                }
                className={`rounded-lg p-3 text-sm

                ${
                  notification.type ===
                  "danger"
                    ? "bg-red-100 text-red-700"

                    : notification.type ===
                      "warning"
                    ? "bg-yellow-100 text-yellow-700"

                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {
                  notification.message
                }
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}