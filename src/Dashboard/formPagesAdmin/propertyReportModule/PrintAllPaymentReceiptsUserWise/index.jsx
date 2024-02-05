import React, { useMemo, useState } from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Select, Option } from "@material-tailwind/react";
import { useMaterialTailwindController } from "@/Dashboard/context";
import Pagination from "@/Components/Pagination";
import data from "@/Components/mock-data.json";
import PaymentReceiptHindi from "../../updateWaterConsumerModule/paymentReceiptInHindi";
import PaymentReceipt from "../../updateWaterConsumerModule/paymentReceipt";

let PageSize = 10;

const index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [controller, dispatch] = useMaterialTailwindController();
  const { allUserDetailsInputFromAPI, safAllInputFromAPI } = controller;
  const [operatorName, setoperatorName] = useState('')
  const [limit, setlimit] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [receiptDetails, setReceiptDetails] = useState([])
  const [displayHindiForm, setDisplayHindiForm] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);



  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden mt-10 mb-10">
      <div className="w-full min-h-screen px-0 pt-0 pb-4 m-auto bg-white rounded-none border border-gray-500 lg:max-w-full">
        <form className="mt-4">
          <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-none mt-4 border border-gray-500 lg:max-w-full">
            <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
              <h2 className="text-sm font-semibold text-center text-white">
                Print All Payment Receipts User Wise
              </h2>
            </nav>
            <div className="md:flex-1 lg:flex justify-between md:mx-20">
              <div className="mb-4 ml-1 mt-2 flex flex-row w-80">
                <label className="block text-gray-700 text-xs font-bold my-2 mx-4 " htmlFor="password">
                  Date From
                  <p className='contents text-red-600 text-sm font-bold'>*</p>
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      id="from_date"
                      // onChange={(e) =>
                      //   handlepaymentRecordsSearchObjectChange(e, "from_date")
                      // }
                      inputFormat="MM/DD/YYYY"
                      renderInput={(params) => <TextField {...params} />}
                      // value={paymentRecordSearchObj?.from_date}
                      disableFuture={true}
                    />
                  </Stack>
                </LocalizationProvider>
              </div>
              <div className="mb-4 ml-1 mt-2 flex flex-row w-80">
                <label className="block text-gray-700 text-xs font-bold my-2 mx-4" htmlFor="password">
                  Date to
                  <p className='contents text-red-600 text-sm font-bold'>*</p>
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      id="from_date"
                      // onChange={(e) =>
                      //   handlepaymentRecordsSearchObjectChange(e, "from_date")
                      // }
                      inputFormat="MM/DD/YYYY"
                      renderInput={(params) => <TextField {...params} />}
                      // value={paymentRecordSearchObj?.from_date}
                      disableFuture={true}
                    />
                  </Stack>
                </LocalizationProvider>

              </div>

            </div>

            <div className="md:flex-1 lg:flex justify-between md:mx-20">

              <div className="mb-4 ml-1 mt-2 flex flex-row w-80">
                <label className="block text-gray-700 text-xs font-bold my-2 mx-4" htmlFor="password">
                  Operator 
                  {/* <p className='contents text-red-600 text-xs font-bold'>*</p> */}
                </label>
                <Select
                  // onChange={(e)=>handleCounterCollectionReport(e,'')}
                  name="operatorName"
                  //  defaultValue={consumerDetail.wardNo}
                  defaultValue={operatorName}
                  label="select"
                  className="pl-2 pr-3 py-2 font-bold text-xs text-gray-900
                        ">
                  {
                    allUserDetailsInputFromAPI?.length > 0 ?
                      (allUserDetailsInputFromAPI.map((item) => {
                        const { id, user_id, employee_name, user_name, designation, is_active } = item
                        return <Option key={id} value={JSON.stringify(item)}>{`${employee_name} - ${user_name} - ${designation}`}</Option>
                      })) : (<Option>Loading...</Option>)
                  }
                </Select>

              </div>

              <div className="mb-4 ml-1 mt-2 flex flex-row w-80">
                <label className="block text-gray-700 text-xs font-bold my-2 mx-4" htmlFor="password">
                  Limit
                  {/* <p className='contents text-red-600 text-xs font-bold'>*</p> */}
                </label>
                <Select
                  // onChange={(e)=>handleCounterCollectionReport(e,'')}
                  name="limit"
                  //  defaultValue={consumerDetail.wardNo}
                  defaultValue={limit}
                  label="select"
                  className="pl-2 pr-3 py-2 font-bold text-xs text-gray-900
                        ">
                  <Option value={null}>Select</Option>

                </Select>

              </div>

            </div>

              <div className="mb-0 ml-2 mr-0  flex flex-row justify-center">
                <button type='button'
                  // onClick={handleSearch}
                  className="w-28 h-8 px-4 py-1 mr-2 ml-2 mb-4 tracking-wide text-white text-xs font-bold transition-colors duration-200 transform bg-blue-400 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-400">
                  View
                </button>
              
              {/* <div className="mb-0 ml-2 mr-0 mt-8">
              <button type='button'
                className="w-32 h-8 px-4 py-1 mr-2 mb-4 tracking-wide text-white text-xs font-bold transition-colors duration-200 transform bg-blue-400 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-400">
                Export To Excel
              </button>
            </div> */}

            </div>
          </div>
        </form>
        <div className="px-0 pt-0 pb-2 m-4 bg-white rounded-none border border-gray-500 lg:max-w-full">
        <div className="flex flex-col">
          {
            displayHindiForm ? <PaymentReceiptHindi setDisplayHindiForm={setDisplayHindiForm}
              setShowModal={setShowModal}
              setShowReceipt={setShowReceipt}
              receiptDetails={receiptDetails} /> :
              <PaymentReceipt
                setShowReceipt={setShowReceipt}
                setDisplayHindiForm={setDisplayHindiForm}
                setShowModal={setShowModal}
                receiptDetails={receiptDetails} />
          }
          {
            displayHindiForm ? <PaymentReceiptHindi setDisplayHindiForm={setDisplayHindiForm}
              setShowModal={setShowModal}
              setShowReceipt={setShowReceipt}
              receiptDetails={receiptDetails} /> :
              <PaymentReceipt
                setShowReceipt={setShowReceipt}
                setDisplayHindiForm={setDisplayHindiForm}
                setShowModal={setShowModal}
                receiptDetails={receiptDetails} />
          }
          {
            displayHindiForm ? <PaymentReceiptHindi setDisplayHindiForm={setDisplayHindiForm}
              setShowModal={setShowModal}
              setShowReceipt={setShowReceipt}
              receiptDetails={receiptDetails} /> :
              <PaymentReceipt
                setShowReceipt={setShowReceipt}
                setDisplayHindiForm={setDisplayHindiForm}
                setShowModal={setShowModal}
                receiptDetails={receiptDetails} />
          }
          {
            displayHindiForm ? <PaymentReceiptHindi setDisplayHindiForm={setDisplayHindiForm}
              setShowModal={setShowModal}
              setShowReceipt={setShowReceipt}
              receiptDetails={receiptDetails} /> :
              <PaymentReceipt
                setShowReceipt={setShowReceipt}
                setDisplayHindiForm={setDisplayHindiForm}
                setShowModal={setShowModal}
                receiptDetails={receiptDetails} />
          }
          {
            displayHindiForm ? <PaymentReceiptHindi setDisplayHindiForm={setDisplayHindiForm}
              setShowModal={setShowModal}
              setShowReceipt={setShowReceipt}
              receiptDetails={receiptDetails} /> :
              <PaymentReceipt
                setShowReceipt={setShowReceipt}
                setDisplayHindiForm={setDisplayHindiForm}
                setShowModal={setShowModal}
                receiptDetails={receiptDetails} />
          }
        </div>
        </div>
        <div className="flex justify-center mb-5">
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={data.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default index;
