export class MoviesApiService {
  _url = 'https://api.themoviedb.org/3/search/movie';
  _apiKey = 'dae5ac66eb0ba7fe8bacaedcf5c621c1';

  async getResource(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}, ${res.statusText}`);
    }
    return await res.json();
  }

  async getMoviesByKeyword(keyword) {
    const res = await this.getResource(`${this._url}?api_key=${this._apiKey}&query=${keyword}`);
    return res.results;
  }
}
