import React from 'react'
import { ColorRing } from 'react-loader-spinner'

function TaxDetails({
  propertyOwnerTaxDetails, propOwnerTaxDetailsErr
}) {

  return (
    <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-md   lg:max-w-full">
      <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red-700 rounded-md">
        <h2 className="text-sm font-semibold text-center text-white">
          Tax Details
        </h2>
      </nav>
      <div className="flex flex-col mb-1">
        <div className="overflow-x-auto">
          <div className="p-2.5 2xl:w-full inline-block align-middle">
            <div className="overflow-hidden">
            {
                propertyOwnerTaxDetails == null ? (
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
                propertyOwnerTaxDetails?.length > 0 ? (
                  <table className="min-w-full">
                    <thead className="preview-payment-form-table-laypout">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-2 text-xs text-center font-bold  text-gray-700 whitespace-normal uppercase border border-gray-300"
                        >
                          SL.No.
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-2 text-xs text-center font-bold  text-gray-700 whitespace-normal uppercase border border-gray-300"
                        >
                          Effect From
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-2 text-xs text-center font-bold  text-gray-700 whitespace-normal uppercase border border-gray-300"
                        >
                          Property Tax
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-2 text-xs text-center font-bold  text-gray-700 whitespace-normal uppercase border border-gray-300 "
                        >
                          Sanitation Tax
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-2 text-xs text-center font-bold  text-gray-700 whitespace-normal uppercase  border border-gray-300"
                        >
                          Composite Tax
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-2 text-xs text-center font-bold  text-gray-700 whitespace-normal uppercase border border-gray-300 "
                        >
                          Common Water Tax
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-2 text-xs text-center font-bold  text-gray-700 whitespace-normal uppercase border border-gray-300"
                        >
                          Personal Water Tax
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-2 text-xs text-center font-bold  text-gray-700 whitespace-normal uppercase border border-gray-300"
                        >
                          Education Cess
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-2 text-xs text-center font-bold  text-gray-700 whitespace-normal uppercase border border-gray-300"
                        >
                          Total Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {
                        propertyOwnerTaxDetails.map((item, index) => {
                          return (
                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                              <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                {index + 1}
                              </td>
                              <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                {item.effect_year}
                              </td>
                              <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                {item.property_tax}
                              </td>
                              <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                                {item.sanitation_tax}
                              </td>
                              <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                                {item.composite_tax}
                              </td>
                              <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                                {item.common_wtr_tax}
                              </td>
                              <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                                {item.personal_wtr_tax}
                              </td>
                              <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                                {item.education_cess}
                              </td>
                              <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                                {item.tot_yearly_tax}
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                ) : <p className="text-center font-semibold text-sm text-red-700">{propOwnerTaxDetailsErr.errMsg}</p>
              }
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default TaxDetails