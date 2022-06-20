import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const KEY = 'key=28032921-de3e5fcddd16ff3ec8b59756f';

export default class ApiService {
  constructor() {
    this.searchQvery = '';
    this.page = 1;
  }

  async getContent() {
    const options = `image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
    try {
      const response = await axios.get(
        `${BASE_URL}/?${KEY}&q=${this.searchQvery}&${options}`
      );
      this.page += 1;
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQvery;
  }

  set query(newQuery) {
    this.searchQvery = newQuery;
  }
}
