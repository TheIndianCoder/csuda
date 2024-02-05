import { Button } from '@material-tailwind/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const ENGLISH = `english`
const HINDI = `hindi`

function PaymentReceipt(props) {
    const { handleToggle } = props
    const [lang, setLang] = useState(ENGLISH)
    const { t, i18n } = useTranslation()

    let handleChangeLanguage = (language) => {
        console.log("param lang got :: " + language)
        setLang(language === ENGLISH ? HINDI : ENGLISH)
        console.log("language changed to :: " + language)
        i18n.changeLanguage(language === ENGLISH ? HINDI : ENGLISH)
    }
    let handlePrintToPDF = () => {
        window.print()
    }
    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden mt-10 mb-10">


            <div className="w-11/12 px-0 pt-0 pb-4 m-auto bg-white rounded-md border border-gray-500 lg:max-w-full ">
                <nav className="relative flex navcustomproperty flex-wrap items-center justify-between pl-2 pr-0 py-1 mb-2 ring-1 ring-black rounded-none">
                    <h2 className="text-sm font-semibold text-center text-white">
                        Payment Recipt
                    </h2>
                    {/* <Button color="green" className='h-6 w-40 m-2 px-2 py-1 bg-green-700 rounded custom_button_add' 
                    onClick={() => handleChangeLanguage(lang)} >Change to {lang === 'hindi' ? ENGLISH : HINDI}</Button> */}
                    <Button color="green" className='h-6 w-40 m-2 px-2 py-1 bg-green-700 rounded custom_button_add'
                        onClick={handleToggle} >हिंदी में रसीद</Button>
                </nav>
                {/* <form className="mt-4 ">
                    <div className="h-screen bg-white py-10 px-2">
                        <div className="container mx-auto">
                            <div className="max-w-sm mx-auto md:max-w-lg">
                                <div className="w-full"> */}
                <section className="py-20 bg-white">


                    {/* <Button onClick={handlePrintToPDF} >Print</Button> */}
                    <div className="max-w-3xl mx-auto py-16 bg-white ">

                        <article className="overflow-hidden border-dotted border-2 border-black">
                            <div className="bg-[white] rounded-b-md bg-img table-print">
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
                                                                        <img className="object-cover h-12" src="/img/Risali_logo.png" />
                                                                    </td>
                                                                    <td className="px-1 py-1 text-center  whitespace-nowrap">
                                                                        <p className="text-3xl font-extrabold tracking-tight uppercase font-body text-center">
                                                                            BHILAI MUNICIPAL CORPORATION, BHILAI</p>
                                                                    </td>
                                                                    <td className="px-1 py-1 text-center  whitespace-nowrap">
                                                                        <img className="object-cover h-12" src="/img/swachh_bharat.jpg" />
                                                                    </td>

                                                                </tr>


                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-xl font-bold mb-2 tracking-tight uppercase font-body text-center">
                                            PROPERTY TAX RECEIPT
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
                                                            <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-nowrap">
                                                                Receipt No.
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-nowrap">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-nowrap">
                                                                682060221044601
                                                            </td>
                                                            <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-nowrap">
                                                                Department/Section
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-nowrap">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-nowrap">
                                                                Revenue Section
                                                            </td>

                                                        </tr>
                                                        <tr>
                                                            <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 ">
                                                                Account Description
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 ">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900">

                                                                Holding Tax  & Others

                                                            </td>
                                                            <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 ">
                                                                Date
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 ">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900">
                                                                06-02-2021

                                                            </td>

                                                        </tr>
                                                        <tr>
                                                            <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 ">
                                                                Ward No
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 ">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 ">
                                                                30

                                                            </td>
                                                            <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 ">
                                                                Property No.
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 ">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 ">
                                                                1212121212120

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
                                                            <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 ">
                                                                Usage Type
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 ">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 ">
                                                                RESIDENTIAL

                                                            </td>

                                                        </tr>
                                                        <tr>
                                                            <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 ">
                                                                Owner Name
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 ">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 ">

                                                                JOHN DOE  C/O LT JONATHAN DOE

                                                            </td>
                                                            <td className="px-3 py-0 font-semibold text-xs  font-medium text-gray-900 ">
                                                                Mobile No.
                                                            </td>
                                                            <td className="px-3 py-0 font-semibold text-xs  text-gray-900 ">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 font-normal text-xs  text-gray-900 ">
                                                                1234567890
                                                            </td>




                                                        </tr>
                                                        <tr>

                                                            <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 ">
                                                                Address
                                                            </td>
                                                            <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 ">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 font-normal text-xs text-gray-900 ">
                                                                69JF+53Q, I/E, MP Housing Board Colony, Bhilai, Chhattisgarh 490026, India
                                                            </td>
                                                            <td className="px-3 py-0 font-semibold text-xs  font-medium text-gray-900 ">
                                                                Area(Sq.ft)
                                                            </td>
                                                            <td className="px-3 py-0 font-semibold text-xs  text-gray-900 ">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 font-normal text-xs  text-gray-900 ">
                                                                849.00
                                                            </td>

                                                        </tr>
                                                        <tr>
                                                            <td className="px-1 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-nowrap">
                                                                <div className="flex flex-col mb-1">
                                                                    <div className="overflow-x-auto">
                                                                        <div className="p-1.5 lg:w-full inline-block align-middle">
                                                                            <div className="overflow-hidden">
                                                                                <table className="min-w-full">
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th
                                                                                                scope="col"
                                                                                                className="px-1 py-1 text-xs text-center font-semibold  text-gray-700  border border-gray-300"
                                                                                            >
                                                                                                Floor
                                                                                            </th>
                                                                                            <th
                                                                                                scope="col"
                                                                                                className="px-1 py-1 text-xs text-center font-semibold  text-gray-700  border border-gray-300"
                                                                                            >
                                                                                                Buildup(Sq.ft)
                                                                                            </th>
                                                                                            <th
                                                                                                scope="col"
                                                                                                className="px-1 py-1 text-xs text-center font-semibold  text-gray-700  border border-gray-300"
                                                                                            >
                                                                                                Usage
                                                                                            </th>


                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody className="divide-y divide-gray-200">
                                                                                        <tr>
                                                                                            <td className="px-1 py-1 text-center text-xs font-medium text-gray-700 whitespace-nowrap border border-gray-300">
                                                                                                G.F
                                                                                            </td>
                                                                                            <td className="px-1 py-1 text-center text-xs font-medium text-gray-700 whitespace-nowrap border border-gray-300">
                                                                                                849.00
                                                                                            </td>
                                                                                            <td className="px-1 py-1 text-center text-xs font-medium text-gray-700 whitespace-nowrap border border-gray-300">
                                                                                                Resi.
                                                                                            </td>

                                                                                        </tr>


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
                                <div className="flex flex-col mb-1 ">
                                    <div className="overflow-x-auto">
                                        <div className="p-2.5 lg:w-full inline-block align-middle">
                                            <div className="overflow-hidden">
                                                <table className="w-full table-fixed">
                                                    <thead className="preview-payment-recipt-form-table-laypout">
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td colSpan="3" className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap">

                                                                <div className="text-left text-xs  text-gray-900 float-left">A Sum of Rs. </div>
                                                                <div className="text-left text-xs font-semibold  ml-2 text-gray-900 float-left">4712.00 (In words.) </div>
                                                                <div className="Payment_recipt_custom float-left font-semibold text-xs">Four Thousand Seven Hundred and Twelve Only</div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="3" className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap">

                                                                <div className="text-left text-xs  text-gray-900 float-left">towards Holding Tax  & Others vide</div>
                                                                <div className="Payment_recipt_custom_small ml-2 float-left text-xs font-semibold ">Online</div>
                                                                <div className="text-left text-xs  ml-2 text-gray-900 float-left">Online No.</div>
                                                                <div className="Payment_recipt_custom_small float-left font-semibold text-xs">254866321</div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="3" className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap">

                                                                <div className="text-left text-xs  text-gray-900 float-left">dated</div>
                                                                <div className="Payment_recipt_custom_small float-left font-semibold text-xs">06-02-2022</div>
                                                                <div className="text-left text-xs  ml-2 text-gray-900 float-left">drawn on</div>
                                                                <div className="Payment_recipt_custom_small float-left font-semibold text-xs">NA</div>
                                                                <div className="text-left text-xs  ml-2 text-gray-900 float-left">Place of the bank</div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="3" className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap">

                                                                <div className="text-left text-sm font-semibold text-gray-900 float-left">N.B.Online Payment/Cheque/Draft/ Bankers Cheque are Subject to realization</div>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col mb-1 ">
                                    {/* <div className="bg-img">

                            </div> */}
                                    <div className="overflow-x-auto">
                                        <div className="p-2.5 lg:w-full inline-block align-middle">
                                            <div className="overflow-hidden">
                                                <table className="table-fixed w-full">
                                                    <thead className="preview-payment-recipt-form-table-laypout">
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                className="px-1 py-0 text-xs text-left font-bold  text-gray-900 uppercase border border-gray-900"
                                                            >
                                                                Account Description
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-1 py-0 text-xs text-center font-bold  text-gray-900 uppercase border border-gray-900"
                                                            >
                                                                Period
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-1 py-0 text-xs text-left font-bold  text-gray-900 uppercase border border-gray-900"
                                                            >
                                                                Amount
                                                            </th>

                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        <tr>
                                                            <td className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap border border-gray-900">
                                                                Property Tax Arrear
                                                            </td>
                                                            <td className="px-1 py-0 text-center text-xs text-gray-900 whitespace-nowrap border border-gray-900">
                                                                1/2020-2021 To 4/2022-2023
                                                            </td>
                                                            <td className="px-1 py-0 text-right text-xs  text-gray-900 whitespace-nowrap border border-gray-900">
                                                                2500.98
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap border border-gray-900">
                                                                Property Tax Current
                                                            </td>
                                                            <td className="px-1 py-0 text-center text-xs  text-gray-900 whitespace-nowrap border border-gray-900">
                                                                2020-2021
                                                            </td>
                                                            <td className="px-1 py-0 text-right text-xs  text-gray-900 whitespace-nowrap border border-gray-900">
                                                                2500
                                                            </td>
                                                        </tr>
                                                        {/* <tr>
                                                            <td className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap border border-gray-900">
                                                                Sanitation Tax Arrear
                                                            </td>
                                                            <td className="px-1 py-0 text-center text-xs text-gray-900 whitespace-nowrap border border-gray-900">
                                                                1/2020-2021 To 4/2022-2023
                                                            </td>
                                                            <td className="px-1 py-0 text-right text-xs  text-gray-900 whitespace-nowrap border border-gray-900">
                                                                2500.98
                                                            </td>
                                                        </tr> */}
                                                        <tr>
                                                            <td className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap border border-gray-900">
                                                                Samekit Kar Arrear
                                                            </td>
                                                            <td className="px-1 py-0 text-center text-xs text-gray-900 whitespace-nowrap border border-gray-900">
                                                                1/2020-2021 To 4/2022-2023
                                                            </td>
                                                            <td className="px-1 py-0 text-right text-xs  text-gray-900 whitespace-nowrap border border-gray-900">
                                                                2500.98
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap border border-gray-900">
                                                                Samekit Kar Current
                                                            </td>
                                                            <td className="px-1 py-0 text-center text-xs text-gray-900 whitespace-nowrap border border-gray-900">
                                                                1/2020-2021 To 4/2022-2023
                                                            </td>
                                                            <td className="px-1 py-0 text-right text-xs  text-gray-900 whitespace-nowrap border border-gray-900">
                                                                2500.98
                                                            </td>
                                                        </tr>
                                                        {/* <tr>
                                                            <td className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap border border-gray-900">
                                                                Samanya Jalkar Arrear
                                                            </td>
                                                            <td className="px-1 py-0 text-center text-xs text-gray-900 whitespace-nowrap border border-gray-900">
                                                                1/2020-2021 To 4/2022-2023
                                                            </td>
                                                            <td className="px-1 py-0 text-right text-xs  text-gray-900 whitespace-nowrap border border-gray-900">
                                                                2500.98
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap border border-gray-900">
                                                                Samanya Jalkar  Current
                                                            </td>
                                                            <td className="px-1 py-0 text-center text-xs text-gray-900 whitespace-nowrap border border-gray-900">
                                                                1/2020-2021 To 4/2022-2023
                                                            </td>
                                                            <td className="px-1 py-0 text-right text-xs  text-gray-900 whitespace-nowrap border border-gray-900">
                                                                2500.98
                                                            </td>
                                                        </tr> */}
                                                        {/* <tr>
                                                            <td className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap border border-gray-900">
                                                                Niji Jalkar Arrear
                                                            </td>
                                                            <td className="px-1 py-0 text-center text-xs text-gray-900 whitespace-nowrap border border-gray-900">
                                                                1/2020-2021 To 4/2022-2023
                                                            </td>
                                                            <td className="px-1 py-0 text-right text-xs  text-gray-900 whitespace-nowrap border border-gray-900">
                                                                2500.98
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap border border-gray-900">
                                                                Niji Jalkar Current
                                                            </td>
                                                            <td className="px-1 py-0 text-center text-xs text-gray-900 whitespace-nowrap border border-gray-900">
                                                                1/2020-2021 To 4/2022-2023
                                                            </td>
                                                            <td className="px-1 py-0 text-right text-xs  text-gray-900 whitespace-nowrap border border-gray-900">
                                                                2500.98
                                                            </td>
                                                        </tr> */}
                                                        <tr>
                                                            <td className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap border border-gray-900">
                                                                Education Cess Arrear
                                                            </td>
                                                            <td className="px-1 py-0 text-center text-xs text-gray-900 whitespace-nowrap border border-gray-900">
                                                                1/2020-2021 To 4/2022-2023
                                                            </td>
                                                            <td className="px-1 py-0 text-right text-xs  text-gray-900 whitespace-nowrap border border-gray-900">
                                                                2500.98
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap border border-gray-900">
                                                                Education Cess Current
                                                            </td>
                                                            <td className="px-1 py-0 text-center text-xs text-gray-900 whitespace-nowrap border border-gray-900">
                                                                1/2020-2021 To 4/2022-2023
                                                            </td>
                                                            <td className="px-1 py-0 text-right text-xs  text-gray-900 whitespace-nowrap border border-gray-900">
                                                                2500.98
                                                            </td>
                                                        </tr>
                                                        {/* <tr>
                                                            <td className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap border border-gray-900">
                                                                Solid Waste User Charge
                                                            </td>
                                                            <td className="px-1 py-0 text-center text-xs text-gray-900 whitespace-nowrap border border-gray-900">
                                                                1/2020-2021 To 4/2022-2023
                                                            </td>
                                                            <td className="px-1 py-0 text-right text-xs  text-gray-900 whitespace-nowrap border border-gray-900">
                                                                2500.98
                                                            </td>
                                                        </tr> */}

                                                        <tr>
                                                            <td colSpan="2" className="px-1 py-0 text-right text-xs  font-medium text-gray-900 whitespace-nowrap border border-gray-900">Penal Charge</td>
                                                            <td className="px-1 py-0 text-right text-xs  text-gray-900 font-bold whitespace-nowrap border border-gray-900">3.00</td>

                                                        </tr>
                                                        <tr>
                                                            <td colSpan="2" className="px-1 py-0 text-right text-xs font-medium text-gray-900 whitespace-nowrap border border-gray-900">Form Fee</td>
                                                            <td className="px-1 py-0 text-right text-xs font-bold text-gray-900 whitespace-nowrap border border-gray-900">9999.0</td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="2" className="px-1 py-0 text-right text-xs font-medium text-gray-900 whitespace-nowrap border border-gray-900">Penalty Amount</td>
                                                            <td className="px-1 py-0 text-right text-xs font-bold text-gray-900 whitespace-nowrap border border-gray-900">9999.0</td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="2" className="px-1 py-0 text-right text-xs font-medium text-gray-900 whitespace-nowrap border border-gray-900">Total</td>
                                                            <td className="px-1 py-0 text-right text-xs font-bold text-gray-900 whitespace-nowrap border border-gray-900">9999.0</td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="2" className="px-1 py-0 text-right text-xs font-medium text-gray-900 whitespace-nowrap border border-gray-900">Amount Received</td>
                                                            <td className="px-1 py-0 text-right text-xs font-medium text-gray-900 whitespace-nowrap border border-gray-900">9999.0</td>
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
                                                <table className="min-w-full">
                                                    <thead className="bg-gray-50">

                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            {/* <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-nowrap">
                                                                <img className="w-32" src='/img/QR_Code.png' />
                                                            </td> */}

                                                            <td className="px-3 py-0 text-right text-xs text-gray-900 font-bold whitespace-nowrap">
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
                                            <span className="font-normal text-xs text-gray-900 dark:text-white">This is a Computer generated Receipt and does not require physical signature. </span>
                                        </li>
                                        <li className="mt-0 mb-0">
                                            <span className="font-normal text-xs text-gray-900 dark:text-white">संपत्ति कर भूमि या मकान का मालिकाना हक़ प्रदान नहीं करता है</span>
                                        </li>
                                        <li className="mt-0 mb-0">
                                            <span className="font-normal text-xs text-gray-900 dark:text-white">For Details Call us at 1800 890 4115</span>
                                        </li>
                                        <li className="mt-0 mb-0">
                                            <span className="font-normal text-xs font-semibold text-gray-900 dark:text-white">Cheque / Draft / Banker Cheque / Online payment are subject to realization</span>
                                        </li>
                                        <li className="mt-0 mb-0">
                                            <span className="font-normal text-xs text-gray-900 dark:text-white">You may validate receipt by scanning QR Code.</span>
                                        </li>
                                        <li className="mt-0 mb-0">
                                            <span className="font-normal text-xs text-gray-900 dark:text-white">Print Date : 25-02-2023 03:14</span>
                                        </li>
                                    </ul>
                                    {/* </li> */}
                                </div>

                                <div className="flex flex-col">
                                    <div className="overflow-x-auto">
                                        <div className="p-1 mb-3 lg:w-full inline-block align-middle">
                                            <div className="overflow-hidden">
                                                <table className="min-w-full">
                                                    <thead className="bg-gray-50">

                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="px-3 py-0 font-bold text-xs font-normal text-gray-900 whitespace-nowrap">
                                                                BHILAI MUNICIPAL CORPORATION, BHILAI
                                                            </td>
                                                            <td className="px-3 py-0 text-right text-xs text-gray-900 font-normal whitespace-nowrap">
                                                                In Collaboration With <b>Sri Publications & Stationers Pvt. Ltd.</b>
                                                            </td>

                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* 
                            <div className="mt-48 p-2">
                                <div className="border-t pt-1 border-slate-200">
                                    
                                </div>
                            </div> */}
                            </div>
                        </article>
                    </div >
                </section >
                <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-none mt-4 lg:max-w-full">

                    <div className="container py-2 px-10 mx-0 min-w-full flex flex-col items-center">
                        <div className="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
                            {/* <CustomBackButton showCustomBackButton={true} /> */}
                            <button onClick={handlePrintToPDF} className="w-36 h-8 px-4 py-1 mx-4 mb-2 tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-indigo-600">
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

export default PaymentReceipt