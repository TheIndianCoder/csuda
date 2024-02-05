import BankReconciliationTable from "@/Dashboard/resusables/BankReconciliationTable";
import TeamWiseCollectionInputBox from "@/Dashboard/resusables/TeamWiseCollectionInputBox";
import { ExportToExcel } from "@/utils/commonComponents";
import React, { useState } from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, Option, Select } from "@material-tailwind/react";
import { TextField } from "@mui/material";
import {
  setAllUserDetailsInputFromAPI,
  useMaterialTailwindController,
} from "../../../../Dashboard/context/index";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const tableHeadings = [
  "Collector Name",
  "User Type",
  "Total Consumer",
  "Total Collections",
];

const MainPageUserChargesTeamWiseCollectionSummary = () => {
  const [controller, dispatch] = useMaterialTailwindController();
  const { allUserDetailsInputFromAPI, safAllInputFromAPI } = controller;
  const [isLoading, setIsLoading] = useState(false);
  const [
    userChargesTeamWiseCollectionSummary,
    setUserChargesTeamWiseCollectionSummary,
  ] = useState([]);

  const [totalConsumers, setTotalConsumers] = useState(0);
  const [totalCollections, setTotalCollections] = useState(0);
  const [inputData, setInputData] = useState({
    from_date: "",
    to_date: "",
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

  async function searchData() {
    setIsLoading(true);

    const baseParams = {
      fromDate: inputData.from_date,
      toDate: inputData.to_date,
    };

    if (inputData.userId !== "All") {
      baseParams.userId = inputData.userId;
    }

    const requestData = {
      reportIdentifier: "waste_TeamwiseCollectionSummary",
      params: baseParams,
    };

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
              collector_name: item.name,
              user_type: getUserTypeDescription(item.user_type),
              total_consumer: item.total_consumer,
              total_collection: item.total_collection,
            });
          });
          setUserChargesTeamWiseCollectionSummary(restructeredData);
          {
            response.data.data[0].map((item) => {
              con += parseFloat(item.total_consumer);
              col += parseFloat(item.total_collection);
            });
          }
          setTotalConsumers(con);
          setTotalCollections(col);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }

  const dataLoding = !allUserDetailsInputFromAPI;

  const operatorDetailsOptions = [
    {
      id: "All",
      user_id: "All",
      employee_name: "All",
      user_name: "All",
      designation: "All",
    },
    ...(allUserDetailsInputFromAPI?.length > 0
      ? allUserDetailsInputFromAPI.map((item) => {
          const { id, user_id, employee_name, user_name, designation } = item;
          return { id, user_id, employee_name, user_name, designation };
        })
      : []),
  ];

  return (
    <div>
      <ToastContainer autoClose={2000} />
      <div className="m-4 mt-4 rounded-none border border-gray-500 bg-white px-0 pb-4 pt-0 lg:max-w-full">
        <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
          <h2 className="text-center text-sm font-semibold text-white">
            Team Wise Collection Summary
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
                {dataLoding ? (
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
      ) : !isLoading && userChargesTeamWiseCollectionSummary.length > 0 ? (
        <div className="mb-12 border border-gray-500 text-center">
          <div className="whitespace-normal bg-gray-200 p-2 text-center text-sm font-bold text-blue-500">
            Team wise Collection Summary from {inputData.from_date} to{" "}
            {inputData.to_date}
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
            tableRows={userChargesTeamWiseCollectionSummary}
          />
          <div className="justify-center lg:flex">
            <ExportToExcel
              btnText={"Export to excel"}
              excelData={userChargesTeamWiseCollectionSummary}
              filaName={`Team wise collection report`}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MainPageUserChargesTeamWiseCollectionSummary;
