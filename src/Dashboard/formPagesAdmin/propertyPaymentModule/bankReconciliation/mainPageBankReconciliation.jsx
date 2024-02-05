import { Select, Tooltip } from '@material-tailwind/react'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Stack from '@mui/material/Stack';
import React, { useState } from 'react'
import { TextField } from '@mui/material';
import { useMaterialTailwindController } from '@/Dashboard/context';
import SearchPaymentRecords from '@/Dashboard/formPagesAdmin/propertyPaymentModule/bankReconciliation/searchPaymentRecords';
import ViewPaymentRecords from '@/Dashboard/formPagesAdmin/propertyPaymentModule/bankReconciliation/viewPaymentRecords';

const SEARCH_PAYMENT_RECORDS = `searchPaymentRecords`
const PAYMENT_DETAILS = `paymentDetails`

function MainPageBankReconciliation() {
    const [showModalsObj, setShowModalsObj] = useState({
        searchPaymentRecords: true,
        paymentDetails: false,
    })

    const [paymentRecordIdForPaymentDetailsView, setPaymentRecordIdForPaymentDetailsView] = useState(null)

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
            <SearchPaymentRecords showModal={showModalsObj[SEARCH_PAYMENT_RECORDS]}
                currModal={SEARCH_PAYMENT_RECORDS} nextModal={PAYMENT_DETAILS}
                switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
                setPaymentRecordIdForPaymentDetailsView={setPaymentRecordIdForPaymentDetailsView}
            />
            {
                showModalsObj[PAYMENT_DETAILS] ? <ViewPaymentRecords showModal={showModalsObj[PAYMENT_DETAILS]}
                    currModal={PAYMENT_DETAILS} switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
                    prevModal={SEARCH_PAYMENT_RECORDS}
                    nextModal={SEARCH_PAYMENT_RECORDS}
                    paymentRecordIdForPaymentDetailsView={paymentRecordIdForPaymentDetailsView}
                /> : null
            }
        </>
    )
}

export default MainPageBankReconciliation