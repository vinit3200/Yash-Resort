import React from "react";
import Hero from "./Home/Hero";
import AboutSection from "./Home/AboutSection";
import RoomCategories from "./Home/RoomCategories";
import DiningSection from "./Home/DiningSection";
import EventsSection from "./Home/EventsSection";
import NatureSection from "./Home/NatureSection";
import AmenitiesSection from "./Home/AmenitiesSection";
import TestimonialsSection from "./Home/TestimonialsSection";
import HomeGallery from "./Home/HomeGallery";

const YashResort = () => {
  return (
    <div className="font-body bg-cream text-primary selection:bg-gold/30">
      <Hero />
      <AboutSection />
      <RoomCategories />
      <DiningSection />
      <EventsSection />
      <NatureSection />
      <AmenitiesSection />
      <TestimonialsSection />
      <HomeGallery />
    </div>
  );
};

export default YashResort;
