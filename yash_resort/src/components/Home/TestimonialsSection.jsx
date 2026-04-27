import React from 'react';
import gsap from 'gsap';
import FadeIn from '../FadeIn';

const testimonials = [
  { name: "Rahul Sharma", role: "Couples Stay", text: "The serenity of Bhandardara combined with Yash Resort's hospitality was magical.", stars: 5 },
  { name: "Amit Varma", role: "Family Vacation", text: "Perfect place for a weekend getaway. The multi-cuisine food is excellent.", stars: 5 },
  { name: "Sneha Patil", role: "Corporate Event", text: "Best venue in Bhandardara for events. Facilities were top-notch.", stars: 5 },
  { name: "Priya Kumar", role: "Honeymoon", text: "An absolute paradise! The peaceful atmosphere made our trip unforgettable.", stars: 5 },
  { name: "Vivek Singh", role: "Business Travel", text: "Great facilities and high-speed internet. Accommodating staff.", stars: 5 },
  { name: "Anjali Desai", role: "Group Getaway", text: "Organized a friends' trip here and everyone was amazed!", stars: 5 },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-cream overflow-hidden">
      <FadeIn className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <p className="text-gold uppercase tracking-[4px] text-[10px] mb-4">Guest Reviews</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-primary">
              Stories from our <br /> <span className="italic">Beloved Guests</span>
            </h2>
          </div>
        </div>
        <TestimonialsMarquee />
      </FadeIn>
    </section>
  );
};

function TestimonialsMarquee() {
  const marqueeRef = React.useRef(null);
  const animationRef = React.useRef(null);

  React.useEffect(() => {
    if (!marqueeRef.current) return;
    const marquee = marqueeRef.current;
    const scrollWidth = marquee.scrollWidth / 2;

    const animation = gsap.to(marquee, {
      x: -scrollWidth,
      duration: 30,
      ease: "none",
      repeat: -1,
    });

    animationRef.current = animation;
    return () => gsap.killTweensOf(marquee);
  }, []);

  return (
    <div 
      className="w-full overflow-hidden relative -mx-6 px-6 py-8 cursor-pointer"
      onMouseEnter={() => animationRef.current?.pause()}
      onMouseLeave={() => animationRef.current?.resume()}
    >
      <div className="flex gap-8" ref={marqueeRef} style={{ width: 'max-content' }}>
        {[...testimonials, ...testimonials].map((t, i) => (
          <div key={i} className="flex-shrink-0 w-96 p-8 border border-gold/20 bg-white shadow-sm rounded-lg">
            <div className="flex gap-1 mb-6">
              {[...Array(t.stars)].map((_, idx) => (
                <svg key={idx} width="12" height="12" viewBox="0 0 24 24" fill="#D4AF37"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.169-7.334-3.856-7.334 3.856 1.4-8.169-5.934-5.787 8.2-1.192z"/></svg>
              ))}
            </div>
            <p className="font-serif text-base italic text-primary/80 mb-6 leading-relaxed">"{t.text}"</p>
            <div className="pt-4 border-t border-gold/10">
              <h4 className="font-serif text-lg text-primary font-light">{t.name}</h4>
              <p className="text-gold text-[9px] uppercase tracking-[3px] mt-1">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestimonialsSection;
