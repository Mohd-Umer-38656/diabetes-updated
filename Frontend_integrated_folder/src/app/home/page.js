import Banner from "@/Components/home_components/Bannar"; // Importing the Banner component
import HeroSection from "@/Components/home_components/Hero_section"; // Importing the Hero Section component
import React from "react"; // Importing React for component rendering
import SaleBanner from "@/Components/home_components/Company_features"; // Importing Sale Banner component
import Testimonial from "@/Components/home_components/Testimonial_component"; // Importing Testimonial component
import DiscountCards from "@/Components/home_components/discount_cards";
import NewArrivals from "@/Components/home_components/Popular_products";
import FeaturedProducts from "@/Components/home_components/featureProduct_components";
import PromoSection from "@/Components/home_components/promoSection";
import BestSellers from "@/Components/home_components/Featured_product";

const Home = () => {
  return (
    <>
      <HeroSection /> {/* Hero section component */}
      <Banner /> {/* Main banner component */}
      <DiscountCards />
      <NewArrivals />
      <SaleBanner />
      <FeaturedProducts />
      <PromoSection />
      <BestSellers />
      <Testimonial />
    </>
  );
};

export default Home; // Exporting Home component as default
