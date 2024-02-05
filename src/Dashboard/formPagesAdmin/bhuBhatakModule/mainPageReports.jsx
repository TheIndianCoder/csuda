import BankReconciliationTable from "@/Dashboard/resusables/BankReconciliationTable";
import { Grid } from "@mui/material";
import React, { useState } from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, Option, Select } from "@material-tailwind/react";
import { TextField } from "@mui/material";
import { useMaterialTailwindController } from "../../../Dashboard/context/index";
import { toast, ToastContainer } from "react-toastify";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const Reports = () => {
  const tableHeadings = ["Description", "No. of Transaction", "Amount"];
  const [controller, dispatch] = useMaterialTailwindController();
  const { allUserDetailsInputFromAPI, safAllInputFromAPI } = controller;
  const [inputData, setInputData] = useState({
    from_date: "",
    to_date: "",
    ward_no: "",
  });
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentModeData, setPaymentModeData] = useState([]);

  function formatDate(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    return `${year}-${month}-${day}`;
  }

  const paymentModeWiseReport = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${BACKEND_BASE_URL}/bhubhatak/report/paymentModeWiseReport?fromDate=${inputData.from_date}&toDate=${inputData.to_date}&wardNo=${inputData.ward_no}`
    ).then((res) => res.json());
    console.log(response);
    if (response.data.length == 0) {
      toast.error("No records found", {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
    } else {
      setPaymentModeData(response.data);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer autoClose={2000} />
      <div className="m-4 mt-4 rounded-none border border-gray-500 bg-white px-0 pb-4 pt-0 lg:max-w-full">
        <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
          <h2 className="text-center text-sm font-semibold text-white">
            Payment Mode Wise Report
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
                renderInput={(params) => <TextField {...params} />}
                inputFormat="YYYY-MM-DD"
                value={
                  inputData.from_date !== ""
                    ? inputData.from_date
                    : "YYYY-MM-DD"
                }
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
                renderInput={(params) => <TextField {...params} />}
                inputFormat="YYYY-MM-DD"
                value={
                  inputData.to_date !== "" ? inputData.to_date : "YYYY-MM-DD"
                }
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
                paymentModeWiseReport();
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
      ) : !isLoading && paymentModeData.length == 0 ? (
        <p className="text-black-500 mt-10 flex justify-center"></p>
      ) : (
        <>
          <div>
            <p className="whitespace-normal p-2 text-center text-sm font-bold  text-blue-900 ">
              Payment Mode Report from {inputData.from_date} to{" "}
              {inputData.to_date}
            </p>
          </div>
          <Grid container flexWrap="wrap">
            <Grid item xs={12} md={8} lg={10}>
              <div className="border-1 border border-b-0 border-gray-300 p-2">
                <p className="text-center text-xs font-bold  text-blue-900">
                  Collection & Refund Description
                </p>
              </div>
              <BankReconciliationTable
                tableHeadings={tableHeadings}
                tableRows={paymentModeData}
              />
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default Reports;
