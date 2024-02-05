import React from 'react'
import { useState } from 'react'
import SearchAllPaymentReceiptDetailsReport from '@/Dashboard/formPagesAdmin/propertyReportModule/counterCollectionReport/searchAllPaymentReceiptDetailsReport'
import ShowBulkReceipts from '../bulkPaymentReceipt/showBulkReceipts'

const SEARCH_ALL_PAYMENT_RECEIPT_DETAILS_REPORT = `searchAllPaymentReceiptDetailsReport`

function MainPagePaymentDetailsReport() {
    const [showModalsObj, setShowModalsObj] = useState({
        searchAllPaymentReceiptDetailsReport: true,
        searchShowBulkReceipts: false
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
            <SearchAllPaymentReceiptDetailsReport showModal={showModalsObj[SEARCH_ALL_PAYMENT_RECEIPT_DETAILS_REPORT]}
                currModal={SEARCH_ALL_PAYMENT_RECEIPT_DETAILS_REPORT} />

        </>
    )
}

export default MainPagePaymentDetailsReport