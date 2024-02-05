import React from 'react'
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Tooltip } from "@material-tailwind/react";

const WardwiseDemandGenerationForm = () => {
  return (
    <div>
      <div className="px-8 py-2">
        <div className="flex-wrap justify-around md:flex-1 lg:flex">
          <div className="">
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
                  id="from_date"
                  onChange={(e) =>
                    handlepaymentRecordsSearchObjectChange(e, "from_date")
                  }
                  inputFormat="MM/DD/YYYY"
                  renderInput={(params) => <TextField {...params} />}
                  // value={paymentRecordSearchObj?.from_date}
                  disableFuture={true}
                />
              </Stack>
            </LocalizationProvider>
          </div>
          <div className="">
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
                  id="to_date"
                  // onChange={(e) =>
                  //   handlepaymentRecordsSearchObjectChange(e, "to_date")
                  // }
                  inputFormat="MM/DD/YYYY"
                  renderInput={(params) => <TextField {...params} />}
                  // value={paymentRecordSearchObj?.to_date}
                  disableFuture={true}
                />
              </Stack>
            </LocalizationProvider>
          </div>
          <div className="">
            <label
              className="mb-2 block text-xs font-bold text-gray-700"
              htmlFor="password"
            >
              Circle Officer
              <p className="contents text-sm font-bold text-red-600">*</p>
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
                name="employee_name"
                // value={consumerDetail.oldConsumerNo}
                maxLength="10"
                className={`bg-white-200 appearance-none border 
                               ${true == false
                    ? `border-red-900`
                    : `border-gray-500`
                  } text-white-700 w-full rounded px-4 py-2 leading-tight 
                                   focus:border-2 focus:border-blue-500 focus:bg-white focus:outline-none`}
                id="employee_name"
                type="text"
                placeholder="Circle Officer"
              />
            </Tooltip>
          </div>
          <div className="">
            <label
              className="mb-2 block text-xs font-bold text-gray-700"
              htmlFor="password"
            >
              Tax Collector
              <p className="contents text-sm font-bold text-red-600">*</p>
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
                name="employee_name"
                // value={consumerDetail.oldConsumerNo}
                maxLength="10"
                className={`bg-white-200 appearance-none border 
                               ${true == false
                    ? `border-red-900`
                    : `border-gray-500`
                  } text-white-700 w-full rounded px-4 py-2 leading-tight 
                                   focus:border-2 focus:border-blue-500 focus:bg-white focus:outline-none`}
                id="employee_name"
                type="text"
                placeholder="Tax Collector"
              />
            </Tooltip>
          </div>
          <div>
            <button
              type="submit"
              className="transform mt-7 bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400 text-white font-bold py-1 px-4"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WardwiseDemandGenerationForm