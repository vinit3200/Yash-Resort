import React, { useState } from "react";
import FadeIn from "./FadeIn";
import heroImage from "../assets/resort_img1.webp";
import ClassicImage from "../assets/Yash Resort Rooms/_RoB6345.jpg";
import SuiteImage from "../assets/Yash Resort Rooms/_ROB6193.jpg";
import mapImage from "../assets/map.png";

const locations = {
  1: {
    name: "Umbrella Falls",
    description: "A beautiful waterfall known for its umbrella-shaped cascade. The falls are especially spectacular during monsoon season.",
    distance: "1.2 KM • 5 MIN",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/58/Umbrella_falls_bhandardara.jpg",
    coords: "19.5912,73.8432"
  },
  2: {
    name: "Arthur Lake",
    description: "A serene lake offering breathtaking views of the surrounding mountains. Popular for boating and peaceful walks.",
    distance: "2.5 KM • 8 MIN",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Bhandardara_lake.jpg",
    coords: "19.5833,73.8500"
  },
  3: {
    name: "Wilson Dam",
    description: "An historic dam built in 1910, offering spectacular views of the reservoir. One of the oldest dams in India.",
    distance: "3.8 KM • 12 MIN",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/26/Wilson_Dam_2025c.jpg",
    coords: "19.5769,73.8591"
  },
  4: {
    name: "Randha Falls",
    description: "A majestic waterfall with a height of about 170 feet. One of the highest waterfalls in Maharashtra.",
    distance: "5.5 KM • 18 MIN",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/22/Randha_falls.jpg",
    coords: "19.5544,73.8723"
  },
  5: {
    name: "Kalsubai Peak",
    description: "The highest peak in Maharashtra at 1,646 meters. A popular trekking destination offering panoramic views.",
    distance: "8.2 KM • 25 MIN",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Kalasubai_from_base.jpg",
    coords: "19.5239,73.8977"
  },
  6: {
    name: "Bhandardara Camping",
    description: "A scenic camping site near the lake with facilities for outdoor enthusiasts. Experience nature under starry skies.",
    distance: "2.0 KM • 7 MIN",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop",
    coords: "19.5880,73.8460"
  }
};

const resortCoords = "19.5950,73.8400";

const stats = [
  { num: "30", label: "Rooms" },
  { num: "4", label: "Room Types" },
  { num: "24/7", label: "Support" },
  { num: "5+", label: "Years" },
];
const values = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    ),
    title: "Warm Hospitality",
    desc: "We treat every guest like family, ensuring personalized service and genuine care throughout your stay.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    ),
    title: "Hygiene & Safety",
    desc: "Clean rooms, hygienic dining, 24/7 security, and power backup — we prioritize your well-being at every step.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
    ),
    title: "Nature & Serenity",
    desc: "Nestled in the peaceful hills of Bhandardara, our resort offers a refreshing escape surrounded by natural beauty.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
    ),
    title: "Quality Experience",
    desc: "From spacious rooms to multi-cuisine dining, every detail is crafted to deliver comfort and lasting memories.",
  },
];

const roomBreakdown = [
  { type: "Classic", count: 4, color: "bg-gold" },
  { type: "Executive", count: 10, color: "bg-gold" },
  { type: "Cottage / Villa", count: 12, color: "bg-gold" },
  { type: "Suite", count: 3, color: "bg-gold" },
];

const About = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapContainerRef = React.useRef(null);

  const openLocation = (id) => {
    setSelectedLocation(id);
  };

  const closeLocation = () => {
    setSelectedLocation(null);
  };

  const openDirections = (coords) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${resortCoords}&destination=${coords}&travelmode=driving`;
    window.open(url, '_blank');
  };
  return (
    <div className="font-body bg-cream text-primary">

      {/* ── PAGE HERO ── */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={heroImage}
          alt="Yash Resort Bhandardara"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <FadeIn className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <span className="text-white text-[10px] tracking-[5px] uppercase mb-4 block opacity-80">Since 2019</span>
            <h1 className="font-serif text-white text-5xl md:text-7xl font-light">
              Crafting <span className="italic text-gold">Memories</span>
            </h1>
          </div>
        </FadeIn>
      </section>

      {/* ── OUR STORY ── */}
      <section className="py-24 md:py-32 px-6 lg:px-20 max-w-[1280px] mx-auto">
        <FadeIn className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 lg:pr-12">
            <p className="text-gold uppercase tracking-[4px] text-[10px]">Our Story</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-primary leading-tight">
              A commitment to <br/>
              <span className="italic text-green1">excellent hospitality.</span>
            </h2>
            <div className="space-y-6 text-primary/70 font-light text-sm md:text-base leading-relaxed">
              <p>
                Yash Resort Bhandardara is designed to provide guests with a relaxing and enjoyable stay away from city noise. Our goal is to deliver excellent hospitality with personalized service, ensuring every guest feels comfortable and welcomed.
              </p>
              <p>
                Whether you are planning a family vacation, wedding function, corporate stay, or weekend getaway, Yash Resort offers spacious rooms, quality service, and memorable experiences for every guest.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gold/20 mt-8">
              {stats.map((s, idx) => (
                <div key={idx} className="relative group">
                  <span className="block font-serif text-4xl text-primary mb-2 transition-transform duration-500 group-hover:-translate-y-1">{s.num}</span>
                  <span className="text-[9px] uppercase tracking-[2px] text-gold font-medium">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <img src={SuiteImage} alt="About Interior" className="w-full aspect-square object-cover" />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white p-6 shadow-2xl hidden md:flex items-center justify-center text-center">
               <p className="text-[10px] tracking-[2px] uppercase text-primary font-medium">Bhandardara's Finest Retreat</p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-24 md:py-32 px-6 lg:px-20 bg-primary text-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        
        <FadeIn className="max-w-[1280px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-gold uppercase tracking-[4px] text-[10px] mb-4">Why Choose Us</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white">
              Our <span className="italic text-gold">Values</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="group p-8 border border-gold/10 hover:border-gold bg-white/5 hover:bg-white/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full border border-gold/20 flex items-center justify-center mx-auto mb-6 text-gold group-hover:bg-gold group-hover:text-primary transition-all duration-500">
                  {v.icon}
                </div>
                <h3 className="font-serif text-xl text-white mb-4 group-hover:text-gold transition-colors">{v.title}</h3>
                <div className="w-8 h-[1px] bg-gold/30 mb-4 group-hover:w-16 transition-all duration-500"></div>
                <p className="text-white/60 text-sm font-light leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── ROOM BREAKDOWN ── */}
      <section className="py-24 md:py-32 px-6 lg:px-20 max-w-[1280px] mx-auto bg-white">
        <FadeIn className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <div>
              <p className="text-gold uppercase tracking-[4px] text-[10px] mb-4">Accommodation</p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-primary">
                Room <span className="italic text-gold">Overview</span>
              </h2>
            </div>
            <p className="text-primary/70 font-light text-sm md:text-base leading-relaxed">
              With 30 thoughtfully designed rooms across 4 distinct categories, we offer the right accommodation for every type of guest — from cozy classic rooms for business travelers to luxurious suites for special celebrations.
            </p>

            {/* Room bars */}
            <div className="space-y-6 pt-6 border-t border-gold/20">
              {roomBreakdown.map((r, i) => (
                <div key={i} className="space-y-3 group">
                  <div className="flex justify-between text-[10px] uppercase tracking-[3px]">
                    <span className="text-primary font-bold group-hover:text-gold transition-colors">{r.type}</span>
                    <span className="text-primary/50">{r.count} rooms</span>
                  </div>
                  <div className="w-full h-[1px] bg-gold/10 overflow-hidden relative">
                    <div
                      className={`absolute top-0 left-0 h-full bg-gold transition-all duration-1000 origin-left`}
                      style={{ width: `${(r.count / 30) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 flex items-center gap-4">
              <span className="font-serif text-5xl text-gold">30</span>
              <div className="w-[1px] h-10 bg-gold/30"></div>
              <div>
                <span className="block text-[10px] uppercase tracking-[3px] text-primary font-bold mb-1">Total Rooms</span>
                <span className="block text-[9px] uppercase tracking-[2px] text-primary/50">Available for Guests</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <img
              src={ClassicImage}
              alt="Room Interior"
              className="w-full aspect-[4/5] object-cover shadow-2xl"
            />
            <div className="absolute inset-0 border border-gold/40 scale-95 translate-x-4 translate-y-4 pointer-events-none transition-transform duration-700 hover:translate-x-0 hover:translate-y-0"></div>
          </div>
        </FadeIn>
      </section>

      {/* ── TEAM / MISSION STRIP ── */}
      <section className="relative overflow-hidden">
        <img
          src={heroImage}
          alt="Yash Resort View"
          className="w-full h-[50vh] object-cover"
        />
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
          <FadeIn className="max-w-3xl text-center pt-10 px-6">
            <p className="text-gold text-[10px] tracking-[5px] uppercase mb-6">Our Mission</p>
            <blockquote className="font-serif text-white text-2xl md:text-4xl font-light italic leading-relaxed">
              "To provide every guest with a peaceful, comfortable, and memorable experience — blending nature's tranquility with warm, personalized hospitality."
            </blockquote>
            <div className="w-12 h-[0.5px] bg-gold/60 mx-auto mt-8" />
            <p className="text-white/50 text-[10px] tracking-[3px] uppercase mt-6">Yash Resort Bhandardara</p>
          </FadeIn>
        </div>
      </section>

      {/* ── LOCATION / REACH US ── */}
      <section className="py-24 md:py-32 px-6 lg:px-20 bg-cream">
        <FadeIn className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold uppercase tracking-[4px] text-[10px] mb-4">Find Us</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-primary">
              Reach <span className="italic text-gold">Yash Resort</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
            {/* Address */}
            <div className="p-10 border border-gold/20 bg-white hover:border-gold hover:shadow-2xl transition-all duration-500 group flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-6 text-gold group-hover:bg-gold group-hover:text-white transition-all duration-500">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <h3 className="font-serif text-2xl text-primary mb-3 group-hover:text-gold transition-colors">Address</h3>
              <div className="w-8 h-[1px] bg-gold/30 mb-4 group-hover:w-16 transition-all duration-500"></div>
              <p className="text-primary/70 text-sm font-light leading-relaxed">
                Yash Resort, Bhandardara,<br />
                Ahmednagar, Maharashtra,<br />
                India
              </p>
            </div>

            {/* Phone */}
            <div className="p-10 border border-gold/20 bg-white hover:border-gold hover:shadow-2xl transition-all duration-500 group flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-6 text-gold group-hover:bg-gold group-hover:text-white transition-all duration-500">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <h3 className="font-serif text-2xl text-primary mb-3 group-hover:text-gold transition-colors">Contact</h3>
              <div className="w-8 h-[1px] bg-gold/30 mb-4 group-hover:w-16 transition-all duration-500"></div>
              <p className="text-primary/70 text-sm font-light leading-relaxed">
                +91 98765 43210<br />
                +91 12345 67890
              </p>
            </div>

            {/* Email */}
            <div className="p-10 border border-gold/20 bg-white hover:border-gold hover:shadow-2xl transition-all duration-500 group flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-6 text-gold group-hover:bg-gold group-hover:text-white transition-all duration-500">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <h3 className="font-serif text-2xl text-primary mb-3 group-hover:text-gold transition-colors">Email</h3>
              <div className="w-8 h-[1px] bg-gold/30 mb-4 group-hover:w-16 transition-all duration-500"></div>
              <p className="text-primary/70 text-sm font-light leading-relaxed">
                info@yashresort.com<br />
                booking@yashresort.com
              </p>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="mt-10 relative">
            <div className="relative w-full overflow-hidden rounded-lg shadow-lg bg-cream" ref={mapContainerRef}>
              <img src={mapImage} alt="Yash Resort Location Map" className="w-full h-auto" />
              
              {/* Yash Resort Label - Center of map */}
              <div className="absolute top-[60%] left-[62%] transform -translate-x-1/2 -translate-y-1/2 bg-white/95 px-4 py-2 rounded-lg shadow-lg text-center z-10">
                <h3 className="font-serif text-primary font-semibold text-sm">Yash Resort</h3>
                <p className="text-gold text-[10px] uppercase tracking-wider">Bhandardara</p>
              </div>

              {/* Location Pins - Positions based on actual map locations */}
              {[1, 2, 3, 4, 5, 6].map((id) => (
                <button
                  key={id}
                  onClick={() => openLocation(id)}
                  className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-transform hover:scale-110 z-20"
                  style={{
                    left: id === 1 ? '41%' : id === 2 ? '80%' : id === 3 ? '79%' : id === 4 ? '38%' : id === 5 ? '60%' : '81%',
                    top: id === 1 ? '41%' : id === 2 ? '57%' : id === 3 ? '37%' : id === 4 ? '62%' : id === 5 ? '28%' : '75%',
                    animation: `bounce-pulse 2s ease-in-out infinite`,
                    animationDelay: `${id * 0.15}s`
                  }}
                >
                  <svg width="44" height="56" viewBox="0 0 44 56" className="drop-shadow-lg">
                    <defs>
                      <linearGradient id={`pinGradient${id}`} x1="22" y1="0" x2="22" y2="56">
                        <stop offset="0%" stopColor="#D4AF37"/>
                        <stop offset="100%" stopColor="#1B4332"/>
                      </linearGradient>
                    </defs>
                    <path d="M22 0C9.85 0 0 9.85 0 22c0 17 22 34 22 34s22-17 22-34C44 9.85 34.15 0 22 0z" fill={`url(#pinGradient${id})`}/>
                    <circle cx="22" cy="28" r="11" fill="#1B4332" stroke="#D4AF37" strokeWidth="2"/>
                    <text x="22" y="32" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">0{id}</text>
                  </svg>
                </button>
              ))}
            </div>

{/* Sliding Panel */}
            {selectedLocation && (
              <div className="absolute inset-0 z-40">
                <div 
                  className="absolute inset-0 bg-black/30"
                  onClick={closeLocation}
                />
                <div className="absolute top-0 right-0 w-full max-w-sm h-full bg-gradient-to-br from-cream to-white shadow-2xl transform transition-transform duration-500 overflow-y-auto">
                  <button 
                    onClick={closeLocation}
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl text-primary hover:rotate-90 transition-transform z-10"
                  >
                    ×
                  </button>
                  
                  <img 
                    src={locations[selectedLocation].image} 
                    alt={locations[selectedLocation].name}
                    className="w-full h-56 object-cover"
                  />
                  
                  <div className="p-6">
                    <span className="text-gold text-xs tracking-[3px] uppercase mb-2 block">
                      0{selectedLocation}
                    </span>
                    <h3 className="font-serif text-2xl text-primary mb-4">
                      {locations[selectedLocation].name}
                    </h3>
                    <p className="text-mutedlight text-sm leading-relaxed mb-6">
                      {locations[selectedLocation].description}
                    </p>
                    
                    <div className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full w-fit mb-6">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                      <span className="text-xs">{locations[selectedLocation].distance}</span>
                    </div>
                    
                    <button 
                      onClick={() => openDirections(locations[selectedLocation].coords)}
                      className="w-full bg-gradient-to-r from-gold to-yellow-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:translate-y-[-2px] transition-all"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </FadeIn>
      </section>
    </div>
    );
  };

export default About;
