import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Select, Option, Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useMaterialTailwindController } from "../context";
import { toast, ToastContainer } from "react-toastify";
import { ColorRing } from "react-loader-spinner";

const BankReconciliationForm = ({
  callDesignatedSearchApiFunction,
  searchLoading,
}) => {
  const [paymentRecordSearchObj, setPaymentRecordSearchObj] = useState({
    fromDate: "",
    paymentMode: "",
    toDate: "",
  });
  const [controller, dispatch] = useMaterialTailwindController();
  const { paymentModeDetailsInputFromAPI } = controller;

  function handlepaymentRecordsSearchObjectChange(event, eventId) {
    if (event?.$d) {
      if (eventId === "fromDate") {
        setPaymentRecordSearchObj((prevState) => {
          return { ...prevState, fromDate: event.$d };
        });
      } else if (eventId === "toDate") {
        setPaymentRecordSearchObj((prevState) => {
          return { ...prevState, toDate: event.$d };
        });
      }
    } else if (event?.toString().includes("mode_of_payment")) {
      let eventItem = JSON.parse(event);
      setPaymentRecordSearchObj((prevState) => {
        return {
          ...prevState,
          paymentMode: eventItem.mode_of_payment,
        };
      });
    }
  }

  async function handleSearch() {
    const { fromDate, paymentMode, toDate } = paymentRecordSearchObj;
    if (fromDate === "" || paymentMode === "" || toDate === "")
      toast.error("Please fill mandetory fields!", {
        position: toast.POSITION.TOP_CENTER,
      });
    else await callDesignatedSearchApiFunction(paymentRecordSearchObj);
  }

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="m-4 mt-4 rounded-none border border-gray-500 bg-white px-0 pb-4 pt-0 lg:max-w-full">
        <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
          <h2 className="text-center text-sm font-semibold text-white">
            Search Payment Details 
          </h2>
        </nav>
        <div className="px-8 py-2">
          <div className="flex-wrap justify-center md:flex-1 lg:flex">
            <div className="md:w-full lg:w-[33.3%]">
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
                    id="fromDate"
                    onChange={(e) =>
                      handlepaymentRecordsSearchObjectChange(e, "fromDate")
                    }
                    inputFormat="MM/DD/YYYY"
                    renderInput={(params) => <TextField {...params} />}
                    value={paymentRecordSearchObj?.fromDate}
                    disableFuture={true}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
            <div className="w-[33.3%]">
              <label
                className="mb-2 block text-xs font-bold text-gray-700"
                htmlFor="password"
              >
                Date Till
                <p className="contents text-sm font-bold text-red-600">*</p>
              </label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    id="toDate"
                    onChange={(e) =>
                      handlepaymentRecordsSearchObjectChange(e, "toDate")
                    }
                    inputFormat="MM/DD/YYYY"
                    renderInput={(params) => <TextField {...params} />}
                    value={paymentRecordSearchObj?.toDate}
                    disableFuture={true}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
            <div className="w-[33.3%]">
              <label
                className="mb-2 block text-xs font-bold text-gray-700"
                htmlFor="password"
              >
                Payment Mode
                <p className="contents text-sm font-bold text-red-600">*</p>
              </label>
              <Select
                onChange={handlepaymentRecordsSearchObjectChange}
                label="select"
                className={`py-2 pl-2 pr-3 text-xs font-bold text-gray-900`}
              >
                {paymentModeDetailsInputFromAPI?.length > 0 ? (
                  paymentModeDetailsInputFromAPI[0]?.modeOfPaymentBeans.map(
                    (item, index) => {
                      const { id, mode_of_payment, status } = item;
                      return (
                        <Option key={index + 1} value={JSON.stringify(item)}>
                          {mode_of_payment}
                        </Option>
                      );
                    }
                  )
                ) : (
                  <Option>Loading...</Option>
                )}
              </Select>
            </div>
          </div>
        </div>
        <div className="m-auto min-w-fit max-w-fit items-end md:flex-1 lg:flex">
          <div className="mb-0 ml-3 mr-4 mt-4 flex min-w-fit max-w-fit items-center gap-2">
            <Button
              type="button"
              onClick={handleSearch}
              disabled={searchLoading ? true : false}
              className="mx-4 h-8 w-36 transform rounded-md bg-green-400 px-4 py-1 tracking-wide text-white transition-colors duration-200 hover:bg-green-700 focus:bg-green-400 focus:outline-none"
            >
              Search
            </Button>
            {searchLoading && (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                colors={["#2fa158", "#2fa158", "#2fa158", "#2fa158", "#2fa158"]}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BankReconciliationForm;
