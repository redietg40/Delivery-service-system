import React, { useState, useEffect } from 'react';
import './Detail.css';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';

interface WirelessAirbudProps {
  types8: {
    idno8: number;
    name: string;
    imageairpod: string;
    price: number;
  }[];
  handleDetailClick: (id: number) => void;
  handleAddToToDoList: (id: number, name: string, quantity: number, imageUrl?: string, price?: number) => void;
}

const WirelessAirbudList = ({ types8, handleDetailClick, handleAddToToDoList }: WirelessAirbudProps) => {
  const [selectedQuantities, setSelectedQuantities] = useState<Record<number, number>>(() => {
    const savedQuantities = localStorage.getItem('wirelessAirbudSelectedQuantities');
    return savedQuantities ? JSON.parse(savedQuantities) : {};
  });

  const navigate = useNavigate();

  const handleQuantityChange = (idno8: number, name: string, quantity: number, imageUrl: string, price: number) => {
    const updatedQuantities = {
      ...selectedQuantities,
      [idno8]: quantity,
    };
    setSelectedQuantities(updatedQuantities);

    // Save updated quantities to localStorage
    localStorage.setItem('wirelessAirbudSelectedQuantities', JSON.stringify(updatedQuantities));

    // Add to ToDoList if quantity is greater than 0
    if (quantity > 0) {
      handleAddToToDoList(idno8, name, quantity, imageUrl, price);
    }
  };

  const calculateTotalQuantity = () => {
    return Object.values(selectedQuantities).reduce((total, quantity) => total + quantity, 0);
  };

  useEffect(() => {
    // Save quantities to localStorage whenever they change
    localStorage.setItem('wirelessAirbudSelectedQuantities', JSON.stringify(selectedQuantities));
  }, [selectedQuantities]);

  return (
    <div>
      <span className='total-quantity'>Total Quantity: {calculateTotalQuantity()}</span>
      <span
        className="Arrow-click"
        onClick={() => {
          navigate('/ProductItem');
        }}
      >
        <MdArrowBack />
      </span>
      <div className="detail-top">
        {types8.map((type8) => (
          <div key={type8.idno8} className="detail-container">
            <img
              onClick={() => handleDetailClick(type8.idno8)}
              src={type8.imageairpod}
              alt={type8.name}
              className="detail-image"
            />
            <p className="detail-name">{type8.name}</p>
            <p className="detail-price">Price: ${type8.price}</p>
            <em>Quantity:</em>
            <input
              type="number"
              min="0"
              className="quantity-input"
              onChange={(e) =>
                handleQuantityChange(
                  type8.idno8,
                  type8.name,
                  parseInt(e.target.value) || 0,
                  type8.imageairpod,
                  type8.price
                )
              }
              value={selectedQuantities[type8.idno8] || 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WirelessAirbudList;