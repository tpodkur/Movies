import React, { Component } from 'react';
import './card.scss';
import { format } from 'date-fns';

const shortenText = (charactersPerLine, linesCount, text) => {
  const slicedTextInArr = text.slice(0, charactersPerLine * linesCount).split(' ');
  slicedTextInArr.pop();
  return slicedTextInArr.join(' ') + ' ...';
};

const calculateLinesCount = (cardElement, nameElement, dateElement, genresListElement) => {
  const cardHeight = cardElement.clientHeight;
  const nameHeight = nameElement.clientHeight;
  const dateHeight = dateElement.clientHeight;
  const listHeight = genresListElement.clientHeight;
  const dateMarginTop = 7;
  const listMarginTop = 7;
  const descriptionMarginTop = 7;
  const descriptionLineHeight = 22;

  const remainingHeight =
    cardHeight - (nameHeight + dateMarginTop + dateHeight + listMarginTop + listHeight + descriptionMarginTop);

  return Math.floor(remainingHeight / descriptionLineHeight) - 1;
};

export default class Card extends Component {
  cardElement;
  nameElement;
  dateElement;
  genresListElement;
  descriptionElement;

  movieName;
  movieImgPath;
  movieDescription = {
    text: '',
    charactersPerLine: 35,
    linesCount: 4,
  };
  movieGenresArr;
  movieReleaseDate;

  constructor({ name }) {
    super();
    this.movieName = name;
  }

  componentDidMount() {
    this.movieDescription.linesCount = calculateLinesCount(
      this.cardElement,
      this.nameElement,
      this.dateElement,
      this.genresListElement
    );
  }

  convertParamsToDisplay({ date, genres, description, img }) {
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
    this.convertParamsToDisplay(this.props);

    return (
      <div
        className="card"
        ref={(el) => {
          this.cardElement = el;
        }}
      >
        <img className="card__image" alt="movie-poster" src={this.movieImgPath} />
        <div className="card__info movie">
          <h2
            className="movie__name"
            ref={(el) => {
              this.nameElement = el;
            }}
          >
            {this.movieName}
          </h2>
          <p
            className="movie__date"
            ref={(el) => {
              this.dateElement = el;
            }}
          >
            {this.movieReleaseDate}
          </p>
          <ul
            className="movie__genres-list"
            ref={(el) => {
              this.genresListElement = el;
            }}
          >
            {this.movieGenresArr}
          </ul>
          <p
            className="movie__description"
            ref={(el) => {
              this.descriptionElement = el;
            }}
          >
            {this.movieDescription.text}
          </p>
        </div>
      </div>
    );
  }
}
