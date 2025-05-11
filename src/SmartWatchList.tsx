import React, { useState, useEffect } from 'react';
import './Detail.css';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface SmartWatchProps {
  types9: {
    idno9: number;
    name: string;
    imagesmartwatch: string;
    price: number;
  }[];
  handleDetailClick: (id: number) => void;
  handleAddToToDoList: (id: number, name: string, quantity: number, imageUrl?: string, price?: number) => void;
}

const SmartWatchList = ({ types9, handleDetailClick, handleAddToToDoList }: SmartWatchProps) => {
  const [selectedQuantities, setSelectedQuantities] = useState<Record<number, number>>(() => {
    const savedQuantities = localStorage.getItem('SmartWatchSelectedQuantities');
    return savedQuantities ? JSON.parse(savedQuantities) : {};
  });

  const navigate = useNavigate();

  const handleQuantityChange = (idno9: number, name: string, quantity: number, imageUrl: string, price: number) => {
    const updatedQuantities = {
      ...selectedQuantities,
      [idno9]: quantity,
    };
    setSelectedQuantities(updatedQuantities);

    // Save updated quantities to localStorage
    localStorage.setItem('SmartWatchSelectedQuantities', JSON.stringify(updatedQuantities));

    // Add to ToDoList if quantity is greater than 0
    if (quantity > 0) {
      handleAddToToDoList(idno9, name, quantity, imageUrl, price);
    }
  };

  const calculateTotalQuantity = () => {
    return Object.values(selectedQuantities).reduce((total, quantity) => total + quantity, 0);
  };

  useEffect(() => {
    // Save quantities to localStorage whenever they change
    localStorage.setItem('SmartWatchSelectedQuantities', JSON.stringify(selectedQuantities));
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
        {types9.map((type9) => (
          <div key={type9.idno9} className="detail-container">
            <img
              onClick={() => handleDetailClick(type9.idno9)}
              src={type9.imagesmartwatch}
              alt={type9.name}
              className="detail-image"
            />
            <p className="detail-name">{type9.name}</p>
            <p className="detail-price">Price: ${type9.price}</p>
            <em>Quantity:</em>
            <input
              type="number"
              min="0"
              className="quantity-input"
              onChange={(e) =>
                handleQuantityChange(
                  type9.idno9,
                  type9.name,
                  parseInt(e.target.value) || 0,
                  type9.imagesmartwatch,
                  type9.price
                )
              }
              value={selectedQuantities[type9.idno9] || 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartWatchList;