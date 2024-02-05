import React, { Component, useState } from 'react'
import { Select, Option, Button, Textarea, Checkbox } from "@material-tailwind/react";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import PropertyDetails from './propertyDetails';
import SearchProperty from './searchProperty';
import ViewPaymentDetails from './viewPaymentDetails';
import PayPropertyTax from './payPropertyTax';
import PaymentReceipt from './paymentReceipt'
import PaymentReceiptHindi from './paymentReceiptHindi';
// import SampleFunc from './sampleFunc';

export function MainPagePayPropertyTax() {
    const [ toggle, setToggle ] = useState(true)
    const handleToggle = () => {
        setToggle(!toggle)
    }
        return (
            <>
                {/* <PropertyDetails /> */}

                {/* <SearchProperty /> */}

                {/* <ViewPaymentDetails /> */}

                {/* <PayPropertyTax /> */}

                {/* <Button onClick={handleToggle} >toggle</Button> */}
                {
                    toggle ? <PaymentReceipt handleToggle={handleToggle} /> : <PaymentReceiptHindi handleToggle={handleToggle} />
                }

                {/* <SampleFunc /> */}
            </>

        )
}

export default MainPagePayPropertyTax