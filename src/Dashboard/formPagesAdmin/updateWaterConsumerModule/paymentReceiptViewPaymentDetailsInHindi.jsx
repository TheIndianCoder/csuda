import React, { useEffect, useState } from 'react'
import { Button } from '@material-tailwind/react'
import { convertStringToLowerCaseNTrim, convertTransactionDateToFYFormat, inWords } from '@/utils/commonUtils'
import { SUPER, SUPER_BUILD_UP_AREA_PROP_TYPE_ID } from '@/utils/appConstants'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL

const PaymentReceiptViewPaymentDetailsInHindi = ({setDisplayHindiForm, consumerNumberAfterCreation, modeOfPayment, val,
    consumerDetails, consumerPaymentDetails, setDisplayConsumerPaymentDetail, setDisplayPrintDemandForm}) => {
    // const [consumerPaymentDetails[val], setconsumerPaymentDetails[val]] = useState([])
    const handleLanguageChange = () => { 
        setDisplayHindiForm(false) 
    } 
    const backHandler = () => { 
        setDisplayConsumerPaymentDetail(true) 
        setDisplayPrintDemandForm(false)
    } 
    const handlePrintToPDF = () => { 
        let printwin = window.open("");
        printwin.document.write(document.getElementById("print_section").innerHTML);
        copyStyles(window.document, printwin.document);
        printwin.print();
    }
    const copyStyles = (src, dest) => {
        Array.from(src.styleSheets).forEach(styleSheet => {
            dest.head.appendChild(styleSheet.ownerNode.cloneNode(true))
        })
        Array.from(src.fonts).forEach(font => dest.fonts.add(font))
    }
 useEffect(()=>{
    console.log(consumerDetails, consumerPaymentDetails)
 },[consumerDetails, consumerPaymentDetails])
    // useEffect(() => {
    //     const loadPaymentconsumerPaymentDetails[val] = async () => {        
    //                 try {
    //                     const paymentconsumerPaymentDetails[val]GetUrl = `${SUDA_API_BASE_URL}/user/Water/GetReceipt/${consumerNumberAfterCreation}/${modeOfPayment}`
    //                     const requestOptions = {
    //                         method: "GET",
    //                         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
    //                     }
    //                     let response = null, responseBody = null
    //                     response = await fetch(paymentconsumerPaymentDetails[val]GetUrl, requestOptions)
    //                     responseBody = await response.json()
    //                     console.log("in recept ", responseBody)
    //                     if (response?.status == '200') {
    //                         console.log("in recept 200", responseBody)
    //                         setconsumerPaymentDetails[val](responseBody)
                        
    //                     } else {
                            
    //                     } 
    //                 } catch (err) {
    //                     console.error(err)
    //                     setconsumerPaymentDetails[val]([])
                      
    //                 }
    //                 finally {
                        
    //                 }
    //     }
    //     loadPaymentconsumerPaymentDetails[val]()
    // }, []) 

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden mt-10 mb-10">
      <ToastContainer autoClose={2000}/>
    <div className="w-full px-0 pt-0 pb-4 m-auto bg-white rounded-lg border border-gray-500 lg:max-w-full">
                            <nav className="relative flex navcustomproperty flex-wrap items-center justify-between pl-2 pr-0 py-1 mb-2 ring-1 ring-red-700 rounded-lg bg-orange-800 h-10">
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
                                    onClick={()=>setDisplayHindiForm(false)} >Receipt in English</Button>
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
                                                                        {/* <thead className="preview-payment-form-table-laypout">
                                                                        </thead> */}
                                                                        <tbody className="divide-y divide-gray-200">
                                                                            <tr>
                                                                                <td className="px-1 py-1 text-center  whitespace-nowrap">
                                                                                    <img className="h-12" src="/img/Bhilai_recipt.png" />
                                                                                </td>
                                                                                <td className="px-1 py-1 text-center  whitespace-nowrap">
                                                                                    <p className="text-2xl font-extrabold tracking-tight uppercase font-body text-center">
                                                                                        RAJNANDGAON MUNICIPAL CORPORATION, RAJNANDGAON</p>
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
                                                    <div className="my-3 flex justify-center items-center">
                                            <span className='border-2 p-2 border-black className="text-xl font-semibold tracking-tight uppercase font-body text-center'>
                                            जल कर <br/> भुगतान रसीद
                                            </span>
                                      
                                            </div>
                                                    <p className="text-xl font-bold mb-2 tracking-tight uppercase font-body text-center">
                                                        {/* PROPERTY TAX RECEIPT  */}
                                                        {consumerPaymentDetails[val]?.description}
                                                        {/* {
                                                            consumerPaymentDetails[val]?.check_status == '1' ||
                                                            convertStringToLowerCaseNTrim(consumerPaymentDetails[val]?.modeofpayment) == 'cash' ?
                                                            `` : ` (Temporary)`
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
                                                                        रसीद संख्या।
                                                                        </td>
                                                                        <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                                            :
                                                                        </td>
                                                                        <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                                           {consumerPaymentDetails[val]?.receiptNo}
                                                                        </td>
                                                                        <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                                                        विभाग का अनुभाग
                                                                        </td>
                                                                        <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                                            :
                                                                        </td>
                                                                        <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                                        Water supply
                                                                        </td>
    
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                        उपभोक्ता का नाम
                                                                        </td>
                                                                        <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                            :
                                                                        </td>
                                                                         <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
    
                                                                         {consumerDetails?.consumerName}
                                                                        </td>
                                                                        <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                        उपभोक्ता संख्या
                                                                        </td>
                                                                        <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                            :
                                                                        </td>
                                                                        <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                                        {consumerDetails?.consumerNo}
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
                                                                        {consumerDetails?.wardNo}
    
                                                                        </td>
                                                                        <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                        संपत्ति संख्या
                                                                        </td>
                                                                        <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                            :
                                                                        </td>
                                                                        <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                                            {consumerDetails?.propertyNo}
    
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
                                                                        रिश्ते का प्रकार
                                                                        </td>
                                                                        <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                            :
                                                                        </td>
                                                                        <td className="px-3 py-0 text-xs text-gray-900  whitespace-normal">
                                                                            {consumerDetails?.connectionType}
    
                                                                        </td>

                                                                        <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                        भुगतान का प्रकार
                                                                        </td>
                                                                        <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                            :
                                                                        </td>
                                                                        <td className="px-3 py-0 text-xs text-gray-900  whitespace-normal">
                                                                        {consumerPaymentDetails[val]?.paymentMode}
    
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                        कुल देय
                                                                        </td>
                                                                        <td className="px-3 py-0 text-xs text-gray-900  whitespace-normal">
                                                                            :
                                                                        </td>
                                                                        <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
    
                                                                            {consumerPaymentDetails[val]?.payableAmount}
    
                                                                        </td>
                                                                        <td className="px-3 py-0 font-semibold text-xs  font-medium text-gray-900 whitespace-normal ">
                                                                            Mobile No.
                                                                        </td>
                                                                        <td className="px-3 py-0 font-semibold text-xs  text-gray-900 whitespace-normal">
                                                                            :
                                                                        </td>
                                                                        <td className="px-3 py-0 font-normal text-xs  text-gray-900 whitespace-normal">
                                                                            {consumerDetails?.mobileNo}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
    
                                                                        <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                                                        भुगतान तिथि
                                                                        </td>
                                                                        <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                                                            :
                                                                        </td>
                                                                        <td className="px-3 py-0 font-normal text-xs text-gray-900 ">
                                                                        {consumerPaymentDetails[val]?.transactionDate}
                                                                        </td>
                                                                        <td className="px-3 py-0 font-semibold text-xs  font-medium text-gray-900 whitespace-normal">
                                                                        दंड
                                                                        </td>
                                                                        <td className="px-3 py-0 font-semibold text-xs  text-gray-900 whitespace-normal">
                                                                            :
                                                                        </td>
                                                                        <td className="px-3 py-0 font-normal text-xs  text-gray-900 whitespace-normal">
                                                                        {consumerPaymentDetails[val]?.penalty}
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
    {consumerDetails?.propertyAddress}
    </td>
    
</tr>
                                                                    {/* <tr>
                                                                        <td className="px-1 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                                                            <div className="flex flex-col mb-1">
                                                                                <div className="overflow-x-auto">
                                                                                    <div className="p-1.5 lg:w-full inline-block align-middle">
                                                                                        <div className="overflow-hidden">
                                                                                            <table className="table-fixed w-full">
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
                                                                                                                consumerPaymentDetails[val]?.propertyTypeId == SUPER_BUILD_UP_AREA_PROP_TYPE_ID ? SUPER : ''
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
                                                                                                        consumerPaymentDetails[val]?.floor_details?.map((item, index) => {
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
    
    
    
                                                                    </tr> */}
    
    
    
    
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
                                                            <table className="table-fixed w-full">
                                                                <thead className="preview-payment-recipt-form-table-laypout">
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td colSpan="3" className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap">
    
                                                                            <div className="text-left text-xs  text-gray-900 float-left">रुपये की राशि </div>
                                                                            <div className="text-left text-xs font-semibold  ml-2 text-gray-900 float-left">{consumerPaymentDetails[val]?.payableAmount} (शब्दों में) </div>
                                                                            <div className="Payment_recipt_custom float-left font-semibold text-xs">
                                                                                {
                                                                                    (consumerPaymentDetails[val]?.payableAmount + "").includes(".") ? (
                                                                                        inWords((consumerPaymentDetails[val]?.payableAmount + "").split(".")[0]) + " Rs. and " +
                                                                                        inWords((consumerPaymentDetails[val]?.payableAmount + "").split(".")[1]) + " Paisa Only"
                                                                                    )
                                                                                        : (
                                                                                            inWords((consumerPaymentDetails[val]?.payableAmount + "")) + " Rs."
                                                                                        )
                                                                                }
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colSpan="3" className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap">
    
                                                                            <div className="text-left text-xs  text-gray-900 float-left">जल कर एवं अन्य माध्यम से</div>
                                                                            <div className="Payment_recipt_custom_small ml-2 float-left text-xs font-semibold capitalize">
                                                                                {
                                                                                    (consumerPaymentDetails[val]?.mode_of_payment + "").trim().toLowerCase() ==
                                                                                        'card' ? consumerPaymentDetails[val]?.card_type + " " : ''
                                                                                }
                                                                                {consumerPaymentDetails[val]?.mode_of_payment}
                                                                            </div>
                                                                            <div className="text-left text-xs  ml-2 text-gray-900 float-left">ऑनलाइन नंबर.</div>
                                                                            <div className="Payment_recipt_custom_small float-left font-semibold text-xs">{consumerPaymentDetails[val]?.online_no ? consumerPaymentDetails[val]?.online_no : `NA`}</div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colSpan="3" className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap">
    
                                                                            <div className="text-left text-xs  text-gray-900 float-left">दिनांक चढ़ा हुआ</div>
                                                                            <div className="Payment_recipt_custom_small float-left font-semibold text-xs">{consumerPaymentDetails[val]?.date}</div>
                                                                            <div className="text-left text-xs  ml-2 text-gray-900 float-left">के नाम आहरित</div>
                                                                            <div className="Payment_recipt_custom_small float-left font-semibold text-xs">{consumerPaymentDetails[val]?.transactionDate ? consumerPaymentDetails[val]?.transactionDate : `NA`}</div>
                                                                            <div className="text-left text-xs  ml-2 text-gray-900 float-left">बैंक का नाम</div>
                                                                            <div className="Payment_recipt_custom_small float-left font-semibold text-xs">{consumerPaymentDetails[val]?.bankName ? consumerPaymentDetails[val]?.bankName : `NA`}</div>
    
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colSpan="3" className="px-0 py-0 text-left text-xs  text-gray-900 whitespace-nowrap">
                                                                            <div className="text-left text-xs  ml-2 text-gray-900 float-left">बैंक का स्थान</div>
                                                                            <div className="Payment_recipt_custom_small float-left font-semibold text-xs">{consumerPaymentDetails[val]?.branchName? consumerPaymentDetails[val]?.branchName: `NA`}</div>
                                                                        </td>
    
                                                                    </tr>
                                                                    <tr>
                                                                        <td colSpan="3" className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap">
    
                                                                            <div className="text-left text-sm font-semibold text-gray-900 float-left">N.B.ऑनलाइन भुगतान/चेक/ड्राफ्ट/बैंकर्स चेक प्राप्ति के अधीन हैं</div>
    
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
    
                                            <div className="mb-1 flex flex-col">
                    <div className="overflow-x-auto">
                      <div className="inline-block p-2.5 align-middle lg:w-full">
                        <div className="overflow-hidden">
                          <table className="w-full table-fixed">
                            <thead className="preview-payment-recipt-form-table-laypout">
                              <tr>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-900 px-1 py-0  text-left text-xs font-bold uppercase text-gray-900"
                                >
                                  खाते का विवरण
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-900 px-1 py-0 text-center text-xs font-bold uppercase text-gray-900"
                                >
                                  
अवधि
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-900 px-1 py-0  text-left text-xs font-bold uppercase text-gray-900"
                                >
                                मात्रा
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {consumerPaymentDetails[val]?.payment_details
                                ? consumerPaymentDetails[val]?.payment_details.map(
                                    (item, index) => {
                                      return (
                                        <>
                                          {consumerPaymentDetails[val]?.payment_details ? (
                                            // consumerPaymentDetails[val]?.payment_details[0]?.property_tax_arrear != null &&
                                            // consumerPaymentDetails[val]?.payment_details[0]?.property_tax_arrear != 0 ? (
                                            <tr>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900">
                                                Property Tax Arrear
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1 py-0 text-center text-xs text-gray-900">
                                                {receiptDetails
                                                  ?.payment_details[index]
                                                  ?.previousEffectYear
                                                  ? receiptDetails
                                                      ?.payment_details[index]
                                                      ?.previousEffectYear
                                                  : receiptDetails
                                                      ?.payment_details[0]
                                                      ?.currentEffectYear
                                                  ? receiptDetails
                                                      ?.payment_details[0]
                                                      ?.currentEffectYear
                                                  : "N/A"}
                                                {/* {` To `}
    
                                                                                                        {consumerPaymentDetails[val]?.payment_details[0]?.currentEffectYear ?
                                                                                                            consumerPaymentDetails[val]?.payment_details[index]?.currentEffectYear :
                                                                                                            convertTransactionDateToFYFormat(receiptDetails.date)
                                                                                                        } */}
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-right text-xs text-gray-900">
                                                {receiptDetails
                                                  ?.payment_details[index]
                                                  ?.property_tax_arrear != null
                                                  ? receiptDetails
                                                      ?.payment_details[index]
                                                      ?.property_tax_arrear
                                                  : "N/A"}
                                              </td>
                                            </tr>
                                          ) : // ) : null
                                          null}
                                          {consumerPaymentDetails[val]?.payment_details ? (
                                            // (consumerPaymentDetails[val]?.payment_details[0]?.property_tax != null &&
                                            // consumerPaymentDetails[val]?.payment_details[0]?.property_tax != 0) ?
                                            // (
                                            <tr>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left text-xs text-gray-900">
                                                Property Tax Current
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-center text-xs text-gray-900">
                                                {/* {consumerPaymentDetails[val]?.payment_details[index]?.previousEffectYear ?
                                                                                                            consumerPaymentDetails[val]?.payment_details[index]?.previousEffectYear :
                                                                                                            (consumerPaymentDetails[val]?.payment_details[0]?.currentEffectYear ?
                                                                                                                consumerPaymentDetails[val]?.payment_details[0]?.currentEffectYear : 'N/A')} {` To `} */}

                                                {receiptDetails
                                                  ?.payment_details[0]
                                                  ?.currentEffectYear
                                                  ? receiptDetails
                                                      ?.payment_details[index]
                                                      ?.currentEffectYear
                                                  : convertTransactionDateToFYFormat(
                                                      receiptDetails.date
                                                    )}
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-right text-xs text-gray-900">
                                                {receiptDetails
                                                  ?.payment_details[index]
                                                  ?.property_tax != null
                                                  ? receiptDetails
                                                      ?.payment_details[index]
                                                      ?.property_tax
                                                  : "N/A"}
                                              </td>
                                            </tr>
                                          ) : // ) : null
                                          null}
                                          {consumerPaymentDetails[val]?.payment_details ? (
                                            // consumerPaymentDetails[val]?.payment_details[0]?.smerik_kar_arrear != null &&
                                            // consumerPaymentDetails[val]?.payment_details[0]?.smerik_kar_arrear != 0 ?
                                            // (
                                            <tr>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left text-xs text-gray-900">
                                                Samekit Kar Arrear
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1 py-0 text-center text-xs text-gray-900">
                                                {receiptDetails
                                                  ?.payment_details[index]
                                                  ?.previousEffectYear
                                                  ? receiptDetails
                                                      ?.payment_details[index]
                                                      ?.previousEffectYear
                                                  : receiptDetails
                                                      ?.payment_details[0]
                                                      ?.currentEffectYear
                                                  ? receiptDetails
                                                      ?.payment_details[0]
                                                      ?.currentEffectYear
                                                  : "N/A"}
                                                {/* {` To `}
    
                                                                                                        {consumerPaymentDetails[val]?.payment_details[0]?.currentEffectYear ?
                                                                                                            consumerPaymentDetails[val]?.payment_details[index]?.currentEffectYear :
                                                                                                            convertTransactionDateToFYFormat(receiptDetails.date)
                                                                                                        } */}
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-right text-xs text-gray-900">
                                                {receiptDetails
                                                  ?.payment_details[index]
                                                  ?.smerik_kar_arrear != null
                                                  ? receiptDetails
                                                      ?.payment_details[index]
                                                      ?.smerik_kar_arrear
                                                  : "N/A"}
                                              </td>
                                            </tr>
                                          ) : // ) : null
                                          null}
                                          {consumerPaymentDetails[val]?.payment_details ? (
                                            // consumerPaymentDetails[val]?.payment_details[0]?.smerik_kar_arrear != null &&
                                            // consumerPaymentDetails[val]?.payment_details[0]?.smerik_kar_arrear != 0 ?
                                            // (
                                            <tr>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left text-xs text-gray-900">
                                                Samekit Kar Current
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1 py-0 text-center text-xs text-gray-900">
                                                {/* {consumerPaymentDetails[val]?.payment_details[index]?.previousEffectYear ?
                                                                                                            consumerPaymentDetails[val]?.payment_details[index]?.previousEffectYear :
                                                                                                            (consumerPaymentDetails[val]?.payment_details[0]?.currentEffectYear ?
                                                                                                                consumerPaymentDetails[val]?.payment_details[0]?.currentEffectYear : 'N/A')} {` To `} */}

                                                {receiptDetails
                                                  ?.payment_details[0]
                                                  ?.currentEffectYear
                                                  ? receiptDetails
                                                      ?.payment_details[index]
                                                      ?.currentEffectYear
                                                  : convertTransactionDateToFYFormat(
                                                      receiptDetails.date
                                                    )}
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-right text-xs text-gray-900">
                                                {receiptDetails
                                                  ?.payment_details[index]
                                                  ?.samerik_kar != null
                                                  ? receiptDetails
                                                      ?.payment_details[index]
                                                      ?.samerik_kar
                                                  : "N/A"}
                                              </td>
                                            </tr>
                                          ) : // ) : null
                                          null}
                                          {consumerPaymentDetails[val]?.payment_details ? (
                                            // consumerPaymentDetails[val]?.payment_details[0]?.education_cess_arrear != null &&
                                            // consumerPaymentDetails[val]?.payment_details[0]?.education_cess_arrear != 0 ?
                                            // (
                                            <tr>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left text-xs text-gray-900">
                                                Education Cess Arrear
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1 py-0 text-center text-xs text-gray-900">
                                                {receiptDetails
                                                  ?.payment_details[index]
                                                  ?.previousEffectYear
                                                  ? receiptDetails
                                                      ?.payment_details[index]
                                                      ?.previousEffectYear
                                                  : receiptDetails
                                                      ?.payment_details[0]
                                                      ?.currentEffectYear
                                                  ? receiptDetails
                                                      ?.payment_details[0]
                                                      ?.currentEffectYear
                                                  : "N/A"}
                                                {/* {` To `}
    
                                                                                                        {consumerPaymentDetails[val]?.payment_details[0]?.currentEffectYear ?
                                                                                                            consumerPaymentDetails[val]?.payment_details[index]?.currentEffectYear :
                                                                                                            convertTransactionDateToFYFormat(receiptDetails.date)
                                                                                                        } */}
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-right text-xs text-gray-900">
                                                {receiptDetails
                                                  ?.payment_details[index]
                                                  ?.education_cess_arrear !=
                                                null
                                                  ? receiptDetails
                                                      ?.payment_details[index]
                                                      ?.education_cess_arrear
                                                  : "N/A"}
                                              </td>
                                            </tr>
                                          ) : // ) : null
                                          null}
                                          {consumerPaymentDetails[val]?.payment_details ? (
                                            // consumerPaymentDetails[val]?.payment_details[0]?.education_cess != null &&
                                            // consumerPaymentDetails[val]?.payment_details[0]?.education_cess != 0 ?
                                            // (
                                            <tr>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left text-xs text-gray-900">
                                                Education Cess Current
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1 py-0 text-center text-xs text-gray-900">
                                                {/* {consumerPaymentDetails[val]?.payment_details[index]?.previousEffectYear ?
                                                                                                            consumerPaymentDetails[val]?.payment_details[index]?.previousEffectYear :
                                                                                                            (consumerPaymentDetails[val]?.payment_details[0]?.currentEffectYear ?
                                                                                                                consumerPaymentDetails[val]?.payment_details[0]?.currentEffectYear : 'N/A')} {` To `} */}

                                                {receiptDetails
                                                  ?.payment_details[0]
                                                  ?.currentEffectYear
                                                  ? receiptDetails
                                                      ?.payment_details[index]
                                                      ?.currentEffectYear
                                                  : convertTransactionDateToFYFormat(
                                                      receiptDetails.date
                                                    )}
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-right text-xs text-gray-900">
                                                {receiptDetails
                                                  ?.payment_details[index]
                                                  ?.education_cess != null
                                                  ? receiptDetails
                                                      ?.payment_details[index]
                                                      ?.education_cess
                                                  : "N/A"}
                                              </td>
                                            </tr>
                                          ) : // ) : null
                                          null}
                                        </>
                                      );
                                    }
                                  )
                                : null}
                              {consumerPaymentDetails[val]?.rain_water_harvesting != null ? (
                                // &&
                                // consumerPaymentDetails[val]?.rain_water_harvesting != '0'
                                <tr>
                                  <td
                                    colSpan="2"
                                    className="whitespace-normal border border-gray-900 px-1  py-0 text-right text-xs font-medium text-gray-900"
                                  >
                                    Rain Water Harvesting Penalty
                                  </td>
                                  <td className="whitespace-nowrap border border-gray-900 px-1  py-0 text-right text-xs font-bold text-gray-900">
                                    {consumerPaymentDetails[val]?.rain_water_harvesting !=
                                    null
                                      ? consumerPaymentDetails[val]?.rain_water_harvesting
                                      : "0"}
                                  </td>
                                </tr>
                              ) : null}
                              <tr>
                                {consumerPaymentDetails[val]?.penal_charge != null &&
                                consumerPaymentDetails[val]?.penal_charge != "0" ? (
                                  <>
                                    <td
                                      colSpan="2"
                                      className="whitespace-normal border border-gray-900 px-1  py-0 text-right text-xs font-medium text-gray-900"
                                    >
                                      Penal Charge
                                    </td>
                                    <td className="whitespace-nowrap border border-gray-900 px-1  py-0 text-right text-xs font-bold text-gray-900">
                                      {consumerPaymentDetails[val]?.penal_charge != null
                                        ? consumerPaymentDetails[val]?.penal_charge
                                        : "0"}
                                    </td>
                                  </>
                                ) : null}
                              </tr>

                              <tr>
                                <td
                                  colSpan="1"
                                  className="whitespace-normal border border-gray-900 px-1 py-0 text-left text-xs font-medium text-gray-900"
                                >
                                अधिभार
                                </td>
                                <td
                                  colSpan="1"
                                  className="whitespace-normal border border-gray-900 px-1 py-0 text-center text-xs font-medium text-gray-900"
                                >
                                  {consumerPaymentDetails[val]?.periods != null
                                    ? consumerPaymentDetails[val]?.periods
                                    : null}
                                </td>
                                <td className="whitespace-nowrap border border-gray-900 px-1 py-0 text-right text-xs font-bold text-gray-900">
                                  {consumerPaymentDetails[val]?.form_fee != null
                                    ? consumerPaymentDetails[val]?.form_fee
                                    : "0"}
                                </td>
                              </tr>
                              <tr>
                                {consumerPaymentDetails[val]?.penalty_amount != null &&
                                consumerPaymentDetails[val]?.penalty_amount != "0" ? (
                                  <>
                                    <td
                                      colSpan="2"
                                      className="whitespace-normal border border-gray-900 px-1 py-0 text-right text-xs font-medium text-gray-900"
                                    >
                                      Penalty Amount
                                    </td>
                                    <td className="whitespace-nowrap border border-gray-900 px-1 py-0 text-right text-xs font-bold text-gray-900">
                                      {consumerPaymentDetails[val]?.penalty_amount != null
                                        ? consumerPaymentDetails[val]?.penalty_amount
                                        : "0"}
                                    </td>
                                  </>
                                ) : null}
                              </tr>
                              <tr>
                                <td
                                  colSpan="1"
                                  className="whitespace-normal border border-gray-900 px-1 py-0 text-left text-xs font-medium text-gray-900"
                                >
                                  भुगतान योग्य राशि
                                </td>
                                <td
                                  colSpan="1"
                                  className="whitespace-normal border border-gray-900 px-1 py-0 text-center text-xs font-medium text-gray-900"
                                >
                                  {consumerPaymentDetails[val]?.payableAmount !=
                                  null
                                    ? consumerPaymentDetails[val]?.periods
                                    : null}
                                </td>
                                <td className="whitespace-nowrap border border-gray-900 px-1 py-0 text-right text-xs font-bold text-gray-900">
                                  {consumerPaymentDetails[val]?.payableAmount !=
                                  null
                                    ? consumerPaymentDetails[val]?.payableAmount
                                    : "0"}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  colSpan="1"
                                  className="whitespace-normal border border-gray-900 px-1 py-0 text-left text-xs font-medium text-gray-900"
                                >
                                  
कुल प्राप्य
                                </td>
                                <td
                                  colSpan="1"
                                  className="whitespace-normal border border-gray-900 px-1 py-0 text-center text-xs font-medium text-gray-900"
                                >
                                  {consumerPaymentDetails[val]?.payableAmount !=
                                  null
                                    ? consumerPaymentDetails[val]?.periods
                                    : null}
                                </td>
                                <td className="whitespace-nowrap border border-gray-900 px-1 py-0 text-right text-xs font-medium text-gray-900">
                                  {/* {consumerPaymentDetails[val]?.adjustment_amount != null ? consumerPaymentDetails[val]?.adjustment_amount : '0'} */}
                                  {consumerPaymentDetails[val]?.payableAmount !=
                                  null
                                    ? consumerPaymentDetails[val]?.payableAmount
                                    : null}
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
                                                                            Signature Of Tax Collector
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
                                                        <span className="font-normal text-xs text-gray-900 dark:text-white">यह एक कंप्यूटर जनित रसीद है और इसमें भौतिक हस्ताक्षर की आवश्यकता नहीं है। </span>
                                                    </li>
                                                    <li className="mt-0 mb-0">
                                                        <span className="font-normal text-xs text-gray-900 dark:text-white">संपत्ति कर भूमि या मकान का मालिकाना हक़ प्रदान नहीं करता है</span>
                                                    </li>
                                                    <li className="mt-0 mb-0">
                                                        <span className="font-normal text-xs text-gray-900 dark:text-white">विवरण के लिए हमें 1800 890 4115 पर कॉल करें</span>
                                                    </li>
                                                    <li className="mt-0 mb-0">
                                                        <span className="font-normal text-xs font-semibold text-gray-900 dark:text-white">चेक/ड्राफ्ट/बैंकर चेक/ऑनलाइन भुगतान प्राप्ति के अधीन हैं</span>
                                                    </li>
                                                    <li className="mt-0 mb-0">
                                                        <span className="font-normal text-xs text-gray-900 dark:text-white">आप क्यूआर कोड स्कैन करके रसीद को मान्य कर सकते हैं।</span>
                                                    </li>
                                                    <li className="mt-0 mb-0">
                                                        <span className="font-normal text-xs text-gray-900 dark:text-white">Print Date : {
                                                            (new Date()).toString()
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
                                                                            RAJNANDGAON MUNICIPAL CORPORATION, RAJNANDGAON
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
    
                                        <button onClick={backHandler}
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

export default PaymentReceiptViewPaymentDetailsInHindi