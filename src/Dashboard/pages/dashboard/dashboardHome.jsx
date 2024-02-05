import React, { useEffect, useState } from 'react'
import { Select, Option, Textarea, Checkbox, Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
     } from "@material-tailwind/react";
import Paper from "@mui/material/Paper";
import { getCookieByName } from '@/utils/RequireAuth';
import { isBlankString } from '@/utils/formValidatorUtils';
import { ColorRing } from 'react-loader-spinner';

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL

function DashboardHome() {

    const [collectionDetails, setCollectionDetails] = useState(null)
    const [isCollectionDetailsLoading, setIsCollectionDetailsLoading] = useState(null)
    const [isCollectionDetailsLoaded, setIsCollectionDetailsLoaded] = useState(null)

    const getAllCollectionDetails = async () => {
        try {
            let response = null, responseBody = null;
            setIsCollectionDetailsLoading(true)
            const getCollectionURL = `${SUDA_API_BASE_URL}/user/getAllCollection`
            const requestOptions = {
                method: "GET",
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
            }
            response = await fetch(getCollectionURL, requestOptions)
            responseBody = await response.json()
            setCollectionDetails(responseBody)
            setIsCollectionDetailsLoaded(true)
        } catch (err) {
            console.error(err)
            setIsCollectionDetailsLoaded(false)
        } finally {
            setIsCollectionDetailsLoading(false)
        }
    }

    useEffect(() => {
        getAllCollectionDetails()
    }, [])

    return (
        <div >  
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                <Card className="mt-6 w-90 drop-shadow-xl bg-lime-800">
                    <CardBody>
                        <Typography variant="h5" color="white" className="mb-2 ">
                            <span>₹</span> 10000
                        </Typography>
                        <Typography variant="h6" color="white" className="mb-2 ">
                            Total Collection
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="mt-6 w-90 drop-shadow-xl bg-amber-800">
                    <CardBody>
                        <Typography variant="h5" color="white" className="mb-2 ">
                            <span>₹</span> 10000
                        </Typography>
                        <Typography variant="h6" color="white" className="mb-2 ">
                            Total Demand
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="mt-6 w-90 drop-shadow-xl bg-red-700">
                    <CardBody>
                        <Typography variant="h5" color="white" className="mb-2 ">
                            <span>₹</span> 10000 
                        </Typography>
                        <Typography variant="h6" color="white" className="mb-2 ">
                            Total Due Demand
                        </Typography>
                    </CardBody>
                </Card>
            </div>
            {/* Assisement Report */}
            <div>
                <div className="px-0 pt-0 pb-4 m-0 mt-10 rounded-lg md:rounded-lg lg:max-w-full">
                    <nav className="relative bg-orange-800 h-12 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red rounded-lg drop-shadow-xl">
                        <h2 className="text-sm font-semibold text-center text-white">
                            Property Collection
                        </h2>
                    </nav>
                </div>
                {/* <div className="grid grid-cols-1 grid-rows-1 grid-flow-col gap-4 sm:grid-cols-2 md:grid-cols-3"> */}
                <div className="flex justify-around gap-4">
                    <Card className="mt-6 w-80 drop-shadow-xl bg-red-700 col-start-1">
                        <CardBody>
                            <Typography variant="h5" color="white" className="mb-2 text-center">
                                10000
                            </Typography>
                            <Typography variant="h6" color="white" className="mb-2 text-center">
                                Total SAF
                            </Typography>
                        </CardBody>
                    </Card>
                    <Card className="mt-6 w-80 drop-shadow-xl bg-lime-800 col-start-1">
                        <CardBody>
                            <Typography variant="h5" color="white" className="mb-2 text-center">
                                10000
                            </Typography>
                            <Typography variant="h6" color="white" className="mb-2 text-center">
                                New SAF
                            </Typography>
                        </CardBody>
                    </Card>
                    <Card className="mt-6 w-80 drop-shadow-xl bg-amber-800 col-start-1">
                        <CardBody>
                            <Typography variant="h5" color="white" className="mb-2 text-center">
                                10000 
                            </Typography>
                            <Typography variant="h6" color="white" className="mb-2 text-center">
                                Re SAF
                            </Typography>
                        </CardBody>
                    </Card>
                                
                </div>
            </div>
            
             {/*All module collection   */}
            <div>
                <div className="px-0 pt-0 pb-4 m-0 mt-10 rounded-lg md:rounded-lg  lg:max-w-full">
                    <nav className="relative bg-orange-800 h-12 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red rounded-lg drop-shadow-xl">
                        <h2 className="text-sm font-semibold text-center text-white">
                            ALL Module Collection
                        </h2>
                    </nav>
                </div>
                <div className="container mx-auto mt-4">
                    <div className="grid px-2 gap-2 lg:grid-cols-4">
                        <div className="flex items-center px-4 py-6 bg-blue-gray-300 border border-red-800 rounded-lg shadow-2xl">
                            <div className="p-3 bg-red-900 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="mx-4">
                                {
                                    isCollectionDetailsLoading == true ? (
                                        <div className="m-auto w-24 h-10">
                                            <ColorRing
                                                visible={true}
                                                height="40"
                                                width="40"
                                                colors={['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000']}
                                            />
                                        </div>
                                    ) : null
                                }
                                {
                                    isCollectionDetailsLoaded == true ? (
                                        <>
                                            <h4 className="text-lg font-semibold text-gray-900">
                                                {
                                                    !isBlankString(collectionDetails?.today) ?
                                                        collectionDetails?.today : `Data not available`
                                                }
                                            </h4>

                                        </>

                                    ) : null
                                }
                                <div className="text-green-700 text-sm font-bold">
                                    Today
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center px-4 py-6 bg-blue-gray-300 border border-red-800 rounded-lg shadow-2xl">
                            <div className="p-3 bg-red-900 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="mx-4">
                                {
                                    isCollectionDetailsLoading == true ? (
                                        <div className="m-auto w-24 h-10">
                                            <ColorRing
                                                visible={true}
                                                height="40"
                                                width="40"
                                                colors={['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000']}
                                            />
                                        </div>
                                    ) : null
                                }
                                {
                                    isCollectionDetailsLoaded == true ? (
                                        <>
                                            <h4 className="text-lg font-semibold text-gray-900">
                                                {
                                                    !isBlankString(collectionDetails?.thisWeek) ?
                                                        collectionDetails?.thisWeek : `Data not available`
                                                }
                                            </h4>

                                        </>
                                    ) : null
                                }
                                <div className="text-green-700 text-sm font-bold">
                                    This Week
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center px-4 py-6 bg-blue-gray-300 border border-red-800 rounded-lg shadow-2xl">
                            <div className="p-3 bg-red-900 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="mx-4">
                                {
                                    isCollectionDetailsLoading == true ? (
                                        <div className="m-auto w-24 h-10">
                                            <ColorRing
                                                visible={true}
                                                height="40"
                                                width="40"
                                                colors={['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000']}
                                            />
                                        </div>
                                    ) : null
                                }
                                {
                                    isCollectionDetailsLoaded == true ? (
                                        <>
                                            <h4 className="text-lg font-semibold text-gray-900">
                                                {
                                                    !isBlankString(collectionDetails?.thisMonth) ?
                                                        collectionDetails?.thisMonth : `Data not available`
                                                }
                                            </h4>

                                        </>
                                    ) : null
                                }
                                <div className="text-green-700 text-sm font-bold">
                                    This Month
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center px-4 py-6 bg-blue-gray-300 border border-red-800 rounded-lg shadow-2xl">
                            <div className="p-3 bg-red-900 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="mx-4">
                                {
                                    isCollectionDetailsLoading == true ? (
                                        <div className="m-auto w-24 h-10">
                                            <ColorRing
                                                visible={true}
                                                height="40"
                                                width="40"
                                                colors={['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000']}
                                            />
                                        </div>
                                    ) : null
                                }
                                {
                                    isCollectionDetailsLoaded == true ? (
                                        <>
                                            <h4 className="text-lg font-semibold text-gray-900">
                                                {
                                                    !isBlankString(collectionDetails?.thisYear) ?
                                                        collectionDetails?.thisYear : `Data not available`
                                                }
                                            </h4>
                                
                                        </>
                                    ) : null
                                }
                                <div className="text-green-700 text-sm font-bold">
                                    This Year
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Property collection  */}
            <div className="px-0 pt-0 pb-4 m-0 mt-10 rounded-lg md:rounded-lg  lg:max-w-full">
                <nav className="relative bg-orange-800 h-12 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red rounded-lg drop-shadow-xl">
                    <h2 className="text-sm font-semibold text-center text-white">
                        Property Collection
                    </h2>
                </nav>
            </div>
            <div className="container mx-auto mt-4">
                <div className="grid px-2 gap-2 lg:grid-cols-4">
                    <div className="flex items-center px-4 py-6 bg-blue-gray-300 border border-red-800 rounded-lg shadow-2xl">
                        <div className="p-3 bg-red-900 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="mx-4">
                            {
                                isCollectionDetailsLoading == true ? (
                                    <div className="m-auto w-24 h-10">
                                        <ColorRing
                                            visible={true}
                                            height="40"
                                            width="40"
                                            colors={['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000']}
                                        />
                                    </div>
                                ) : null
                            }
                            {
                                isCollectionDetailsLoaded == true ? (
                                    <>
                                        <h4 className="text-lg font-semibold text-gray-900">
                                            {
                                                !isBlankString(collectionDetails?.today) ?
                                                    collectionDetails?.today : `Data not available`
                                            }
                                        </h4>

                                    </>

                                ) : null
                            }
                            <div className="text-green-700 text-sm font-bold">
                                Today
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center px-4 py-6 bg-blue-gray-300 border border-red-800 rounded-lg shadow-2xl">
                        <div className="p-3 bg-red-900 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="mx-4">
                            {
                                isCollectionDetailsLoading == true ? (
                                    <div className="m-auto w-24 h-10">
                                        <ColorRing
                                            visible={true}
                                            height="40"
                                            width="40"
                                            colors={['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000']}
                                        />
                                    </div>
                                ) : null
                            }
                            {
                                isCollectionDetailsLoaded == true ? (
                                    <>
                                        <h4 className="text-lg font-semibold text-gray-900">
                                            {
                                                !isBlankString(collectionDetails?.thisWeek) ?
                                                    collectionDetails?.thisWeek : `Data not available`
                                            }
                                        </h4>

                                    </>
                                ) : null
                            }
                            <div className="text-green-700 text-sm font-bold">
                                This Week
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center px-4 py-6 bg-blue-gray-300 border border-red-800 rounded-lg shadow-2xl">
                        <div className="p-3 bg-red-900 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="mx-4">
                            {
                                isCollectionDetailsLoading == true ? (
                                    <div className="m-auto w-24 h-10">
                                        <ColorRing
                                            visible={true}
                                            height="40"
                                            width="40"
                                            colors={['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000']}
                                        />
                                    </div>
                                ) : null
                            }
                            {
                                isCollectionDetailsLoaded == true ? (
                                    <>
                                        <h4 className="text-lg font-semibold text-gray-900">
                                            {
                                                !isBlankString(collectionDetails?.thisMonth) ?
                                                    collectionDetails?.thisMonth : `Data not available`
                                            }
                                        </h4>

                                    </>
                                ) : null
                            }
                            <div className="text-green-700 text-sm font-bold">
                                This Month
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center px-4 py-6 bg-blue-gray-300 border border-red-800 rounded-lg shadow-2xl">
                        <div className="p-3 bg-red-900 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="mx-4">
                            {
                                isCollectionDetailsLoading == true ? (
                                    <div className="m-auto w-24 h-10">
                                        <ColorRing
                                            visible={true}
                                            height="40"
                                            width="40"
                                            colors={['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000']}
                                        />
                                    </div>
                                ) : null
                            }
                            {
                                isCollectionDetailsLoaded == true ? (
                                    <>
                                        <h4 className="text-lg font-semibold text-gray-900">
                                            {
                                                !isBlankString(collectionDetails?.thisYear) ?
                                                    collectionDetails?.thisYear : `Data not available`
                                            }
                                        </h4>
                            
                                    </>
                                ) : null
                            }
                            <div className="text-green-700 text-sm font-bold">
                                This Year
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Waste Collection */}
            <div className="px-0 pt-0 pb-4 m-0 mt-10 rounded-lg md:rounded-lg  lg:max-w-full">
                <nav className="relative bg-orange-800 h-12 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red rounded-lg drop-shadow-xl">
                    <h2 className="text-sm font-semibold text-center text-white">
                        Waste Collection
                    </h2>
                </nav>
                <div className="container mx-auto mt-4">
                    <div className="grid px-2 gap-2 lg:grid-cols-4">
                        <div className="flex items-center px-4 py-6 bg-blue-gray-300 border border-red-800 rounded-lg shadow-2xl">
                            <div className="p-3 bg-red-900 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="mx-4">
                                {
                                    isCollectionDetailsLoading == true ? (
                                        <div className="m-auto w-24 h-10">
                                            <ColorRing
                                                visible={true}
                                                height="40"
                                                width="40"
                                                colors={['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000']}
                                            />
                                        </div>
                                    ) : null
                                }
                                {
                                    isCollectionDetailsLoaded == true ? (
                                        <>
                                            <h4 className="text-lg font-semibold text-gray-900">
                                                {
                                                    !isBlankString(collectionDetails?.today) ?
                                                        collectionDetails?.today : `Data not available`
                                                }
                                            </h4>

                                        </>

                                    ) : null
                                }
                                <div className="text-green-700 text-sm font-bold">
                                    Today
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center px-4 py-6 bg-blue-gray-300 border border-red-800 rounded-lg shadow-2xl">
                            <div className="p-3 bg-red-900 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="mx-4">
                                {
                                    isCollectionDetailsLoading == true ? (
                                        <div className="m-auto w-24 h-10">
                                            <ColorRing
                                                visible={true}
                                                height="40"
                                                width="40"
                                                colors={['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000']}
                                            />
                                        </div>
                                    ) : null
                                }
                                {
                                    isCollectionDetailsLoaded == true ? (
                                        <>
                                            <h4 className="text-lg font-semibold text-gray-900">
                                                {
                                                    !isBlankString(collectionDetails?.thisWeek) ?
                                                        collectionDetails?.thisWeek : `Data not available`
                                                }
                                            </h4>

                                        </>
                                    ) : null
                                }
                                <div className="text-green-700 text-sm font-bold">
                                    This Week
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center px-4 py-6 bg-blue-gray-300 border border-red-800 rounded-lg shadow-2xl">
                            <div className="p-3 bg-red-900 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="mx-4">
                                {
                                    isCollectionDetailsLoading == true ? (
                                        <div className="m-auto w-24 h-10">
                                            <ColorRing
                                                visible={true}
                                                height="40"
                                                width="40"
                                                colors={['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000']}
                                            />
                                        </div>
                                    ) : null
                                }
                                {
                                    isCollectionDetailsLoaded == true ? (
                                        <>
                                            <h4 className="text-lg font-semibold text-gray-900">
                                                {
                                                    !isBlankString(collectionDetails?.thisMonth) ?
                                                        collectionDetails?.thisMonth : `Data not available`
                                                }
                                            </h4>

                                        </>
                                    ) : null
                                }
                                <div className="text-green-700 text-sm font-bold">
                                    This Month
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center px-4 py-6 bg-blue-gray-300 border border-red-800 rounded-lg shadow-2xl">
                            <div className="p-3 bg-red-900 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="mx-4">
                                {
                                    isCollectionDetailsLoading == true ? (
                                        <div className="m-auto w-24 h-10">
                                            <ColorRing
                                                visible={true}
                                                height="40"
                                                width="40"
                                                colors={['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000']}
                                            />
                                        </div>
                                    ) : null
                                }
                                {
                                    isCollectionDetailsLoaded == true ? (
                                        <>
                                            <h4 className="text-lg font-semibold text-gray-900">
                                                {
                                                    !isBlankString(collectionDetails?.thisYear) ?
                                                        collectionDetails?.thisYear : `Data not available`
                                                }
                                            </h4>
                                
                                        </>
                                    ) : null
                                }
                                <div className="text-green-700 text-sm font-bold">
                                    This Year
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* Water Collection */}
            <div className="px-0 pt-0 pb-4 m-0 mt-10 mb-10 rounded-lg md:rounded-lg  lg:max-w-full">
                <nav className="relative bg-orange-800 h-12 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red rounded-lg drop-shadow-xl">
                    <h2 className="text-sm font-semibold text-center text-white">
                        Water Collection
                    </h2>
                </nav>
                <div className="container mx-auto mt-4">
                    <div className="grid px-2 gap-2 lg:grid-cols-4">
                        <div className="flex items-center px-4 py-6 bg-blue-gray-300 border border-red-800 rounded-lg shadow-2xl">
                            <div className="p-3 bg-red-900 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="mx-4">
                                {
                                    isCollectionDetailsLoading == true ? (
                                        <div className="m-auto w-24 h-10">
                                            <ColorRing
                                                visible={true}
                                                height="40"
                                                width="40"
                                                colors={['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000']}
                                            />
                                        </div>
                                    ) : null
                                }
                                {
                                    isCollectionDetailsLoaded == true ? (
                                        <>
                                            <h4 className="text-lg font-semibold text-gray-900">
                                                {
                                                    !isBlankString(collectionDetails?.today) ?
                                                        collectionDetails?.today : `Data not available`
                                                }
                                            </h4>

                                        </>

                                    ) : null
                                }
                                <div className="text-green-700 text-sm font-bold">
                                    Today
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center px-4 py-6 bg-blue-gray-300 border border-red-800 rounded-lg shadow-2xl">
                            <div className="p-3 bg-red-900 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="mx-4">
                                {
                                    isCollectionDetailsLoading == true ? (
                                        <div className="m-auto w-24 h-10">
                                            <ColorRing
                                                visible={true}
                                                height="40"
                                                width="40"
                                                colors={['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000']}
                                            />
                                        </div>
                                    ) : null
                                }
                                {
                                    isCollectionDetailsLoaded == true ? (
                                        <>
                                            <h4 className="text-lg font-semibold text-gray-900">
                                                {
                                                    !isBlankString(collectionDetails?.thisWeek) ?
                                                        collectionDetails?.thisWeek : `Data not available`
                                                }
                                            </h4>

                                        </>
                                    ) : null
                                }
                                <div className="text-green-700 text-sm font-bold">
                                    This Week
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center px-4 py-6 bg-blue-gray-300 border border-red-800 rounded-lg shadow-2xl">
                            <div className="p-3 bg-red-900 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="mx-4">
                                {
                                    isCollectionDetailsLoading == true ? (
                                        <div className="m-auto w-24 h-10">
                                            <ColorRing
                                                visible={true}
                                                height="40"
                                                width="40"
                                                colors={['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000']}
                                            />
                                        </div>
                                    ) : null
                                }
                                {
                                    isCollectionDetailsLoaded == true ? (
                                        <>
                                            <h4 className="text-lg font-semibold text-gray-900">
                                                {
                                                    !isBlankString(collectionDetails?.thisMonth) ?
                                                        collectionDetails?.thisMonth : `Data not available`
                                                }
                                            </h4>

                                        </>
                                    ) : null
                                }
                                <div className="text-green-700 text-sm font-bold">
                                    This Month
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center px-4 py-6 bg-blue-gray-300 border border-red-800 rounded-lg shadow-2xl">
                            <div className="p-3 bg-red-900 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="mx-4">
                                {
                                    isCollectionDetailsLoading == true ? (
                                        <div className="m-auto w-24 h-10">
                                            <ColorRing
                                                visible={true}
                                                height="40"
                                                width="40"
                                                colors={['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000']}
                                            />
                                        </div>
                                    ) : null
                                }
                                {
                                    isCollectionDetailsLoaded == true ? (
                                        <>
                                            <h4 className="text-lg font-semibold text-gray-900">
                                                {
                                                    !isBlankString(collectionDetails?.thisYear) ?
                                                        collectionDetails?.thisYear : `Data not available`
                                                }
                                            </h4>
                                
                                        </>
                                    ) : null
                                }
                                <div className="text-green-700 text-sm font-bold">
                                    This Year
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DashboardHome