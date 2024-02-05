import TransactionInput from "@/Dashboard/resusables/TransactionInput";
import React, { useState, useEffect } from "react";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/solid";
import TransactionDetailBox from "@/Dashboard/resusables/TransactionDetailBox";
import UserChargesDetailsList from "./DetailsJson";
import { Button, Option, Select } from "@material-tailwind/react";
import { useMaterialTailwindController } from "@/Dashboard/context";
const SUDA_API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
import { getCookieByName } from "@/utils/RequireAuth";
import { ToastContainer, toast } from "react-toastify";

const initialPaymentOptions = {
  chequeNo: "",
  chequeDate: "",
  bankName: "",
  branchName: "",
  cardType: "",
  cardNo: "",
  cardHolderName: "",
  narration: "",
};

const MainPageUserChargesUpdatePaymentMode = () => {
  const [transactionId, setTransactionId] = useState(null);
  const [showUpdateLayout, setShowUpdateLayout] = useState(false);
  const [controller, dispatch] = useMaterialTailwindController();
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [paymentMode, setPaymentMode] = useState("");
  const [paymentOptions, setPaymentOptions] = useState(initialPaymentOptions);
  const [updateloading, setUpdateLoading] = useState(false);

  const { paymentModeDetailsInputFromAPI } = controller;

  async function handleTransactionIdSearch() {
    // search function
    setSearchLoading(true);
    console.log(transactionId);
    try {
      const base_url = `${SUDA_API_BASE_URL}/wastemanagement/transaction/${transactionId}`;
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
      if (response.status !== 200) {
        toast.error("No records found!", {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }
      setTransactionDetails(responseBody.data);
      console.log(responseBody);
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
        paymentOptions.chequeNo === "" ||
        paymentOptions.chequeDate === ""
      ) {
        toast.error("Please fill mandetory fields!", {
          position: "top-center",
        });
        return;
      }
    }
    const senderObj = {
      paymentMode: paymentMode,
      transactionDetailsId: transactionDetails?.transaction_details_id,
      transactionMasterId: transactionDetails?.transactionid,
      paymentDetails:
        paymentMode === "cash"
          ? { narration: paymentOptions.narration }
          : { ...paymentOptions },
    };
    setUpdateLoading(true);
    try {
      const base_url = `${SUDA_API_BASE_URL}/wastemanagement/transaction/paymentMode`;
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
        setTransactionId={setTransactionId}
        handleSearchFunction={handleTransactionIdSearch}
      />
      {transactionDetails && (
        <>
          <TransactionDetailBox
            transactionId={transactionId}
            details={transactionDetails}
            setPaymentMode={setPaymentMode}
            paymentMode={paymentMode}
            paymentOptions={paymentOptions}
            setPaymentOptions={setPaymentOptions}
            featureType={1}
          />
          <div className="flex items-center justify-center gap-3 pb-6 pt-4">
            <Button onClick={updatePaymentMode}>Update</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default MainPageUserChargesUpdatePaymentMode;
