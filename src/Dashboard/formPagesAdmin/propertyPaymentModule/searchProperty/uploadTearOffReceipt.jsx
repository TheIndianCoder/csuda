import React from 'react'
import { Select, Option, Button, Textarea, Checkbox } from "@material-tailwind/react";

function UploadTearOffReceipt() {
    return (
        <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none  border border-gray-500 lg:max-w-full">
            <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                <h2 className="text-sm font-semibold text-center text-white">
                    Payment Reciept Details
                </h2>
            </nav>
            <div className="flex flex-col mb-1">
                <div className="overflow-x-auto">
                    <div className="p-2.5 inline-block align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="preview-payment-form-table-laypout">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-xs text-center font-bold whitespace-normal text-gray-700 uppercase border border-gray-300"
                                        >
                                            Sl. No.
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-xs text-center font-bold whitespace-normal text-gray-700 uppercase border border-gray-300"
                                        >
                                            Transaction No.
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-xs text-center font-bold whitespace-normal text-gray-700 uppercase border border-gray-300"
                                        >
                                            Date
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-xs text-center font-bold whitespace-normal text-gray-700 uppercase border border-gray-300"
                                        >
                                            From Year
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-xs text-center font-bold whitespace-normal   text-gray-700 uppercase border border-gray-300"
                                        >
                                            Upto Year
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-xs text-center font-bold whitespace-normal   text-gray-700 uppercase border border-gray-300 "
                                        >
                                            Payment Mode
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-xs text-center font-bold whitespace-normal   text-gray-700 uppercase  border border-gray-300"
                                        >
                                            Demand Amount
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-xs text-center font-bold whitespace-normal   text-gray-700 uppercase border border-gray-300 "
                                        >
                                            Form Fee
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-xs text-center font-bold whitespace-normal   text-gray-700 uppercase border border-gray-300"
                                        >
                                            Penalty
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-xs text-center font-bold   whitespace-normal text-gray-700 uppercase border border-gray-300"
                                        >
                                            Discount
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-xs text-center font-bold   whitespace-normal text-gray-700 uppercase border border-gray-300"
                                        >
                                            Total Amount
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-xs text-center font-bold   whitespace-normal text-gray-700 uppercase border border-gray-300"
                                        >
                                            Collected by
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-xs text-center font-bold   whitespace-normal text-gray-700 uppercase border border-gray-300"
                                        >
                                            Payment Recipt
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-xs text-center font-bold  whitespace-normal  text-gray-700 uppercase border border-gray-300"
                                        >
                                            Upload acknowledgement
                                        </th>

                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                            1
                                        </td>
                                        <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                            1
                                        </td>
                                        <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                            1
                                        </td>
                                        <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                            9564782364
                                        </td>
                                        <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                            9564782364
                                        </td>
                                        <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                                            9564782364
                                        </td>
                                        <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                                            9564782364
                                        </td>

                                        <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                                            9564782364
                                        </td>
                                        <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                                            9564782364
                                        </td>
                                        <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                                            152
                                        </td>
                                        <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                                            9564782364
                                        </td>
                                        <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                                            9564782364
                                        </td>
                                        <td className="px-6 py-2 text-center text-xs font-medium text-gray-700  whitespace-normal border border-gray-300">
                                        <button type='button' color="green" className='h-6 w-16 px-2 py-1 bg-green-700 rounded text-white text-xs font-semibold custom_button_add'>VIEW</button>
                                        </td>
                                        <td className="px-6 py-2 text-center text-sm font-medium text-gray-700  whitespace-nowrap border border-gray-300">
                                            <div className="flex items-center justify-center bg-grey-lighter">
                                                <label className="w-16 flex flex-col items-center px-1 py-1 custom_button_add text-white rounded shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-green-700 focus:outline-none focus:bg-indigo-600">
                                                    <span className="mt-0 text-xs text-white leading-normal">Upload</span>
                                                    <input type='file' className="hidden" />
                                                </label>
                                            </div>
                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default UploadTearOffReceipt