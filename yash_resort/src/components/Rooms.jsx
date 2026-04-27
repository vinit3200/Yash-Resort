import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import FadeIn from "./FadeIn";
import BookingFormModal from "./BookingFormModal";
import heroImage from "../assets/resort_img1.webp";
import ClassicImage from "../assets/Yash Resort Rooms/_RoB6345.jpg";
import ExecutiveImage from "../assets/executive_room1.webp";
import CottageImage from "../assets/Yash Resort Rooms/_ROB7239.jpg";
import SuiteImage from "../assets/Yash Resort Rooms/_ROB6193.jpg"; 
import roomsData from "../assets/rooms.json";
import { getAmenityIconComponent } from "../utils/amenityIcons";

// Map image names to actual imports
const imageMap = {
  ClassicImage,
  ExecutiveImage,
  CottageImage,
  SuiteImage
};

// Process rooms data to map image references to actual images
const ROOMS_DATA = roomsData.rooms.map(room => ({
  ...room,
  image: imageMap[room.image],
  gallery: room.gallery.map(img => imageMap[img])
}));

const CATEGORIES = ["All", "Classic", "Executive", "Cottage", "Suite"];

const mapRoomToFormType = (room) => {
  const roomMeta = `${room?.category ?? ""} ${room?.name ?? ""}`.toLowerCase();

  if (roomMeta.includes("suite")) {
    return "Suite";
  }

  if (roomMeta.includes("villa") || roomMeta.includes("cottage")) {
    return "Cottage / Villa";
  }

  if (roomMeta.includes("deluxe") || roomMeta.includes("executive")) {
    return "Executive";
  }

  return "Classic";
};

const Rooms = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingDefaults, setBookingDefaults] = useState({
    roomType: "Standard",
    roomName: ""
  });

  // Group rooms by category
  const roomsByCategory = useMemo(() => {
    const grouped = {
      Classic: [],
      Executive: [],
      Cottage: [],
      Suite: []
    };
    
    ROOMS_DATA.forEach(room => {
      if (room.category in grouped) {
        grouped[room.category].push(room);
      }
    });
    
    return grouped;
  }, []);

  const openBookingModal = (room) => {
    setBookingDefaults({
      roomType: mapRoomToFormType(room),
      roomName: room?.name ?? ""
    });
    setIsBookingOpen(true);
  };

  return (
    <div className="font-body bg-cream text-primary relative">
      <style>{`
        @keyframes pop-up-btn {
          0%, 85%, 100% { transform: scale(1); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
          92% { transform: scale(1.15); box-shadow: 0 15px 30px -5px rgba(197, 160, 89, 0.5); }
        }
        .animate-popup-btn {
          animation: pop-up-btn 2s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
      {/* ── PAGE HERO ── */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={heroImage}
          alt="Rooms at Yash Resort"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <FadeIn className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <span className="text-white text-[10px] tracking-[5px] uppercase mb-4 block opacity-80">Accommodation</span>
            <h1 className="font-serif text-white text-5xl md:text-7xl font-light">
              Choose Your <span className="italic text-gold">Perfect Stay</span>
            </h1>
            <p className="text-white/85 font-light text-sm md:text-base leading-relaxed mt-6 max-w-2xl mx-auto">
              Discover our thoughtfully designed rooms and villas in Bhandardara. Each space is crafted for elegance, spaciousness, and refined comfort.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── FILTER TABS ── */}
      <section className="sticky top-0 z-30 bg-white border-b border-gold/10 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 py-4">
          <div className="flex gap-6 justify-center overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 text-[10px] uppercase tracking-[4px] whitespace-nowrap transition-all duration-500 rounded-sm ${
                  activeCategory === cat 
                    ? "bg-primary text-white" 
                    : "bg-transparent text-primary hover:text-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTIONS BASED ON ACTIVE CATEGORY ── */}
      <div className="py-12">
        {[
          (activeCategory === "All" || activeCategory === "Classic") && {
            title: "Classic Rooms",
            subtitle: "Comfort & Simplicity",
            rooms: roomsByCategory.Classic,
            description: "Cozy and well-appointed rooms, perfect for couples and business travelers",
            variant: "default"
          },
          (activeCategory === "All" || activeCategory === "Executive") && {
            title: "Executive Rooms",
            subtitle: "Spacious & Premium",
            rooms: roomsByCategory.Executive,
            description: "Spacious rooms with upgraded amenities, ideal for families and discerning guests",
            variant: "default"
          },
          (activeCategory === "All" || activeCategory === "Cottage") && {
            title: "Cottage & Villas",
            subtitle: "Private Sanctuaries",
            rooms: roomsByCategory.Cottage,
            description: "Peaceful, private stay surrounded by nature in our prestigious cottage-style accommodations",
            variant: "premium"
          },
          (activeCategory === "All" || activeCategory === "Suite") && {
            title: "Luxury Suites",
            subtitle: "The Ultimate Indulgence",
            rooms: roomsByCategory.Suite,
            description: "Unparalleled elegance and comfort with exclusive suites designed for special occasions",
            variant: "luxury"
          }
        ]
          .filter(Boolean)
          .map((section, index, arr) => (
            <RoomsSection
              key={section.title}
              title={section.title}
              subtitle={section.subtitle}
              rooms={section.rooms}
              description={section.description}
              variant={section.variant}
              cardsOnLeft={index % 2 === 1}
              onBookNow={openBookingModal}
              isLast={index === arr.length - 1}
            />
          ))}
      </div>

      {/* ── BOOKING POLICIES SECTION ── */}
      <section className="py-24 md:py-32 px-6 lg:px-20 bg-primary text-white">
        <FadeIn className="max-w-[1280px] mx-auto text-center">
          <div className="mb-16">
            <p className="text-gold uppercase tracking-[4px] text-[10px] mb-4">Important Information</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light">
              Stay <span className="italic text-gold">Guidelines</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto text-left">
            <div className="p-8 border border-gold/10 hover:border-gold/30 transition-all duration-500 bg-white/5">
              <h4 className="font-serif text-2xl text-gold mb-4">Check-in & Check-out</h4>
              <p className="text-white/70 text-sm font-light leading-relaxed">
                Check-in time is from 2:00 PM. Early arrivals are subject to availability. Check-out time is by 11:00 AM.
              </p>
            </div>
            <div className="p-8 border border-gold/10 hover:border-gold/30 transition-all duration-500 bg-white/5">
              <h4 className="font-serif text-2xl text-gold mb-4">Cancellation Policy</h4>
              <p className="text-white/70 text-sm font-light leading-relaxed">
                Free cancellation up to 48 hours before the scheduled check-in. Terms and conditions apply based on the booking rate.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {isBookingOpen ? (
        <BookingFormModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          initialRoomType={bookingDefaults.roomType}
          initialRoomName={bookingDefaults.roomName}
        />
      ) : null}
    </div>
  );
};

/* ── CLEAN ROOM CARD COMPONENT ── */
function RoomCard({ room, isPremium, isLuxury, onBookNow }) {
  return (
    <div className="group relative overflow-hidden bg-white cursor-pointer border border-gold/40 hover:border-gold hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
      <div className="relative aspect-[6/3] overflow-hidden shrink-0">
        {(isLuxury || isPremium) && (
          <div className="absolute top-4 left-4 z-10 bg-green1 text-white text-[9px] uppercase tracking-[2px] px-3 py-1 drop-shadow-md">
            {isLuxury ? "Luxury" : "Premium"}
          </div>
        )}
        <div className="absolute top-4 right-4 z-10 bg-white text-primary text-[10px] uppercase tracking-[2px] px-3 py-1 drop-shadow-md shadow-lg">
          <span className="font-bold">₹{room.price}</span> / night
        </div>
        
        <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-[0.8s] group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500"></div>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Link 
            to={`/rooms/${room.id}`}
            className="group/btn relative overflow-hidden bg-white text-green1 px-4 py-2 shadow-xl active:scale-[0.97] transition-all duration-300 cursor-pointer rounded-md border-none"
          >
            <span className="absolute inset-x-0 inset-y-[-0.25em] bg-gradient-to-t from-black/30 via-transparent to-transparent z-0 rounded-md"></span>
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold w-0 h-0 transition-all duration-500 ease-out group-hover/btn:w-[14em] group-hover/btn:h-[14em] z-10"></span>
            <span className="relative z-20 text-[10px] tracking-[4px] uppercase font-medium group-hover/btn:text-white transition-colors duration-300 top-[-1px]">
              View Details
            </span>
          </Link>
        </div>
      </div>
      <div className="p-6 xl:p-8 flex-1 flex flex-col">
        <h3 className="font-serif text-2xl text-primary mb-2">{room.name}</h3>
        <p classNme="text-[9px] tracking-[1px] uppercase text-gold mb-4">{room.idealFor}</p>
        <p className="text-sm font-light text-mutedlight mb-6 line-clamp-3">
          {room.description}
        </p>

        {/* Specs */}
        <div className="flex gap-6 mb-6">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span className="text-xs text-primary/80 font-light">{room.capacity}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            </svg>
            <span className="text-xs text-primary/80 font-light">{room.size}</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-6 flex-1 content-start">
          {room.amenities.slice(0, 3).map((amenity, idx) => {
            const AmenityIcon = getAmenityIconComponent(amenity);
            return (
              <div key={idx} className="flex items-center gap-2 border border-gold/20 px-3 py-1 text-[10px] tracking-[1px] uppercase text-primary/70">
                <AmenityIcon className="w-3 h-3 text-gold" />
                {amenity}
              </div>
            );
          })}
        </div>

        <div className="mt-auto">
          <div className="w-full h-[1px] bg-gold/20 mb-6"></div>
          <div className="flex items-center justify-between">
            <p className="text-[9px] uppercase tracking-[2px] text-primary/50">
              Only {room.totalRooms} available
            </p>
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onBookNow?.(room); }}
              className="animate-popup-btn bg-gold text-white font-bold text-[10px] tracking-[3px] uppercase px-6 py-3 shadow-md hover:bg-green1 transition-colors flex items-center gap-2"
            >
              Book Now <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── CLEAN ROOMS SECTION COMPONENT ── */
function RoomsSection({
  title,
  subtitle,
  rooms,
  description,
  variant = "default",
  cardsOnLeft = true,
  onBookNow
}) {
  if (rooms.length === 0) return null;

  const bgClass = variant === "luxury" ? "bg-white" : variant === "premium" ? "bg-cream" : "bg-white";

  return (
    <section className={`py-16 md:py-24 px-6 lg:px-20 ${bgClass}`}>
      <FadeIn className="w-[90%] lg:w-[80%] max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          <div className={`flex flex-col justify-center w-full ${cardsOnLeft ? "order-1 lg:order-2 lg:pl-12" : "order-1 lg:order-1 lg:pr-12"}`}>
            <p className="text-gold uppercase tracking-[4px] text-[10px] mb-4">{subtitle}</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary font-light mb-6">
              {title}
            </h2>
            <p className="text-mutedlight font-light text-sm leading-relaxed w-full">
              {description}
            </p>
          </div>

          <div className={`${cardsOnLeft ? "order-2 lg:order-1" : "order-2 lg:order-2"} w-full`}>
            <div className={`grid gap-6 w-full ${rooms.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
              {rooms.map((room) => (
                <RoomCard 
                  key={room.id}
                  room={room} 
                  isPremium={variant === "premium"} 
                  isLuxury={variant === "luxury"}
                  onBookNow={onBookNow}
                />
              ))}
            </div>
          </div>

        </div>
      </FadeIn>
    </section>
  );
}

export default Rooms;

