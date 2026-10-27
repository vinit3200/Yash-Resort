# Yash Resort Management System

A comprehensive full-stack application for managing a resort, consisting of a customer-facing website, an administrative dashboard, and a centralized backend API.

## 🏗 Project Structure

The project is divided into three main components:

### 1. `backend/` (Centralized API)
The core server that handles data and business logic for both the main website and the management dashboard.
- **Tech Stack:** Node.js, Express.js, MongoDB (Mongoose).
- **Key Features:**
  - **Payment Integration:** Integrated with Razorpay for secure bookings.
  - **Communication:** Nodemailer for sending booking confirmations and notifications.
  - **Data Models:** Handles Bookings, Customers, Events, Feedback, Resorts, and Rooms.
  - **Architecture:** Utilizes a modular structure with routes, controllers (via services), and middleware.

### 2. `yash_resort/` (Main Customer Website)
The public-facing portal where visitors can explore the resort and book their stay.
- **Tech Stack:** React 19, Vite, Tailwind CSS, Chakra UI.
- **Key Features:**
  - **Visual Experience:** Powered by GSAP and Framer Motion for high-quality animations.
  - **Booking System:** Integrated date pickers and room selection to allow users to book stays.
  - **Responsive Design:** Fully optimized for all device sizes.

### 3. `resort_dashboard/` (Administrative Panel)
A dedicated management tool for resort staff and administrators.
- **Tech Stack:** React 19, Vite, Redux Toolkit, Chakra UI, Recharts.
- **Key Features:**
  - **Resort Management:** Handle bookings, room availability, and customer details.
  - **Financial Tracking:** Revenue tracking and payment monitoring.
  - **Visitor Logistics:** Manage entry/exit of visitors.
  - **Analytics:** Data visualization via Recharts for business insights.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (Running locally or a MongoDB Atlas URI)

### Installation & Setup

#### 1. Backend Setup
```bash
cd backend
npm install
# Create a .env file with:
# PORT=5000
# MONGODB_URI=your_mongodb_uri
# RAZORPAY_KEY_ID=your_key
# RAZORPAY_KEY_SECRET=your_secret
npm run dev
```

#### 2. Main Website Setup
```bash
cd yash_resort
npm install
npm run dev
```

#### 3. Dashboard Setup
```bash
cd resort_dashboard
npm install
npm run dev
```

## 🛠 Tech Stack Summary

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS, Chakra UI, Redux Toolkit |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Animations** | GSAP, Framer Motion |
| **Payments** | Razorpay |
| **Charts** | Recharts |
