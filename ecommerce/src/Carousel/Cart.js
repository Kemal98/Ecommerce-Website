import React from 'react'
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css/skyblue';

import img_1 from '../photo/2.jpeg'
import img_2 from '../photo/1.webp'
import img_3 from '../photo/3.png'
import styled from "styled-components"
import { Link } from 'react-router-dom';

const Cart = () => {
  return (
           <div className='container'>
          
            <h2>OUR PRODUCTS</h2>
            
                <Wraper>
             <Link to='https://www.aliexpress.com/wholesale?catId=0&initiative_id=AS_20220920070622&SearchText=drone&spm=a2g0o.home.1000002.0'>
                   <Splide options={{perPage: 3, arrows: false, pagination:false, drag:'free', gap:"1em",}}>
               
                    <SplideSlide>
                         <Card>
                             <p>2022 New XS011 Mini Drone 4k Profe</p>
                             <img src={img_2}/>
                        </Card>
                      </SplideSlide>
              
                
                      <SplideSlide>
                         <Card>
                             <p className='p-slider'>CEVENNESFE K918 MAX GPS Dron</p>
                             <img src='https://bswireless.hr/wp-content/uploads/2018/03/visuo-xs809hw-1.jpg'/>
                        </Card>
                      </SplideSlide>
                
                      <SplideSlide>
                         <Card>
                             <p className='p-slider'>MJX Bug 16 Pro EIS Drone 3-Axis </p>
                             <img src={img_3}/>
                        </Card>
                      </SplideSlide>
                
                      <SplideSlide>
                         <Card>
                             <p>Autel Robotics EVO NANO/ Nano</p>
                             <img src='https://p.globalsources.com/IMAGES/PDT/B1191415774/Laptop-Sunshade.jpg'/>
                        </Card>
                      </SplideSlide>
              
                   </Splide>    
                 </Link>
                </Wraper>
           
                <Wraper>
           
           <Splide options={{perPage: 3, arrows: false, pagination:false, drag:'free', gap:"1em",}}>
         
            <SplideSlide>
                 <Card>
                     <p className='p-slider'> 2021 NEW Drone GEPRC CineLog3</p>
                     <img src='https://ae01.alicdn.com/kf/H9371dde773004975b5685c804b7dd24b4/2021-SG108-Pro-New-4K-Drone-2-Axis-Gimbal-Professional-Camera-5G-WiFi-GPS-28Mins-Flight.jpg_220x220xz.jpg_.webp'/>
                </Card>
              </SplideSlide>
      
        
              <SplideSlide>
                 <Card>
                     <p className='p-slider'>AE8 Pro Max Obstacle Avoidance</p>
                     <img src='https://bswireless.hr/wp-content/uploads/2018/03/visuo-xs809hw-1.jpg'/>
                </Card>
              </SplideSlide>
        
              <SplideSlide>
                 <Card>
                     <p className='p-slider'>Dron 5G GPS Drone 8K Profession</p>
                     <img src='https://ae01.alicdn.com/kf/S3a601467307141d189e6a47089df78fbu/SJRC-F7s-4K-PRO-Drone-4K-Profesional-GPS-5G-WiFi-3-Axis-Gimbal-EIS-FPV-Brushless.jpg_220x220xz.jpg_.webp'/>
                </Card>
              </SplideSlide>
        
              <SplideSlide>
                 <Card>
                     <p className='p-slider'>2022 New Quadcopter E99 Pro WIFI FP</p>
                     <img src='https://ae01.alicdn.com/kf/Hc11807a600b14b0e8b4d0e92639c0772o/TCMMRC-UR26-Mermaid-220-rc-drone-Radio-control-toysQuadcopter-fpv-Freestyle-racing-drone-DIY-fpv-drone.jpg_220x220xz.jpg_.webp'/>
                </Card>
              </SplideSlide>
      
           </Splide>
        </Wraper>
             </div>
  )
}

export default Cart

const Wraper = styled.div`
margin: 4rem 0rem;
`;
const H3 = styled.div`
text-align: center;
`
const Card = styled.div`
min-heigth:25rem;
border-radius:2rem;
overflow:hidden;
position:relative;


img {
    border-radius: 2rem;
    left:0;
    width:100%;
    height:12rem;
    object-fit:cover;
}
p {
    position:absolute;
    z-index:10;
    left: 50%;
    bottom:0%;
    transform:translate(-50%,0%);
    color:white;
    width:100%;
    text-align: center;
    font-weight: 600;
    font-size:0.8rem;
    height:40%;
    display:flex;
    justify-content:center;
    align-items: center;

position: absolute;
width: 100%;
height: 100%;
background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
}
`;

