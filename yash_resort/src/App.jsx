import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import YashResort from './components/YashResort'
import About from './components/About'
import Contact from './components/Contact'
import Gallery from './components/Gallery'
import Rooms from './components/Rooms'
import RoomDetails from './components/RoomDetails'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollToTop from './components/ScrollToTop'


import { ChakraProvider } from '@chakra-ui/react';
import BookingTheme from './components/BookingForm/BookingTheme';

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<YashResort />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:roomId" element={<RoomDetails />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default App
