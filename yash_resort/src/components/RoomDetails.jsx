import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import FadeIn from "./FadeIn";
import BookingFormModal from "./BookingFormModal";
import heroImage from "../assets/resort_img1.webp";
import ClassicImage from "../assets/Yash Resort Rooms/_ROB6345.jpg";
import ClassicImage1 from "../assets/Yash Resort Rooms/_ROB6406.jpg";
import ClassicImage2 from "../assets/Yash Resort Rooms/_ROB6422.jpg";
import ExecutiveImage from "../assets/executive_room1.webp";
import ExecutiveImage1 from "../assets/executive_room2.webp";
import ExecutiveImage2 from "../assets/executive_room3.webp";
import CottageImage from "../assets/Yash Resort Rooms/_ROB7239.jpg";
import CottageImage1 from "../assets/Yash Resort Rooms/_ROB7257.jpg";
import CottageImage2 from "../assets/Yash Resort Rooms/_ROB7290.jpg";

import SuiteImage from "../assets/Yash Resort Rooms/_ROB6193.jpg";
import SuiteImage1 from "../assets/Yash Resort Rooms/_ROB6252.jpg";
// import SuiteImage2 from "../assets/Yash Resort Rooms/_ROB6235.jpg"; 
import roomsData from "../assets/rooms.json";
import { getAmenityIconComponent } from "../utils/amenityIcons";
import { 
  Users, 
  Maximize2, 
  Crown, 
  Bed, 
  Leaf, 
  Wifi, 
  Wind, 
  Droplets,
  Tv,
  Coffee,
  Lock,
  Waves,
  Armchair,
  ChefHat,
  Trees,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Map image names to actual imports
const imageMap = {  
  ClassicImage,
  ClassicImage1,
  ClassicImage2,
  ExecutiveImage,
  ExecutiveImage1,
  ExecutiveImage2,
  CottageImage,
  CottageImage1,
  CottageImage2,
  SuiteImage,
  SuiteImage1
};

// Map icon names to actual icon components
const iconMap = {
  users: Users,
  maximize2: Maximize2,
  crown: Crown,
  bed: Bed,
  leaf: Leaf,
  wifi: Wifi,
  wind: Wind,
  droplets: Droplets,
  tv: Tv,
  coffee: Coffee,
  lock: Lock,
  waves: Waves,
  armchair: Armchair,
  chefhat: ChefHat,
  trees: Trees
};

// Process rooms data to map image and icon references
const ROOMS_DATA = (roomsData.rooms ?? []).map((room) => {
  const mappedImage = imageMap[room.image] ?? heroImage;
  const gallerySource =
    Array.isArray(room.gallery) && room.gallery.length > 0
      ? room.gallery
      : [room.image];
  const mappedGallery = gallerySource
    .map((img) => imageMap[img] ?? mappedImage)
    .filter(Boolean);

  const baseAmenities = Array.isArray(room.amenities) ? room.amenities : [];
  const fullAmenitiesSource =
    Array.isArray(room.fullAmenities) && room.fullAmenities.length > 0
      ? room.fullAmenities
      : baseAmenities.map((amenity) => ({
          name: amenity,
          description: "Included with your stay"
        }));

  const mappedFullAmenities = fullAmenitiesSource.map((amenity) => {
    const normalizedAmenity =
      typeof amenity === "string" ? { name: amenity } : amenity || {};
    const iconKey =
      typeof normalizedAmenity.icon === "string"
        ? normalizedAmenity.icon.toLowerCase()
        : "";
    const inferredIcon = getAmenityIconComponent(normalizedAmenity.name, Bed);

    return {
      ...normalizedAmenity,
      name: normalizedAmenity.name ?? "Amenity",
      description: normalizedAmenity.description ?? "Included with your stay",
      iconComponent: iconMap[iconKey] ?? inferredIcon
    };
  });

  return {
    ...room,
    image: mappedImage,
    gallery: mappedGallery.length > 0 ? mappedGallery : [mappedImage],
    amenities: baseAmenities,
    fullAmenities: mappedFullAmenities
  };
});

const mapRoomToFormType = (room) => {
  const roomMeta = `${room?.category ?? ""} ${room?.name ?? ""}`.toLowerCase();

  if (roomMeta.includes("suite")) {
    return "Suite";
  }

  if (roomMeta.includes("villa") || roomMeta.includes("cottage")) {
    return "Cottage/Villa";
  }

  if (roomMeta.includes("deluxe") || roomMeta.includes("executive")) {
    return "Executive";
  }

  return "Classic";
};

const RoomDetails = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const room = ROOMS_DATA.find(r => r.id === parseInt(roomId));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <h2 className="font-serif text-3xl text-primary mb-4">Room Not Found</h2>
          <p className="text-mutedlight mb-8">The room you're looking for doesn't exist.</p>
          <Link to="/rooms" className="inline-block px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300 uppercase text-[10px] tracking-[4px]">
            Back to Rooms
          </Link>
        </div>
      </div>
    );
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.gallery.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + room.gallery.length) % room.gallery.length);
  };

  return (
    <div className="bg-cream font-body">
      {/* ── HERO WITH GALLERY ── */}
      <section className="relative bg-primary overflow-hidden">
        <div className="relative h-[70vh] md:h-screen w-full flex items-center justify-center">
          <FadeIn className="relative w-full h-full">
            {/* Main Image Carousel */}
            <div className="relative w-full h-full overflow-hidden">
              {room.gallery.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    idx === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${room.name} - ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/20"></div>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm"
              >
                <ChevronRight size={24} />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white text-[12px]">
                {currentImageIndex + 1} / {room.gallery.length}
              </div>

              {/* Thumbnail Dots */}
              <div className="absolute bottom-6 right-6 z-10 flex gap-2">
                {room.gallery.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex ? "bg-gold w-8" : "bg-white/50 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Room Title Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-5">
              <p className="text-gold text-[10px] tracking-[4px] uppercase mb-4">Luxury Accommodation</p>
              <h1 className="font-serif text-white text-5xl md:text-6xl font-light mb-4">{room.name}</h1>
              <p className="text-white/80 text-lg">{room.category} Room</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── ROOM OVERVIEW ── */}
      <section className="py-16 md:py-24 px-6 lg:px-20 max-w-[1280px] mx-auto">
        <FadeIn className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div>
              <h2 className="font-serif text-3xl text-primary mb-4">Overview</h2>
              <p className="text-mutedlight font-light text-base leading-relaxed mb-6">
                {room.description}
              </p>
              <div className="h-[1px] bg-gold/20 my-8"></div>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="font-serif text-2xl text-primary mb-6">Room Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center p-6 border border-gold/10 hover:border-gold/30 rounded-lg transition-all duration-300">
                  <div className="flex justify-center mb-3">
                    <Users className="w-8 h-8 text-gold" />
                  </div>
                  <p className="text-primary font-serif text-lg">{room.capacity}</p>
                  <p className="text-mutedlight text-[10px] tracking-[2px] uppercase mt-1">Capacity</p>
                </div>
                <div className="text-center p-6 border border-gold/10 hover:border-gold/30 rounded-lg transition-all duration-300">
                  <div className="flex justify-center mb-3">
                    <Maximize2 className="w-8 h-8 text-gold" />
                  </div>
                  <p className="text-primary font-serif text-lg">{room.size}</p>
                  <p className="text-mutedlight text-[10px] tracking-[2px] uppercase mt-1">Room Size</p>
                </div>
                <div className="text-center p-6 border border-gold/10 hover:border-gold/30 rounded-lg transition-all duration-300">
                  <div className="flex justify-center mb-3">
                    <Crown className="w-8 h-8 text-gold" />
                  </div>
                  <p className="text-primary font-serif text-lg">{room.category}</p>
                  <p className="text-mutedlight text-[10px] tracking-[2px] uppercase mt-1">Category</p>
                </div>
              </div>
            </div>

            {/* Full Amenities */}
            <div>
              <h3 className="font-serif text-2xl text-primary mb-6">Complete Amenities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {room.fullAmenities.map((amenity, idx) => (
                  <div key={idx} className="p-4 border border-gold/10 hover:border-gold/30 transition-all duration-300 rounded-lg hover:shadow-lg bg-white/70">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-b from-gold/20 to-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                        <amenity.iconComponent className="w-7 h-7 text-gold" strokeWidth={1.9} />
                      </div>
                      <div>
                        <h4 className="font-serif text-primary mb-1 font-light">{amenity.name}</h4>
                        <p className="text-mutedlight text-sm font-light">{amenity.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <FadeIn className="sticky top-24 p-8 border border-gold/20 bg-white shadow-lg rounded-lg">
              <div className="mb-8">
                <p className="text-mutedlight text-[10px] tracking-[2px] uppercase mb-2">Per Night</p>
                <h3 className="font-serif text-4xl text-primary">₹{room.price}</h3>
              </div>

              <div className="space-y-3 mb-8">
                {room.amenities.map((amenity, idx) => {
                  const AmenityIcon = getAmenityIconComponent(amenity);

                  return (
                    <div key={`${amenity}-${idx}`} className="flex items-center gap-3 rounded-lg border border-gold/15 bg-cream px-3 py-2.5">
                      <span className="w-9 h-9 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold flex-shrink-0">
                        <AmenityIcon className="w-4 h-4" strokeWidth={1.9} />
                      </span>
                      <span className="text-primary text-sm font-light">{amenity}</span>
                    </div>
                  );
                })}
              </div>

              <div className="h-[1px] bg-gold/20 mb-8"></div>

              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full bg-gold hover:bg-gold/90 text-white py-3 px-6 rounded-lg font-medium uppercase text-[10px] tracking-[3px] transition-all duration-300 mb-4"
              >
                Book Now
              </button>

              <button
                onClick={() => navigate("/rooms")}
                className="w-full border border-primary text-primary hover:bg-primary hover:text-white py-3 px-6 rounded-lg font-medium uppercase text-[10px] tracking-[3px] transition-all duration-300"
              >
                Back to Rooms
              </button>
            </FadeIn>
          </div>
        </FadeIn>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="bg-primary text-white py-16 md:py-24 px-6 lg:px-20 text-center">
        <FadeIn className="max-w-2xl mx-auto">
          <p className="text-gold uppercase tracking-[4px] text-[10px] mb-4">Ready to Experience Luxury?</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-8">
            Reserve Your <span className="italic">Perfect Stay</span>
          </h2>
          <p className="text-white/80 mb-8 text-base leading-relaxed">
            Book your stay at Yash Resort and experience the ultimate in comfort and hospitality in the serene surroundings of Bhandardara.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-gold hover:bg-gold/90 text-white px-12 py-4 text-[10px] tracking-[3px] uppercase font-medium transition-all duration-300 rounded-lg"
          >
            Book Your Room
          </Link>
        </FadeIn>
      </section>

      {isBookingOpen ? (
        <BookingFormModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          initialRoomType={mapRoomToFormType(room)}
          initialRoomName={room.name}
        />
      ) : null}
    </div>
  );
};

export default RoomDetails;
