import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import css from './Modal.module.scss';

const Modal = ({ photo, photos, closeModal }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentIndex = photos.findIndex(p => p.id === parseInt(searchParams.get('modal')));
  const prevPhoto = photos[currentIndex - 1];
  const nextPhoto = photos[currentIndex + 1];
  const handlePrev = () => {
    if (prevPhoto) {
      searchParams.set('modal', prevPhoto.id);
      navigate(`?${searchParams.toString()}`);
    }
  };

  const handleNext = () => {
    if (nextPhoto) {
      searchParams.set('modal', nextPhoto.id);
      navigate(`?${searchParams.toString()}`);
    }
  };

  return (
    <div className={css.modal}>
      <div className={css.container}>
        <h3 className={css.title}>{photo.title}</h3>
        <p>{photo.description}</p>
        <img className={css.image} src={`${process.env.REACT_APP_DIRECTUS_URL}/assets/${photo.url}`} alt={photo.title} />
        <div className={css.controlsBox}>
          <div className={css.buttonsBox}>
            <button className={css.closeButton} onClick={closeModal}><FaTimes size={24} /></button>
            <button onClick={handlePrev} disabled={!prevPhoto}><FaArrowLeft size={24} /></button>
            <button onClick={handleNext} disabled={!nextPhoto}><FaArrowRight size={24} /></button>
          </div>
          <p>{currentIndex + 1} / {photos.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
