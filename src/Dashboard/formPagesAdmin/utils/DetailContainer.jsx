import React, { useState } from 'react'
import { useEffect } from 'react'

const DetailContainer = ({detailLists, details, title}) => {
  console.log(details, "details")
    const [detail, setDetail] = useState([])
    const [detailList, setdetailList] = useState('')
    // useEffect(()=> {
    //    console.log(detailLists, details)
    //     if(details){
    //         setDetail(prev => [...prev,details])
    //     }
    //     if(detailLists){
    //         setdetailList(detailLists)
    //     }
    //     console.log(typeof detail[0],typeof detailList[0])
    // },[details, detailLists])
    useEffect(()=>{
        console.log(detailLists, details, "detail fetched")
    },[detailLists, details]) 
  return (
   <>
  
      {/* <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
        <h2 className="text-sm font-semibold text-center text-white">
          {title}
        </h2>
        <button className='text-sm py-1 px-4 rounded-md ml-4
        font-semibold text-center text-white mr-2 bg-red-500'
        // onClick={backbuttonHandler}
        >Back</button>
      </nav> */}
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-2.5 lg:w-full inline-block align-middle">
            <div className="overflow-hidden">
           
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-3 px-2 py-3 md:px-6">
            {/* {
                detailList.length > 0 ? detailList?.map(detailList =>  {
                    const {field} = detailList.field
                 console.log(detail[0].detailList?.field,detailList?.field)
                 let v = detailList?.field

                    return (
                         <div>
                           {detailList?.header} : {detail[0].v}
                         </div>
                    )
                    }) : null
            } */}
         
         {details.length > 0 ?
            details?.map((row) => ( 
            
                detailLists.map((col) => (
                  <div className='px-6 py-2 text-xs font-normal  text-gray-700 whitespace-normal'>{col.header} :  {row[col.field]}</div>
                ))
              
            )): null} 

         
          
              </div>
            </div>
          </div>
        </div>
      </div>
    
   </>
  )
}

export default DetailContainer