/* eslint-disable */
import React from 'react';
import '../modelc/Model.css';

const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Notice</h2>
        <p>{message}</p>
        <button onClick={onClose}
        style={{
          backgroundColor: '#007bff', // Blue background color
          color: 'white', // White text color
          padding: '10px 20px', // Padding for better size
          border: 'none', // No border
          borderRadius: '5px', // Rounded corners
          fontSize: '16px', // Font size
          cursor: 'pointer', // Pointer cursor on hover
          transition: 'background-color 0.3s ease', // Smooth transition on hover
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')} // Darker blue on hover
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007bff')} // Original blue on mouse leave
      >
        
      
        Close</button>
      </div>
    </div>
  );
};

export default Modal;
