import React, { Component } from 'react';
import { format } from 'date-fns';
import { Rate } from 'antd';

import img from './default-movie-img.jpg';

const shortenText = (charactersPerLine, linesCount, text) => {
  const slicedTextInArr = text.slice(0, charactersPerLine * linesCount).split(' ');
  slicedTextInArr.pop();
  return slicedTextInArr.join(' ') + ' ...';
};

const convertImgPath = (path) => (path ? `https://image.tmdb.org/t/p/original${path}` : img);

const convertDescription = (description, isSmall = false) => {
  const charactersPerLine = 35;
  const linesCount = isSmall ? 2 : 4;
  return description.length > charactersPerLine * linesCount
    ? shortenText(charactersPerLine, linesCount, description)
    : description;
};

const convertGenres = (genreIds, genreNamesArr) => {
  if (!genreNamesArr.length) return null;

  return genreIds
    .map((id) => genreNamesArr.find((genre) => id === genre.id))
    .map((genre) => (
      <li className="movie__genre" key={genre.id}>
        <span className="genre">{genre.name}</span>
      </li>
    ));
};

const convertReleaseDate = (date) => (date ? format(new Date(date), 'MMMM d, y') : null);

export default class CardContent extends Component {
  state = {
    rating: 0,
  };

  constructor() {
    super();
  }

  onChangeRating = (value) => {
    // this.props.api.postRating(this.props.movie.id, value).then(console.log);
    const ratedMovies = JSON.parse(localStorage.ratedMovies);
    const index = ratedMovies.map((movie) => movie.id).indexOf(this.props.movie.id);
    if (index > -1) {
      ratedMovies[index].rating = value;
    } else {
      ratedMovies.push({ ...this.props.movie, rating: value });
    }

    localStorage.ratedMovies = JSON.stringify(ratedMovies);
    this.setState({ rating: value });
    this.props.onUpdateRatedMovies();
  };

  componentDidMount() {
    this.setState({ rating: this.props.movie.rating });
  }

  getVoteAverageColor(value) {
    if (value < 3) {
      return '#E90000';
    } else if (value < 5) {
      return '#E97E00';
    } else if (value < 7) {
      return '#E9D100';
    }
    return '#66E900';
  }

  render() {
    const { genres, movie } = this.props;
    const isLittleDescriptionSize = movie.name.length > 38 || movie.genreIds.length > 3;

    const movieName = movie.name;
    const movieImgPath = convertImgPath(movie.image);
    const movieDescription = convertDescription(movie.description, isLittleDescriptionSize);
    const movieGenres = convertGenres(movie.genreIds, genres);
    const movieReleaseDate = convertReleaseDate(movie.releaseDate);
    const movieVoteAverage = movie.voteAverage.toFixed(1);

    return (
      <>
        <img className="card__image" alt="movie-poster" src={movieImgPath} />
        <div className="card__info movie">
          <div className="card__header">
            <h2 className="movie__name">{movieName}</h2>
            <span
              className="movie__vote-average"
              style={{ borderColor: this.getVoteAverageColor(this.props.movie.voteAverage) }}
            >
              {movieVoteAverage}
            </span>
          </div>
          <p className="movie__date">{movieReleaseDate}</p>
          <ul className="movie__genres-list">{movieGenres}</ul>
          <p className="movie__description">{movieDescription}</p>
          <div className="movie__rate">
            <Rate
              allowHalf
              count={10}
              style={{ fontSize: 15 }}
              onChange={this.onChangeRating}
              value={this.state.rating}
            />
          </div>
        </div>
      </>
    );
  }
}
