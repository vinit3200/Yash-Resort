import React from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '../FadeIn';
import Piecefull_suiteImage from '../../assets/piecefull_suit.webp';

const AboutSection = () => {
  return (
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
             <Link to="/rooms" className="inline-flex items-center justify-center px-8 py-3 rounded-full border-[0.5px] border-gold text-gold hover:bg-gold hover:text-white hover:shadow-xl transition-all duration-300 text-[10px] tracking-[4px] uppercase">
               Immerse Deeply
             </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

export default AboutSection;
