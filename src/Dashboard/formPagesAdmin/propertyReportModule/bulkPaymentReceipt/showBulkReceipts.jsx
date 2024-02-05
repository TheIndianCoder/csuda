import React, { useEffect, useState } from "react";
import PaymentReceiptComponentEnglish from "@/Dashboard/formPagesAdmin/propertyReportModule/bulkPaymentReceipt/paymentReceiptComponentEnglish";
import { Button } from "@material-tailwind/react";
import { copyStyles } from "@/utils/commonUtils";
import PaymentReceiptComponentHindi from "@/Dashboard/formPagesAdmin/propertyReportModule/bulkPaymentReceipt/paymentReceiptComponentHindi";
import {
  ENGLISH,
  HINDI,
  RECEIPT_IN_ENGLISH,
  RECEIPT_IN_HINDI,
  SOMETHING_WENT_WRONG,
} from "@/utils/appConstants";
import {
  ErrorBoundary,
  NotFoundErrorMessageCustom,
} from "@/utils/commonComponents";
import Pagination from "@/Components/Pagination";
import { useMemo } from "react";
import ReactPaginate from "react-paginate";

function ShowBulkReceipts({
  showModal,
  currModal,
  switchOnPrevModalNOffCurrModal,
  bulkPaymentReceiptsObj,
  isBulkPaymentReceiptsObjLoading,
  isBulkPaymentReceiptsObjLoaded,
  setCurrentPage,
  currentPage,
}) {
  console.log(`[ShowBulkReceipts] bulkPaymentReceiptsObj :::::`);
  console.log(bulkPaymentReceiptsObj);

  const [language, setlanguage] = useState(ENGLISH);
  const [itemOffset, setItemOffset] = useState(0);

  const PageSize = 10;
  const endOffset = itemOffset + PageSize;

  const currentItems = bulkPaymentReceiptsObj?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(bulkPaymentReceiptsObj?.length / PageSize);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * PageSize) % bulkPaymentReceiptsObj?.length;

    setItemOffset(newOffset);
  };

  const [currentTableData, setcurrentTableData] = useState([]);

  // const currentTableData = useMemo(() => {
  //   const firstPageIndex = (currentPage - 1) * PageSize;
  //   const lastPageIndex = firstPageIndex + PageSize;
  //   return bulkPaymentReceiptsObj.slice(firstPageIndex, lastPageIndex);
  // }, [currentPage]);

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    let data = bulkPaymentReceiptsObj.slice(firstPageIndex, lastPageIndex);
    setcurrentTableData(data);
  }, [currentPage, bulkPaymentReceiptsObj]);
  const handleLanguageChange = () => {
    let chosenLanguage = language == ENGLISH ? HINDI : ENGLISH;
    setlanguage(chosenLanguage);
  };

  const handlePrintToPDF = () => {
    // let print_div = document.getElementById("print_div");
    // let print_area = window.open();
    // print_area.document.write(print_div.innerHTML);
    // print_area.document.close();
    // print_area.focus();
    // print_area.print();
    // print_area.close();
    // This is the code print a particular div element
    // let iframeObj = document.getElementById('printf').contentWindow;
    // iframeObj.focus()
    // iframeObj.print()
    //==================================================
    let printwin = window.open("");
    printwin.document.write(
      document.getElementById("print_all_section").innerHTML
    );
    copyStyles(window.document, printwin.document);
    printwin.print();
  };

  return bulkPaymentReceiptsObj?.length > 0 ? (
    <>
      <div className="relative mb-10 mt-10 flex min-h-screen flex-col justify-center overflow-hidden">
        <div className="m-auto w-full rounded-md  bg-white px-0 pb-4 pt-0 lg:max-w-full">
          <nav className="navcustomproperty relative mb-2 flex flex-wrap items-center justify-between rounded-md py-1 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
            <h2 className="text-center text-sm font-semibold text-white">
              PAYMENT RECEIPT
            </h2>
            <Button
              color="green"
              className="custom_button_add m-2 h-6 w-40 rounded bg-green-700 px-2 py-1"
              onClick={handleLanguageChange}
            >
              {language == ENGLISH ? RECEIPT_IN_HINDI : RECEIPT_IN_ENGLISH}
            </Button>
          </nav>
          <div className="container mx-0 flex min-w-full flex-col items-center px-10 py-2">
            <div className="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
              <Button
                color="green"
                className="custom_button_add m-2 m-auto h-6 w-40 rounded bg-green-700 px-2 py-1"
                onClick={handlePrintToPDF}
              >
                Print Receipts
              </Button>
            </div>
          </div>
          <section id="print_all_section" className="bg-white  py-0">
            {currentItems?.map((item, index, arr) => {
              return language == ENGLISH ? (
                <div key={index}>
                  {/* <ErrorBoundary
                      errorComponent={<NotFoundErrorMessageCustom
                        message={SOMETHING_WENT_WRONG}
                        text_size={`sm`}
                      />} > */}
                  <PaymentReceiptComponentEnglish
                    switchOnPrevModalNOffCurrModal={
                      switchOnPrevModalNOffCurrModal
                    }
                    receiptDetails={item}
                    isReceipLoaded={isBulkPaymentReceiptsObjLoaded}
                    isReceiptLoading={isBulkPaymentReceiptsObjLoading}
                  />
                  {/* </ErrorBoundary> */}
                  {index < arr.length - 1 ? (
                    <div class="page-break"></div>
                  ) : null}
                </div>
              ) : (
                <div key={index}>
                  {/* <ErrorBoundary
                      errorComponent={<NotFoundErrorMessageCustom
                        message={SOMETHING_WENT_WRONG}
                        text_size={`sm`}
                      />} > */}
                  <PaymentReceiptComponentHindi
                    switchOnPrevModalNOffCurrModal={
                      switchOnPrevModalNOffCurrModal
                    }
                    receiptDetails={item}
                    isReceipLoaded={isBulkPaymentReceiptsObjLoaded}
                    isReceiptLoading={isBulkPaymentReceiptsObjLoading}
                  />
                  {/* </ErrorBoundary> */}
                  {index < arr.length - 1 ? (
                    <div class="page-break"></div>
                  ) : null}
                </div>
              );
            })}
          </section>
          {/* <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={bulkPaymentReceiptsObj.length}
                  pageSize={PageSize}
                  onPageChange={(page) => setCurrentPage(page)}
                /> */}
          {bulkPaymentReceiptsObj?.length > 10 ? (
            <ReactPaginate
              breakLabel="..."
              nextLabel={
                <span
                  className="
                  // flex h-8 w-5 
                  items-center justify-center rounded-md bg-gray-200 px-5 py-3
                   text-xs text-gray-700"
                >
                  next
                </span>
              }
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel={
                <span
                  className="
                // flex h-8 w-8
                items-center  justify-center rounded-md bg-gray-200 px-5 py-3
                text-xs text-gray-700"
                >
                  prev
                </span>
              }
              containerClassName="flex items-center justify-center text-xs mx-3"
              pageClassName="block border border-solid border-lightGray
              //  text-xs mx-1 
              //  hover:bg-lightGray w-8 py-3 px-5 h-8 flex items-center justify-center rounded-md 
               "
              activeClassName="bg-gray-300 text-gray-700 text-xs"
              renderOnZeroPageCount={null}
            />
          ) : null}
          <div className="container mx-0 flex min-w-full flex-col items-center px-10 py-2">
            <div className="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
              <Button
                color="green"
                className="custom_button_add m-2 m-auto h-6 w-40 rounded bg-green-700 px-2 py-1"
                onClick={handlePrintToPDF}
              >
                Print Receipts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default ShowBulkReceipts;
