import React from 'react'
import { useState } from 'react'
import SearchTeamWiseSummaryReport from '@/Dashboard/formPagesAdmin/propertyReportModule/teamWiseSummaryReport/searchTeamWiseSummaryReport'

const SEARCH_TEAM_WISE_SUMMARY_REPORT = `searchTeamWiseSummaryReport`

function MainPageTeamWiseSummaryReport() {
  const [showModalsObj, setShowModalsObj] = useState({
    searchTeamWiseSummaryReport: true,
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
      <SearchTeamWiseSummaryReport showModal={showModalsObj[SEARCH_TEAM_WISE_SUMMARY_REPORT]}
        currModal={SEARCH_TEAM_WISE_SUMMARY_REPORT} />
    </>
  )
}

export default MainPageTeamWiseSummaryReport