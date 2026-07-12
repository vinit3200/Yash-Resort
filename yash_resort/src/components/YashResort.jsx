import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import FadeIn from "./FadeIn";
import BookingFormModal from "./BookingFormModal";
import heroImage from "../assets/resort_img1.webp";
import ClassicImage from "../assets/Yash Resort Rooms/_RoB6345.jpg";
import ExecutiveImage from "../assets/Yash Resort Rooms/DSC_7737.jpg";
import CottageImage from "../assets/Yash Resort Rooms/_ROB7239.jpg";
import SuiteImage from "../assets/Yash Resort Rooms/_ROB6193.jpg";
import Piecefull_suiteImage from "../assets/piecefull_suit.webp";
import Forest from "../assets/Yash Resort Rooms/_ROB6452.jpg";
import PoolImg from "../assets/Yash Resort Rooms/_ROB6557.jpg";
import ParkingImg from "../assets/parking.png";
import ForestImg from "../assets/forest_trail.png";
import NightEventImg from "../assets/nightEvent.png";
import DinningImg from "../assets/Yash Resort Rooms/_ROB6084.jpg";
import DinningImg1 from "../assets/dinning1.webp";
import DinningImg2 from "../assets/dinning2.webp";
import DinningImg3 from "../assets/dinning3.webp";
import room1 from "../assets/executive_room1.webp";
import room2 from "../assets/executive_room2.webp";
import room3 from "../assets/Yash Resort Rooms/_ROB7290.jpg";
import nature1 from "../assets/Yash Resort Rooms/_ROB6608.jpg";
import nature2 from "../assets/Yash Resort Rooms/_ROB6614.jpg";
import nature3 from "../assets/nature1.webp";
import nature4 from "../assets/nature2.webp";
import enterance from "../assets/entrance.png";
import natures_path from "../assets/natures_path.png";
const YashResort = () => {
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState({ type: "Classic", name: "" });

  const openBooking = (type = "Classic", name = "") => {
    setSelectedRoom({ type, name });
    setIsBookingOpen(true);
  };

  return (
    <div className="font-body bg-cream text-primary selection:bg-gold/30">
      <BookingFormModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)}
        initialRoomType={selectedRoom.type}
        initialRoomName={selectedRoom.name}
      />
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Yash Resort Lake View"
            className="w-full h-full object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite]"
          />
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60"></div>
        </div>
        <FadeIn className="relative z-10 flex flex-col justify-end items-center h-full text-center px-6 pb-20">
          <span className="text-white text-[10px] tracking-[4px] uppercase mb-6 drop-shadow-md">
            Yash Resort Bhandardara
          </span>
          <h1 className="font-serif text-white text-6xl md:text-8xl font-light mb-8 drop-shadow-lg leading-none">
            Serenity <br /> <span className="italic text-gold">Meets Comfort</span>
          </h1>

          <div className="flex flex-col md:flex-row gap-6 mt-8">
            {/* <button 
              onClick={() => openBooking()}
              className="bg-gold text-white px-10 py-4 text-[10px] tracking-[4px] uppercase font-medium hover:bg-white hover:text-gold transition-all duration-300 shadow-xl"
            >
              Book Now
            </button> */}
            <Link to="about" className="group flex flex-col items-center gap-2 transition-all hover:gap-5 md:mt-0 mt-8">
              <span className="text-white text-[10px] tracking-[4px] uppercase">Explore More</span>
              <div className="w-[1px] h-12 bg-gold/50 group-hover:bg-gold transition-colors duration-500"></div>
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* 2. ABOUT CAREFULLY CURATED */}
      <section id="about" className="py-24 md:py-32 px-6 lg:px-20 max-w-[1280px] mx-auto">
        <FadeIn className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1 flex justify-center">
            <div className="relative w-full max-w-sm">
               <img src={Piecefull_suiteImage} alt="About Us" className="w-full h-auto aspect-[3/4] object-cover shadow-2xl" />
               <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-green1 rounded-full flex items-center justify-center text-white text-center p-4 border border-gold/30">
                 <div>
                   <span className="block font-serif text-3xl">30</span>
                   <span className="text-[9px] uppercase tracking-[2px]">Rooms</span>
                 </div>
               </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <p className="text-gold uppercase tracking-[4px] text-[10px]">Welcome</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-primary leading-tight">
              A peaceful retreat in <br className="hidden md:block"/>
              <span className="italic">Bhandardara.</span>
            </h2>
            <div className="space-y-6 text-mutedlight font-light text-sm md:text-base leading-relaxed">
              <p>
                Located in the peaceful surroundings of Bhandardara, our resort combines modern amenities with a calm and refreshing atmosphere. Designed to provide guests with a relaxing and enjoyable stay away from city noise. 
              </p>
              <p>
                Our goal is to deliver excellent hospitality with personalized service, ensuring every guest feels comfortable and welcomed. With modern infrastructure and attentive staff, we make every stay memorable — whether short or long.
              </p>
            </div>
            
            <div className="pt-8">
               <Link to="rooms" className="inline-flex items-center justify-center px-8 py-3 rounded-full border-[0.5px] border-gold text-gold hover:bg-gold hover:text-white hover:shadow-xl transition-all duration-300 text-[10px] tracking-[4px] uppercase">
                 Immerse Deeply
               </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 3. ROOM CATEGORIES (Ashoka Card Grid Style) */}
      <section id="rooms" className="py-24 md:py-32 px-6 lg:px-20 bg-primary text-white">
        <FadeIn className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold uppercase tracking-[4px] text-[10px] mb-4">Accommodation</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-white">
              Stay in <span className="italic">Comfort</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Classic Room Card */}
            <div className="group relative overflow-hidden bg-cream cursor-pointer border border-transparent hover:border-gold/30 hover:shadow-2xl transition-all duration-500 flex flex-col">
              <div className="relative aspect-square overflow-hidden shrink-0">
                <div className="absolute top-4 left-4 z-10 bg-green1 text-white text-[9px] uppercase tracking-[2px] px-3 py-1 drop-shadow-md">
                  Deluxe
                </div>
                <img src={ClassicImage} alt="Classic Room" className="w-full h-full object-cover transition-transform duration-[0.8s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500"></div>
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <button 
                    onClick={() => navigate("/rooms/1")}
                    className="group/btn relative overflow-hidden bg-white text-green1 px-6 py-3 shadow-xl active:scale-[0.97] transition-all duration-300 cursor-pointer rounded-md border-none"
                  >
                    <span className="absolute inset-x-0 inset-y-[-0.25em] bg-gradient-to-t from-black/30 via-transparent to-transparent z-0 rounded-md"></span>
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold w-0 h-0 transition-all duration-500 ease-out group-hover/btn:w-[14em] group-hover/btn:h-[14em] z-10"></span>
                    <span className="relative z-20 text-[10px] tracking-[4px] uppercase font-medium group-hover/btn:text-white transition-colors duration-300 top-[-1px]">
                      View Details
                    </span>
                  </button>
                </div>
              </div>
              <div className="p-6 xl:p-8 flex-1 flex flex-col">
                <h3 className="font-serif text-2xl text-primary mb-2">Classic Room</h3>
                <p className="text-[9px] tracking-[1px] uppercase text-gold mb-4">Couples / Business</p>
                <div className="flex flex-col gap-2 text-xs font-light text-mutedlight mb-6 flex-1">
                  <span>✔ Comfortable Bed</span>
                  <span>✔ Fast Wi-Fi</span>
                  <span>✔ Air Conditioning</span>
                </div>
                <div className="mt-auto">
                  <div className="w-full h-[1px] bg-gold/20 mb-6"></div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-[10px] tracking-[4px] uppercase text-gold group-hover:gap-3 transition-all duration-300">
                      <Link to="/rooms/1" className="hover:text-gold/80">
                        Details
                      </Link>
                      <span>→</span>
                    </div>
                    <button 
                      onClick={() => openBooking("Classic", "Classic Room")}
                      className="text-[10px] tracking-[4px] uppercase text-white bg-gold px-4 py-2 hover:bg-primary transition-colors"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Executive Room Card */}
            <div className="group relative overflow-hidden bg-cream cursor-pointer border border-transparent hover:border-gold/30 hover:shadow-2xl transition-all duration-500 flex flex-col">
              <div className="relative aspect-square overflow-hidden shrink-0">
                <div className="absolute top-4 left-4 z-10 bg-green1 text-white text-[9px] uppercase tracking-[2px] px-3 py-1 drop-shadow-md">
                  Premium
                </div>
                <img src={ExecutiveImage} alt="Executive Room" className="w-full h-full object-cover transition-transform duration-[0.8s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500"></div>
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <button 
                    onClick={() => navigate("/rooms/2")}
                    className="group/btn relative overflow-hidden bg-white text-green1 px-6 py-3 shadow-xl active:scale-[0.97] transition-all duration-300 cursor-pointer rounded-md border-none"
                  >
                    <span className="absolute inset-x-0 inset-y-[-0.25em] bg-gradient-to-t from-black/30 via-transparent to-transparent z-0 rounded-md"></span>
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold w-0 h-0 transition-all duration-500 ease-out group-hover/btn:w-[14em] group-hover/btn:h-[14em] z-10"></span>
                    <span className="relative z-20 text-[10px] tracking-[4px] uppercase font-medium group-hover/btn:text-white transition-colors duration-300 top-[-1px]">
                      View Details
                    </span>
                  </button>
                </div>
              </div>
              <div className="p-6 xl:p-8 flex-1 flex flex-col">
                <h3 className="font-serif text-2xl text-primary mb-2">Executive Room</h3>
                <p className="text-[9px] tracking-[1px] uppercase text-gold mb-4">Families & Premium</p>
                <div className="flex flex-col gap-2 text-xs font-light text-mutedlight mb-6 flex-1">
                  <span>✔ Spacious Layout</span>
                  <span>✔ Smart LED TV</span>
                  <span>✔ Tea & Coffee Maker</span>
                </div>
                <div className="mt-auto">
                  <div className="w-full h-[1px] bg-gold/20 mb-6"></div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-[10px] tracking-[4px] uppercase text-gold group-hover:gap-3 transition-all duration-300">
                      <Link to="/rooms/2" className="hover:text-gold/80">
                        Details
                      </Link>
                      <span>→</span>
                    </div>
                    <button 
                      onClick={() => openBooking("Executive", "Executive Room")}
                      className="text-[10px] tracking-[4px] uppercase text-white bg-gold px-4 py-2 hover:bg-primary transition-colors"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Family Room Card */}
            <div className="group relative overflow-hidden bg-cream cursor-pointer border border-transparent hover:border-gold/30 hover:shadow-2xl transition-all duration-500 flex flex-col">
              <div className="relative aspect-square overflow-hidden shrink-0">
                <div className="absolute top-4 left-4 z-10 bg-green1 text-white text-[9px] uppercase tracking-[2px] px-3 py-1 drop-shadow-md">
                  Extra Space
                </div>
                <img src={CottageImage} alt="Family Room" className="w-full h-full object-cover transition-transform duration-[0.8s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500"></div>
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <button 
                    onClick={() => navigate("/rooms/3")}
                    className="group/btn relative overflow-hidden bg-white text-green1 px-6 py-3 shadow-xl active:scale-[0.97] transition-all duration-300 cursor-pointer rounded-md border-none"
                  >
                    <span className="absolute inset-x-0 inset-y-[-0.25em] bg-gradient-to-t from-black/30 via-transparent to-transparent z-0 rounded-md"></span>
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold w-0 h-0 transition-all duration-500 ease-out group-hover/btn:w-[14em] group-hover/btn:h-[14em] z-10"></span>
                    <span className="relative z-20 text-[10px] tracking-[4px] uppercase font-medium group-hover/btn:text-white transition-colors duration-300 top-[-1px]">
                      View Details
                    </span>
                  </button>
                </div>
              </div>
              <div className="p-6 xl:p-8 flex-1 flex flex-col">
                <h3 className="font-serif text-2xl text-primary mb-2">Family Room</h3>
                <p className="text-[9px] tracking-[1px] uppercase text-gold mb-4">Families & Groups</p>
                <div className="flex flex-col gap-2 text-xs font-light text-mutedlight mb-6 flex-1">
                  <span>✔ Multiple Beds</span>
                  <span>✔ Extra Seating</span>
                  <span>✔ Large Floor Plan</span>
                </div>
                <div className="mt-auto">
                  <div className="w-full h-[1px] bg-gold/20 mb-6"></div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-[10px] tracking-[4px] uppercase text-gold group-hover:gap-3 transition-all duration-300">
                      <Link to="/rooms/3" className="hover:text-gold/80">
                        Details
                      </Link>
                      <span>→</span>
                    </div>
                    <button 
                      onClick={() => openBooking("Cottage/Villa", "Family Room")}
                      className="text-[10px] tracking-[4px] uppercase text-white bg-gold px-4 py-2 hover:bg-primary transition-colors"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Suite Room Card */}
            <div className="group relative overflow-hidden bg-cream cursor-pointer border border-transparent hover:border-gold/30 hover:shadow-2xl transition-all duration-500 flex flex-col">
              <div className="relative aspect-square overflow-hidden shrink-0">
                <div className="absolute top-4 left-4 z-10 bg-green1 text-white text-[9px] uppercase tracking-[2px] px-3 py-1 drop-shadow-md">
                  Exclusive
                </div>
                <img src={SuiteImage} alt="Suite Room" className="w-full h-full object-cover transition-transform duration-[0.8s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500"></div>
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <button 
                    onClick={() => navigate("/rooms/4")}
                    className="group/btn relative overflow-hidden bg-white text-green1 px-6 py-3 shadow-xl active:scale-[0.97] transition-all duration-300 cursor-pointer rounded-md border-none"
                  >
                    <span className="absolute inset-x-0 inset-y-[-0.25em] bg-gradient-to-t from-black/30 via-transparent to-transparent z-0 rounded-md"></span>
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold w-0 h-0 transition-all duration-500 ease-out group-hover/btn:w-[14em] group-hover/btn:h-[14em] z-10"></span>
                    <span className="relative z-20 text-[10px] tracking-[4px] uppercase font-medium group-hover/btn:text-white transition-colors duration-300 top-[-1px]">
                      View Details
                    </span>
                  </button>
                </div>
              </div>
              <div className="p-6 xl:p-8 flex-1 flex flex-col">
                <h3 className="font-serif text-2xl text-primary mb-2">Suite Room</h3>
                <p className="text-[9px] tracking-[1px] uppercase text-gold mb-4">Luxury & Occasions</p>
                <div className="flex flex-col gap-2 text-xs font-light text-mutedlight mb-6 flex-1">
                  <span>✔ Separate Living Area</span>
                  <span>✔ King Size Bed</span>
                  <span>✔ Premium Interiors</span>
                </div>
                <div className="mt-auto">
                  <div className="w-full h-[1px] bg-gold/20 mb-6"></div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-[10px] tracking-[4px] uppercase text-gold group-hover:gap-3 transition-all duration-300">
                      <Link to="/rooms/4" className="hover:text-gold/80">
                        Details
                      </Link>
                      <span>→</span>
                    </div>
                    <button 
                      onClick={() => openBooking("Suite", "Suite Room")}
                      className="text-[10px] tracking-[4px] uppercase text-white bg-gold px-4 py-2 hover:bg-primary transition-colors"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link to="rooms" className="inline-block border-b border-gold text-[10px] tracking-[4px] uppercase text-gold hover:text-white transition-colors pb-1">
              View All Categories
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* 4. DINING SECTION */}
      <section id="dining" className="py-24 md:py-32 px-6 lg:px-20 max-w-[1280px] mx-auto border-t border-gold/10">
        <FadeIn className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-gold uppercase tracking-[4px] text-[10px] mb-4">Dining</p>
            <h3 className="font-serif text-4xl md:text-5xl text-primary font-light mb-6">Multi-Cuisine <span className="italic text-green1">Excellence</span></h3>
            <p className="text-mutedlight font-light text-sm md:text-base leading-relaxed mb-8">
              Multi-cuisine dining with fresh & hygienic meals prepared by our experienced culinary team.
            </p>
            <p className="text-mutedlight font-light text-sm md:text-base leading-relaxed mb-10">
              From traditional Indian delicacies to continental favorites, every dish is crafted with premium ingredients and utmost care for hygiene and taste.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="border border-primary/20 text-primary text-[10px] px-4 py-2 uppercase tracking-[2px] hover:border-gold/50 transition-colors">Breakfast</span>
              <span className="border border-primary/20 text-primary text-[10px] px-4 py-2 uppercase tracking-[2px] hover:border-gold/50 transition-colors">Lunch & Dinner</span>
              <span className="border border-primary/20 text-primary text-[10px] px-4 py-2 uppercase tracking-[2px] hover:border-gold/50 transition-colors">Family Dining</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg shadow-2xl h-96">
            <img 
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop" 
              alt="Dining Experience" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
        </FadeIn>
      </section>

      {/* 5. EVENTS SECTION */}
      <section id="events" className="py-24 md:py-32 px-6 lg:px-20 border-t border-gold/10">
        <FadeIn className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="relative overflow-hidden rounded-lg shadow-2xl h-96 lg:h-[500px] order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop" 
                alt="Events & Celebrations" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
                <div className="text-white">
                  <span className="text-gold text-[10px] uppercase tracking-[3px] block mb-2">Celebrate Here</span>
                  <h3 className="text-3xl font-serif font-light">Unforgettable Moments</h3>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-gold uppercase tracking-[4px] text-[10px] mb-4">Events</p>
              <h3 className="font-serif text-4xl md:text-5xl text-primary font-light mb-8">Plan Your <span className="italic text-green1">Celebration</span></h3>
              
              <div className="space-y-6 mb-12">
                <div className="flex gap-4 items-start group">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all flex-shrink-0 mt-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/><path d="M12 9v2m0 4v2"/><circle cx="5" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><path d="m3.51 4.51 1.42 1.42M19.07 19.07l1.41 1.41"/></svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-serif text-primary mb-2">Weddings</h4>
                    <p className="text-mutedlight font-light text-sm">Destination wedding venue with elegant spaces and complete event management support.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start group">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all flex-shrink-0 mt-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-serif text-primary mb-2">Birthday Parties</h4>
                    <p className="text-mutedlight font-light text-sm">Create memorable celebrations with our customized party packages and catering services.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start group">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all flex-shrink-0 mt-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-serif text-primary mb-2">Corporate Events</h4>
                    <p className="text-mutedlight font-light text-sm">Ideal for conferences, offsites, and team building with modern facilities and support.</p>
                  </div>
                </div>
              </div>

              <Link to="contact" className="inline-block bg-gold text-white px-10 py-4 text-[10px] tracking-[4px] uppercase font-medium hover:bg-green1 transition-colors duration-300 rounded-none shadow-lg hover:shadow-xl">
                Plan Your Event
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 6. RETREAT HIGHLIGHTS - SURROUNDINGS COLLAGE */}
      <section className="py-24 md:py-32 px-6 lg:px-20 bg-primary text-white border-t border-gold/10">
        <FadeIn className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold uppercase tracking-[4px] text-[10px] mb-4">Scenic Surroundings</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-white">
              Nature's <span className="italic">Embrace</span>
            </h2>
          </div>

          {/* Collage Grid - 3x3 with 7 Images */}
          <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
            {/* Image 1 - Top Left (2 Columns) */}
            <div className="col-span-2 group relative overflow-hidden rounded-lg shadow-2xl cursor-pointer">
              <img
                src={Forest}
                alt="Forest Trail"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-500"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-gold text-[10px] tracking-[3px] uppercase font-medium">Forest Trail</span>
                <p className="text-white/90 text-xs mt-1">Explore nature</p>
              </div>
            </div>

            {/* Image 2 - Top Middle */}
            <div className="group relative overflow-hidden rounded-lg shadow-2xl cursor-pointer">
              <img
                src={enterance}
                alt="Resort Entrance"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-500"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-gold text-[10px] tracking-[3px] uppercase font-medium">Resort Entrance</span>
                <p className="text-white/90 text-xs mt-1">Welcome to Paradise</p>
              </div>
            </div>

            {/* Image 3 - Top Right */}
            <div className="group relative overflow-hidden rounded-lg shadow-2xl cursor-pointer">
              <img
                src={ForestImg}
                alt="Woodland Path"
                className="w-full h-full brightness-150 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-500"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-gold text-[10px] tracking-[3px] uppercase font-medium">Nature's Path</span>
                <p className="text-white/90 text-xs mt-1">Forest trails</p>
              </div>
            </div>

            {/* Image 4 - Middle Left */}
            <div className="group relative overflow-hidden rounded-lg shadow-2xl cursor-pointer">
              <img
                src={NightEventImg}
                alt="Golden Hour"
                className="w-full h-full brightness-150 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-500"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-gold text-[10px] tracking-[3px] uppercase font-medium">Night Events</span>
                <p className="text-white/90 text-xs mt-1">Family Gathering</p>
              </div>
            </div>

            {/* Image 5 - Middle Center */}
            <div className="group relative overflow-hidden rounded-lg shadow-2xl cursor-pointer">
              <img
                src={natures_path}
                alt="Mountain Vista"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-500"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-gold text-[10px] tracking-[3px] uppercase font-medium">Nature's Path</span>
                <p className="text-white/90 text-xs mt-1">Walk in the nature</p>
              </div>
            </div>

            {/* Image 6 - Middle Right */}
            <div className="group relative overflow-hidden rounded-lg shadow-2xl cursor-pointer">
              <img
                src={ParkingImg}
                alt="Nature Details"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-500"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-gold text-[10px] tracking-[3px] uppercase font-medium">Parking</span>
                <p className="text-white/90 text-xs mt-1">Arrive with Ease</p>
              </div>
            </div>

            {/* Image 7 - Bottom Left/Center (Spanning 2 Columns) */}
            <div className="col-span-2 group relative overflow-hidden rounded-lg shadow-2xl cursor-pointer">
              <img
                src={PoolImg}
                alt="Panoramic Landscape"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-500"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-gold text-[10px] tracking-[3px] uppercase font-medium">The Pool</span>
                <p className="text-white/90 text-xs mt-1">A Quiet Escape by the Pool</p>
              </div>
            </div>
          </div>

          {/* Description Callout */}
          {/* <div className="mt-16 p-8 md:p-12 border border-gold/30 hover:border-gold transition-colors duration-300 bg-white/5 backdrop-blur-xs rounded-lg">
            <p className="text-white/80 font-light text-sm md:text-base leading-relaxed text-center max-w-3xl mx-auto">
              Nestled in the heart of Bhandardara, Yash Resort is surrounded by breathtaking natural beauty. From lush gardens and peaceful riverside walks to panoramic mountain views, every corner of our property offers a unique connection with nature. Discover the serene surroundings that make your stay truly unforgettable.
            </p>
          </div> */}
        </FadeIn>
      </section>

      {/* 7. HOTEL AMENITIES */}
      <section className="bg-dark text-white py-24 md:py-32 px-6 border-t border-gold/10">
        <FadeIn className="max-w-[1280px] mx-auto text-center">
          <p className="text-gold uppercase tracking-[4px] text-[10px] mb-4">Facilities</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-white mb-16">
            Signature <span className="italic text-gold">Amenities</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6">
            <div className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 rounded-full border border-gold/20 flex items-center justify-center text-gold group-hover:scale-110 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
              </div>
              <span className="text-[10px] font-medium text-white/90 uppercase tracking-[2px]">Ample Parking</span>
            </div>

            <div className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 rounded-full border border-gold/20 flex items-center justify-center text-gold group-hover:scale-110 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <span className="text-[10px] font-medium text-white/90 uppercase tracking-[2px]">24/7 Security</span>
            </div>

            <div className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 rounded-full border border-gold/20 flex items-center justify-center text-gold group-hover:scale-110 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <span className="text-[10px] font-medium text-white/90 uppercase tracking-[2px]">Power Backup</span>
            </div>

            <div className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 rounded-full border border-gold/20 flex items-center justify-center text-gold group-hover:scale-110 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
              </div>
              <span className="text-[10px] font-medium text-white/90 uppercase tracking-[2px]">Room Service</span>
            </div>

            <div className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 rounded-full border border-gold/20 flex items-center justify-center text-gold group-hover:scale-110 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>
              </div>
              <span className="text-[10px] font-medium text-white/90 uppercase tracking-[2px]">Housekeeping</span>
            </div>

            <div className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 rounded-full border border-gold/20 flex items-center justify-center text-gold group-hover:scale-110 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
              </div>
              <span className="text-[10px] font-medium text-white/90 uppercase tracking-[2px]">Garden Area</span>
            </div>
            
            <div className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 rounded-full border border-gold/20 flex items-center justify-center text-gold group-hover:scale-110 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <span className="text-[10px] font-medium text-white/90 uppercase tracking-[2px]">Clean & Hygienic</span>
            </div>

            <div className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 rounded-full border border-gold/20 flex items-center justify-center text-gold group-hover:scale-110 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
              </div>
              <span className="text-[10px] font-medium text-white/90 uppercase tracking-[2px]">Travel Assistance</span>
            </div>

          </div>
        </FadeIn>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-24 md:py-32 bg-cream overflow-hidden">
        <FadeIn className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <p className="text-gold uppercase tracking-[4px] text-[10px] mb-4">Guest Reviews</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-primary">
                Stories from our <br /> <span className="italic">Beloved Guests</span>
              </h2>
            </div>
            <div className="flex gap-4">
               {/* Minimal navigation dots or stars could go here */}
            </div>
          </div>

          <TestimonialsMarquee />
        </FadeIn>
      </section>

      {/* 9. GALLERY SECTION */}
      <GallerySection />

    </div>
  );
};

/* ── Testimonials Data ── */
const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Couples Stay",
    text: "The serenity of Bhandardara combined with Yash Resort's hospitality was magical. The room view of the lake is something we won't forget.",
    stars: 5
  },
  {
    name: "Amit Varma",
    role: "Family Vacation",
    text: "Perfect place for a weekend getaway. The multi-cuisine food is excellent and the staff goes out of their way to help.",
    stars: 5
  },
  {
    name: "Sneha Patil",
    role: "Corporate Event",
    text: "Best venue in Bhandardara for events. We hosted our company offsite here and the facilities were top-notch. Highly recommended.",
    stars: 5
  },
  {
    name: "Priya Kumar",
    role: "Honeymoon",
    text: "An absolute paradise for honeymooners! The peaceful atmosphere, coupled with excellent service, made our trip unforgettable.",
    stars: 5
  },
  {
    name: "Vivek Singh",
    role: "Business Travel",
    text: "Great facilities and high-speed internet made it perfect for our work retreat. The staff was very accommodating with our needs.",
    stars: 5
  },
  {
    name: "Anjali Desai",
    role: "Group Getaway",
    text: "Organized a friends' trip here and everyone was amazed! The garden area is beautiful and the rooms are spacious and clean.",
    stars: 5
  },
  {
    name: "Raj Patel",
    role: "Birthday Celebration",
    text: "They arranged a wonderful birthday celebration for my wife. Every detail was attended to with care and professionalism.",
    stars: 5
  },
  {
    name: "Meera Nair",
    role: "Wellness Retreat",
    text: "The peaceful environment is perfect for rejuvenation. I felt completely relaxed during my stay here. Highly recommend!",
    stars: 5
  },
  {
    name: "Arjun Bhatt",
    role: "Adventure Trip",
    text: "A great base for exploring Bhandardara. The staff provided excellent local insights and recommendations for activities.",
    stars: 5
  },
  {
    name: "Isha Thakur",
    role: "Family Reunion",
    text: "Perfect for large gatherings. The multi-cuisine restaurant catered wonderfully to all our family members' preferences.",
    stars: 5
  }
];

/* ── Gallery Data ── */
const galleryItems = [
  // Rooms
  { id: 1, cat: "rooms", src: room1, alt: "Luxury Room" },
  { id: 2, cat: "rooms", src: room2, alt: "Executive Bedroom" },
  { id: 3, cat: "rooms", src: room3, alt: "Classic Room" },
  { id: 4, cat: "rooms", src: SuiteImage, alt: "Suite Room" },
  // Restaurant
  { id: 5, cat: "dinning", src: DinningImg, alt: "Outdoor Dinning" },
  { id: 6, cat: "dinning", src: DinningImg1, alt: "Indoor Dinning" },
  { id: 7, cat: "dinning", src: DinningImg2, alt: "Dinning with Nature" },
  { id: 8, cat: "dinning", src: DinningImg3, alt: "Dinning Area" },
  // Events
  { id: 9,  cat: "nature", src: nature1, alt: "Family fun in Garden" },
  { id: 10, cat: "nature", src: nature2, alt: "Dinner in Garden" },
  { id: 11, cat: "nature", src: nature3, alt: "Balcony View" },
  { id: 12, cat: "nature", src: nature4, alt: "Garden Area" },
];

const FILTERS = [
  { key: "all", label: "All" },
  { key: "rooms", label: "Rooms" },
  { key: "dinning", label: "Dining" },
  { key: "nature", label: "Nature" },
];

/* ── Testimonials Marquee Component ── */
function TestimonialsMarquee() {
  const marqueeRef = React.useRef(null);
  const animationRef = React.useRef(null);

  React.useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;
    const scrollWidth = marquee.scrollWidth;

    // Animate the marquee smoothly
    const animation = gsap.to(marquee, {
      x: -scrollWidth,
      duration: scrollWidth / 50,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % scrollWidth)
      }
    });

    animationRef.current = animation;

    return () => {
      gsap.killTweensOf(marquee);
    };
  }, []);

  const handleHoverStart = () => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
  };

  const handleHoverEnd = () => {
    if (animationRef.current) {
      animationRef.current.resume();
    }
  };

  return (
    <div 
      className="w-full overflow-hidden relative -mx-6 px-6 py-8 bg-gradient-to-r from-cream via-cream to-cream cursor-pointer"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {/* Fade overlays for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none"></div>

      <div className="flex gap-8" ref={marqueeRef}>
        {/* Render testimonials twice for seamless loop */}
        {[...testimonials, ...testimonials].map((t, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-96 p-8 border border-gold/20 hover:border-gold/50 transition-all duration-500 bg-white shadow-sm rounded-lg"
          >
            <div className="flex gap-1 mb-6">
              {[...Array(t.stars)].map((_, idx) => (
                <svg key={idx} width="12" height="12" viewBox="0 0 24 24" fill="#D4AF37">
                  <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.169-7.334-3.856-7.334 3.856 1.4-8.169-5.934-5.787 8.2-1.192z"/>
                </svg>
              ))}
            </div>
            <p className="font-serif text-base italic text-primary/80 mb-6 leading-relaxed min-h-16">
              "{t.text}"
            </p>
            <div className="pt-4 border-t border-gold/10">
              <h4 className="font-serif text-lg text-primary font-light">{t.name}</h4>
              <p className="text-gold text-[9px] uppercase tracking-[3px] mt-1">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


function GallerySection() {
  const [active, setActive] = useState("all");
  const [lightbox, setLightbox] = useState(null); // index into visible array
  const gridRef = React.useRef(null);

  const visible = active === "all" ? galleryItems : galleryItems.filter(i => i.cat === active);

  const openLightbox = (idx) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox(i => (i - 1 + visible.length) % visible.length);
  const next = () => setLightbox(i => (i + 1) % visible.length);

  // Animate gallery items on filter change
  React.useEffect(() => {
    if (!gridRef.current) return;

    const items = gridRef.current.querySelectorAll(".gallery-image-item");
    
    // Fade out and scale down
    gsap.to(items, {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      stagger: 0.12,
      onComplete: () => {
        // Fade in and scale up with bounce
        gsap.fromTo(
          items,
          { opacity: 0, scale: 0.8, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.0,
            stagger: 0.15,
            ease: "back.out",
          }
        );
      },
    });
  }, [active]);

  // Close on backdrop click
  const handleBackdropClick = (e) => { if (e.target === e.currentTarget) closeLightbox(); };

  // Keyboard navigation
  React.useEffect(() => {
    if (lightbox === null) return;
    const len = visible.length;
    const handler = (e) => {
      if (e.key === "ArrowRight") setLightbox(i => (i + 1) % len);
      if (e.key === "ArrowLeft")  setLightbox(i => (i - 1 + len) % len);
      if (e.key === "Escape")     setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, visible.length]);

  const current = lightbox !== null ? visible[lightbox] : null;

  return (
    <section id="gallery" className="py-24 md:py-32 px-6 lg:px-20 bg-cream border-t border-gold/10">
      <FadeIn className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gold uppercase tracking-[4px] text-[10px] mb-4">Visual Stories</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-primary">
            Our <span className="italic">Gallery</span>
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center justify-evenly gap-6 flex-wrap mb-4">
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => { setActive(f.key); setLightbox(null); }}
              className="relative flex flex-col items-center gap-1 group/filter"
            >
              <span className={`text-[12px] tracking-[3px] uppercase transition-all duration-300 ${
                active === f.key ? "text-primary font-medium" : "text-primary/40 hover:text-primary/80"
              }`}>
                {f.label}
              </span>
              {/* Active dot */}
              <span className={`w-1 h-1 mb-12 rounded-full bg-gold transition-all duration-300 ${
                active === f.key ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`} />
            </button>
          ))}
        </div>

        {/* Image Count
        <p className="text-center text-[10px] text-primary/40 tracking-[2px] uppercase mb-12">
          Showing {visible.length} of {galleryItems.length} moments
        </p> */}

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4" ref={gridRef}>
          {visible.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="gallery-image-item group relative overflow-hidden break-inside-avoid cursor-pointer rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110 filter group-hover:brightness-110"
                loading="lazy"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/0 group-hover:opacity-100 opacity-0 transition-all duration-500 flex flex-col items-center justify-center gap-2">
                <span className="text-gold text-[9px] tracking-[4px] uppercase translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400 delay-75 font-medium">
                  {item.cat}
                </span>
                <span className="text-white font-serif italic text-lg translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400 delay-100">
                  {item.alt}
                </span>
                <div className="w-8 h-[0.5px] bg-gold/60 translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400 delay-150" />
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* ── LIGHTBOX ── */}
      {current && (
        <div
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center"
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white w-10 h-10 flex items-center justify-center border border-white/20 hover:border-gold hover:rotate-90 transition-all duration-300 z-10"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 1l12 12M13 1L1 13"/>
            </svg>
          </button>

          {/* Counter */}
          {/* <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/40 text-[10px] tracking-[3px] uppercase">
            {lightbox + 1} / {visible.length}
          </div> */}

          {/* Prev Arrow */}
          <button
            onClick={prev}
            className="absolute left-6 text-white/60 hover:text-white w-12 h-12 flex items-center justify-center border border-white/10 hover:border-gold transition-all duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          {/* Image */}
          <div className="flex flex-col items-center max-w-4xl w-full px-20">
            <img
              src={current.src}
              alt={current.alt}
              className="max-h-[75vh] w-auto object-contain shadow-2xl"
            />
            {/* Caption */}
            <div className="mt-6 text-center">
              <p className="text-gold text-[9px] tracking-[4px] uppercase mb-2">{current.cat}</p>
              <p className="text-white font-serif italic text-xl">{current.alt}</p>
            </div>
          </div>

          {/* Next Arrow */}
          <button
            onClick={next}
            className="absolute right-6 text-white/60 hover:text-white w-12 h-12 flex items-center justify-center border border-white/10 hover:border-gold transition-all duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}

export default YashResort;
