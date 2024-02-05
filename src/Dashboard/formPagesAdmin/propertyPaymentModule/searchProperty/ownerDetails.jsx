import React from 'react'
import { ColorRing } from 'react-loader-spinner'

function OwnerDetails({
  propertyOwnerDetails, propOwnerDetailsErr
}) {

  return (
    <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-md  lg:max-w-full">
      <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red-700 rounded-md">
        <h2 className="text-sm font-semibold text-center text-white">
          Owner Details
        </h2>
      </nav>
      <div className="flex flex-col mb-1">
        <div className="overflow-x-auto">
          <div className="p-2.5 2xl:w-full inline-block align-middle">
            <div className="overflow-hidden">
            {
                propertyOwnerDetails == null ? (
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
                propertyOwnerDetails?.length > 0 ? (
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
                        Owner ID Image
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-2 text-xs text-center font-bold whitespace-normal  text-gray-700 uppercase border border-gray-300"
                      >
                        Owner Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-2 text-xs text-center font-bold whitespace-normal  text-gray-700 uppercase  border border-gray-300"
                      >
                        R/W Guardian
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-2 text-xs text-center font-bold whitespace-normal  text-gray-700 uppercase border border-gray-300 "
                      >
                        Guardian's Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-2 text-xs text-center font-bold whitespace-normal  text-gray-700 uppercase border border-gray-300 "
                      >
                        Email ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-2 text-xs text-center font-bold whitespace-normal  text-gray-700 uppercase border border-gray-300"
                      >
                        Contact No.
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {propertyOwnerDetails.map((item, index) => {
                      return (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                            {index + 1}
                          </td>
                          <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                            <img
                              src="/img/anonymous_silhouette.jpg"
                              className="w-20 h-20 inline border border-gray-700"
                              alt=""
                            />
                          </td>
                          <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                            {item.owner_name}
                          </td>
                          <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                          {item.relation}
                          </td>
                          <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                            {item.guardian_name}
                          </td>

                          <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                            {item.email_id}
                          </td>
                          <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                            {item.mobile_no}
                          </td>
                        </tr>

                      )
                    })}
                  </tbody>
                </table>
                ) : <p className="text-center font-semibold text-sm text-red-700">{propOwnerDetailsErr.errMsg}</p>
              }
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default OwnerDetails