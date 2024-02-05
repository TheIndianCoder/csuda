import React from 'react'
import { ColorRing } from 'react-loader-spinner'

function PaymentDetails({
    propertyPaymentDetails, propPaymentDetailsErr, setPaymentDetails,
    switchOnPrevModalNOffCurrModal, currModal, prevModal, nextModal,
    handlePaymentReceiptView, handleDemandReceiptView
}) {
    // const handlePaymentReceiptView = (paymentDetailsObj, index) => {
    //     console.log("handle  payment receipt view")
    //     console.log(paymentDetailsObj)
    //     setPaymentDetails(paymentDetailsObj)
    //     switchOnPrevModalNOffCurrModal(currModal, nextModal)
    // }
    return (
        <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-md  lg:max-w-full">
            <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red-700 rounded-md">
                <h2 className="text-sm font-semibold text-center text-white">
                    Payment Details
                </h2>
            </nav>
            <div className="flex flex-col mb-1">
                <div className="overflow-x-auto">
                    <div className="p-2.5 2.5xl:w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            {
                                propertyPaymentDetails == null ? (
                                    <div className="m-auto w-24 h-24">
                                        <ColorRing
                                            visible={true}
                                            height="40"
                                            width="40"
                                            colors={['#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000']}
                                        />
                                    </div>
                                ) : null
                            }
                            {
                                propertyPaymentDetails?.length > 0 ? (
                                    <table className="min-w-full">
                                        <thead className="preview-payment-form-table-laypout">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-2 text-xs text-center font-bold  text-gray-700 uppercase  whitespace-normal border border-gray-300"
                                                >
                                                    Sl. No.
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-2 text-xs text-center font-bold  text-gray-700 uppercase  whitespace-normal border border-gray-300"
                                                >
                                                    Book No.
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-2 text-xs text-center font-bold  text-gray-700 uppercase  whitespace-normal border border-gray-300"
                                                >
                                                    Entry Date
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-2 text-xs text-center font-bold  text-gray-700 uppercase  whitespace-normal border border-gray-300"
                                                >
                                                    Fine Amount
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-2 text-xs text-center font-bold  text-gray-700 uppercase  whitespace-normal border border-gray-300"
                                                >
                                                    From Year
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-2 text-xs text-center font-bold  text-gray-700 uppercase  whitespace-normal border border-gray-300 "
                                                >
                                                    Receipt Date
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-2 text-xs text-center font-bold  text-gray-700 uppercase  whitespace-normal border border-gray-300"
                                                >
                                                    Receipt No.
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-2 text-xs text-center font-bold  text-gray-700 uppercase  whitespace-normal border border-gray-300 "
                                                >
                                                    Upto Year
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-2 text-xs text-center font-bold  text-gray-700 uppercase  whitespace-normal border border-gray-300"
                                                >
                                                    Total Amount
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-2 text-xs text-center font-bold   whitespace-normal text-gray-700 uppercase border border-gray-300"
                                                >
                                                    Payment Receipt
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-2 text-xs text-center font-bold   whitespace-normal text-gray-700 uppercase border border-gray-300"
                                                >
                                                    Demand Receipt
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {
                                                propertyPaymentDetails.map((item, index) => {
                                                    return (
                                                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                            <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                                                {index + 1}
                                                            </td>
                                                            <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                                                {item.book_no}
                                                            </td>
                                                            <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                                                {item.entry_date}
                                                            </td>
                                                            <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                                                {item.fine_amount}
                                                            </td>
                                                            <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                                                {item.frm_year}
                                                            </td>
                                                            <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                                                                {item.receipt_date}
                                                            </td>
                                                            <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                                                                {item.receipt_no}
                                                            </td>

                                                            <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                                                                {item.upto_year}
                                                            </td>
                                                            <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                                                                {item.tot_amount}
                                                            </td>
                                                            <td className="px-6 py-2 text-center text-xs font-medium text-gray-700  whitespace-normal border border-gray-300">
                                                                <button onClick={() => handlePaymentReceiptView(item, index)}
                                                                type='button' color="green"
                                                                    className='h-6 w-16 px-2 py-1 bg-green-700 rounded text-white text-xs font-semibold custom_button_add'>
                                                                    VIEW
                                                                </button>
                                                            </td>
                                                            <td className="px-6 py-2 text-center text-xs font-medium text-gray-700  whitespace-normal border border-gray-300">
                                                                <button onClick={() => handleDemandReceiptView(item, index)}
                                                                type='button' color="green"
                                                                    className='h-6 w-16 px-2 py-1 bg-green-700 rounded text-white text-xs font-semibold custom_button_add'>
                                                                    VIEW
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                ) :
                                    <p className="text-center font-semibold text-sm text-red-700">{propPaymentDetailsErr.errMsg}</p>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PaymentDetails