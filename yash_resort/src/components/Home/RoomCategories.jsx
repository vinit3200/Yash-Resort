import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FadeIn from '../FadeIn';
import ClassicImage from '../../assets/Yash Resort Rooms/_RoB6345.jpg';
import ExecutiveImage from '../../assets/Yash Resort Rooms/DSC_7737.jpg';
import CottageImage from '../../assets/Yash Resort Rooms/_ROB7239.jpg';
import SuiteImage from '../../assets/Yash Resort Rooms/_ROB6193.jpg';

const RoomCard = ({ id, type, tag, image, perks }) => {
  const navigate = useNavigate();
  return (
    <div className="group relative overflow-hidden bg-cream cursor-pointer border border-transparent hover:border-gold/30 hover:shadow-2xl transition-all duration-500 flex flex-col">
      <div className="relative aspect-square overflow-hidden shrink-0">
        <div className="absolute top-4 left-4 z-10 bg-green1 text-white text-[9px] uppercase tracking-[2px] px-3 py-1 drop-shadow-md">
          {tag}
        </div>
        <img src={image} alt={type} className="w-full h-full object-cover transition-transform duration-[0.8s] group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500"></div>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <button 
            onClick={() => navigate(`/rooms/${id}`)}
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
        <h3 className="font-serif text-2xl text-primary mb-2">{type}</h3>
        <p className="text-[9px] tracking-[1px] uppercase text-gold mb-4">{tag} Selection</p>
        <div className="flex flex-col gap-2 text-xs font-light text-mutedlight mb-6 flex-1">
          {perks.map((p, i) => <span key={i}>✔ {p}</span>)}
        </div>
        <div className="mt-auto">
          <div className="w-full h-[1px] bg-gold/20 mb-6"></div>
          <div className="flex items-center text-[10px] tracking-[4px] uppercase text-gold group-hover:gap-3 transition-all duration-300">
            <Link to="/rooms" className="hover:text-gold/80">
              Discover More
            </Link>
            <span>→</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const RoomCategories = () => {
  const rooms = [
    { id: 1, type: 'Classic Room', tag: 'Deluxe', image: ClassicImage, perks: ['Comfortable Bed', 'Fast Wi-Fi', 'Air Conditioning'] },
    { id: 2, type: 'Executive Room', tag: 'Premium', image: ExecutiveImage, perks: ['Spacious Layout', 'Smart LED TV', 'Tea & Coffee Maker'] },
    { id: 3, type: 'Family Room', tag: 'Extra Space', image: CottageImage, perks: ['Multiple Beds', 'Extra Seating', 'Large Floor Plan'] },
    { id: 4, type: 'Suite Room', tag: 'Exclusive', image: SuiteImage, perks: ['Separate Living Area', 'King Size Bed', 'Premium Interiors'] },
  ];

  return (
    <section id="rooms" className="py-24 md:py-32 px-6 lg:px-20 bg-primary text-white">
      <FadeIn className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold uppercase tracking-[4px] text-[10px] mb-4">Accommodation</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-white">
            Stay in <span className="italic">Comfort</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room.id} {...room} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/rooms" className="inline-block border-b border-gold text-[10px] tracking-[4px] uppercase text-gold hover:text-white transition-colors pb-1">
            View All Categories
          </Link>
        </div>
      </FadeIn>
    </section>
  );
};

export default RoomCategories;
