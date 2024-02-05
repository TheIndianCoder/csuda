import React, { useState, useEffect } from "react";
import { Select, Option } from "@material-tailwind/react";
import { useMaterialTailwindController } from "@/Dashboard/context";
import { getCookieByName } from "@/utils/RequireAuth";
import { isBlankString } from "@/utils/formValidatorUtils";
import { isStringContainOnlyDigits } from "@/utils/formValidatorUtils";
import SearchUserForDemandNPayment from '@/Dashboard/formPagesAdmin/userChargesModule/userChargesDemandAndPayment/searchUserForDemandNPayment'
import ViewUserUpdateConsumer from '@/Dashboard/formPagesAdmin/userChargesModule/userChargesDemandAndPayment/viewUserUpdateConsumer'
import ViewUserPaymentReceipt from '@/Dashboard/formPagesAdmin/userChargesModule/userChargesDemandAndPayment/viewUserPaymentReceipt'

const SEARCH_USER = `searchUser`
const VIEW_USER_DEMAND_DETAILS_AND_PAYMENT = `viewUserUpdateConsumer`
const VIEW_CONSUMER_PAYMENT_RECEIPT = `viewConsumerPaymentReceipt`

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL


const MainpageuserChargesUpdateCategoryRange = () => {

    const [showModalsObj, setShowModalsObj] = useState({
        searchUser: true,
        ViewUserUpdateConsumer: false,
        viewConsumerPaymentReceipt: false,
    })

    const [consumerItemForView, setConsumerItemForView] = useState(null)
    const [paymentDetailsItemForReceiptView, setPaymentDetailsItemForReceiptView] = useState(null)

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

    useEffect(()=>{
        console.log(consumerItemForView,"consumerItemForView")
    },[consumerItemForView])
    return (
        <div className="relative mb-10 flex flex-col justify-center overflow-hidden">
            <>
                <SearchUserForDemandNPayment
                    showModal={showModalsObj[SEARCH_USER]}
                    currModal={SEARCH_USER}
                    nextModal={VIEW_USER_DEMAND_DETAILS_AND_PAYMENT}
                    switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
                    setConsumerItemForView={setConsumerItemForView}
                />
                {
                    showModalsObj[VIEW_USER_DEMAND_DETAILS_AND_PAYMENT] == true ? (
                        <>
                            <ViewUserUpdateConsumer
                                showModal={showModalsObj[VIEW_USER_DEMAND_DETAILS_AND_PAYMENT]}
                                currModal={VIEW_USER_DEMAND_DETAILS_AND_PAYMENT}
                                prevModal={SEARCH_USER}
                                // nextModal={VIEW_CONSUMER_PAYMENT_RECEIPT}
                                switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
                                consumerItemForView={consumerItemForView}
                            // setPaymentDetailsItemForReceiptView={setPaymentDetailsItemForReceiptView}
                            />



                        </>
                    ) : null
                }
            </>
        </div>
    );
};

export default MainpageuserChargesUpdateCategoryRange;
