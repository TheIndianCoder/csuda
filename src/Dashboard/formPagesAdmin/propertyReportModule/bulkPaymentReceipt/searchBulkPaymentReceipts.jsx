import { useMaterialTailwindController } from "@/Dashboard/context";
import { Select, Tooltip, Option, Button } from "@material-tailwind/react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { convertDateToAPIFormat } from "@/utils/commonUtils";
import { getCookieByName } from "@/utils/RequireAuth";
import { SUDA_TOKEN } from "@/utils/appConstants";

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL;

function SearchBulkPaymentReceipts({
  showModal,
  currModal,
  switchOnPrevModalNOffCurrModal,
  setCurrentPage,
  currentPage,
  setBulkPaymentReceiptsObj,
  setIsBulkPaymentReceiptsObjLoading,
  setIsBulkPaymentReceiptsObjLoaded,
}) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { allUserDetailsInputFromAPI } = controller;

  const [searchQueryObj, setSearchQueryObj] = useState({
    date_from: "",
    date_to: "",
    operator_name: "",
    size: "",
  });
  const [dateObjectsToDisplay, setDateObjectsToDisplay] = useState({
    date_from: "",
    date_to: "",
  });

  const handleSearchQueryChange = (event, id) => {
    const eventId = event?.target?.id;
    const eventStr = event + "";
    console.log(event);
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
    setIsBulkPaymentReceiptsObjLoading(true);
    setIsBulkPaymentReceiptsObjLoaded(null);
    try {
      console.log("searchQueryObj==========");
      console.log(searchQueryObj);
      const { date_from, date_to, user_id } = searchQueryObj;
      const url = `${SUDA_API_BASE_URL}/user/getPaymentReceiptByTC?frm_date=${date_from}&to_date=${date_to}&user_id=${user_id}`;
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
      console.log("response response", response, responseBody);
      if (response?.status == 200) {
        console.log("responseBody =============");
        console.log(responseBody, "responseBody in");
        setBulkPaymentReceiptsObj(responseBody);
        setCurrentPage(1);
        setIsBulkPaymentReceiptsObjLoaded(true);
      } else {
        setBulkPaymentReceiptsObj([]);
        setIsBulkPaymentReceiptsObjLoaded(false);
      }
    } catch (err) {
      console.error(err);
      setBulkPaymentReceiptsObj([]);
      setIsBulkPaymentReceiptsObjLoaded(false);
    } finally {
      setIsBulkPaymentReceiptsObjLoading(false);
    }
  };

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
      <div className="relative mb-10 mt-10 flex flex-col justify-center overflow-visible">
        {/* <div className="w-full  px-0 pt-0 pb-4 m-auto bg-white rounded-none border border-gray-500 lg:max-w-full"> */}
        <form className="mt-4">
          <div className="m-0 mt-4 rounded-md  bg-white px-0 pb-4 pt-0 lg:max-w-full">
            <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-md py-1 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
              <h2 className="text-center text-sm font-semibold text-white">
                Bulk Payment Receipts
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
                      onChange={(e) => handleSearchQueryChange(e, "date_from")}
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
                  Tax Collector
                  <p className="contents text-xs font-bold text-red-600">*</p>
                </label>
                <Select
                  onChange={handleSearchQueryChange}
                  label="select"
                  color="red"
                  className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900 border-red-700"
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
            <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex">
              {/* <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Enter number of receipts to display<p className='contents text-red-600 text-xs font-bold'>*</p>
                                    </label>
                                    <input
                                        id='size'
                                        onChange={handleSearchQueryChange}
                                        className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                                        type="number" placeholder="50" />
                                </div> */}

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
        </form>
        {/* </div> */}
      </div>
    </>
  ) : null;
}

export default SearchBulkPaymentReceipts;
