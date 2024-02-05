import { Button } from "@material-tailwind/react";
import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useMaterialTailwindController } from "../../Dashboard/context/index";
import { Option, Select } from "@material-tailwind/react";

const WardNumberCollector = ({
  SearchFunction,
  setWardNo,
  wardNo,
  setoffset,
  title,
}) => {
  const [controller, dispatch] = useMaterialTailwindController();
  const { allUserDetailsInputFromAPI, safAllInputFromAPI } = controller;
  return (
    <div className="my-8 w-full shadow">
      <ToastContainer autoClose={2000} />
      <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
        <h2 className="text-center text-sm font-semibold text-white">
          {title}
        </h2>
      </nav>
      <div className="items-center justify-center gap-4 p-4 md:block lg:flex">
        <div className="flex px-4 py-2">
          <label className="mb-2 flex w-20 pt-2 text-xs font-bold text-gray-700">
            Ward no
            <span className="contents text-sm font-bold text-red-600">*</span>
          </label>
          <Select
            label="select"
            className="z-10 py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
            onChange={(value) => {
              const selectedWard = JSON.parse(value);
              setWardNo(selectedWard.id);
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

        <Button
          onClick={() => {
            if (!wardNo) {
              toast.error("No Ward Number is selected", {
                position: "top-center",
              });
              return;
            }
            setoffset(0);
          }}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default WardNumberCollector;
