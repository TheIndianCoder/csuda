import BankReconciliationTable from "@/Dashboard/resusables/BankReconciliationTable";
import React, { useState } from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, Option, Select } from "@material-tailwind/react";
import { TextField } from "@mui/material";
import { useMaterialTailwindController } from "../../../Dashboard/context/index";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const MainPageUpdateWaterPaymentModeWiseCollection = () => {
  const tableHeadings = ["Description", "No. of Transaction", "Amount"];

  const [transactionsTypeHistory, setTransactionsTypeHistory] = useState([]);
  const [transactionsCountTotalAmount, settransactionsCountTotalAmount] =
    useState(0);
  const [transactionsToHistory, setTransactionsToHistory] = useState([]);
  const [transactionsToHistoryCount, setTransactionsToHistoryCount] =
    useState(0);
  const [
    transactionsToHistoryTotalAmount,
    setTransactionsToHistoryTotalAmount,
  ] = useState(0);
  const [transactionsMeterHistory, setTransactionsMeterHistory] = useState([]);
  const [transactionsMeterTotalAmount, settransactionsMeterTotalAmount] =
    useState(0);
  const [transactionsCountHistory, setTransactionsCountHistory] = useState([]);

  const [inputData, setInputData] = useState({
    from_date: "",
    to_date: "",
    ward_no: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [controller, dispatch] = useMaterialTailwindController();
  const { safAllInputFromAPI } = controller;

  function formatDate(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    return `${year}-${month}-${day}`;
  }

  async function searchData() {
    setIsLoading(true);

    const baseParams = {
      fromDate: inputData.from_date,
      toDate: inputData.to_date,
    };

    if (inputData.ward_no !== "All") {
      baseParams.wardId = inputData.ward_no;
    }

    const requestData = {
      reportIdentifier: "water_paymentModeWiseCollection",
      params: baseParams,
    };

    axios
      .post(`${BACKEND_BASE_URL}/reports`, requestData)
      .then((response) => {
        console.log(response.data.data);
        if (
          response.data.data[0].length == 0 &&
          response.data.data[1].length == 0 &&
          response.data.data[2].length == 0 &&
          response.data.data[3].length == 0
        ) {
          toast.error("No records found", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          let amount = 0;
          let amount1 = 0;
          let amount2 = 0;
          let transactions = 0;
          setTransactionsCountHistory(response.data.data[0]);
          setTransactionsMeterHistory(response.data.data[1]);
          setTransactionsToHistory(response.data.data[2]);
          setTransactionsTypeHistory(response.data.data[3]);
          response.data.data[2].map((item) => {
            transactions += parseFloat(item.no_of_transactions);
            amount2 += parseFloat(item.amount);
          });

          response.data.data[1].map((item) => {
            amount += parseFloat(item.amount);
          });

          response.data.data[0].map((item) => {
            amount1 += parseFloat(item.amount);
          });
          setTransactionsToHistoryCount(transactions);
          setTransactionsToHistoryTotalAmount(amount2);
          settransactionsCountTotalAmount(amount1);
          settransactionsMeterTotalAmount(amount);
        }

        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }

  const dataLoding = !safAllInputFromAPI || !safAllInputFromAPI.ward;

  const wardOptions = [
    { id: "All", ward_name: "All" },
    ...(safAllInputFromAPI?.ward?.length > 0
      ? safAllInputFromAPI.ward.map((item) => {
          const { id, ward_name } = item;
          return { id, ward_name };
        })
      : []),
  ];

  return (
    <div>
      <ToastContainer autoClose={2000} />
      <div className="m-4 mt-4 rounded-none border border-gray-500 bg-white px-0 pb-4 pt-0 lg:max-w-full">
        <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
          <h2 className="text-center text-sm font-semibold text-white">
            Payment Mode Wise Report
          </h2>
        </nav>
        <div className="flex justify-between">
          <div className="min-w-fit max-w-fit flex-wrap items-end md:flex-1 lg:flex">
            <div className="px-4 py-2">
              <label className="mb-2 block text-xs font-bold text-gray-700">
                Date from{" "}
                <span className="contents text-sm font-bold text-red-600">
                  *
                </span>
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
                  disableFuture={true}
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
                <span className="contents text-sm font-bold text-red-600">
                  *
                </span>
              </label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  id="to_date"
                  onChange={(date) => {
                    const formattedDate = formatDate(date);
                    setInputData({ ...inputData, to_date: formattedDate });
                  }}
                  disableFuture={true}
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
                <span className="contents text-sm font-bold text-red-600">
                  *
                </span>
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
                {dataLoding ? (
                  <Option>Loading...</Option>
                ) : (
                  wardOptions.map((item) => (
                    <Option key={item.id} value={JSON.stringify(item)}>
                      {item.ward_name}
                    </Option>
                  ))
                )}
              </Select>
            </div>
          </div>
          <div className="mr-20 justify-center p-4 lg:flex">
            <Button
              onClick={() => {
                console.log(inputData);
                if (
                  inputData.from_date != "" &&
                  inputData.to_date != "" &&
                  inputData.ward_no != ""
                ) {
                  searchData();
                }
              }}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
      {isLoading ? (
        <p className="flex justify-center pt-20 text-2xl">Loading...</p>
      ) : !isLoading &&
        (transactionsMeterHistory.length > 0 ||
          transactionsCountHistory.length > 0 ||
          transactionsToHistory.length > 0) ? (
        <div className="mb-16">
          <div>
            <p className="whitespace-normal p-2 text-center text-sm font-bold text-blue-900 ">
              Payment Mode Collection Dishonoured/Cancelled/Bounced Payments
              from {inputData.from_date} to {inputData.to_date}
              {/* Payment Mode Report  */}
            </p>
          </div>
          {transactionsTypeHistory.length > 0 && (
            <BankReconciliationTable
              tableHeadings={tableHeadings}
              tableRows={transactionsTypeHistory}
            />
          )}
          {transactionsMeterHistory.length > 0 && (
            <table className="container mb-10 w-full table-auto text-left ">
              <thead className="my-2 h-10 whitespace-normal border-r-2 border-gray-300 bg-gray-200 p-2 text-sm font-bold text-blue-900">
                <tr>
                  <th colSpan={2} className="p-2 text-xl font-bold text-black">
                    Connection Type Collection
                  </th>
                </tr>
                <tr>
                  <th className="p-2">Connection Type (No. of Transactions)</th>
                  <th className="p-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactionsMeterHistory.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="text-md whitespace-normal border border-gray-300 px-4 py-2 font-semibold text-gray-700">
                        {item.connection_type} ({item.no_of_transactions})
                      </td>
                      <td className="text-md whitespace-normal border border-gray-300 px-4 py-2 font-semibold text-gray-700">
                        {item.amount}
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td className="my-2 h-10 whitespace-normal border-r-2 border-gray-300 bg-gray-200 p-2 text-sm font-bold text-blue-900">
                    Total
                  </td>
                  <td className="my-2 h-10 whitespace-normal border-r-2 border-gray-300 bg-gray-200 p-2 text-sm font-bold text-blue-900">
                    {transactionsMeterTotalAmount}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
          {transactionsCountHistory.length > 0 && (
            <table className="container mb-10 w-full table-auto text-left ">
              <thead className="my-2 h-10 whitespace-normal border-r-2 border-gray-300 bg-gray-200 p-2 text-sm font-bold text-blue-900">
                <tr>
                  <th colSpan={3} className="p-2 text-xl font-bold text-black">
                    Payment Mode wise Collection
                  </th>
                </tr>
                <tr>
                  <th className="p-2">Payment Mode</th>
                  <th className="p-2">No. of Transactions</th>
                  <th className="p-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactionsCountHistory.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="text-md whitespace-normal border border-gray-300 px-4 py-2 font-medium text-gray-700">
                        {item.payment_mode}
                      </td>
                      <td className="text-md whitespace-normal border border-gray-300 px-4 py-2 font-medium text-gray-700">
                        {item.no_of_transactions}
                      </td>
                      <td className="text-md whitespace-normal border border-gray-300 px-4 py-2 font-medium text-gray-700">
                        {item.amount}
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td className="my-2 h-10 whitespace-normal border-r-2 border-gray-300 bg-gray-200 p-2 text-sm font-medium text-blue-900">
                    Total
                  </td>
                  <td className="my-2 h-10 whitespace-normal border-r-2 border-gray-300 bg-gray-200 p-2 text-sm font-medium text-blue-900"></td>
                  <td className="my-2 h-10 whitespace-normal border-r-2 border-gray-300 bg-gray-200 p-2 text-sm font-medium text-blue-900">
                    {transactionsCountTotalAmount}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
          {transactionsToHistory.length > 0 && (
            <table className="container mb-10 w-full table-auto text-left ">
              <thead className="my-2 h-10 whitespace-normal border-r-2 border-gray-300 bg-gray-200 p-2 text-sm font-bold text-blue-900">
                <tr>
                  <th colSpan={2} className="p-2 text-xl font-bold text-black">
                    Property type Collection
                  </th>
                </tr>
                <tr>
                  <th className="p-2">Property Type (No. of Transactions)</th>
                  <th className="p-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactionsToHistory.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="text-md whitespace-normal border border-gray-300 px-4 py-2 font-medium text-gray-700">
                        {item.property_type} ({item.no_of_transactions})
                      </td>
                      <td className="text-md whitespace-normal border border-gray-300 px-4 py-2 font-medium text-gray-700">
                        {item.amount}
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td className="my-2 h-10 whitespace-normal border-r-2 border-gray-300 bg-gray-200 p-2 text-sm font-medium text-blue-900">
                    Total ({transactionsToHistoryCount})
                  </td>
                  <td className="my-2 h-10 whitespace-normal border-r-2 border-gray-300 bg-gray-200 p-2 text-sm font-medium text-blue-900">
                    {transactionsToHistoryTotalAmount}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default MainPageUpdateWaterPaymentModeWiseCollection;
