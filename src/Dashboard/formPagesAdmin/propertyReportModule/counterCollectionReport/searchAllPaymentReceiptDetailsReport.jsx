import React, { useEffect, useState } from "react";
import { Select, Tooltip, Option, Button } from "@material-tailwind/react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";
import { useMaterialTailwindController } from "@/Dashboard/context";
import {
  convertDateToAPIFormat,
  convertNewDateToAPIFormat,
} from "@/utils/commonUtils";
import { getCookieByName } from "@/utils/RequireAuth";
import {
  ColorRingCustom,
  ExportToExcel,
  NotFoundErrorMessageCustom,
} from "@/utils/commonComponents";
import {
  NO_DATA_FOUND,
  SOMETHING_WENT_WRONG,
  SUDA_TOKEN,
} from "@/utils/appConstants";

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL;

function SearchAllPaymentReceiptDetailsReport({ showModal, currModal }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { allUserDetailsInputFromAPI, safAllInputFromAPI } = controller;

  const [searchQueryObj, setSearchQueryObj] = useState({
    date_from: "",
    date_to: "",
    user_id: "",
    ward_id: "",
    payment_mode: "",
  });

  const modeOfPayment = [
    {
      id: 0,
      mode_of_payment: "All",
      status: 1,
    },
    {
      id: 1,
      mode_of_payment: "Cash",
      status: 1,
    },
    {
      id: 2,
      mode_of_payment: "Cheque",
      status: 1,
    },
    {
      id: 3,
      mode_of_payment: "DD",
      status: 1,
    },
    {
      id: 4,
      mode_of_payment: "Card",
      status: 1,
    },
    {
      id: 5,
      mode_of_payment: "NEFT",
      status: 1,
    },
    {
      id: 6,
      mode_of_payment: "RTGS",
      status: 1,
    },
  ];

  const [dateObjectsToDisplay, setDateObjectsToDisplay] = useState({
    date_from: "",
    date_to: "",
  });
  const [counterCollectionReportObj, setCounterCollectionReportObj] =
    useState(null);
  const [
    isCounterCollectionReportObjLoading,
    setIsCounterCollectionReportObjLoading,
  ] = useState(null);
  const [
    isCounterCollectionReportObjLoaded,
    setIsCounterCollectionReportObjLoaded, 
  ] = useState(null);


  const [totalCollectionAmount, setTotalCollectionAmount] = useState("");
  const [dataForExport, setDataForExport] = useState([]);

  useEffect(()=>{
    console.log(counterCollectionReportObj,"data") 
  },[counterCollectionReportObj])

  const handleSearchQueryChange = (event, id) => {
    console.log(event);
    const eventId = event?.target?.id;
    const eventValue = event?.target?.value;
    const eventStr = event + "";
    console.log(event);
    if (eventId) {
    } else if (eventStr.includes("mode_of_payment")) {
      setSearchQueryObj((prevState) => {
        let eventObj = JSON.parse(event);
        return { ...prevState, payment_mode: eventObj.mode_of_payment };
      });
    } else if (eventStr.includes("ward")) {
      setSearchQueryObj((prevState) => {
        let eventObj = JSON.parse(event);
        return { ...prevState, ward_id: eventObj.id };
      });
    } else if (eventStr.includes("user")) {
      setSearchQueryObj((prevState) => {
        let eventObj = JSON.parse(event);
        return { ...prevState, user_id: eventObj.user_id };
      });
    } else if (id.includes("date_from")) {
      setSearchQueryObj((prevState) => {
        return { ...prevState, date_from: convertNewDateToAPIFormat(event.$d) };
      });
      setDateObjectsToDisplay((prevState) => {
        return { ...prevState, date_from: event };
      });
    } else if (id.includes("date_to")) {
      setSearchQueryObj((prevState) => {
        return { ...prevState, date_to: convertNewDateToAPIFormat(event.$d) };
      });
      setDateObjectsToDisplay((prevState) => {
        return { ...prevState, date_to: event };
      });
    }
  };

  useEffect(() => {
    console.log("searchQueryObj", searchQueryObj);
  }, [searchQueryObj]);
  const handleSearch = async () => {
    setIsCounterCollectionReportObjLoading(true);
    setIsCounterCollectionReportObjLoaded(null);
    try {
      console.log("searchQueryObj==========");
      console.log(searchQueryObj);
      const { date_from, date_to, user_id, ward_id, payment_mode } =
        searchQueryObj;
      const url = `${SUDA_API_BASE_URL}/user/getCounterCollectionReport?date_from=${date_from}&date_to=${date_to}&ward_id=${ward_id}&user_id=${user_id}&payment_mode=${payment_mode}`;
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
        console.log("responseBody =============");
        console.log(responseBody);
        setCounterCollectionReportObj(responseBody);
        setIsCounterCollectionReportObjLoaded(true);
      } else {
        setCounterCollectionReportObj(null);
        setIsCounterCollectionReportObjLoaded(false);
      }
    } catch (err) {
      console.error(err);
      setCounterCollectionReportObj(null);
      setIsCounterCollectionReportObjLoaded(false);
    } finally {
      setIsCounterCollectionReportObjLoading(false);
    }
  };

  useEffect(() => {
    if (counterCollectionReportObj?.length > 0) {
      let totalCollectionVal = 0;
      counterCollectionReportObj.forEach((item) => {
        totalCollectionVal += parseFloat(item.tot_amount);
      });
      setTotalCollectionAmount(totalCollectionVal);

      let dataForExportToExcel = counterCollectionReportObj.map(
        (item, index) => {
          return {
            "Sl No.": index + 1,
            "Property No.": item.property_no,
            "Ward No.": item.ward_name,
            "Owner Name": item.owner_name,
            "Mobile No.": item.mobile_no,
            "From Year":  item?.for_year.split("-")[0],
            "Upto Year":  item?.for_year.split("-")[1],
            "Transaction Date": item.transaction_date,
            "Transaction Number": item.transaction_no,
            "Mode Of Payment": item.payment_mode,
            "Cheque/DD No./APPR Code": item.cheque_dd_aprcode === "" ? 'NA' : item.cheque_dd_aprcode,
            "Bank Name": item.bank_name  === "" ? 'NA' :  item.bank_name,
            "Branch Name": item.branch_name  === "" ? 'NA' : item.branch_name ,
            "Tax Collector": item.tax_collector,
          };
        }
      );
      setDataForExport(dataForExportToExcel);
    }
  }, [counterCollectionReportObj]);

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

  return showModal == true ? (
    <>
      <div className="relative mb-10 mt-10 flex min-h-screen flex-col justify-center overflow-hidden">
        <div className="m-auto min-h-screen w-full rounded-md  bg-white px-0 pb-4 pt-0 lg:max-w-full">
          <form className="mt-4">
            <div className="m-4 mt-4 rounded-md  bg-white px-0 pb-4 pt-0 lg:max-w-full">
              <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
                <h2 className="text-center text-sm font-semibold text-white">
                  Counter Collection Report
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
                        inputFormat="MM/DD/YYYY"
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
                        inputFormat="MM/DD/YYYY"
                        renderInput={(params) => <TextField {...params} />}
                        disableFuture={true}
                        value={dateObjectsToDisplay?.date_to}
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
                    <p className="contents text-xs font-bold text-red-600">*</p>
                  </label>
                  <Select
                    onChange={handleSearchQueryChange}
                    label="select"
                    color="red"
                    className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900 border-red-800"
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
                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                  <label
                    className="mb-2 block text-xs font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Operator Name
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
                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                  <label
                    className="mb-2 block text-xs font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Payment Mode
                    <p className="contents text-sm font-bold text-red-600">*</p>
                  </label>

                  <Select
                    onChange={handleSearchQueryChange}
                    name="paymentMode"
                    label="select"
                    color="red"
                    className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900 border-red-700
                        "
                  >
                    {modeOfPayment.length > 0 ? (
                      modeOfPayment.map((item) => {
                        const { id, mode_of_payment, status } = item;
                        return (
                          <Option
                            key={id}
                            value={JSON.stringify(item)}
                          >{`${mode_of_payment}`}</Option>
                        );
                      })
                    ) : (
                      <Option>Loading...</Option>
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
            {isCounterCollectionReportObjLoading == true ? (
              <ColorRingCustom />
            ) : null}
            {isCounterCollectionReportObjLoaded == false ? (
              <NotFoundErrorMessageCustom
                message={SOMETHING_WENT_WRONG}
                text_size={`sm`}
              />
            ) : null}
            {counterCollectionReportObj?.length == 0 &&
            isCounterCollectionReportObjLoaded == true ? (
              <NotFoundErrorMessageCustom
                message={NO_DATA_FOUND}
                text_size={`sm`}
              />
            ) : null}

            {counterCollectionReportObj?.length > 0 &&
            isCounterCollectionReportObjLoaded == true ? (
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
                                  Counter Collection Report from{" "}
                                  {`${searchQueryObj?.date_from + ""}`} to{" "}
                                  {searchQueryObj?.date_to}
                                </td>
                              </tr>
                              <tr className="">
                                <td className="whitespace-normal px-4 py-2 text-center text-sm font-bold font-semibold text-green-700">
                                  Net Collection : {totalCollectionAmount}
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
                                  Prop. No.
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
                                  owner Name
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Mob No.
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  From Year
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
                                  Trans. date
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Trans. No.
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Mode
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Cheque/DD No./APR Code
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Bank
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Branch/Trans. Id
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Amount
                                </th>
                                
                                {/* <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Prop. Tax Curr.
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Prop. Tax Arr.
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Composite Tax Curr.
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Composite Tax Arr.
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Education Cess Curr.
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Education Cess Arr.
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Diff. Amnt. Curr.
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Diff. Amnt. Arr.
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Penalty Amnt.
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Penalty Charge
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Rain Water Harvest Charge
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Form Fee
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Discount
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Adj. Adjust
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Total Amnt.
                                </th> */}
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Tax Collector
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {counterCollectionReportObj?.map(
                                (item, index) => {
                                  return (
                                    <tr key={index} className="">
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {index + 1}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                        {item?.property_no}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.ward_name}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.owner_name}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.mobile_no}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.for_year.split("-")[0]}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                        {item?.for_year.split("-")[1]}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.transaction_date}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.transaction_no}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.payment_mode}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.cheque_dd_aprcode === ""
                                          ? "NA"
                                          : item?.cheque_dd_aprcode}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                        {item?.bank_name === ""
                                          ? "NA"
                                          : item?.bank_name}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.branch_name === ""
                                          ? "NA"
                                          : item?.branch_name}
                                      </td>
                                      {/*<td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.tot_amount}
                                      </td>
                                      
                                       <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.property_tax}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.aproperty_tax}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                        {item?.composite_tax}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.acomposite_tax}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.education_cess}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.aeducation_cess}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        Dummy
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                        Dummy
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.penalty}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.penal_charge}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.rain_harvest_charge}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.form_fee}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                        {item?.discount}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.adv_adjust}
                                      </td> */}
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.tot_amount}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {item?.tax_collector}
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
                    filaName={`CounterCollectionReport-From-${searchQueryObj.date_from}-To-${searchQueryObj.date_to}`}
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

export default SearchAllPaymentReceiptDetailsReport;
