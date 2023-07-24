import React, { useState } from 'react';
import axios from 'axios';
import './Post.css'


const ItemForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your backend API
      const response = await axios.post('http://localhost:3000/api/items/', formData);

      // Handle the response or display a success message to the user
      console.log('Item saved successfully!', response.data);

      // Clear the form after submission
      setFormData({ name: '', description: '', price: '' });
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Add Item</button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
