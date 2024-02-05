import { SOMETHING_WENT_WRONG } from '@/utils/appConstants'
import { ColorRingCustom, NotFoundErrorMessageCustom } from '@/utils/commonComponents'
import { isBlankString } from '@/utils/formValidatorUtils'
import React, { useEffect } from 'react'

function ViewMonthlyRateDetails({
    monthlyRateDetails, isMonthlyRateDetailsLoading, isMonthlyRateDetailsLoaded
}) {

    return (
        <div className="w-full px-0 pt-0 pb-4 m-auto bg-white rounded-none border border-gray-500 lg:max-w-full">
            <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                <h2 className="text-sm font-semibold text-center text-white">
                    Monthly Rate Details
                </h2>
            </nav>
            <div className="flex flex-col">
                {
                    isMonthlyRateDetailsLoading == true ? (
                        <ColorRingCustom />
                    ) : null
                }
                {
                    isMonthlyRateDetailsLoaded == false ? (
                        <NotFoundErrorMessageCustom 
                        message={SOMETHING_WENT_WRONG}
                        text_size={`sm`}
                        />
                    ) : null
                }
                {
                    isMonthlyRateDetailsLoaded == true && monthlyRateDetails?.length < 1 ? (
                        <NotFoundErrorMessageCustom 
                        message={`No monthly rate found !`}
                        text_size={`sm`}
                        />
                    ) : null
                }
                {
                    isMonthlyRateDetailsLoaded == true && monthlyRateDetails?.length > 0 ? (
                        <div className="overflow-x-auto">
                            <div className="p-2.5 w-full inline-block align-middle">
                                <div className="overflow-hidden">
                                    <table className="w-full">
                                        <thead className="preview-saf-form-table-laypout">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-2 py-2 text-xs font-bold text-center text-gray-700 whitespace-normal uppercase border border-gray-300"
                                                >
                                                    Sl. No.
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-2 py-2 text-xs font-bold text-center text-gray-700 whitespace-normal uppercase border border-gray-300"
                                                >
                                                    Monthly Rate
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-2 py-2 text-xs font-bold text-center text-gray-700  whitespace-normal uppercase border border-gray-300"
                                                >
                                                    Date Of Effect
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {
                                                monthlyRateDetails.map((item, index) => {
                                                    return (
                                                        <tr key={index}
                                                            className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                            <td className="px-6 py-2 text-xs font-normal text-center text-gray-700 whitespace-normal border border-gray-300">
                                                                {index + 1}
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-normal text-center text-gray-700 whitespace-normal border border-gray-300">
                                                                {!isBlankString(item.monthly_rate) ? item.monthly_rate : `N/A`}
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-normal text-center text-gray-700 whitespace-normal border border-gray-300">
                                                                {!isBlankString(item.doe) ? item.doe : `N/A`}
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

export default ViewMonthlyRateDetails