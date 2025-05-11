import React, { useState, useEffect } from 'react';
import './Detail.css';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';

interface PortableProjectorProps {
  types10: {
    idno10: number;
    name: string;
    imageprojector: string;
    price: number;
  }[];
  handleDetailClick: (id: number) => void;
  handleAddToToDoList: (id: number, name: string, quantity: number, imageUrl?: string, price?: number) => void;
}

const PortableProjectList = ({ types10, handleDetailClick, handleAddToToDoList }: PortableProjectorProps) => {
  const [selectedQuantities, setSelectedQuantities] = useState<Record<number, number>>(() => {
    // Retrieve saved quantities from localStorage on component mount
    const savedQuantities = localStorage.getItem('projectorSelectedQuantities');
    return savedQuantities ? JSON.parse(savedQuantities) : {};
  });

  const navigate = useNavigate();

  const handleQuantityChange = (idno10: number, name: string, quantity: number, imageUrl: string, price: number) => {
    const updatedQuantities = {
      ...selectedQuantities,
      [idno10]: quantity,
    };
    setSelectedQuantities(updatedQuantities);

    // Save updated quantities to localStorage
    localStorage.setItem('projectorSelectedQuantities', JSON.stringify(updatedQuantities));

    // Add to ToDoList if quantity is greater than 0
    if (quantity > 0) {
      handleAddToToDoList(idno10, name, quantity, imageUrl, price);
    }
  };

  const calculateTotalQuantity = () => {
    return Object.values(selectedQuantities).reduce((total, quantity) => total + quantity, 0);
  };

  useEffect(() => {
    // Save quantities to localStorage whenever they change
    localStorage.setItem('projectorSelectedQuantities', JSON.stringify(selectedQuantities));
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
        {types10.map((type10) => (
          <div key={type10.idno10} className="detail-container">
            <img
              onClick={() => handleDetailClick(type10.idno10)}
              src={type10.imageprojector}
              alt={type10.name}
              className="detail-image"
            />
            <p className="detail-name">{type10.name}</p>
            <p className="detail-price">Price: ${type10.price}</p>
            <em>Quantity:</em>
            <input
              type="number"
              min="0"
              className="quantity-input"
              onChange={(e) =>
                handleQuantityChange(
                  type10.idno10,
                  type10.name,
                  parseInt(e.target.value) || 0,
                  type10.imageprojector,
                  type10.price
                )
              }
              value={selectedQuantities[type10.idno10] || 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortableProjectList;