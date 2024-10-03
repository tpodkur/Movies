export class MoviesApiService {
  _apiKey = 'dae5ac66eb0ba7fe8bacaedcf5c621c1';

  async getResource(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}, ${res.statusText}`);
    }
    return await res.json();
  }

  async getMoviesByKeyword(keyword) {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/search/movie?api_key=${this._apiKey}&query=${keyword}`
    );
    return res.results;
  }

  async getGenres() {
    const res = await this.getResource(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this._apiKey}`);
    return res.genres;
  }
}
