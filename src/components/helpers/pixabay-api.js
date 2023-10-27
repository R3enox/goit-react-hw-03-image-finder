import axios from 'axios';

export class PixabayApi {
  #BASE_URL = 'https://pixabay.com/';
  #END_POINT = 'api/';
  #API_KEY = '39475644-92f059a0a2181a8f4774c1e0e';

  constructor(perPage) {
    this.per_page = perPage;
    this.page = 1;
    this.q = '';
  }

  async getContent() {
    const options = {
      params: {
        key: this.#API_KEY,
        q: this.q,
        page: this.page,
        per_page: this.per_page,
        orientation: 'horizontal',
        image_type: 'photo',
        safesearch: true,
      },
    };
    const { data } = await axios.get(
      `${this.#BASE_URL}${this.#END_POINT}`,
      options
    );
    return data;
  }
}
