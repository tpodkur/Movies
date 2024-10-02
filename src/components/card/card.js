import React from 'react';
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

const Card = ({ name, date, genres, description, img }) => {
  const displayedImg = img ? `https://image.tmdb.org/t/p/original${img}` : process.env.PUBLIC_URL + '/default.jpg';
  const { charactersPerLine, linesCount } = calculateDescriptionParameters(name, date, genres);

  const displayedText =
    description.length > charactersPerLine * linesCount
      ? shortenText(charactersPerLine, linesCount, description)
      : description;
  const displayedGenres = genres.map((id) => (
    <li className="movie__genre" key={id}>
      <div className="genre">{id}</div>
    </li>
  ));
  const displayedDate = date ? format(new Date(date), 'MMMM d, y') : null;

  return (
    <div className="card">
      <img className="card__image" alt="movie-poster" src={displayedImg} />
      <div className="card__info movie">
        <h2 className="movie__title">{name}</h2>
        <p className="movie__date">{displayedDate}</p>
        <ul className="movie__genres-list">{displayedGenres}</ul>
        <p className="movie__description">{displayedText}</p>
      </div>
    </div>
  );
};

export default Card;
