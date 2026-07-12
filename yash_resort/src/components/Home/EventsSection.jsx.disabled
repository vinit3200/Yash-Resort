import React from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '../FadeIn';

const EventsSection = () => {
  return (
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
              <EventItem 
                title="Weddings" 
                desc="Destination wedding venue with elegant spaces and complete event management support." 
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/><path d="M12 9v2m0 4v2"/><circle cx="5" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><path d="m3.51 4.51 1.42 1.42M19.07 19.07l1.41 1.41"/></svg>}
              />
              <EventItem 
                title="Birthday Parties" 
                desc="Create memorable celebrations with our customized party packages and catering services." 
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>}
              />
              <EventItem 
                title="Corporate Events" 
                desc="Ideal for conferences, offsites, and team building with modern facilities and support." 
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
              />
            </div>

            <Link to="/contact" className="inline-block bg-gold text-white px-10 py-4 text-[10px] tracking-[4px] uppercase font-medium hover:bg-green1 transition-colors duration-300 rounded-none shadow-lg hover:shadow-xl">
              Plan Your Event
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

const EventItem = ({ title, desc, icon }) => (
  <div className="flex gap-4 items-start group">
    <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all flex-shrink-0 mt-1">
      {icon}
    </div>
    <div>
      <h4 className="text-lg font-serif text-primary mb-2">{title}</h4>
      <p className="text-mutedlight font-light text-sm">{desc}</p>
    </div>
  </div>
);

export default EventsSection;
