import React from 'react'


function SearchProperty(props) {
    const {switchOnNextModalNOffCurrModal, nextModal, currModal, showSearchModal} = props;
    return showSearchModal ? (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden mt-10 mb-10">


            <div className="w-11/12 px-0 pt-0 pb-4 m-auto bg-white rounded-md border border-gray-500 lg:max-w-full">
                <nav className="relative flex navcustomproperty flex-wrap items-center justify-between pl-2 pr-0 py-1 mb-2 ring-1 ring-black rounded-none">
                    <h2 className="text-sm font-semibold text-center text-white">
                        Search Property
                    </h2>
                </nav>
                <form className="mt-4 ">
                    <div class="h-screen bg-white py-10 px-2">
                        <div class="container mx-auto">
                            <div class="max-w-sm mx-auto md:max-w-lg">
                                <div class="w-full">
                                    <div class="bg-white h-full border border-gray-900 shadow-md shadow-gray-700 py-3 rounded text-center">
                                        <h1 class="text-sm font-extrabold text-blue-700 ">SEARCH PROPERTY</h1>
                                        <div class="flex flex-col mt-2">
                                            <span class="text-xs font-bold text-center">
                                                Ward No.
                                                <p className='contents text-red-600 text-sm font-bold'>*</p>
                                            </span>
                                            <span class="font-bold mt-2">
                                                <input type='number' id="phone" class="w-64 h-8 bg-white-200 appearance-none border border-gray-500 rounded-md py-2 px-2 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" ></input>
                                            </span>

                                            <span class="text-xs font-bold text-center mt-2">
                                                Property Id
                                                {/* <p className='contents text-red-600 text-sm font-bold'>*</p> */}
                                            </span>
                                            <span class="font-bold mt-2">
                                                <input type='number' id="phone" class="w-64 h-8 bg-white-200 appearance-none border border-gray-500 rounded-md py-2 px-2 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" ></input>
                                            </span>

                                            <span class="text-xs text-red-600 font-semibold text-center mt-1">
                                                OR
                                                {/* <p className='contents text-red-600 text-sm font-bold'>*</p> */}
                                            </span>

                                            <span class="text-xs font-bold text-center mt-2">
                                                Application No.
                                                {/* <p className='contents text-red-600 text-sm font-bold'>*</p> */}
                                            </span>
                                            <span class="font-bold mt-2">
                                            <input class="w-64 h-8 bg-white-200 appearance-none border border-gray-500 rounded-md py-2 px-2 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500" id="username" type="text"  />
                                            </span>
                                            <span class="text-xs text-red-600 font-semibold text-center mt-1">
                                                OR
                                                {/* <p className='contents text-red-600 text-sm font-bold'>*</p> */}
                                            </span>
                                            <span class="text-xs font-bold text-center mt-2">
                                                Owner Name
                                                {/* <p className='contents text-red-600 text-sm font-bold'>*</p> */}
                                            </span>
                                            <span class="font-bold mt-2">
                                            <input class="w-64 h-8 bg-white-200 appearance-none border border-gray-500 rounded-md py-2 px-2 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500" id="username" type="text" />
                                            </span>
                                            <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-none mt-4 lg:max-w-full">

                                                <div className="container py-2 px-10 mx-0 min-w-full flex flex-col items-center">
                                                    <div class="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
                                                        {/* <CustomBackButton showCustomBackButton={true} /> */}
                                                        <button class="w-24 h-8 px-4 py-1 mx-4 mb-2 tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-indigo-600">
                                                            Search
                                                        </button>
                                                        
                                                    </div>



                                                </div>

                                            </div>
                                        </div>




                                        {/* <div class="flex justify-center text-center mt-5">

                                            <a class="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"><span class="font-bold">Resend OTP</span><i class='bx bx-caret-right ml-1'></i></a>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>



            </div>

        </div>
    ) : null
}

export default SearchProperty