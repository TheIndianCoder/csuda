import { SUPER, SUPER_BUILD_UP_AREA_PROP_TYPE_ID } from '@/utils/appConstants'
import { convertTransactionDateToFYFormat, inWords } from '@/utils/commonUtils'
import { Button } from '@material-tailwind/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const ENGLISH = `english`
const HINDI = `hindi`

function DemandReceiptHindi({
    showModal, currModal, propId, switchOnPrevModalNOffCurrModal,
    prevModal, propertyNo, receiptDetails, nextModal, receiptHeader
}) {
    const [lang, setLang] = useState(ENGLISH)
    const { t, i18n } = useTranslation()

    let handleChangeLanguage = (language) => {
        console.log("param lang got :: " + language)
        setLang(language === ENGLISH ? HINDI : ENGLISH)
        console.log("language changed to :: " + language)
        i18n.changeLanguage(language === ENGLISH ? HINDI : ENGLISH)
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

    return (
      <div className="relative mb-10 mt-10 flex min-h-screen flex-col justify-center overflow-hidden">
        <div className="m-auto w-11/12 rounded-md border border-gray-500 bg-white px-0 pb-4 pt-0 lg:max-w-full">
          <nav className="navcustomproperty relative mb-2 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
            <h2 className="text-center text-sm font-semibold text-white">
              DEMAND RECEIPT
            </h2>
            {/* <button onClick={() => switchOnPrevModalNOffCurrModal(currModal, prevModal)}
                                className="w-24 h-8 px-0 py-0 mx-4 my-0 tracking-wide text-white text-sm font-semibold transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
                                Back
                            </button> */}
            {/* <Button color="green" className='h-6 w-40 m-2 px-2 py-1 bg-green-700 rounded custom_button_add' 
                        onClick={() => handleChangeLanguage(lang)} >Change to {lang === 'hindi' ? ENGLISH : HINDI}</Button> */}
            <Button
              color="green"
              className="custom_button_add m-2 h-6 w-40 rounded bg-green-700 px-2 py-1"
              onClick={() =>
                switchOnPrevModalNOffCurrModal(currModal, nextModal)
              }
            >
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
          <section id="print_section" className="bg-white  py-0">
            <div className="mx-auto max-w-3xl bg-white py-5">
              <article className="overflow-hidden border-2 border-dotted border-black">
                <div className="bg-img rounded-b-md bg-[white]">
                  <div className="p-2">
                    <div className="text-slate-700 space-y-2">
                      <div className="mb-1 flex flex-col">
                        <div className="overflow-x-auto">
                          <div className="inline-block p-1 align-middle lg:w-full">
                            <div className="overflow-hidden">
                              <table className="min-w-full">
                                <thead className="preview-payment-form-table-laypout"></thead>
                                <tbody className="divide-y divide-gray-200">
                                  <tr>
                                    <td className="whitespace-nowrap px-1 py-1  text-center">
                                      <img
                                        className="h-12 object-cover"
                                        src="/img/rjnlogo.jpg"
                                      />
                                    </td>
                                    <td className="whitespace-nowrap px-1 py-1  text-center">
                                      <p className="text-center font-body text-3xl font-extrabold uppercase tracking-tight">
                                        कार्यालय नगर पालिक निगम, राजनांदगांव
                                      </p>
                                    </td>
                                    <td className="whitespace-nowrap px-1 py-1  text-center">
                                      <img
                                        className="h-12 object-cover"
                                        src="/img/swachh_bharat.jpg"
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="mb-2 text-center font-body text-xl font-bold uppercase tracking-tight">
                        मांग का रसीद
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="overflow-x-auto">
                      <div className="inline-block p-2.5 align-middle lg:w-full">
                        <div className="overflow-hidden">
                          <table className="min-w-full">
                            <thead className="bg-gray-50"></thead>
                            <tbody>
                              <tr>
                                <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900">
                                  रसीद संख्या
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                                  :
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                                  {receiptDetails[0]?.receipt_no}
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900">
                                  विभाग / अनुभाग
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                                  :
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                                  {receiptDetails[0]?.department_section}
                                </td>
                              </tr>
                              <tr>
                                <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900 ">
                                  खाते का विवरण
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs text-gray-900 ">
                                  :
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                                  {receiptDetails[0]?.account_description}
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900 ">
                                  दिनांक
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs text-gray-900 ">
                                  :
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                                  {receiptDetails[0]?.date}
                                </td>
                              </tr>
                              <tr>
                                <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900 ">
                                  वार्ड नं
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs  text-gray-900">
                                  :
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs text-gray-900 ">
                                  {receiptDetails[0]?.ward_no}
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900 ">
                                  सम्पति संख्या
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs text-gray-900 ">
                                  :
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                                  {receiptDetails[0]?.property_no}
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
                                <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900 ">
                                  उपयोग के प्रकार
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs text-gray-900 ">
                                  :
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs  text-gray-900">
                                  {receiptDetails[0]?.uses_type_name}
                                </td>
                              </tr>
                              <tr>
                                <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900 ">
                                  नाम
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs  text-gray-900">
                                  :
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs text-gray-900 ">
                                  {receiptDetails[0].owner_name}
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs  font-medium font-semibold text-gray-900 ">
                                  मोबाइल
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs  font-semibold text-gray-900">
                                  :
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs  font-normal text-gray-900">
                                  {receiptDetails[0]?.mobile_no}
                                </td>
                              </tr>
                              <tr>
                                <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900">
                                  पता
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900">
                                  :
                                </td>
                                <td className="px-3 py-0 text-xs font-normal text-gray-900 ">
                                  {receiptDetails[0]?.address}
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs  font-medium font-semibold text-gray-900">
                                  क्षेत्र( वर्गफुट में )
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs  font-semibold text-gray-900">
                                  :
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs  font-normal text-gray-900">
                                  {receiptDetails[0]?.total_builtup_area}
                                </td>
                              </tr>
                              <tr>
                                <td className="whitespace-normal px-1 py-0 text-xs font-medium font-semibold text-gray-900">
                                  <div className="mb-1 flex flex-col">
                                    <div className="overflow-x-auto">
                                      <div className="inline-block p-1.5 align-middle lg:w-full">
                                        <div className="overflow-hidden">
                                          <table className="w-full table-fixed">
                                            <thead>
                                              <tr>
                                                <th
                                                  scope="col"
                                                  className="whitespace-normal border border-gray-300 px-1 py-1  text-center text-xs  font-semibold text-gray-700"
                                                >
                                                  Floor
                                                </th>
                                                <th
                                                  scope="col"
                                                  className="whitespace-normal border border-gray-300 px-1 py-1  text-center text-xs  font-semibold text-gray-700"
                                                >
                                                  {receiptDetails[0]
                                                    .propertyTypeId ==
                                                  SUPER_BUILD_UP_AREA_PROP_TYPE_ID
                                                    ? SUPER
                                                    : ""}
                                                  Buildup(Sq.ft)
                                                </th>
                                                <th
                                                  scope="col"
                                                  className="whitespace-normal border border-gray-300 px-1 py-1  text-center text-xs  font-semibold text-gray-700"
                                                >
                                                  Usage
                                                </th>
                                              </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                              {receiptDetails[0]?.floor_details?.map(
                                                (item, index) => {
                                                  const {
                                                    floor_name,
                                                    built_up_area,
                                                    usage,
                                                  } = item;
                                                  return (
                                                    <tr key={index}>
                                                      <td className="whitespace-normal border border-gray-300 px-1 py-1 text-center text-xs font-medium text-gray-700">
                                                        {floor_name
                                                          ? floor_name
                                                          : "N/A"}
                                                      </td>
                                                      <td className="whitespace-normal border border-gray-300 px-1 py-1 text-center text-xs font-medium text-gray-700">
                                                        {built_up_area
                                                          ? built_up_area
                                                          : "N/A"}
                                                      </td>
                                                      <td className="whitespace-normal border border-gray-300 px-1 py-1 text-center text-xs font-medium text-gray-700">
                                                        {usage ? usage : "N/A"}
                                                      </td>
                                                    </tr>
                                                  );
                                                }
                                              )}
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
                  <div className="mb-1 flex flex-col">
                    <div className="overflow-x-auto">
                      <div className="inline-block p-2.5 align-middle lg:w-full">
                        <div className="overflow-hidden">
                          <table className="w-full table-fixed">
                            <thead className="preview-payment-recipt-form-table-laypout"></thead>
                            <tbody>
                              <tr>
                                <td
                                  colSpan="3"
                                  className="whitespace-nowrap px-1 py-0 text-left  text-xs text-gray-900"
                                >
                                  <div className="float-left text-left  text-xs text-gray-900">
                                    कुल रुपये{" "}
                                  </div>
                                  <div className="float-left ml-2 text-left  text-xs font-semibold text-gray-900">
                                    {receiptDetails[0]?.total} (शब्दों में){" "}
                                  </div>
                                  <div className="Payment_recipt_custom float-left text-xs font-semibold">
                                    {(receiptDetails[0]?.total + "").includes(
                                      "."
                                    )
                                      ? inWords(
                                          (receiptDetails[0].total + "").split(
                                            "."
                                          )[0]
                                        ) +
                                        " Rs. and " +
                                        inWords(
                                          (receiptDetails[0].total + "").split(
                                            "."
                                          )[1]
                                        ) +
                                        " Paisa Only"
                                      : inWords(receiptDetails[0].total + "") +
                                        " Rs."}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  colSpan="3"
                                  className="whitespace-nowrap px-1 py-0 text-left  text-xs text-gray-900"
                                >
                                  <div className="float-left text-left  text-xs text-gray-900">
                                    होल्डिंग टैक्स एवं अन्य के मद मे
                                  </div>
                                  <div className="Payment_recipt_custom_small float-left ml-2 text-xs font-semibold capitalize">
                                    {(receiptDetails[0]?.mode_of_payment + "")
                                      .trim()
                                      .toLowerCase() == "card"
                                      ? receiptDetails[0]?.card_type + " "
                                      : ""}
                                    {receiptDetails[0]?.mode_of_payment}
                                  </div>
                                  <div className="float-left ml-2  text-left text-xs text-gray-900">
                                    Online No.
                                  </div>
                                  <div className="Payment_recipt_custom_small float-left text-xs font-semibold">
                                    {receiptDetails[0]?.online_no
                                      ? receiptDetails[0]?.online_no
                                      : `NA`}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  colSpan="3"
                                  className="whitespace-nowrap px-1 py-0 text-left  text-xs text-gray-900"
                                >
                                  <div className="float-left text-left  text-xs text-gray-900">
                                    dated
                                  </div>
                                  <div className="Payment_recipt_custom_small float-left text-xs font-semibold">
                                    {receiptDetails[0]?.date}
                                  </div>
                                  <div className="float-left ml-2  text-left text-xs text-gray-900">
                                    drawn on
                                  </div>
                                  <div className="Payment_recipt_custom_small float-left text-xs font-semibold">
                                    {receiptDetails[0]?.check_dt
                                      ? receiptDetails[0]?.check_dt
                                      : `NA`}
                                  </div>
                                  <div className="float-left ml-2  text-left text-xs text-gray-900">
                                    Place of the bank
                                  </div>
                                  <div className="Payment_recipt_custom_small float-left text-xs font-semibold">
                                    {receiptDetails[0]?.branch_location
                                      ? receiptDetails[0]?.branch_location
                                      : `NA`}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  colSpan="3"
                                  className="whitespace-nowrap px-1 py-0 text-left  text-xs text-gray-900"
                                >
                                  <div className="float-left text-left text-sm font-semibold text-gray-900">
                                    नोट : ऑनलाइन पेमेंट / चेक / ड्राफ्ट / बैंकर
                                    चेक अदायगी के अधीन हैं
                                  </div>
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
                                  कर का विवरण
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
                                  राशि (रुपये में)
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {receiptDetails[0]?.payment_details
                                ? receiptDetails[0]?.payment_details.map(
                                    (item, index) => {
                                      return (
                                        <>
                                          {receiptDetails[0]
                                            ?.payment_details ? (
                                            // receiptDetails[0]?.payment_details[0]?.property_tax_arrear != null &&
                                            //     receiptDetails[0]?.payment_details[0]?.property_tax_arrear != 0 ? (
                                            <tr>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900">
                                                सम्पति कर बकाया
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1 py-0 text-center text-xs text-gray-900">
                                                {receiptDetails[0]
                                                  ?.payment_details[index]
                                                  ?.previousEffectYear
                                                  ? receiptDetails[0]
                                                      ?.payment_details[index]
                                                      ?.previousEffectYear
                                                  : receiptDetails[0]
                                                      ?.payment_details[0]
                                                      ?.currentEffectYear
                                                  ? receiptDetails[0]
                                                      ?.payment_details[0]
                                                      ?.currentEffectYear
                                                  : "N/A"}
                                                {/* {` To `}

                                                                                            {receiptDetails[0]?.payment_details[0]?.currentEffectYear ?
                                                                                                receiptDetails[0]?.payment_details[index]?.currentEffectYear :
                                                                                                convertTransactionDateToFYFormat(receiptDetails[0].date)
                                                                                            } */}
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-right text-xs text-gray-900">
                                                {receiptDetails[0]
                                                  ?.payment_details[index]
                                                  ?.property_tax_arrear != null
                                                  ? receiptDetails[0]
                                                      ?.payment_details[index]
                                                      ?.property_tax_arrear
                                                  : "N/A"}
                                              </td>
                                            </tr>
                                          ) : // ) : null
                                          null}

                                          {receiptDetails[0]
                                            ?.payment_details ? (
                                            // (receiptDetails[0]?.payment_details[0]?.property_tax != null &&
                                            //     receiptDetails[0]?.payment_details[0]?.property_tax != 0) ?
                                            //     (
                                            <tr>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left text-xs text-gray-900">
                                                सम्पति कर चालु
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-center text-xs text-gray-900">
                                                {/* {receiptDetails[0]?.payment_details[index]?.previousEffectYear ?
                                                                                                receiptDetails[0]?.payment_details[index]?.previousEffectYear :
                                                                                                (receiptDetails[0]?.payment_details[0]?.currentEffectYear ?
                                                                                                    receiptDetails[0]?.payment_details[0]?.currentEffectYear : 'N/A')} {` To `} */}

                                                {receiptDetails[0]
                                                  ?.payment_details[0]
                                                  ?.currentEffectYear
                                                  ? receiptDetails[0]
                                                      ?.payment_details[index]
                                                      ?.currentEffectYear
                                                  : convertTransactionDateToFYFormat(
                                                      receiptDetails[0].date
                                                    )}
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-right text-xs text-gray-900">
                                                {receiptDetails[0]
                                                  ?.payment_details[index]
                                                  ?.property_tax != null
                                                  ? receiptDetails[0]
                                                      ?.payment_details[index]
                                                      ?.property_tax
                                                  : "N/A"}
                                              </td>
                                            </tr>
                                          ) : // ) : null
                                          null}
                                          {receiptDetails[0]
                                            ?.payment_details ? (
                                            // receiptDetails[0]?.payment_details[0]?.smerik_kar_arrear != null &&
                                            //     receiptDetails[0]?.payment_details[0]?.smerik_kar_arrear != 0 ?
                                            //     (
                                            <tr>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left text-xs text-gray-900">
                                                समेकित कर बकाया
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1 py-0 text-center text-xs text-gray-900">
                                                {receiptDetails[0]
                                                  ?.payment_details[index]
                                                  ?.previousEffectYear
                                                  ? receiptDetails[0]
                                                      ?.payment_details[index]
                                                      ?.previousEffectYear
                                                  : receiptDetails[0]
                                                      ?.payment_details[0]
                                                      ?.currentEffectYear
                                                  ? receiptDetails[0]
                                                      ?.payment_details[0]
                                                      ?.currentEffectYear
                                                  : "N/A"}
                                                {/* {` To `}

                                                                                            {receiptDetails[0]?.payment_details[0]?.currentEffectYear ?
                                                                                                receiptDetails[0]?.payment_details[index]?.currentEffectYear :
                                                                                                convertTransactionDateToFYFormat(receiptDetails[0].date)
                                                                                            } */}
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-right text-xs text-gray-900">
                                                {receiptDetails[0]
                                                  ?.payment_details[index]
                                                  ?.smerik_kar_arrear != null
                                                  ? receiptDetails[0]
                                                      ?.payment_details[index]
                                                      ?.smerik_kar_arrear
                                                  : "N/A"}
                                              </td>
                                            </tr>
                                          ) : // ) : null
                                          null}
                                          {receiptDetails[0]
                                            ?.payment_details ? (
                                            // receiptDetails[0]?.payment_details[0]?.smerik_kar_arrear != null &&
                                            //     receiptDetails[0]?.payment_details[0]?.smerik_kar_arrear != 0 ?
                                            //     (
                                            <tr>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left text-xs text-gray-900">
                                                समेकित कर चालु
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1 py-0 text-center text-xs text-gray-900">
                                                {/* {receiptDetails[0]?.payment_details[index]?.previousEffectYear ?
                                                                                                receiptDetails[0]?.payment_details[index]?.previousEffectYear :
                                                                                                (receiptDetails[0]?.payment_details[0]?.currentEffectYear ?
                                                                                                    receiptDetails[0]?.payment_details[0]?.currentEffectYear : 'N/A')} {` To `} */}

                                                {receiptDetails[0]
                                                  ?.payment_details[0]
                                                  ?.currentEffectYear
                                                  ? receiptDetails[0]
                                                      ?.payment_details[index]
                                                      ?.currentEffectYear
                                                  : convertTransactionDateToFYFormat(
                                                      receiptDetails[0].date
                                                    )}
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-right text-xs text-gray-900">
                                                {receiptDetails[0]
                                                  ?.payment_details[index]
                                                  ?.samerik_kar != null
                                                  ? receiptDetails[0]
                                                      ?.payment_details[index]
                                                      ?.samerik_kar
                                                  : "N/A"}
                                              </td>
                                            </tr>
                                          ) : // ) : null
                                          null}

                                          {receiptDetails[0]
                                            ?.payment_details ? (
                                            // receiptDetails[0]?.payment_details[0]?.education_cess_arrear != null &&
                                            //     receiptDetails[0]?.payment_details[0]?.education_cess_arrear != 0 ?
                                            //     (
                                            <tr>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left text-xs text-gray-900">
                                                शिक्षा उपकर बकाया
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1 py-0 text-center text-xs text-gray-900">
                                                {receiptDetails[0]
                                                  ?.payment_details[index]
                                                  ?.previousEffectYear
                                                  ? receiptDetails[0]
                                                      ?.payment_details[index]
                                                      ?.previousEffectYear
                                                  : receiptDetails[0]
                                                      ?.payment_details[0]
                                                      ?.currentEffectYear
                                                  ? receiptDetails[0]
                                                      ?.payment_details[0]
                                                      ?.currentEffectYear
                                                  : "N/A"}
                                                {/* {` To `}

                                                                                            {receiptDetails[0]?.payment_details[0]?.currentEffectYear ?
                                                                                                receiptDetails[0]?.payment_details[index]?.currentEffectYear :
                                                                                                convertTransactionDateToFYFormat(receiptDetails[0].date)
                                                                                            } */}
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-right text-xs text-gray-900">
                                                {receiptDetails[0]
                                                  ?.payment_details[index]
                                                  ?.education_cess_arrear !=
                                                null
                                                  ? receiptDetails[0]
                                                      ?.payment_details[index]
                                                      ?.education_cess_arrear
                                                  : "N/A"}
                                              </td>
                                            </tr>
                                          ) : // ) : null
                                          null}

                                          {receiptDetails[0]
                                            ?.payment_details ? (
                                            // receiptDetails[0]?.payment_details[0]?.education_cess != null &&
                                            //     receiptDetails[0]?.payment_details[0]?.education_cess != 0 ?
                                            //     (
                                            <tr>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left text-xs text-gray-900">
                                                शिक्षा उपकर चालु
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1 py-0 text-center text-xs text-gray-900">
                                                {/* {receiptDetails[0]?.payment_details[index]?.previousEffectYear ?
                                                                                                receiptDetails[0]?.payment_details[index]?.previousEffectYear :
                                                                                                (receiptDetails[0]?.payment_details[0]?.currentEffectYear ?
                                                                                                    receiptDetails[0]?.payment_details[0]?.currentEffectYear : 'N/A')} {` To `} */}

                                                {receiptDetails[0]
                                                  ?.payment_details[0]
                                                  ?.currentEffectYear
                                                  ? receiptDetails[0]
                                                      ?.payment_details[index]
                                                      ?.currentEffectYear
                                                  : convertTransactionDateToFYFormat(
                                                      receiptDetails[0].date
                                                    )}
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-right text-xs text-gray-900">
                                                {receiptDetails[0]
                                                  ?.payment_details[index]
                                                  ?.education_cess != null
                                                  ? receiptDetails[0]
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
                              {receiptDetails[0]?.rain_water_harvesting !=
                              null ? (
                                // &&
                                // receiptDetails[0]?.rain_water_harvesting != '0'
                                <tr>
                                  <td
                                    colSpan="2"
                                    className="whitespace-normal border border-gray-900 px-1  py-0 text-right text-xs font-medium text-gray-900"
                                  >
                                    वर्षा जल संचयन शुल्क
                                  </td>
                                  <td className="whitespace-nowrap border border-gray-900 px-1  py-0 text-right text-xs font-bold text-gray-900">
                                    {receiptDetails[0]?.rain_water_harvesting !=
                                    null
                                      ? receiptDetails[0]?.rain_water_harvesting
                                      : "0"}
                                  </td>
                                </tr>
                              ) : null}
                              <tr>
                                {receiptDetails[0]?.penal_charge != null &&
                                receiptDetails[0]?.penal_charge != "0" ? (
                                  <>
                                    <td
                                      colSpan="2"
                                      className="whitespace-normal border border-gray-900 px-1  py-0 text-right text-xs font-medium text-gray-900"
                                    >
                                      शास्ति अधिरोपित
                                    </td>
                                    <td className="whitespace-nowrap border border-gray-900 px-1  py-0 text-right text-xs font-bold text-gray-900">
                                      {receiptDetails[0]?.penal_charge != null
                                        ? receiptDetails[0]?.penal_charge
                                        : "0"}
                                    </td>
                                  </>
                                ) : null}
                              </tr>

                              <tr>
                                <td
                                  colSpan="2"
                                  className="whitespace-normal border border-gray-900 px-1 py-0 text-right text-xs font-medium text-gray-900"
                                >
                                  प्रपत्र शुल्क
                                </td>
                                <td className="whitespace-nowrap border border-gray-900 px-1 py-0 text-right text-xs font-bold text-gray-900">
                                  {receiptDetails[0]?.form_fee != null
                                    ? receiptDetails[0]?.form_fee
                                    : "0"}
                                </td>
                              </tr>
                              <tr>
                                {receiptDetails[0]?.penalty_amount != null &&
                                receiptDetails[0]?.penalty_amount != "0" ? (
                                  <>
                                    <td
                                      colSpan="2"
                                      className="whitespace-normal border border-gray-900 px-1 py-0 text-right text-xs font-medium text-gray-900"
                                    >
                                      अधिभार राशि
                                    </td>
                                    <td className="whitespace-nowrap border border-gray-900 px-1 py-0 text-right text-xs font-bold text-gray-900">
                                      {receiptDetails[0]?.penalty_amount != null
                                        ? receiptDetails[0]?.penalty_amount
                                        : "0"}
                                    </td>
                                  </>
                                ) : null}
                              </tr>
                              <tr>
                                <td
                                  colSpan="2"
                                  className="whitespace-normal border border-gray-900 px-1 py-0 text-right text-xs font-medium text-gray-900"
                                >
                                  कुल राशि
                                </td>
                                <td className="whitespace-nowrap border border-gray-900 px-1 py-0 text-right text-xs font-bold text-gray-900">
                                  {receiptDetails[0]?.total != null
                                    ? receiptDetails[0]?.total
                                    : "0"}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  colSpan="2"
                                  className="whitespace-normal border border-gray-900 px-1 py-0 text-right text-xs font-medium text-gray-900"
                                >
                                  राशि समायोजित करें
                                </td>
                                <td className="whitespace-nowrap border border-gray-900 px-1 py-0 text-right text-xs font-medium text-gray-900">
                                  {receiptDetails[0]?.adjustment_amount != null
                                    ? receiptDetails[0]?.adjustment_amount
                                    : "0"}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  colSpan="2"
                                  className="whitespace-normal border border-gray-900 px-1 py-0 text-right text-xs font-medium text-gray-900"
                                >
                                  प्राप्त शेष राशि/अंतर राशि
                                </td>
                                <td className="whitespace-nowrap border border-gray-900 px-1 py-0 text-right text-xs font-medium text-gray-900">
                                  {receiptDetails[0]?.diference_amount != null
                                    ? receiptDetails[0]?.diference_amount
                                    : "0"}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  colSpan="2"
                                  className="whitespace-normal border border-gray-900 px-1 py-0 text-right text-xs font-medium text-gray-900"
                                >
                                  कुल प्राप्त राशि
                                </td>
                                <td className="whitespace-nowrap border border-gray-900 px-1 py-0 text-right text-xs font-medium text-gray-900">
                                  {receiptDetails[0]?.receivable_amount != null
                                    ? receiptDetails[0]?.receivable_amount
                                    : "0"}
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
                      <div className="inline-block p-1.5 align-middle lg:w-full">
                        <div className="overflow-hidden">
                          <table className="min-w-full">
                            <thead className="bg-gray-50"></thead>
                            <tbody>
                              <tr>
                                {/* <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-nowrap">
                                <img className="w-32" src='/img/QR_Code.png' />
                            </td> */}

                                {/* <td className="px-3 py-0 text-right text-xs text-gray-900 font-bold whitespace-normal">
                                                                    टैक्स कलेक्टर का हस्ताक्षर
                                                                    </td> */}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-slate-700 mx-3 my-2 text-xs font-light">
                    <h2 className="mb-1 text-xs font-semibold text-gray-900 dark:text-white">
                      Note:
                    </h2>
                    <ul className="list-disc px-10">
                      <li className="mb-0 mt-0">
                        <span className="text-xs font-normal text-gray-900 dark:text-white">
                          <p className="contents whitespace-normal text-xs font-bold text-red-600">
                            यह संपत्ति कर रसीद नहीं है
                          </p>
                        </span>
                      </li>
                      <li className="mb-0 mt-0">
                        <span className="text-xs font-normal text-gray-900 dark:text-white">
                          यह कंप्यूटर जनित रसीद है इस रसीद मे हस्ताक्षर की
                          आवश्यकता नहीं है |
                        </span>
                      </li>
                      <li className="mb-0 mt-0">
                        <span className="text-xs font-normal text-gray-900 dark:text-white">
                          संपत्ति कर भूमि या मकान का मालिकाना हक़ प्रदान नहीं
                          करता है
                        </span>
                      </li>
                      <li className="mb-0 mt-0">
                        <span className="text-xs font-normal text-gray-900 dark:text-white">
                          संपर्क करें 1800 890 4115
                        </span>
                      </li>
                      <li className="mb-0 mt-0">
                        <span className="text-xs font-normal font-semibold text-gray-900 dark:text-white">
                          ऑनलाइन पेमेंट / चेक / ड्राफ्ट / बैंकर चेक अदायगी के
                          अधीन हैं
                        </span>
                      </li>
                      {/* <li className="mt-0 mb-0">
                                                    <span className="font-normal text-xs text-gray-900 dark:text-white">You may validate receipt by scanning QR Code.</span>
                                                </li> */}
                      <li className="mb-0 mt-0">
                        <span className="text-xs font-normal text-gray-900 dark:text-white">
                          प्रिन्ट दिनांक :{" "}
                          {new Date().toLocaleDateString() +
                            " " +
                            new Date().toLocaleDateString()}
                        </span>
                      </li>
                    </ul>
                    {/* </li> */}
                  </div>

                  <div className="flex flex-col">
                    <div className="overflow-x-auto">
                      <div className="mb-3 inline-block p-1 align-middle lg:w-full">
                        <div className="overflow-hidden">
                          <table className="w-full table-fixed">
                            <thead className="bg-gray-50"></thead>
                            <tbody>
                              <tr>
                                <td className="whitespace-normal px-3 py-0 text-xs font-bold font-normal text-gray-900">
                                  कार्यालय नगर पालिक निगम, राजनांदगांव
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-right text-xs font-normal text-gray-900">
                                  In Collaboration With{" "}
                                  <b>Sri Publications & Stationers Pvt. Ltd.</b>
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
            </div>
          </section>

          {/* </Iframe> */}
          {/* </div> */}

          <div className="m-4 mt-4 rounded-none bg-white px-0 pb-4 pt-0 lg:max-w-full">
            <div className="container mx-0 flex min-w-full flex-col items-center px-10 py-2">
              <div className="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
                {/* <CustomBackButton showCustomBackButton={true} /> */}

                <button
                  onClick={() =>
                    switchOnPrevModalNOffCurrModal(currModal, prevModal)
                  }
                  className="mx-4 my-0 h-8 w-36 transform rounded-md bg-green-400 px-0 py-0 text-sm font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-green-700 focus:bg-green-400 focus:outline-none"
                >
                  Back
                </button>
                <button
                  onClick={handlePrintToPDF}
                  className=" mx-4 mb-2 h-8 w-36 transform rounded-md bg-green-400 px-4 py-1 tracking-wide text-white transition-colors duration-200 hover:bg-green-700 focus:bg-green-400 focus:outline-none"
                >
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
    );
}

export default DemandReceiptHindi