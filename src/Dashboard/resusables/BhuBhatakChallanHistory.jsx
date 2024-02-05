import React from "react";
import BankReconciliationTable from "./BankReconciliationTable";
import { useEffect } from "react";

const tableHeadings = [
  "Sl.No.",
  "Demand from - Demand upto",
  "Challan Document Link",
];

const BhuBhatakChallanHistory = ({ history }) => {

  return (
    <div className="mb-12 mt-5 shadow">
      <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
        <h2 className="text-center text-sm font-semibold text-white">
          Challan History
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

export default BhuBhatakChallanHistory;
