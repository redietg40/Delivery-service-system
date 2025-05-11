import { useState, ChangeEvent } from 'react';
import './productitem.css';
import React from 'react';
import { BsSearch, BsArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { PiGreaterThanLight } from "react-icons/pi";
import { FiShoppingCart } from "react-icons/fi";

interface ProductItemProps {
  items: {
    id: number;
    name: string;
    description: string;
    imageurl: string;
    price: number;
  }[];
}

const messages = [
  "Welcome to TechExpress!",
  "Your one-stop shop for all things tech.",
  "Find gadgets, setup help, and recycling services.",
  "Enjoy same-day delivery for your convenience.",
  "Explore our services for a seamless tech experience."
];

const ProductItem = ({ items }: ProductItemProps) => {
  const clickArrow = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDetailClick = (itemId: number) => {
    const routes = [
      '/mobileList', '/PcList', '/HeadPhoneList', '/TabletList', '/WifiRouter',
      '/BluetoothSpeakerList', '/DesktopList', '/GamingConsoleList', '/WirelessAirbudList',
      '/SmartWatchList', '/PortableProjectList', '/USBCHubList'
    ];
    if (itemId >= 1 && itemId <= routes.length) {
      clickArrow(routes[itemId - 1]);
    }
  };

  const handleIconClick = () => {
    setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
  };

  return (
    <section className="background">
        <h2 className="background-text">{messages[currentMessageIndex]}</h2>
      
      <div className='tochange' onClick={handleIconClick}>
        <PiGreaterThanLight  className='greaterthan'/>
      </div>
      <div className="top">
        <span className='arrow' onClick={() => { clickArrow('/myown') }}>
          <BsArrowLeftCircleFill />
        </span>
        <div className="search-wrapper">
          <BsSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="searchbar"
          />
        </div>
        <span className='carts-quantity' onClick={() => {
          clickArrow('/ToDoList');
        }}><FiShoppingCart className='cart-icons' /></span>
      </div>

      <form className="thewhole">
        {filteredItems.map((item) => (
          <div key={item.id} className="product-item">
            <div>
              <img src={item.imageurl} alt={item.name} className="image-item" />
            </div>
            <label>
              <input type="checkbox" />
              <strong>{item.name}</strong>
               <p></p>
              <button
                className='detail'
                onClick={() => {
                  handleDetailClick(item.id);
                }}
              >
                select items
              </button>
            </label>
          </div>
        ))}
      </form>
    </section>
  );
};

export default ProductItem;