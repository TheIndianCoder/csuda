import React, { useEffect } from "react";
import { useMaterialTailwindController } from "../../Dashboard/context/index";
import { useState } from "react";
import { Button, Option, Select } from "@material-tailwind/react";

const WaterWardNumberCollector = ({ heading, SearchFunction }) => {
  const [wardNo, setWardNo] = useState();
  const [controller] = useMaterialTailwindController();
  const { safAllInputFromAPI } = controller;

  const dataLoding = !safAllInputFromAPI || !safAllInputFromAPI.ward;

  const wardOptions = [
    { id: "All", ward_name: "All" },
    ...(safAllInputFromAPI?.ward?.length > 0
      ? safAllInputFromAPI.ward.map((item) => {
          const { id, ward_name } = item;
          return { id, ward_name };
        })
      : []),
  ];

  return (
    <div className="my-8 w-full shadow bg-white rounded-lg">
      <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-lg py-1 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
        <h2 className="text-center text-sm font-semibold text-white">
          {heading}
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
            color="gray"
            onChange={(value) => {
              const selectedWard = JSON.parse(value);
              setWardNo(selectedWard.id);
            }}
          >
            {dataLoding ? (
              <Option>Loading...</Option>
            ) : (
              wardOptions.map((item) => (
                <Option key={item.id} value={JSON.stringify(item)}>
                  {item.ward_name}
                </Option>
              ))
            )}
          </Select>
        </div>

        <Button onClick={() => SearchFunction(wardNo)}>Search</Button>
      </div>
    </div>
  );
};

export default WaterWardNumberCollector;
