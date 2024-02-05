import React, { useEffect, useState } from "react";
import SearchBulkPaymentReceipts from "@/Dashboard/formPagesAdmin/propertyReportModule/bulkPaymentReceipt/searchBulkPaymentReceipts";
import ShowBulkReceipts from "@/Dashboard/formPagesAdmin/propertyReportModule/bulkPaymentReceipt/showBulkReceipts";
import {
  ColorRingCustom,
  NotFoundErrorMessageCustom,
} from "@/utils/commonComponents";
import { NO_DATA_FOUND, SOMETHING_WENT_WRONG } from "@/utils/appConstants";

const SEARCH_BULK_PAYMENT_RECEIPTS = `searchBulkPaymentReceipts`;
const SHOW_BULK_RECEIPTS = `searchShowBulkReceipts`;

function MainPageBulkPaymentReceipt() {
  const [showModalsObj, setShowModalsObj] = useState({
    searchBulkPaymentReceipts: true,
    searchShowBulkReceipts: true,
  });
  const [bulkPaymentReceiptsObj, setBulkPaymentReceiptsObj] = useState([]);
  const [isBulkPaymentReceiptsObjLoading, setIsBulkPaymentReceiptsObjLoading] =
    useState(null);
  const [isBulkPaymentReceiptsObjLoaded, setIsBulkPaymentReceiptsObjLoaded] =
    useState(null);
  const [currentPage, setCurrentPage] = useState();
  const switchOnPrevModalNOffCurrModal = (currModalName, prevModalName) => {
    console.log(currModalName);
    console.log(prevModalName);
    if (prevModalName && currModalName) {
      console.log(showModalsObj);
      setShowModalsObj((prevState) => {
        return {
          ...prevState,
          [currModalName]: false,
          [prevModalName]: true,
        };
      });
    }
  };

  useEffect(() => {
    console.log("bulkPaymentReceiptsObj", bulkPaymentReceiptsObj);
  }, [bulkPaymentReceiptsObj]);
  return (
    <>
      <SearchBulkPaymentReceipts
        showModal={showModalsObj[SEARCH_BULK_PAYMENT_RECEIPTS]}
        currModal={SEARCH_BULK_PAYMENT_RECEIPTS}
        switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
        setBulkPaymentReceiptsObj={setBulkPaymentReceiptsObj}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        setIsBulkPaymentReceiptsObjLoading={setIsBulkPaymentReceiptsObjLoading}
        setIsBulkPaymentReceiptsObjLoaded={setIsBulkPaymentReceiptsObjLoaded}
        isBulkPaymentReceiptsObjLoading={isBulkPaymentReceiptsObjLoading}
        isBulkPaymentReceiptsObjLoaded={isBulkPaymentReceiptsObjLoaded}
      />
      {isBulkPaymentReceiptsObjLoading == true ? <ColorRingCustom /> : null}
      {isBulkPaymentReceiptsObjLoaded == false ? (
        <NotFoundErrorMessageCustom
          message={SOMETHING_WENT_WRONG}
          text_size={`sm`}
        />
      ) : null}
      {bulkPaymentReceiptsObj?.length == 0 &&
      isBulkPaymentReceiptsObjLoaded == true ? (
        <NotFoundErrorMessageCustom message={NO_DATA_FOUND} text_size={`sm`} />
      ) : null}
      {bulkPaymentReceiptsObj?.length > 0 &&
      isBulkPaymentReceiptsObjLoading == false &&
      isBulkPaymentReceiptsObjLoaded == true ? (
        <ShowBulkReceipts
          showModal={showModalsObj[SHOW_BULK_RECEIPTS]}
          currModal={SHOW_BULK_RECEIPTS}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
          bulkPaymentReceiptsObj={bulkPaymentReceiptsObj}
          isBulkPaymentReceiptsObjLoading={isBulkPaymentReceiptsObjLoading}
          isBulkPaymentReceiptsObjLoaded={isBulkPaymentReceiptsObjLoaded}
        />
      ) : null}
    </>
  );
}

export default MainPageBulkPaymentReceipt;
