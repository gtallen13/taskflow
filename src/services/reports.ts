import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../../firebase/config";

import { WeeklyReport } from "../types/report";

const reportsCollection =
  collection(
    db,
    "weeklyReports"
  );

export const createReport =
  async (
    report: Omit<
      WeeklyReport,
      "id"
    >
  ) => {
    if (!report.userId) {
      throw new Error(
        "Report must have a userId"
      );
    }
    return await addDoc(
      reportsCollection,
      report
    );
  };

export const getReports =
  async (
    userId: string
  ) => {
    const q = query(
      reportsCollection,

      where(
        "userId",
        "==",
        userId
      ),

      orderBy(
        "generatedAt",
        "desc"
      )
    );

    try {
      const snapshot =
        await getDocs(q);

      return snapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      ) as WeeklyReport[];
    } catch (error) {
      console.error(
        "Failed to load reports",
        error
      );

      return [];
    }
};

export const getReportById =
  async (
    reportId: string
  ) => {
    const reportRef = doc(
      db,
      "weeklyReports",
      reportId
    );

    const snapshot =
      await getDoc(reportRef);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as WeeklyReport;
};