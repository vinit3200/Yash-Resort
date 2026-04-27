import React, { useState } from 'react';
import gsap from 'gsap';
import SuiteImage from '../../assets/Yash Resort Rooms/_ROB6193.jpg';
import DinningImg from '../../assets/Yash Resort Rooms/_ROB6084.jpg';
import room1 from '../../assets/executive_room1.webp';
import room2 from '../../assets/executive_room2.webp';
import room3 from '../../assets/Yash Resort Rooms/_ROB7290.jpg';
import nature1 from '../../assets/nature1.webp';
import nature2 from '../../assets/nature2.webp';
import nature3 from '../../assets/Yash Resort Rooms/_ROB6608.jpg';
import nature4 from '../../assets/Yash Resort Rooms/_ROB6614.jpg';

const galleryItems = [
  { id: 1, cat: "rooms", src: room1, alt: "Luxury Room" },
  { id: 2, cat: "rooms", src: room2, alt: "Executive Bedroom" },
  { id: 3, cat: "rooms", src: room3, alt: "Classic Room" },
  { id: 4, cat: "rooms", src: SuiteImage, alt: "Suite Room" },
  { id: 5, cat: "dinning", src: DinningImg, alt: "Outdoor Dining" },
  { id: 9,  cat: "nature", src: nature1, alt: "Garden View" },
  { id: 10, cat: "nature", src: nature2, alt: "Evening Nature" },
  { id: 11, cat: "nature", src: nature3, alt: "Lush Greenery" },
  { id: 12, cat: "nature", src: nature4, alt: "Resort Landscape" },
];

const FILTERS = [
  { key: "all", label: "All" },
  { key: "rooms", label: "Rooms" },
  { key: "dinning", label: "Dining" },
  { key: "nature", label: "Nature" },
];

const HomeGallery = () => {
  const [active, setActive] = useState("all");
  const gridRef = React.useRef(null);

  const visible = active === "all" ? galleryItems : galleryItems.filter(i => i.cat === active);

  React.useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll(".gallery-item");
    gsap.fromTo(items, 
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );
  }, [active]);

  return (
    <section className="py-24 md:py-32 px-6 lg:px-20 max-w-[1280px] mx-auto">
      <div className="text-center mb-12">
        <p className="text-gold uppercase tracking-[4px] text-[10px] mb-4">Gallery</p>
        <h2 className="font-serif text-4xl md:text-5xl font-light text-primary mb-8">Visual <span className="italic">Journey</span></h2>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`text-[10px] tracking-[4px] uppercase pb-2 border-b-2 transition-all duration-300 ${active === f.key ? 'border-gold text-primary' : 'border-transparent text-mutedlight hover:text-primary'}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visible.map((item) => (
          <div key={item.id} className="gallery-item relative aspect-square overflow-hidden rounded-sm group cursor-pointer">
            <img src={item.src} alt={item.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeGallery;
