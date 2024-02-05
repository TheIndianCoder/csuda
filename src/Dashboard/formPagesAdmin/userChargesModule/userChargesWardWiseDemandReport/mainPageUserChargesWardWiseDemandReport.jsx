import React, { useState } from "react";
import { ExportToExcel } from "@/utils/commonComponents";
import BankReconciliationTable from "@/Dashboard/resusables/BankReconciliationTable";
import WardNumberCollector from "@/Dashboard/resusables/WardNumberCollector";
const SUDA_API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
import { getCookieByName } from "@/utils/RequireAuth";
import { Button } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { ColorRing } from "react-loader-spinner";

const TableHeadings = [
  "Sl No.",
  "Ward No.",
  "Holding No.",
  "Consumer No.",
  "Owner Name",
  "Guardian Name",
  "Mobile No.",
  "Address",
  "From Month",
  "Upto Month",
  "Demand Amount",
];

const MainPageUserChargesWardWiseDemandReport = () => {
  const [tableLoading, setTableLoading] = useState(false);
  const [wardNo, setWardNo] = useState(null);
  const [offset, setOffset] = useState(null);
  const [rowData, setRowData] = useState([]);

  console.log("wardNo", wardNo);

  async function SearchForWard() {
    setTableLoading(true);
    try {
      const base_url = `${SUDA_API_BASE_URL}/reports/`;

      var raw = JSON.stringify({
        reportIdentifier: "waste_wardWiseDemandReport",
        params: {
          wardID: wardNo,
        },
        paginate: {
          limit: 10,
          offset: offset,
        },
      });

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
        },
        body: raw,
        redirect: "follow",
      };
      let response = null,
        responseBody = null;
      response = await fetch(base_url, requestOptions);
      responseBody = await response.json();
      console.log("responseBody", responseBody);
      if (response.status !== 200) {
        toast.error("No record found!", { position: "top-center" });
        return;
      }
      if (responseBody.data.length < 1) {
        toast.error("No record found!", { position: "top-center" });
        return;
      }
      let restructeredData = [];
      responseBody?.data[0]?.forEach((data, index) => {
        restructeredData.push({
          sl_no: offset + index + 1,
          ward_no: data?.ward_no,
          holding: data?.holding_no,
          consNo: data?.consumer_no,
          ownerName: data?.consumer_name,
          guardianName: data?.gradian_name,
          mobileNo: data?.mobile_no,
          address: data?.address,
          from: data?.demand_from,
          upto: data?.demand_to,
          amount: data?.demand_amount,
        });
      });
      setRowData(restructeredData);
    } catch (error) {
      console.log(error);
    } finally {
      setTableLoading(false);
    }
  }

  console.log("offset", offset);

  useEffect(() => {
    if (offset !== null) {
      SearchForWard();
    }
  }, [offset]);

  return (
    <div>
      <ToastContainer autoClose={2000} />
      <WardNumberCollector
        SearchFunction={SearchForWard}
        setWardNo={setWardNo}
        setoffset={setOffset}
        wardNo={wardNo}
        title={"Ward Wise Demand Report"}
      />
      {tableLoading && (
        <div className="m-auto h-16 w-16">
          <ColorRing
            visible={true}
            height="40"
            width="40"
            colors={["#2fa158", "#2fa158", "#2fa158", "#2fa158", "#2fa158"]}
          />
        </div>
      )}

      {!tableLoading && rowData.length > 0 && (
        <>
          <div className="flex-wrap items-center justify-between bg-gray-200 px-4 lg:flex">
            <div className="flex-wrap items-center gap-4 lg:flex">
              <p className="whitespace-normal text-sm font-semibold">
                Waste Ward no wise Demand
              </p>
              {/* <p className="whitespace-normal text-sm font-semibold text-green-500">
            Number of Consumers: 4,50,000
          </p>
          <p className="whitespace-normal text-sm font-semibold text-green-500">
            Total Demand: 5,68,912
          </p> */}
            </div>
            <ExportToExcel
              btnText={`Export to Excel`}
              excelData={rowData}
              filaName={`Ward wise Demand Report`}
            />
          </div>
          <BankReconciliationTable
            tableHeadings={TableHeadings}
            tableRows={rowData}
          />
          <div className="mb-12 items-center justify-around lg:flex">
            <Button
              disabled={offset === 0}
              onClick={() => {
                setOffset((prevState) => prevState - 10);
              }}
            >
              Previous
            </Button>
            <Button
              onClick={() => {
                setOffset((prevState) => prevState + 10);
              }}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default MainPageUserChargesWardWiseDemandReport;
