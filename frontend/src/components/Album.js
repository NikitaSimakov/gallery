import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Modal from './Modal';
import usePagination from '../hooks/usePagination';
import css from './Album.module.scss';
import Pagination from './Pagination';
import axios from 'axios';

const Album = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = 12;
  const [title, setTitle] = useState({ title: '', description: '' });

  const {
    data: photos,
    totalPages,
    currentPage,
    setCurrentPage,
    loading,
  } = usePagination(`${process.env.REACT_APP_DIRECTUS_URL}/items/photos?filter[album][_eq]=${id}`, pageSize);

  const openModal = (photoId) => {
    searchParams.set('modal', photoId);
    setSearchParams(searchParams);
  };

  const closeModal = () => {
    searchParams.delete('modal');
    setSearchParams(searchParams);
  };

  const selectedPhotoId = searchParams.get('modal');
  const selectedPhoto = photos.find(photo => photo.id === parseInt(selectedPhotoId));

  useEffect(() => {
    if (selectedPhotoId && !selectedPhoto) {
      const fetchPhoto = async () => {
        const response = await axios.get(`${process.env.REACT_APP_DIRECTUS_URL}/items/photos/${selectedPhotoId}`);

        if (response.data.data) {
          openModal(response.data.data.id);
        }
      };
      fetchPhoto();
    }
  }, [selectedPhotoId, selectedPhoto, setSearchParams]);

  useEffect(() => {
    const fetchTitle = async () => {
      const { data: { data } } = await axios.get(`${process.env.REACT_APP_DIRECTUS_URL}/items/albums/${id}`);
      setTitle({ title: data.title, description: data.description })
    }
    fetchTitle()
  }, [id, setSearchParams])
  return (
    <div className={css.container}>
      <h1>{title.title}</h1>
      {title.description && <p>{title.description}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className={css.photo_grid}>
            {photos.map(photo => (
              <li className={css.photo_container} key={photo.id} onClick={() => openModal(photo.id)}>
                <img
                  src={`${process.env.REACT_APP_DIRECTUS_URL}/assets/${photo.url}?transform=resize&width=535&height=300`}
                  alt={photo.title}
                />
              </li>
            ))}
          </ul>
          <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
        </>
      )}
      {selectedPhoto && <Modal photo={selectedPhoto} photos={photos} closeModal={closeModal} />}
    </div>
  );
};

export default Album;
