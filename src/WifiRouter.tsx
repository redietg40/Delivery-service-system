import React, { useState, useEffect } from 'react';
import './Detail.css';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';

interface WifiRouterProps {
  types4: {
    idno4: number;
    name: string;
    imagewifi: string;
    price: number;
  }[];
  handleDetailClick: (id: number) => void;
  handleAddToToDoList: (id: number, name: string, quantity: number, imageUrl?: string, price?: number) => void;
}

const WifiRouter = ({ types4, handleDetailClick, handleAddToToDoList }: WifiRouterProps) => {
  const [selectedQuantities, setSelectedQuantities] = useState<Record<number, number>>(() => {
    const savedQuantities = localStorage.getItem('wifiSelectedQuantities');
    return savedQuantities ? JSON.parse(savedQuantities) : {};
  });

  const navigate = useNavigate();

  const handleQuantityChange = (idno4: number, name: string, quantity: number, imageUrl: string, price: number) => {
    const updatedQuantities = {
      ...selectedQuantities,
      [idno4]: quantity,
    };
    setSelectedQuantities(updatedQuantities);

    // Save updated quantities to localStorage
    localStorage.setItem('wifiSelectedQuantities', JSON.stringify(updatedQuantities));

    // Add to ToDoList if quantity is greater than 0
    if (quantity > 0) {
      handleAddToToDoList(idno4, name, quantity, imageUrl, price);
    }
  };

  const calculateTotalQuantity = () => {
    return Object.values(selectedQuantities).reduce((total, quantity) => total + quantity, 0);
  };

  useEffect(() => {
    // Save quantities to localStorage whenever they change
    localStorage.setItem('wifiSelectedQuantities', JSON.stringify(selectedQuantities));
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
        {types4.map((type4) => (
          <div key={type4.idno4} className="detail-container">
            <img
              onClick={() => handleDetailClick(type4.idno4)}
              src={type4.imagewifi}
              alt={type4.name}
              className="detail-image"
            />
            <p className="detail-name">{type4.name}</p>
            <p className="detail-price">Price: ${type4.price}</p>
            <em>Quantity:</em>
            <input
              type="number"
              min="0"
              className="quantity-input"
              onChange={(e) =>
                handleQuantityChange(
                  type4.idno4,
                  type4.name,
                  parseInt(e.target.value) || 0,
                  type4.imagewifi,
                  type4.price
                )
              }
              value={selectedQuantities[type4.idno4] || 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WifiRouter;