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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#14213D]">
            Settings
          </h1>

          <p className="mt-1 text-slate-500">
            Manage your account and productivity preferences
          </p>
        </div>

        <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
          Account Active
        </div>
      </div>

      {/* Profile */}
      <div className="
        rounded-3xl
        border
        border-[#E5E5E5]
        bg-white
        p-6
        shadow-sm
        ">
      
        <div className="mb-6 flex items-center gap-4">
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-[#FCA311]
              text-xl
              font-bold
              text-[#14213D]
            "
          >
            {user?.email?.[0]?.toUpperCase()}
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#14213D]">
              {user?.displayName ||
                "User"}
            </h2>

            <p className="text-slate-500">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Reports */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#14213D]">
            Report Delivery
          </h2>

          <p className="text-sm text-slate-500">
            Configure where and when reports are sent
          </p>
        </div>

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
              className="w-full rounded-xl
border
border-[#E5E5E5]
bg-white
px-4
py-3
focus:border-[#FCA311]
focus:outline-none"
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
              className="w-full cursor-pointer rounded-xl
border
border-[#E5E5E5]
bg-white
px-4
py-3
focus:border-[#FCA311]
focus:outline-none"
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
              className="w-full rounded-xl
border
border-[#E5E5E5]
bg-white
px-4
py-3
focus:border-[#FCA311]
focus:outline-none"
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

      <div className=" sticky bottom-0 rounded-3xl border border-[#E5E5E5] bg-white p-4 shadow-l ">
        <div className="flex items-center justify-between">
          <button
            onClick={handleSave}
            disabled={saving}
            className="
              cursor-pointer
              rounded-xl
              bg-[#FCA311]
              px-6
              py-3
              font-medium
              text-[#14213D]
              transition
              hover:shadow-lg
            "
          >
            {saving
              ? "Saving..."
              : "Save Settings"}
          </button>

        </div>
      </div>
    </div>
  );
}