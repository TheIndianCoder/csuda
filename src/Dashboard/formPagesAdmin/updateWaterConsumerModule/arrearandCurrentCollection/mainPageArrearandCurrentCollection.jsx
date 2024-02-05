import React from "react";
import BankReconciliationTable from "@/Dashboard/resusables/BankReconciliationTable";
import { Select, Option } from "@material-tailwind/react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";
import { ColorRing } from "react-loader-spinner";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ExportToExcel } from "@/utils/commonComponents";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useMaterialTailwindController } from "../../../../Dashboard/context/index";
import { array } from "prop-types";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const ArrearandCurrentCollection = () => {
  const tableHeadings = [
    "Ward ID",
    "Advance Collection",
    "Current Collection",
    "Penalty Collection",
    "Total Collection",
  ];
  const [controller, dispatch] = useMaterialTailwindController();
  const { safAllInputFromAPI } = controller;
  const [arrearandCurrentCollection, setArrearandCurrentCollection] = useState(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [inputData, setInputData] = useState({
    fromDate: "",
    toDate: "",
    wardNo: "",
  });

  function formatDate(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    return `${year}-${month}-${day}`;
  }

  async function SearchData() {
    setIsLoading(true);

    const baseParams = {
      fromDate: inputData.fromDate,
      toDate: inputData.toDate,
    };

    if (inputData.wardNo !== "All") {
      baseParams.wardId = inputData.wardNo;
    }

    const requestData = {
      reportIdentifier: "water_CurrentandArrearCollection",
      params: baseParams,
    };

    axios
      .post(`${BACKEND_BASE_URL}/reports`, requestData)
      .then((response) => {
        console.log(response.data.data);
        if (response.data.data.length == 0) {
          toast.error("No records found", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          const mergedData = {};

          response.data.data[0]
            .concat(response.data.data[1])
            .forEach((item) => {
              const wardId = item.ward_id;
              if (!mergedData[wardId]) {
                mergedData[wardId] = { ward_id: wardId };
              }

              // Merge the properties from both arrays
              Object.assign(mergedData[wardId], item);
            });

          // Convert the dictionary back into an array
          const mergedArray = Object.values(mergedData);

          setArrearandCurrentCollection(mergedArray);
          setIsLoading(false);
        }
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
    <>
      <ToastContainer autoClose={2000} />
      <div className="m-4 mt-4 rounded-none border border-gray-500 bg-white px-0 pb-4 pt-0 lg:max-w-full">
        <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
          <h2 className="text-center text-sm font-semibold text-white">
            Arrear and Current Collection Report
          </h2>
        </nav>
        <form>
          <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex">
            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
              <label
                className="mb-2 block text-xs font-bold text-gray-700"
                htmlFor="password"
              >
                Date From
                <p className="contents text-sm font-bold text-red-600">*</p>
              </label>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    id="fromDate"
                    inputFormat="YYYY-MM-DD"
                    onChange={(date) => {
                      const formattedDate = formatDate(date);
                      setInputData({ ...inputData, fromDate: formattedDate });
                    }}
                    value={
                      inputData.fromDate !== ""
                        ? inputData.fromDate
                        : "YYYY-MM-DD"
                    }
                    renderInput={(params) => <TextField {...params} />}
                    disableFuture={true}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
              <label
                className="mb-2 block text-xs font-bold text-gray-700"
                htmlFor="password"
              >
                Date To
                <p className="contents text-sm font-bold text-red-600">*</p>
              </label>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    id="toDate"
                    inputFormat="YYYY-MM-DD"
                    onChange={(date) => {
                      const formattedDate = formatDate(date);
                      setInputData({ ...inputData, toDate: formattedDate });
                    }}
                    value={
                      inputData.toDate !== "" ? inputData.toDate : "YYYY-MM-DD"
                    }
                    renderInput={(params) => <TextField {...params} />}
                    disableFuture={true}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
          </div>
          <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex">
            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
              <label
                className="mb-2 block text-xs font-bold text-gray-700"
                htmlFor="password"
              >
                Ward No.
              </label>
              <Select
                name="wardNo"
                onChange={(value) => {
                  const selectedWard = JSON.parse(value);
                  setInputData({
                    ...inputData,
                    wardNo: selectedWard.id,
                  });
                }}
                label="select"
                className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
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

            <div className="mb-0 ml-2 mr-0 mt-8 min-w-fit max-w-fit">
              <button
                type="button"
                onClick={() => {
                  console.log(inputData);
                  if (
                    inputData.fromDate != "" &&
                    inputData.toDate != "" &&
                    inputData.wardNo != ""
                  ) {
                    SearchData();
                  }
                }}
                className={`mb-4 ml-2 mr-2 h-8 w-28 transform rounded-md bg-green-400
                     px-4 py-1 text-xs font-bold tracking-wide 
                     text-white transition-colors duration-200 hover:bg-green-700 
                     focus:bg-green-400 focus:outline-none`}
              >
                Search
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="m-auto h-16 w-16">
              <ColorRing
                visible={true}
                height="40"
                width="40"
                colors={["#2fa158", "#2fa158", "#2fa158", "#2fa158", "#2fa158"]}
              />
            </div>
          ) : null}
        </form>
        {isLoading ? null : !isLoading &&
          arrearandCurrentCollection.length > 0 ? (
          <div className="mb-12 border border-gray-500 text-center">
            <table className="mb-10 min-w-full">
              <thead className="bg-gray-50"></thead>
              <tbody>
                <tr className="">
                  <td className="whitespace-normal px-4 py-2 text-center  text-sm font-semibold text-blue-900">
                    BHILAI MUNICIPAL CORPORATION
                  </td>
                </tr>
                <tr className="">
                  <td className="whitespace-normal px-4 py-2 text-center text-sm font-bold text-green-700">
                    Arrear and Current Collection Report from{" "}
                    {inputData.fromDate} to {inputData.toDate}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* <div className="flex justify-evenly py-6">
              <p>Total Collection : {currentCollection}</p>
              <p>Total Bounce : {penaltyAmount}</p>
              <p>Net Collection : {totalCollection}</p>
            </div> */}

            <BankReconciliationTable
              tableHeadings={tableHeadings}
              tableRows={arrearandCurrentCollection}
            />
            <div className="justify-center lg:flex">
              <ExportToExcel
                btnText={"Export to excel"}
                excelData={arrearandCurrentCollection}
                filaName={`Team wise collection report`}
              />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ArrearandCurrentCollection;
