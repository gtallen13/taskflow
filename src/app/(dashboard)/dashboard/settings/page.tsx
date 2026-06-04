"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useAuth } from "../../../../context/AuthContext";
import {
  getUserSettings,
  saveUserSettings,
} from "../../../../services/settings";

export default function SettingsPage() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [reportEmail, setReportEmail] =
    useState("");

  const [reportDay, setReportDay] =
    useState("Friday");

  const [reportTime, setReportTime] =
    useState("17:00");

  const [
    notificationsEnabled,
    setNotificationsEnabled,
  ] = useState(true);

  const [
    overdueAlertsEnabled,
    setOverdueAlertsEnabled,
  ] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadSettings = async () => {
      try {
        const settings =
          await getUserSettings(
            user.uid
          );

        if (settings) {
          setReportEmail(
            settings.reportEmail
          );

          setReportDay(
            settings.reportDay
          );

          setReportTime(
            settings.reportTime
          );

          setNotificationsEnabled(
            settings.notificationsEnabled
          );

          setOverdueAlertsEnabled(
            settings.overdueAlertsEnabled
          );
        } else {
          setReportEmail(
            user.email || ""
          );
        }
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to load settings"
        );
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [user]);

  const handleSave =
    async () => {
      if (!user) return;

      try {
        setSaving(true);

        await saveUserSettings({
          userId: user.uid,

          reportEmail,

          reportDay,

          reportTime,

          notificationsEnabled,

          overdueAlertsEnabled,
        });

        toast.success(
          "Settings saved successfully"
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to save settings"
        );
      } finally {
        setSaving(false);
      }
    };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        Loading settings...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="text-slate-500">
          Manage your profile,
          reports and notification
          preferences.
        </p>
      </div>

      {/* Profile */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Profile
        </h2>

        <div className="grid gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Display Name
            </label>

            <input
              value={
                user?.displayName ||
                ""
              }
              disabled
              className="w-full rounded-lg border bg-slate-100 p-3"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Email
            </label>

            <input
              value={
                user?.email || ""
              }
              disabled
              className="w-full rounded-lg border bg-slate-100 p-3"
            />
          </div>
        </div>
      </div>

      {/* Reports */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Weekly Reports
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">
              Report Email
            </label>

            <input
              type="email"
              value={reportEmail}
              onChange={(e) =>
                setReportEmail(
                  e.target.value
                )
              }
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Report Day
            </label>

            <select
              value={reportDay}
              onChange={(e) =>
                setReportDay(
                  e.target.value
                )
              }
              className="w-full cursor-pointer rounded-lg border p-3"
            >
              <option>
                Monday
              </option>
              <option>
                Tuesday
              </option>
              <option>
                Wednesday
              </option>
              <option>
                Thursday
              </option>
              <option>
                Friday
              </option>
              <option>
                Saturday
              </option>
              <option>
                Sunday
              </option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Report Time
            </label>

            <input
              type="time"
              value={reportTime}
              onChange={(e) =>
                setReportTime(
                  e.target.value
                )
              }
              className="w-full rounded-lg border p-3"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Notifications
        </h2>

        <div className="space-y-4">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={
                notificationsEnabled
              }
              onChange={(e) =>
                setNotificationsEnabled(
                  e.target.checked
                )
              }
            />

            <span>
              Enable notifications
            </span>
          </label>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={
                overdueAlertsEnabled
              }
              onChange={(e) =>
                setOverdueAlertsEnabled(
                  e.target.checked
                )
              }
            />

            <span>
              Enable overdue
              task alerts
            </span>
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="cursor-pointer rounded-lg bg-black px-6 py-3 text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
        >
          {saving
            ? "Saving..."
            : "Save Settings"}
        </button>
      </div>
    </div>
  );
}