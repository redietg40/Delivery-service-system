import React, { useEffect, useState } from 'react';
import './Detail.css';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';

interface HeadPhoneProps {
  types2: {
    idno2: number;
    name: string;
    imageairpod: string;
    price: number;
  }[];
  handleDetailClick: (id: number) => void;
  handleAddToToDoList: (
    id: string,
    name: string,
    quantity: number,
    imageUrl?: string,
    price?: number
  ) => void;
}

const HeadPhoneList = ({ types2, handleDetailClick, handleAddToToDoList }: HeadPhoneProps) => {
  const [selectedQuantities, setSelectedQuantities] = useState<Record<number, number>>(() => {
    const savedQuantities = localStorage.getItem('headphoneSelectedQuantities');
    return savedQuantities ? JSON.parse(savedQuantities) : {};
  });

  const navigate = useNavigate();

  const handleQuantityChange = (idno2: number, name: string, quantity: number, imageUrl: string, price: number) => {
    const updatedQuantities = {
      ...selectedQuantities,
      [idno2]: quantity,
    };
    setSelectedQuantities(updatedQuantities);

    // Save updated quantities to localStorage
    localStorage.setItem('headphoneSelectedQuantities', JSON.stringify(updatedQuantities));

    // Add to ToDoList if quantity is greater than 0
    if (quantity > 0) {
      handleAddToToDoList(idno2.toString(), name, quantity, imageUrl, price);
    }
  };

  const calculateTotalQuantity = () => {
    return Object.values(selectedQuantities).reduce((total, quantity) => total + quantity, 0);
  };

  useEffect(() => {
    localStorage.setItem('headphoneSelectedQuantities', JSON.stringify(selectedQuantities));
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
        {types2.map((type2) => (
          <div key={type2.idno2} className="detail-container">
            <img
              onClick={() => handleDetailClick(type2.idno2)}
              src={type2.imageairpod}
              alt={type2.name}
              className="detail-image"
            />
            <p className="detail-name">{type2.name}</p>
            <p className="detail-price">Price: ${type2.price}</p>
            <em>Quantity:</em>
            <input
              type="number"
              min="0"
              className="quantity-input"
              onChange={(e) =>
                handleQuantityChange(
                  type2.idno2,
                  type2.name,
                  parseInt(e.target.value) || 0,
                  type2.imageairpod,
                  type2.price
                )
              }
              value={selectedQuantities[type2.idno2] || 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeadPhoneList;