import { SOMETHING_WENT_WRONG } from '@/utils/appConstants'
import { ColorRingCustom, NotFoundErrorMessageCustom } from '@/utils/commonComponents'
import { isBlankString } from '@/utils/formValidatorUtils'
import React from 'react'

function ViewAreaDetails({
    areaDetails, isAreaDetailsLoading, isAreaDetailsLoaded
}) {
    return (
        <div className="w-full px-0 pt-0 pb-4 m-auto bg-white rounded-none border border-gray-500 lg:max-w-full">
            <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                <h2 className="text-sm font-semibold text-center text-white">
                    Area Details
                </h2>
            </nav>
            <div className="flex flex-col">
                {
                    isAreaDetailsLoading == true ? (
                        <ColorRingCustom />
                    ) : null
                }
                {
                    isAreaDetailsLoaded == false ? (
                        <NotFoundErrorMessageCustom 
                        message={SOMETHING_WENT_WRONG}
                        text_size={`sm`}
                        />
                    ) : null
                }
                {
                    isAreaDetailsLoaded == true && areaDetails?.length < 1 ? (
                        <NotFoundErrorMessageCustom 
                        message={`No area details found !`}
                        text_size={`sm`}
                        />
                    ) : null
                }
                {
                    isAreaDetailsLoaded == true && areaDetails?.length > 0 ? (
                        areaDetails.map((item, index) => {
                            return (
                                <div key={index} className="overflow-x-auto">
                                    <div className="p-2.5 lg:w-full inline-block align-middle">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full">
                                                <thead className="bg-gray-50">
                                                </thead>
                                                <tbody>
                                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                                            Consumer Category
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                                                            :
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal uppercase">
                                                            {!isBlankString(item?.consumer_category) ? item?.consumer_category : `N/A`}
                                                        </td>
                                                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                                            Consumer Range
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                                                            :
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal uppercase">
                                                        {!isBlankString(item?.consumer_range) ? item?.consumer_range : `N/A`}
                                                        </td>
                                                    </tr>
                                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                                                            No. Of House
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                                                            :
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                                                        {!isBlankString(item?.noof_sqft_truck_room) ? item?.noof_sqft_truck_room : `N/A`}
                                                        </td>
                                                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                                                            Amount
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal ">
                                                            :
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-green-700 font-bold whitespace-normal">
                                                        {!isBlankString(item?.amount) ? item?.amount : `N/A`}
                                                        </td>
                                                    </tr>
                                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                                                            Date Of Effect
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                                                            :
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                                                        {!isBlankString(item?.doe) ? item?.doe : `N/A`}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : null
                }
            </div>
        </div>
    )
}

export default ViewAreaDetails