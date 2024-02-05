import BankReconciliationTable from "@/Dashboard/resusables/BankReconciliationTable";
import React, { useState } from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, Option, Select } from "@material-tailwind/react";
import { TextField } from "@mui/material";
import { useMaterialTailwindController } from "../../../Dashboard/context/index";
import { ExportToExcel } from "@/utils/commonComponents";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const tableHeadings = [
  "Sl No.",
  "Collector Name",
  "Total Collections",
  "Total Consumer",
  "User Type",
];

const MainPageUpdateWaterTeamWiseCollectionSumary = () => {
  const [teamWiseCollectionData, setTeamWiseCollectionData] = useState([]);
  const [totalConsumers, setTotalConsumers] = useState(0);
  const [totalCollections, setTotalCollections] = useState(0);
  const [controller] = useMaterialTailwindController();
  const { allUserDetailsInputFromAPI } = controller;

  const loading = !allUserDetailsInputFromAPI;

  const operatorDetailsOptions = [
    { id: "All", employee_name: "All", user_name: "All", designation: "All" }, // Adding the "All" option
    ...(allUserDetailsInputFromAPI?.length > 0
      ? allUserDetailsInputFromAPI.map((item) => {
          const { id, employee_name, user_name, designation } = item;
          return { id, employee_name, user_name, designation };
        })
      : []),
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [inputData, setInputData] = useState({
    fromDate: "",
    toDate: "",
    userId: "",
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

  function getUserTypeDescription(userType) {
    if (userType === "TC") {
      return "Tax Collector";
    } else if (userType === "TL") {
      return "Team Leader";
    } else if (userType === "PM") {
      return "Project Manager";
    } else if (userType === "CO") {
      return "Circle Officer/Manager";
    } else if (userType === "BOT") {
      return "Back Office Executive";
    } else if (userType === "AM") {
      return "Area Manager";
    } else if (userType === "J") {
      return "Old JSK Short Name";
    } else if (userType === "BO") {
      return "Old Operator Short Name";
    } else {
      return userType; // Default case, return the input user_type as is.
    }
  }

  async function SearchData() {
    setIsLoading(true);

    const baseParams = {
      fromDate: inputData.fromDate,
      toDate: inputData.toDate,
    };

    if (inputData.userId !== "All") {
      baseParams.userId = inputData.userId;
    }

    const requestData = {
      reportIdentifier: "water_TeamwiseCollectionSummary",
      params: baseParams,
    };

    console.log(requestData);

    axios
      .post(`${BACKEND_BASE_URL}/reports`, requestData)
      .then((response) => {
        let col = 0;
        let con = 0;
        console.log(response.data.data[0]);
        if (response.data.data[0].length == 0) {
          toast.error("No records found", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          let restructeredData = [];
          response.data.data[0].map((item, index) => {
            con += parseFloat(item.total_consumer);
            col += parseFloat(item.total_collection);
            restructeredData.push({
              sl_no: index + 1,
              name: item.name,
              total_collection: item.total_collection,
              total_consumer: item.total_consumer,
              user_type: getUserTypeDescription(item.user_type),
            });
          });
          setTeamWiseCollectionData(restructeredData);
          setTotalConsumers(con);
          setTotalCollections(col);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }

  return (
    <div>
      <ToastContainer autoClose={2000} />
      <div className="my-8 shadow">
        <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
          <h2 className="text-center text-sm font-semibold text-white">
            Team Wise Collection Summary
          </h2>
        </nav>
        <div className="flex-wrap items-center justify-center gap-12 p-4 md:block lg:flex">
          <div className="flex items-center gap-4">
            <p className="mb-2 block text-xs font-bold text-gray-700">
              Date from{" "}
              <sapn className="contents text-sm font-bold text-red-600">*</sapn>
            </p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                id="fromDate"
                inputFormat="YYYY-MM-DD"
                onChange={(date) => {
                  const formattedDate = formatDate(date);
                  setInputData({ ...inputData, fromDate: formattedDate });
                }}
                value={
                  inputData.fromDate !== "" ? inputData.fromDate : "YYYY-MM-DD"
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="flex items-center gap-4">
            <p className="mb-2 block text-xs font-bold text-gray-700">
              Date to{" "}
              <sapn className="contents text-sm font-bold text-red-600">*</sapn>
            </p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
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
              />
            </LocalizationProvider>
          </div>
          <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
            <label
              className="mb-2 block text-xs font-bold text-gray-700"
              htmlFor="password"
            >
              Operator Name
            </label>
            <Select
              name="operatorName"
              onChange={(value) => {
                const selectedWard = JSON.parse(value);
                setInputData({
                  ...inputData,
                  userId: selectedWard.id,
                });
              }}
              label="select"
              className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
            >
              {loading ? (
                <Option>Loading...</Option>
              ) : (
                operatorDetailsOptions.map((item) => (
                  <Option key={item.id} value={JSON.stringify(item)}>
                    {item.employee_name === "All"
                      ? "All"
                      : `${item.employee_name} - ${item.user_name} - ${item.designation}`}
                  </Option>
                ))
              )}
            </Select>
          </div>
        </div>
        <div className="flex justify-center p-4">
          <Button
            onClick={() => {
              console.log(inputData);
              if (
                inputData.fromDate != "" &&
                inputData.toDate != "" &&
                inputData.userId != ""
              ) {
                SearchData();
              }
            }}
            className="w-32"
          >
            Search
          </Button>
        </div>
      </div>

      {isLoading ? (
        <p className="flex justify-center pt-20 text-2xl">Loading...</p>
      ) : !isLoading && teamWiseCollectionData.length > 0 ? (
        <div className="mb-12 border border-gray-500 text-center">
          <div className="whitespace-normal bg-gray-200 p-2 text-center text-sm font-bold text-blue-500">
            Team wise Collection Summary from {inputData.fromDate} to{" "}
            {inputData.toDate}
          </div>
          <div className="items-center justify-center gap-8 p-2 md:block lg:flex">
            <p className="whitespace-normal text-sm font-bold text-green-500">
              Total Consumer: {totalConsumers}
            </p>
            <p className="whitespace-normal text-sm font-bold text-green-500">
              Total Collection: {totalCollections}
            </p>
          </div>
          <BankReconciliationTable
            tableHeadings={tableHeadings}
            tableRows={teamWiseCollectionData}
          />
          <div className="justify-center lg:flex">
            <ExportToExcel
              btnText={"Export to excel"}
              excelData={teamWiseCollectionData}
              filaName={`Team wise collection report`}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MainPageUpdateWaterTeamWiseCollectionSumary;
