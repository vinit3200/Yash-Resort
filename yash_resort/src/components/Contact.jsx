import React, { useState } from "react";
import axios from "axios";
import FadeIn from "./FadeIn";
import heroImage from "../assets/resort_img1.webp";

const Contact = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "Feedback", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      await axios.post(`${API_BASE}/feedbacks`, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message
      });
      
      setSubmitted(true);
      setForm({
        name: "", email: "", phone: "", subject: "Feedback", message: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error("Feedback submission failed:", err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-body bg-cream text-primary">

      {/* ── PAGE HERO ── */}
      <section className="relative h-[60vh] overflow-hidden">
        <img src={heroImage} alt="Contact Yash Resort" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
        <FadeIn className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-gold text-[10px] tracking-[5px] uppercase mb-4">Get In Touch</p>
          <h1 className="font-serif text-white text-5xl md:text-7xl font-light leading-tight">
            Contact <span className="italic text-gold">Us</span>
          </h1>
          <div className="w-12 h-[0.5px] bg-gold/60 mt-8" />
        </FadeIn>
      </section>

      {/* ── CONTACT INFO CARDS ── */}
      <section className="py-20 px-6 lg:px-20 max-w-[1280px] mx-auto -mt-16 relative z-10">
        <FadeIn className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Address",
              value: "Yash Resort, Bhandardara,\nAhmednagar, Maharashtra, India",
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
            },
            {
              label: "Phone",
              value: "+91 253 660 0000\n+91 98765 43210",
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
            },
            {
              label: "Email",
              value: "stay@yashresort.in\nbooking@yashresort.in",
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
            },
            {
              label: "Front Desk",
              value: "Available 24/7\nfor all your needs",
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
            },
          ].map((c, i) => (
            <div key={i} className="bg-primary p-8 text-center border border-gold/10 hover:border-gold/30 hover:shadow-xl transition-all duration-500 group">
              <div className="w-14 h-14 rounded-full border border-gold/20 flex items-center justify-center mx-auto mb-5 text-gold group-hover:bg-gold group-hover:text-white transition-all duration-300">
                {c.icon}
              </div>
              <h3 className="font-serif text-lg text-white mb-2">{c.label}</h3>
              <p className="text-white/70 text-sm font-light leading-relaxed whitespace-pre-line">{c.value}</p>
            </div>
          ))}
        </FadeIn>
      </section>

      {/* ── CONTACT FORM + MAP ── */}
      <section className="py-24 md:py-32 px-6 lg:px-20 bg-white">
        <FadeIn className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Form */}
            <div>
              <p className="text-gold uppercase tracking-[4px] text-[10px] mb-4">Send a Message</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-primary mb-10">
                We'd love to <span className="italic text-gold">hear from you</span>
              </h2>

              {submitted && (
                <div className="mb-8 p-4 border border-green1/30 bg-green1/5 text-green1 text-sm font-light">
                  ✓ Thank you! Your message has been sent. We'll get back to you shortly.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[3px] text-primary/80 mb-2">Full Name</label>
                    <input
                      type="text" name="name" value={form.name} onChange={handleChange} required
                      placeholder="Your Name"
                      className="w-full bg-transparent border-b border-primary/20 py-3 text-sm text-primary placeholder:text-primary/40 focus:outline-none focus:border-gold transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[3px] text-primary/80 mb-2">Email</label>
                    <input
                      type="email" name="email" value={form.email} onChange={handleChange} required
                      placeholder="your@email.com"
                      className="w-full bg-transparent border-b border-primary/20 py-3 text-sm text-primary placeholder:text-primary/40 focus:outline-none focus:border-gold transition-colors duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[3px] text-primary/80 mb-2">Phone</label>
                    <input
                      type="tel" name="phone" value={form.phone} onChange={handleChange}
                      placeholder="+91 00000 00000"
                      className="w-full bg-transparent border-b border-primary/20 py-3 text-sm text-primary placeholder:text-primary/40 focus:outline-none focus:border-gold transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[3px] text-primary/80 mb-2">Subject</label>
                    <select
                      name="subject" value={form.subject} onChange={handleChange}
                      className="w-full bg-transparent border-b border-primary/20 py-3 text-sm text-primary focus:outline-none focus:border-gold transition-colors duration-300 cursor-pointer"
                    >
                      <option>General Inquiry</option>
                      <option>Room Booking</option>
                      <option>Event & Wedding</option>
                      <option>Corporate Stay</option>
                      <option>Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[3px] text-primary/80 mb-2">Message</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} required rows={5}
                    placeholder="Tell us about your experience..."
                    className="w-full bg-transparent border-b border-primary/20 py-3 text-sm text-primary placeholder:text-primary/40 focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group/btn relative overflow-hidden bg-primary text-white px-10 py-4 active:scale-[0.97] transition-all duration-300 cursor-pointer rounded-sm border-none mt-4 disabled:opacity-50"
                >
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold w-0 h-0 transition-all duration-500 ease-out group-hover/btn:w-[20em] group-hover/btn:h-[20em] z-0"></span>
                  <span className="relative z-10 text-[10px] tracking-[4px] uppercase font-medium">
                    {loading ? "Submitting..." : "Submit Feedback"}
                  </span>
                </button>
              </form>
            </div>

            {/* Map / Location Visual */}
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-gold uppercase tracking-[4px] text-[10px] mb-4">Our Location</p>
                <h2 className="font-serif text-4xl md:text-5xl font-light text-primary mb-8 leading-tight">
                  Find <span className="italic text-gold">Us Here</span>
                </h2>
              </div>

              {/* Embedded Map */}
              <div className="w-full aspect-square lg:aspect-[4/3] bg-primary/5 overflow-hidden border border-gold/10">
                <iframe
                  title="Yash Resort Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60124.19!2d73.75!3d19.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd9b0e2e0e0e0%3A0x0!2sBhandardara!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 border border-gold/10">
                  <span className="block text-[9px] uppercase tracking-[3px] text-gold mb-1 font-medium">Check-In</span>
                  <span className="text-primary text-sm font-light">2:00 PM</span>
                </div>
                <div className="p-5 border border-gold/10">
                  <span className="block text-[9px] uppercase tracking-[3px] text-gold mb-1 font-medium">Check-Out</span>
                  <span className="text-primary text-sm font-light">11:00 AM</span>
                </div>
              </div>
            </div>

          </div>
        </FadeIn>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="bg-primary py-20 px-6 text-center">
        <FadeIn>
          <p className="text-gold text-[10px] tracking-[5px] uppercase mb-4">Ready to Experience?</p>
          <h2 className="font-serif text-white text-3xl md:text-5xl font-light mb-8">
            Book Your <span className="italic">Stay Today</span>
          </h2>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="tel:+912536600000"
              className="inline-flex items-center gap-3 border border-gold/40 text-gold px-8 py-3.5 text-[10px] tracking-[4px] uppercase hover:bg-gold hover:text-white transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call Now
            </a>
            <a
              href="mailto:stay@yashresort.in"
              className="inline-flex items-center gap-3 bg-gold text-white px-8 py-3.5 text-[10px] tracking-[4px] uppercase hover:bg-white hover:text-primary transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Email Us
            </a>
          </div>
        </FadeIn>
      </section>

    </div>
  );
};

export default Contact;
