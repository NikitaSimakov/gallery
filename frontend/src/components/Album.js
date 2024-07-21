import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const Album = () => {
  const { id } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_DIRECTUS_URL}/items/photos?filter[album][_eq]=${id}`)
      .then(response => {
        setPhotos(response.data.data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching photos:', error));
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Album Photos</h1>
      <ul>
        {photos.map(photo => (
          <li key={photo.id}>
            <Link to={`/photo/${photo.id}`}>{photo.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Album;
