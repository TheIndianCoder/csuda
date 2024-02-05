import React, { useEffect, useState } from 'react'
import UserPaymentReceiptEnglish from '@/Dashboard/formPagesAdmin/userChargesModule/userChargesDemandAndPayment/userPaymentReceiptEnglish'
import UserPaymentReceiptHindi from '@/Dashboard/formPagesAdmin/userChargesModule/userChargesDemandAndPayment/userPaymentReceiptHindi'
import { isBlankString } from '@/utils/formValidatorUtils'
import { getCookieByName } from '@/utils/RequireAuth'
import { copyStyles, fetchFromAPI } from '@/utils/commonUtils'
import { ColorRingCustom, ErrorBoundary, NotFoundErrorMessageCustom } from '@/utils/commonComponents'
import { ENGLISH, HINDI, RECEIPT_IN_ENGLISH, RECEIPT_IN_HINDI, SOMETHING_WENT_WRONG, SOMETHING_WENT_WRONG_WHILE_LOADING_RECEIPT, SUDA_TOKEN } from '@/utils/appConstants'

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL

function ViewUserPaymentReceipt({
  showModal, currModal, prevModal, switchOnPrevModalNOffCurrModal, consumerItemForView,
  paymentDetailsItemForReceiptView
}) {

  const [paymentReceiptDetails, setPaymentReceiptDetails] = useState(null)
  const [isPaymentReceiptDetailsLoading, setIsPaymentReceiptDetailsLoading] = useState(null)
  const [isPaymentReceiptDetailsLoaded, setIsPaymentReceiptDetailsLoaded] = useState(null)

  const [language, setLanguage] = useState(ENGLISH)

  const switchLanguage = (currLang, targetLang) => {
    if (currLang == ENGLISH) {
      setLanguage(HINDI)
    } else if (currLang == HINDI) {
      setLanguage(ENGLISH)
    }
  }

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
    printwin.document.write(document.getElementById("print_all_section").innerHTML);
    copyStyles(window.document, printwin.document);
    printwin.print();
  }

  useEffect(() => {
    if (paymentDetailsItemForReceiptView != null) {
      const requestOptions = {
        method: "GET",
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName(SUDA_TOKEN)}` },
      }
      //consumer details
      let url = `${SUDA_API_BASE_URL}/user/getPaymentReceiptByTrnNo?transaction_no=${paymentDetailsItemForReceiptView?.transaction_no}`
      fetchFromAPI(url, requestOptions, setPaymentReceiptDetails, setIsPaymentReceiptDetailsLoading, setIsPaymentReceiptDetailsLoaded)
    }
  }, [paymentDetailsItemForReceiptView])

  return showModal == true ? (
    <div>
      <div className="container py-2 px-10 mb-10 mx-0 min-w-full flex flex-col items-center">
        <div className="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
          <button
            onClick={() => switchOnPrevModalNOffCurrModal(currModal, prevModal)}
            className="w-36 h-8 px-4 py-1 mx-4 mb-2 tracking-wide text-white transition-colors 
            duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none 
            focus:bg-green-400">
            {`Back`}
          </button>
        </div>
      </div>
      {
        isPaymentReceiptDetailsLoading == true ? (
          <ColorRingCustom />
        ) : null
      }
      {
        isPaymentReceiptDetailsLoaded == false ? (
          <NotFoundErrorMessageCustom
            message={SOMETHING_WENT_WRONG}
            text_size={`sm`}
          />
        ) : null
      }

      {
        isPaymentReceiptDetailsLoaded == true && paymentReceiptDetails?.length > 0 ? (
          <>
            {
              language == ENGLISH ? (
                <ErrorBoundary
                  errorComponent={<NotFoundErrorMessageCustom
                    message={SOMETHING_WENT_WRONG_WHILE_LOADING_RECEIPT}
                    text_size={`sm`}
                  />}
                >
                  <section id='print_all_section' className="py-0  bg-white">
                    <UserPaymentReceiptEnglish
                      paymentReceiptDetails={paymentReceiptDetails}
                      switchLanguage={switchLanguage}
                    /></section>
                </ErrorBoundary>

              ) : null
            }
            {
              language == HINDI ? (
                <ErrorBoundary
                  errorComponent={<NotFoundErrorMessageCustom
                    message={SOMETHING_WENT_WRONG_WHILE_LOADING_RECEIPT}
                    text_size={`sm`}
                  />}
                >
                  <section id='print_all_section' className="py-0  bg-white">
                    <UserPaymentReceiptHindi
                      paymentReceiptDetails={paymentReceiptDetails}
                      switchLanguage={switchLanguage}
                    /></section>
                </ErrorBoundary>

              ) : null
            }
            <div className="container py-2 px-10 mb-10 mx-0 min-w-full flex flex-col items-center">
              <div className="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
                <button
                  onClick={() => switchLanguage(language, language == ENGLISH ? HINDI : ENGLISH)}
                  className="w-56 h-8 px-4 py-1 mx-4 mb-2 tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
                  {language == ENGLISH ? RECEIPT_IN_HINDI : RECEIPT_IN_ENGLISH}
                </button>
                <button
                  onClick={handlePrintToPDF}
                  className={`w-356 h-8 px-4 py-1 mx-4 mb-2 tracking-wide text-white transition-colors 
                    duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none 
                    focus:bg-green-400`}>
                  Print  Receipt
                </button>
              </div>
            </div>
          </>

        ) : null
      }
    </div >
  ) : null
}

export default ViewUserPaymentReceipt