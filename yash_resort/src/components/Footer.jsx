import { Link, useNavigate, useLocation } from "react-router-dom";
import logoImg from "../assets/VC yesh resort colour.png";

const Footer = ({ logo }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (e, href) => {
    e.preventDefault();
    const isHashOnHome = href.startsWith("/#");
    const isRoute = !href.includes("#");

    if (isRoute) {
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (isHashOnHome) {
      const hash = href.replace("/", "");
      if (location.pathname === "/") {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 500);
      }
    }
  };

  return (
    <footer className="bg-dark text-white border-t border-gold/20 font-body py-12 md:py-20 focus:outline-none overflow-hidden footer-static">
      <div className="container mx-auto px-6 lg:px-10 max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 items-start pb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="mb-6">
              <Link to="/" onClick={(e) => handleNav(e, "/")}>
                <img
                  src={logo || logoImg}
                  alt="Yash Resort"
                  className="h-24 w-auto object-contain brightness-110 drop-shadow-sm"
                />
              </Link>
            </div>
            <span className="text-[10px] font-medium tracking-[5px] uppercase text-gold leading-tight block">
              Where Serenity Meets Comfort
            </span>
            <p className="text-sm font-light text-white/70 leading-relaxed max-w-[300px]">
              Located in the peaceful surroundings of Bhandardara, our resort combines modern amenities with a calm and refreshing atmosphere.
            </p>
            <div className="flex gap-3 pt-2">
              {["f", "in", "ig", "yt"].map((s) => (
                <Link
                  key={s}
                  to="#"
                  className="w-10 h-10 border border-gold/80 flex items-center justify-center text-sm font-medium text-gold hover:bg-gold hover:text-green1 transition-all duration-300"
                  aria-label={`Social link ${s}`}
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* Explore Column */}
          <div className="space-y-8 mt-4 lg:mt-0">
            <h4 className="font-serif text-2xl font-bold text-white leading-none">
              Explore
            </h4>
            <ul className="space-y-4">
              <li>
                <Link to="/about" onClick={(e) => handleNav(e, "/about")} className="text-sm font-light text-white/70 hover:text-gold transition-colors duration-300">About Us</Link>
              </li>
              <li>
                <Link to="/gallery" onClick={(e) => handleNav(e, "/gallery")} className="text-sm font-light text-white/70 hover:text-gold transition-colors duration-300">Gallery</Link>
              </li>
              <li>
                <Link to="/#events" onClick={(e) => handleNav(e, "/#events")} className="text-sm font-light text-white/70 hover:text-gold transition-colors duration-300">Events & Weddings</Link>
              </li>
              <li>
                <Link to="/contact" onClick={(e) => handleNav(e, "/contact")} className="text-sm font-light text-white/70 hover:text-gold transition-colors duration-300">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Stay Column */}
          <div className="space-y-8 mt-4 lg:mt-0">
            <h4 className="font-serif text-2xl font-bold text-white leading-none">
              Stay
            </h4>
            <ul className="space-y-4">
              {["Classic Room", "Executive Room", "Family Room", "Suite Room"].map((l) => (
                <li key={l}>
                  <Link to="/rooms" onClick={(e) => handleNav(e, "/rooms")} className="text-sm font-light text-white/70 hover:text-gold transition-colors duration-300">{l}</Link>
                </li>
              ))}
              {["Dining", "Comfortable Environment"].map((l) => (
                <li key={l}>
                  <Link to="/#dining" onClick={(e) => handleNav(e, "/#dining")} className="text-sm font-light text-white/70 hover:text-gold transition-colors duration-300">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reach Us Column */}
          <div className="space-y-8 mt-4 lg:mt-0">
            <h4 className="font-serif text-2xl font-bold text-white leading-none">
              Reach Us
            </h4>
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold tracking-[3px] uppercase text-gold block">
                  Address
                </span>
                <span className="text-sm font-light text-white/70 block leading-relaxed">
                  Bhandardara, Maharashtra, India
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold tracking-[3px] uppercase text-gold block">
                  Reservations
                </span>
                <span className="text-sm font-light text-white/70 block leading-relaxed">
                  +91 253 660 0000
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold tracking-[3px] uppercase text-gold block">
                  Email
                </span>
                <span className="text-sm font-light text-white/70 block leading-relaxed">
                  stay@yashresort.in
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gold/20 flex flex-col md:flex-row items-center justify-between gap-6 pb-6">
          <span className="text-xs font-light text-white/50 leading-tight tracking-wider uppercase">
            © 2026 Yash Resort Bhandardara. All rights reserved.
          </span>
          <div className="flex gap-6 lg:gap-10">
            {["Privacy Policy", "Terms", "Cookie Policy", "Accessibility"].map(
              (l) => (
                <Link
                  key={l}
                  to="#"
                  className="text-xs font-light text-white/50 hover:text-gold hover:underline transition-all duration-300 tracking-wider"
                >
                  {l}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
