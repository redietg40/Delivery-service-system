import React, { useEffect, useState } from 'react';
import './Detail.css';
import {useNavigate} from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
interface MobileProps {
  types1: {
    idno1: number;
    name: string;
    imagemobile: string;
    price: number;
  }[];
  handleDetailClick: (id: number) => void;
  handleAddToToDoList: (id: number, name: string, quantity: number, imageUrl?: string, price?: number) => void;
}

const MobileList = ({ types1, handleDetailClick, handleAddToToDoList }: MobileProps) => {
  const [selectedQuantities, setSelectedQuantities] = useState<Record<number, number>>(() => {
    const savedQuantities = localStorage.getItem('mobileSelectedQuantities');
    return savedQuantities ? JSON.parse(savedQuantities) : {};
  });
  const navigate = useNavigate();

  const handleQuantityChange = (idno1: number, name: string, quantity: number, imageUrl: string, price: number) => {
    const updatedQuantities = {
      ...selectedQuantities,
      [idno1]: quantity,
    };
    setSelectedQuantities(updatedQuantities);

    // Save updated quantities to localStorage
    localStorage.setItem('mobileSelectedQuantities', JSON.stringify(updatedQuantities));

    // Add to ToDoList if quantity is greater than 0
    if (quantity > 0) {
      handleAddToToDoList(idno1, name, quantity, imageUrl, price);
    }
  };

  const calculateTotalQuantity = () => {
    return Object.values(selectedQuantities).reduce((total, quantity) => total + quantity, 0);
  };

  useEffect(() => {
    localStorage.setItem('mobileSelectedQuantities', JSON.stringify(selectedQuantities));
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
        {types1.map((type1) => (
          <div key={type1.idno1} className="detail-container">
            <img
              onClick={() => handleDetailClick(type1.idno1)}
              src={type1.imagemobile}
              alt={type1.name}
              className="detail-image"
            />
            <p className="detail-name">{type1.name}</p>
            <p className="detail-price">Price: ${type1.price}</p>
            <em>Quantity:</em>
            <input
              type="number"
              min="0"
              className="quantity-input"
              onChange={(e) =>
                handleQuantityChange(
                  type1.idno1,
                  type1.name,
                  parseInt(e.target.value) || 0,
                  type1.imagemobile,
                  type1.price
                )
              }
              value={selectedQuantities[type1.idno1] || 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileList;