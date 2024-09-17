import React, { useState } from 'react';
import './App.css';

function App() {
  const [waId, setWaId] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to fetch images from the backend
  const fetchImages = async () => {
    setError('');  // Reset any previous errors
    try {
      const response = await fetch(`/whatsapp/images/${waId}`);
      if (response.ok) {
        const data = await response.json();
        setImages(data.urls);  // Set the images to be displayed
      } else {
        setError('No media found for this WaId');
        setImages([]);  // Clear the images
      }
    } catch (err) {
      setError('Error fetching images');
      console.error('Error:', err);
    }
  };

  // Function to open the modal with the clicked image
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <h1>WhatsApp Image Viewer</h1>

      {/* Input for WaId */}
      <input 
        type="text" 
        value={waId}
        onChange={(e) => setWaId(e.target.value)}
        placeholder="Enter WhatsApp ID (WaId)" 
      />
      <button onClick={fetchImages}>Fetch Images</button>

      {/* Display Error if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Render the images */}
      <div className="image-gallery">
        {images.length > 0 ? (
          images.map((url, index) => (
            <img 
              key={index} 
              src={url} 
              alt={`Media ${index}`} 
              className="media-image" 
              onClick={() => handleImageClick(url)}
            />
          ))
        ) : (
          <p>No images to display</p>
        )}
      </div>

      {/* Modal for image expansion */}
      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <span className="close">&times;</span>
          <img className="modal-content" src={selectedImage} alt="Selected" />
        </div>
      )}
    </div>
  );
}

export default App;
