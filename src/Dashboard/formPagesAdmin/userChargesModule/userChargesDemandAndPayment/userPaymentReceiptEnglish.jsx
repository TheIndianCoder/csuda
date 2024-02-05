import { convertDateToAPIFormat, convertTransactionDateToFYFormat, inWords } from '@/utils/commonUtils'
import { isBlankString } from '@/utils/formValidatorUtils'
import React from 'react'

function UserPaymentReceiptEnglish({
  paymentReceiptDetails, switchLanguage
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
                  SOLID WASTE USER CHARGE
                </p>
                <p className="mb-2 text-center font-body text-lg font-bold uppercase tracking-tight">
                  PAYMENT RECEIPT
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
                            {!isBlankString(
                              paymentReceiptDetails[0].transaction_no
                            )
                              ? paymentReceiptDetails[0].transaction_no
                              : `N/A`}
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900">
                            Department/Section
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                            :
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                            {!isBlankString(
                              paymentReceiptDetails[0].department_section
                            )
                              ? paymentReceiptDetails[0].department_section
                              : `N/A`}
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900 ">
                            Account Description
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900 ">
                            :
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                            {!isBlankString(
                              paymentReceiptDetails[0].account_description
                            )
                              ? paymentReceiptDetails[0].account_description
                              : `N/A`}
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900 ">
                            Date
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900 ">
                            :
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                            {!isBlankString(
                              paymentReceiptDetails[0].transaction_date
                            )
                              ? paymentReceiptDetails[0].transaction_date
                              : `N/A`}
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900 ">
                            Ward No
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs  text-gray-900">
                            :
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900 ">
                            {!isBlankString(paymentReceiptDetails[0].ward_no)
                              ? paymentReceiptDetails[0].ward_no
                              : `N/A`}
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900 ">
                            Consumer No.
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900 ">
                            :
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                            {!isBlankString(
                              paymentReceiptDetails[0].consumer_no
                            )
                              ? paymentReceiptDetails[0].consumer_no
                              : `N/A`}
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900 ">
                            Holding No.
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900 ">
                            :
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs  text-gray-900">
                            {!isBlankString(paymentReceiptDetails[0].holding_no)
                              ? paymentReceiptDetails[0].holding_no
                              : `N/A`}
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900 ">
                            Name
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs  text-gray-900">
                            :
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs text-gray-900 ">
                            {!isBlankString(
                              paymentReceiptDetails[0].consumer_name
                            )
                              ? paymentReceiptDetails[0].consumer_name
                              : `N/A`}
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs  font-medium font-semibold text-gray-900 ">
                            Mobile No.
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs  font-semibold text-gray-900">
                            :
                          </td>
                          <td className="whitespace-normal px-3 py-0 text-xs  font-normal text-gray-900">
                            {!isBlankString(paymentReceiptDetails[0].mobile_no)
                              ? paymentReceiptDetails[0].mobile_no
                              : `N/A`}
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
                            {!isBlankString(paymentReceiptDetails[0].address)
                              ? paymentReceiptDetails[0].address
                              : `N/A`}
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
                              {!isBlankString(
                                paymentReceiptDetails[0].payable_amount
                              )
                                ? paymentReceiptDetails[0].payable_amount
                                : `N/A`}
                            </div>
                            <div className="Payment_recipt_custom float-left flex items-center gap-5 text-xs font-semibold">
                              {!isBlankString(
                                paymentReceiptDetails[0].payable_amount
                              )
                                ? inWords(
                                    paymentReceiptDetails[0].payable_amount
                                  )
                                : `N/A`}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan="3"
                            className="whitespace-nowrap px-1 py-0 text-left  text-xs text-gray-900"
                          >
                            <div className="float-left text-left  text-xs text-gray-900">
                              towards Solid Waste User Charge & Others
                            </div>
                            <div className="Payment_recipt_custom_small float-left ml-2 text-xs font-semibold capitalize">
                              {(paymentReceiptDetails[0].payment_mode + "")} 
                            </div>
                            <div className="float-left ml-2  text-left text-xs text-gray-900">
                              Online No.
                            </div>
                            <div className="Payment_recipt_custom_small float-left text-xs font-semibold">
                              NA
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
                              {!isBlankString(
                                paymentReceiptDetails[0].transaction_date
                              )
                                ? paymentReceiptDetails[0].transaction_date
                                : `N/A`}
                            </div>
                            <div className="float-left ml-2  text-left text-xs text-gray-900">
                              drawn on
                            </div>
                            <div className="Payment_recipt_custom_small float-left text-xs font-semibold mr-5">
                              {!isBlankString(
                                paymentReceiptDetails[0].cheque_date
                              )
                                ? paymentReceiptDetails[0].cheque_date
                                : `N/A`}
                            </div>
                            <div className="float-left ml-2  text-left text-xs text-gray-900">
                              Bank Name
                            </div>
                            <div className="Payment_recipt_custom_small float-left text-xs font-semibold">
                              {!isBlankString(
                                paymentReceiptDetails[0].bank_name
                              )
                                ? paymentReceiptDetails[0].bank_name
                                : `N/A`}
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
                              {!isBlankString(
                                paymentReceiptDetails[0].branch_name
                              )
                                ? paymentReceiptDetails[0].branch_name
                                : `N/A`}
                            </div>
                            <div className="float-left text-xs font-normal">
                              For The Period
                              <b className="px-2">
                                {!isBlankString(
                                  paymentReceiptDetails[0].periods
                                )
                                  ? paymentReceiptDetails[0].periods
                                  : `N/A to  N/A`}
                              </b>
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
                    Print Date : {convertDateToAPIFormat(new Date())}
                  </span>
                </li>
              </ul>
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

export default UserPaymentReceiptEnglish