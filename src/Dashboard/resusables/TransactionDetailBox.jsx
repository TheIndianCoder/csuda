import React, { useState, useEffect } from "react";
import UserChargesDetailsList from "../formPagesAdmin/userChargesModule/userChargesUpdatePaymentMode/DetailsJson";
import { Button, Option, Select } from "@material-tailwind/react";
import { TextField } from "@mui/material";
import { setPaymentModeDetailsInputFromAPI, useMaterialTailwindController } from "@/Dashboard/context";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const TransactionDetailBox = ({
  transactionId,
  details,
  setPaymentMode,
  paymentMode,
  setPaymentOptions,
  paymentOptions,
  featureType,
}) => {
  const [controller, dispatch] = useMaterialTailwindController();
  const [bankname, setbankname] = useState("")
  const { paymentModeDetailsInputFromAPI } = controller;

  useEffect(() => {
    console.log(details?.payment_mode.toLowerCase(),"detail")
    setPaymentMode(details?.payment_mode.toLowerCase());
  }, [details]);

  useEffect(()=>{
    console.log("bankkkkk-",paymentOptions)
  },[paymentOptions.bankName])

  function bankNameChange(e){
    let connItem = JSON.parse(e);
    console.log(connItem?.bank_name, e)
    setbankname(connItem?.bank_name)
  }
  function handlePaymentModeChange(e) {
    setPaymentMode(e);
  }

  function handlePaymentOptions(e) {
   
    //if(e.target.name === "bank_name")

    setPaymentOptions({ ...paymentOptions, [e.target.name]: e.target.value });
  }

  useEffect(()=>{
    console.log("details",details)
  },[details])
  useEffect(() => {
    
    if (details) {
      if (featureType === 0) {
        setPaymentOptions({
          ...paymentOptions,
          // bankName: details?.bank_name ? details?.bank_name : "",
          bankName: bankname ? bankname : "",
          branchName: details?.branch_name ? details?.branch_name : "",
          chqDdNo: details?.chq_dd_no ? details?.chq_dd_no : "",
          chqDdDte: details?.chq_dd_dte ? details?.chq_dd_dte : "",
          cardType: details?.card_type ? details?.card_type : "",
          cardNo: details?.card_no ? details?.card_no : "",
          cardHolderName: details?.card_holder_name
            ? details?.card_holder_name
            : "",
        });
      } else {
        setPaymentOptions({
          ...paymentOptions,
          // bankName: details?.bank_name ? details?.bank_name : "",
          bankName: bankname ? bankname : "",
          branchName: details?.branch_name ? details?.branch_name : "",
          chequeNo: details?.cheque_no ? details?.cheque_no : "",
          chequeDate: details?.cheque_date ? details?.cheque_date : "",
          cardType: details?.card_type ? details?.card_type : "",
          cardNo: details?.card_no ? details?.card_no : "",
          cardHolderName: details?.card_holder_name
            ? details?.card_holder_name
            : "",
        });
      }
    }
  }, [details, featureType,bankname]);

  console.log("paymentOptions", paymentOptions);

  return (
    <>
      <div className="m-auto mt-6 w-full rounded-none border border-gray-500 bg-white px-0 pb-4 pt-0 lg:max-w-full">
        <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-2 pl-2 pr-0 ring-1 ring-black">
          <h2 className="text-center text-sm font-semibold text-white">
            Details of Transaction No. {transactionId}
          </h2>
        </nav>
        <div className="[&>*:nth-child(even)]:bg-blue-gray-50">
          <div className="flex w-full flex-wrap justify-between align-middle">
            <div className="flex gap-2.5 p-4 md:w-full lg:w-1/2">
              <p className="w-2/5 whitespace-normal text-sm font-medium font-semibold text-blue-gray-800">
                Consumer No
              </p>
              <span>:</span>
              <p className="w-3/5 whitespace-normal text-sm font-medium font-semibold text-blue-gray-800">
                {details?.consumerid}
              </p>
            </div>
            <div className="flex gap-2.5 p-4 md:w-full lg:w-1/2">
              <p className="w-2/5 whitespace-normal text-sm font-medium font-semibold text-blue-gray-800">
                Ward No
              </p>
              <span>:</span>
              <p className="w-3/5 whitespace-normal text-sm font-medium font-semibold text-blue-gray-800">
                {" "}
                {details?.ward_no || details?.ward_id}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-wrap justify-between align-middle">
            <div className="flex gap-2.5 p-4 md:w-full lg:w-1/2">
              <p className="w-2/5 whitespace-normal text-sm font-medium font-semibold text-blue-gray-800">
                Owner Name
              </p>
              <span>:</span>
              <p className="w-3/5 whitespace-normal text-sm font-medium font-semibold text-blue-gray-800">
                {details?.consumer_name}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-wrap justify-between align-middle">
            <div className="flex gap-2.5 p-4 md:w-full lg:w-1/2">
              <p className="w-2/5 whitespace-normal text-sm font-medium font-semibold text-blue-gray-800">
                Address
              </p>
              <span>:</span>
              <p className="w-3/5 whitespace-normal text-sm font-medium font-semibold text-blue-gray-800">
                {details?.address || details?.property_address}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-wrap justify-between align-middle">
            <div className="flex gap-2.5 p-4 md:w-full lg:w-1/2">
              <p className="w-2/5 whitespace-normal text-sm font-medium font-semibold text-blue-gray-800">
                Transaction No
              </p>
              <span>:</span>
              <p className="w-3/5 whitespace-normal text-sm font-medium font-semibold text-blue-gray-800">
                {details?.transaction_no}
              </p>
            </div>
            <div className="flex gap-2.5 p-4 md:w-full lg:w-1/2">
              <p className="w-2/5 whitespace-normal text-sm font-medium font-semibold text-blue-gray-800">
                Transaction Date
              </p>
              <span>:</span>
              <p className="w-3/5 whitespace-normal text-sm font-medium font-semibold text-blue-gray-800">
                {details?.transaction_date}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-wrap justify-between align-middle">
            <div className="flex gap-2.5 p-4 md:w-full lg:w-1/2">
              <p className="w-2/5 whitespace-normal text-sm font-medium font-semibold text-blue-gray-800">
                Transaction Amount
              </p>
              <span>:</span>
              <p className="w-3/5 whitespace-normal text-sm font-medium font-semibold text-blue-gray-800">
                {" "}
                {details?.payable_amt || details?.payable_amount}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-wrap justify-between align-middle">
            <div className="flex gap-2.5 p-4 md:w-full lg:w-1/2">
              <p className="w-2/5 whitespace-normal text-sm font-medium font-semibold text-blue-gray-800">
                Transaction By
              </p>
              <span>:</span>
              <p className="w-3/5 whitespace-normal text-sm font-medium font-semibold text-blue-gray-800">
                {" "}
                {details?.name || details?.user_name}
              </p>
            </div>
            <div className="flex gap-2.5 p-4 md:w-full lg:w-1/2">
              <p className="w-2/5 whitespace-normal text-sm font-medium font-semibold text-blue-gray-800">
                Transaction Mode
              </p>
              <span>:</span>
              <div>
                <Select
                  label="select"
                  className=" py-2 pl-2 pr-3 text-xs
                font-bold text-gray-900"
                  value={paymentMode}
                  onChange={handlePaymentModeChange}
                >
                  {paymentModeDetailsInputFromAPI?.length > 0 ? (
                    paymentModeDetailsInputFromAPI[0]?.modeOfPaymentBeans.map(
                      (item, index) => {
                        const { id, mode_of_payment, status } = item;
                        return (
                          <Option
                            key={index}
                            value={mode_of_payment.toLowerCase()}
                          >
                            {mode_of_payment}
                          </Option>
                        );
                      }
                    )
                  ) : (
                    <Option>Loading...</Option>
                  )}
                </Select>
                <p className="font-small my-5 whitespace-normal text-xs font-semibold text-blue-gray-800">
                  Current Payment mode:{" "}
                  <span className="font-small whitespace-normal  text-xs font-semibold capitalize text-red-600">
                    {paymentMode}
                  </span>
                </p>
              </div>
            </div>
            {paymentMode === "cash" && (
              <div className="flex gap-2.5 p-4 md:w-full lg:w-1/2">
                <p className="w-2/5 whitespace-normal text-sm font-medium font-semibold text-blue-gray-800">
                  Narration
                </p>
                <span>:</span>
                <div>
                  <TextField
                    name="narration"
                    value={paymentOptions.narration}
                    onChange={handlePaymentOptions}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {paymentMode !== "cash" && (
        <div className="mt-5 shadow">
          <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-2 pl-2 pr-0 ring-1 ring-black">
            <h2 className="text-center text-sm font-semibold text-white">
              Payment Mode Options
            </h2>
          </nav>
          {paymentMode === "card" ? (
            <div className="grid grid-cols-2 gap-3 p-4">
              <div className="flex items-center gap-2.5">
                <p className="whitespace-nowrap text-sm font-medium font-semibold text-blue-gray-800">
                  Card Type<span className="mx-2 text-red-600">*</span>
                </p>
                <span>:</span>
                <Select
                  name="cardType"
                  value={paymentOptions.cardType}
                  onChange={(e) =>
                    setPaymentOptions({ ...paymentOptions, cardType: e })
                  }
                  label="select"
                  className=" py-2 pl-2 pr-3 text-xs
                font-bold text-gray-900"
                >
                  <Option value="credit card">Credit Card</Option>
                  <Option value="debit card">Debit Card</Option>
                </Select>
              </div>
              <div className="flex items-center gap-2.5">
                <p className="whitespace-normal text-sm font-medium font-semibold text-blue-gray-800">
                  Card No.<span className="mx-2 text-red-600">*</span>
                </p>
                <span>:</span>
                <TextField
                  name="cardNo"
                  value={paymentOptions.cardNo}
                  onChange={handlePaymentOptions}
                />
              </div>
              <div className="flex items-center gap-2.5">
                <p className="whitespace-normal text-sm font-medium font-semibold text-blue-gray-800">
                  Card Holder Name<span className="mx-2 text-red-600">*</span>
                </p>
                <span>:</span>
                <TextField
                  name="cardHolderName"
                  value={paymentOptions.cardHolderName}
                  onChange={handlePaymentOptions}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 p-4">
              <div className="flex items-center gap-2.5">
                <p className="whitespace-normal text-sm font-medium font-semibold text-blue-gray-800">
                  Bank Name<span className="mx-2 text-red-600">*</span>
                </p>
                <span>:</span>
                <Select
                            name="bankName"
                            defaultValue={paymentOptions.bankName}
                            onChange={bankNameChange} 
                            label="select"
                            className="w-full py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
                          >
                            {setPaymentModeDetailsInputFromAPI?.length > 0 ? (
                              paymentModeDetailsInputFromAPI[0]?.bankNameBeans.map(
                                (item, index) => {
                                  const { id, bank_name } = item;
                                  return (
                                    <Option
                                      key={index}
                                      value={JSON.stringify(item)}
                                    >
                                      {bank_name}
                                    </Option>
                                  );
                                }
                              )
                            ) : (
                              <Option>Loading...</Option>
                            )}
                          </Select>
                {/* <TextField
                  name="bankName"
                  value={paymentOptions.bankName}
                  onChange={handlePaymentOptions} 
                /> */}
              </div>
              <div className="flex items-center gap-2.5">
                <p className="whitespace-normal text-sm font-medium font-semibold text-blue-gray-800">
                  Branch Name<span className="mx-2 text-red-600">*</span>
                </p>
                <span>:</span>
                <TextField
                  name="branchName"
                  value={paymentOptions.branchName}
                  onChange={handlePaymentOptions}
                />
              </div>
              <div className="flex items-center gap-2.5">
                <p className="whitespace-normal text-sm font-medium font-semibold capitalize text-blue-gray-800">
                  {paymentMode} Number
                  <span className="mx-2 text-red-600">*</span>
                </p>
                <span>:</span>
                <TextField
                  type="number"
                  name={featureType === 0 ? "chqDdNo" : "chequeNo"}
                  value={
                    featureType === 0
                      ? paymentOptions.chqDdNo
                      : paymentOptions.chequeNo
                  }
                  onChange={handlePaymentOptions}
                />
              </div>
              <div className="flex items-center gap-2.5">
                <p className="whitespace-normal text-sm font-medium font-semibold capitalize text-blue-gray-800">
                  {paymentMode} Date<span className="mx-2 text-red-600">*</span>
                </p>
                <span>:</span>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    name="payment_date"
                    id="payment_date"
                    inputFormat="YYYY-MM-DD"
                    renderInput={(params) => <TextField {...params} />}
                    disableFuture={true}
                    value={
                      featureType === 0
                        ? paymentOptions.chqDdDte
                        : paymentOptions.chequeDate
                    }
                    onChange={(e) => {
                      if (featureType === 0) {
                        setPaymentOptions({
                          ...paymentOptions,
                          chqDdDte: e.$d,
                        });
                      } else {
                        setPaymentOptions({
                          ...paymentOptions,
                          chequeDate: e.$d,
                        });
                      }
                    }}
                    // value={viewAndPayDetails.payment_date}
                  />
                </LocalizationProvider>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TransactionDetailBox;
