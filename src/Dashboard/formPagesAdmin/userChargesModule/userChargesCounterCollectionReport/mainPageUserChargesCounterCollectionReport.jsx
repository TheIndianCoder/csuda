import BankReconciliationTable from "@/Dashboard/resusables/BankReconciliationTable";
import { ExportToExcel } from "@/utils/commonComponents";
import { Button, Option, Select } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useMaterialTailwindController } from "../../../../Dashboard/context/index";
import { toast, ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Table from "../../utils/Table";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

// Hard-coded Table Headings
const tableHeadings = [
  "",
  "Transaction Number",
  "Payment Mode",
  "Cheque/DD/APR No.",
  "Bank",
  "Branch/TID",
  "Amount",
  "Tax Collector",
];
const columns = [
  { field: "id", header: "Sl No" },
  { field: "ward_no", header: "Ward No" },
  { field: "consumer_no", header: "Consumer No" },
  { field: "consumer_name", header: "Consumer Name" },
  { field: "holding_no", header: "Holding Number" },
  { field: "mobile_no", header: "Mobile Number" },
  { field: "from_month", header: "From Month" },
  { field: "upto_month", header: "Upto Month" },
  { field: "transaction_date", header: "Transaction Date" },
  { field: "transaction_no", header: "Transaction No" },
  { field: "amount", header: "Amount" },
  { field: "payment_mode", header: "Payment Mode" },
  { field: "cheque_no", header: "Cheque/DD/APR No." },
  { field: "bank_name", header: "Bank" },
  { field: "branch_name", header: "Branch/TID" },
  { field: "tax_collector", header: "Tax Collector" },
];

const MainPageUserChargesCounterCollectionReport = () => {
  const [exportData, setExportData] = useState([]);
  const [wasDataFetched, setWasDataFetched] = useState(false);
  const [controller, dispatch] = useMaterialTailwindController();
  const { allUserDetailsInputFromAPI, safAllInputFromAPI } = controller;
  const [totalCollection, setTotalCollection] = useState(0);
  const [totalNetCollection, setTotalNetCollection] = useState(0);
  const [totalBounceCollection, setTotalBounceCollection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [searchConsumer, setsearchConsumer] = useState([]);
  const PageSize = 10;

  const [
    wasteCounterCollectionReportSummary,
    setwasteCounterCollectionReportSummary,
  ] = useState([]);

  useEffect(() => {
    let arr = [];
    if (wasteCounterCollectionReportSummary?.length > 0) {
      wasteCounterCollectionReportSummary.map((testData, index) => {
        let val = {};
        val.id = index + 1;
        val.ward_no = testData?.ward_no;
        val.consumer_no = testData?.consumer_no;
        val.consumer_name = testData?.consumer_name;
        val.holding_no = testData?.holding_no;
        val.mobile_no = testData?.mobile_no;
        val.from_month = testData?.from_month;
        val.upto_month = testData?.upto_month;
        val.transaction_date = testData?.transaction_date;
        val.transaction_no = testData?.transaction_no;
        val.amount = testData?.amount;
        val.payment_mode = testData?.payment_mode;
        val.cheque_no = testData?.cheque_no;
        val.bank_name = testData?.bank_name;
        val.branch_name = testData?.branch_name;
        val.tax_collector = testData?.tax_collector;

        arr.push(val);
      });
    }
    setsearchConsumer(arr);
  }, [wasteCounterCollectionReportSummary]);

  const [inputData, setInputData] = useState({
    from_date: "",
    to_date: "",
    paymentMode: "",
    ward_no: "",
    userId: "",
  });

  useEffect(() => {
    console.log(
      wasteCounterCollectionReportSummary,
      "wasteCounterCollectionReportSummary"
    );
  }, [wasteCounterCollectionReportSummary]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);

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

  function formatDate(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    return `${year}-${month}-${day}`;
  }

  async function searchData(offset) {
    setIsLoading(true);

    const baseParams = {
      fromDate: inputData.from_date,
      toDate: inputData.to_date,
      paginate: {
        limit: 50,
        offset: offset,
      },
    };

    if (inputData.paymentMode !== "All") {
      baseParams.paymentMode = inputData.paymentMode;
    }

    if (inputData.ward_no !== "All") {
      baseParams.wardId = inputData.ward_no;
    }

    if (inputData.userId !== "All") {
      baseParams.userId = inputData.userId;
    }

    const requestData = {
      reportIdentifier: "waste_counter_collection",
      params: baseParams,
    };

    axios
      .post(`${BACKEND_BASE_URL}/reports`, requestData)
      .then((response) => {
        console.log(response?.data);
        if (response?.data.length == 0) {
          toast.error("No records found", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          if (offset > 0) {
            setwasteCounterCollectionReportSummary(response.data.data[2]);
          } else {
            setTotalCollection(response.data.data[0][0].total_collection);
            setTotalBounceCollection(
              response.data.data[1][0].bounce_collection
            );
            setwasteCounterCollectionReportSummary(response.data.data[2]);
          }
        }
        setIsLoading(false);
      })

      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    //  if(Number(totalCollection) > 0 && Number(totalBounceCollection) > 0){
    setTotalNetCollection(totalCollection - totalBounceCollection);
    // }
    console.log(totalCollection, totalBounceCollection);
  }, [totalCollection, totalBounceCollection]);
  useEffect(() => { 
    console.log(totalNetCollection, "arr");
  }, [totalNetCollection]);

  const endOffset = itemOffset + PageSize;

  const currentItems = searchConsumer?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(searchConsumer?.length / PageSize);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * PageSize) % searchConsumer?.length;

    setItemOffset(newOffset);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      searchData(currentPage * itemsPerPage);
    }
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    searchData(currentPage * itemsPerPage);
  };

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

  let handlePrintToPDF = () => {
    let printwin = window.open("");
    printwin.document.write(document.getElementById("print_section").innerHTML);
    copyStyles(window.document, printwin.document);
    printwin.print();
  };

  const copyStyles = (src, dest) => {
    // console.log("at the start of copying stylesheets")
    Array.from(src.styleSheets).forEach((styleSheet) => {
      // console.log("copying stylesheets")
      // console.log(styleSheet.ownerNode)
      dest.head.appendChild(styleSheet.ownerNode.cloneNode(true));
    });
    Array.from(src.fonts).forEach((font) => dest.fonts.add(font));
  };
  return (
    <div>
      <ToastContainer autoClose={2000} />
      <div className="m-4 mt-4 rounded-none border border-gray-500 bg-white px-0 pb-4 pt-0 lg:max-w-full">
        <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
          <h2 className="text-center text-sm font-semibold text-white">
            Waste Counter Collection Report Summary
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
                id="from_date"
                onChange={(date) => {
                  const formattedDate = formatDate(date);
                  setInputData({ ...inputData, from_date: formattedDate });
                }}
                disableFuture={true}
                renderInput={(params) => <TextField {...params} />}
                inputFormat="YYYY-MM-DD"
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
              <span className="contents text-sm font-bold text-red-600">*</span>
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                id="to_date"
                onChange={(date) => {
                  const formattedDate = formatDate(date);
                  setInputData({ ...inputData, to_date: formattedDate });
                }}
                disableFuture={true}
                renderInput={(params) => <TextField {...params} />}
                inputFormat="YYYY-MM-DD"
                value={
                  inputData.to_date !== "" ? inputData.to_date : "YYYY-MM-DD"
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
              className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
              onChange={(value) => {
                const selectedWard = JSON.parse(value);
                setInputData({
                  ...inputData,
                  ward_no: selectedWard.id,
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
          <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
            <label
              className="mb-2 block text-xs font-bold text-gray-700"
              htmlFor="password"
            >
              Payment Mode
              <p className="contents text-sm font-bold text-red-600">*</p>
            </label>

            <Select
              onChange={(value) => {
                const selectedPayment = JSON.parse(value);
                setInputData({
                  ...inputData,
                  paymentMode: selectedPayment.mode_of_payment,
                });
              }}
              name="paymentMode"
              label="select"
              className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
            >
              {modeOfPayment.map((item) => {
                const { id, mode_of_payment } = item;
                return (
                  <Option
                    key={id}
                    value={JSON.stringify(item)}
                  >{`${mode_of_payment}`}</Option>
                );
              })}
            </Select>
          </div>
        </div>
        <div className="mr-20 justify-center p-4 lg:flex">
          <div className="ml-5 mt-3">
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
        <p className="flex justify-center pt-10 text-2xl">Loading...</p>
      ) : !isLoading && wasteCounterCollectionReportSummary.length > 0 ? (
        <>
          <section id="print_section" className="bg-white  py-0">
            <div className="block  border border-gray-500 text-center ">
              <p className="whitespace-normal px-4 py-2 text-center text-sm font-bold  text-blue-900 ">
                Bhilai Corporation
              </p>
              <p className="whitespace-normal bg-gray-200 px-4 py-2 text-center text-sm font-bold  text-blue-900">
                Counter Collection Report from {inputData.from_date} to{" "}
                {inputData.to_date}
              </p>
              <div className="flex justify-around py-2">
                <p className="whitespace-normal text-sm font-bold  text-blue-900">
                  Total Collection:{" "}
                  <span className="text-red-500">{totalCollection ?? 0}</span>
                </p>
                <p className="whitespace-normal text-sm font-bold  text-blue-900">
                  Total Bounce:{" "}
                  <span className="text-red-500">
                    {totalBounceCollection ?? 0}
                  </span>
                </p>
                <p className="whitespace-normal text-sm font-bold  text-blue-900">
                  Net Collection:{" "}
                  <span className="text-red-500">
                    {parseFloat(
                      totalCollection - totalBounceCollection
                    ).toFixed(2) ?? 0}
                  </span>
                </p>
              </div>
              {/* <BankReconciliationTable
              tableHeadings={tableHeadings}
              tableRows={wasteCounterCollectionReportSummary}
            /> */}
              <Table
                data={currentItems}
                columns={columns}
                hover={true}
                striped={true}
              />
              {searchConsumer?.length > 10 ? (
                <ReactPaginate
                  breakLabel="..."
                  nextLabel={
                    <span
                      className="
                  // flex h-8 w-5 
                  items-center justify-center rounded-md bg-gray-200 px-5 py-3
                   text-xs text-gray-700"
                    >
                      next
                    </span>
                  }
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel={
                    <span
                      className="
                // flex h-8 w-8
                items-center  justify-center rounded-md bg-gray-200 px-5 py-3
                text-xs text-gray-700"
                    >
                      prev
                    </span>
                  }
                  containerClassName="flex items-center justify-center text-xs mx-3"
                  pageClassName="block border border-solid border-lightGray
              //  text-xs mx-1 
              //  hover:bg-lightGray w-8 py-3 px-5 h-8 flex items-center justify-center rounded-md 
               "
                  activeClassName="bg-gray-300 text-gray-700 text-xs"
                  renderOnZeroPageCount={null}
                />
              ) : null}

              <div className="m-auto min-w-fit max-w-fit items-center md:flex-1 lg:flex">
                <div className="mb-0 ml-2 mr-0 mt-1 min-w-fit max-w-fit">
                  <button
                    type="button"
                    onClick={handlePrintToPDF}
                    className=" ml-2 mr-2 h-8 w-28 transform rounded-md
                   bg-green-400 px-4 py-1 text-sm font-bold tracking-wide text-white 
                   transition-colors duration-200 hover:bg-green-700 focus:bg-green-400 
                   focus:outline-none"
                  >
                    Print
                  </button>
                </div>
                <ExportToExcel
                  excelData={searchConsumer}
                  filaName={`CounterCollectionReport`}
                  btnText={`Export to Excel`}
                />
              </div>
              {/* {wasteCounterCollectionReportSummary.length > 49 && (
              <div className="pagination flex justify-around pb-20">
                <button
                  className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:cursor-pointer hover:bg-blue-700"
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:cursor-pointer hover:bg-blue-700"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            )} */}
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
};

export default MainPageUserChargesCounterCollectionReport;
