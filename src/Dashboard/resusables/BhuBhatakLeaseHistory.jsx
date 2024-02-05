import React from "react";
import BankReconciliationTable from "./BankReconciliationTable";
import { Button } from "@material-tailwind/react";

const tableHeadings = ["Sl.No.", "Date of Renewal", "Lease Effective Upto"];
const dummyData = [
  {
    slNo: 1,
    renewalDate: "2023-07-05",
    effectiveUpto: "2023-12-31",
  },
  {
    slNo: 2,
    renewalDate: "2023-08-12",
    effectiveUpto: "2024-02-29",
  },
  {
    slNo: 3,
    renewalDate: "2023-09-22",
    effectiveUpto: "2024-03-31",
  },
  {
    slNo: 4,
    renewalDate: "2023-10-17",
    effectiveUpto: "2024-05-15",
  },
  {
    slNo: 5,
    renewalDate: "2023-11-25",
    effectiveUpto: "2024-07-31",
  },
  {
    slNo: 6,
    renewalDate: "2023-12-10",
    effectiveUpto: "2024-09-30",
  },
  {
    slNo: 7,
    renewalDate: "2024-01-18",
    effectiveUpto: "2024-11-30",
  },
  {
    slNo: 8,
    renewalDate: "2024-02-05",
    effectiveUpto: "2025-01-31",
  },
  {
    slNo: 9,
    renewalDate: "2024-03-14",
    effectiveUpto: "2025-03-31",
  },
  {
    slNo: 10,
    renewalDate: "2024-04-27",
    effectiveUpto: "2025-05-31",
  },
];

const BhuBhatakLeaseHistory = ({ history }) => {
  return (
    <div className="mt-5 shadow">
      <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
        <h2 className="text-center text-sm font-semibold text-white">
          Lease History
        </h2>
      </nav>
      <div className="p-4">
        <BankReconciliationTable
          tableHeadings={tableHeadings}
          tableRows={history}
        />
      </div>
    </div>
  );
};

export default BhuBhatakLeaseHistory;
