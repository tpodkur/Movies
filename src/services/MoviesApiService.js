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
    return this.convertResponseData(res);
  }

  async getGenres() {
    const res = await this.getResource(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this._apiKey}`);
    return res.genres;
  }

  convertResponseData(response) {
    return {
      page: response.page,
      totalPages: response.total_pages,
      totalMovies: response.total_results,
      movies: response.results.map((movie) => ({
        id: movie.id,
        name: movie.title,
        image: movie.backdrop_path,
        description: movie.overview,
        genreIds: movie.genre_ids,
        releaseDate: movie.release_date,
      })),
    };
  }
}
