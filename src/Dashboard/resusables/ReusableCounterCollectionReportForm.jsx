import { Button, Option, Select } from "@material-tailwind/react";
import { TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { useMaterialTailwindController } from "../context";

const ReusableCounterCollectionReportForm = ({ operatorsList, wardsList, callerApiFunction}) => {
const [controller, dispatch]=useMaterialTailwindController()
const { allUserDetailsInputFromAPI, safAllInputFromAPI } = controller;


  return (
    <div className="m-4 mt-4 rounded-none border border-gray-500 bg-white px-0 pb-4 pt-0 lg:max-w-full">
      <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
        <h2 className="text-center text-sm font-semibold text-white">
          Counter Collection Report
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
              // label="Date desktop"
              id="dd_date"
              // onChange={handlePaymentTransactionDetailsChange}
              inputFormat="MM/DD/YYYY"
              renderInput={(params) => <TextField {...params} />}
              // value={paymentTransactionDetails.dd_date}
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
              // label="Date desktop"
              id="dd_date"
              // onChange={handlePaymentTransactionDetailsChange}
              inputFormat="MM/DD/YYYY"
              renderInput={(params) => <TextField {...params} />}
              // value={paymentTransactionDetails.dd_date}
            />
          </LocalizationProvider>
        </div>
        <div className="px-4 py-2">
          <label className="mb-2 block text-xs font-bold text-gray-700">
            Ward no{" "}
            <span className="contents text-sm font-bold text-red-600">*</span>
          </label>
          <Select
            // onChange={handleSearchQueryChange}
            label="select"
            className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
          >
            {safAllInputFromAPI?.ward?.length > 0 ? (
              safAllInputFromAPI.ward.map((item) => {
                const {
                  id,
                  zone_mstr_id,
                  ward_name,
                  area_name,
                  stampdate,
                  user_id,
                  status,
                } = item;
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
        <div className="px-4 py-2">
          <label className="mb-2 block text-xs font-bold text-gray-700">
            Operator no{" "}
            <span className="contents text-sm font-bold text-red-600">*</span>
          </label>
          <Select
            // onChange={handleSearchQueryChange}
            label="select"
            className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
          >
            {allUserDetailsInputFromAPI?.length > 0 ? (
              allUserDetailsInputFromAPI.map((item) => {
                const {
                  id,
                  user_id,
                  employee_name,
                  user_name,
                  designation,
                  is_active,
                } = item;
                return (
                  <Option
                    key={id}
                    value={JSON.stringify(item)}
                  >{`${employee_name} - ${user_name} - ${designation}`}</Option>
                );
              })
            ) : (
              <Option>Loading...</Option>
            )}
          </Select>
        </div>
      </div>
      <div className="justify-center p-4 lg:flex">
        <Button>Search</Button>
      </div>
    </div>
  );
};

export default ReusableCounterCollectionReportForm;
