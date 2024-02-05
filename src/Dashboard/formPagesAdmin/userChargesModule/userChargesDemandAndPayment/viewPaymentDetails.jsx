import { SOMETHING_WENT_WRONG } from '@/utils/appConstants'
import { ColorRingCustom, NotFoundErrorMessageCustom } from '@/utils/commonComponents'
import { isBlankString } from '@/utils/formValidatorUtils'
import React from 'react'

function ViewPaymentDetails({
    paymentDetails, isPaymentDetailsLoading, isPaymentDetailsLoaded,
    handleViewPaymentReceipt
}) {
    return (
        <div className="w-full px-0 pt-0 pb-4 m-auto bg-white rounded-none border border-gray-500 lg:max-w-full">
            <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                <h2 className="text-sm font-semibold text-center text-white">
                    Payment Details
                </h2>
            </nav>
            <div className="flex flex-col">
                {
                    isPaymentDetailsLoading == true ? (
                        <ColorRingCustom />
                    ) : null
                }
                {
                    isPaymentDetailsLoaded == false ? (
                        <NotFoundErrorMessageCustom
                            message={SOMETHING_WENT_WRONG}
                            text_size={`sm`}
                        />
                    ) : null
                }
                {
                    isPaymentDetailsLoaded == true && paymentDetails?.length < 1 ? (
                        <NotFoundErrorMessageCustom
                            message={`No payment receipts found !`}
                            text_size={`sm`}
                        />
                    ) : null
                }
                {
                    isPaymentDetailsLoaded == true && paymentDetails?.length > 0 ? (
                        <div className="overflow-x-auto">
                            <div className="p-2.5 2xl:w-full inline-block align-middle">
                                <div className="overflow-hidden">
                                    <table className="min-w-full">
                                        <thead className="preview-saf-form-table-laypout">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-2 py-2 text-xs font-bold text-center text-gray-700 whitespace-normal uppercase border border-gray-300"
                                                >
                                                    Transaction No.
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-2 py-2 text-xs font-bold text-center text-gray-700 whitespace-normal uppercase border border-gray-300"
                                                >
                                                    Transaction Date
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-2 py-2 text-xs font-bold text-center text-gray-700  whitespace-normal uppercase border border-gray-300"
                                                >
                                                    From Month
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-2 py-2 text-xs font-bold text-center text-gray-700 whitespace-normal uppercase border border-gray-300"
                                                >
                                                    To Month
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-2 py-2 text-xs font-bold text-center text-gray-700 whitespace-normal uppercase border border-gray-300"
                                                >
                                                    Payment Mode
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-2 py-2 text-xs font-bold text-center text-gray-700 whitespace-normal uppercase border border-gray-300"
                                                >
                                                    Total Amount
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-2 py-2 text-xs font-bold text-center text-gray-700 whitespace-normal uppercase border border-gray-300"
                                                >
                                                    Collected By
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-2 py-2 text-xs font-bold text-center text-gray-700 whitespace-normal uppercase border border-gray-300"
                                                >
                                                    Payment Receipt
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-2 py-2 text-xs font-bold text-center text-gray-700 whitespace-normal uppercase border border-gray-300"
                                                >
                                                    Adjustment Receipt
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {
                                                paymentDetails.map((item, index) => {
                                                    return (
                                                        <tr key={index}
                                                            className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                            <td className="px-6 py-2 text-xs font-normal text-center text-gray-700 whitespace-normal border border-gray-300">
                                                                {!isBlankString(item.transaction_no) ? item.transaction_no : `N/A`}
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-normal text-center text-gray-700 whitespace-normal border border-gray-300">
                                                                {!isBlankString(item.transaction_date) ? item.transaction_date : `N/A`}
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-normal text-center text-gray-700 whitespace-normal border border-gray-300">
                                                                {!isBlankString(item.from_month) ? item.from_month : `N/A`}
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-normal text-center text-gray-700 whitespace-normal border border-gray-300">
                                                                {!isBlankString(item.to_month) ? item.to_month : `N/A`}
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-normal text-center text-gray-700 whitespace-normal border border-gray-300">
                                                                {!isBlankString(item.payment_mode) ? item.payment_mode : `N/A`}
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-normal text-center text-gray-700 whitespace-normal border border-gray-300">
                                                                {!isBlankString(item.tot_amount) ? item.tot_amount : `N/A`}
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-normal text-center text-gray-700 whitespace-normal border border-gray-300">
                                                                {!isBlankString(item.collected_by) ? item.collected_by : `N/A`}
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-normal text-center text-gray-700 whitespace-normal border border-gray-300">
                                                                <button 
                                                                onClick={() => handleViewPaymentReceipt(item)}
                                                                type='button' color="green" 
                                                                className='h-6 w-16 px-2 py-1 text-xs text-white font-medium bg-green-700 rounded custom_button_add'
                                                                >View</button>
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-normal text-center text-gray-700 whitespace-normal border border-gray-300">
                                                                {`N/A`}
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        </div>
    )
}

export default ViewPaymentDetails