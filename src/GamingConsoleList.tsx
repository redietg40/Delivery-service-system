import React, { useEffect, useState } from 'react';
import './Detail.css';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';

interface GamingConsoleProps {
  types7: {
    idno7: number;
    name: string;
    imageconsole: string;
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

const GamingConsoleList = ({ types7, handleDetailClick, handleAddToToDoList }: GamingConsoleProps) => {
  const [selectedQuantities, setSelectedQuantities] = useState<Record<number, number>>(() => {
    const savedQuantities = localStorage.getItem('gamingConsoleSelectedQuantities');
    return savedQuantities ? JSON.parse(savedQuantities) : {};
  });

  const navigate = useNavigate();

  const handleQuantityChange = (idno7: number, name: string, quantity: number, imageUrl: string, price: number) => {
    const updatedQuantities = {
      ...selectedQuantities,
      [idno7]: quantity,
    };
    setSelectedQuantities(updatedQuantities);

    // Save updated quantities to localStorage
    localStorage.setItem('gamingConsoleSelectedQuantities', JSON.stringify(updatedQuantities));

    // Add to ToDoList if quantity is greater than 0
    if (quantity > 0) {
      handleAddToToDoList(idno7, name, quantity, imageUrl, price);
    }
  };

  const calculateTotalQuantity = () => {
    return Object.values(selectedQuantities).reduce((total, quantity) => total + quantity, 0);
  };

  useEffect(() => {
    localStorage.setItem('gamingConsoleSelectedQuantities', JSON.stringify(selectedQuantities));
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
        {types7.map((type7) => (
          <div key={type7.idno7} className="detail-container">
            <img
              onClick={() => handleDetailClick(type7.idno7)}
              src={type7.imageconsole}
              alt={type7.name}
              className="detail-image"
            />
            <p className="detail-name">{type7.name}</p>
            <p className="detail-price">Price: ${type7.price}</p>
            <em>Quantity:</em>
            <input
              type="number"
              min="1"
              className="quantity-input"
              onChange={(e) =>
                handleQuantityChange(
                  type7.idno7,
                  type7.name,
                  parseInt(e.target.value) || 0,
                  type7.imageconsole,
                  type7.price
                )
              }
              value={selectedQuantities[type7.idno7] || 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamingConsoleList;