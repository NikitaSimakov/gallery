import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Albums = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_DIRECTUS_URL}/items/albums`)
      .then(response => setAlbums(response.data.data))
      .catch(error => console.error('Error fetching albums:', error));
  }, []);

  return (
    <div>
      <h1>Albums</h1>
      <ul>
        {albums.map(album => (
          <li key={album.id}>
            <Link to={`/album/${album.id}`}>{album.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Albums;
