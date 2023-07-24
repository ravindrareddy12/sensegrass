import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Update.css'

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [updatedItem, setUpdatedItem] = useState({});

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

  // Function to handle PUT (Update) operation
  const handleUpdate = async (itemId) => {
    try {
      await axios.put(`https://sense-udhg.onrender.com/api/items${itemId}`, updatedItem);
      // Refresh the items list after successful update
      setUpdatedItem({});
      console.log('Item updated successfully!');
    } catch (error) {
      console.error('Error updating item:', error);
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
            <div className="update-form">
              {/* Add input fields for updating item */}
              <input
                type="text"
                value={updatedItem.name || ''}
                onChange={(e) => setUpdatedItem({ ...updatedItem, name: e.target.value })}
                placeholder="Update Name"
              />
              <input
                type="text"
                value={updatedItem.description || ''}
                onChange={(e) => setUpdatedItem({ ...updatedItem, description: e.target.value })}
                placeholder="Update Description"
              />
              <input
                type="number"
                value={updatedItem.price || ''}
                onChange={(e) => setUpdatedItem({ ...updatedItem, price: e.target.value })}
                placeholder="Update Price"
              />
              {/* Add a button to trigger the update operation */}
              <button onClick={() => handleUpdate(item._id)}>Update</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
