import React, { useState, useEffect } from "react";

const WhatsAppButton = () => {
  const [notificationIndex, setNotificationIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const notifications = [
    "Book your suite room now",
    "Enjoy your family stay (booking is now open)",
    "Special offers on room packages",
    "Experience luxury at Yash Resort",
    "Get instant responses on WhatsApp",
    "Reserve your perfect getaway",
    "Limited availability - Book today",
    "Create unforgettable memories here",
  ];

  useEffect(() => {
    const showNotification = () => {
      setFadeOut(false); // Show notification

      // Fade out after 3 seconds
      const fadeTimer = setTimeout(() => {
        setFadeOut(true);
      }, 3000);

      // Change to next notification after fade completes
      const changeTimer = setTimeout(() => {
        setNotificationIndex((prevIndex) => (prevIndex + 1) % notifications.length);
      }, 3300);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(changeTimer);
      };
    };

    // Show initial notification
    showNotification();

    // Repeat every 10 seconds
    const mainInterval = setInterval(showNotification, 10000);

    return () => {
      clearInterval(mainInterval);
    };
  }, [notifications.length]);

  const phoneNumber = "+912536600000"; // Replace with real number
  const message = "Hello! I'm interested in booking a stay at Yash Resort Bhandardara.";
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] group flex items-center gap-3"
      aria-label="Contact on WhatsApp"
    >
      {/* Rotating Notification Tooltip - Always Visible */}
      <span className={`bg-white text-primary text-[10px] tracking-[2px] uppercase px-4 py-2 border border-gold/20 shadow-xl pointer-events-none whitespace-nowrap min-w-max transition-opacity duration-300 rounded-lg ${fadeOut ? "opacity-0" : "opacity-100"}`}>
        {notifications[notificationIndex]}
      </span>
      
      {/* Button Icon */}
      <div className="w-14 h-14 bg-primary border-2 border-gold flex items-center justify-center text-gold shadow-2xl group-hover:bg-gold group-hover:text-white transition-all duration-300 rounded-full">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z" />
        </svg>
      </div>

      {/* Pulsing ring animation */}
      <div className="absolute inset-0 w-14 h-14 bg-gold/30 rounded-full animate-ping pointer-events-none ml-auto"></div>
    </a>
  );
};

export default WhatsAppButton;
