import { Option, Select, Tooltip } from "@material-tailwind/react";
import React, { useState } from "react";
import { TextField } from "@mui/material";
import {
  addExistingConsumerMsgList,
  safInputValidatorMsgList,
} from "../data/saf-input-validator-list";
import DetailContainer from "../formPagesAdmin/utils/DetailContainer";


const BhuBhatakLandDetailsForm = ({ LandDetails }) => {
  console.log("LandDetails", LandDetails);

  const landdetailLists = [
    { field: "area_name", header: "Area Name" },
    { field: "ward_number", header: "Ward No" },
    { field: "address", header: "Address" },
    { field: "consumer_number", header: "Consumer No" },
    { field: "registration_date", header: "Registration Date" },
    { field: "usage_type", header: "Usage Type" },
    { field: "plot_area", header: "Plot Area" },
    { field: "bhu_bhatak_rate", header: "Bhu Bhatak Rate" },
    { field: "demand_amount", header: "Demand Amount" },
  ];

  return (
    <div className="mt-5 shadow">
      <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
        <h2 className="text-center text-sm font-semibold text-white">
          Land Details
        </h2>
      </nav>
      <DetailContainer
        detailLists={landdetailLists}
        details={LandDetails}
        title="Land Details"
      />
    </div>
  );
};

export default BhuBhatakLandDetailsForm;
