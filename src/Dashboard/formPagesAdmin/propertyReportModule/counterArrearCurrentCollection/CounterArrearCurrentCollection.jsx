import React, { useState } from "react";
import { Button, Option, Select } from "@material-tailwind/react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { useMaterialTailwindController } from "../../../../Dashboard/context/index";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const CounterArrearCurrentCollection = () => {
  const [controller, dispatch] = useMaterialTailwindController();
  const { allUserDetailsInputFromAPI, safAllInputFromAPI } = controller;
  const [isLoading, setIsLoading] = useState(false);
  const [
    counterArrearCurrentCollectionReportData,
    setCounterArrearCurrentCollectionReportData,
  ] = useState([]);
  const [netCollection, setNetCollection] = useState(0);

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
  });

  async function counterArrearCurrentCollectionReport() {
    setIsLoading(true);

    const baseParams = {
      fromDate: inputData.fromDate,
      toDate: inputData.toDate,
    };

    if (inputData.wardId !== "All") {
      baseParams.wardId = inputData.wardId;
    }

    if (inputData.userId !== "All") {
      baseParams.userId = inputData.userId;
    }

    const requestData = {
      reportIdentifier: "public_CounterAndArrearcollection",
      params: baseParams,
    };

    console.log(requestData);

    axios
      .post(`${BACKEND_BASE_URL}/reports`, requestData)
      .then((response) => {
        console.log(response.data.data);
        if (
          response.data.data[0].length == 0 &&
          response.data.data[1].length == 0
        ) {
          toast.error("No records found", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          setCounterArrearCurrentCollectionReportData(response.data.data[1]);
          setNetCollection(response.data.data[0][0].sum);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
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
    { id: "All", employee_name: "All", user_name: "All", designation: "All" },
    ...(allUserDetailsInputFromAPI?.length > 0
      ? allUserDetailsInputFromAPI.map((item) => {
          const { id, employee_name, user_name, designation } = item;
          return { id, employee_name, user_name, designation };
        })
      : []),
  ];

  return (
    <div className="my-10 flex min-h-screen flex-col overflow-hidden">
      <ToastContainer autoClose={2000} />
      <div className="w-full rounded-md  bg-white px-0 pt-0 lg:max-w-full">
        <nav className="navcustomproperty relative mb-2 flex flex-wrap justify-between rounded-md py-2 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
          <h2 className="text-center text-sm font-semibold text-white">
            CounterArrearCurrentCollection
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
              className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900 border-red-700"
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
        <div className="justify-center p-4 lg:flex">
          <Button
            onClick={() => {
              console.log(inputData);
              if (
                inputData.fromDate != "" &&
                inputData.toDate != "" &&
                inputData.wardId != "" &&
                inputData.userId != ""
              ) {
                counterArrearCurrentCollectionReport();
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
      ) : !isLoading && counterArrearCurrentCollectionReportData.length > 0 ? (
        <div className="mb-12 w-full border border-gray-500 text-center">
          <div className="mb-12 h-full overflow-auto shadow-md ">
            <table className="w-full table-auto text-left">
              <thead className="text-center text-xs">
                <tr className="text-center">
                  <td className="py-4" colSpan={30}>
                  RAJNANDGAON MUNICIPAL CORPORATION
                  </td>
                </tr>
                <tr className="text-center">
                  <td
                    className="whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700"
                    colSpan={30}
                  >
                    (Property Tax)
                  </td>
                </tr>
                <tr className="text-center">
                  <td
                    className="whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700"
                    colSpan={30}
                  >
                    Counter Collection Report From {inputData.fromDate} To
                    {inputData.toDate}
                  </td>
                </tr>
                <tr className="text-center">
                  <td
                    className="whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700"
                    colSpan={30}
                  >
                    Net Collection : {netCollection}
                  </td>
                </tr>
                <tr>
                  <th>#</th>
                  <th>Prop No.</th>
                  <th>Ward No.</th>
                  <th>Owner Name</th>
                  <th>Mobile No</th>
                  <th>From Year</th>
                  <th>Upto Year</th>
                  <th>Transaction Date</th>
                  <th>Transaction No</th>
                  <th>Mode</th>
                  <th>Cheque/DD No</th>
                  <th>Bank</th>
                  <th>Branch/Trans Id</th>
                  <th>Amount</th>
                  <th>Property Tax Current</th>
                  <th>Property Tax Arrear</th>
                  <th>Composite Tax Current</th>
                  <th>Composite Tax Arrear</th>
                  <th>Education Cess Current</th>
                  <th>Education Cess Arrear</th>
                  <th>Diff Amount Curr.</th>
                  <th>Diff Amount Arr.</th>
                  <th>Penalty Amount</th>
                  <th> Penal Charge</th>
                  <th>Rain Water Harvest Charge</th>
                  <th>Form Fee</th>
                  <th>Discount</th>
                  <th>Adv Adjust</th>
                  <th>Total Amount</th>
                  <th>Tax Collector Name</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {counterArrearCurrentCollectionReportData.map((item, index) => {
                  return (
                    <tr
                      className="hover:bg-gray-50 dark:hover:bg-gray-600"
                      key={index}
                    >
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {index + 1}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.property_no}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.ward_name}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.owner_name}
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
                        {item.transaction_date}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.transaction_no}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.payment_mode}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.cheque_dd_no_apr_code}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.bank_name}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.branch_name}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {(
                          parseFloat(item.amnt) -
                          parseFloat(item.prop_tax_arr) -
                          parseFloat(item.composite_tax_arr) -
                          parseFloat(item.education_cess_arr)
                        ).toFixed(2)}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.prop_tax_curr}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.prop_tax_arr}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.composite_tax_curr}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.composite_tax_arr}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.education_cess_curr}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.education_cess_arr}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.difference_amount_curr}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {/* {item.education_cess_curr} */} 0
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.penalty_amnt}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.penal_charge}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.rain_water_harvest_charge == null
                          ? 0
                          : item.rain_water_harvest_charge}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.form_fee}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.discount}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {item.form_fee}
                      </td>
                      <td className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700">
                        {(
                          parseFloat(item.amnt) -
                          parseFloat(item.prop_tax_arr) -
                          parseFloat(item.composite_tax_arr) -
                          parseFloat(item.education_cess_arr)
                        ).toFixed(2)}
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

export default CounterArrearCurrentCollection;
