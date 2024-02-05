import React, { useState } from "react";
import { Button, Option, Select } from "@material-tailwind/react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { useMaterialTailwindController } from "../../../../Dashboard/context/index";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import moment from "moment";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const index = () => {
  const [controller, dispatch] = useMaterialTailwindController();
  const { allUserDetailsInputFromAPI, safAllInputFromAPI } = controller;
  const [isLoading, setIsLoading] = useState(false);
  const [dailyAssessmentReportData, setDailyAssessmentReportData] = useState(
    []
  );

  function formatDate(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    return `${year}-${month}-${day}`;
  }

  const [inputData, setInputData] = useState({
    fromDate: "",
    toDate: "",
    wardId: "",
    userId: "",
    entryType: "",
  });

  const assessmentType = ["New Assessment", "Re Assessment", "All"];

  async function dailyAssessmentReport() {
    setIsLoading(true);

    const baseParams = {
      fromDate: inputData.fromDate,
      toDate: inputData.toDate,
    };

    if (inputData.entryType !== "All") {
      baseParams.entryType = inputData.entryType;
    }

    if (inputData.wardId !== "All") {
      baseParams.wardId = inputData.wardId;
    }

    if (inputData.userId !== "All") {
      baseParams.userId = inputData.userId;
    }

    const requestData = {
      reportIdentifier: "public_DailyAssessment",
      params: baseParams,
    };

    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/reports`,
        requestData
      );
      const reportData = response.data.data[0];

      if (reportData.length === 0) {
        toast.error("No records found", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        setDailyAssessmentReportData(reportData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const dataLoding =
    !safAllInputFromAPI ||
    !safAllInputFromAPI.ward ||
    !allUserDetailsInputFromAPI;

  const wardOptions = [
    { id: "All", ward_name: "All" },
    ...(safAllInputFromAPI?.ward?.length > 0
      ? safAllInputFromAPI.ward.map((item) => {
          const { id, ward_name } = item;
          return { id, ward_name };
        })
      : []),
  ];

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
    <div className="my-10 flex min-h-screen flex-col overflow-hidden">
      <ToastContainer autoClose={2000} />
      <div className="w-full rounded-md  bg-white px-0 pt-0 lg:max-w-full">
        <nav className="navcustomproperty relative mb-2 flex flex-wrap justify-between rounded-none py-2 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800">
          <h2 className="text-center text-sm font-semibold text-white">
            Daily Assessment
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
                id="fromDate"
                onChange={(date) => {
                  const formattedDate = formatDate(date);
                  setInputData({ ...inputData, fromDate: formattedDate });
                }}
                renderInput={(params) => <TextField {...params} />}
                inputFormat="YYYY-MM-DD"
                disableFuture={true}
                value={
                  inputData.fromDate !== "" ? inputData.fromDate : "YYYY-MM-DD"
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
                id="toDate"
                onChange={(date) => {
                  const formattedDate = formatDate(date);
                  setInputData({ ...inputData, toDate: formattedDate });
                }}
                renderInput={(params) => <TextField {...params} />}
                inputFormat="YYYY-MM-DD"
                disableFuture={true}
                value={
                  inputData.toDate !== "" ? inputData.toDate : "YYYY-MM-DD"
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
              color="red"
              className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900 border border-red-700"
              onChange={(value) => {
                const selectedWard = JSON.parse(value);
                setInputData({
                  ...inputData,
                  wardId: selectedWard.id,
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
          <div className="px-4 py-2">
            <label className="mb-2 block text-xs font-bold text-gray-700">
              Operator Name
              <span className="contents text-sm font-bold text-red-600">*</span>
            </label>
            <Select
              name="operatorName"
              color="red"
              onChange={(value) => {
                const selectedWard = JSON.parse(value);
                setInputData({
                  ...inputData,
                  userId: selectedWard.id,
                });
              }}
              label="select"
              className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900 border border-red-700"
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
          <div className="px-4 py-2">
            <label className="mb-2 block text-xs font-bold text-gray-700">
              Assessment Type{" "}
              <span className="contents text-sm font-bold text-red-600">*</span>
            </label>
            <Select
              label="select"
              color="red"
              className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900 border border-red-700"
              onChange={(value) => {
                setInputData({
                  ...inputData,
                  entryType: value,
                });
              }}
            >
              {assessmentType?.length > 0 ? (
                assessmentType.map((item, index) => {
                  return (
                    <Option key={index} value={item}>
                      {item}
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
                inputData.fromDate != "" &&
                inputData.toDate != "" &&
                inputData.wardId != "" &&
                inputData.userId != "" &&
                inputData.entryType != ""
              ) {
                dailyAssessmentReport();
              } else {
                toast.error("Fields can't be empty", {
                  position: toast.POSITION.TOP_CENTER,
                });
              }
            }}
          >
            Search
          </Button>
        </div>
      </div>
      {isLoading ? (
        <p className="flex justify-center pt-20 text-2xl">Loading...</p>
      ) : !isLoading && dailyAssessmentReportData.length > 0 ? (
        <div className="mb-12 w-full border border-gray-500 text-center">
          <div className="mb-12 h-full overflow-auto shadow-md ">
            <table className="w-full table-auto text-left">
              <thead className="text-center text-xs">
                <tr>
                  <th>#</th>
                  <th>Ward No.</th>
                  <th>Property ID</th>
                  <th>Owner Name</th>
                  <th>Guardian Name</th>
                  <th>Address</th>
                  <th>Mobile No</th>
                  <th>Demand From</th>
                  <th>Demand To</th>
                  <th>Demand Amount</th>
                  <th>Collection From</th>
                  <th>Collection To</th>
                  <th>Collection Amount</th>
                  <th>Width of Road</th>
                  <th>Plot Area</th>
                  <th>Ass. Type</th>
                  <th>Ass. Date</th>
                  <th>Ass. By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dailyAssessmentReportData.map((item, index) => {
                  return (
                    <tr
                      className="hover:bg-gray-50 dark:hover:bg-gray-600"
                      key={index}
                    >
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {index + 1}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.ward_number}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.prop_id}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.owner_name}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.guardian_name}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.property_address}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.mobile_no}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.demand_from}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.demand_to}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.demand_amount}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.collection_from}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.collection_to}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.collection_amount}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.width_of_road}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.plot_area}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.entry_type}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {moment(item.assessment_date).format("DD-MM-YYYY")}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.tax_collector_name}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default index;
