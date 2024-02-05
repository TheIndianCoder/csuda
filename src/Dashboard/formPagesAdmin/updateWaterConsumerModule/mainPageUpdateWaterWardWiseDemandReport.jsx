import BankReconciliationTable from "@/Dashboard/resusables/BankReconciliationTable";
import WaterWardNumberCollector from "@/Dashboard/resusables/WaterWardNumberCollector";
import { ExportToExcel } from "@/utils/commonComponents";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const TableHeadings = [
  "Sl No.",
  "Ward No.",
  "Consumer No.",
  "Holding No.",
  "Property Address",
  "Owner Name",
  "Mobile No.",
  "Guardian Name",
  "Demand Amount",
  "Penalty Amount",
  "Total Amount",
  "Payment Status",
];

const MainPageUpdateWaterWardWiseDemandReport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [
    waterConsumerWardWiseDemandReport,
    setWaterConsumerWardWiseDemandReport,
  ] = useState([]);
  const [totalConsumers, setTotalConsumers] = useState(0);
  const [totalCollection, setTotalCollection] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);

  const [wardNo, setWardNo] = useState(null);

  async function SearchForWard(wardNo, offset) {
    console.log(wardNo);
    setWardNo(wardNo);
    setIsLoading(true);
    const params = {};
    if (wardNo !== "All") params.wardID = wardNo;
    const requestData = {
      reportIdentifier: "water_WardwisedemandReport",
      params,
      paginate: {
        limit: itemsPerPage,
        offset: offset == null ? 0 : offset,
      },
    };

    const requestDataCount = {
      reportIdentifier: "water_WardwisedemandReportCount",
      params,
    };

    axios
      .post(`${BACKEND_BASE_URL}/reports`, requestDataCount)
      .then((response) => {
        if (response.data.data[0].length > 0) {
          console.log(response.data.data[0]);
          let totalCon = 0;
          let totalCol = 0;
          response.data.data[0]?.forEach((data) => {
            totalCon += parseFloat(data.total_count);
            totalCol += parseFloat(data.total_demand_amount);
          });
          setTotalCollection(totalCol);
          setTotalConsumers(totalCon);
        }
      });

    axios
      .post(`${BACKEND_BASE_URL}/reports`, requestData)
      .then((response) => {
        console.log(response.data.data[0]);
        if (response.data.data[0].length == 0) {
          toast.error("No records found", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          let restructeredData = [];
          response.data.data[0]?.forEach((data, index) => {
            restructeredData.push({
              sl_no: offset == null ? index + 1 : offset + index + 1,
              ward_id: data.ward_id,
              consumer_no: data.consumer_no,
              holding_no: data.holding_no,
              property_address: data.property_address,
              name: data.name,
              mobile_no: data.mobile_no,
              guardian_name: data.guardian_name,
              demand_amount: data.demand_amount,
              penalty_amount: data.penalty_amount,
              total_amount:
                parseFloat(data.penalty_amount) +
                parseFloat(data.demand_amount),
              payment_status: data.payment_status == 1 ? "Paid" : "Unpaid",
            });
          });
          setWaterConsumerWardWiseDemandReport(restructeredData);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      SearchForWard(wardNo, currentPage * itemsPerPage);
    }
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    SearchForWard(wardNo, currentPage * itemsPerPage);
  };

  return (
    <div>
      <ToastContainer autoClose={2000} />
      <WaterWardNumberCollector
        heading={"Ward Wise Water Demand Report"}
        SearchFunction={SearchForWard}
      />

      {totalConsumers != 0 && totalCollection !== 0 && (
        <div className="flex-wrap items-center justify-between bg-gray-200 px-4 lg:flex">
          <div className="flex-wrap items-center gap-4 lg:flex">
            <p className="whitespace-normal text-sm font-bold">
              Ward Wise Water Demand Report
            </p>
            <p className="whitespace-normal text-sm font-bold text-green-500">
              Number of Consumers: {totalConsumers.toFixed(2)}
            </p>
            <p className="whitespace-normal text-sm font-bold text-green-500">
              Total Demand: {totalCollection.toFixed(2)}
            </p>
          </div>
          <ExportToExcel
            btnText={`Export to Excel`}
            excelData={waterConsumerWardWiseDemandReport}
            fileName={`Ward wise Demand Report`}
          />
        </div>
      )}

      {isLoading ? (
        <p className="flex justify-center pt-20 text-2xl">Loading...</p>
      ) : !isLoading && waterConsumerWardWiseDemandReport.length > 0 ? (
        <div>
          <BankReconciliationTable
            tableHeadings={TableHeadings}
            tableRows={waterConsumerWardWiseDemandReport}
          />
          <div className="pagination flex justify-around pb-20">
            <button
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:cursor-pointer hover:bg-blue-700"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:cursor-pointer hover:bg-blue-700"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MainPageUpdateWaterWardWiseDemandReport;
