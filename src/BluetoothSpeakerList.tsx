import React, { useState,useEffect } from 'react';
import './Detail.css';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface BluetoothSpeakerProps {
  types5: {
    idno5: number;
    name: string;
    imagebluetooth: string;
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
const BluetoothSpeakerList = ({
  types5,
  handleDetailClick,
  handleAddToToDoList,
}: BluetoothSpeakerProps) => {
  const navigate = useNavigate();
  const [selectedQuantities, setSelectedQuantities] = useState< Record<number, number>>(() => {
    const savedQuantities = localStorage.getItem('BluetoothSelectedQuantities');
    return savedQuantities ? JSON.parse(savedQuantities) : {};
  });
   useEffect(() => {
      // Save quantities to localStorage whenever they change
      localStorage.setItem('BluetoothSelectedQuantities', JSON.stringify(selectedQuantities));
    }, [selectedQuantities]);

  const handleQuantityChange = (
    idno5: number,
    name: string,
    quantity: number,
    imageUrl?: string,
    price?: number
  ) => {
    const updatedQuantities = {
      ...selectedQuantities,
      [idno5]: quantity,
    };
    setSelectedQuantities(updatedQuantities);
    localStorage.setItem(
      'BluetoothSelectedQuantities',
      JSON.stringify(updatedQuantities)
    );

    // Ensure the `handleAddToToDoList` function is called correctly
    if (quantity > 0) {
      handleAddToToDoList(idno5, name, quantity, imageUrl, price);
    }
  };
  useEffect(() => {
      localStorage.setItem('desktopSelectedQuantities', JSON.stringify(selectedQuantities));
    }, [selectedQuantities]);

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
        {types5.map((type5) => (
          <div key={type5.idno5} className="detail-container">
            <img
              onClick={() => handleDetailClick(type5.idno5)}
              src={type5.imagebluetooth}
              alt={type5.name}
              className="detail-image"
            />
            <p className="detail-name">{type5.name}</p>
            <p className="detail-price">Price: ${type5.price}</p>
            <em>Quantity:</em>
           <input
  type="number"
  min="0"
  className="quantity-input"
  onChange={(e) =>
    handleQuantityChange(
      type5.idno5,
      type5.name,
      parseInt(e.target.value) || 0, // Ensure the value is a number or default to 0
      type5.imagebluetooth,
      type5.price
    )
  }
  value={selectedQuantities[type5.idno5] || 0}
/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BluetoothSpeakerList;