import React from 'react';
import { Card } from 'antd';
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
// import {publicSaf} from "../../public/saf";

const { Meta } = Card;

const Card1 = () => (
    <>  
    <div className='md:flex md:justify-between mt-10 grid justify-items-center bg-gray-300'>
        <Card
            hoverable
            style={{
            width: 340,
            margin: '10rem auto',
            }}
            className='mr-10 p-5'
            cover={<img alt="example" className="h-[15rem] w-[5rem !importent]" src="https://municipalservices.jharkhand.gov.in/public/assets/img/icons/rcm-1.png" />}
        >
            {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
            <div hoverable className='justigy-items-center '>
                
               <Button  className="bg-blue-gray-800  hover:text-red-500 hover:bg-gray-100 w-full" >Pay Property Tax</Button>
                <Button className="bg-blue-gray-800  hover:text-red-500 hover:bg-gray-100 w-full mt-3" >Self Asseisment</Button>
            </div>
            
        </Card>
        <Card
            hoverable
            style={{
            width: 340,
            margin: '10rem auto',
            }}
            className='mr-10 p-5'
            cover={<img alt="example"className="h-[15rem] w-[5rem !importent]" src="https://municipalservices.jharkhand.gov.in/public/assets/img/icons/rcm-2.png" />}
        >
            
            <div hoverable className='justigy-items-center '>
                <Button className="bg-blue-gray-800 w-full  hover:text-red-500 hover:bg-gray-100 ">Pay Water Tax</Button>
                <Button className="bg-blue-gray-800 w-full  hover:text-red-500 hover:bg-gray-100 mt-3">Apply Connection</Button>
            </div>
        </Card>
        <Card
            hoverable
            style={{
            width: 340,
            margin: '10rem auto',
            }}
            className='mr-10 p-5'
            cover={<img alt="example" className="h-[15rem] w-[5rem !importent]" src="https://municipalservices.jharkhand.gov.in/public/assets/img/icons/rcm-4.png" />}
        >
            <div hoverable className='justigy-items-center'>
                <Button className="bg-blue-gray-800 w-full hover:text-red-500 hover:bg-gray-100 ">Tax Collector List</Button>
            </div>
        </Card>
    </div>
        
        
    </>
  
);
export default Card1;