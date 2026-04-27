const mongoose = require('mongoose');
require('dotenv').config();

const Resort = require('./models/Resort');
const Room = require('./models/Room');
const Customer = require('./models/Customer');
const Booking = require('./models/Booking');
const Event = require('./models/Event');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Resort.deleteMany({});
    await Room.deleteMany({});
    await Customer.deleteMany({});
    await Booking.deleteMany({});
    await Event.deleteMany({});
    console.log('Cleared existing data');

    // Create Resorts
    const resorts = await Resort.insertMany([
      {
        name: 'Yash Resort Bhandardara',
        location: 'Bhandardara, Maharashtra',
        description: 'Nestled amidst the Sahyadri mountain range, Yash Resort offers a serene escape with stunning lake views and lush greenery.',
        totalRooms: 30,
        amenities: ['Swimming Pool', 'Restaurant', 'Spa', 'Lake View', 'Bonfire Area', 'Adventure Sports'],
        rating: 4.7,
        contactEmail: 'info@yashresort.com',
        contactPhone: '+91 9876543210',
        status: 'Active',
      },
      {
        name: 'Ashoka Sarovar Portico',
        location: 'Nashik, Maharashtra',
        description: 'A premium business and leisure hotel offering world-class amenities, fine dining, and exceptional hospitality in the wine capital of India.',
        totalRooms: 45,
        amenities: ['Conference Hall', 'Fine Dining', 'Gym', 'Rooftop Bar', 'Valet Parking', 'Banquet Hall'],
        rating: 4.5,
        contactEmail: 'reservations@ashokasarovar.com',
        contactPhone: '+91 9876543211',
        status: 'Active',
      },
      {
        name: 'The Grand Mahabaleshwar',
        location: 'Mahabaleshwar, Maharashtra',
        description: 'An exclusive hilltop retreat with panoramic valley views, offering luxury suites and curated experiences amidst nature.',
        totalRooms: 25,
        amenities: ['Infinity Pool', 'Valley View', 'Private Dining', 'Yoga Deck', 'Nature Trails', 'Library'],
        rating: 4.8,
        contactEmail: 'stay@grandmahabaleshwar.com',
        contactPhone: '+91 9876543212',
        status: 'Active',
      },
    ]);
    console.log('Created 3 resorts');

    // Create Rooms
    const roomCategories = ['Classic', 'Executive', 'Villa', 'Suite'];
    const roomPrices = { Classic: 3500, Executive: 5500, Villa: 12000, Suite: 8500 };
    const allRooms = [];

    for (const resort of resorts) {
      let roomNum = 101;
      for (const cat of roomCategories) {
        const count = cat === 'Classic' ? 4 : cat === 'Executive' ? 3 : 2;
        for (let i = 0; i < count; i++) {
          allRooms.push({
            resort: resort._id,
            roomNumber: String(roomNum++),
            category: cat,
            price: roomPrices[cat] + Math.floor(Math.random() * 1000),
            capacity: cat === 'Villa' ? 6 : cat === 'Suite' ? 4 : 2,
            amenities: ['WiFi', 'AC', 'TV', 'Mini Bar'],
            status: Math.random() > 0.3 ? 'Available' : 'Booked',
            description: `${cat} room at ${resort.name}`,
          });
        }
      }
    }
    const rooms = await Room.insertMany(allRooms);
    console.log(`Created ${rooms.length} rooms`);

    // Create Customers
    const customers = await Customer.insertMany([
      { name: 'Rajesh Sharma', email: 'rajesh.sharma@gmail.com', phone: '+91 9812345670', checkIn: new Date('2026-03-15'), checkOut: new Date('2026-03-18'), adults: 2, children: 1, roomType: 'Suite', roomCount: 1, specialRequests: 'Late check-in requested' },
      { name: 'Priya Patel', email: 'priya.patel@outlook.com', phone: '+91 9812345671', checkIn: new Date('2026-04-01'), checkOut: new Date('2026-04-03'), adults: 2, children: 0, roomType: 'Deluxe', roomCount: 1, specialRequests: '' },
      { name: 'Amit Deshmukh', email: 'amit.d@yahoo.com', phone: '+91 9812345672', checkIn: new Date('2026-03-20'), checkOut: new Date('2026-03-25'), adults: 2, children: 2, roomType: 'Villa', roomCount: 2, specialRequests: 'Extra mattress needed' },
      { name: 'Sneha Kulkarni', email: 'sneha.k@gmail.com', phone: '+91 9812345673', checkIn: new Date('2026-04-10'), checkOut: new Date('2026-04-12'), adults: 1, children: 0, roomType: 'Standard', roomCount: 1, specialRequests: '' },
      { name: 'Vikram Singh', email: 'vikram.singh@hotmail.com', phone: '+91 9812345674', checkIn: new Date('2026-05-01'), checkOut: new Date('2026-05-05'), adults: 4, children: 1, roomType: 'Executive', roomCount: 2, specialRequests: 'Early check-in if possible' },
      { name: 'Ananya Joshi', email: 'ananya.j@gmail.com', phone: '+91 9812345675', checkIn: new Date('2026-04-15'), checkOut: new Date('2026-04-17'), adults: 2, children: 1, roomType: 'Deluxe', roomCount: 1, specialRequests: 'High floor room preferred' },
      { name: 'Rohan Mehta', email: 'rohan.mehta@gmail.com', phone: '+91 9812345676', checkIn: new Date('2026-03-28'), checkOut: new Date('2026-03-30'), adults: 2, children: 0, roomType: 'Suite', roomCount: 1, specialRequests: '' },
      { name: 'Kavita Reddy', email: 'kavita.r@outlook.com', phone: '+91 9812345677', checkIn: new Date('2026-05-10'), checkOut: new Date('2026-05-13'), adults: 3, children: 2, roomType: 'Villa', roomCount: 2, specialRequests: 'Celebrating anniversary' },
    ]);
    console.log(`Created ${customers.length} customers`);

    // Create Bookings (across last 6 months)
    const bookingData = [];
    const statuses = ['Pending', 'Confirmed', 'Checked-In', 'Checked-Out'];
    const paymentStatuses = ['Paid', 'Paid', 'Paid', 'Pending', 'Partial'];

    for (let m = 5; m >= 0; m--) {
      const count = 3 + Math.floor(Math.random() * 5);
      for (let i = 0; i < count; i++) {
        const resort = resorts[Math.floor(Math.random() * resorts.length)];
        const resortRooms = rooms.filter(r => r.resort.toString() === resort._id.toString());
        const room = resortRooms[Math.floor(Math.random() * resortRooms.length)];
        const customer = customers[Math.floor(Math.random() * customers.length)];
        const d = new Date();
        d.setMonth(d.getMonth() - m);
        d.setDate(1 + Math.floor(Math.random() * 25));
        const checkIn = new Date(d);
        const checkOut = new Date(d);
        checkOut.setDate(checkOut.getDate() + 2 + Math.floor(Math.random() * 4));
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

        bookingData.push({
          resort: resort._id,
          room: room._id,
          customer: customer._id,
          checkIn,
          checkOut,
          guests: customer.adults + customer.children,
          totalAmount: room.price * nights,
          paymentStatus: paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
          bookingStatus: m === 0 ? statuses[Math.floor(Math.random() * 3)] : 'Checked-Out',
          createdAt: checkIn,
        });
      }
    }
    const bookings = await Booking.insertMany(bookingData);
    console.log(`Created ${bookings.length} bookings`);

    // Create Events
    const events = await Event.insertMany([
      { name: 'Sharma-Patel Wedding', type: 'Wedding', resort: resorts[0]._id, date: new Date('2026-05-15'), endDate: new Date('2026-05-17'), guestCount: 350, organizer: 'Rajesh Sharma', contactPhone: '+91 9812345670', budget: 2500000, status: 'Upcoming' },
      { name: 'TechCorp Annual Meet', type: 'Corporate', resort: resorts[1]._id, date: new Date('2026-05-10'), endDate: new Date('2026-05-11'), guestCount: 120, organizer: 'TechCorp Solutions', contactEmail: 'events@techcorp.com', budget: 800000, status: 'Upcoming' },
      { name: 'Sneha\'s 30th Birthday', type: 'Birthday', resort: resorts[2]._id, date: new Date('2026-06-20'), guestCount: 50, organizer: 'Amit Deshmukh', contactPhone: '+91 9812345672', budget: 150000, status: 'Upcoming' },
      { name: 'Wine & Dine Conference', type: 'Conference', resort: resorts[1]._id, date: new Date('2026-04-28'), endDate: new Date('2026-04-30'), guestCount: 200, organizer: 'Nashik Wine Association', budget: 500000, status: 'Upcoming' },
      { name: 'Joshi Family Function', type: 'Function', resort: resorts[0]._id, date: new Date('2026-04-05'), guestCount: 80, organizer: 'Ananya Joshi', contactPhone: '+91 9812345675', budget: 200000, status: 'Completed' },
    ]);
    console.log(`Created ${events.length} events`);

    console.log('\n✅ Database seeded successfully!');
    console.log(`   ${resorts.length} Resorts`);
    console.log(`   ${rooms.length} Rooms`);
    console.log(`   ${customers.length} Customers`);
    console.log(`   ${bookings.length} Bookings`);
    console.log(`   ${events.length} Events`);

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();
