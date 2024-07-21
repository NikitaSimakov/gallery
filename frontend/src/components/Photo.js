import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Photo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_DIRECTUS_URL}/items/photos/${id}`)
      .then(response => setPhoto(response.data.data))
      .catch(error => console.error('Error fetching photo:', error));

    axios.get(`${process.env.REACT_APP_DIRECTUS_URL}/items/photos`)
      .then(response => setPhotos(response.data.data))
      .catch(error => console.error('Error fetching photos:', error));
  }, [id]);

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setCurrentIndex(prevIndex);
    navigate(`/photo/${photos[prevIndex].id}`);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % photos.length;
    setCurrentIndex(nextIndex);
    navigate(`/photo/${photos[nextIndex].id}`);
  };

  if (!photo) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={() => navigate(`/album/${photo.album}`)}>Back to Album</button>
      <h1>{photo.title}</h1>
      {/* <img src={photo.url} alt={photo.title} /> */}
      <img src={`${process.env.REACT_APP_DIRECTUS_URL}/assets/${photo.url}`} alt={photo.title} />
      <button onClick={handlePrev}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Photo;
