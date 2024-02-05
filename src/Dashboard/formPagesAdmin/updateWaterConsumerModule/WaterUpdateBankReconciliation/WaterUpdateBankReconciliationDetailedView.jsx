import React from "react";
import { IconButton, Option, Select } from "@material-tailwind/react";

const WaterUpdateBankReconciliationDetailedView = ({
  setIsDetailedViewOpen,
  details,
  setClearStatus,
  module,
}) => {
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
            <div className="flex border-b border-gray-400">
              <div className="flex w-1/2 border-r border-gray-400">
                <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Ward no.
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-3/5 px-4 py-2">
                  {module === "WASTE" ? details?.ward_no : details?.ward_name}
                </p>
                <div></div>
              </div>
              <div className="flex w-1/2">
                <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Holding no.
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-3/5 px-4 py-2">{details?.holding_no}</p>
                <div></div>
              </div>
            </div>
            <div className="flex border-b border-gray-400">
              <div className="flex w-1/2 border-r border-gray-400">
                <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Address
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-3/5 px-4 py-2">
                  {details?.address || details?.property_address}
                </p>
                <div></div>
              </div>
              {module === "WASTE" && (
                <div className="flex w-1/2">
                  <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                    Police Station
                  </p>
                  <span className="border-r border-gray-400 px-4 py-2 font-bold">
                    :
                  </span>
                  <p className="w-3/5 px-4 py-2">{details?.police_station}</p>
                  <div></div>
                </div>
              )}
            </div>
            {module === "WASTE" && (
              <div className="flex">
                <div className="flex w-1/2 border-r border-gray-400">
                  <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                    House Flat no
                  </p>
                  <span className="border-r border-gray-400 px-4 py-2 font-bold">
                    :
                  </span>
                  <p className="w-3/5 px-4 py-2">{details?.house_flat_no}</p>
                  <div></div>
                </div>

                <div className="flex w-1/2">
                  <p className="w-2/5 border-r border-gray-400 px-4 py-2"></p>
                  <span className="border-r border-gray-400 px-4 py-2 font-bold"></span>
                  <p className="w-3/5 px-4 py-2"></p>
                  <div></div>
                </div>
              </div>
            )}
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
                <p className="w-1/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Owner Name
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-4/5 px-4 py-2">{details?.consumer_name}</p>
                <div></div>
              </div>
            </div>
            <div className="flex border-b border-gray-400">
              <div className="flex w-full border-r border-gray-400">
                <p className="w-1/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  R/W Guardian
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-4/5 px-4 py-2">{details?.relation}</p>
                <div></div>
              </div>
            </div>
            <div className="flex">
              <div className="flex w-full border-r border-gray-400">
                <p className="w-1/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Guardian's Name
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-4/5 px-4 py-2">
                  {details?.guardian_name || details?.gradian_name}
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
            <div className="flex border-b border-gray-400">
              <div className="flex w-1/2 border-r border-gray-400">
                <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Transaction no
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-3/5 px-4 py-2">{details?.transaction_no}</p>
                <div></div>
              </div>
              <div className="flex w-1/2">
                <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Transaction Date
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-3/5 px-4 py-2">{details?.transaction_date}</p>
                <div></div>
              </div>
            </div>
            <div className="flex border-b border-gray-400">
              <div className="flex w-1/2 border-r border-gray-400">
                <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Paid Amount
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-3/5 px-4 py-2">
                  {details?.payable_amt || details?.payable_amount}
                </p>
                <div></div>
              </div>
              <div className="flex w-1/2">
                <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Payment Mode
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-3/5 px-4 py-2">{details?.payment_mode}</p>
                <div></div>
              </div>
            </div>
            <div className="flex border-b border-gray-400">
              <div className="flex w-1/2 border-r border-gray-400">
                <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Bank Name
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-3/5 px-4 py-2">{details?.bank_name}</p>
                <div></div>
              </div>
              <div className="flex w-1/2">
                <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Branch Name
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-3/5 px-4 py-2">{details?.branch_name}</p>
                <div></div>
              </div>
            </div>
            <div className="flex border-b border-gray-400">
              <div className="flex w-1/2 border-r border-gray-400">
                <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Cheque no.
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-3/5 px-4 py-2">
                  {details?.cheque_no || details?.chq_dd_no}
                </p>
                <div></div>
              </div>
              <div className="flex w-1/2">
                <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Cheque Date
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-3/5 px-4 py-2">
                  {details?.cheque_date || details?.chq_dd_dte}
                </p>
                <div></div>
              </div>
            </div>
            <div className="flex">
              <div className="flex w-1/2 border-r border-gray-400">
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
                    onChange={(e) => setClearStatus(e)}
                    label="select"
                    className={`py-2 pl-2 pr-3 text-sm font-bold text-gray-900`}
                  >
                    <Option value="clear">Cleared</Option>
                    <Option value="bounce">Bounced</Option>
                  </Select>
                </div>
              </div>
              <div className="flex w-1/2">
                <p className="w-2/5 whitespace-normal border-r border-gray-400 px-4 py-2 text-sm font-medium font-semibold text-gray-900">
                  Clearance Date
                </p>
                <span className="border-r border-gray-400 px-4 py-2 font-bold">
                  :
                </span>
                <p className="w-3/5 px-4 py-2">{details?.cleared_stampdate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterUpdateBankReconciliationDetailedView;
