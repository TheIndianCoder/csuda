import { SOMETHING_WENT_WRONG } from '@/utils/appConstants'
import { ColorRingCustom, NotFoundErrorMessageCustom } from '@/utils/commonComponents'
import { isBlankString } from '@/utils/formValidatorUtils'
import React from 'react'

function ViewConsumerDetails({
    consumerDetails, isConsumerDetailsLoading, isConsumerDetailsLoaded
}) {
    return (
        <div className="w-full px-0 pt-0 pb-4 m-auto bg-white rounded-none border border-gray-500 lg:max-w-full">
            <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                <h2 className="text-sm font-semibold text-center text-white">
                    Consumer Details
                </h2>
            </nav>
            <div className="flex flex-col">
                {
                    isConsumerDetailsLoading == true ? (
                        <ColorRingCustom />
                    ) : null
                }
                {
                    isConsumerDetailsLoaded == false ? (
                        <NotFoundErrorMessageCustom
                            message={SOMETHING_WENT_WRONG}
                            text_size={`sm`}
                        />
                    ) : null
                }
                {
                    isConsumerDetailsLoaded == true && consumerDetails?.length < 1 ? (
                        <NotFoundErrorMessageCustom
                            message={`No consumer details found !`}
                            text_size={`sm`}
                        />
                    ) : null
                }
                {
                    isConsumerDetailsLoaded == true && consumerDetails?.length > 0 ? (
                        consumerDetails.map((item, index) => {
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
                                                            Ward No.
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                                                            :
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                                                            {!isBlankString(item.ward_no) ? item.ward_no : `N/A`}
                                                        </td>
                                                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                                            Holding No.
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                                                            :
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                                                        {!isBlankString(item.holding_no) ? item.holding_no : `N/A`}
                                                        </td>
                                                    </tr>
                                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                                                            Consumer Name
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                                                            :
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                                                        {!isBlankString(item.consumer_name) ? item.consumer_name : `N/A`}
                                                        </td>
                                                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                                                            Consumer No.
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal ">
                                                            :
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                                                        {!isBlankString(item.consumer_no) ? item.consumer_no : `N/A`}
                                                        </td>
                                                    </tr>
                                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                                                            Guardian Name
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                                                            :
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                                                        {!isBlankString(item.gradian_name) ? item.gradian_name : `N/A`}
                                                        </td>
                                                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                                                            Relation
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                                                            :
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                                                        {!isBlankString(item.relation) ? item.relation : `N/A`}
                                                        </td>
                                                    </tr>
                                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                                                            Mobile No.
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                                                            :
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                                                        {!isBlankString(item.mobile_no) ? item.mobile_no : `N/A`}
                                                        </td>
                                                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                                                            Consumer Type
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                                                            :
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                                                        {!isBlankString(item.consumer_type) ? item.consumer_type : `N/A`}
                                                        </td>
                                                    </tr>
                                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                                                            Address
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal ">
                                                            :
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                                                        {!isBlankString(item.address) ? item.address : `N/A`}
                                                        </td>
                                                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                                                            House/Flat No.
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                                                            :
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                                                        {!isBlankString(item.house_flat_no) ? item.house_flat_no : `N/A`}
                                                        </td>
                                                    </tr>
                                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 ">
                                                            Landmark
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                                                            :
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                                                        {!isBlankString(item.land_mark) ? item.land_mark : `N/A`}
                                                        </td>
                                                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 ">
                                                            Police Station
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                                                            :
                                                        </td>
                                                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                                                        {!isBlankString(item.police_station) ? item.police_station : `N/A`}
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

export default ViewConsumerDetails