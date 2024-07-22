import React, { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Modal from './Modal';
import Pagination from './Pagination';
import albumStore from '../store/albumStore';
import css from './Album.module.scss';
import axios from 'axios';

const Album = observer(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = 12;
  const page = Number(searchParams.get('page')) || 1


  useEffect(() => {
    albumStore.setCurrentPage(page);
    albumStore.fetchPhotos(id, pageSize, page);
    albumStore.fetchAlbumDetails(id);
  }, [id, page]);

  const openModal = (photoId) => {
    const photo = albumStore.photos.find(photo => photo.id === photoId);
    albumStore.setModalPhoto(photo);
    searchParams.set('modal', photoId);
    setSearchParams(searchParams);
  };

  const closeModal = () => {
    searchParams.delete('modal');
    setSearchParams(searchParams);
    albumStore.clearModalPhoto();
  };

  const selectedPhotoId = searchParams.get('modal');
  const selectedPhoto = albumStore.modalPhoto;

  useEffect(() => {
    if (selectedPhotoId && !selectedPhoto) {
      const fetchPhoto = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_DIRECTUS_URL}/items/photos/${selectedPhotoId}`);
          if (response.data.data) {
            albumStore.setModalPhoto(response.data.data);
            const photo = albumStore.photos.find(photo => photo.id === response.data.data.id);
            albumStore.setModalPhoto(photo);
          }
        } catch (error) {
          console.error('Error fetching selected photo:', error);
        }
      };
      fetchPhoto();
    }
  }, [selectedPhotoId, selectedPhoto]);

  return (
    <div className={css.container}>
      <button onClick={() => navigate('/')} >к альбомам</button>
      <h1>{albumStore.albumDetails.title}</h1>
      {albumStore.albumDetails.description && <p>{albumStore.albumDetails.description}</p>}
      {albumStore.loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className={css.photo_grid}>
            {albumStore.photos.map(photo => (
              <li className={css.photo_container} key={photo.id} onClick={() => openModal(photo.id)}>
                <img
                  src={`${process.env.REACT_APP_DIRECTUS_URL}/assets/${photo.url}?transform=resize&width=535&height=300`}
                  alt={photo.title}
                />
              </li>
            ))}
          </ul>
          <Pagination
            setCurrentPage={(page) => {
              albumStore.setCurrentPage(page);
              searchParams.set('page', page);
              setSearchParams(searchParams);
            }}
            currentPage={albumStore.currentPage}
            totalPages={albumStore.totalPages}
          />
        </>
      )}
      {albumStore.modalPhoto && <Modal closeModal={closeModal} />}
    </div>
  );
});

export default Album;
