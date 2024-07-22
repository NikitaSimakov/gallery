import React from 'react';
import { observer } from 'mobx-react-lite';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import css from './Modal.module.scss';
import albumStore from '../store/albumStore';
import { useSearchParams } from 'react-router-dom';

const Modal = observer(({ closeModal }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const photo = albumStore.modalPhoto;
  if (!photo) return null;

  const currentIndex = albumStore.photos.findIndex(p => p.id === photo.id);

  const prevPhoto = albumStore.photos[currentIndex - 1];
  const nextPhoto = albumStore.photos[currentIndex + 1];

  const goToPrevPhoto = () => {
    searchParams.set('modal', prevPhoto.id);
    setSearchParams(searchParams);
    albumStore.goToPreviousPhoto()
  }

  const goToNextPhoto = () => {
    searchParams.set('modal', nextPhoto.id);
    setSearchParams(searchParams);
    albumStore.goToNextPhoto()
  }
  return (
    <div className={css.modal}>
      <div className={css.container}>
        <h3 className={css.title}>{photo.title}</h3>
        <p>{photo.description}</p>
        <img className={css.image} src={`${process.env.REACT_APP_DIRECTUS_URL}/assets/${photo.url}`} alt={photo.title} />
        <div className={css.controlsBox}>
          <div className={css.buttonsBox}>
            <button className={css.closeButton} onClick={closeModal}><FaTimes size={24} /></button>
            <button onClick={() => goToPrevPhoto()} disabled={!prevPhoto}><FaArrowLeft size={24} /></button>
            <button onClick={() => goToNextPhoto()} disabled={!nextPhoto}><FaArrowRight size={24} /></button>
          </div>
          <p>{currentIndex + 1} / {albumStore.photos.length}</p>
        </div>
      </div>
    </div>
  );
});

export default Modal;
