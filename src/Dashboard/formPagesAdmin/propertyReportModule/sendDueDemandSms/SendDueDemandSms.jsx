import { ExportToExcel } from "@/utils/commonComponents";
import React, { useState } from "react";
import { Button, Option, Select } from "@material-tailwind/react";
import BankReconciliationTable from "@/Dashboard/resusables/BankReconciliationTable";
import { useMaterialTailwindController } from "../../../../Dashboard/context/index";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const tableHeadings = [
  "Sl No.",
  "Property No.",
  "Owner Name",
  "Mobile No.",
  "Demand Amount",
];

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const sendDueDemandSms = () => {
  const [controller, dispatch] = useMaterialTailwindController();
  const { allUserDetailsInputFromAPI, safAllInputFromAPI } = controller;
  const [isLoading, setIsLoading] = useState(false);

  const [inputData, setInputData] = useState({
    wardId: "",
  });
  const [sendDueDemandSmsReport, setSendDueDemandSmsReport] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);

  async function sendDueDemandSmsRequest(offset) {
    setIsLoading(true);

    const requestData = {
      reportIdentifier: "public_SendDueDemandSMS",
      params: {
        wardId: inputData.wardId,
      },
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
              property_no: data.property_no,
              owner_name: data.owner_name,
              mobile_no: data.mobile_no,
              demand_amount: data.demand_amount,
            });
          });
          setSendDueDemandSmsReport(restructeredData);
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
      sendDueDemandSmsRequest(currentPage * itemsPerPage);
    }
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    sendDueDemandSmsRequest(currentPage * itemsPerPage);
  };

  return (
    <div className="relative mb-10 mt-10 flex min-h-screen flex-col justify-center overflow-hidden">
      <ToastContainer autoClose={2000} />
      <div className="m-auto min-h-screen w-full rounded-none bg-white px-0 pb-4 pt-0 lg:max-w-full">
        <form className="mt-4">
          <div className="m-4 mt-4 rounded-none border border-gray-500 bg-white px-0 pb-2 pt-0 lg:max-w-full">
            <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
              <h2 className="text-center text-sm font-semibold text-white">
                Send SMS Due Demand
              </h2>
            </nav>

            <div className="-mt-2 min-w-fit max-w-fit flex-wrap items-end md:flex-1 lg:flex">
              <div className="flex px-4 py-2">
                <label className="mb-2 mt-2 flex w-24 text-xs font-bold text-gray-700">
                  Ward no
                  <span className="contents text-sm font-bold text-red-600">
                    *
                  </span>
                </label>
                <Select
                  label="select"
                  className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
                  onChange={(value) => {
                    const selectedWard = JSON.parse(value);
                    setInputData({
                      ...inputData,
                      wardId: selectedWard.id,
                    });
                  }}
                >
                  {safAllInputFromAPI?.ward?.length > 0 ? (
                    safAllInputFromAPI.ward.map((item) => {
                      const { id, ward_name } = item;
                      return (
                        <Option key={id} value={JSON.stringify(item)}>
                          {ward_name}
                        </Option>
                      );
                    })
                  ) : (
                    <Option>Loading...</Option>
                  )}
                </Select>
              </div>

              <div className="justify-center p-4 lg:flex">
                <Button
                  onClick={() => {
                    console.log(inputData);
                    if (inputData.wardId != "") {
                      sendDueDemandSmsRequest();
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
        </form>
        {isLoading ? (
          <p className="flex justify-center pt-20 text-2xl">Loading...</p>
        ) : !isLoading && sendDueDemandSmsReport.length > 0 ? (
          <div className="m-4 rounded-none border border-gray-500 bg-white px-0 pb-2 pt-0 lg:max-w-full">
            <table className="container mt-5 min-w-full table-auto overflow-x-scroll text-left">
              <thead className="table-header flex flex-col border-t">
                <tr className="flex min-w-full flex-col justify-evenly border border-gray-300 md:flex-row">
                  <th className="border-r pt-5 text-xs font-bold uppercase text-green-700 md:w-1/4">
                    {/* Total Property: 3 */}
                  </th>
                  <th className="border-r pt-5 text-xs font-bold uppercase text-green-700 md:w-2/5">
                    {/* Total Demand: 1,57,267 */}
                  </th>
                  <th>
                    <div className="m-auto min-w-fit max-w-fit items-center md:flex-1 lg:flex">
                      <div className="mb-0 ml-2 mr-0 min-w-fit max-w-fit">
                        <button
                          type="button"
                          className="ml-2 mr-2 h-8 transform rounded-md bg-green-500 px-4 py-1 text-sm font-bold tracking-wide text-white transition-colors duration-200 hover:bg-green-500 focus:bg-green-400 focus:outline-none"
                        >
                          Send Message
                        </button>
                      </div>
                      <div className="mb-0 ml-2 mr-0 min-w-fit max-w-fit ">
                        <ExportToExcel
                          excelData={sendDueDemandSmsReport}
                          filaName={`sendDueDemandSmsReport`}
                          btnText={`Export to Excel`}
                        />
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>

              <BankReconciliationTable
                tableHeadings={tableHeadings}
                tableRows={sendDueDemandSmsReport}
              />
            </table>
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
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default sendDueDemandSms;
