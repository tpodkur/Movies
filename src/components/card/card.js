import React, { Component } from 'react';
import './card.scss';
import { format } from 'date-fns';

const shortenText = (charactersPerLine, linesCount, text) => {
  const slicedTextInArr = text.slice(0, charactersPerLine * linesCount).split(' ');
  slicedTextInArr.pop();
  return slicedTextInArr.join(' ') + ' ...';
};

const calculateDescriptionParameters = (name, date, genres) => {
  return {
    charactersPerLine: 40,
    linesCount: 5 + (name.length < 23) + !date.length + !genres.length,
  };
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

  constructor({ name, date, genres, description, img }) {
    super();
    this.name = name;
    this.date = date;
    this.genres = genres;
    this.description = description;
    this.img = img;
  }

  componentDidMount() {
    calculateLinesCount(this.cardElement, this.nameElement, this.dateElement, this.genresListElement);
  }

  render() {
    const { name, date, genres, description, img } = this;

    const displayedImg = img ? `https://image.tmdb.org/t/p/original${img}` : process.env.PUBLIC_URL + '/default.jpg';
    const { charactersPerLine, linesCount } = calculateDescriptionParameters(name, date, genres);

    const displayedText =
      description.length > charactersPerLine * linesCount
        ? shortenText(charactersPerLine, linesCount, description)
        : description;
    const displayedGenres = genres.map((genre) => (
      <li className="movie__genre" key={genre.id}>
        <div className="genre">{genre.name}</div>
      </li>
    ));
    const displayedDate = date ? format(new Date(date), 'MMMM d, y') : null;

    return (
      <div
        className="card"
        ref={(el) => {
          this.cardElement = el;
        }}
      >
        <img className="card__image" alt="movie-poster" src={displayedImg} />
        <div className="card__info movie">
          <h2
            className="movie__title"
            ref={(el) => {
              this.nameElement = el;
            }}
          >
            {name}
          </h2>
          <p
            className="movie__date"
            ref={(el) => {
              this.dateElement = el;
            }}
          >
            {displayedDate}
          </p>
          <ul
            className="movie__genres-list"
            ref={(el) => {
              this.genresListElement = el;
            }}
          >
            {displayedGenres}
          </ul>
          <p
            className="movie__description"
            ref={(el) => {
              this.descriptionElement = el;
            }}
          >
            {displayedText}
          </p>
        </div>
      </div>
    );
  }
}
