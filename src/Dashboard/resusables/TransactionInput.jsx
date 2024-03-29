import { Button } from "@material-tailwind/react";
import { Typography } from "@mui/material";
import React, { useState } from "react";

const TransactionInput = ({ handleSearchFunction, setTransactionId}) => {
  return (
    <div className="w-full shadow bg-white rounded-lg">
      <nav className="navcustomproperty relative mb-2 flex flex-wrap items-center justify-between rounded-lg py-2 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
        <h2 className="text-center text-sm font-semibold text-white">
          Enter Transaction Details
        </h2>
      </nav>
      <div className="lg:flex md:items-center p-8 gap-3.5">
        {" "}
        <p className="font-bold text-gray-800">
          Enter Transaction no.
        </p>
        <input
          className="focus:shadow-outline appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none focus:outline-gray-800"
          onChange={(e) => setTransactionId(e.target.value)}
        />
        <Button onClick={handleSearchFunction}>Search</Button>
      </div>
    </div>
  );
};

export default TransactionInput;
