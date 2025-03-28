import Banner from "@/Components/home_components/Bannar"; // Banner section for promotions or highlights
import HeroSection from "@/Components/home_components/Hero_section"; // Main hero section with key messages
import React from "react";
import SaleBanner from "@/Components/home_components/Company_features"; // Promotional banner for sales and offers
import Testimonial from "@/Components/home_components/Testimonial_component"; // Displays customer testimonials and reviews
import DiscountCards from "@/Components/home_components/discount_cards";
import NewArrivals from "@/Components/home_components/Popular_products";
import FeaturedProducts from "@/Components/home_components/featureProduct_components";
import PromoSection from "@/Components/home_components/promoSection";
import BestSellers from "@/Components/home_components/Featured_product";

const Home = () => {
  return (
    <>
      <HeroSection /> {/* Main landing section with visuals and CTA */}
      <Banner /> {/* Promotional banner */}
      <DiscountCards />
      <NewArrivals /> {/* Displays popular products */}
      <SaleBanner /> {/* Showcases current sales and promotions */}
      <FeaturedProducts />
      <PromoSection />
      <BestSellers />
      <Testimonial /> {/* Customer feedback and testimonials */}
    </>
  );
};

export default Home;
