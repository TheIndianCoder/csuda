import React from 'react';
import { Carousel } from 'antd';

const contentStyle = {
  height: '70%',
  color: '#fff',
  lineHeight: '70%',
  textAlign: 'center',
  background: '#364d79',
};

const Carousel1 = () => (
  <Carousel autoplay>
    <div>
        <img className="w-full h-full" style={contentStyle} src="https://municipalservices.jharkhand.gov.in/public/assets/img/sliders/n2.jpg" alt="" />      
    </div>
    <div>
    <img className="w-full  h-full" style={contentStyle} src="https://municipalservices.jharkhand.gov.in/public/assets/img/amrut.jpg" alt="" />      
    </div>
    <div>
    <img className="w-full  h-full" style={contentStyle} src="https://municipalservices.jharkhand.gov.in/public/assets/img/sliders/n4.jpg" alt="" />
     
    </div>
    <div>
    <img className="w-full  h-full" style={contentStyle} src="https://municipalservices.jharkhand.gov.in/public/assets/img/sliders/n4.jpg" alt="" />
      
    </div>
  </Carousel>
);
export default Carousel1;