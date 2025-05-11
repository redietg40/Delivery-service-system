import React, { useState, useEffect } from 'react';
import './Detail.css';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface DetailProps {
  types: {
    idno: number;
    name: string;
    imageurls: string;
    price: number;
  }[];
  handleDetailClick: (id: number) => void;
  handleAddToToDoList: (id: number, name: string, quantity: number, imageUrl?: string, price?: number) => void;
}

const PcList = ({ types, handleDetailClick, handleAddToToDoList }: DetailProps) => {
  const [selectedQuantities, setSelectedQuantities] = useState<Record<number, number>>(() => {
    // Retrieve saved quantities from localStorage on component mount
    const savedQuantities = localStorage.getItem('pcSelectedQuantities');
    return savedQuantities ? JSON.parse(savedQuantities) : {};
  });

  const navigate = useNavigate();

  const handleQuantityChange = (idno: number, name: string, quantity: number, imageUrl: string, price: number) => {
    const updatedQuantities = {
      ...selectedQuantities,
      [idno]: quantity,
    };
    setSelectedQuantities(updatedQuantities);

    // Save updated quantities to localStorage
    localStorage.setItem('pcSelectedQuantities', JSON.stringify(updatedQuantities));

    // Add to ToDoList if quantity is greater than 0
    if (quantity > 0) {
      handleAddToToDoList(idno, name, quantity, imageUrl, price);
    }
  };

  const calculateTotalQuantity = () => {
    return Object.values(selectedQuantities).reduce((total, quantity) => total + quantity, 0);
  };

  useEffect(() => {
    // Save quantities to localStorage whenever they change
    localStorage.setItem('pcSelectedQuantities', JSON.stringify(selectedQuantities));
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
        {types.map((type) => (
          <div key={type.idno} className="detail-container">
            <img
              onClick={() => handleDetailClick(type.idno)}
              src={type.imageurls}
              alt={type.name}
              className="detail-image"
            />
            <p className="detail-name">{type.name}</p>
            <p className="detail-price">Price: ${type.price}</p>
            <em>Quantity:</em>
            <input
              type="number"
              min="0"
              className="quantity-input"
              onChange={(e) =>
                handleQuantityChange(
                  type.idno,
                  type.name,
                  parseInt(e.target.value) || 0,
                  type.imageurls,
                  type.price
                )
              }
              value={selectedQuantities[type.idno] || 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PcList;