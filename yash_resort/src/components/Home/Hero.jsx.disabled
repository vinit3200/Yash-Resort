import React from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '../FadeIn';
import heroImage from '../../assets/resort_img1.webp';

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Yash Resort Lake View"
          className="w-full h-full object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60"></div>
      </div>
      <FadeIn className="relative z-10 flex flex-col justify-end items-center h-full text-center px-6 pb-32">
        <span className="text-white text-[10px] tracking-[4px] uppercase mb-6 drop-shadow-md">
          Yash Resort Bhandardara
        </span>
        <h1 className="font-serif text-white text-6xl md:text-8xl font-light mb-8 drop-shadow-lg leading-none">
          Serenity <br /> <span className="italic text-gold">Meets Comfort</span>
        </h1>
        <Link to="/about" className="group flex flex-col items-center gap-2 mt-8 transition-all hover:gap-5">
          <span className="text-white text-[10px] tracking-[4px] uppercase">Explore More</span>
          <div className="w-[1px] h-12 bg-gold/50 group-hover:bg-gold transition-colors duration-500"></div>
        </Link>
      </FadeIn>
    </section>
  );
};

export default Hero;
