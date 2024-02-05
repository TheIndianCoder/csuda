import { SOMETHING_WENT_WRONG } from '@/utils/appConstants'
import { ColorRingCustom, NotFoundErrorMessageCustom } from '@/utils/commonComponents'
import React, { useEffect } from 'react'
import Table from '../../utils/Table'

function ViewDueDemandDetails({
    dueDetails, isDueDetailsLoading, isDueDetailsLoaded,
    demandDetails, isDemandDetailsLoading, isDemandDetailsLoaded 
}) {

    useEffect(()=>{
        if(dueDetails){
            console.log(dueDetails,"dueDetails",demandDetails,"demandDetails")
        }
    },[dueDetails])
    const columns = [
        { field: "demand_amount", header: "Demand Amount" },
        { field: "demand_from", header: "Demand From" },
        { field: "demand_to", header: "Demand To" },
      ]; 
    return (
        <div className="w-full px-0 pt-0 pb-4 m-auto bg-white rounded-none border border-gray-500 lg:max-w-full">
            <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                <h2 className="text-sm font-semibold text-center text-white">
                    Due Demand Details
                </h2> 
            </nav>
            <div className="flex flex-col">
                {
                    isDueDetailsLoading == true || isDemandDetailsLoading == true ? (
                        <ColorRingCustom />
                    ) : null
                }
                {
                    isDueDetailsLoaded == false || isDemandDetailsLoaded == false ? (
                        <NotFoundErrorMessageCustom
                            message={SOMETHING_WENT_WRONG}
                            text_size={`sm`}
                        />
                    ) : null
                } 
                {
                    (isDueDetailsLoaded == true
                        //  && isDemandDetailsLoaded == true
                         )
                        && (dueDetails?.length < 1 
                            // || demandDetails?.length < 1 
                            ) ? (
                        <NotFoundErrorMessageCustom
                            message={`Due or Demand details not found !`}
                            text_size={`sm`}
                        />
                    ) : null
                }
                {
                    isDueDetailsLoaded == true 
                        && dueDetails?.length > 0  ?
                        
                            
                        
                        (
                            <Table data={dueDetails} columns={columns} hover={true} striped={true}/>
                        ) : null
                }
            </div>
        </div>
    )
}

export default ViewDueDemandDetails