import { Option, Select } from "@material-tailwind/react";
import React from "react";
import { TextField } from "@mui/material";
import DetailContainer from "../formPagesAdmin/utils/DetailContainer";

const BhubhatakPersonalDetails = ({AllotteeDetails}) => {
  // pre-rendering all details
  const detailLists = [
    { field: "honorific", header: "Honorific" },
    { field: "name", header: "Allottee Name" },
    { field: "gender", header: "Gender" },
    { field: "guardian_name", header: "Guardian name" },
    { field: "guardian_relation", header: "Relation" },
    { field: "mobile_number", header: "Mobile no" },
    { field: "aadhar_number", header: "Aadhar Number" },
    { field: "email_id", header: "Email Id" },
    { field: "pan_number", header: "PAN No" },
    { field: "consumer_id", header: "Consumer Id" },
  ];

  console.log("AllotteeDetails", AllotteeDetails);

  return (
    <div className="mt-5 shadow">
      <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
        <h2 className="text-center text-sm font-semibold text-white">
          Personal Details
        </h2>
      </nav>
      <DetailContainer
        detailLists={detailLists}
        details={AllotteeDetails}
        title="Personal Details"
      />
    </div>
  );
};

export default BhubhatakPersonalDetails;
