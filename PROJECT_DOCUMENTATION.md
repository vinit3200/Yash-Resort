# Yash Resorts Management Dashboard — Complete Project Documentation

## 1. Project Overview

A full-stack **MERN** (MongoDB, Express, React, Node.js) resort management system designed with a "Quiet Luxury" aesthetic. The application serves as a centralized hub for managing multiple resort properties, room inventories, guest bookings, customer profiles, and high-profile events.

### Key Features
- Multi-resort property management
- Room inventory tracking with real-time availability
- Guest booking system with conflict prevention
- Customer directory with VIP status tracking
- Event management for weddings, conferences, and functions
- Dashboard analytics with revenue trends and occupancy metrics
- Simple admin authentication system

---

## 2. Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.5 | Core UI framework |
| Vite | 8.0.9 | Build tool & dev server |
| Chakra UI | 2.10.9 | Component library & design system |
| Redux Toolkit | 2.11.2 | Global state management |
| React Router | 7.14.1 | Client-side routing |
| Axios | 1.15.1 | HTTP client for API calls |
| Framer Motion | 12.38.0 | Animation library |
| Recharts | 3.8.1 | Data visualization (charts) |
| Lucide React | 1.8.0 | Icon library |
| React Icons | 5.6.0 | Additional icon set |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | - | Runtime environment |
| Express | 5.2.1 | REST API framework |
| MongoDB | - | NoSQL database |
| Mongoose | 9.4.1 | MongoDB ODM |
| JSON Web Token | 9.0.3 | Authentication |
| CORS | 2.8.6 | Cross-origin resource sharing |
| Dotenv | 17.4.2 | Environment configuration |

---

## 3. Project Structure

```
resort-dashboard/
├── backend/
│   ├── models/
│   │   ├── Admin.js        # Admin authentication model
│   │   ├── Resort.js       # Resort property model
│   │   ├── Room.js         # Room inventory model
│   │   ├── Booking.js      # Guest booking model
│   │   ├── Customer.js     # Guest directory model
│   │   └── Event.js        # Event management model
│   ├── routes/
│   │   ├── auth.js         # Admin login
│   │   ├── resorts.js      # Resort CRUD operations
│   │   ├── rooms.js        # Room CRUD operations
│   │   ├── bookings.js     # Booking CRUD + conflict check
│   │   ├── customers.js    # Customer CRUD operations
│   │   ├── events.js       # Event CRUD operations
│   │   └── dashboard.js    # Analytics & statistics
│   ├── middleware/
│   │   └── (none)           # No middleware needed
│   ├── server.js           # Express entry point
│   ├── seed.js             # Demo data generator
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── index.js    # Axios configuration
│   │   ├── components/
│   │   │   ├── DataTable.jsx   # Reusable table with search/filter
│   │   │   ├── FormModal.jsx   # Dynamic form generator
│   │   │   ├── Layout.jsx      # Page layout wrapper
│   │   │   ├── Navbar.jsx      # Top navigation bar
│   │   │   ├── Sidebar.jsx     # Side navigation menu
│   │   │   ├── StatsCard.jsx   # Dashboard stat card
│   │   │   ├── ProtectedRoute.jsx  # Auth guard component
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx # Analytics overview
│   │   │   ├── Resorts.jsx   # Resort management
│   │   │   ├── Rooms.jsx     # Room inventory
│   │   │   ├── Bookings.jsx  # Booking management
│   │   │   ├── Customers.jsx # Customer directory
│   │   │   ├── Events.jsx    # Event management
│   │   │   └── Login.jsx     # Admin login
│   │   ├── store/
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js      # Auth state
│   │   │   │   ├── resortsSlice.js   # Resort state
│   │   │   │   ├── roomsSlice.js     # Room state
│   │   │   │   ├── bookingsSlice.js  # Booking state
│   │   │   │   ├── customersSlice.js # Customer state
│   │   │   │   ├── eventsSlice.js    # Event state
│   │   │   │   └── dashboardSlice.js # Dashboard state
│   │   │   └── index.js    # Redux store configuration
│   │   ├── assets/         # Images & logos
│   │   ├── App.jsx         # Root component
│   │   ├── main.jsx        # Entry point
│   │   └── theme.js        # Chakra UI theme config
│   └── package.json
│
└── PROJECT_WALKTHROUGH.md  # Existing technical guide
```

---

## 4. Design System: "Quiet Luxury"

### Typography
- **Headings**: Cormorant Garamond (Serif) — elegant, editorial-style
- **Body**: DM Sans (Sans-serif) — clean, readable

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Primary (Deep Brown) | `#3D2010` | Buttons, headings, active states |
| Background (Cream) | `#FAF6F0` | Page background |
| Accent (Gold) | `#C5A059` | Highlights, hover states, icons |
| Secondary Text | `#7A7A7A` | Muted text, placeholders |
| Card Background | `#FFFFFF` | Cards, modals, tables |
| Border Light | `#E8E0D6` | Subtle dividers |

### Motion & Animation
- Global 0.5s ease-out transitions
- Staggered entrance animations for cards (0.1s delay increments)
- Smooth hover scales and transform effects
- Framer Motion for page transitions

---

## 5. Data Architecture (Database Models)

### Admin Model
```javascript
{
  adminId: String (unique, required),
  password: String (required),
  name: String,
  timestamps: true
}
```

### Resort Model
```javascript
{
  name: String (required),
  location: String (required),
  description: String,
  totalRooms: Number (required),
  amenities: [String],
  image: String,
  rating: Number (default: 4.5),
  contactEmail: String,
  contactPhone: String,
  status: Enum ['Active', 'Inactive', 'Maintenance'],
  timestamps: true
}
```

### Room Model
```javascript
{
  resort: ObjectId (ref: Resort, required),
  roomNumber: String (required),
  category: Enum ['Classic', 'Executive', 'Villa', 'Suite'],
  price: Number (required),
  capacity: Number (default: 2),
  amenities: [String],
  status: Enum ['Available', 'Booked', 'Maintenance'],
  image: String,
  description: String,
  timestamps: true
}
```

### Customer Model
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required),
  phone: String (required),
  address: String,
  city: String,
  idType: Enum ['Aadhar', 'Passport', 'Driving License', 'PAN'],
  idNumber: String,
  vipStatus: Boolean (default: false),
  notes: String,
  timestamps: true
}
```

### Booking Model
```javascript
{
  resort: ObjectId (ref: Resort, required),
  room: ObjectId (ref: Room, required),
  customer: ObjectId (ref: Customer, required),
  checkIn: Date (required),
  checkOut: Date (required),
  guests: Number (default: 1),
  totalAmount: Number (required),
  paymentStatus: Enum ['Pending', 'Paid', 'Refunded', 'Partial'],
  bookingStatus: Enum ['Confirmed', 'Checked-In', 'Checked-Out', 'Cancelled'],
  specialRequests: String,
  timestamps: true
}
```

### Event Model
```javascript
{
  name: String (required),
  type: Enum ['Wedding', 'Corporate', 'Birthday', 'Conference', 'Function', 'Other'],
  resort: ObjectId (ref: Resort, required),
  date: Date (required),
  endDate: Date,
  guestCount: Number (required),
  organizer: String (required),
  contactPhone: String,
  contactEmail: String,
  budget: Number (default: 0),
  status: Enum ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'],
  notes: String,
  timestamps: true
}
```

---

## 6. API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/login` | Admin login (returns admin object) |

### Resorts (`/api/resorts`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all resorts (with filters) |
| GET | `/:id` | Get single resort |
| POST | `/` | Create new resort |
| PUT | `/:id` | Update resort |
| DELETE | `/:id` | Delete resort |

### Rooms (`/api/rooms`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all rooms (with filters) |
| GET | `/:id` | Get single room |
| POST | `/` | Create new room |
| PUT | `/:id` | Update room |
| DELETE | `/:id` | Delete room |

### Bookings (`/api/bookings`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all bookings |
| GET | `/:id` | Get single booking |
| POST | `/` | Create booking (with conflict check) |
| PUT | `/:id` | Update booking |
| DELETE | `/:id` | Delete booking |

### Customers (`/api/customers`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all customers |
| GET | `/:id` | Get single customer |
| POST | `/` | Create customer |
| PUT | `/:id` | Update customer |
| DELETE | `/:id` | Delete customer |

### Events (`/api/events`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all events |
| GET | `/:id` | Get single event |
| POST | `/` | Create event |
| PUT | `/:id` | Update event |
| DELETE | `/:id` | Delete event |

### Dashboard (`/api/dashboard`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/stats` | Get dashboard analytics |

---

## 7. Core Business Logic

### 7.1 Double-Booking Prevention
**Location**: `backend/routes/bookings.js:48-80`

When creating a new booking, the system checks for overlapping reservations:

```javascript
const overlap = await Booking.findOne({
  room,
  bookingStatus: { $nin: ['Cancelled'] },
  $or: [
    { checkIn: { $lt: new Date(checkOut) }, checkOut: { $gt: new Date(checkIn) } }
  ]
});

if (overlap) {
  return res.status(400).json({ message: 'Room is already booked for the selected dates' });
}
```

### 7.2 Room Status Auto-Update
- **On Booking Creation**: Room status changes to `Booked`
- **On Check-Out/Cancel**: Room status reverts to `Available`
- **On Booking Delete**: Room status reverts to `Available`

### 7.3 Dashboard Statistics Calculation
**Location**: `backend/routes/dashboard.js:8-65`

The `/stats` endpoint computes:
- **Occupancy Rate**: `(bookedRooms / totalRooms) * 100`
- **Total Revenue**: Sum of all `Paid` bookings
- **Monthly Revenue**: Last 6 months aggregated revenue
- **Active Guests**: Count of `Checked-In` bookings
- **Recent Bookings**: Latest 5 bookings with populated data
- **Upcoming Events**: Future events sorted by date

### 7.4 Admin Authentication Flow
1. Admin submits credentials at `/login`
2. Backend validates `adminId` and `password` against `Admin` collection
3. On success, admin object is stored in Redux state
4. No token is stored — authentication state is session-only
5. Protected routes check Redux `admin` state via `ProtectedRoute`

---

## 8. Frontend Architecture

### 8.1 Redux Store Structure
```
store/
├── auth       # Authentication state (admin, loading)
├── resorts    # Resort data & CRUD actions
├── rooms      # Room inventory & CRUD actions
├── bookings   # Booking data & CRUD actions
├── customers  # Customer directory & CRUD actions
├── events     # Event data & CRUD actions
└── dashboard  # Analytics data (stats, charts, lists)
```

### 8.2 Reusable Components

#### DataTable (`components/DataTable.jsx`)
A generic table component with:
- **Search**: Context-aware search (name, room number, guest name, etc.)
- **Filters**: Dynamic dropdown filters
- **Pagination**: Configurable page size (default: 8)
- **Actions**: Edit/Delete buttons per row
- **Loading State**: Spinner during data fetch
- **Animations**: Framer Motion entrance effects

#### FormModal (`components/FormModal.jsx`)
Dynamic form generator that:
- Accepts a configuration array of fields
- Handles create/edit modes
- Uses "Adjusting state during render" pattern for React 19
- Resets form state when switching between items

#### StatsCard (`components/StatsCard.jsx`)
Dashboard stat card with:
- Icon, title, value display
- Prefix/suffix support (₹, %)
- Framer Motion animation on mount

### 8.3 Protected Routes
**Location**: `components/ProtectedRoute.jsx`

```javascript
// Auth guard logic
if (!admin) {
  return <Navigate to="/login" replace />;
}
return <Outlet />;
```

---

## 9. Page Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/login` | Login | Admin authentication |
| `/` | Dashboard | Analytics overview |
| `/resorts` | Resorts | Resort property management |
| `/rooms` | Rooms | Room inventory management |
| `/bookings` | Bookings | Guest booking management |
| `/customers` | Customers | Customer directory |
| `/events` | Events | Event management |

---

## 10. How to Run

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas URI or local MongoDB instance

### Backend Setup
```bash
cd backend
npm install

# Create .env file with:
# MONGODB_URI=your_mongodb_connection_string
# PORT=5000

npm start        # Production
npm run dev      # Development with nodemon
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev      # Vite dev server (port 5173)
npm run build    # Production build
npm run preview  # Preview production build
```

---

## 11. Key Implementation Details

### 11.1 State Synchronization (React 19)
The `FormModal` uses the **"Adjusting state during render"** pattern:
- When switching between items to edit, the component detects prop changes during render
- Internal form state resets immediately, avoiding stale data
- No `useEffect` dependency on props needed

### 11.2 Smart Search in DataTable
The search function adapts based on data type:
- **Resorts**: Searches name or room count
- **Rooms**: Searches room number or category
- **Bookings**: Searches guest name or check-in date
- **Customers**: Searches full name or ID number
- **Events**: Searches event name

### 11.3 Responsive Layout
- Sidebar collapses on mobile (`base: 0, lg: 280px`)
- Stats cards stack: 1 column (mobile) → 2 (tablet) → 4 (desktop)
- Charts stack vertically on mobile, side-by-side on large screens

---

## 12. Security Considerations

### Current Implementation
- Admin authentication via adminId + password
- No JWT or token storage — session-based
- Passwords stored in plain text (Admin model)

### Recommended Improvements
- Hash passwords with bcrypt before storage
- Implement rate limiting on login endpoint
- Add HTTPS for production
- Sanitize user inputs to prevent XSS
- Implement CSRF protection

---

## 13. Scalability Notes

### Adding New Features
1. **New Entity**: Add Mongoose model in `backend/models/`
2. **API Routes**: Create route file in `backend/routes/`
3. **Redux Slice**: Add slice in `frontend/src/store/slices/`
4. **Page Component**: Create page in `frontend/src/pages/`
5. **Navigation**: Add route in `App.jsx` and link in `Sidebar.jsx`

### Performance Optimizations
- Use MongoDB indexes on frequently queried fields
- Implement pagination for large datasets
- Cache dashboard statistics with TTL
- Lazy load non-critical components

---

## 14. File Summary

| File | Purpose |
|------|---------|
| `backend/server.js` | Express server entry, MongoDB connection, route registration |
| `backend/models/*.js` | Mongoose schemas for all entities |
| `backend/routes/*.js` | REST API endpoints with business logic |
| `frontend/src/App.jsx` | Root component, routing, Redux/Chakra providers |
| `frontend/src/theme.js` | Chakra UI luxury theme configuration |
| `frontend/src/store/index.js` | Redux store with all slices |
| `frontend/src/components/DataTable.jsx` | Reusable table with search/filter/pagination |
| `frontend/src/pages/Dashboard.jsx` | Analytics dashboard with charts |

---

## 15. Conclusion

This project demonstrates a production-ready resort management system with:
- Clean separation of concerns (MVC pattern)
- Reusable, configurable components
- Real-time data synchronization
- Premium UI/UX with "Quiet Luxury" design
- Scalable architecture for future enhancements

The codebase is structured for easy extension—adding new resorts, room types, or reporting metrics requires minimal changes to existing code.
