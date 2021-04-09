import { computed, makeAutoObservable, runInAction } from 'mobx';
import Api from '~/api';

const keywords = ['super car', 'mac', 'phone', 'flower', 'dog', 'cat', 'bird', 'tree'];

class GalleryStore {
  constructor() {
    makeAutoObservable(this, {
      completed: computed,
    });
  }

  keyword = 'super car';

  images = [];

  currentPage = 1;

  isLoading = false;

  isRefreshing = false;

  total = 0;

  get completed() {
    console.log('Computing...');
    return this.total === this.images.length;
  }

  fetchImages = async () => {
    const { totalHits, hits = [] } = await Api.Demo.fetchImages({ q: this.keyword, page: this.currentPage });
    runInAction(() => {
      if (!this.images.length || this.isRefreshing) {
        // this.images = hits.map(({ id, previewURL }) => new Photo({ id, previewURL }));
        this.images = hits;
        this.isRefreshing = false;
        this.total = totalHits;
      } else {
        this.images.push(...hits);
      }
    });
  };

  refresh = () => {
    this.currentPage = 1;
    this.isRefreshing = true;
    const random = Math.floor(Math.random() * keywords.length);
    this.keyword = keywords[random];
    this.fetchImages();
  };

  fetchMore = () => {
    if (this.completed) {
      return;
    }
    this.currentPage += 1;
    this.fetchImages();
  };

  resetStore = () => {
    this.keyword = 'super car';
    this.currentPage = 1;
    this.isRefreshing = false;
    this.images = [];
  };
}

// class Photo {
//   id = '';

//   previewURL = '';

//   constructor({ id, previewURL }) {
//     makeAutoObservable(this);
//     this.id = id;
//     this.previewURL = previewURL;
//   }
// }

export default new GalleryStore();
