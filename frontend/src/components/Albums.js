import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import albumStore from '../store/albumStore';
import css from './Albums.module.scss';
import { FaFolder } from 'react-icons/fa';

const Albums = observer(() => {
  useEffect(() => {
    albumStore.fetchAlbums();
  }, []);

  if (albumStore.loadingAlbums) {
    return <p>Loading...</p>;
  }

  return (
    <div className={css.container}>
      <h1>Albums</h1>
      <ul className={css.album_list}>
        {albumStore.albums?.map(album => (
          <li key={album.id} className={css.album_item}>
            <Link to={`/album/${album.id}`} className={css.album_link}>
              <FaFolder className={css.icon} />
              <h3>{album.title}</h3>
              <p>{album.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Albums;