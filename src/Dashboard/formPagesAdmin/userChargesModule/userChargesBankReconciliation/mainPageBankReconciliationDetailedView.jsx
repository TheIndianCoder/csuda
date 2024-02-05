import React from "react";
import { IconButton, Option, Select } from "@material-tailwind/react";

const MainPageBankReconciliationDetailedView = ({ setIsDetailedViewOpen }) => {
  function NavigateBack() {
    setIsDetailedViewOpen(false);
  }

  return (
    <div>
      {/* first module */}
      <div className="mb-6 mt-2 shadow">
        <nav className="navcustomproperty relative mb-2 flex flex-wrap items-center justify-between rounded-none py-2 pl-2 pr-0 ring-1 ring-black">
          <h2 className="whitespace-normal text-center text-sm text-sm  font-semibold text-gray-900 text-white">
            Bank Details
          </h2>
          <button
            onClick={NavigateBack}
            className="mx-4 my-0 h-8 w-24 transform rounded-md bg-green-400 px-0 py-0 text-sm font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-green-700 focus:bg-green-400 focus:outline-none"
          >
            Back
          </button>
        </nav>
        <div className="p-2">
          <div className="border border-gray-400">
            <div className="border-b border-gray-400 md:block lg:flex">
              <div className="flex border-gray-400 md:w-full  lg:w-1/2 lg:border-r">
                <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Ward no.
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-3/5 px-4 py-2">8</p>
                <div></div>
              </div>
              <div className="flex border-gray-400 md:w-full  lg:w-1/2 ">
                <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Holding no.
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-3/5 px-4 py-2">10989746</p>
                <div></div>
              </div>
            </div>
            <div className="border-b border-gray-400 md:block lg:flex">
              <div className="flex border-gray-400 md:w-full  lg:w-1/2 lg:border-r">
                <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Address
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-3/5 px-4 py-2">
                  Shop no 4n Shouhan town Junwani Bhilai
                </p>
                <div></div>
              </div>
              <div className="flex border-gray-400 md:w-full lg:w-1/2 ">
                <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Police Station
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-3/5 px-4 py-2">10989746</p>
                <div></div>
              </div>
            </div>
            <div className="md:block lg:flex">
              <div className="flex border-gray-400 md:w-full  lg:w-1/2">
                <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  House Flat no
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-3/5 px-4 py-2">NA</p>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* second module */}
      <div className="mb-6 shadow">
        <nav className="navcustomproperty relative mb-2 flex flex-wrap items-center justify-between rounded-none py-2 pl-2 pr-0 ring-1 ring-black">
          <h2 className="whitespace-normal text-center text-sm text-sm font-medium font-semibold font-semibold text-gray-900 text-white">
            Owner Details
          </h2>
        </nav>
        <div className="p-2">
          <div className="border border-gray-400">
            <div className="flex border-b border-gray-400">
              <div className="flex w-full border-r border-gray-400">
                <p className="whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900 md:w-1/2 lg:w-1/5">
                  Owner Name
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="px-4 py-2 md:w-1/2 lg:w-1/5">Rakesh Sharma</p>
                <div></div>
              </div>
            </div>
            <div className="flex border-b border-gray-400">
              <div className="flex w-full border-r border-gray-400">
                <p className="whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900 md:w-1/2 lg:w-1/5">
                  R/W Guardian
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="px-4 py-2 md:w-1/2 lg:w-1/5">W/O</p>
                <div></div>
              </div>
            </div>
            <div className="flex">
              <div className="flex w-full border-r border-gray-400">
                <p className="whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900 md:w-1/2 lg:w-1/5">
                  Guardian's Name
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="px-4 py-2 md:w-1/2 lg:w-1/5">
                  Pradeep Kumar Dwiwedi
                </p>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* third module */}
      <div className="mb-8 mt-2 shadow">
        <nav className="navcustomproperty relative mb-2 flex flex-wrap items-center justify-between rounded-none py-2 pl-2 pr-0 ring-1 ring-black">
          <h2 className="text-center text-sm font-semibold text-white">
            Transaction Details
          </h2>
        </nav>
        <div className="p-2">
          <div className="border border-gray-400">
            <div className="border-b border-gray-400 md:block lg:flex">
              <div className="flex border-gray-400 md:w-full lg:w-1/2 lg:border-r">
                <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Transaction no
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-3/5 px-4 py-2">9871256789</p>
                <div></div>
              </div>
              <div className="flex md:w-full lg:w-1/2">
                <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Transaction Date
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-3/5 px-4 py-2">02-05-2023</p>
                <div></div>
              </div>
            </div>
            <div className="border-b border-gray-400 md:block lg:flex">
              <div className="flex border-r border-gray-400 md:w-full lg:w-1/2">
                <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Paid Amount
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-3/5 px-4 py-2">360.00</p>
                <div></div>
              </div>
              <div className="flex md:w-full lg:w-1/2">
                <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Payment Mode
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-3/5 px-4 py-2">Cheque</p>
                <div></div>
              </div>
            </div>
            <div className="border-b border-gray-400 md:block lg:flex">
              <div className="flex border-r border-gray-400 md:w-full lg:w-1/2">
                <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Bank Name
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-3/5 px-4 py-2">ICICI BANK</p>
                <div></div>
              </div>
              <div className="flex md:w-full lg:w-1/2">
                <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Branch Name
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-3/5 px-4 py-2">Bhilai</p>
                <div></div>
              </div>
            </div>
            <div className="border-b border-gray-400 md:block lg:flex">
              <div className="flex border-r border-gray-400 md:w-full lg:w-1/2">
                <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Cheque no.
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-3/5 px-4 py-2">037895</p>
                <div></div>
              </div>
              <div className="flex md:w-full lg:w-1/2">
                <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Cheque Date
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-3/5 px-4 py-2">02-05-2023</p>
                <div></div>
              </div>
            </div>
            <div className="md:block lg:flex">
              <div className="flex border-r border-gray-400 md:w-full lg:w-1/2">
                <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Clearance Status
                  <span className="contents text-xs font-bold text-red-600">
                    *
                  </span>
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>

                <div className="w-3/5 px-4 py-2">
                  <Select
                    // onChange={(e) =>
                    //   handleReconciliationObjectChange(e, "clearance_type")
                    // }
                    label="select"
                    className={`py-2 pl-2 pr-3 text-sm font-bold text-gray-900`}
                  >
                    <Option value="1">Cleared</Option>
                    <Option value="3">Bounced</Option>
                  </Select>
                </div>
              </div>
              <div className="flex md:w-full lg:w-1/2">
                <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Clearance Date
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-3/5 px-4 py-2">02-05-2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageBankReconciliationDetailedView;
