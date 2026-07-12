import React from 'react';
import FadeIn from '../FadeIn';
import Forest from '../../assets/Yash Resort Rooms/_ROB6452.jpg';
import enterance from '../../assets/entrance.png';
import ForestImg from '../../assets/forest_trail.png';
import NightEventImg from '../../assets/nightEvent.png';
import natures_path from '../../assets/natures_path.png';
import ParkingImg from '../../assets/parking.png';
import PoolImg from '../../assets/Yash Resort Rooms/_ROB6557.jpg';

const NatureSection = () => {
  const items = [
    { span: 'col-span-2', img: Forest, label: 'Forest Trail', sub: 'Explore nature' },
    { span: '', img: enterance, label: 'Resort Entrance', sub: 'Welcome to Paradise' },
    { span: '', img: ForestImg, label: "Nature's Path", sub: 'Forest trails', bright: true },
    { span: '', img: NightEventImg, label: 'Night Events', sub: 'Family Gathering', bright: true },
    { span: '', img: natures_path, label: "Nature's Path", sub: 'Walk in the nature' },
    { span: '', img: ParkingImg, label: 'Parking', sub: 'Arrive with Ease' },
    { span: 'col-span-2', img: PoolImg, label: 'The Pool', sub: 'A Quiet Escape by the Pool' },
  ];

  return (
    <section className="py-24 md:py-32 px-6 lg:px-20 bg-primary text-white border-t border-gold/10">
      <FadeIn className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold uppercase tracking-[4px] text-[10px] mb-4">Scenic Surroundings</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-white">
            Nature's <span className="italic">Embrace</span>
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
          {items.map((item, idx) => (
            <div key={idx} className={`${item.span} group relative overflow-hidden rounded-lg shadow-2xl cursor-pointer`}>
              <img
                src={item.img}
                alt={item.label}
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${item.bright ? 'brightness-150' : ''}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-500"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-gold text-[10px] tracking-[3px] uppercase font-medium">{item.label}</span>
                <p className="text-white/90 text-xs mt-1">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
};

export default NatureSection;
