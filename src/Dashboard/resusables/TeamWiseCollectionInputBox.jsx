import { TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { useMaterialTailwindController } from "../context";
import { Button, Option, Select } from "@material-tailwind/react";

const TeamWiseCollectionInputBox = () => {
  const [controller, dispatch] = useMaterialTailwindController();

  return (
    <div className="my-8 shadow">
      <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
        <h2 className="text-center text-sm font-semibold text-white">
          Team Wise Collection Summary
        </h2>
      </nav>
      <div className="flex-wrap items-center justify-center gap-12 p-4 md:block lg:flex">
        <div className="flex items-center gap-4">
          <p className="mb-2 block text-xs font-bold text-gray-700">
            Date from{" "}
            <sapn className="contents text-sm font-bold text-red-600">*</sapn>
          </p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              id="dd_date"
              // onChange={handlePaymentTransactionDetailsChange}
              inputFormat="MM/DD/YYYY"
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className="flex items-center gap-4">
          <p className="mb-2 block text-xs font-bold text-gray-700">
            Date to{" "}
            <sapn className="contents text-sm font-bold text-red-600">*</sapn>
          </p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              id="dd_date"
              // onChange={handlePaymentTransactionDetailsChange}
              inputFormat="MM/DD/YYYY"
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className="flex items-center gap-4">
          <p className="mb-2 block text-xs font-bold text-gray-700">
            Circle Officer{" "}
            <sapn className="contents text-sm font-bold text-red-600">*</sapn>
          </p>
          <Select
            label="select"
            className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
          >
            <Option>Hrishikesh Ghosh</Option>
            <Option>Hrishikesh Ghosh</Option>
            <Option>Hrishikesh Ghosh</Option>
            <Option>Hrishikesh Ghosh</Option>
          </Select>
        </div>
        <div className="flex items-center gap-4">
          <p className="mb-2 block text-xs font-bold text-gray-700">
            Tax Collector{" "}
            <sapn className="contents text-sm font-bold text-red-600">*</sapn>
          </p>
          <Select
            label="select"
            className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
          >
            <Option>Hrishikesh Ghosh</Option>
            <Option>Hrishikesh Ghosh</Option>
            <Option>Hrishikesh Ghosh</Option>
            <Option>Hrishikesh Ghosh</Option>
          </Select>
        </div>
      </div>
      <div className="flex justify-center p-4">
        <Button className="w-32">Search</Button>
      </div>
    </div>
  );
};

export default TeamWiseCollectionInputBox;
