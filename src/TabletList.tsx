import React, { useState } from 'react';
import './Detail.css';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface TabletProps {
  types3: {
    idno3: number;
    name: string;
    imagetablet: string;
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

const TabletList = ({
  types3,
  handleDetailClick,
  handleAddToToDoList,
}: TabletProps) => {
  const navigate = useNavigate();
  const [selectedQuantities, setSelectedQuantities] = useState<
    Record<number, number>
  >(() => {
    const savedQuantities = localStorage.getItem('TabletSelectedQuantities');
    return savedQuantities ? JSON.parse(savedQuantities) : {};
  });

  const handleQuantityChange = (
    idno3: number,
    name: string,
    quantity: number,
    imageUrl?: string,
    price?: number
  ) => {
    const updatedQuantities = {
      ...selectedQuantities,
      [idno3]: quantity,
    };
    setSelectedQuantities(updatedQuantities);
    localStorage.setItem(
      'TabletSelectedQuantities',
      JSON.stringify(updatedQuantities)
    );
    handleAddToToDoList(idno3, name, quantity, imageUrl, price);
  };

  const calculateTotalQuantity = () => {
    return Object.values(selectedQuantities).reduce(
      (total, quantity) => total + quantity,
      0
    );
  };
  return (
    <div>
      <span className='total-quantity'>Total Quantity: {calculateTotalQuantity()}</span>
      <span className="Arrow-click" onClick={() => navigate('/ProductItem')}>
        <MdArrowBack />
      </span>
      <div className="detail-top">
        {types3.map((type3) => (
          <div key={type3.idno3} className="detail-container">
            <img
              onClick={() => handleDetailClick(type3.idno3)}
              src={type3.imagetablet}
              alt={type3.name}
              className="detail-image"
            />
            <p className="detail-name">{type3.name}</p>
            <p className="detail-price">Price: ${type3.price}</p>
            <em>Quantity:</em>
            <input
  type="number"
  min="0"
  max="12"
  className="quantity-input"
  onChange={(e) =>
    handleQuantityChange(
      type3.idno3,
      type3.name,
      parseInt(e.target.value) || 0, // Ensure the value is a number or default to 0
      type3.imagetablet,
      type3.price
    )
  }
  value={selectedQuantities[type3.idno3] || 0}
/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabletList;