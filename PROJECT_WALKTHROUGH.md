# Yash Resorts Management Dashboard — Technical Walkthrough

This document explains the architecture, design philosophy, and inner workings of the Yash Resorts Management system.

## 1. Overview & Technology Stack

The project is a full-stack **MERN** (MongoDB, Express, React, Node) application designed with a **"Quiet Luxury"** aesthetic. It serves as a centralized hub to manage multiple resort properties, room inventories, guest bookings, and high-profile events.

### Frontend

- **React (Vite)**: Core framework for a fast, modern UI.
- **Chakra UI v2**: Used for the design system, providing a clean and accessible component library.
- **Redux Toolkit**: Manages global state (resorts, rooms, bookings, etc.).
- **Framer Motion**: Powers premium micro-animations (fade-ins, smooth hover scales).
- **Recharts**: Renders the analytical charts on the dashboard.
- **Lucide React**: Clean, minimalist iconography.

### Backend

- **Node.js & Express**: Handles the REST API logic.
- **MongoDB & Mongoose**: NoSQL database for flexible data modeling.
- **Dotenv**: Manages environment-specific configurations.

---

## 2. Design System: "Quiet Luxury"

The UI is built on three pillars:

1. **Typography**: **Cormorant Garamond** (Serif) for elegant headings and **DM Sans** (Sans-serif) for readable body text.
2. **Palette**:
   - Primary: `#3D2010` (Deep Brown) — represents stability and luxury.
   - Background: `#FAF6F0` (Cream) — soft and editorial-style.
   - Accent: `#C5A059` (Gold) — used sparingly for highlights and active states.
3. **Motion**: Global 0.5s ease-out transitions and staggered entrance animations for cards.

---

## 3. Data Architecture (Models)

The backend uses five interconnected models:

- **Resort**: The parent entity (e.g., Yash Resort). Stores location, amenities, and overall status.
- **Room**: Linked to a Resort. Categorized into _Classic, Executive, Villa,_ or _Suite_.
- **Customer**: A guest directory storing contact info, identity verification (Aadhar/Passport), and VIP status.
- **Booking**: The core "transaction" linking a Customer to a Room at a specific Resort for a date range.
- **Event**: Manages weddings, conferences, and functions associated with a resort.

---

## 4. Key Logic & Features

### Double-Booking Prevention

In `backend/routes/bookings.js`, when a new booking is created, the system performs a date-overlap check to ensure no two guests can be assigned the same room at the same time.

### State Synchronization (React 19)

The `FormModal` uses the **"Adjusting state during render"** pattern. When switching between items to edit, the component detects the prop change during the render phase and resets the internal form state immediately, avoiding stale data.

### Dashboard Analytics

The `/api/dashboard/stats` route provides:

- **Occupancy Rate**: Percentage of rooms currently set to "Booked".
- **Revenue Trends**: Aggregated paid bookings over the last 6 months for charts.
- **Upcoming Events**: Real-time filtering of events scheduled for the future.

### Reusable Components

- **DataTable**: A generic table component that handles searching, filtering, and pagination.
- **FormModal**: A dynamic modal that generates a full form based on a simple configuration array.

---

## 5. Project Structure

```text
resort-dashboard/
├── backend/
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API endpoints
│   ├── server.js     # Entry point & DB connection
│   └── seed.js       # Demo data generator
└── frontend/
    ├── src/
    │   ├── api/      # Axios configuration
    │   ├── components/ # Reusable UI (Sidebar, Navbar, etc.)
    │   ├── pages/    # Dashboard, Resorts, Bookings, etc.
    │   ├── store/    # Redux slices and configuration
    │   └── theme.js  # Chakra UI luxury theme
```

---

## 6. How to Run

1. **Backend**:
   - `cd backend`
   - `npm install`
   - `npm start` (Runs on port 5000)
2. **Frontend**:
   - `cd frontend`
   - `npm install`
   - `npm run dev` (Runs on port 5173)

---

_This project is designed to be scalable—adding new resorts or reporting metrics is as simple as adding a new Redux slice and an API route._

so, you understand it very well, now since you understand it i want you make my project properly working like  
 profesional website , i want customer to book the room or rooms in the resort by there preference and  
 availability, there are only four categories of rooms Classic, Executive , Cottage/Villa, Suite, so i want  
 customer to able to book rooms in three step verification,in first step he will insert his information like  
 like full name , email, phone number, adults count , children count, room type he selected and if the selected
room type and the count of room type is available from perticular date to perticular date then he will make  
 the booking request, in the second step he will see his details that he just filed in the form for cerifaing  
 himself and proceed to next step, in third step he will go for payment getway , upon selection room type and  
 number of rooms his total payable cost of the rooms that he trying to book will be visible as the total bill  
 and he can see some payment options down side of the bill like cash on checkIn or online pay like razor pay,  
 if he selects cash on check in which means he will pay the full amount on checkIn time on the resort counter  
 his payment status will be set to pending for the time bing, but the booking status will be get confermed or  
 if he selects online payment method like razor pay he should be able to pay it online, once he selects online
option and make the full payment online his booking will be get confermed and he will get confermation notice
on screen , on his mobile number as message and the full payment invoice in the email, and after all that the
about the yash_resort project that i want now for the resort_dashboard project if the customer is booking from the yash_resort project website booking form then it fine but cutomer comes directly in to the resort and try to book the room, admin who handles the dashboard will be able to insert customer data in customer database direcly through dashboard project website and once admin inserts customer data rooms will get automaticly asign to that customer if available and from room database admin can add or delete room from resort_dashboard and in the booking section of the dashboard admin only has to manage the booking staus payment status if pending because other filds of the booking database will come from customer database directly so admin don't have to put customer information for booking so can do this much changes in my project and manage database models accordingly in backend folder with hole backend system and one more thing re-write hole code of my project like i am compelete begginer don't make it complex to understand make website look primium and make sure it works properlly and if i dont like your work them i will say "revert back all changes" so then you will make the project codes same as right now , now if you understand my request you can proceed to make this project
