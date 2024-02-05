import SAF_Form from '@/formPages/PropertyOrHoldingTaxForms/saf_form_for_new_property/saf_form'
import React, { useState } from 'react'
import SafSuccessPage from './safSuccessPage'

const SAF_NEW_PROPERTY = `safNewProperty`
const SAF_SUCCESS_PAGE = `safSuccessPage`
function MainPageSafNewProperty() {
  const [showModalsObj, setShowModalsObj] = useState({
    safNewProperty: true,
    safSuccessPage: false
  }) 
  const [propId, setPropId] = useState("")

  // let prop_id = null

  const switchOnNextModalNOffCurrModal = async (currModalName, nextModalName, msg) => {
    if (nextModalName && currModalName) {
      // let showModalsObj = showModalsObj
      console.log(showModalsObj)
      //let showCustomBackButtonVal = 
      setShowModalsObj((prevState) => {
        return {
          ...prevState,
          [currModalName]: false,
          [nextModalName]: true
        }
      })
    }
  }
  const switchOnPrevModalNOffCurrModal = async (currModalName, prevModalName) => {
    if (prevModalName && currModalName) {
      // let showModalsObj = showModalsObj
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
  const setPropertyId = (propId) => {
    console.log(propId)
    setPropId(propId)
  }
  return (
    <>
      <SAF_Form showSAFNewFormModal={showModalsObj.safNewProperty}
        currModal={SAF_NEW_PROPERTY} nextModal={SAF_SUCCESS_PAGE}
        switchOnNextModalNOffCurrModal={switchOnNextModalNOffCurrModal}
        setPropertyId={setPropertyId} />

      {
        showModalsObj.safSuccessPage ? (
          <SafSuccessPage showSAFSuccessModal={showModalsObj.safSuccessPage} prevModal={SAF_NEW_PROPERTY}
            currModal={SAF_SUCCESS_PAGE} switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal} propId={propId} />
        ) : null
      }

    </>

  )
}

export default MainPageSafNewProperty