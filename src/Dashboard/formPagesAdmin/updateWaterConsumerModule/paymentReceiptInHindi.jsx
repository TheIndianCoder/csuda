import { SUPER, SUPER_BUILD_UP_AREA_PROP_TYPE_ID } from '@/utils/appConstants'
import { convertStringToLowerCaseNTrim, convertTransactionDateToFYFormat, inWords } from '@/utils/commonUtils'
import { Button } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const ENGLISH = `english`  
const HINDI = `hindi`
 
function PaymentReceiptHindi({
    showModal, currModal, propId, switchOnPrevModalNOffCurrModal, setShowReceipt, 
    prevModal, propertyNo,  nextModal, receiptHeader, setDisplayHindiForm, receiptDetails
}) {
    const [lang, setLang] = useState(ENGLISH)
    
    const { t, i18n } = useTranslation()

    let handleChangeLanguage = (language) => {
        // console.log("param lang got :: " + language)
        // setLang(language === ENGLISH ? HINDI : ENGLISH)
        // console.log("language changed to :: " + language)
        // i18n.changeLanguage(language === ENGLISH ? HINDI : ENGLISH)
        setDisplayHindiForm(false)
    }
    let handlePrintToPDF = () => {
        let printwin = window.open("");
        printwin.document.write(document.getElementById("print_section").innerHTML);
        copyStyles(window.document, printwin.document);
        printwin.print();
    }

    const copyStyles = (src, dest) => {
        // console.log("at the start of copying stylesheets")
        Array.from(src.styleSheets).forEach(styleSheet => {
            // console.log("copying stylesheets")
            // console.log(styleSheet.ownerNode)
            dest.head.appendChild(styleSheet.ownerNode.cloneNode(true))
        })
        Array.from(src.fonts).forEach(font => dest.fonts.add(font))
    }
 
    useEffect(()=>{
        console.log('in hindi', receiptDetails)
    },[receiptDetails])
    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden mt-10 mb-10">
            <div className="w-full px-0 pt-0 pb-4 m-auto bg-white rounded-md border border-gray-500 lg:max-w-full">
                <nav className="relative flex navcustomproperty flex-wrap items-center justify-between pl-2 pr-0 py-1 mb-2 ring-1 ring-black rounded-none">
                    <h2 className="text-sm font-semibold text-center text-white">
                        PAYMENT RECEIPT
                    </h2>
                    {/* <button onClick={() => switchOnPrevModalNOffCurrModal(currModal, prevModal)}
                                className="w-24 h-8 px-0 py-0 mx-4 my-0 tracking-wide text-white text-sm font-semibold transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
                                Back
                            </button> */}
                    {/* <Button color="green" className='h-6 w-40 m-2 px-2 py-1 bg-green-700 rounded custom_button_add' 
                        onClick={() => handleChangeLanguage(lang)} >Change to {lang === 'hindi' ? ENGLISH : HINDI}</Button> */}
                    <Button color="green" className='h-6 w-40 m-2 px-2 py-1 bg-green-700 rounded custom_button_add'
                        // onClick={() => switchOnPrevModalNOffCurrModal(currModal, nextModal)} >
                        onClick={() => handleChangeLanguage(currModal, nextModal)} >
                            RECEIPT IN ENGLISH
                        </Button>
                </nav>
                {/* <form className="mt-4 ">
                        <div className="h-screen bg-white py-10 px-2">
                        <div className="container mx-auto">
                            <div className="max-w-sm mx-auto md:max-w-lg">
                                <div className="w-full"> */}
                {/* <div className="row-container"> */}
                {/* <iframe src="https://jsfiddle.net/about" class="second-row"></iframe> */}
                {/* <Iframe id='printf' name='printf' className='second-row' > */}
                <section id='print_section' className="py-0  bg-white">
                    <div className="max-w-3xl mx-auto py-5 bg-white">

                        <article className="overflow-hidden border-dotted border-2 border-black">
                            <div className="bg-[white] rounded-b-md bg-img">
                                <div className="p-2">
                                    <div className="space-y-2 text-slate-700">
                                        <div className="flex flex-col mb-1">
                                            <div className="overflow-x-auto">
                                                <div className="p-1 lg:w-full inline-block align-middle">
                                                    <div className="overflow-hidden">
                                                        <table className="min-w-full">
                                                            <thead className="preview-payment-form-table-laypout">
                                                            </thead>
                                                            <tbody className="divide-y divide-gray-200">
                                                                <tr>
                                                                    <td className="px-1 py-1 text-center  whitespace-nowrap">
                                                                        <img className="h-12" src="/img/Bhilai_recipt.png" />
                                                                    </td>
                                                                    <td className="px-1 py-1 text-center  whitespace-nowrap">
                                                                        <p className="text-3xl font-extrabold tracking-tight uppercase font-body text-center">
                                                                            कार्यालय नगर पालिक निगम, भिलाई</p>
                                                                    </td>
                                                                    <td className="px-1 py-1 text-center  whitespace-nowrap">
                                                                        <img className="h-12" src="/img/swachh_bharat.jpg" />
                                                                    </td>

                                                                </tr>


                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-xl font-bold mb-2 tracking-tight uppercase font-body text-center">
                                            {/* सम्पति कर का रसीद */}
                                            {receiptDetails.description}
                                            {/* {
                                               receiptDetails?.check_status == '1' ||
                                                    convertStringToLowerCaseNTrim(receiptDetails?.mode_of_payment) == 'cash' ?
                                                    `` : ` (अस्थायी)`
                                            } */}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="overflow-x-auto">
                                        <div className="p-2.5 lg:w-full inline-block align-middle">
                                            <div className="overflow-hidden">
                                                <table className="min-w-full">
                                                    <thead className="bg-gray-50">

                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                                                रसीद संख्या
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                                {receiptDetails?.receiptNo}
                                                            </td>
                                                            <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                                                विभाग / अनुभाग
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                                {receiptDetails?.departmentSection}
                                                            </td>

                                                        </tr>
                                                        <tr>
                                                            <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                खाते का विवरण
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">

                                                                {receiptDetails?.accountDescription}

                                                            </td>
                                                            <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                दिनांक
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                                {receiptDetails?.date}

                                                            </td>

                                                        </tr>
                                                        <tr>
                                                            <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                वार्ड नं
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900  whitespace-normal">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                {receiptDetails?.wardId}

                                                            </td>
                                                            <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                सम्पति संख्या
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                                {receiptDetails?.propertyNo}

                                                            </td>

                                                        </tr>
                                                        <tr>
                                                            {/* <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 ">
                                Consumer No.
                            </td>
                            <td className="px-3 py-0 text-xs text-gray-900 ">
                                :
                            </td>
                            <td className="px-3 py-0 text-xs text-gray-900 ">
                                1022566006

                            </td> */}
                                                            <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                उपयोग के प्रकार
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900  whitespace-normal">
                                                                {receiptDetails?.uses_type_name}

                                                            </td>

                                                        </tr>
                                                        <tr>
                                                            <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                नाम
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900  whitespace-normal">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">

                                                                {receiptDetails.consumerName}

                                                            </td>
                                                            <td className="px-3 py-0 font-semibold text-xs  font-medium text-gray-900 whitespace-normal ">
                                                                मोबाइल
                                                            </td>
                                                            <td className="px-3 py-0 font-semibold text-xs  text-gray-900 whitespace-normal">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 font-normal text-xs  text-gray-900 whitespace-normal">
                                                                {receiptDetails?.mobileNo}
                                                            </td>
                                                        </tr>
                                                        <tr>

                                                            <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                                                पता
                                                            </td>
                                                            <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 font-normal text-xs text-gray-900 ">
                                                                {receiptDetails?.address}
                                                            </td>
                                                            <td className="px-3 py-0 font-semibold text-xs  font-medium text-gray-900 whitespace-normal">
                                                            कुल अवधि
                                                            </td>
                                                            <td className="px-3 py-0 font-semibold text-xs  text-gray-900 whitespace-normal">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 font-normal text-xs  text-gray-900 whitespace-normal">
                                                                {receiptDetails?.totalPeriod}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="px-1 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                                                <div className="flex flex-col mb-1">
                                                                    <div className="overflow-x-auto">
                                                                        <div className="p-1.5 lg:w-full inline-block align-middle">
                                                                            <div className="overflow-hidden">
                                                                                <table className="min-w-full">
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th
                                                                                                scope="col"
                                                                                                className="px-1 py-1 text-xs text-center font-semibold  text-gray-700 whitespace-normal  border border-gray-300"
                                                                                            >
                                                                                                Floor
                                                                                            </th>
                                                                                            <th
                                                                                                scope="col"
                                                                                                className="px-1 py-1 text-xs text-center font-semibold  text-gray-700 whitespace-normal  border border-gray-300"
                                                                                            >
                                                                                                {
                                                                                                   receiptDetails.propertyTypeId == SUPER_BUILD_UP_AREA_PROP_TYPE_ID ? SUPER : ''
                                                                                                }
                                                                                                Buildup(Sq.ft)
                                                                                            </th>
                                                                                            <th
                                                                                                scope="col"
                                                                                                className="px-1 py-1 text-xs text-center font-semibold  text-gray-700 whitespace-normal  border border-gray-300"
                                                                                            >
                                                                                                Usage
                                                                                            </th>


                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody className="divide-y divide-gray-200">
                                                                                        {
                                                                                           receiptDetails?.floor_details?.map((item, index) => {
                                                                                                const { floor_name, built_up_area, usage } = item
                                                                                                return (
                                                                                                    <tr key={index} >
                                                                                                        <td className="px-1 py-1 text-center text-xs font-medium text-gray-700 whitespace-normal border border-gray-300">
                                                                                                            {floor_name ? floor_name : 'N/A'}
                                                                                                        </td>
                                                                                                        <td className="px-1 py-1 text-center text-xs font-medium text-gray-700 whitespace-normal border border-gray-300">
                                                                                                            {built_up_area ? built_up_area : 'N/A'}
                                                                                                        </td>
                                                                                                        <td className="px-1 py-1 text-center text-xs font-medium text-gray-700 whitespace-normal border border-gray-300">
                                                                                                            {usage ? usage : 'N/A'}
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                )
                                                                                            })
                                                                                        }

                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>



                                                        </tr>




                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col mb-1">
                                    <div className="overflow-x-auto">
                                        <div className="p-2.5 lg:w-full inline-block align-middle">
                                            <div className="overflow-hidden">
                                                <table className="min-w-full">
                                                    <thead className="preview-payment-recipt-form-table-laypout">
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td colSpan="3" className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap">

                                                                <div className="text-left text-xs  text-gray-900 float-left">कुल रुपये </div>
                                                                <div className="text-left text-xs font-semibold  ml-2 text-gray-900 float-left">{receiptDetails?.total} (शब्दों में) </div>
                                                                <div className="Payment_recipt_custom float-left font-semibold text-xs">
                                                                    {
                                                                        (receiptDetails?.total + "").includes(".") ? (
                                                                            inWords((receiptDetails.total + "").split(".")[0]) + " Rs. and " +
                                                                            inWords((receiptDetails.total + "").split(".")[1]) + " Paisa Only"
                                                                        )
                                                                            : (
                                                                                inWords((receiptDetails.total + "")) + " Rs."
                                                                            )
                                                                    }
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="3" className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap">

                                                                <div className="text-left text-xs  text-gray-900 float-left">होल्डिंग टैक्स एवं अन्य के मद मे</div>
                                                                <div className="Payment_recipt_custom_small ml-2 float-left text-xs font-semibold capitalize">
                                                                    {
                                                                        (receiptDetails?.mode_of_payment + "").trim().toLowerCase() ==
                                                                            'card' ?receiptDetails?.card_type + " " : ''
                                                                    }
                                                                    {receiptDetails?.mode_of_payment}
                                                                </div>
                                                                <div className="text-left text-xs  ml-2 text-gray-900 float-left">Online No.</div>
                                                                <div className="Payment_recipt_custom_small float-left font-semibold text-xs">{receiptDetails?.online_no ?receiptDetails?.online_no : `NA`}</div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="3" className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap">

                                                                <div className="text-left text-xs  text-gray-900 float-left">dated</div>
                                                                <div className="Payment_recipt_custom_small float-left font-semibold text-xs">{receiptDetails?.date}</div>
                                                                <div className="text-left text-xs  ml-2 text-gray-900 float-left">drawn on</div>
                                                                <div className="Payment_recipt_custom_small float-left font-semibold text-xs">{receiptDetails?.drawn_on ?receiptDetails?.drawn_on : `NA`}</div>
                                                                <div className="text-left text-xs  ml-2 text-gray-900 float-left">Place of the bank</div>
                                                                <div className="Payment_recipt_custom_small float-left font-semibold text-xs">{receiptDetails?.branch_location ?receiptDetails?.branch_location : `NA`}</div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="3" className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap">

                                                                <div className="text-left text-sm font-semibold text-gray-900 float-left">नोट : ऑनलाइन पेमेंट / चेक / ड्राफ्ट / बैंकर चेक अदायगी के अधीन हैं</div>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col mb-1">

                                    <div className="overflow-x-auto">
                                        <div className="p-2.5 lg:w-full inline-block align-middle">
                                            <div className="overflow-hidden">
                                                <table className="w-full table-fixed">
                                                    <thead className="preview-payment-recipt-form-table-laypout">
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                className="px-1 py-0 text-xs text-left font-bold  whitespace-normal text-gray-900 uppercase border border-gray-900"
                                                            >
                                                                कर का विवरण
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-1 py-0 text-xs text-center font-bold whitespace-normal text-gray-900 uppercase border border-gray-900"
                                                            >
                                                                अवधि
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-1 py-0 text-xs text-left font-bold  whitespace-normal text-gray-900 uppercase border border-gray-900"
                                                            >
                                                                राशि (रुपये में)
                                                            </th>

                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        {
                                                           receiptDetails?.payment_details ? (
                                                               receiptDetails?.payment_details.map((item, index) => {
                                                                    return (
                                                                        <>
                                                                            {
                                                                               receiptDetails?.payment_details ? (
                                                                                    //receiptDetails?.payment_details[index]?.property_tax_arrear != null &&
                                                                                    //    receiptDetails?.payment_details[index]?.property_tax_arrear != 0 ? (
                                                                                    <tr>
                                                                                        <td className="px-1 py-0 text-left text-xs  whitespace-normal text-gray-900  border border-gray-900">
                                                                                            सम्पति कर बकाया

                                                                                        </td>
                                                                                        <td className="px-1 py-0 text-center text-xs text-gray-900 whitespace-normal border border-gray-900">
                                                                                            {receiptDetails?.payment_details[index]?.previousEffectYear ?
                                                                                               receiptDetails?.payment_details[index]?.previousEffectYear :
                                                                                                (receiptDetails?.payment_details[0]?.currentEffectYear ?
                                                                                                   receiptDetails?.payment_details[0]?.currentEffectYear : 'N/A')}
                                                                                            {/* {` To `}

                                                                                            {receiptDetails?.payment_details[0]?.currentEffectYear ?
                                                                                               receiptDetails?.payment_details[index]?.currentEffectYear :
                                                                                                convertTransactionDateToFYFormat(receiptDetails.date)
                                                                                            } */}
                                                                                        </td>
                                                                                        <td className="px-1 py-0 text-right text-xs  text-gray-900 whitespace-normal border border-gray-900">
                                                                                            {receiptDetails?.payment_details[index]?.property_tax_arrear != null ?
                                                                                               receiptDetails?.payment_details[index]?.property_tax_arrear : 'N/A'}
                                                                                        </td>
                                                                                    </tr>
                                                                                    // ) : null
                                                                                ) : null


                                                                            }

                                                                            {
                                                                               receiptDetails?.payment_details ? (
                                                                                    // (receiptDetails?.payment_details[0]?.property_tax != null &&
                                                                                    //    receiptDetails?.payment_details[0]?.property_tax != 0) ?
                                                                                    // (
                                                                                    <tr>
                                                                                        <td className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-normal border border-gray-900">
                                                                                            सम्पति कर चालु
                                                                                        </td>
                                                                                        <td className="px-1 py-0 text-center text-xs  text-gray-900 whitespace-normal border border-gray-900">
                                                                                            {/* {receiptDetails?.payment_details[index]?.previousEffectYear ?
                                                                                               receiptDetails?.payment_details[index]?.previousEffectYear :
                                                                                                (receiptDetails?.payment_details[0]?.currentEffectYear ?
                                                                                                   receiptDetails?.payment_details[0]?.currentEffectYear : 'N/A')} {` To `} */}

                                                                                            {receiptDetails?.payment_details[0]?.currentEffectYear ?
                                                                                               receiptDetails?.payment_details[index]?.currentEffectYear :
                                                                                                convertTransactionDateToFYFormat(receiptDetails.date)
                                                                                            }
                                                                                        </td>
                                                                                        <td className="px-1 py-0 text-right text-xs  text-gray-900 whitespace-normal border border-gray-900">
                                                                                            {receiptDetails?.payment_details[index]?.property_tax != null ?
                                                                                               receiptDetails?.payment_details[index]?.property_tax : 'N/A'}
                                                                                        </td>
                                                                                    </tr>
                                                                                    // ) : null
                                                                                ) : null

                                                                            }
                                                                            {
                                                                               receiptDetails?.payment_details ? (
                                                                                    //receiptDetails?.payment_details[0]?.smerik_kar_arrear != null &&
                                                                                    //    receiptDetails?.payment_details[0]?.smerik_kar_arrear != 0 ?
                                                                                    // (
                                                                                    <tr>
                                                                                        <td className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-normal border border-gray-900">
                                                                                            समेकित कर बकाया
                                                                                        </td>
                                                                                        <td className="px-1 py-0 text-center text-xs text-gray-900 whitespace-normal border border-gray-900">
                                                                                            {receiptDetails?.payment_details[index]?.previousEffectYear ?
                                                                                               receiptDetails?.payment_details[index]?.previousEffectYear :
                                                                                                (receiptDetails?.payment_details[0]?.currentEffectYear ?
                                                                                                   receiptDetails?.payment_details[0]?.currentEffectYear : 'N/A')}
                                                                                            {/* {` To `}

                                                                                            {receiptDetails?.payment_details[0]?.currentEffectYear ?
                                                                                               receiptDetails?.payment_details[index]?.currentEffectYear :
                                                                                                convertTransactionDateToFYFormat(receiptDetails.date)
                                                                                            } */}
                                                                                        </td>
                                                                                        <td className="px-1 py-0 text-right text-xs  text-gray-900 whitespace-normal border border-gray-900">
                                                                                            {receiptDetails?.payment_details[index]?.smerik_kar_arrear != null ?
                                                                                               receiptDetails?.payment_details[index]?.smerik_kar_arrear : 'N/A'}
                                                                                        </td>
                                                                                    </tr>
                                                                                    // ) : null
                                                                                ) : null

                                                                            }
                                                                            {
                                                                               receiptDetails?.payment_details ? (
                                                                                    //receiptDetails?.payment_details[0]?.smerik_kar_arrear != null &&
                                                                                    //    receiptDetails?.payment_details[0]?.smerik_kar_arrear != 0 ?
                                                                                    // (
                                                                                    <tr>
                                                                                        <td className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-normal border border-gray-900">
                                                                                            समेकित कर चालु
                                                                                        </td>
                                                                                        <td className="px-1 py-0 text-center text-xs text-gray-900 whitespace-normal border border-gray-900">
                                                                                            {/* {receiptDetails?.payment_details[index]?.previousEffectYear ?
                                                                                               receiptDetails?.payment_details[index]?.previousEffectYear :
                                                                                                (receiptDetails?.payment_details[0]?.currentEffectYear ?
                                                                                                   receiptDetails?.payment_details[0]?.currentEffectYear : 'N/A')} {` To `} */}

                                                                                            {receiptDetails?.payment_details[0]?.currentEffectYear ?
                                                                                               receiptDetails?.payment_details[index]?.currentEffectYear :
                                                                                                convertTransactionDateToFYFormat(receiptDetails.date)
                                                                                            }
                                                                                        </td>
                                                                                        <td className="px-1 py-0 text-right text-xs  text-gray-900 whitespace-normal border border-gray-900">
                                                                                            {receiptDetails?.payment_details[index]?.samerik_kar != null ?
                                                                                               receiptDetails?.payment_details[index]?.samerik_kar : 'N/A'}
                                                                                        </td>
                                                                                    </tr>
                                                                                    // ) : null
                                                                                ) : null

                                                                            }
                                                                            {
                                                                               receiptDetails?.payment_details ? (
                                                                                    //receiptDetails?.payment_details[0]?.education_cess_arrear != null &&
                                                                                    //    receiptDetails?.payment_details[0]?.education_cess_arrear != 0 ?
                                                                                    // (
                                                                                    <tr>
                                                                                        <td className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-normal border border-gray-900">
                                                                                            शिक्षा उपकर बकाया
                                                                                        </td>
                                                                                        <td className="px-1 py-0 text-center text-xs text-gray-900 whitespace-normal border border-gray-900">
                                                                                            {receiptDetails?.payment_details[index]?.previousEffectYear ?
                                                                                               receiptDetails?.payment_details[index]?.previousEffectYear :
                                                                                                (receiptDetails?.payment_details[0]?.currentEffectYear ?
                                                                                                   receiptDetails?.payment_details[0]?.currentEffectYear : 'N/A')}
                                                                                            {/* {` To `}

                                                                                            {receiptDetails?.payment_details[0]?.currentEffectYear ?
                                                                                               receiptDetails?.payment_details[index]?.currentEffectYear :
                                                                                                convertTransactionDateToFYFormat(receiptDetails.date)
                                                                                            } */}
                                                                                        </td>
                                                                                        <td className="px-1 py-0 text-right text-xs  text-gray-900 whitespace-normal border border-gray-900">
                                                                                            {receiptDetails?.payment_details[index]?.education_cess_arrear != null ?
                                                                                               receiptDetails?.payment_details[index]?.education_cess_arrear : 'N/A'}
                                                                                        </td>
                                                                                    </tr>
                                                                                    // ) : null
                                                                                ) : null

                                                                            }

                                                                            {
                                                                               receiptDetails?.payment_details ? (
                                                                                    //receiptDetails?.payment_details[0]?.education_cess != null &&
                                                                                    //    receiptDetails?.payment_details[0]?.education_cess != 0 ?
                                                                                    //     (
                                                                                    <tr>
                                                                                        <td className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-normal border border-gray-900">
                                                                                            शिक्षा उपकर चालु
                                                                                        </td>
                                                                                        <td className="px-1 py-0 text-center text-xs text-gray-900 whitespace-normal border border-gray-900">
                                                                                            {/* {receiptDetails?.payment_details[index]?.previousEffectYear ?
                                                                                               receiptDetails?.payment_details[index]?.previousEffectYear :
                                                                                                (receiptDetails?.payment_details[0]?.currentEffectYear ?
                                                                                                   receiptDetails?.payment_details[0]?.currentEffectYear : 'N/A')} {` To `} */}

                                                                                            {receiptDetails?.payment_details[0]?.currentEffectYear ?
                                                                                               receiptDetails?.payment_details[index]?.currentEffectYear :
                                                                                                convertTransactionDateToFYFormat(receiptDetails.date)
                                                                                            }
                                                                                        </td>
                                                                                        <td className="px-1 py-0 text-right text-xs  text-gray-900 whitespace-normal border border-gray-900">
                                                                                            {receiptDetails?.payment_details[index]?.education_cess != null ?
                                                                                               receiptDetails?.payment_details[index]?.education_cess : 'N/A'}
                                                                                        </td>
                                                                                    </tr>
                                                                                    // ) : null
                                                                                ) : null

                                                                            }
                                                                        </>
                                                                    )
                                                                })
                                                            ) : null
                                                        }
                                                        {
                                                           receiptDetails?.rain_water_harvesting != null
                                                                // &&
                                                                //receiptDetails?.rain_water_harvesting != '0' 
                                                                ? (
                                                                    <tr>
                                                                        <td colSpan="2" className="px-1 py-0 text-right text-xs  font-medium text-gray-900 whitespace-normal border border-gray-900">
                                                                            वर्षा जल संचयन शुल्क
                                                                        </td>
                                                                        <td className="px-1 py-0 text-right text-xs  text-gray-900 font-bold whitespace-nowrap border border-gray-900">
                                                                            {receiptDetails?.rain_water_harvesting != null ?receiptDetails?.rain_water_harvesting : '0'}
                                                                        </td>
                                                                    </tr>

                                                                ) : null
                                                        }
                                                        <tr>
                                                            {
                                                               receiptDetails?.penal_charge != null &&
                                                                   receiptDetails?.penal_charge != '0' ? (
                                                                    <>
                                                                        <td colSpan="2"
                                                                            className="px-1 py-0 text-right text-xs  font-medium text-gray-900 whitespace-normal border border-gray-900">
                                                                            शास्ति अधिरोपित
                                                                        </td>
                                                                        <td className="px-1 py-0 text-right text-xs  text-gray-900 font-bold whitespace-nowrap border border-gray-900">
                                                                            {receiptDetails?.penal_charge != null ?receiptDetails?.penal_charge : '0'}
                                                                        </td>
                                                                    </>
                                                                ) : null
                                                            }


                                                        </tr>

                                                        <tr>
                                                            <td colSpan="2"
                                                                className="px-1 py-0 text-right text-xs font-medium text-gray-900 whitespace-normal border border-gray-900">
                                                                अधिभार
                                                            </td>
                                                            <td className="px-1 py-0 text-right text-xs font-bold text-gray-900 whitespace-nowrap border border-gray-900">
                                                                {receiptDetails?.form_fee != null ?receiptDetails?.form_fee : '0'}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            {
                                                               receiptDetails?.penalty_amount != null &&
                                                                   receiptDetails?.penalty_amount != '0' ? (
                                                                    <>
                                                                        <td colSpan="2"
                                                                            className="px-1 py-0 text-right text-xs font-medium text-gray-900 whitespace-normal border border-gray-900">
                                                                            अधिभार राशि
                                                                        </td>
                                                                        <td
                                                                            className="px-1 py-0 text-right text-xs font-bold text-gray-900 whitespace-nowrap border border-gray-900">
                                                                            {receiptDetails?.penalty_amount != null ?receiptDetails?.penalty_amount : '0'}
                                                                        </td>
                                                                    </>
                                                                ) : null
                                                            }

                                                        </tr>
                                                        <tr>
                                                            <td colSpan="2"
                                                                className="px-1 py-0 text-right text-xs font-medium text-gray-900 whitespace-normal border border-gray-900">
                                                                कुल देय
                                                            </td>
                                                            <td className="px-1 py-0 text-right text-xs font-bold text-gray-900 whitespace-nowrap border border-gray-900">
                                                                {receiptDetails?.total != null ?receiptDetails?.total : '0'}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="2"
                                                                className="px-1 py-0 text-right text-xs font-medium text-gray-900 whitespace-normal border border-gray-900">
                                                                कुल प्राप्य
                                                            </td>
                                                            <td className="px-1 py-0 text-right text-xs font-medium text-gray-900 whitespace-nowrap border border-gray-900">
                                                                {receiptDetails?.adjustment_amount != null ?receiptDetails?.adjustment_amount : '0'}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="overflow-x-auto">
                                        <div className="p-1.5 lg:w-full inline-block align-middle">
                                            <div className="overflow-hidden">
                                                <table className="table-fixed w-full">
                                                    <thead className="bg-gray-50">

                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            {/* <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-nowrap">
                                <img className="w-32" src='/img/QR_Code.png' />
                            </td> */}

                                                            <td className="px-3 py-0 text-right text-xs text-gray-900 font-bold whitespace-normal">
                                                                टैक्स कलेक्टर का हस्ताक्षर
                                                            </td>

                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-xs font-light mx-3 my-2 text-slate-700">
                                    <h2 className="mb-1 text-xs font-semibold text-gray-900 dark:text-white">Note:</h2>
                                    <ul className="list-disc px-10">
                                        <li className="mt-0 mb-0">
                                            <span className="font-normal text-xs text-gray-900 dark:text-white">
                                                यह कंप्यूटर जनित रसीद है इस रसीद मे हस्ताक्षर की आवश्यकता नहीं है |
                                            </span>
                                        </li>
                                        <li className="mt-0 mb-0">
                                            <span className="font-normal text-xs text-gray-900 dark:text-white">
                                                संपत्ति कर भूमि या मकान का मालिकाना हक़ प्रदान नहीं करता है</span>
                                        </li>
                                        <li className="mt-0 mb-0">
                                            <span className="font-normal text-xs text-gray-900 dark:text-white">संपर्क करें 1800 890 4115</span>
                                        </li>
                                        <li className="mt-0 mb-0">
                                            <span className="font-normal text-xs font-semibold text-gray-900 dark:text-white">
                                                ऑनलाइन पेमेंट / चेक / ड्राफ्ट / बैंकर चेक अदायगी के अधीन हैं
                                            </span>
                                        </li>
                                        {/* <li className="mt-0 mb-0">
                                                    <span className="font-normal text-xs text-gray-900 dark:text-white">You may validate receipt by scanning QR Code.</span>
                                                </li> */}
                                        <li className="mt-0 mb-0">
                                            <span className="font-normal text-xs text-gray-900 dark:text-white">प्रिन्ट दिनांक : {
                                                (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleDateString()
                                            }</span>
                                        </li>
                                    </ul>
                                    {/* </li> */}
                                </div>

                                <div className="flex flex-col">
                                    <div className="overflow-x-auto">
                                        <div className="p-1 mb-3 lg:w-full inline-block align-middle">
                                            <div className="overflow-hidden">
                                                <table className="table-fixed w-full">
                                                    <thead className="bg-gray-50">

                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="px-3 py-0 font-bold text-xs font-normal text-gray-900 whitespace-normal">
                                                                कार्यालय नगर पालिक निगम, भिलाई
                                                            </td>
                                                            <td className="px-3 py-0 text-right text-xs text-gray-900 font-normal whitespace-normal">
                                                                In Collaboration With <b>Sri Publications & Stationers Pvt. Ltd.</b>
                                                            </td>

                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </article>
                    </div >

                </section >

                {/* </Iframe> */}
                {/* </div> */}

                <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-none mt-4 lg:max-w-full">

                    <div className="container py-2 px-10 mx-0 min-w-full flex flex-col items-center">
                        <div className="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
                            {/* <CustomBackButton showCustomBackButton={true} /> */}

                            <button onClick={() => setShowReceipt(false)}
                                className="w-36 h-8 px-0 py-0 mx-4 my-0 tracking-wide text-white text-sm font-semibold transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
                                Back
                            </button>
                            <button
                                onClick={handlePrintToPDF} className=" w-36 h-8 px-4 py-1 mx-4 mb-2 tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
                                Print
                            </button>

                            {/* <button onClick={() => switchOnNextModalNOffCurrModal(currModal, nextModal)}
                                    className="w-36 h-8 px-4 py-1  mx-4 mb-2 tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-indigo-600">
                                    Proceed
                                </button> */}
                        </div>



                    </div>

                </div>
                {/* </div>
                            </div>
                        </div>
                       </div>
                        </form> */}
            </div>

        </div>
    )
}

export default PaymentReceiptHindi