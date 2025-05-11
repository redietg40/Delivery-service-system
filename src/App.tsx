"use client";
import React, { useState, useEffect } from "react"; // Ensure React is imported
import { Routes, Route } from "react-router-dom";
import ProductItem from "./ProductItem";
import Myown from "./Myown";
import PcList from "./PcList";
import MobileList from "./MobileList";
import HeadPhoneList from "./HeadPhoneList";
import TabletList from "./TabletList";
import WifiRouter from "./WifiRouter";
import BluetoothSpeakerList from "./BluetoothSpeakerList";
import DesktopList from "./DesktopList";
import GamingConsoleList from "./GamingConsoleList";
import WirelessAirbudList from "./WirelessAirbudList";
import SmartWatchList from "./SmartWatchList";
import PortableProjectList from "./PortableProjectList";
import USBCHubList from "./USBCHubList";
import ToDoList from "./ToDoList";
const items = [
  {
    id: 1,
    name: "Smartphone",
    imageurl: "src/images/smartphone.jpg",
    price: 234,
    description: "128GB storage capacity, 6GB RAM",
  },
  {
    id: 2,
    name: "Laptop",
    imageurl: "src/images/laptop.jpg",
    price: 234,
    description: "16GB RAM, 512GB SSD, 15-inch screen",
  },
  {
    id: 3,
    name: "Headphones",
    imageurl: "src/images/headphone.jpg",
    price: 234,
    description: "Wireless, Noise-cancelling",
  },
  {
    id: 4,
    name: "Tablet",
    imageurl: "src/images/tablet2image.webp",
    price: 199,
    description: "10-inch display, 64GB storage, Wi-Fi only",
  },
  {
    id: 5,
    name: "Wi-Fi Router",
    imageurl: "src/images/router.jpg",
    price: 59,
    description: "Dual-band Wi-Fi router with 4 antennas and fast speed",
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    imageurl: "src/images/bluetoothspeaker.jpg",
    price: 89,
    description: "Portable, 10-hour battery life",
  },
  {
    id: 7,
    name: "Desktop PC",
    imageurl: "src/images/desktopdevice.jpg",
    price: 599,
    description: "Intel i5, 8GB RAM, 1TB HDD",
  },
  {
    id: 8,
    name: "Gaming Console",
    imageurl: "src/images/gaminconsole.jpg",
    price: 399,
    description: "4K gaming, 1TB SSD, Wireless controller",
  },
  {
    id: 9,
    name: "Wireless Earbuds",
    imageurl: "src/images/earbud.jpg",
    price: 79,
    description: "Bluetooth 5.0, Noise isolation, Charging case",
  },
  {
    id: 10,
    name: "Smartwatch",
    imageurl: "src/images/smartwatch.jpg",
    price: 149,
    description: "Heart rate monitor, GPS, Water resistant",
  },
  {
    id: 11,
    name: "Portable Projector",
    imageurl: "src/images/projectr.jpg",
    price: 129,
    description: "Compact projector with HDMI, USB, wireless screen mirroring",
  },
  {
    id: 12,
    name: "USB-C Hub",
    imageurl: "src/images/usbhub.jpg",
    price: 49,
    description: "7-in-1 hub with HDMI, USB 3.0, SD reader, Ethernet",
  },
]

const types = [
  { idno: 1, name: "hp pc", imageurls: "src/images/hp.jpg", price: 400 },
  { idno: 2, name: "dell pc", imageurls: "src/images/dell.jpg", price: 500 },
  { idno: 3, name: "apple pc", imageurls: "src/images/apple.jpg", price: 800 },
]

const types1 = [
  { idno1: 1, name: "Camon Techno Phone", imagemobile: "src/images/camontechno.jpg", price: 250 },
  { idno1: 2, name: "iphone", imagemobile: "src/images/iphone.jpg", price: 350 },
  { idno1: 3, name: "sumsungM06", imagemobile: "src/images/samsungM06.jpg", price: 1000 },
  { idno1: 4, name: "technomobile", imagemobile: "src/images/mobilebutton.jpg", price: 200 },
]

const types2 = [
  { idno2: 1, name: "Sony WH-1000XM4", imageairpod: "src/images/sonywh1000m4.jpg", price: 350 },
  { idno2: 2, name: "BoatRockerz 450", imageairpod: "src/images/BoatRockerz 450.jpg", price: 300 },
  { idno2: 3, name: "Apple AirPods Pro", imageairpod: "src/images/appleheadphone.jpg", price: 250 },
  { idno2: 4, name: "JBL Tune 600BTNC", imageairpod: "src/images/JBLLive660NC.jpg", price: 200 },
]

const types3 = [
  { idno3: 1, name: "iPad Pro", imagetablet: "src/images/AndroidTablets.jpg", price: 999 },
  { idno3: 2, name: "Samsung Galaxy Tab", imagetablet: "src/images/SamsungGalaxyTab.jpg", price: 799 },
  { idno3: 3, name: "Microsoft Surface", imagetablet: "src/images/MicrosoftSurface.jpg", price: 899 },
  { idno3: 4, name: "Lenovo Tab", imagetablet: "src/images/lenovotab.jpg", price: 499 },
]

const types4 = [
  { idno4: 1, name: "TP-Link Archer C6", imagewifi: "src/images/TPLinkArcherC6.jpg", price: 59 },
  { idno4: 2, name: "Netgear Nighthawk", imagewifi: "src/images/NetgearNighthawk.jpg", price: 129 },
  { idno4: 3, name: "Asus RT-AX58U", imagewifi: "src/images/AsusRTAX58U.jpg", price: 199 },
  { idno4: 4, name: "Google Nest WiFi", imagewifi: "src/images/GoogleNestWiFi.jpg", price: 149 },
]

const types5 = [
  { idno5: 1, name: "JBL Flip 5", imagebluetooth: "src/images/jblflip5.jpg", price: 89 },
  { idno5: 2, name: "Sony SRS-XB13", imagebluetooth: "src/images/SonySRS-XB13.jpg", price: 59 },
  { idno5: 3, name: "Bose SoundLink Mini", imagebluetooth: "src/images/bosesoundlinkmini.jpg", price: 199 },
  { idno5: 4, name: "Anker Soundcore", imagebluetooth: "src/images/ankersoundcore.jpg", price: 49 },
]

const types6 = [
  { idno6: 1, name: "HP Desktop", imagedesktop: "src/images/HPDesktop.jpg", price: 400 },
  { idno6: 2, name: "Dell Desktop", imagedesktop: "src/images/DellDesktop.jpg", price: 500 },
  { idno6: 3, name: "Apple Desktop", imagedesktop: "src/images/AppleDesktop.jpg", price: 800 },
]

const types7 = [
  { idno7: 1, name: "PlayStation 5", imageconsole: "src/images/PlayStation 5.jpg", price: 499 },
  { idno7: 2, name: "Xbox Series X", imageconsole: "src/images/XboxSeriesX.jpg", price: 499 },
  { idno7: 3, name: "Nintendo Switch", imageconsole: "src/images/NintendoSwitch.jpg", price: 299 },
]

const types8 = [
  { idno8: 1, name: "Sony WH-1000XM4", imageairpod: "src/images/sonywh1000m4.jpg", price: 350 },
  { idno8: 2, name: "BoatRockerz 450", imageairpod: "src/images/BoatRockerz450.jpg", price: 300 },
  { idno8: 3, name: "Apple AirPods Pro", imageairpod: "src/images/appleheadphone.jpg", price: 250 },
  { idno8: 4, name: "JBL Tune 600BTNC", imageairpod: "src/images/JBLLive660NC.jpg", price: 200 },
]

const types9 = [
  { idno9: 1, name: "Apple Watch Series 7", imagesmartwatch: "src/images/AppleWatchSeries7.jpg", price: 399 },
  { idno9: 2, name: "Samsung Galaxy Watch 4", imagesmartwatch: "src/images/SamsungGalaxyWatch4.jpg", price: 299 },
  { idno9: 3, name: "Fitbit Versa 3", imagesmartwatch: "src/images/FitbitVersa3.jpg", price: 199 },
  { idno9: 4, name: "Garmin Venu 2", imagesmartwatch: "src/images/GarminVenu2.jpg", price: 349 },
]

const types10 = [
  { idno10: 1, name: "Compact Projector", imageprojector: "src/images/CompactProjector.jpg", price: 129 },
  { idno10: 2, name: "Wireless Projector", imageprojector: "src/images/WirelessProjector.jpg", price: 199 },
  { idno10: 3, name: "HD Projector", imageprojector: "src/images/HDProjector.jpg", price: 249 },
  { idno10: 4, name: "4K Projector", imageprojector: "src/images/4KProjector.jpg", price: 399 },
]

const types11 = [
  { idno11: 1, name: "7-in-1 USB-C Hub", imagehub: "src/images/7in1USBCHub.jpg", price: 49 },
  { idno11: 2, name: "10-in-1 USB-C Hub", imagehub: "src/images/10n1USBCHub.jpg", price: 69 },
  { idno11: 3, name: "Portable USB-C Hub", imagehub: "src/images/PortableUSBCHub.jpg", price: 39 },
  { idno11: 4, name: "High-Speed USB-C Hub", imagehub: "src/images/HighSpeedUSBCHub.jpg", price: 59 },
]
// Define a type for cart items
interface CartItem {
  id: number;
  name: string;
  quantity: number;
  imageUrl?: string;
  price?: number;
  deliveryDate?: string;
  category?: string; // Added category to track item type
}

// Define the App component
const App = () => {
  // State for cart items
  const [toDoItems, setToDoItems] = useState<CartItem[]>(() => {
    // Load cart items from localStorage on initial render
    const savedItems = localStorage.getItem("cartItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(toDoItems));
  }, [toDoItems]);

  // Function to add items to the cart
  const handleAddToToDoList = (
    id: number,
    name: string,
    quantity: number,
    imageUrl?: string,
    price?: number,
    category?: string
  ) => {
    if (quantity <= 0) return; // Don't add items with zero or negative quantity

    const uniqueId = category ? `${category}-${id}` : id;

    setToDoItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => (category ? `${item.category}-${item.id}` : item.id) === uniqueId
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity, // Replace quantity instead of adding to it
        };
        return updatedItems;
      } else {
        return [
          ...prevItems,
          {
            id,
            name,
            quantity,
            imageUrl,
            price,
            category,
          },
        ];
      }
    });
  };

  // Function to handle delivery date changes
  const handleDeliveryDateChange = (id: number, date: string, category?: string) => {
    setToDoItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, deliveryDate: date } : item
      )
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Myown />} />
      <Route path="/myown" element={<Myown />} />
      <Route path="/productitem" element={<ProductItem items={items} />} />
      <Route path="/PcList" element={<PcList types={types} handleDetailClick={handleDetailClick} handleAddToToDoList={(id, name, quantity, imageUrl, price) =>
              handleAddToToDoList(id, name, quantity, imageUrl, price, "pc")
            }  />} />
      <Route path="/mobileList" element={<MobileList types1={types1} handleDetailClick={handleDetailClick} 
      handleAddToToDoList={(id, name, quantity, imageUrl, price) =>
              handleAddToToDoList(id, name, quantity, imageUrl, price, "tablet")
            } />} />
      <Route path="/HeadPhoneList" element={<HeadPhoneList types2={types2} handleDetailClick={handleDetailClick} handleAddToToDoList={(id, name, quantity, imageUrl, price) => handleAddToToDoList(id, name, quantity, imageUrl, price, "headphone")  
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     />} />
      <Route
        path="/tabletList"
        element={
          <TabletList
            types3={types3}
            handleDetailClick={(id) => console.log("Tablet clicked:", id)}
            handleAddToToDoList={(id, name, quantity, imageUrl, price) =>
              handleAddToToDoList(id, name, quantity, imageUrl, price, "tablet")
            }
          />
        }
      />
      <Route path="/WifiRouter" element={<WifiRouter types4={types4} handleDetailClick={handleDetailClick}
      handleAddToToDoList={(id, name, quantity, imageUrl, price) =>
        handleAddToToDoList(id, name, quantity, imageUrl, price, 'gaming-console')
      } />} />
      <Route
        path="/BluetoothSpeakerList"
        element={
          <BluetoothSpeakerList
            types5={types5}
            handleDetailClick={(id) => console.log("Bluetooth clicked:", id)}
            handleAddToToDoList={(id, name, quantity, imageUrl, price) =>
              handleAddToToDoList(id, name, quantity, imageUrl, price, "bluetooth")
            }
          />
        }
      />
      <Route
  path="/DesktopList"
  element={
    <DesktopList
      types6={types6}
      handleDetailClick={(id) => console.log('Desktop clicked:', id)}
      handleAddToToDoList={(id, name, quantity, imageUrl, price) =>
        handleAddToToDoList(id, name, quantity, imageUrl, price, 'desktop')
      }
    />
  }
/>
<Route
  path="/GamingConsoleList"
  element={
    <GamingConsoleList
      types7={types7}
      handleDetailClick={(id) => console.log('Gaming Console clicked:', id)}
      handleAddToToDoList={(id, name, quantity, imageUrl, price) =>
        handleAddToToDoList(id, name, quantity, imageUrl, price, 'gaming-console')
      }
    />
  }
/>
      <Route
        path="/WirelessAirbudList"
        element={<WirelessAirbudList types8={types8} handleDetailClick={handleDetailClick}       handleAddToToDoList={(id, name, quantity, imageUrl, price) =>
          handleAddToToDoList(id, name, quantity, imageUrl, price, 'gaming-console')
        } />}
      />
      <Route
        path="/SmartWatchList"
        element={
          <SmartWatchList
            types9={types9}
            handleDetailClick={(id) => console.log("SmartWatch clicked:", id)}
            handleAddToToDoList={(id, name, quantity, imageUrl, price) =>
              handleAddToToDoList(id, name, quantity, imageUrl, price, 'gaming-console')
            }
          />
        }
      />
      <Route
        path="/PortableProjectList"
        element={<PortableProjectList types10={types10} handleDetailClick={handleDetailClick} handleAddToToDoList={(id, name, quantity, imageUrl, price) =>
          handleAddToToDoList(id, name, quantity, imageUrl, price, "pc")
        }  />}
      />
      <Route path="/USBCHubList" element={<USBCHubList types11={types11} handleDetailClick={handleDetailClick} 
       handleAddToToDoList={(id, name, quantity, imageUrl, price) =>
        handleAddToToDoList(id, name, quantity, imageUrl, price, 'gaming-console')
      }/>} />
      <Route
        path="/ToDoList"
        element={
          <ToDoList
          path="/ToDoList" element={<ToDoList />}
            toDoItems={toDoItems}
            handleDeliveryDateChange={(id, date, category) => handleDeliveryDateChange(id, date, category)}
            setToDoItems={setToDoItems} // Pass the setToDoItems function
          />
        }
      />
    </Routes>
  );
};

// Sample data for items and types

const handleDetailClick = (id: number) => {
  console.log("Clicked on ID:", id);
};

export default App;