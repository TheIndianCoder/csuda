import React, { useState } from "react";
import BankReconciliationTable from "@/Dashboard/resusables/BankReconciliationTable";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Tooltip, Select, Option, Button } from "@material-tailwind/react";
import DummyTable from "@/Components/DummyTable";
import { useMaterialTailwindController } from "../../../../Dashboard/context/index";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Table from "../../utils/Table";
import { useEffect } from "react";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const index = () => {
  const [controller, dispatch] = useMaterialTailwindController();
  const { safAllInputFromAPI } = controller;
  const [inputData, setInputData] = useState({
    wardId: "",
    entryType: "",
  });

  const columns = [
    { field: "id", header: "Sl No" },
    { field: "ward_name", header: "Ward No" },
    { field: "property_no", header: "Property No" },
    { field: "owner_name", header: "Owner Name" },
    { field: "mobile_no", header: "Mobile Number" },
    { field: "property_address", header: "Property Address" },
    { field: "due_from", header: "Due From" },
    { field: "due_amount", header: "Due Amount" },
  ]
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

  const reportTypes = [
    "Total Unpaid till Current Year",
    "Previous year paid but current year unpaid",
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [paidUnpaidReportProperty, setPaidUnpaidReportProperty] = useState([]);
  
  const [searchConsumer, setsearchConsumer] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);

  const PageSize = 10;
  const endOffset = itemOffset + PageSize;

  const currentItems = searchConsumer?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(searchConsumer?.length / PageSize);

  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * PageSize) % searchConsumer?.length;

    setItemOffset(newOffset);
  };

  
  useEffect(() => {
    let arr = [];
    if (paidUnpaidReportProperty?.length > 0) {
      paidUnpaidReportProperty.map((testData, index) => {
        let val = {};
        val.id = index + 1;
        val.ward_name = testData?.ward_name;
        val.property_no = testData?.property_no;
        val.property_address = testData?.property_address;
        val.owner_name = testData?.owner_name;
        val.mobile_no = testData?.mobile_no;
        val.due_from = testData?.due_from;
        val.due_amount = testData?.due_amount;
        arr.push(val);
      });
    }
    setsearchConsumer(arr);
  }, [paidUnpaidReportProperty]);

  const [currentTableData, setcurrentTableData] = useState([]);

  // const currentTableData = useMemo(() => {
  //   const firstPageIndex = (currentPage - 1) * PageSize;
  //   const lastPageIndex = firstPageIndex + PageSize;
  //   return bulkPaymentReceiptsObj.slice(firstPageIndex, lastPageIndex);
  // }, [currentPage]);

  // useEffect(() => {
  //   const firstPageIndex = (currentPage - 1) * PageSize;
  //   const lastPageIndex = firstPageIndex + PageSize;
  //   let data = bulkPaymentReceiptsObj.slice(firstPageIndex, lastPageIndex);
  //   setcurrentTableData(data);
  // }, [currentPage, bulkPaymentReceiptsObj]);


  async function paidUnpaidReportPropertyReport(offset) {
    setIsLoading(true);
    const params = {};
    if (inputData.wardId !== "All") params.wardId = inputData.wardId;
    const requestData = {
      reportIdentifier:
        inputData.entryType == "Total Unpaid till Current Year"
          ? "public_UnpaidPropertyListTillCurrentYear"
          : "public_UnpaidPropertyListForCurrentYear",
      params,
      paginate: {
        limit: 50,
        offset: offset == null ? 0 : offset,
      },
    };

    console.log(requestData);

    axios
      .post(`${BACKEND_BASE_URL}/reports`, requestData)
      .then((response) => {
        console.log(response.data.data);
        if (response.data.data[0].length == 0) {
          toast.error("No records found", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          let restructeredData = [];
          response.data.data[0]?.forEach((data, index) => {
            restructeredData.push({
              sl_no: offset == null ? index + 1 : offset + index + 1,
              property_no: data.property_no == null ? "N/A" : data.property_no,
              ward_name: data.ward_name,
              owner_name: data.owner_name,
              mobile_no: data.mobile_no,
              property_address: data.property_address, 
              due_from: data.due_from,
              due_amount: data.due_amount,
            });
          });
          setPaidUnpaidReportProperty(restructeredData);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      paidUnpaidReportPropertyReport(currentPage * itemsPerPage);
    }
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    paidUnpaidReportPropertyReport(currentPage * itemsPerPage);
  };

  return (
    <div className="mb-10 mt-10 flex min-h-screen flex-col overflow-hidden">
      <div className="w-full rounded-md  bg-white px-0 pb-4 pt-0 lg:max-w-full">
        <nav className="navcustomproperty relative mb-2 flex flex-wrap justify-between rounded-md py-2 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
          <h2 className="text-center text-sm font-semibold text-white">
            Paid / Unpaid Property Report
          </h2>
        </nav>

        <div className="mb-12">
          <div className="px-8 py-2">
            <div className="flex-wrap justify-around md:flex-1 lg:flex">
              <div className="px-4 py-2">
                <label className="mb-2 block text-xs font-bold text-gray-700">
                  Ward no{" "}
                  <span className="contents text-sm font-bold text-red-600">
                    *
                  </span>
                </label>
                <Select
                  label="select"
                  className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
                  color="orange"
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
                  Report Type{" "}
                  <span className="contents text-sm font-bold text-red-600">
                    *
                  </span>
                </label>
                <Select
                  label="select"
                  className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
                  color="orange"
                  onChange={(value) => {
                    setInputData({
                      ...inputData,
                      entryType: value,
                    });
                  }}
                >
                  {reportTypes?.length > 0 ? (
                    reportTypes.map((item, index) => {
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
                  if (inputData.wardId != "" && inputData.entryType != "") {
                    paidUnpaidReportPropertyReport();
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
        </div>
      </div>
      {isLoading ? (
        <p className="flex justify-center pt-20 text-2xl">Loading...</p>
      ) : !isLoading && paidUnpaidReportProperty.length > 0 ? (
        <>
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

        </>
      ) : null}
        
    </div>
  );
};

export default index;
