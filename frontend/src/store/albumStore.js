import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';

class AlbumStore {
  albums = [];
  photos = [];
  albumDetails = { title: '', description: '' };
  currentPage = 1;
  totalPages = 1;

  loading = false;
  modalPhoto = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchAlbums() {
    this.loading = true;
    try {
      const response = await axios.get(`${process.env.REACT_APP_DIRECTUS_URL}/items/albums`);
      runInAction(() => {
        this.albums = response.data.data;
        this.loading = false;
      });
    } catch (error) {
      console.error('Error fetching albums:', error);
      this.loading = false;
    }
  }

  async fetchPhotos(albumId, pageSize, page) {
    this.loading = true;
    try {
      const response = await axios.get(`${process.env.REACT_APP_DIRECTUS_URL}/items/photos`, {
        params: {
          filter: { album: { _eq: albumId } },
          limit: pageSize,
          page: page,
        },
      });
      const countResponse = await axios.get(`${process.env.REACT_APP_DIRECTUS_URL}/items/photos`, {
        params: {
          filter: { album: { _eq: albumId } },
          aggregate: { count: '*' },
        },
      });
      runInAction(() => {
        this.photos = response.data.data;
        this.totalPages = Math.ceil(countResponse.data.data[0].count / pageSize);
        this.loading = false;
      });
    } catch (error) {
      console.error('Error fetching photos:', error);
      this.loading = false;
    }
  }

  async fetchAlbumDetails(albumId) {
    try {
      const response = await axios.get(`${process.env.REACT_APP_DIRECTUS_URL}/items/albums/${albumId}`);
      runInAction(() => {
        this.albumDetails = response.data.data;
      });
    } catch (error) {
      console.error('Error fetching album details:', error);
    }
  }

  setCurrentPage(page) {
    this.currentPage = page;
  }

  setModalPhoto(photo) {
    this.modalPhoto = photo;
  }

  clearModalPhoto() {
    this.modalPhoto = null;
  }

  goToPreviousPhoto() {
    const currentIndex = this.photos.findIndex(p => p.id === this.modalPhoto?.id);
    if (currentIndex > 0) {
      this.setModalPhoto(this.photos[currentIndex - 1]);
    }
  }

  goToNextPhoto() {
    const currentIndex = this.photos.findIndex(p => p.id === this.modalPhoto?.id);

    if (currentIndex < this.photos.length - 1) {
      this.setModalPhoto(this.photos[currentIndex + 1]);
    }
  }
}

const albumStore = new AlbumStore();
export default albumStore;
