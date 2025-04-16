//import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductItem from './ProductItem';
import Myown from './Myown';
const items = [
    {  id:1,
      name: "Smartphone",
      imageurl:'src/images/smartphone.jpg',
      price: 234,
      description: "128GB storage capacity, 6GB RAM"

    },
    { id:2, 
      name: "Laptop",
      imageurl:'src/images/laptop.jpg',
      price: 234,
      description: "16GB RAM, 512GB SSD, 15-inch screen"
    },
    {  id:3,
      name: "Headphones",
      imageurl:'src/images/headphone.jpg',
      price: 234,
      description: "Wireless, Noise-cancelling"
    },
    {
      id: 4,
      name: "Tablet",
      imageurl: 'src/images/tablet 2image.webp',
      price: 199,
      description: "10-inch display, 64GB storage, Wi-Fi only"
    },
    {
      id: 5,
      name: "Wi-Fi Router",
      imageurl: 'src/images/router.jpg',
      price: 59,
      description: "Dual-band Wi-Fi router with 4 antennas and fast speed"
    
    },
    {
      id: 6,
      name: "Bluetooth Speaker",
      imageurl: 'src/images/bluetooth speaker.jpg',
      price: 89,
      description: "Portable, 10-hour battery life"
    },
    {
      id: 7,
      name: "Desktop PC",
      imageurl: 'src/images/desktop device.jpg',
      price: 599,
      description: "Intel i5, 8GB RAM, 1TB HDD"
    },
    {
      id: 8,
      name: "Gaming Console",
      imageurl: 'src/images/gamin console.jpg',
      price: 399,
      description: "4K gaming, 1TB SSD, Wireless controller"
    },
    {
      id: 9,
      name: "Wireless Earbuds",
      imageurl: 'src/images/earbud.jpg',
      price: 79,
      description: "Bluetooth 5.0, Noise isolation, Charging case"
    },{
    id: 10,
    name: "Smartwatch",
    imageurl: 'src/images/smartwatch.jpg',
    price: 149,
    description: "Heart rate monitor, GPS, Water resistant"
  },
  {
    id: 21,
    name: "Portable Projector",
    imageurl: 'src/images/projectr.jpg',
    price: 129,
    description: "Compact portable projector with HDMI, USB, and wireless screen mirroring"
  },
  {
    id: 18,
    name: "USB-C Hub",
    imageurl: 'src/images/usb hub.jpg',
    price: 49,
    description: "7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and Ethernet"
  }
  
    
  ];
  const App = () => {
    return (
      <Routes>
      <Route path="/" element={<Myown />} />
      <Route path="/myown" element={<Myown />} />
      <Route path="/productitem" element={<ProductItem items={items} />} />
    </Routes>
    );
  };
  export default App;