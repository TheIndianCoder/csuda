import React, { useEffect, useState } from "react";
import { Select, Option } from "@material-tailwind/react";
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
import {
  NO_DATA_FOUND,
  SOMETHING_WENT_WRONG,
  SUDA_TOKEN,
} from "@/utils/appConstants";

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL;

function SearchWardWiseDemandReport({ showModal, currModal }) {
  const [controller] = useMaterialTailwindController();
  const { safAllInputFromAPI } = controller;

  const [isWardWiseDemandReportLoading, setIsWardWiseDemandReportLoading] =
    useState(null);
  const [isWardWiseDemandReportLoaded, setIsWardWiseDemandReportLoaded] =
    useState(null);
  const [wardWiseDemandReportDetails, setWardWiseDemandReportDetails] =
    useState(null);
  const [searchQueryObj, setSearchQueryObj] = useState({
    date_from: "",
    date_to: "",
    ward_id: "",
  });
  const [dateObjectsToDisplay, setDateObjectsToDisplay] = useState({
    date_from: "",
    date_to: "",
  });
  const [totalDemandAmount, setTotalDemandAmount] = useState("");
  const [dataForExport, setDataForExport] = useState([]);

  const handleSearchQueryChange = (event, id) => {
    const eventId = event?.target?.id;
    const eventValue = event?.target?.value;
    const eventStr = event + "";
    // console.log(event)
    if (eventId) {
    } else if (eventStr.includes("ward")) {
      setSearchQueryObj((prevState) => {
        let eventObj = JSON.parse(event);
        return { ...prevState, ward_id: eventObj.id };
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
    setIsWardWiseDemandReportLoading(true);
    try {
      const { date_from, date_to, ward_id } = searchQueryObj;

      const url = `${SUDA_API_BASE_URL}/user/getDemandReportByWard?date_from=${date_from}&date_to=${date_to}&ward_id=${ward_id}`;

      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookieByName(SUDA_TOKEN)}`,
        },
      };
      let response = null,
        responseBody = null;
      response = await fetch(url, requestOptions);
      responseBody = await response.json();

      if (response?.status == "200") {
        setWardWiseDemandReportDetails(responseBody);
        setIsWardWiseDemandReportLoaded(true);
      } else {
        setWardWiseDemandReportDetails(null);
        setIsWardWiseDemandReportLoaded(false);
      }
    } catch (err) {
      console.error(err);
      setIsWardWiseDemandReportLoaded(false);
    } finally {
      setIsWardWiseDemandReportLoading(false);
    }
  };

  useEffect(() => {
    if (wardWiseDemandReportDetails?.length > 0) {
      let totalDemandVal = 0;
      wardWiseDemandReportDetails.forEach((item) => {
        totalDemandVal += parseFloat(item.demand_amount);
      });
      setTotalDemandAmount(totalDemandVal);

      let dataForExportToExcel = wardWiseDemandReportDetails.map(
        (item, index) => {
          return {
            "Sl No.": index + 1,
            "Ward No.": item.ward_name,
            "Property No.": item.property_no,
            "Owner Name": item.owner_name,
            "Guardian Name": item.guardian_name,
            "Mobile No.": item.mobile_no,
            Address: item.owner_address,
            "From Year": item.fy_name,
            "To Year": item.fy_name,
            Penalty: item.penalty,
            "Demand Amount": item.demand_amount,
            "Total Amount": item.total_amount,
          };
        }
      );
      setDataForExport(dataForExportToExcel);
    }
  }, [wardWiseDemandReportDetails]);

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

  return showModal == true ? (
    <>
      <div className="relative mb-10 mt-10 flex min-h-screen flex-col justify-center overflow-hidden">
        <div className="m-auto min-h-screen w-full rounded-none border border-gray-500 bg-white px-0 pb-4 pt-0 lg:max-w-full">
          <form className="mt-4">
            <div className="m-4 mt-4 rounded-md  bg-white px-0 pb-4 pt-0 lg:max-w-full">
              <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-md py-1 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
                <h2 className="text-center text-sm font-semibold text-white">
                  Ward Wise Demand Report
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
                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                  <label
                    className="mb-2 block text-xs font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Ward No.
                    <p className="contents text-xs font-bold text-red-600">*</p>
                  </label>
                  <Select
                    onChange={handleSearchQueryChange}
                    label="select"
                    color="red"
                    className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900 border border-red-700"
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
                    onClick={handleSearch}
                    className="mb-4 ml-2 mr-2 h-8 w-28 transform rounded-md bg-green-400 px-4 py-1 text-xs font-bold tracking-wide text-white transition-colors duration-200 hover:bg-green-700 focus:bg-green-400 focus:outline-none"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            {isWardWiseDemandReportLoading == true ? <ColorRingCustom /> : null}
            {isWardWiseDemandReportLoaded == false ? (
              <NotFoundErrorMessageCustom
                message={SOMETHING_WENT_WRONG}
                text_size={`sm`}
              />
            ) : null}
            {wardWiseDemandReportDetails?.length == 0 &&
            isWardWiseDemandReportLoaded == true ? (
              <NotFoundErrorMessageCustom
                message={NO_DATA_FOUND}
                text_size={`sm`}
              />
            ) : null}

            {wardWiseDemandReportDetails?.length > 0 &&
            isWardWiseDemandReportLoaded == true ? (
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
                                <td className="whitespace-normal px-4 py-2 text-center text-sm font-bold text-blue-900">
                                  Ward Wise Demand Report
                                </td>
                              </tr>
                              <tr className="">
                                <td className="whitespace-normal px-4 py-2 text-center text-xs font-bold text-green-700">
                                  Total Demand : {totalDemandAmount}
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
                      <div className="3xl:w-full inline-block p-0 align-middle">
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
                                  Ward No.
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Property No.
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Owner Name
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Guardian Name
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  mobile No.
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Address
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  From year
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  UpTo Year
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Penalty
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Demand Amount
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Total Amount
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {wardWiseDemandReportDetails.map(
                                (item, index) => {
                                  return (
                                    <tr key={index} className="">
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                        {index + 1}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                        {item?.ward_name}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                        {item?.property_no}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                        {item?.owner_name}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                        {item?.guardian_name}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                        {item?.mobile_no}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                        {item?.owner_address}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                        {item?.fy_name}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                        {item?.fy_name}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                        {item?.penalty}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                        {item?.demand_amount}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                        {item?.total_amount}
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

                <ExportToExcel
                  excelData={dataForExport}
                  filaName={`WardWiseDemandReport-From-${searchQueryObj.date_from}-To-${searchQueryObj.date_to}`}
                  btnText={`Export to Excel`}
                />
              </>
            ) : null}
          </form>
        </div>
      </div>
    </>
  ) : null;
}

export default SearchWardWiseDemandReport;
