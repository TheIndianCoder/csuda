import React from "react";

const index = (data) => {
  return (
      <form className="mt-4 ">
        <div className="m-4 rounded-none border border-gray-500 bg-white px-0  pb-4 pt-0 lg:max-w-full">
          <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
            <h2 className="text-center text-sm font-semibold text-white">
              Details of Transaction No. {data.transaction_no? data.transaction_no : 'N/A'}
            </h2>
          </nav>
          <div className="flex w-full flex-col justify-between">
            <div className="mx-2 mt-1 flex flex-row justify-between">
              <div className="mx-2 mt-1 flex flex-row justify-between">
                <label
                  className="mb-2 block text-sm text-gray-700 md:w-32"
                  htmlFor="password"
                >
                  Transaction No.
                </label>
                <span className="text-sm font-semibold text-gray-600">
                  : &nbsp; {data.transaction_no? data.transaction_no : 'N/A'}
                </span>
              </div>
              <div className="mx-2 mt-1 flex flex-row  md:w-1/2">
                <label
                  className="mb-2 block text-sm text-gray-700 md:w-32"
                  htmlFor="password"
                >
                  Transaction Date
                </label>
                <span className="text-sm font-semibold text-gray-600">
                  : &nbsp; {data.transaction_date? data.transaction_date : 'N/A'}
                </span>
              </div>
            </div>
            <hr className="mx-2 mt-1  bg-gray-400" />
            <div className="mx-2 mt-1 flex flex-row justify-between">
              <div className="mx-2 mt-1 flex flex-row justify-between">
                <label
                  className="mb-2 block text-sm text-gray-700 md:w-32"
                  htmlFor="password"
                >
                  Total Paid Amount
                </label>
                <span className="text-sm font-semibold text-gray-600">
                  : &nbsp; {data.payable_amount? data.payable_amount : 'N/A'}
                </span>
              </div>
              <div className="mx-2 mt-1 flex flex-row md:w-1/2">
                <label
                  className="mb-2 block text-sm text-gray-700 md:w-32"
                  htmlFor="password"
                >
                  Payment Mode
                </label>
                <span className="text-sm font-semibold text-gray-600">
                  : &nbsp; {data.payment_mode? data.payment_mode : 'N/A'}
                </span>
              </div>
            </div>
            <hr className="mx-2 mt-1  bg-gray-400" />
            <div className="mx-2 mt-1 flex flex-row justify-between">
              <div className="mx-2 mt-1 flex flex-row justify-between">
                <label
                  className="mb-2 block text-sm text-gray-700 md:w-32"
                  htmlFor="password"
                >
                  Bank Name
                </label>
                <span className="text-sm font-semibold text-gray-600">
                  : &nbsp; {data.bank_name? data.bank_name : 'N/A'}
                </span>
              </div>
              <div className="mx-2 mt-1 flex flex-row md:w-1/2">
                <label
                  className="mb-2 block text-sm text-gray-700 md:w-32"
                  htmlFor="password"
                >
                  Branch Name
                </label>
                <span className="text-sm font-semibold text-gray-600">
                  : &nbsp; {data.branch_name? data.branch_name : 'N/A'}
                </span>
              </div>
            </div>
            <hr className="mx-2 mt-1  bg-gray-400" />
            <div className="mx-2 mt-1 flex flex-row justify-between">
              <div className="mx-2 mt-1 flex flex-row justify-between">
                <label
                  className="mb-2 block text-sm text-gray-700 md:w-32"
                  htmlFor="password"
                >
                  DD/Cheque No.
                </label>
                <span className="text-sm font-semibold text-gray-600">
                  : &nbsp; {data.chq_dd_no? data.chq_dd_no : 'N/A'}
                </span>
              </div>
              <div className="mx-2 mt-1 flex flex-row md:w-1/2">
                <label
                  className="mb-2 block text-sm text-gray-700 md:w-32"
                  htmlFor="password"
                >
                  DD/Cheque Date
                </label>
                <span className="text-sm font-semibold text-gray-600">
                  : &nbsp; {data.chq_dd_dte? data.chq_dd_dte : 'N/A'}
                </span>
              </div>
            </div>
            <hr className="mx-2 mt-1  bg-gray-400" />
            <div className="mx-2 mt-1 flex flex-row justify-between">
              <div className="mx-2 mt-1 flex flex-row justify-between">
                <label
                  className="mb-2 block text-sm text-gray-700 md:w-32"
                  htmlFor="password"
                >
                  Transaction By
                </label>
                <span className="text-sm font-semibold text-gray-600">
                  : &nbsp; {data.consumer_name? data.consumer_name : 'N/A'}
                </span>
              </div>
            </div>
            <hr className="mx-2 mt-1  bg-gray-400" />
            <div className="mx-2 mt-1 flex flex-row">
              <label
                className="mx-2 mb-2 block text-sm text-gray-700 md:w-32"
                htmlFor="password"
              >
                Approval Letter:
              </label>
              <input
                // onChange={handleEmployeePhotoChange}
                className="form-control m-0
                                  rounded
                                  border
                                  border-solid
                                  border-gray-400
                                  bg-white bg-clip-padding 
                                  px-3 py-2 text-xs
                                  font-normal
                                  text-gray-900
                                  transition
                                  ease-in-out
                                  focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                type="file"
                accept="image/*"
                id="approvalLetter"
              />
            </div>
            <hr className="mx-2 mt-1  bg-gray-400" />
            <div className="mx-2 mt-1 flex flex-row">
              <label
                className="mx-2 mb-2 block text-sm text-gray-700 md:w-32"
                htmlFor="password"
              >
                Justification (Min 100 Words):
              </label>
              <textarea
                // onChange={handleEmployeePhotoChange}
                className="form-control m-0 rounded border border-solid border-gray-400 bg-white bg-clip-padding px-3 py-2 text-xs font-normal text-gray-900 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                type="text"
                rows={5}
                cols={100}
                id="justification"
              />
            </div>
            <span className="w-96 text-center text-sm font-semibold text-gray-600">
              Word(s) : 0
            </span>
          </div>
          <div className="my-5 flex flex-row justify-center">
            <button
              className="rounded bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
      </form>
  );
};

export default index;
