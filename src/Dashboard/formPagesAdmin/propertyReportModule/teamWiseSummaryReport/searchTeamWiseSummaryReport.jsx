import React, { useEffect, useState } from "react";
import { Select, Tooltip, Option, Button } from "@material-tailwind/react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";
import { useMaterialTailwindController } from "@/Dashboard/context";
import {
  ColorRingCustom,
  ExportToExcel,
  NotFoundErrorMessageCustom,
} from "@/utils/commonComponents";
import { convertDateToAPIFormat } from "@/utils/commonUtils";
import { getCookieByName } from "@/utils/RequireAuth";
import { NO_DATA_FOUND, SOMETHING_WENT_WRONG } from "@/utils/appConstants";

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL;

function SearchTeamWiseSummaryReport({ showModal, currModal }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { allUserDetailsInputFromAPI } = controller;

  const [searchQueryObj, setSearchQueryObj] = useState({
    date_from: "",
    date_to: "",
    user_id: "",
  });
  const [dateObjectsToDisplay, setDateObjectsToDisplay] = useState({
    date_from: "",
    date_to: "",
  });
  const [isTeamWiseSummaryReportLoaded, setIsTeamWiseSummaryReportLoaded] =
    useState(null);
  const [isTeamWiseSummaryReportLoading, setIsTeamWiseSummaryReportLoading] =
    useState(null);
  const [teamWiseSummaryReportDetails, setTeamWiseSummaryReportDetails] =
    useState(null);
  const [dataForExport, setDataForExport] = useState([]);
  const [stats, setStats] = useState({
    totalConsumer: "",
    totalCollection: "",
  });

  const handleSearchQueryChange = (event, id) => {
    console.log("Event: ", event);
    const eventId = event?.target?.id;
    const eventStr = event + "";
    console.log("Event String: ", eventStr);
    if (eventId) {
    } else if (eventStr.includes("user")) {
      setSearchQueryObj((prevState) => {
        let eventObj = JSON.parse(event);
        return { ...prevState, user_id: eventObj.user_id };
      });
    } else if (id.includes("date_from")) {
      setSearchQueryObj((prevState) => {
        return { ...prevState, date_from: convertDateToAPIFormat(event.$d) };
      });
      setDateObjectsToDisplay((prevState) => {
        return { ...prevState, date_from: event };
      });
    } else if (id.includes("date_to")) {
      setSearchQueryObj((prevState) => {
        return { ...prevState, date_to: convertDateToAPIFormat(event.$d) };
      });
      setDateObjectsToDisplay((prevState) => {
        return { ...prevState, date_to: event };
      });
    }
  };

  const handleSearch = async () => {
    setIsTeamWiseSummaryReportLoading(true);
    try {
      console.log("searchQueryObj==========");
      console.log(searchQueryObj);
      const { date_from, date_to, user_id } = searchQueryObj;
      const url = `${SUDA_API_BASE_URL}/user/getCollectionByTeamWise?date_from=${date_from}&date_to=${date_to}&user_id=${user_id}`;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
        },
      };
      let response = null,
        responseBody = null;
      response = await fetch(url, requestOptions);
      responseBody = await response.json();

      if (response?.status == "200") {
        console.log("responseBody =============");
        console.log(responseBody);
        setTeamWiseSummaryReportDetails(responseBody);
        setIsTeamWiseSummaryReportLoaded(true);
      } else {
        setTeamWiseSummaryReportDetails(null);
        setIsTeamWiseSummaryReportLoaded(false);
      }
    } catch (err) {
      console.error(err);
      setIsTeamWiseSummaryReportLoaded(false);
    } finally {
      setIsTeamWiseSummaryReportLoading(false);
    }
  };

  useEffect(() => {
    if (teamWiseSummaryReportDetails?.length > 0) {
      let totalConsumerVal = 0,
        totalCollectionVal = 0;
      teamWiseSummaryReportDetails.forEach((item) => {
        totalConsumerVal += parseInt(item.property_count);
        totalCollectionVal += parseFloat(item.total_collection);
      });
      setStats((prevState) => {
        return {
          totalConsumer: totalConsumerVal,
          totalCollection: totalCollectionVal,
        };
      });
      let dataForExportToExcel = teamWiseSummaryReportDetails.map(
        (item, index) => {
          return {
            "Sl. No.": index + 1,
            "Collector Name": item.collector_name,
            "User Type": item.user_type,
            "Total Property": item.property_count,
            Cash: item.cashTotal,
            Card: item.cardTotal,
            Cheque: item.chequeTotal,
            DD: item.ddtotal,
            RTGS: item.rtgstotal,
            NEFT: item.nefttotal,
            "Total Collection": item.total_collection,
          };
        }
      );
      setDataForExport(dataForExportToExcel);
    }
  }, [teamWiseSummaryReportDetails]);

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

  return showModal == true ? (
    <>
      <div className="relative mb-10 mt-10 flex min-h-screen flex-col justify-center overflow-hidden">
        <div className="m-auto min-h-screen w-full rounded-md  bg-white px-0 pb-4 pt-0 lg:max-w-full">
          <form className="mt-4">
            <div className="m-4 mt-4 rounded-md  bg-white px-0 pb-4 pt-0 lg:max-w-full">
              <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-md py-1 pl-2 pr-0 ring-1 ring-red-600 h-10 bg-orange-800">
                <h2 className="text-center text-sm font-semibold text-white">
                  Team Wise Summary Report
                </h2>
              </nav>
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
                        // label="Date desktop"
                        onChange={(e) =>
                          handleSearchQueryChange(e, "date_from")
                        }
                        id="date_from"
                        inputFormat="YYYY-MM-DD"
                        renderInput={(params) => <TextField {...params} />}
                        disableFuture={true}
                        value={dateObjectsToDisplay?.date_from}
                      />
                    </Stack>
                  </LocalizationProvider>
                </div>
                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                  <label
                    className="mb-2 block text-xs font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Date Upto
                    <p className="contents text-sm font-bold text-red-600">*</p>
                  </label>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                      <DesktopDatePicker
                        // label="Date desktop"
                        onChange={(e) => handleSearchQueryChange(e, "date_to")}
                        id="date_to"
                        inputFormat="YYYY-MM-DD"
                        renderInput={(params) => <TextField {...params} />}
                        disableFuture={true}
                        value={dateObjectsToDisplay?.date_to}
                      />
                    </Stack>
                  </LocalizationProvider>
                </div>
              </div>
              <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex">
                {/* <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                  <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                    Circle Officer<p className='contents text-red-600 text-xs font-bold'>*</p>
                  </label>
                  <Select
                    label="select" className="pl-2 pr-3 py-2 font-bold text-xs text-gray-900">
                    {
                      allUserDetailsInputFromAPI?.length > 0 ?
                        (allUserDetailsInputFromAPI.map((item) => {
                          const { id, user_id, employee_name, user_name, designation, is_active } = item
                          return <Option key={id} value={JSON.stringify(item)}>{`${employee_name} - ${user_name} - ${designation}`}</Option>
                        })) : (<Option>Loading...</Option>)
                    }
                  </Select>

                </div> */}
                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                  <label
                    className="mb-2 block text-xs font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Tax Collector
                    <p className="contents text-xs font-bold text-red-600">*</p>
                  </label>
                  <Select
                    onChange={(e) => {
                      handleSearchQueryChange(e, "user");
                    }}
                    label="select"
                    color="red"
                    className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900 border-red-500"
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

                <div className="mb-0 ml-2 mr-0 mt-8 min-w-fit max-w-fit">
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="mb-4 ml-2 mr-2 h-8 w-28 transform rounded-md bg-green-400 px-4 py-1 text-xs font-bold tracking-wide text-white transition-colors duration-200 hover:bg-green-700 focus:bg-green-400 focus:outline-none"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            {isTeamWiseSummaryReportLoading == true ? (
              <ColorRingCustom />
            ) : null}
            {isTeamWiseSummaryReportLoaded == false ? (
              <NotFoundErrorMessageCustom
                message={SOMETHING_WENT_WRONG}
                text_size={`sm`}
              />
            ) : null}
            {teamWiseSummaryReportDetails?.length == 0 &&
            isTeamWiseSummaryReportLoaded == true ? (
              <NotFoundErrorMessageCustom
                message={NO_DATA_FOUND}
                text_size={`sm`}
              />
            ) : null}

            {teamWiseSummaryReportDetails?.length > 0 &&
            isTeamWiseSummaryReportLoaded == true ? (
              <>
                <div className="m-4 rounded-none border border-gray-500 bg-white px-0  pb-0 pt-0 lg:max-w-full">
                  <div className="flex flex-col">
                    <div className="overflow-x-auto">
                      <div className="inline-block p-2.5 align-middle lg:w-full">
                        <div className="overflow-hidden">
                          <table className="min-w-full">
                            <thead className="bg-gray-50"></thead>
                            <tbody>
                              <tr className="">
                                <td className="whitespace-normal px-4 py-2 text-center text-sm font-bold font-semibold text-blue-900">
                                RAJNANDGAON MUNICIPAL CORPORATION
                                </td>
                              </tr>
                              <tr className="">
                                <td className="whitespace-normal px-4 py-2 text-center text-sm font-bold font-semibold text-gray-900">
                                  Team Wise Summary Report
                                </td>
                              </tr>
                              <tr className="">
                                <td className="whitespace-normal px-4 py-2 text-center text-sm font-bold font-semibold text-green-700">
                                  Total Consumer : {stats?.totalConsumer}
                                </td>
                              </tr>
                              <tr className="">
                                <td className="whitespace-normal px-4 py-2 text-center text-sm font-bold font-semibold text-green-700">
                                  Total Collection : {stats?.totalCollection}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="m-4 rounded-none bg-white px-0 pb-0 pt-0 lg:max-w-full">
                  <div className="mb-1 flex flex-col">
                    <div className="overflow-x-auto">
                      <div className="inline-block p-0 align-middle 2xl:w-full">
                        <div className="overflow-hidden">
                          <table className="min-w-full">
                            <thead className="preview-payment-form-child-table-laypout">
                              <tr>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Sl. No.
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Tax Collector Name
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  User Type
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Total Property
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Cash
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Card
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Cheque
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  DD
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  RTGS
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  NEFT
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Total Collection
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {teamWiseSummaryReportDetails.map(
                                (item, index) => {
                                  return (
                                    <tr key={index} className="">
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {index + 1}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                        {item?.collector_name}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.user_type}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.property_count}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.cashTotal}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.cardTotal}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.chequeTotal}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.ddtotal}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.rtgstotal}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.nefttotal}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.total_collection}
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="m-auto min-w-fit max-w-fit items-center md:flex-1 lg:flex">
                  {/* <div className="mb-0 ml-2 mr-0 mt-8 min-w-fit max-w-fit">
                <button type='button'
                  className="w-28 h-8 px-4 py-1 mr-2 ml-2 mb-4 tracking-wide text-white text-sm font-bold transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
                  Print
                </button>
              </div> */}
                  <ExportToExcel
                    excelData={dataForExport}
                    filaName={`TeamWiseSummaryReport-From-${searchQueryObj.date_from}-To-${searchQueryObj.date_to}`}
                    btnText={`Export to Excel`}
                  />
                </div>
              </>
            ) : null}
          </form>
        </div>
      </div>
    </>
  ) : null;
}

export default SearchTeamWiseSummaryReport;
