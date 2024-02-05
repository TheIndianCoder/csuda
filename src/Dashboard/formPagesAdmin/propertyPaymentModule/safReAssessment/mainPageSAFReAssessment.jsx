import React, { useState } from 'react'
import SafSuccessPage from '../safNewProperty/safSuccessPage'
import SearchProperty from '../searchProperty/searchProperty'
import SafReassessmentEdit from './safReassessmentEdit'

const SEARCH_PROPERTY = `searchProperty`
const RE_ASSESSMENT_FORM = `reAssessmentForm`
const SAF_SUCCESS_PAGE = `safSuccessPage`

function MainPageSAFReAssessment() {
    const [showModalsObj, setShowModalsObj] = useState({
        searchProperty: true,
        reAssessmentForm: false,
        safSuccessPage: false,
    })

    const [propId, setPropId] = useState("")
    const [propertyNo, setPropertyNo] = useState("")

    const switchOnPrevModalNOffCurrModal = (currModalName, prevModalName) => {
        if (prevModalName && currModalName) {
            console.log(showModalsObj)
            //let showCustomBackButtonVal = 
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
            <SearchProperty showModal={showModalsObj[SEARCH_PROPERTY]}
                currModal={SEARCH_PROPERTY} nextModal={RE_ASSESSMENT_FORM}
                switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
                setPropId={setPropId} setPropertyNo={setPropertyNo}
            />
            {
                showModalsObj[RE_ASSESSMENT_FORM] ? <SafReassessmentEdit
                    showSAFNewFormModal={showModalsObj[RE_ASSESSMENT_FORM]}
                    currModal={RE_ASSESSMENT_FORM} nextModal={SAF_SUCCESS_PAGE} prevModal={SEARCH_PROPERTY}
                    switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
                    setPropertyId={setPropId} propId={propId} propertyNo={propertyNo} setPropertyNo={setPropertyNo}
                />
                    : null
            }
            <SafSuccessPage showSAFSuccessModal={showModalsObj.safSuccessPage} prevModal={RE_ASSESSMENT_FORM}
                currModal={SAF_SUCCESS_PAGE} switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal} 
                propId={propertyNo}  />
        </>
    )
}

export default MainPageSAFReAssessment