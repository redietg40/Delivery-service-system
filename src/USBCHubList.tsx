import React, { useState, useEffect } from 'react';
import './Detail.css';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface USBCHubProps {
  types11: {
    idno11: number;
    name: string;
    imagehub: string;
    price: number;
  }[];
  handleDetailClick: (id: number) => void;
  handleAddToToDoList: (id: number, name: string, quantity: number, imageUrl?: string, price?: number) => void;
}

const USBCHubList = ({ types11, handleDetailClick, handleAddToToDoList }: USBCHubProps) => {
  const [selectedQuantities, setSelectedQuantities] = useState<Record<number, number>>(() => {
    const savedQuantities = localStorage.getItem('USBHubSelectedQuantities');
    return savedQuantities ? JSON.parse(savedQuantities) : {};
  });

  const navigate = useNavigate();

  const handleQuantityChange = (idno11: number, name: string, quantity: number, imageUrl: string, price: number) => {
    const updatedQuantities = {
      ...selectedQuantities,
      [idno11]: quantity,
    };
    setSelectedQuantities(updatedQuantities);

    // Save updated quantities to localStorage
    localStorage.setItem('USBHubSelectedQuantities', JSON.stringify(updatedQuantities));

    // Add to ToDoList if quantity is greater than 0
    if (quantity > 0) {
      handleAddToToDoList(idno11, name, quantity, imageUrl, price);
    }
  };

  const calculateTotalQuantity = () => {
    return Object.values(selectedQuantities).reduce((total, quantity) => total + quantity, 0);
  };

  useEffect(() => {
    // Save quantities to localStorage whenever they change
    localStorage.setItem('USBHubSelectedQuantities', JSON.stringify(selectedQuantities));
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
        {types11.map((type11) => (
          <div key={type11.idno11} className="detail-container">
            <img
              onClick={() => handleDetailClick(type11.idno11)}
              src={type11.imagehub}
              alt={type11.name}
              className="detail-image"
            />
            <p className="detail-name">{type11.name}</p>
            <p className="detail-price">Price: ${type11.price}</p>
            <em>Quantity:</em>
            <input
              type="number"
              min="0"
              className="quantity-input"
              onChange={(e) =>
                handleQuantityChange(
                  type11.idno11,
                  type11.name,
                  parseInt(e.target.value) || 0,
                  type11.imagehub,
                  type11.price
                )
              }
              value={selectedQuantities[type11.idno11] || 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default USBCHubList;