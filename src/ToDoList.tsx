import React, { useState } from "react";
import "./ToDoList.css";
import { useNavigate } from "react-router-dom";

interface ToDoItem {
  id: string; // Changed from number to string for uniqueness
  name: string;
  quantity: number;
  imageUrl?: string;
  price: number;
  deliveryDate?: string;
}

interface ToDoListProps {
  toDoItems: ToDoItem[];
  handleDeliveryDateChange: (id: string, date: string) => void;
  setToDoItems: React.Dispatch<React.SetStateAction<ToDoItem[]>>;
}

const ToDoList = ({ toDoItems, handleDeliveryDateChange, setToDoItems }: ToDoListProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const clickArrows = useNavigate();

  const handleSubmit = () => {
    const hasMissingDates = toDoItems.some((item) => !item.deliveryDate);
    if (hasMissingDates) {
      alert("You must select a delivery date for all items before submitting.");
      return;
    }

    setIsSubmitted(true);
    setToDoItems([]);
    localStorage.removeItem("cartItems");
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const handleDelete = (id: string) => {
    const itemExists = toDoItems.some((item) => item.id === id);
    if (!itemExists) {
      console.error(`Item with id ${id} does not exist.`);
      return;
    }

    const updatedItems = toDoItems.filter((item) => item.id !== id);
    setToDoItems([...updatedItems]);

    try {
      if (updatedItems.length > 0) {
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      } else {
        localStorage.removeItem("cartItems");
      }
    } catch (error) {
      console.error("Error updating localStorage:", error);
    }

    console.log("Updated Items:", updatedItems);
  };

  return (
    <div>
      <div className="todo-container">
        <h2 className="cart-summery" onClick={() => clickArrows("/ProductItem")}>
          Cart Summary
        </h2>
        {isSubmitted ? (
          <p className={`submission-message ${showMessage ? "show" : ""}`}>
            Thank you! Your order has been submitted.
          </p>
        ) : (
          <div className="toList">
            {toDoItems.length === 0 ? (
              <p className="noselected">Please select an item.</p>
            ) : (
              toDoItems.map((item) => (
                <div key={item.id} className="todo-item">
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.name} className="item-image" />
                  )}
                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">Price: ${item.price}</span>
                    <span className="item-quantity">
                      Quantity:<span className="quantity"> {item.quantity}</span>
                    </span>
                    <div>
                      <span className="delivery-name">Delivery Date: </span>
                      <span className="date">{item.deliveryDate || "Not selected"}</span>
                      <div>
                        <span className="choose">Choose delivery option</span>
                        <input
                          type="date"
                          className="date-input"
                          onChange={(e) => handleDeliveryDateChange(item.id, e.target.value)}
                          value={item.deliveryDate || ""}
                        />
                      </div>
                    </div>
                  </div>
                  <button className="delete-button" onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        )}
        {!isSubmitted && (
          <button className="summery-button" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default ToDoList;
