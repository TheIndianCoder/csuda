import React, { useEffect, useRef, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { Select, Option, Button, Textarea, Checkbox, Tooltip, Switch } from "@material-tailwind/react";
import { isEqual } from 'lodash'

function DemandDetails({
  propertyDemandDetails,
  propDemandDetailsErr,
  setDemandDetailsForDemandEntry
}) {
  const useHasChanged = (val) => {
    val = JSON.stringify(val)
    console.log("executing :: hasPropertyDemandDetailsChanged")
    console.log("current val")
    // console.log(val)
    let prevVal = usePrevious(val)
    // prevVal = JSON.stringify(prevVal)
    console.log("prev val")
    // console.log(prevVal)
    console.log("test of isEqual from lodash :: " + (val === prevVal) )
    // console.log("hasPropertyDemandDetailsChanged :: " + isEqual( val, prevVal ))
    // return isEqual( val, prevVal )
    return val !== prevVal
  }

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const [demandDetails, setDemandDetails] = useState([])
  const [checkedDemandDetailsIndicesObj, setCheckedDemandDetailsIndicesObj] = useState({})
  const [currentActiveCheckboxCounter, setCurrentActiveCheckboxCounter] = useState(0)
  const hasPropertyDemandDetailsChanged = useHasChanged(propertyDemandDetails)

  const handleDemandCheckboxChange = (event, demandObj, index) => {
    console.log("============demand=========================")
    // console.log(event)
    // console.log(demandObj)
    const isChecked = event?.target?.checked
    const eventId = event?.target?.id.toString()
    //checkbox select condition=====================================
    if (isChecked == true) {
      //parent checkbox case========================================
      if (eventId.includes('parent')) {
        setDemandDetails(demandObj)
        let tempIndices = {}
        demandObj.map((item, index) => {
          tempIndices[index] = true
        })
        setCheckedDemandDetailsIndicesObj(prevState => {
          return tempIndices
        })
        setCurrentActiveCheckboxCounter(demandObj.length)
      } //child checkbox case=======================================
      else if (eventId.includes('child')) {
        setDemandDetails(prevState => {
          let tempArr = prevState.map(item => item)
          // console.log("tempArr====")
          // console.log(tempArr)
          tempArr.splice(index, 0, demandObj)
          return tempArr
        })
        setCheckedDemandDetailsIndicesObj(prevState => {
          return {
            ...prevState, [index]: true
          }
        })
        setCurrentActiveCheckboxCounter(prevState => {
          return prevState + 1
        })
      }
    }//checkbox unselect condition=================================== 
    else if (isChecked == false) {
      //parent checkbox case========================================
      if (eventId.includes('parent')) {
        setDemandDetails([])
        setCheckedDemandDetailsIndicesObj({})
        setCurrentActiveCheckboxCounter(0)
      } //child checkbox case=======================================
      else if (eventId.includes('child')) {
        //Checking if last selected checkbox
        if (demandDetails?.length == 1) {
          setDemandDetails([])
          setCheckedDemandDetailsIndicesObj({})
          setCurrentActiveCheckboxCounter(prevState => {
            return prevState - 1
          })
        } else if (demandDetails?.length > 1) {
          setDemandDetails(prevState => {
            let tempArr = prevState.map(item => item)
            tempArr.splice(index, 1)
            return tempArr
          })
          setCheckedDemandDetailsIndicesObj(prevState => {
            return {
              ...prevState, [index]: false
            }
          })
          setCurrentActiveCheckboxCounter(prevState => {
            return prevState - 1
          })
        }
      }
    }
  }

  useEffect(() => {
    console.log(checkedDemandDetailsIndicesObj)
  }, [checkedDemandDetailsIndicesObj])

  useEffect(() => {
    setDemandDetailsForDemandEntry(demandDetails)
  }, [demandDetails])

  useEffect(() => {
    // console.log(propertyDemandDetails)
    console.log("inside useEffect :: hasPropertyDemandDetailsChanged :: " + hasPropertyDemandDetailsChanged)
    if ( hasPropertyDemandDetailsChanged ) {
      if (propertyDemandDetails?.length > 0) {
        console.log("resetting checkboxes=======")
        setDemandDetails([])
        setCheckedDemandDetailsIndicesObj({})
        setCurrentActiveCheckboxCounter(0)
      }
    }
  }, [propertyDemandDetails])

  useEffect(() => {
    console.log("currentActiveCheckboxCounter" + currentActiveCheckboxCounter)
  }, [currentActiveCheckboxCounter])

  return (
    <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-md   lg:max-w-full">
      <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red-700 rounded-md">
        <h2 className="text-sm font-semibold text-center text-white">
          Demand Details
        </h2>
      </nav>
      <div className="flex flex-col mb-1">
        <div className="overflow-x-auto">
          <div className="p-2.5 2xl:w-full inline-block align-middle">
            <div className="overflow-hidden">
              {
                propertyDemandDetails == null ? (
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
                propertyDemandDetails?.length > 0 ? (
                  <table className="min-w-full">
                    <thead className="preview-payment-form-table-laypout">
                      <tr>
                        <th
                          scope="col"
                          className="w-16 px-6 py-2 text-xs text-center flex font-bold  whitespace-normal text-gray-700 uppercase border border-gray-300"
                        >
                          <input onChange={(event) => handleDemandCheckboxChange(event, propertyDemandDetails)}
                            id="default-checkbox-parent"
                            type="checkbox" checked={demandDetails?.length == propertyDemandDetails?.length ? true : false}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600" />

                        </th>
                        <th
                          scope="col"
                          className="px-6 py-2 text-xs text-center font-bold  text-gray-700  whitespace-normal uppercase border border-gray-300"
                        >

                          SL.No.
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-2 text-xs text-center font-bold  text-gray-700  whitespace-normal uppercase border border-gray-300"
                        >
                          Year
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-2 text-xs text-center font-bold  text-gray-700  whitespace-normal uppercase border border-gray-300"
                        >
                          Due Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-2 text-xs text-center font-bold  text-gray-700  whitespace-normal uppercase border border-gray-300 "
                        >
                          Demand No.
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-2 text-xs text-center font-bold  text-gray-700  whitespace-normal uppercase  border border-gray-300"
                        >
                          Penalty
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-2 text-xs text-center font-bold  text-gray-700  whitespace-normal uppercase border border-gray-300 "
                        >
                          Total Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {
                        propertyDemandDetails.map((item, index) => {
                          return (
                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                              <td className="w-16  px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                <input onChange={(event) => handleDemandCheckboxChange(event, item, index)}
                                  id={`default-checkbox-child-${index}`}
                                  type="checkbox" checked={checkedDemandDetailsIndicesObj[index] == true}
                                  disabled={index != currentActiveCheckboxCounter && index != currentActiveCheckboxCounter - 1}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600" />
                              </td>
                              <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                {index + 1}
                              </td>
                              <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                {item.effect_year}
                              </td>
                              <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                {item.demand_date}
                              </td>
                              <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                                {item.demand_no}
                              </td>
                              <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                                {item.penalty}
                              </td>
                              <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                                {item.total_amount}
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                ) : <p className="text-center font-semibold text-sm text-red-700">{propDemandDetailsErr.errMsg}</p>
              }
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default DemandDetails