import React from 'react';

import Homeherosection from '../components/Home/Herosection';

// import FeaturedProducts from "../components/Home/FeaturedProducts"
import FeatureStrip from "../components/About/FeatureStrip"
import StatsSection from "../components/Home/StatsSection"
import BrandMarquee from "../components/Home/BrandMarquee"
import HowItWorks from "../components/Home/HowItWorks"
import CompanyHighlights from "../components/Home/CompanyHighlights"
// import PopularProducts from "../components/Home/PopularProducts"
import Animation3D from "../components/About/GarmentManufacturingSuite"
import TrendingProducts from "../components/products/TrendingProducts";
import Animations3D from "../components/Home/Animations3D"

export default function Home() {
  return (
    <>
 
      <Homeherosection />
      <Animations3D />
       <CompanyHighlights />
       <FeatureStrip/>
       {/* <PopularProducts/> */}
       <TrendingProducts/>
       <StatsSection />
       
     
     
      {/* <FeaturedProducts/> */}
      
      <HowItWorks />
      <Animation3D/>
      <BrandMarquee />
      
    </>
  );
}