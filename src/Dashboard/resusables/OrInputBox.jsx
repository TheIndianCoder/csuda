import { Button, Option, Select } from "@material-tailwind/react";
import { TextField } from "@mui/material";
import React from "react";
import { ColorRing, TailSpin } from "react-loader-spinner";
import { wardData } from "../formPagesAdmin/utils/common";

const OrInputBox = ({
  setUserInput,
  userInput,
  handleSearch,
  isloading,
  isDisabled,
}) => {
  function handleOnchangeEvent(e) {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  }

  return (
    <div className="mt-5 shadow">
      <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
        <h2 className="text-center text-sm font-semibold text-white">
          Search Consumer
        </h2>
      </nav>
      <div className="flex-col flex-wrap items-center justify-between p-4 sm:block lg:flex">
        <div className="block">
          <p className="whitespace-normal px-2 py-2 text-xs font-medium font-semibold text-gray-900">
            Ward no.
          </p>
          <Select
            onChange={(e) => setUserInput({ ...userInput, wardNo: e })}
            name="wardNo"
            label="select"
            className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
          >
            {wardData.length > 0 ? (
              wardData.map((item) => {
                const {
                  id,
                  zone_mstr_id,
                  ward_name,
                  area_name,
                  stampdate,
                  user_id,
                  status,
                } = item;
                return <Option key={id} value={id}>{`${ward_name}`}</Option>;
              })
            ) : (
              <Option>Loading...</Option>
            )}
          </Select>
        </div>
        <span class="mt-1 text-center text-xs font-semibold text-red-600">
          OR
        </span>

        <div className="block">
          <p className="whitespace-normal px-2 py-2 text-xs font-medium font-semibold text-gray-900">
            Lease no.
          </p>
          <TextField name="leaseNo" onChange={handleOnchangeEvent} />
        </div>
        <span class="mt-1 text-center text-xs font-semibold text-red-600">
          OR
        </span>
        <div className="block">
          <p className="whitespace-normal px-2 py-2 text-xs font-medium font-semibold text-gray-900">
            Mobile no.
          </p>
          <TextField name="mobileNo" onChange={handleOnchangeEvent} />
        </div>
        <span class="mt-1 text-center text-xs font-semibold text-red-600">
          OR
        </span>
        <div className="block">
          <p className="whitespace-normal px-2 py-2 text-xs font-medium font-semibold text-gray-900">
            Name
          </p>
          <TextField name="name" onChange={handleOnchangeEvent} />
        </div>
      </div>
      <div className="flex justify-center gap-2 p-3">
        <Button
          onClick={handleSearch}
          disabled={isloading || isDisabled}
          className={`${isDisabled ? `cursor-not-allowed ` : `cursor-pointer`}`}
        >
          Search Consumer
        </Button>
        {isloading && (
          <ColorRing
            visible={true}
            height="40"
            width="40"
            colors={["#2fa158", "#2fa158", "#2fa158", "#2fa158", "#2fa158"]}
          />
        )}
      </div>
    </div>
  );
};

export default OrInputBox;
