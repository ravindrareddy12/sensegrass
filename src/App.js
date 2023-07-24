import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css'

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Function to fetch the items
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://sense-udhg.onrender.com/api/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    // Call the fetchItems function
    fetchItems();
  }, []);

  // Function to handle DELETE operation
  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`https://sense-udhg.onrender.com/api/items${itemId}`);
      // Remove the deleted item from the local state
      setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
      console.log('Item deleted successfully!');
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="item-list-container">
      <h2>Items</h2>
      <ul className="item-list">
        {items.map((item) => (
          <li key={item._id} className="item">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            {/* Add a button to trigger the delete operation */}
            <button className="delete-button" onClick={() => handleDelete(item._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
