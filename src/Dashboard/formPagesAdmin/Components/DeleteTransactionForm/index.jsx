import { Option, Select, Tooltip } from "@material-tailwind/react";
import React, { useState } from "react";

const index = (handleSubmit) => {
  return (
    <div>  <form
    className="mt-4"
  // onSubmit={handleSAFNewFormSubmission}
  >
    <div
      className="m-4 flex flex-row  rounded-none border  border-gray-500 bg-white px-4 pb-4 pt-0 md:flex-row lg:max-w-full"
    >
      <div className="mb-4 ml-3 mt-2 flex min-w-fit max-w-fit">
        <label
          className=" mb-2  mt-1 block w-[15rem] text-sm font-bold text-gray-700 "
          htmlFor="transaction_no"
        >
          Enter Transaction No.
        </label>
        <Tooltip
          className={`text-black-900 inline w-64 bg-red-300 text-xs 
                     ${true == false ? `` : `hidden`}`}
          placement="top"
          //   content={addExistingConsumerMsgList.validOldConsumerNoMsg}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
        >
          <input
            // onChange={(e) => handleAddExistingCustomerHandler(e, "")}
            name="transaction_no"
            // value={consumerDetail.oldConsumerNo}
            maxLength="10"
            className={`bg-white-200 appearance-none border 
                             ${true == false
                ? `border-red-900`
                : `border-gray-500`
              } text-white-700 w-full rounded px-4 py-2 leading-tight 
                                 focus:border-2 focus:border-blue-500 focus:bg-white focus:outline-none`}
            id="transaction_no"
            type="number"
            placeholder="Enter Transaction No."
          />
        </Tooltip>
      </div>
      <div className="mb-4 ml-3 mt-2 flex min-w-fit max-w-fit">
        <button
          // onClick={handleSubmit}
          className="mx-6 rounded bg-blue-400 px-4 py-1 font-bold text-white hover:bg-blue-700"
          type="button"
        >
          Search
        </button>
      </div>
    </div>
  </form></div>
  )
}

export default index