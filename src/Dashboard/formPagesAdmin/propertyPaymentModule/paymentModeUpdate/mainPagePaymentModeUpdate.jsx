import React, { useState } from 'react'
import SearchPaymentMode from '@/Dashboard/formPagesAdmin/propertyPaymentModule/paymentModeUpdate/searchPaymentMode'
import ViewOrEditPaymentMode from '@/Dashboard/formPagesAdmin/propertyPaymentModule/paymentModeUpdate/viewOrEditPaymentMode'
import { ColorRingCustom, NotFoundErrorMessageCustom } from '@/utils/commonComponents'
import { SOMETHING_WENT_WRONG } from '@/utils/appConstants'
import { NO_DATA_FOUND } from '@/utils/appConstants'

const SEARCH_PAYMENT_UPDATE = `searchPaymentUpdate`
const UPDATE_PAYMENT_DETAILS = `updatePaymentDetails`

function MainPagePaymentModeUpdate() {
    const [showModalsObj, setShowModalsObj] = useState({
        searchPaymentUpdate: true,
        updatePaymentDetails: true,
    })

    const [paymentDetails, setPaymentDetails] = useState([])
    const [isPaymentDetailsLoading, setIsPaymentDetailsLoading] = useState(null)
    const [isPaymentDetailsLoaded, setIsPaymentDetailsLoaded] = useState(null)

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
            <SearchPaymentMode
                showModal={showModalsObj[SEARCH_PAYMENT_UPDATE]}
                currModal={SEARCH_PAYMENT_UPDATE}
                nextModal={UPDATE_PAYMENT_DETAILS}
                switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
                setIsPaymentDetailsLoading={setIsPaymentDetailsLoading}
                setIsPaymentDetailsLoaded={setIsPaymentDetailsLoaded}
                setPaymentDetails={setPaymentDetails}
            />
            {
                isPaymentDetailsLoading == true ? (
                    <ColorRingCustom />
                ) : null
            }
            {
                isPaymentDetailsLoaded == false ? (
                    <NotFoundErrorMessageCustom
                        message={SOMETHING_WENT_WRONG}
                        text_size={`sm`} />
                ) : null
            }
            {
                isPaymentDetailsLoaded == true &&
                    paymentDetails?.length < 1 ? (
                    <NotFoundErrorMessageCustom
                        message={NO_DATA_FOUND}
                        text_size={`sm`} />
                ) : null
            }
            {
                isPaymentDetailsLoaded == true &&
                    isPaymentDetailsLoading == false &&
                    paymentDetails?.length > 0 ? (
                    <ViewOrEditPaymentMode
                        showModal={showModalsObj[UPDATE_PAYMENT_DETAILS]}
                        currModal={UPDATE_PAYMENT_DETAILS}
                        switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
                        paymentDetails={paymentDetails}
                    />
                ) : null
            }
            
        </>
    )
}

export default MainPagePaymentModeUpdate