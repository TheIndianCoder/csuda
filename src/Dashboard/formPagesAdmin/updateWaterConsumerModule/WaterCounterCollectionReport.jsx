import React from "react";
import { Select, Option } from "@material-tailwind/react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";
import { ColorRing } from "react-loader-spinner";
import { useMaterialTailwindController } from "@/Dashboard/context";
import { convertDateToAPIFormat, convertDateFormat } from "@/utils/commonUtils";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ExportToExcel } from "@/utils/commonComponents";
import "react-toastify/dist/ReactToastify.css";
import { getCookieByName } from "@/utils/RequireAuth";

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL;

const WaterCounterCollectionReport = () => {
  const counterCollectionReports = {
    date_from: "",
    date_to: "",
    user_id: "",
    ward_id: "",
    paymentMode: "",
    paymentModeId: "",
  };

  const [counterCollectionReport, setcounterCollectionReport] = useState(
    counterCollectionReports
  );
  const [wardId, setWardId] = useState("");
  const [operatorName, setoperatorName] = useState("");
  const [paymentMode, setpaymentMode] = useState("");
  const [counterCollectionReportObj, setCounterCollectionReportObj] =
    useState(null);
  const [loader, setLoader] = useState(false);
  const [controller, dispatch] = useMaterialTailwindController();
  const [totalCollectionAmount, setTotalCollectionAmount] = useState("");
  const [totalBounce, settotalBounce] = useState("");
  const [netCollection, setnetCollection] = useState("");
  const [dataForExport, setDataForExport] = useState([]);
  const [disabled, setDisabled] = useState(false);
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
  const { allUserDetailsInputFromAPI, safAllInputFromAPI } = controller;

  const handleCounterCollectionReport = (e, id) => {
    console.log("hi");
    console.log(e, id);
    const eventStr = e + "";
    if (e.toString().includes("ward_name")) {
      setcounterCollectionReport((prevState) => {
        let eventObj = JSON.parse(e);
        return { ...prevState, ward_id: eventObj.id };
      });
    } else if (eventStr.includes("user")) {
      setcounterCollectionReport((prevState) => {
        let eventObj = JSON.parse(e);
        return { ...prevState, user_id: eventObj.user_id };
      });
    } else if (e.toString().includes("payment_mode")) {
      const propertyTypeItem = JSON.parse(e);
      const pN = parseInt(propertyTypeItem.id);
      setpaymentMode(pN);
    } else if (id.includes("date_from")) {
      setcounterCollectionReport((prevState) => {
        return { ...prevState, date_from: convertDateToAPIFormat(e.$d) };
      });
    } else if (id.includes("date_to")) {
      setcounterCollectionReport((prevState) => {
        return { ...prevState, date_to: convertDateToAPIFormat(e.$d) };
      });
    } else if (e.toString().includes("mode_of_payment")) {
      let connItem = JSON.parse(e);
      // console.log(wardItem)
      setcounterCollectionReport((prevState) => {
        return {
          ...prevState,
          paymentMode: connItem.mode_of_payment,
          paymentModeId: connItem.id,
        };
      });
    } else {
      setcounterCollectionReport({
        ...counterCollectionReport, // spreading the unchanged values
        [e.target.name]: e.target.value, // changing the state of *changed value*
      });
    }
  };

  let handlePrintToPDF = () => {
    let printwin = window.open("");
    printwin.document.write(document.getElementById("print_section").innerHTML);
    copyStyles(window.document, printwin.document);
    printwin.print();
  };

  const copyStyles = (src, dest) => {
    Array.from(src.styleSheets).forEach((styleSheet) => {
      dest.head.appendChild(styleSheet.ownerNode.cloneNode(true));
    });
    Array.from(src.fonts).forEach((font) => dest.fonts.add(font));
  };
  useEffect(() => {
    console.log(counterCollectionReportObj);
  }, [counterCollectionReportObj]);

  const handleSearch = async () => {
    setLoader(true);
    try {
      let { date_from, date_to, user_id, ward_id, paymentMode } =
        counterCollectionReport;
      if (user_id === "") user_id = 0;
      if (ward_id === "") ward_id = 0;
      if (paymentMode === "") paymentMode = 0;
      const url = `${SUDA_API_BASE_URL}/user/Water/collectionReport/${date_from}/${date_to}/${ward_id}/${user_id}/${paymentMode}`;
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
      console.log(response, responseBody);
      if (response?.status == "200" && !responseBody?.errors) {
        setCounterCollectionReportObj(responseBody?.collectionsBody);
        setnetCollection(responseBody?.netCollection);
        setTotalCollectionAmount(responseBody?.totalCollection);
        settotalBounce(responseBody?.totalBounce);
        setLoader(false);
      } else if (response?.status == "200" && responseBody?.errors) {
        toast.error(responseBody.errors.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setCounterCollectionReportObj(null);
        setLoader(false);
      } else {
        toast.error("Please try again", {
          position: toast.POSITION.TOP_CENTER,
        });
        setCounterCollectionReportObj(null);
        setLoader(false);
      }
    } catch (err) {
      console.error(err);
      toast.error(err, {
        position: toast.POSITION.TOP_CENTER,
      });
      setCounterCollectionReportObj(null);
      setLoader(false);
    } finally {
      setLoader(false);
    }
    setLoader(false);
  };

  useEffect(() => {
    if (
      counterCollectionReport?.date_from !== "" &&
      counterCollectionReport?.date_to !== "" &&
      counterCollectionReport?.paymentMode !== ""
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [
    counterCollectionReport.date_from,
    counterCollectionReport.date_to,
    counterCollectionReport.paymentMode,
  ]);

  useEffect(() => {
    if (counterCollectionReportObj?.length > 0) {
      let dataForExportToExcel = counterCollectionReportObj.map(
        (item, index) => {
          return {
            "Sl No.": index + 1,
            "Consumer No.": item.consumerNo,
            "Ward No.": item.wardNo,
            "Owner Name.": item.ownerName,
            "From Month": item.fromMonth,
            "Upto Month": item.upToMonth,
            "Transaction Date": item.transactionDate,
            "Transaction Number": item.transactionNo,
            "Amount": item.paidAmount,
            "Mode Of Payment": item.modeOfPayment,
            "Cheque/DD No.": item.chequeDDNo,
            "Bank Name": item.bankName,
            "Branch Name": item.branch_name,
            "TC Name": item.tcName,
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

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="m-4 mt-4 rounded-lg border border-gray-500 bg-white px-0 pb-4 pt-0 lg:max-w-full">
        <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-lg py-1 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
          <h2 className="text-center text-sm font-semibold text-white">
            Water Counter Collection Report
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
                    onChange={(e) =>
                      handleCounterCollectionReport(e, "date_from")
                    }
                    id="date_from"
                    name="date_from"
                    inputFormat="YYYY-MM-DD"
                    color="gray"
                    renderInput={(params) => <TextField {...params} />}
                    disableFuture={true}
                    value={counterCollectionReport?.date_from}
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
                    onChange={(e) =>
                      handleCounterCollectionReport(e, "date_to")
                    }
                    id="date_to"
                    name="date_to"
                    date='gray'
                    inputFormat="YYYY-MM-DD"
                    renderInput={(params) => <TextField {...params} />}
                    disableFuture={true}
                    value={counterCollectionReport?.date_to}
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
                onChange={(e) => handleCounterCollectionReport(e, "")}
                name="wardNo"
                defaultValue={wardId}
                color="gray"
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
            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
              <label
                className="mb-2 block text-xs font-bold text-gray-700"
                htmlFor="password"
              >
                Operator Name
                <p className="contents text-xs font-bold text-red-600">*</p>
              </label>
              <Select
                onChange={(e) => handleCounterCollectionReport(e, "")}
                name="operatorName"
                defaultValue={operatorName}
                color="gray"
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
          <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex">
            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
              <label
                className="mb-2 block text-xs font-bold text-gray-700"
                htmlFor="password"
              >
                Payment Mode
                <p className="contents text-sm font-bold text-red-600">*</p>
              </label>

              <Select
                onChange={(e) => handleCounterCollectionReport(e, "")}
                name="paymentMode"
                //  defaultValue={consumerDetail.wardNo}
                defaultValue={paymentMode}
                label="select"
                color="gray"
                className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900
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
                className={`mb-4 ml-2 mr-2 h-8 w-28 px-4 py-1 tracking-wide
                    ${disabled ? `cursor-not-allowed ` : `cursor-pointer`}
                     transform rounded-md bg-green-400 text-xs font-bold 
                     text-white transition-colors duration-200 hover:bg-green-700 
                     focus:bg-green-400 focus:outline-none`}
                disabled={disabled}
              >
                Search
              </button>
            </div>
          </div>
          {loader ? (
            <div className="m-auto h-16 w-16">
              <ColorRing
                visible={true}
                height="40"
                width="40"
                colors={["#FF0000", "#FF0000", "#FF0000", "#FF0000", "#FF0000"]}
              />
            </div>
          ) : null}
        </form>

        {counterCollectionReportObj?.length > 0 ? (
          <>
            <section id="print_section" className="bg-white  py-0">
              <div className="m-4 rounded-none border border-gray-500 bg-white px-0  pb-0 pt-0 lg:max-w-full">
                <div className="flex flex-col">
                  <div className="overflow-x-auto">
                    <div className="inline-block p-2.5 align-middle lg:w-full">
                      <div className="overflow-hidden">
                        <table className="min-w-full">
                          <thead className="bg-gray-50"></thead>
                          <tbody>
                            <tr className="">
                              <td className="whitespace-normal px-4 py-2 text-center  text-sm font-semibold text-blue-900">
                              RAJNANDGAON MUNICIPAL CORPORATION
                              </td>
                            </tr>
                            <tr className="">
                              <td className="whitespace-normal px-4 py-2 text-center text-sm font-bold text-gray-900">
                                (Water User Charge)
                              </td>
                            </tr>
                            <tr className="">
                              <td className="whitespace-normal px-4 py-2 text-center text-sm font-bold text-green-700">
                                Counter Collection Report from{" "}
                                {`${counterCollectionReport?.date_from + ""}`}{" "}
                                to {counterCollectionReport?.date_to}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="flex justify-evenly">
                          <p>
                            Total Collection :{" "}
                            {totalCollectionAmount != null
                              ? totalCollectionAmount
                              : "N/A"}
                          </p>
                          <p>
                            Total Bounce :{" "}
                            {totalBounce != null ? totalBounce : "N/A"}
                          </p>
                          <p>
                            Net Collection :{" "}
                            {netCollection != null ? netCollection : "N/A"}
                          </p>
                        </div>
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
                                Consumer. No.
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
                                Owner Name
                              </th>
                              <th
                                scope="col"
                                className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                              >
                                From Month
                              </th>
                              <th
                                scope="col"
                                className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                              >
                                UpTo Month
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
                                Trans. No
                              </th>
                              <th
                                scope="col"
                                className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                              >
                                Amount
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
                                Cheque/DD No
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
                                TC Name
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {counterCollectionReportObj?.map((item, index) => {
                              return (
                                <tr key={index} className="">
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {index + 1}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                    {item?.consumerNo}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {item?.wardNo}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {item?.ownerName}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {item?.fromMonth}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                    {item?.upToMonth}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {item?.transactionDate}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {item?.transactionNo}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {item?.paidAmount}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {item?.modeOfPayment != null
                                      ? item?.modeOfPayment
                                      : "N/A"}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {item?.chequeDDNo != null
                                      ? item?.chequeDDNo
                                      : "N/A"}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                    {item?.bankName != null
                                      ? item?.bankName
                                      : "N/A"}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {item?.tcName != null
                                      ? item?.tcName
                                      : "N/A"}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="m-auto min-w-fit max-w-fit items-center md:flex-1 lg:flex">
              <div className="mb-0 ml-2 mr-0 mt-8 min-w-fit max-w-fit">
                <button
                  type="button"
                  className="mb-4 ml-2 mr-2 h-8 w-28 transform rounded-md bg-green-400 px-4 py-1 text-sm font-bold tracking-wide text-white transition-colors duration-200 hover:bg-green-700 focus:bg-green-400 focus:outline-none"
                  onClick={handlePrintToPDF}
                >
                  Print
                </button>
              </div>
              <ExportToExcel
                excelData={dataForExport}
                filaName={`CounterCollectionReport-From-${counterCollectionReport?.date_from}-To-${counterCollectionReport?.date_to}`}
                btnText={`Export to Excel`}
              />
            </div>
          </>
        ) : counterCollectionReportObj?.length === 0 ? (
          <>
            <p className="whitespace-normal px-4 py-2 text-center  text-sm font-semibold text-blue-900">
              No results found
            </p>
          </>
        ) : null}
      </div>
    </>
  );
};

export default WaterCounterCollectionReport;
