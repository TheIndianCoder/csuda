import { SUPER, SUPER_BUILD_UP_AREA_PROP_TYPE_ID } from "@/utils/appConstants";
import {
  convertStringToLowerCaseNTrim,
  convertTransactionDateToFYFormat,
  inWords,
} from "@/utils/commonUtils";
import React from "react";

function PaymentReceiptComponentHindi({
  switchOnPrevModalNOffCurrModal,
  receiptDetails,
  isReceipLoaded,
  isReceiptLoading,
}) {
  return (
    <section id="print_section" className="bg-white  py-0">
      <div className="mx-auto max-w-3xl bg-white py-5">
        <article className="overflow-hidden border-2 border-dotted border-black">
          <div className="bg-img rounded-b-md bg-[white]">
            <div className="p-2">
              <div className="text-slate-700 space-y-2">
                <div className="mb-1 flex flex-col">
                  <div className="overflow-x-auto">
                    <div className="inline-block p-1 align-middle lg:w-full">
                      <div className="overflow-hidden">
                        <table className="min-w-full">
                          <thead className="preview-payment-form-table-laypout"></thead>
                          <tbody className="divide-y divide-gray-200">
                            <tr>
                              <td className="whitespace-nowrap px-1 py-1  text-center">
                                <img
                                  className="h-12"
                                  src="/img/Bhilai_recipt.png"
                                />
                              </td>
                              <td className="whitespace-nowrap px-1 py-1  text-center">
                                <p className="text-center font-body text-3xl font-extrabold uppercase tracking-tight">
                                  कार्यालय नगर पालिक निगम, भिलाई
                                </p>
                              </td>
                              <td className="whitespace-nowrap px-1 py-1  text-center">
                                <img
                                  className="h-12"
                                  src="/img/swachh_bharat.jpg"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mb-2 text-center font-body text-xl font-bold uppercase tracking-tight">
                  सम्पति कर का रसीद
                  {receiptDetails?.check_status == "1" ||
                  convertStringToLowerCaseNTrim(
                    receiptDetails[0]?.mode_of_payment
                  ) == "cash"
                    ? ``
                    : ` (अस्थायी)`}
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="inline-block p-2.5 align-middle lg:w-full">
                  <div className="overflow-hidden">
                    <table className="min-w-full">
                      <thead className="bg-gray-50"></thead>
                      <tbody>
                        <tr>
                          <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900">
                            रसीद संख्या
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                            :
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                            {receiptDetails?.receipt_no}
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900">
                            तारीख
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                            :
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                            {receiptDetails?.date}
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900 ">
                            विभाग / अनुभाग
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900 ">
                            :
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                            {receiptDetails?.department_section}
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900 ">
                            वार्ड नं
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900 ">
                            :
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                            {receiptDetails?.ward_no}
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900 ">
                            खाते का विवरण
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs  text-gray-900">
                            :
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900 ">
                            {receiptDetails?.account_description}
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900 ">
                            सम्पति संख्या
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900 ">
                            :
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                            {receiptDetails?.property_no}
                          </td>
                        </tr>
                        <tr>
                          {/* <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 ">
                                Consumer No.
                            </td>
                            <td className="px-3 py-0 text-xs text-gray-900 ">
                                :
                            </td>
                            <td className="px-3 py-0 text-xs text-gray-900 ">
                                1022566006

                            </td> */}
                          <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900 ">
                            नाम
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900 ">
                            :
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs  text-gray-900">
                            {receiptDetails.owner_name}
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900 ">
                            Mobile Number
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs  text-gray-900">
                            :
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900 ">
                            {receiptDetails.mobile_no}
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs  font-medium font-semibold text-gray-900 ">
                            उपयोग के प्रकार
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs  font-semibold text-gray-900">
                            :
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs  font-normal text-gray-900">
                            {receiptDetails?.uses_type_name}
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900">
                            पता
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900">
                            :
                          </td>
                          <td className="px-3 py-0 text-xs font-normal text-gray-900 ">
                            {receiptDetails?.address}
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs  font-medium font-semibold text-gray-900">
                            क्षेत्र( वर्गफुट में )
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs  font-semibold text-gray-900">
                            :
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs  font-normal text-gray-900">
                            {receiptDetails?.total_builtup_area}
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-normal px-1 py-0 text-xs font-medium font-semibold text-gray-900">
                            <div className="mb-1 flex flex-col">
                              <div className="overflow-x-auto">
                                <div className="inline-block p-1.5 align-middle lg:w-full">
                                  <div className="overflow-hidden">
                                    <table className="min-w-full">
                                      <thead>
                                        <tr>
                                          <th
                                            scope="col"
                                            className="whitespace-normal border border-gray-300 px-1 py-1  text-center text-xs  font-semibold text-gray-700"
                                          >
                                            Floor
                                          </th>
                                          <th
                                            scope="col"
                                            className="whitespace-normal border border-gray-300 px-1 py-1  text-center text-xs  font-semibold text-gray-700"
                                          >
                                            {receiptDetails?.propertyTypeId ==
                                            SUPER_BUILD_UP_AREA_PROP_TYPE_ID
                                              ? SUPER
                                              : ""}
                                            Buildup(Sq.ft)
                                          </th>
                                          <th
                                            scope="col"
                                            className="whitespace-normal border border-gray-300 px-1 py-1  text-center text-xs  font-semibold text-gray-700"
                                          >
                                            Usage
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-gray-200">
                                        {receiptDetails?.floor_details?.map(
                                          (item, index) => {
                                            const {
                                              floor_name,
                                              built_up_area,
                                              usage,
                                            } = item;
                                            return (
                                              <tr key={index}>
                                                <td className="whitespace-normal border border-gray-300 px-1 py-1 text-center text-xs font-medium text-gray-700">
                                                  {floor_name
                                                    ? floor_name
                                                    : "N/A"}
                                                </td>
                                                <td className="whitespace-normal border border-gray-300 px-1 py-1 text-center text-xs font-medium text-gray-700">
                                                  {built_up_area
                                                    ? built_up_area
                                                    : "N/A"}
                                                </td>
                                                <td className="whitespace-normal border border-gray-300 px-1 py-1 text-center text-xs font-medium text-gray-700">
                                                  {usage ? usage : "N/A"}
                                                </td>
                                              </tr>
                                            );
                                          }
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-1 flex flex-col">
              <div className="overflow-x-auto">
                <div className="inline-block p-2.5 align-middle lg:w-full">
                  <div className="overflow-hidden">
                    <table className="min-w-full">
                      <thead className="preview-payment-recipt-form-table-laypout"></thead>
                      <tbody>
                        <tr>
                          <td
                            colSpan="3"
                            className="whitespace-nowrap px-1 py-0 text-left  text-xs text-gray-900"
                          >
                            <div className="float-left text-left  text-xs text-gray-900">
                              कुल रुपये{" "}
                            </div>
                            <div className="float-left ml-2 text-left  text-xs font-semibold text-gray-900">
                              {receiptDetails?.total} (शब्दों में){" "}
                            </div>
                            <div className="Payment_recipt_custom float-left text-xs font-semibold">
                              {(receiptDetails?.total + "").includes(".")
                                ? inWords(
                                    (receiptDetails.total + "").split(".")[0]
                                  ) +
                                  " Rs. and " +
                                  inWords(
                                    (receiptDetails.total + "").split(".")[1]
                                  ) +
                                  " Paisa Only"
                                : inWords(receiptDetails.total + "") + " Rs."}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan="3"
                            className="whitespace-nowrap px-1 py-0 text-left  text-xs text-gray-900"
                          >
                            <div className="float-left text-left  text-xs text-gray-900">
                              होल्डिंग टैक्स एवं अन्य के मद मे
                            </div>
                            <div className="Payment_recipt_custom_small float-left ml-2 text-xs font-semibold capitalize">
                              {(receiptDetails?.mode_of_payment + "")
                                .trim()
                                .toLowerCase() == "card"
                                ? receiptDetails?.card_type + " "
                                : ""}
                              {receiptDetails?.mode_of_payment}
                            </div>
                            <div className="float-left ml-2  text-left text-xs text-gray-900">
                              Online No.
                            </div>
                            <div className="Payment_recipt_custom_small float-left text-xs font-semibold">
                              {receiptDetails?.online_no
                                ? receiptDetails?.online_no
                                : `NA`}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan="3"
                            className="whitespace-nowrap px-1 py-0 text-left  text-xs text-gray-900"
                          >
                            <div className="float-left text-left  text-xs text-gray-900">
                              dated
                            </div>
                            <div className="Payment_recipt_custom_small float-left text-xs font-semibold">
                              {receiptDetails?.date}
                            </div>
                            <div className="float-left ml-2  text-left text-xs text-gray-900">
                              drawn on
                            </div>
                            <div className="Payment_recipt_custom_small float-left text-xs font-semibold">
                              {receiptDetails?.drawn_on
                                ? receiptDetails?.drawn_on
                                : `NA`}
                            </div>
                            <div className="float-left ml-2  text-left text-xs text-gray-900">
                              Place of the bank
                            </div>
                            <div className="Payment_recipt_custom_small float-left text-xs font-semibold">
                              {receiptDetails?.branch_location
                                ? receiptDetails?.branch_location
                                : `NA`}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan="3"
                            className="whitespace-nowrap px-1 py-0 text-left  text-xs text-gray-900"
                          >
                            <div className="float-left text-left text-sm font-semibold text-gray-900">
                              नोट : ऑनलाइन पेमेंट / चेक / ड्राफ्ट / बैंकर चेक
                              अदायगी के अधीन हैं
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-1 flex flex-col">
              <div className="overflow-x-auto">
                <div className="inline-block p-2.5 align-middle lg:w-full">
                  <div className="overflow-hidden">
                    <table className="w-full table-fixed">
                      <thead className="preview-payment-recipt-form-table-laypout">
                        <tr>
                          <th
                            scope="col"
                            className="whitespace-normal border border-gray-900 px-1 py-0  text-left text-xs font-bold uppercase text-gray-900"
                          >
                            Account Description
                          </th>
                          <th
                            scope="col"
                            className="whitespace-normal border border-gray-900 px-1 py-0 text-center text-xs font-bold uppercase text-gray-900"
                          >
                            Period
                          </th>
                          <th
                            scope="col"
                            className="whitespace-normal border border-gray-900 px-1 py-0  text-left text-xs font-bold uppercase text-gray-900"
                          >
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900">
                            संपत्ति कर बकाया
                          </td>
                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900">
                            {receiptDetails?.previous_year?.previousEffectYear}
                          </td>
                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900">
                            {receiptDetails?.previous_year?.property_tax_arrear}
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900">
                            संपत्ति कर वर्तमान
                          </td>
                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900">
                            {receiptDetails?.current_year?.previousEffectYear}
                          </td>
                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900">
                            {receiptDetails?.current_year?.property_tax}
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900">
                            समेकित कर बकाया
                          </td>
                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900">
                            {receiptDetails?.previous_year?.previousEffectYear}
                          </td>
                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900">
                            {receiptDetails?.previous_year?.smerik_kar_arrear}
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900">
                            समेकित कर वर्तमान
                          </td>
                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900">
                            {receiptDetails?.current_year?.previousEffectYear}
                          </td>
                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900">
                            {receiptDetails?.current_year?.samerik_kar}
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900">
                            शिक्षा उपकर बकाया
                          </td>
                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900">
                            {receiptDetails?.previous_year?.previousEffectYear}
                          </td>
                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900">
                            {
                              receiptDetails?.previous_year
                                ?.education_cess_arrear
                            }
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900">
                            शिक्षा उपकर वर्तमान
                          </td>
                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900">
                            {receiptDetails?.current_year?.previousEffectYear}
                          </td>
                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900">
                            {receiptDetails?.current_year?.education_cess}
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900">
                            ठोस अपशिष्ट उपयोगकर्ता शुल्क
                          </td>
                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900"></td>
                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900"></td>
                        </tr>
                        <tr>
                          <td
                            colSpan="2"
                            className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900"
                          >
                            फॉर्म शुल्क
                          </td>

                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900">
                            {receiptDetails?.form_fee}
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan="2"
                            className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900"
                          >
                            कुल
                          </td>

                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900">
                            {receiptDetails?.total}
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan="2"
                            className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900"
                          >
                            छूट
                          </td>

                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900"></td>
                        </tr>
                        <tr>
                          <td
                            colSpan="2"
                            className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900"
                          >
                            प्राप्त रकम
                          </td>

                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900">
                            {receiptDetails?.receivable_amount}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="inline-block p-1.5 align-middle lg:w-full">
                  <div className="overflow-hidden">
                    <table className="w-full table-fixed">
                      <thead className="bg-gray-50"></thead>
                      <tbody>
                        <tr>
                          {/* <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-nowrap">
                                <img className="w-32" src='/img/QR_Code.png' />
                            </td> */}

                          <td className="whitespace-normal px-3 py-0 text-right text-xs font-bold text-gray-900">
                            टैक्स कलेक्टर का हस्ताक्षर
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-slate-700 mx-3 my-2 text-xs font-light">
              <h2 className="mb-1 text-xs font-semibold text-gray-900 dark:text-white">
                Note:
              </h2>
              <ul className="list-disc px-10">
                <li className="mb-0 mt-0">
                  <span className="text-xs font-normal text-gray-900 dark:text-white">
                    यह कंप्यूटर जनित रसीद है इस रसीद मे हस्ताक्षर की आवश्यकता
                    नहीं है |
                  </span>
                </li>
                <li className="mb-0 mt-0">
                  <span className="text-xs font-normal text-gray-900 dark:text-white">
                    संपत्ति कर भूमि या मकान का मालिकाना हक़ प्रदान नहीं करता है
                  </span>
                </li>
                <li className="mb-0 mt-0">
                  <span className="text-xs font-normal text-gray-900 dark:text-white">
                    संपर्क करें 1800 890 4115
                  </span>
                </li>
                <li className="mb-0 mt-0">
                  <span className="text-xs font-normal font-semibold text-gray-900 dark:text-white">
                    ऑनलाइन पेमेंट / चेक / ड्राफ्ट / बैंकर चेक अदायगी के अधीन हैं
                  </span>
                </li>
                {/* <li className="mt-0 mb-0">
                                                    <span className="font-normal text-xs text-gray-900 dark:text-white">You may validate receipt by scanning QR Code.</span>
                                                </li> */}
                <li className="mb-0 mt-0">
                  <span className="text-xs font-normal text-gray-900 dark:text-white">
                    प्रिन्ट दिनांक :{" "}
                    {new Date().toLocaleDateString() +
                      " " +
                      new Date().toLocaleDateString()}
                  </span>
                </li>
              </ul>
              {/* </li> */}
            </div>

            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="mb-3 inline-block p-1 align-middle lg:w-full">
                  <div className="overflow-hidden">
                    <table className="w-full table-fixed">
                      <thead className="bg-gray-50"></thead>
                      <tbody>
                        <tr>
                          <td className="whitespace-normal px-3 py-0 text-xs font-bold font-normal text-gray-900">
                            कार्यालय नगर पालिक निगम, भिलाई
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-right text-xs font-normal text-gray-900">
                            In Collaboration With{" "}
                            <b>Sri Publications & Stationers Pvt. Ltd.</b>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default PaymentReceiptComponentHindi;
