import { Button, Chip, Option, Select } from "@material-tailwind/react";
import { Stack, TextField } from "@mui/material";
import {
  DatePicker,
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { useState } from "react";
import BankDetails from "./BankDetailsSections";
import { ColorRing } from "react-loader-spinner";
import { useEffect } from "react";

const paymentModeOptions = ["Cash", "Cheque", "DD", "Card", "NEFT"];

const UpdateChalanForm = ({
  details,
  setDetails,
  paymentDetails,
  setPaymentDetails,
  handleSubmit,
  loading,
  demandDetails,
  setDemandDetails,
}) => {
  const [demandDateOptions, setDemandDateOptions] = useState(null);
  const [selectedDemandYears, setSelectedDemandYears] = useState([]);
  function handleDataFieldChange(e, eId) {
    if (e?.$d) {
      setDetails({ ...details, paymentDate: e.$d });
    } else {
      if (e.target.name === "challan_file") {
        setDetails({ ...details, challan: e.target.files[0] });
      } else {
        setDetails({ ...details, [e.target.name]: e.target.value });
      }
    }
  }

  useEffect(() => {
    if (demandDetails.length !== 0 && demandDetails !== null) {
      let stringArr = [];
      demandDetails.forEach((element) => {
        let startYear = element?.demand_from.substring(0, 4);
        let endYear = element?.demand_upto.substring(0, 4);
        let mergedyear = `${startYear}-${endYear}`;
        stringArr.push(mergedyear);
      });
      setDemandDateOptions(stringArr);
    }
  }, [demandDetails]);

  console.log("demandDateOptions", demandDateOptions);

  function handleDateYears(e) {
    let year = e;
    let startDate = year.substring(0, year.indexOf("-"));
    let endDate = year.substring(year.indexOf("-") + 1, year.length);
    console.log("startDate", startDate);
    console.log("endDate", endDate);
    if (details.demandFrom === "") {
      setDetails({
        ...details,
        demandFrom: startDate,
        demandUpto: endDate,
      });
    } else {
      setDetails({
        ...details,
        demandUpto: endDate,
      });
    }
    setSelectedDemandYears([...selectedDemandYears, year]);
  }

  function handleSubmitButtonPressed() {
    console.log(details);
    setSelectedDemandYears([]);
    handleSubmit();
  }

  return (
    <>
      <div className="mt-5 shadow">
        <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
          <h2 className="text-center text-sm font-semibold text-white">
            Update Challan
          </h2>
        </nav>
        <div className="p-4">
          <div className="grid-cols-3 gap-2.5 lg:grid">
            {/* demand from */}
            <div>
              <p className="whitespace-normal px-2 py-2 text-xs font-medium font-semibold text-gray-900">
                Demand Years
                <span className="contents text-xs font-bold text-red-600">
                  *
                </span>
              </p>
              <Select
                label="select"
                // name="paymentMode"
                value={details.paymentMode}
                onChange={(e) => handleDateYears(e)}
                className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
              >
                {demandDateOptions ? (
                  demandDateOptions.map((demandyears) => {
                    return <Option value={demandyears}>{demandyears}</Option>;
                  })
                ) : (
                  <p>Loading...</p>
                )}
              </Select>
              <div className="my-2 flex-wrap items-center lg:flex">
                {selectedDemandYears.map((yearsSelected) => (
                  <Chip className="mr-2" size="md" value={yearsSelected} />
                ))}
              </div>
            </div>
            {/* Transaction/Receipt Number */}
            <div>
              <p className="whitespace-normal px-2 py-2 text-xs font-medium font-semibold text-gray-900">
                Transaction/Receipt Number
                <span className="contents text-xs font-bold text-red-600">
                  *
                </span>
              </p>
              <TextField
                name="transactionNo"
                value={details.transactionNo}
                onChange={handleDataFieldChange}
              />
            </div>
            {/*Payment Date */}
            <div>
              <p className="whitespace-normal px-2 py-2 text-xs font-medium font-semibold text-gray-900">
                Payment Date
                <span className="contents text-xs font-bold text-red-600">
                  *
                </span>
              </p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    inputFormat="MM/DD/YYYY"
                    disableFuture={true}
                    renderInput={(props) => <TextField {...props} />}
                    value={details.paymentDate}
                    onChange={(e) => handleDataFieldChange(e, "paymentD")}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
            {/* Total Amount */}
            <div>
              <p className="whitespace-normal px-2 py-2 text-xs font-medium font-semibold text-gray-900">
                Total Amount Paid(with GST)
                <span className="contents text-xs font-bold text-red-600">
                  *
                </span>
              </p>
              <TextField
                name="totalPaidAmount"
                value={details.totalPaidAmount}
                onChange={handleDataFieldChange}
                type="number"
              />
            </div>
            {/* Payment Modes */}
            <div>
              <p className="whitespace-normal px-2 py-2 text-xs font-medium font-semibold text-gray-900">
                Payment Mode
                <span className="contents text-xs font-bold text-red-600">
                  *
                </span>
              </p>
              <Select
                label="select"
                name="paymentMode"
                value={details.paymentMode}
                onChange={(e) => setDetails({ ...details, paymentMode: e })}
                className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
              >
                {paymentModeOptions.map((option) => (
                  <Option value={option}>{option}</Option>
                ))}
              </Select>
            </div>
            {/* Remarks*/}
            <div>
              <p className="whitespace-normal px-2 py-2 text-xs font-medium font-semibold text-gray-900">
                Remarks
              </p>
              <TextField
                name="remarks"
                value={details.remarks}
                onChange={handleDataFieldChange}
              />
            </div>
            {/* Upload challan document*/}
            <div>
              <p className="whitespace-normal px-2 py-2 text-xs font-medium font-semibold text-gray-900">
                Upload Challan Document
                <span className="contents text-xs font-bold text-red-600">
                  *
                </span>
              </p>
              <TextField
                name="challan_file"
                onChange={handleDataFieldChange}
                type="file"
                inputProps={{ accept: ".pdf, .jpg, .jpeg, .png" }}
              />
            </div>
          </div>
        </div>
      </div>
      {details.paymentMode !== "Cash" && (
        <BankDetails
          paymentType={details.paymentMode}
          paymentDetails={paymentDetails}
          setPaymentDetails={setPaymentDetails}
        />
      )}

      <div className="mt-8 flex justify-center gap-2.5">
        <Button onClick={handleSubmitButtonPressed} disabled={loading}>
          Update Challan
        </Button>
        {loading && (
          <ColorRing
            visible={true}
            height="40"
            width="40"
            colors={["#2fa158", "#2fa158", "#2fa158", "#2fa158", "#2fa158"]}
          />
        )}
      </div>
    </>
  );
};

export default UpdateChalanForm;
