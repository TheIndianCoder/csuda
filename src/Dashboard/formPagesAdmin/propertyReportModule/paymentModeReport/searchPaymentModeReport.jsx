import React, { useEffect, useState } from "react";
import { Select, Tooltip, Option, Button } from "@material-tailwind/react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";
import { useMaterialTailwindController } from "@/Dashboard/context";
import { convertDateToAPIFormat } from "@/utils/commonUtils";
import { getCookieByName } from "@/utils/RequireAuth";
import BankReconciliationTable from "@/Dashboard/resusables/BankReconciliationTable";
// import { ColorRingCustom } from '@/utils/commonComponents';
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

function SearchPaymentModeReport({ showModal, currModal }) {
  const [controller] = useMaterialTailwindController();
  const { allUserDetailsInputFromAPI, safAllInputFromAPI } = controller;

  const [paymentModeReportDetails, setPaymentModeReportDetails] =
    useState(null);
  const [bounceReportDetails, setBounceReportDetails] = useState([]);
  const [collectionDetailsObj, setCollectionDetailsObj] = useState({
    total_collection: "",
    total_transaction: "",
  });
  const [
    isPaymentModeReportDetailsLoading,
    setPaymentModeReportDetailsLoading,
  ] = useState(null);
  const [
    isPaymentModeReportDetailsLoaded,
    setIsPaymentModeReportDetailsLoaded,
  ] = useState(null);
  const [searchQueryObj, setSearchQueryObj] = useState({
    date_from: "",
    date_to: "",
    ward_id: "",
    user_id: "",
  });
  const [dateObjectsToDisplay, setDateObjectsToDisplay] = useState({
    date_from: "",
    date_to: "",
  });
  const [dataForExport, setDataForExport] = useState([]);

  // const [paymentModeReportDetails1, setPaymentModeReportDetails1] = useState(null)
  // const [paymentModeReportDetails1, setPaymentModeReportDetails1] = useState(null)

  const handleSearchQueryChange = (event, id) => {
    const eventId = event?.target?.id;
    const eventValue = event?.target?.value;
    const eventStr = event + "";
    console.log(event);
    if (eventId) {
    } else if (eventStr.includes("user")) {
      setSearchQueryObj((prevState) => {
        let eventObj = JSON.parse(event);
        return { ...prevState, user_id: eventObj.user_id };
      });
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
    setPaymentModeReportDetailsLoading(true);
    try {
      const { date_from, date_to, ward_id, user_id } = searchQueryObj;
      console.log("searchQueryObj==========");
      console.log(searchQueryObj);
      getPaymentReportData(date_from, date_to, ward_id, user_id);
      getBounceReportData(date_from, date_to, ward_id, user_id);
    } catch (err) {
      console.error(err);
      setIsPaymentModeReportDetailsLoaded(false);
    } finally {
      setPaymentModeReportDetailsLoading(false);
    }
  };

  async function getPaymentReportData(date_from, date_to, ward_id, user_id) {
    const url = `${SUDA_API_BASE_URL}/user/getCollectionByPayMode?date_from=${date_from}&date_to=${date_to}&user_id=${user_id}&ward_id=${ward_id}`;

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
      setPaymentModeReportDetails(responseBody);
      setIsPaymentModeReportDetailsLoaded(true);
    } else {
      setPaymentModeReportDetails(null);
      setIsPaymentModeReportDetailsLoaded(false);
    }
  }

  async function getBounceReportData(date_from, date_to, ward_id, user_id) {
    const url = `${SUDA_API_BASE_URL}/user/get_bounce_collection?date_from=${date_from}&date_to=${date_to}&user_id=${user_id}&ward_id=${ward_id}`;

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
      console.log("responseBodyBounce =============");
      console.log(responseBody);
      setBounceReportDetails(responseBody);
    }
    setIsPaymentModeReportDetailsLoaded(true);
  }

  const fetchAPINReturnResponseBody = async (
    url,
    requestOptions,
    setterMethod
  ) => {
    let response = null,
      responseBody = null;
    response = await fetch(url, requestOptions);
    responseBody = await response.json();
    return responseBody;
  };

  useEffect(() => {
    if (paymentModeReportDetails?.length > 0) {
      let totalTransactionVal = 0,
        totalCollectionVal = 0;
      paymentModeReportDetails.forEach((item) => {
        totalTransactionVal += parseInt(item.transaction_count);
        totalCollectionVal += parseFloat(item.total_collection);
      });
      setCollectionDetailsObj((prevState) => {
        return {
          ...prevState,
          total_collection: totalCollectionVal,
          total_transaction: totalTransactionVal,
        };
      });
      let dataForExportToExcel = paymentModeReportDetails.map((item) => {
        return {
          Description: item.payment_mode,
          "No. of Transactions": item.transaction_count,
          Amount: item.total_collection,
        };
      });
      dataForExportToExcel.push({
        Description: "Total Collection",
        "No. of Transactions": totalTransactionVal,
        Amount: totalCollectionVal,
      });
      dataForExportToExcel.push({
        Description: "Net Collection",
        "No. of Transactions": totalTransactionVal,
        Amount: totalCollectionVal,
      });
      setDataForExport(dataForExportToExcel);
    }
  }, [paymentModeReportDetails]);

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

  const bounceTableHeading = [
    "Ward ID",
    "Acomposite Tax",
    "Aproperty Tax",
    "Bank Name",
    "Branch Name",
    "Cheque DD Aprcode",
    "Composite Tax",
    "Discount",
    "Education Cess",
    "Aeducation Cess",
    "Form Fee",
    "Mobile No",
    "Owner Name",
    "Payment Mode",
    "Penal Charge",
    "Penalty",
    "Property No",
    "Property Tax",
    "Rain Harvest Charge",
    "Stampdate",
    "Tax Collector",
    "Tot Amount",
    "Transaction Date",
    "Transaction No",
    "User ID",
    "Ward Name",
    "For Year",
  ];

  return showModal == true ? (
    <>
      <div className="relative mt-10 flex min-h-screen flex-col justify-center overflow-hidden">
        <div className="m-auto min-h-screen w-full rounded-none border border-gray-500 bg-white px-0 pb-4 pt-0">
          <form className="mt-4">
            <div className="m-4 mt-4 rounded-md bg-white px-0 pb-4 pt-0">
              <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-md py-1 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
                <h2 className="text-center text-sm font-semibold text-white">
                  Payment Mode Report
                </h2>
              </nav>
              <div className="min-w-fit max-w-fit flex-wrap items-end md:flex-1 lg:flex">
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
                    className={`py-2 pl-2 pr-3 text-xs font-bold text-gray-900 border-red-500`}
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
                  <label className="mb-2 block text-xs font-bold text-gray-700">
                    Operator Name
                    <span className="contents text-sm font-bold text-red-600">
                      *
                    </span>
                  </label>
                  <Select
                    name="operatorName"
                    // onChange={(value) => {
                    //   const selectedWard = JSON.parse(value);
                    //   setInputData({
                    //     ...inputData,
                    //     user_id: selectedWard.id,
                    //   });
                    // }}
                    onChange={handleSearchQueryChange}
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
              </div>
              <div className="flex w-full justify-center">
                <button
                  type="button"
                  onClick={handleSearch}
                  className="mb-4 ml-2 mr-2 h-8 w-28 transform rounded-md bg-green-400 px-4 py-1 text-xs font-bold tracking-wide text-white transition-colors duration-200 hover:bg-green-700 focus:bg-green-400 focus:outline-none"
                >
                  Search
                </button>
              </div>
            </div>

            {isPaymentModeReportDetailsLoading == true ? (
              <ColorRingCustom />
            ) : null}
            {isPaymentModeReportDetailsLoaded == false ? (
              <NotFoundErrorMessageCustom
                message={SOMETHING_WENT_WRONG}
                text_size={`sm`}
              />
            ) : null}
            {paymentModeReportDetails?.length == 0 &&
            isPaymentModeReportDetailsLoaded == true ? (
              <NotFoundErrorMessageCustom
                message={NO_DATA_FOUND}
                text_size={`sm`}
              />
            ) : null}

            {paymentModeReportDetails?.modeWise.length > 0 &&
            isPaymentModeReportDetailsLoaded == true ? (
              <>
                <div className="m-4 rounded-md bg-white px-0  pb-0 pt-0 lg:max-w-full h-10">
                  <div className="flex flex-col">
                    <div className="overflow-x-auto">
                      <div className="inline-block p-2.5 align-middle lg:w-full">
                        <div className="overflow-hidden">
                          <table className="min-w-full">
                            <thead className="bg-gray-50"></thead>
                            <tbody>
                              <tr className="">
                                <td className="whitespace-normal px-4 py-2 text-center text-sm font-medium text-blue-900">
                                  Payment Mode Report from{" "}
                                  {`${searchQueryObj?.date_from + ""}`} to{" "}
                                  {searchQueryObj?.date_to}
                                </td>
                                <td>
                                  <ExportToExcel
                                    excelData={dataForExport}
                                    filaName={`PaymentModeWiseReport-From-${searchQueryObj.date_from}-To-${searchQueryObj.date_to}`}
                                    btnText={`Export to Excel`}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="m-4 mb-5 rounded-md bg-white px-0 pb-0 pt-0 lg:max-w-full h-10">
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
                                  Collection & Refund Description
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Account Description
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                >
                                  Amount
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              <tr className="">
                                <td className="whitespace-normal border px-0 py-0 text-center text-xs font-normal text-gray-700">
                                  <table className="min-w-full">
                                    <thead className="">
                                      <tr>
                                        <th
                                          scope="col"
                                          className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                        >
                                          Description
                                        </th>
                                        <th
                                          scope="col"
                                          className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                        >
                                          No. Of Transaction
                                        </th>
                                        <th
                                          scope="col"
                                          className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                                        >
                                          Amount
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                      {paymentModeReportDetails?.modeWise
                                        .length > 0
                                        ? paymentModeReportDetails.modeWise.map(
                                            (item, index) => {
                                              return (
                                                <tr key={index} className="">
                                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                                    {item.payment_mode}
                                                  </td>
                                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                                    {item.transaction_count}
                                                  </td>
                                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                                    {item.total_collection}
                                                  </td>
                                                </tr>
                                              );
                                            }
                                          )
                                        : null}
                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-bold text-gray-700">
                                          Total Collection
                                        </td>
                                        <td
                                          className="whitespace-normal border border-gray-300 
                                        px-6 py-2 text-center text-xs font-normal text-gray-700"
                                        >
                                          {
                                            // collectionDetailsObj.total_transaction
                                            // paymentModeReportDetails?.payment_mode_total_collection
                                          }
                                        </td>
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-bold text-green-700">
                                          {
                                            // collectionDetailsObj.total_collection
                                            paymentModeReportDetails?.payment_mode_total_collection
                                          }
                                        </td>
                                      </tr>
                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-bold text-gray-700">
                                          No Of Transaction
                                        </td>
                                        <td
                                          className="whitespace-normal border border-gray-300 
                                        px-6 py-2 text-center text-xs font-normal text-gray-700"
                                        >
                                          {
                                            // collectionDetailsObj.total_transaction
                                            // paymentModeReportDetails?.payment_mode_total_collection
                                          }
                                        </td>
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-bold text-green-700">
                                          {
                                            // collectionDetailsObj.total_collection
                                            bounceReportDetails[0]
                                              ?.no_of_transaction
                                          }
                                        </td>
                                      </tr>
                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-bold text-gray-700">
                                          Net Collection
                                        </td>
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                          {
                                            collectionDetailsObj.total_transaction
                                          }
                                        </td>
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-bold text-green-700">
                                          {
                                            //collectionDetailsObj.total_collection
                                            paymentModeReportDetails?.payment_mode_total_collection -
                                              bounceReportDetails[0]?.tot_amount
                                          }
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                                <td className="whitespace-normal px-0 py-0 text-center text-xs font-normal text-gray-700">
                                  <table className="min-w-full">
                                    <tbody className="divide-y divide-gray-200">
                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                          Property Tax
                                        </td>
                                      </tr>
                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                          Sanitation Tax
                                        </td>
                                      </tr>
                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                          Composite Tax
                                        </td>
                                      </tr>
                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                          Common Water Tax
                                        </td>
                                      </tr>
                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                          Personal Water Tax
                                        </td>
                                      </tr>
                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                          Education Cess
                                        </td>
                                      </tr>
                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                          Diff. Amount(Antar Ki Rasi)
                                        </td>
                                      </tr>
                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                          Penal Charge
                                        </td>
                                      </tr>
                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                          Rain Water Harvesting Charge
                                        </td>
                                      </tr>
                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                          Form Fee
                                        </td>
                                      </tr>
                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                          Penalty
                                        </td>
                                      </tr>
                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                          Discount(-)
                                        </td>
                                      </tr>

                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                          Adjustment(-)
                                        </td>
                                      </tr>

                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-bold text-gray-700">
                                          Total
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                                <td className="whitespace-normal px-0 py-0 text-center text-xs font-normal text-gray-700">
                                  <table className="min-w-full">
                                    <tbody className="divide-y divide-gray-200">
                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                          {
                                            paymentModeReportDetails.property_tax
                                          }
                                        </td>
                                      </tr>
                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                          {
                                            paymentModeReportDetails.sanitation_tax
                                          }
                                        </td>
                                      </tr>
                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                          {
                                            paymentModeReportDetails.composite_tax
                                          }
                                        </td>
                                      </tr>
                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                          {
                                            paymentModeReportDetails.common_water_tax
                                          }
                                        </td>
                                      </tr>
                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                          {
                                            paymentModeReportDetails.personal_water_tax
                                          }
                                        </td>
                                      </tr>
                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                          {
                                            paymentModeReportDetails.education_cess
                                          }
                                        </td>
                                      </tr>
                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                          {paymentModeReportDetails.diff_amount}
                                        </td>
                                      </tr>
                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                          {
                                            paymentModeReportDetails.penal_charge
                                          }
                                        </td>
                                      </tr>
                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                          {
                                            paymentModeReportDetails.rain_wtr_harvest
                                          }
                                        </td>
                                      </tr>
                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                          {paymentModeReportDetails.form_fee}
                                        </td>
                                      </tr>
                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                          {paymentModeReportDetails.penalty}
                                        </td>
                                      </tr>
                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                          {paymentModeReportDetails.discount}
                                        </td>
                                      </tr>

                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                          {paymentModeReportDetails.adjustment}
                                        </td>
                                      </tr>

                                      <tr className="">
                                        <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-bold text-green-700">
                                          {
                                            paymentModeReportDetails.account_total
                                          }
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </form>
        </div>
      </div>
    </>
  ) : null;
}

export default SearchPaymentModeReport;
