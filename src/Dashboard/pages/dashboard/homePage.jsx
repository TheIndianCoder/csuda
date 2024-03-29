import { Button } from '@material-tailwind/react'
import React, { Fragment, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import DashboardAccordion from './dashboardAccordion';
import HomePageNav from './homePageNav';
import DashboardHome from './dashboardHome';
import routes from "@/routes-dashboard";

const mainPageSearchProperty = `MAIN_PAGE_SERACH_PROPERTY_ADMIN`

function HomePage() {
    const navigate = useNavigate()

    const handleLogout = () => {
        //window.localStorage.removeItem("SUDA_TOKEN")
        document.cookie = `SUDA_TOKEN=; path=/`
        navigate("/home")
    }

    //const

    return (
        <div>   
            <div class="flex h-screen">
           
                <div class="px-4 py-2 navcustomproperty lg:w-1/4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="inline w-8 h-8 text-white lg:hidden" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <div class="hidden lg:block">
                        <div class="my-2 mb-6">
                            {/* <div class="sidebar">
                        <i class='bx bxl-c-plus-plus'></i>
                        </div> */}
                            <h1 class="text-2xl font-bold text-white">Admin Dashboard</h1>
                        </div>
                        <ul>

                            <li class="mb-6">
                                <div class="relative">
                                    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                                        <button type="submit" class="p-1 focus:outline-none">
                                            <svg fill="none" stroke="currentColor" stroke-linecap="round"
                                                stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
                                                class="w-4 h-4">
                                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                            </svg>
                                        </button>
                                    </span>
                                    <input type="search" name="search"
                                        class="w-full px-4 py-2 pl-12 rounded shadow outline-none" placeholder="Search..." />
                                </div>
                            </li>
                            <li class="mb-2 rounded hover:shadow hover:bg-gray-800">
                                <a href="/dashboard/home" class="inline-block w-full h-full px-0 py-2 font-bold text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-6 h-6 mr-2 -mt-2"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" ></path>
                                    </svg>
                                    Dashboard
                                </a>
                            </li>
                            {/* accordian code */}
                            <DashboardAccordion />
                        </ul>
                    </div>

                </div>
                <div class="w-full px-4 py-2 bg-gray-200 lg:w-full">
                <HomePageNav />
                    <Routes>
                        {routes.map(
                            ({ layout, pages }) =>
                                layout === "dashboard" &&
                                pages.map(({ path, element }) => (
                                    <Route exact path={path} element={element} />
                                ))
                        )}
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default HomePage