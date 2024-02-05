import BankReconciliationTable from "@/Dashboard/resusables/BankReconciliationTable";
import React, { useState } from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, Option, Select } from "@material-tailwind/react";
import { TextField } from "@mui/material";
import { useMaterialTailwindController } from "../../../../Dashboard/context/index";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const MainPageUserChargesPaymentModeWiseCollection = () => {
  const tableHeadings = ["Description", "No. of Transaction", "Amount"];
  const [controller] = useMaterialTailwindController();
  const { safAllInputFromAPI } = controller;
  const [inputData, setInputData] = useState({
    from_date: "",
    to_date: "",
    ward_no: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [paymentModeWiseCollection, setPaymentModeWiseCollection] = useState(
    []
  );
  const [
    paymentModeWiseCollectionTotalTransactionsCount,
    setPaymentModeWiseCollectionTotalTransactionsCount,
  ] = useState(0);
  const [
    paymentModeWiseCollectionTotalTransactions,
    setPaymentModeWiseCollectionTotalTransactions,
  ] = useState(0);
  const [
    paymentModeWiseCancelledCollection,
    setPaymentModeWiseCancelledCollection,
  ] = useState([]);
  const [
    paymentModeWiseCollectionCancelledTransactionsCount,
    setPaymentModeWiseCollectionCancelledTransactionsCount,
  ] = useState(0);
  const [
    paymentModeWiseCollectionCancelledTransactions,
    setPaymentModeWiseCollectionCancelledTransactions,
  ] = useState(0);

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
      reportIdentifier: "waste_PaymentModeWiseCollection",
      params: baseParams,
    };

    axios
      .post(`${BACKEND_BASE_URL}/reports`, requestData)
      .then((response) => {
        console.log(response.data.data[0]);
        if (response.data.data[0].length == 0) {
          toast.error("No records found", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          let totalTransCount = 0;
          let cancelledCount = 0;
          let totalTransAmount = 0;
          let cancelledAmount = 0;

          response.data.data[0].map((item) => {
            totalTransCount += parseInt(item.number_of_transactions);
            totalTransAmount += parseInt(item.total_collection);
          });

          response.data.data[1].map((item) => {
            cancelledCount += parseInt(item.number_of_transactions);
            cancelledAmount += parseInt(item.total_collection);
          });
          setPaymentModeWiseCollection(response.data.data[0]);
          setPaymentModeWiseCancelledCollection(response.data.data[1]);
          setPaymentModeWiseCollectionTotalTransactionsCount(totalTransCount);
          setPaymentModeWiseCollectionTotalTransactions(totalTransAmount);
          setPaymentModeWiseCollectionCancelledTransactionsCount(
            cancelledCount
          );
          setPaymentModeWiseCollectionCancelledTransactions(cancelledAmount);
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
            Payment Mode Wise Collection
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
                  renderInput={(params) => <TextField {...params} />}
                  inputFormat="YYYY-MM-DD"
                  disableFuture={true}
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
      ) : !isLoading && paymentModeWiseCollection.length > 0 ? (
        <>
          <div>
            <p className="whitespace-normal p-2 text-center text-sm font-bold text-blue-900 ">
              Payment Mode Report from {inputData.from_date} to{" "}
              {inputData.to_date}
            </p>
          </div>

          <div className="border-1 border border-b-0 border-gray-300 p-2">
            <p className="text-center text-xs font-bold text-blue-900">
              Collection & Refund Description
            </p>
          </div>
          <div>
            <div className="mb-12 h-full  overflow-auto shadow-md ">
              <table className="container w-full table-auto text-left">
                <thead>
                  <tr>
                    {tableHeadings.map((heading, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="w-10 whitespace-normal border border-gray-300 px-4 py-2  text-center text-xs font-bold uppercase text-blue-gray-800"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paymentModeWiseCollection.map((eachRow, index) => {
                    const isLast =
                      index === paymentModeWiseCollection.length - 1;
                    return (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        {Object.entries(eachRow).map(([key, value]) => {
                          return (
                            <td
                              key={key.sl_no}
                              className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700"
                            >
                              {value === null ? <i>Not mentioned</i> : value}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                  <tr>
                    <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-bold text-gray-700">
                      Total Collection
                    </td>
                    <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-bold text-gray-700">
                      {paymentModeWiseCollectionTotalTransactionsCount}
                    </td>
                    <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-bold text-gray-700">
                      {paymentModeWiseCollectionTotalTransactions}
                    </td>
                  </tr>
                  {paymentModeWiseCancelledCollection.length > 0 && (
                    <>
                      {paymentModeWiseCancelledCollection.map(
                        (eachRow, index) => {
                          return (
                            <tr
                              key={index}
                              className="hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                              {Object.entries(eachRow).map(
                                ([key, value], innerIndex) => {
                                  return (
                                    <td
                                      key={innerIndex}
                                      className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700"
                                    >
                                      {innerIndex === 0 ? (
                                        value + " Dishonored"
                                      ) : value === null ? (
                                        <i>Not mentioned</i>
                                      ) : (
                                        value
                                      )}
                                    </td>
                                  );
                                }
                              )}
                            </tr>
                          );
                        }
                      )}
                      <tr>
                        <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-bold text-gray-700">
                          Net Collection Total
                        </td>
                        <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-bold text-gray-700">
                          {paymentModeWiseCollectionTotalTransactionsCount -
                            paymentModeWiseCollectionCancelledTransactionsCount}
                        </td>
                        <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-bold text-gray-700">
                          {paymentModeWiseCollectionTotalTransactions -
                            paymentModeWiseCollectionCancelledTransactions}
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default MainPageUserChargesPaymentModeWiseCollection;
