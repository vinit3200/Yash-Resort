import React, { useState, useMemo, useEffect, useRef } from "react";
import gsap from "gsap";
import FadeIn from "./FadeIn";
import heroImage from "../assets/resort_img1.webp";
import roomImg1 from "../assets/Yash Resort Rooms/DSC_7756.jpg";
import roomImg2 from "../assets/Yash Resort Rooms/DSC_7737.jpg";
import roomImg3 from "../assets/Yash Resort Rooms/_ROB7290.jpg";
import roomImg4 from "../assets/Yash Resort Rooms/_ROB7257.jpg";
import roomImg5 from "../assets/Yash Resort Rooms/_ROB7239.jpg";
import roomImg6 from "../assets/Yash Resort Rooms/_ROB6659.jpg";
import roomImg7 from "../assets/Yash Resort Rooms/_ROB6614.jpg";
import roomImg8 from "../assets/Yash Resort Rooms/_ROB6608.jpg";
import roomImg9 from "../assets/Yash Resort Rooms/_ROB6557.jpg";
import roomImg10 from "../assets/Yash Resort Rooms/_ROB6452.jpg";
import roomImg11 from "../assets/Yash Resort Rooms/_ROB6422.jpg";
import roomImg12 from "../assets/Yash Resort Rooms/_ROB6406.jpg";
import roomImg13 from "../assets/Yash Resort Rooms/_ROB6345.jpg";
import roomImg14 from "../assets/Yash Resort Rooms/_ROB6252.jpg";
import roomImg15 from "../assets/Yash Resort Rooms/_ROB6193.jpg";
import roomImg16 from "../assets/Yash Resort Rooms/_ROB6084.jpg";
import dinningImg1 from "../assets/dinning1.webp";
import dinningImg2 from "../assets/dinning2.webp";
import dinningImg3 from "../assets/dinning3.webp";
import Nature1 from "../assets/forest_trail.png";
import Nature2 from "../assets/nature1.webp";
import Nature3 from "../assets/nature2.webp";
import ExecutiveImg1 from "../assets/executive_room1.webp";
import ExecutiveImg2 from "../assets/executive_room2.webp";
import Pool1 from "../assets/pool1.webp";
import Pool2 from "../assets/pool2.webp";
import Pool3 from "../assets/pool3.webp";


const CATEGORIES = ["All", "Rooms", "Dining", "Nature", "Events", "Other"];

const GALLERY_DATA = [
  { id: 1, src: roomImg1, alt: "Executive Suite", cat: "Rooms" },
  { id: 2, src: roomImg2, alt: "Classic Suite", cat: "Rooms" },
  { id: 3, src: roomImg3, alt: "Cottage Room", cat: "Rooms" },
  { id: 4, src: roomImg4, alt: "Spacious Balcony", cat: "Other" },
  { id: 5, src: roomImg5, alt: "Cottage Room", cat: "Rooms" },
  { id: 6, src: roomImg6, alt: "Meeting Hall", cat: "Other" },
  { id: 7, src: roomImg7, alt: "Outdoor Dining Area", cat: "Dining" },
  { id: 8, src: roomImg8, alt: "Family Gathering", cat: "Nature" },
  { id: 9, src: roomImg9, alt: "Resort Pool", cat: "Other" },
  { id: 10, src: roomImg10, alt: "Resort View", cat: "Nature" },
  { id: 11, src: roomImg11, alt: "Classic Room", cat: "Rooms" },
  { id: 12, src: roomImg12, alt: "Classic Room", cat: "Rooms" },
  { id: 13, src: roomImg13, alt: "Suite Room", cat: "Rooms" },
  { id: 14, src: roomImg14, alt: "Suite Balcony", cat: "Rooms" },
  { id: 15, src: roomImg15, alt: "Family Room", cat: "Rooms" },
  { id: 16, src: roomImg16, alt: "Frontdoor Dining Area", cat: "Dining" },
  { id: 17, src: dinningImg1, alt: "Indoor Dining Area", cat: "Dining" },
  { id: 18, src: dinningImg2, alt: "Indoor Dining Area", cat: "Dining" },
  { id: 19, src: dinningImg3, alt: "Indoor Dining Area", cat: "Dining" },
  { id: 20, src: Nature1, alt: "Forest Trail", cat: "Nature" },
  { id: 21, src: ExecutiveImg1, alt: "Executive Suite", cat: "Rooms" },
  { id: 22, src: ExecutiveImg2, alt: "Executive Suite", cat: "Rooms" },
  { id: 23, src: Nature2, alt: "Nature View", cat: "Nature" },
  { id: 24, src: Nature3, alt: "Nature View", cat: "Nature" },
  { id: 25, src: Pool1, alt: "Resort Pool", cat: "Other" },
  { id: 26, src: Pool2, alt: "Resort Pool", cat: "Other" },
  { id: 27, src: Pool3, alt: "Resort Pool", cat: "Other" },
];

const Gallery = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const gridRef = useRef(null);
  const shouldAnimateRef = useRef(false);

  const filtered = useMemo(() => {
    if (activeTab === "All") return GALLERY_DATA;
    return GALLERY_DATA.filter((item) => item.cat === activeTab);
  }, [activeTab]);

  // Animate grid items on filter change
  useEffect(() => {
    if (!gridRef.current) return;

    shouldAnimateRef.current = false;
    const items = gridRef.current.querySelectorAll(".gallery-item");
    
    // First, fade out and scale down
    gsap.to(items, {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      stagger: 0.12,
      onComplete: () => {
        shouldAnimateRef.current = true;
        // Animate items back in with stagger
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
  }, [activeTab]);

  return (
    <div className="bg-cream min-h-screen font-body">
      {/* ── HEADER ── */}
      <section className="relative h-[60vh] overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-40">
           <img src={heroImage} className="w-full h-full object-cover grayscale" alt="Background" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-gold text-[10px] tracking-[4px] uppercase mb-4">Visual Journey</p>
          <h1 className="font-serif text-white text-5xl md:text-7xl font-light">
            Our <span className="italic text-gold">Gallery</span>
          </h1>
        </div>
      </section>

      {/* ── FILTER TABS ── */}
      <section className="py-12 px-6 flex justify-center items-center gap-4 md:gap-8 flex-wrap border-b border-gold/10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`text-[12px] tracking-[3px] uppercase pb-2 transition-all duration-300 relative ${
              activeTab === cat ? "text-primary" : "text-mutedlight hover:text-gold"
            }`}
          >
            {cat}
            {activeTab === cat && (
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gold" />
            )}
          </button>
        ))}
      </section>

      {/* ── GRID ── */}
      <section className="py-20 px-6 lg:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={gridRef}>
            {filtered.map((item) => (
              <FadeIn key={item.id} className="gallery-item group relative aspect-[4/5] overflow-hidden cursor-pointer bg-primary rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100 filter group-hover:brightness-110"
                  onClick={() => setLightbox(item)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-gold text-[9px] tracking-[3px] uppercase mb-2 font-semibold">{item.cat}</p>
                    <h3 className="text-white font-serif text-xl italic">{item.alt}</h3>
                </div>
              </FadeIn>
            ))}
          </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div 
          className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-10 right-10 text-white hover:text-gold transition-colors">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <div className="max-w-5xl w-full flex flex-col items-center">
            <img src={lightbox.src} alt={lightbox.alt} className="max-h-[75vh] object-contain shadow-2xl mb-8" />
            <div className="text-center">
              <p className="text-gold text-[10px] uppercase tracking-[4px] mb-2">{lightbox.cat}</p>
              <h2 className="text-white font-serif text-2xl italic">{lightbox.alt}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
