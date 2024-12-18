export class MoviesApiService {
  _apiKey = process.env.REACT_APP_API_KEY;
  _apiAccessToken = process.env.REACT_APP_API_ACCESS_TOKEN;
  _sessionId;

  constructor() {
    this.getResource(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this._apiKey}`).then(
      (res) => {
        this._sessionId = res.guest_session_id;
      }
    );
  }

  getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}, ${res.statusText}`);
    }
    return await res.json();
  };

  postResource = async (url, data) => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${this._apiAccessToken}`,
      },
      body: JSON.stringify(data),
    };

    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}, ${res.statusText}`);
    }
    return await res.json();
  };

  async getMoviesByKeyword(keyword, page = 1) {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/search/movie?api_key=${this._apiKey}&query=${keyword}&page=${page}`
    );
    return this.convertResponseData(res);
  }

  async getTopMovies(page) {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${this._apiKey}&language=en-US&page=${page}`
    );
    return this.convertResponseData(res);
  }

  async getGenres() {
    const res = await this.getResource(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this._apiKey}`);
    return res.genres;
  }

  async postRating(movieId, rating) {
    return await this.postResource(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${this._sessionId}`,
      { value: `${rating}` }
    );
  }

  async getRatedFilms(page = 1) {
    return await this.getResource(
      `https://api.themoviedb.org/3/guest_session/${this._sessionId}/rated/movies?api_key=${this._apiKey}&page=${page}&language=en-US&sort_by=created_at.asc`
    );
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
        rating: movie.rating || 0,
        voteAverage: movie.vote_average,
      })),
    };
  }
}
