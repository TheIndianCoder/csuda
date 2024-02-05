import React from 'react'
import { ColorRing } from 'react-loader-spinner'

function DueDetails({
  propertyDueDetails, propDueDetailsErr
}) {
  // console.log("inside due details==========")
  // console.log(propertyDueDetails)
  return (
    <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-md   lg:max-w-full">
      <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red-700 rounded-md">
        <h2 className="text-sm font-semibold text-center text-white">
          Due Details
        </h2>
      </nav>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-2.5 xl:w-full inline-block align-middle">
            <div className="overflow-hidden">
              {
                propertyDueDetails == null ? (
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
                propertyDueDetails?.length > 0 ? (
                  <table className="min-w-full">
                    <thead className="bg-gray-50">

                    </thead>
                    <tbody>
                      {
                        propertyDueDetails.map((item, index) => {
                          return (
                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                              <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                Sl No.
                              </td>
                              <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                                :
                              </td>
                              <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                                {index + 1}
                              </td>
                              <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                Penalty
                              </td>
                              <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                                :
                              </td>
                              <td className="px-4 py-2 text-xs text-red-700 font-bold  whitespace-normal">
                                {item?.penalty}
                              </td>
                              <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                Penal Charge
                              </td>
                              <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                                :
                              </td>
                              <td className="px-4 py-2 text-xs text-red-700 font-bold  whitespace-normal">
                                {item?.penal_charge}
                              </td>
                              <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                Total Amount
                              </td>
                              <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                                :
                              </td>
                              <td className="px-4 py-2 text-xs text-green-700 font-bold whitespace-normal">
                                {item?.total_amount}
                              </td>

                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                )
                  : <p className="text-center font-semibold text-sm text-red-700">{propDueDetailsErr.errMsg}</p>
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DueDetails