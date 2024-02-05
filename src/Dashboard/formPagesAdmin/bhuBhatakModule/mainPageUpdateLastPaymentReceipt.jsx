import BankReconciliationTable from "@/Dashboard/resusables/BankReconciliationTable";
import { ExportToExcel } from "@/utils/commonComponents";
import React from "react";
import { useState } from "react";
import { Button, Option, Select } from "@material-tailwind/react";
import { TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useMaterialTailwindController } from "../../../Dashboard/context/index";
import { toast, ToastContainer } from "react-toastify";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const UpdateLastPaymentReceipt = () => {
  const tableHeadings = [
    "Sl No.",
    "Consumer Name",
    "Consumer no.",
    "Mobile No.",
    "Area Name",
    "Demand From",
    "Demand To",
    "Tran. Date",
    "Tran. no",
    "Payment Mode",
    "Ward no.",
  ];

  const [exportData, setExportData] = useState([]);
  const [controller, dispatch] = useMaterialTailwindController();
  const { allUserDetailsInputFromAPI, safAllInputFromAPI } = controller;
  const [error, setError] = useState(false);
  const [inputData, setInputData] = useState({
    from_date: "",
    to_date: "",
    ward_no: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [totalCollection, setTotalCollection] = useState(0);
  const [counterCollectionReport, setCounterCollectionReport] = useState([]);

  function formatDate(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    return `${year}-${month}-${day}`;
  }

  const fetchCounterCollectionReport = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${BACKEND_BASE_URL}/bhubhatak/report/counterCollectionReports?fromDate=${inputData.from_date}&toDate=${inputData.to_date}&wardNo=${inputData.ward_no}`
    ).then((res) => res.json());
    console.log(response);
    if (response.data.length == 0) {
      toast.error("No records found", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      let amount = 0;
      let data = response.data.map((item, index) => {
        amount = amount + item.totalpayableamount;
        return {
          "Sl No.": index + 1,
          "Consumer Name": item.consumername,
          "Consumer no.": item.consumerno,
          "Mobile No.": item.mobileno,
          "Area Name": item.areaname,
          "Demand From": item.demandfrom,
          "Demand To": item.demandto,
          "Tran. Date": item.transactiondate,
          "Tran. no": item.transactionno,
          "Payment Mode": item.paymentmethod,
          "Ward no.": item.wardnumber,
        };
      });
      setTotalCollection(amount);
      setCounterCollectionReport(data);
    }
    setIsLoading(false);
  };

  return (
    <div className="mb-8 px-2 py-4">
      <ToastContainer autoClose={2000} />
      <div className="m-4 mt-4 rounded-none border border-gray-500 bg-white px-0 pb-4 pt-0 lg:max-w-full">
        <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
          <h2 className="text-center text-sm font-semibold text-white">
            Counter Collection Report
          </h2>
        </nav>
        <div className="min-w-fit max-w-fit flex-wrap items-end md:flex-1 lg:flex">
          <div className="px-4 py-2">
            <label className="mb-2 block text-xs font-bold text-gray-700">
              Date from{" "}
              <span className="contents text-sm font-bold text-red-600">*</span>
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                id="from_date"
                onChange={(date) => {
                  const formattedDate = formatDate(date);
                  setInputData({ ...inputData, from_date: formattedDate });
                }}
                inputFormat="YYYY-MM-DD"
                value={
                  inputData.from_date !== ""
                    ? inputData.from_date
                    : "YYYY-MM-DD"
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="px-4 py-2">
            <label className="mb-2 block text-xs font-bold text-gray-700">
              Date to{" "}
              <span className="contents text-sm font-bold text-red-600">*</span>
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                id="to_date"
                onChange={(date) => {
                  const formattedDate = formatDate(date);
                  setInputData({ ...inputData, to_date: formattedDate });
                }}
                inputFormat="YYYY-MM-DD"
                value={
                  inputData.to_date !== "" ? inputData.to_date : "YYYY-MM-DD"
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="px-4 py-2">
            <label className="mb-2 block text-xs font-bold text-gray-700">
              Ward no{" "}
              <span className="contents text-sm font-bold text-red-600">*</span>
            </label>
            <Select
              label="select"
              className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
              onChange={(value) => {
                const selectedWard = JSON.parse(value);
                setInputData({
                  ...inputData,
                  ward_no: selectedWard.id,
                });
              }}
            >
              {safAllInputFromAPI?.ward?.length > 0 ? (
                safAllInputFromAPI.ward.map((item) => {
                  const { id, ward_name } = item;
                  return (
                    <Option key={id} value={JSON.stringify(item)}>
                      {ward_name}
                    </Option>
                  );
                })
              ) : (
                <Option>Loading...</Option>
              )}
            </Select>
          </div>
        </div>
        <div className="justify-center p-4 lg:flex">
          <Button
            onClick={() => {
              console.log(inputData);
              if (
                inputData.from_date != "" &&
                inputData.to_date != "" &&
                inputData.ward_no != ""
              ) {
                fetchCounterCollectionReport();
              } else {
                setError(true);
              }
            }}
          >
            Search
          </Button>
        </div>
      </div>

      {isLoading ? (
        <p className="flex justify-center pt-10 text-2xl">Loading...</p>
      ) : !isLoading && counterCollectionReport.length == 0 ? (
        <p className="text-black-500 mt-10 flex justify-center"></p>
      ) : (
        <div className="block  border border-gray-500 text-center">
          <p className="whitespace-normal px-4 py-2 text-center text-sm font-bold text-blue-900 ">
            Bhilai Corporation
          </p>
          <p className="whitespace-normal bg-gray-200 px-4 py-2 text-center text-sm font-bold text-blue-900">
            Counter Collection Report from {inputData.from_date} to{" "}
            {inputData.to_date}
          </p>
          <div className="flex justify-around py-2">
            <p className="whitespace-normal text-sm font-bold text-blue-900">
              Total Collection:{" "}
              <span className="text-red-500">{totalCollection}</span>
            </p>
          </div>
          <div>
            <div className="w-full">
              <BankReconciliationTable
                tableHeadings={tableHeadings}
                tableRows={counterCollectionReport}
              />
            </div>
          </div>
          <div className="m-auto min-w-fit max-w-fit items-center md:flex-1 lg:flex">
            <div className="mb-0 ml-2 mr-0 mt-8 min-w-fit max-w-fit">
              <button
                type="button"
                className="mb-4 ml-2 mr-2 h-8 w-28 transform rounded-md bg-green-400 px-4 py-1 text-sm font-bold tracking-wide text-white transition-colors duration-200 hover:bg-green-700 focus:bg-green-400 focus:outline-none"
              >
                Print
              </button>
            </div>
            <ExportToExcel
              excelData={counterCollectionReport}
              filaName={`CounterCollectionReport`}
              btnText={`Export to Excel`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateLastPaymentReceipt;
