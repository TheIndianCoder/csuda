import { SUPER, SUPER_BUILD_UP_AREA_PROP_TYPE_ID } from "@/utils/appConstants";
import {
  convertStringToLowerCaseNTrim,
  convertTransactionDateToFYFormat,
  inWords,
} from "@/utils/commonUtils";
import { Button } from "@material-tailwind/react";
import React, { useEffect } from "react";

function PaymentReceiptComponentEnglish({
  switchOnPrevModalNOffCurrModal,
  receiptDetails,
  isReceipLoaded,
  isReceiptLoading,
  error,
}) {
  // console.log(`[PaymentReceiptComponentEnglish] receiptDetails :::::`)
  // console.log(receiptDetails)
  useEffect(() => {
    console.log("receiptDetails", receiptDetails);
  }, [receiptDetails]);
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
                          {/* <thead className="preview-payment-form-table-laypout">
                                                                </thead> */}
                          <tbody className="divide-y divide-gray-200">
                            <tr>
                              <td className="whitespace-nowrap px-1 py-1  text-center">
                                <img
                                  className="h-12"
                                  src="/img/Bhilai_recipt.png"
                                />
                              </td>
                              <td className="whitespace-nowrap px-1 py-1  text-center">
                                <p className="text-center font-body text-2xl font-extrabold uppercase tracking-tight">
                                  BHILAI MUNICIPAL CORPORATION, BHILAI
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
                  PROPERTY TAX RECEIPT
                  {receiptDetails?.check_status == "1" ||
                  convertStringToLowerCaseNTrim(
                    receiptDetails?.mode_of_payment
                  ) == "cash"
                    ? ``
                    : ` (Temporary)`}
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
                            Receipt No.
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                            :
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                            {receiptDetails?.receipt_no}
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900">
                            Date
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
                            Department/Section
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900 ">
                            :
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                            {receiptDetails?.department_section}
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900 ">
                            Ward No
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
                            Account Description
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs  text-gray-900">
                            :
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900 ">
                            {receiptDetails?.account_description}
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900 ">
                            Property No.
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
                            Owner Name
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
                            Usage Type
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
                            Address
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900">
                            :
                          </td>
                          <td className="px-3 py-0 text-xs font-normal text-gray-900 ">
                            {receiptDetails?.address}
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs  font-medium font-semibold text-gray-900">
                            Area(Sq.ft)
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
                                    <table className="w-full table-fixed">
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
                                            {receiptDetails.propertyTypeId ==
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
                    <table className="w-full table-fixed">
                      <thead className="preview-payment-recipt-form-table-laypout"></thead>
                      <tbody>
                        <tr>
                          <td
                            colSpan="3"
                            className="whitespace-nowrap px-1 py-0 text-left  text-xs text-gray-900"
                          >
                            <div className="float-left text-left  text-xs text-gray-900">
                              A Sum of Rs.{" "}
                            </div>
                            <div className="float-left ml-2 text-left  text-xs font-semibold text-gray-900">
                              {receiptDetails?.total} (In words.){" "}
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
                              towards Holding Tax & Others vide
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
                              Bank Name
                            </div>
                            <div className="Payment_recipt_custom_small float-left text-xs font-semibold">
                              {receiptDetails?.bank_name
                                ? receiptDetails?.bank_name
                                : `NA`}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan="3"
                            className="whitespace-nowrap px-0 py-0 text-left  text-xs text-gray-900"
                          >
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
                              N.B.Online Payment/Cheque/Draft/ Bankers Cheque
                              are Subject to realization
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
                            Property Tax Arrear
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
                            Property Tax Current
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
                            Samekit Kar Arrear
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
                            Samekit Kar Current
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
                            Education Cess Arrear
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
                            Education Cess Current
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
                            Solid Waste User Charge
                          </td>
                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900"></td>
                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900"></td>
                        </tr>
                        <tr>
                          <td
                            colSpan="2"
                            className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900"
                          >
                            Form Fee
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
                            Total
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
                            Discount
                          </td>

                          <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900"></td>
                        </tr>
                        <tr>
                          <td
                            colSpan="2"
                            className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900"
                          >
                            Amount Received
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
                            Signature Of Tax Collector
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
                    This is a Computer generated Receipt and does not require
                    physical signature.{" "}
                  </span>
                </li>
                <li className="mb-0 mt-0">
                  <span className="text-xs font-normal text-gray-900 dark:text-white">
                    संपत्ति कर भूमि या मकान का मालिकाना हक़ प्रदान नहीं करता है
                  </span>
                </li>
                <li className="mb-0 mt-0">
                  <span className="text-xs font-normal text-gray-900 dark:text-white">
                    For Details Call us at 1800 890 4115
                  </span>
                </li>
                <li className="mb-0 mt-0">
                  <span className="text-xs font-normal font-semibold text-gray-900 dark:text-white">
                    Cheque / Draft / Banker Cheque / Online payment are subject
                    to realization
                  </span>
                </li>
                <li className="mb-0 mt-0">
                  <span className="text-xs font-normal text-gray-900 dark:text-white">
                    You may validate receipt by scanning QR Code.
                  </span>
                </li>
                <li className="mb-0 mt-0">
                  <span className="text-xs font-normal text-gray-900 dark:text-white">
                    Print Date : {new Date().toString()}
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
                            BHILAI MUNICIPAL CORPORATION, BHILAI
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

export default PaymentReceiptComponentEnglish;
