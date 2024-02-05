import React from 'react'
import { ColorRing } from 'react-loader-spinner'

function ApplicationDetails({
  propertyDetails, propDetailsErr
}) {
  // if (propertyDetails) {
  //   const { ward_id, property_no, totalbuilbup_area, property_address,
  //     plot_no, entry_type, consumer_no, mohalla, building_name, khata_no } = propertyDetails[0]
  //     console.log("inside app details with===============")
  //     console.log(ward_id)
  // }
  return (
    <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-md   lg:max-w-full">
      <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red-700 rounded-md">
        <h2 className="text-sm font-semibold text-center text-white">
          Application Details
        </h2>
      </nav>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-2.5 lg:w-full inline-block align-middle">
            <div className="overflow-hidden">
            {
                propertyDetails == null ? (
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
              {propertyDetails?.length > 0 ? (
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
                        {propertyDetails[0].ward_id ? propertyDetails[0].ward_id : 'N/A'}
                      </td>
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                        Entry Type
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                        {propertyDetails[0].entry_type ? propertyDetails[0].entry_type : 'N/A'}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                        Property No
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        {propertyDetails[0].property_no ? propertyDetails[0].property_no : 'N/A' }
                      </td>
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                        Consumer No.
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal ">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                        {propertyDetails[0].consumer_no ? propertyDetails[0].consumer_no : 'N/A' }
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                        Property Type
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                        {propertyDetails[0].property_type_name ? propertyDetails[0].property_type_name : "N/A"}
                      </td>
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                        Usage Type
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                        {propertyDetails[0].uses_type_name ? propertyDetails[0].uses_type_name : 'N/A'}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                        Total Area(in Sq.Ft.)
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                        {propertyDetails[0].totalbuilbup_area ? propertyDetails[0].totalbuilbup_area : 'N/A'}
                      </td>
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal"></td>
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal"></td>
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal"></td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                        Address
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        {propertyDetails[0].property_address ? propertyDetails[0].property_address : 'N/A'}
                      </td>
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                        Mohalla
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        {propertyDetails[0].mohalla ? propertyDetails[0].mohalla : 'N/A'}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                        Last Assessment Year
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal ">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        {propertyDetails[0].fy_name ? propertyDetails[0].fy_name : 'N/A'}
                      </td>
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                        Building Name
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        {propertyDetails[0].building_name ? propertyDetails[0].building_name : 'N/A'}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 ">
                        Memo No
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        N/A
                      </td>
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 ">
                        Order Date
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        {propertyDetails[0].stampdate ? new Date(propertyDetails[0].stampdate).toLocaleDateString('en-US') + ' ' + 
                        new Date(propertyDetails[0].stampdate).toLocaleTimeString('en-US') : 'N/A'}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 ">
                        Plot No.
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        {propertyDetails[0].plot_no}
                      </td>
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 ">
                        Khata No.
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                        {propertyDetails[0].khata_no}
                      </td>
                    </tr>
                  </tbody>

                </table>) : <p className='text-center font-semibold text-sm text-red-700' >{propDetailsErr.errMsg}</p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>

    

  )
}

export default ApplicationDetails