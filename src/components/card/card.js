import React, { Component } from 'react';
import './card.scss';
import { format } from 'date-fns';

import Spinner from '../spinner/spinner';

const shortenText = (charactersPerLine, linesCount, text) => {
  const slicedTextInArr = text.slice(0, charactersPerLine * linesCount).split(' ');
  slicedTextInArr.pop();
  return slicedTextInArr.join(' ') + ' ...';
};

export default class Card extends Component {
  movieName;
  movieImgPath;
  movieDescription = {
    text: '',
    charactersPerLine: 35,
    linesCount: 4,
  };
  movieGenresArr;
  movieReleaseDate;

  constructor(props) {
    super();
    this.convertParamsToDisplay(props);
  }

  convertParamsToDisplay({ name, date, genres, description, img }) {
    this.movieName = name;
    this.movieImgPath = img ? `https://image.tmdb.org/t/p/original${img}` : process.env.PUBLIC_URL + '/default.jpg';
    this.movieDescription.text =
      description.length > this.movieDescription.charactersPerLine * this.movieDescription.linesCount
        ? shortenText(this.movieDescription.charactersPerLine, this.movieDescription.linesCount, description)
        : description;
    this.movieGenresArr = genres.map((genre) => (
      <li className="movie__genre" key={genre.id}>
        <div className="genre">{genre.name}</div>
      </li>
    ));
    this.movieReleaseDate = date ? format(new Date(date), 'MMMM d, y') : null;
  }

  render() {
    return (
      <div className="card">
        <div className="card__spinner">
          <Spinner size="large" />
        </div>
        <img className="card__image" alt="movie-poster" src={this.movieImgPath} />
        <div className="card__info movie">
          <h2 className="movie__name">{this.movieName}</h2>
          <p className="movie__date">{this.movieReleaseDate}</p>
          <ul className="movie__genres-list">{this.movieGenresArr}</ul>
          <p className="movie__description">{this.movieDescription.text}</p>
        </div>
      </div>
    );
  }
}
