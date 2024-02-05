import { Option, Select } from "@material-tailwind/react";
import { Stack, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";

const BankDetails = ({ paymentType, paymentDetails, setPaymentDetails }) => {
  return (
    <div className="mt-5 shadow">
      <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
        <h2 className="text-center text-sm font-semibold text-white">
          Bank Details
        </h2>
      </nav>
      {/* FOR CARD PAYMENT */}
      {paymentType === "Card" ? (
        <div className="grid-cols-3 gap-2.5 p-4 lg:grid">
          <div>
            <p className="whitespace-normal px-2 py-2 text-xs font-medium font-semibold text-gray-900">
              Card Type
              <span className="contents text-xs font-bold text-red-600">*</span>
            </p>
            <Select
              label="select"
              className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
              value={paymentDetails?.cardType}
              onChange={(e) =>
                setPaymentDetails({ ...paymentDetails, cardType: e })
              }
            >
              <Option value="Credit Card">Credit Card</Option>
              <Option value="Debit Card">Debit Card</Option>
            </Select>
          </div>
          <div>
            <p className="whitespace-normal px-2 py-2 text-xs font-medium font-semibold text-gray-900">
              Transaction Id
              <span className="contents text-xs font-bold text-red-600">*</span>
            </p>
            <TextField
              value={paymentDetails?.transactionId}
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  transactionId: e.target.value,
                })
              }
            />
          </div>
          <div>
            <p className="whitespace-normal px-2 py-2 text-xs font-medium font-semibold text-gray-900">
              APPR Code
              <span className="contents text-xs font-bold text-red-600">*</span>
            </p>
            <TextField
              value={paymentDetails?.app_code}
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  appr_code: e.target.value,
                })
              }
            />
          </div>
          <div>
            <p className="whitespace-normal px-2 py-2 text-xs font-medium font-semibold text-gray-900">
              Card No.(Last 4 Digits)
              <span className="contents text-xs font-bold text-red-600">*</span>
            </p>
            <TextField
              value={paymentDetails?.cardNo}
              onChange={(e) =>
                setPaymentDetails({ ...paymentDetails, cardNo: e.target.value })
              }
            />
          </div>
          <div>
            <p className="whitespace-normal px-2 py-2 text-xs font-medium font-semibold text-gray-900">
              Card Holder Name
              <span className="contents text-xs font-bold text-red-600">*</span>
            </p>
            <TextField
              value={paymentDetails?.cardHolderName}
              onChange={(e) =>
                setCardDetails({
                  ...paymentDetails,
                  cardHolderName: e.target.value,
                })
              }
            />
          </div>
        </div>
      ) : (
        <div className="grid-cols-3 gap-2.5 p-4 lg:grid">
          {/* FOR CHEQUE/NEFT/RTGS/DD PAYMENT */}
          <div>
            <p className="whitespace-normal px-2 py-2 text-xs font-medium font-semibold text-gray-900">
              Bank Name
              <span className="contents text-xs font-bold text-red-600">*</span>
            </p>
            <TextField
              value={paymentDetails?.bankName}
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  bankName: e.target.value,
                })
              }
            />
          </div>
          <div>
            <p className="whitespace-normal px-2 py-2 text-xs font-medium font-semibold text-gray-900">
              Branch Name
              <span className="contents text-xs font-bold text-red-600">*</span>
            </p>
            <TextField
              value={paymentDetails?.branchName}
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  branchName: e.target.value,
                })
              }
            />
          </div>
          <div>
            <p className="whitespace-normal px-2 py-2 text-xs font-medium font-semibold text-gray-900">
              {paymentType} Number
              <span className="contents text-xs font-bold text-red-600">*</span>
            </p>
            <TextField
              value={paymentDetails?.paymentModeNo}
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  paymentModeNo: e.target.value,
                })
              }
            />
          </div>
          <div>
            <p className="whitespace-normal px-2 py-2 text-xs font-medium font-semibold text-gray-900">
              {paymentType} Date
              <span className="contents text-xs font-bold text-red-600">*</span>
            </p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  inputFormat="MM/DD/YYYY"
                  disableFuture={true}
                  renderInput={(props) => <TextField {...props} />}
                  value={paymentDetails?.paymentModeDate}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      paymentModeDate: e.$d,
                    })
                  }
                />
              </Stack>
            </LocalizationProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankDetails;
