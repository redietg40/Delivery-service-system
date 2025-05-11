import React, { useState, useEffect } from 'react';
import './Detail.css';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface DesktopProps {
  types6: {
    idno6: number;
    name: string;
    imagedesktop: string;
    price: number;
  }[];
  handleDetailClick: (id: number) => void;
  handleAddToToDoList: (
    id: number,
    name: string,
    quantity: number,
    imageUrl?: string,
    price?: number
  ) => void;
}

const DesktopList = ({
  types6,
  handleDetailClick,
  handleAddToToDoList,
}: DesktopProps) => {
  const [selectedQuantities, setSelectedQuantities] = useState<Record<number, number>>(() => {
    const savedQuantities = localStorage.getItem('desktopSelectedQuantities');
    return savedQuantities ? JSON.parse(savedQuantities) : {};
  });

  const navigate = useNavigate();

  const handleQuantityChange = (
    idno6: number,
    name: string,
    quantity: number,
    imageUrl?: string,
    price?: number
  ) => {
    const updatedQuantities = {
      ...selectedQuantities,
      [idno6]: quantity,
    };
    setSelectedQuantities(updatedQuantities);

    // Save updated quantities to localStorage
    localStorage.setItem('desktopSelectedQuantities', JSON.stringify(updatedQuantities));

    // Add to ToDoList if quantity is greater than 0
    if (quantity > 0) {
      handleAddToToDoList(idno6, name, quantity, imageUrl, price);
    }
  };

  const calculateTotalQuantity = () => {
    return Object.values(selectedQuantities).reduce((total, quantity) => total + quantity, 0);
  };

  useEffect(() => {
    // Save quantities to localStorage whenever they change
    localStorage.setItem('desktopSelectedQuantities', JSON.stringify(selectedQuantities));
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
        {types6.map((type6) => (
          <div key={type6.idno6} className="detail-container">
            <img
              onClick={() => handleDetailClick(type6.idno6)}
              src={type6.imagedesktop}
              alt={type6.name}
              className="detail-image"
            />
            <p className="detail-name">{type6.name}</p>
            <p className="detail-price">Price: ${type6.price}</p>
            <em>Quantity:</em>
            <input
              type="number"
              min="0"
              className="quantity-input"
              onChange={(e) =>
                handleQuantityChange(
                  type6.idno6,
                  type6.name,
                  parseInt(e.target.value) || 0, // Ensure the value is a number or default to 0
                  type6.imagedesktop,
                  type6.price
                )
              }
              value={selectedQuantities[type6.idno6] || 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopList;