import React from 'react'
import SearchWardWiseDemandReport from '@/Dashboard/formPagesAdmin/propertyReportModule/wardWiseDemandReport/searchWardWiseDemandReport'
import { useState } from 'react'

const SEARCH_WARD_WISE_DEMAND_REPORT = `searchWardWiseDemandReport`

function MainPageWardWiseDemandReport() {
  const [showModalsObj, setShowModalsObj] = useState({
    searchWardWiseDemandReport: true,
  })

  const switchOnPrevModalNOffCurrModal = (currModalName, prevModalName) => {
    console.log(currModalName)
    console.log(prevModalName)
    if (prevModalName && currModalName) {
      console.log(showModalsObj)
      setShowModalsObj((prevState) => {
        return {
          ...prevState,
          [currModalName]: false,
          [prevModalName]: true
        }
      })
    }
  }

  return (
    <>
      <SearchWardWiseDemandReport showModal={showModalsObj[SEARCH_WARD_WISE_DEMAND_REPORT]}
        currModal={SEARCH_WARD_WISE_DEMAND_REPORT} />
    </>
  )
}

export default MainPageWardWiseDemandReport