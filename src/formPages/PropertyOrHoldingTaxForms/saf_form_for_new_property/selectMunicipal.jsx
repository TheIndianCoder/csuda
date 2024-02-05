import React, { Component } from 'react'
import { Link } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Input,
    Checkbox,
    Button,
    Typography,
    Select, 
    Option
} from "@material-tailwind/react";
import { SimpleFooter } from "@/widgets/layout";
import CustomBackButton from './customBackButton';

export class SelectMunicipal extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { showSelectMunicipalModal, switchOnNextModalNOffCurrModal, nextModal, currModal } = this.props
        // console.log(this.props)

        {
            return showSelectMunicipalModal ? (


                <div className="relative mt-10 flex-col justify-center min-h-screen overflow-hidden">
                    <div className="w-11/12 px-0 pt-0 pb-4  m-auto bg-white rounded-md  border border-gray-500 lg:max-w-7xl">
                        <nav className="relative flex flex-wrap items-center justify-between px-0 py-1 navcustomproperty mb-3 ring-1 ring-black rounded-none">
                            <h2 className="text-sm font-semibold text-center text-white pl-2">
                                Property Panel
                            </h2>
                        </nav>
                        <form className="mt-6 ">
                            <div className="mb-2 ">
                                <label
                                    for="email"
                                    className="block text-sm font-semibold text-gray-800 px-4 pb-2.5"
                                >
                                    Please select your ULB from the below list
                                </label>

                                <div className='grid grid-cols-2 gap-10'>
                                    <div className='relative w-full lg:max-w-md px-4'>
                                        {/* <select className="w-full p-2.5 text-gray-500 bg-white border border-black rounded-md shadow-sm outline-none focus:border-indigo-600 ">
                                            <option selected>--- Please select your ULB</option>
                                            <option>Laravel 9 with React</option>
                                            <option>React with Tailwind CSS</option>
                                            <option>React With Headless UI</option>
                                        </select> 
                                        
                                        */}

                                        <Select label="Select" className='pl-2 font-bold pr-3 py-2 font-bold text-sm text-gray-900'>
                                            <Option> BILASPUR MUNICIPAL CORPORATION</Option>
                                            <Option> DURG MUNICIPAL CORPORATION</Option>
                                            <Option> RISALI MUNICIPAL CORPORATION</Option>
                                            <Option> BHILAI MUNICIPAL CORPORATION</Option>
                                            {/* <Option>Material Tailwind Svelte</Option> */}
                                        </Select>
                                        <div className="mt-10 px-0">
                                            <button onClick={() => switchOnNextModalNOffCurrModal(currModal, nextModal)}
                                                className="w-36 h-8 px-4 py-1 tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-indigo-600">
                                                GO NOW
                                            </button>
                                           
                                        </div>
                                    </div>
                                    <img src='/img/chhattisgarh_main.jpg' />
                                </div>

                            </div>


                        </form>


                    </div>
                </div>
            ) : null
        }
    }
}

export default SelectMunicipal