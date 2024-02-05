import React from "react";
import TransactionInput from "@/Dashboard/resusables/TransactionInput";
import { useState, useEffect } from "react";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/solid";
import TransactionDetailBox from "@/Dashboard/resusables/TransactionDetailBox";
import { getCookieByName } from "@/utils/RequireAuth";
import { Button } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
const SUDA_API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const initialPaymentOptions = {
  chqDdNo: "",
  chqDdDte: "",
  bankName: "",
  branchName: "",
  cardType: "",
  cardNo: "",
  cardHolderName: "",
  narration: "",
};

const MainPageWaterUpdatePaymentMode = () => {
  const [transactionNo, setTransactionNo] = useState(null);
  const [showUpdateLayout, setShowUpdateLayout] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [details, setDetails] = useState(null);
  const [paymentMode, setPaymentMode] = useState("");
  const [paymentOptions, setPaymentOptions] = useState(initialPaymentOptions);
  const [updateloading, setUpdateLoading] = useState(false);

  async function handleTransactionIdSearch() {
    setSearchLoading(true);
    try {
      const base_url = `${SUDA_API_BASE_URL}/watermanagement/transaction/${transactionNo}`;
      var requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
        },
        redirect: "follow",
      };

      let response = null,
        responseBody = null;
      response = await fetch(base_url, requestOptions);
      responseBody = await response.json();
      console.log(responseBody);
      if (response?.status === 200) {
        setDetails(responseBody.data);
      } else {
        toast.error("No records found!", { position: "top-center" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSearchLoading(false);
    }
  }

  async function updatePaymentMode() {
    // update api function
    if (paymentMode === "card") {
      if (
        paymentOptions.cardType === "" ||
        paymentOptions.cardNo === "" ||
        paymentOptions.cardHolderName === ""
      ) {
        toast.error("Please fill mandetory fields!", {
          position: "top-center",
        });
        return;
      }
    } else if (
      paymentMode === "cheque" ||
      paymentMode === "dd" ||
      paymentMode === "neft" ||
      paymentMode === "rtgs"
    ) {
      if (
        paymentOptions.bankName === "" ||
        paymentOptions.branchName === "" ||
        paymentOptions.chqDdNo === "" ||
        paymentOptions.chqDdDte === ""
      ) {
        toast.error("Please fill mandetory fields!", {
          position: "top-center",
        });
        return;
      }
    }
    const senderObj = {
      paymentMode: paymentMode,
      transactionDetailsId: details?.transaction_details_id,
      transactionMasterId: details?.transactionid,
      paymentDetails:
        paymentMode === "cash"
          ? { narration: paymentOptions.narration }
          : paymentMode === "card"
          ? {
              ...paymentOptions,
              bankName: null,
              branchName: null,
              chqDdNo: null,
              chqDdDte: null,
              narration: null,
            }
          : {
              ...paymentOptions,
              cardNo: null,
              cardType: null,
              cardHolderName: null,
              narration: null,
            },
    };
    setUpdateLoading(true);
    try {
      const base_url = `${SUDA_API_BASE_URL}/watermanagement/transaction/paymentMode`;
      var requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
        },
        redirect: "follow",
        body: JSON.stringify(senderObj),
      };

      let response = null,
        responseBody = null;
      response = await fetch(base_url, requestOptions);
      responseBody = await response.json();
      if (response.status !== 200) {
        toast.error("Updation of Payment Mode failed", {
          position: "top-center",
        });
        return;
      }
      if (responseBody.success) {
        toast.success("Payment mode updated successfully!", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", { position: "top-center" });
    } finally {
      setUpdateLoading(false);
    }
  }

  function cancelUpdate() {
    // cancel functuon
  }

  return (
    <div className="py-4">
      <ToastContainer autoClose={2000} />
      <TransactionInput
        setTransactionId={setTransactionNo}
        handleSearchFunction={handleTransactionIdSearch}
      />
      {details && (
        <>
          <TransactionDetailBox
            transactionId={transactionNo}
            details={details}
            paymentMode={paymentMode}
            setPaymentMode={setPaymentMode}
            paymentOptions={paymentOptions}
            setPaymentOptions={setPaymentOptions}
            featureType={0}
          />
          <div className="flex items-center justify-center gap-3 pb-6 pt-4">
            <Button onClick={updatePaymentMode}>Update</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default MainPageWaterUpdatePaymentMode;
