import React from 'react';
import './card.scss';

const Card = () => {
  const charactersPerLine = 60;
  const linesCount = 7;
  const originalText =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis quidem rerum sequi! Cumque deleniti earum harum recusandae voluptates. Animi deserunt eius, et expedita fugit officia sint voluptate? Consequatur, est, sint? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis quidem rerum sequi! Cumque deleniti earum harum recusandae voluptates. Animi deserunt eius, et expedita fugit officia sint voluptate? Consequatur, est, sint? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis quidem rerum sequi! Cumque deleniti earum harum recusandae voluptates. Animi deserunt eius, et expedita fugit officia sint voluptate? Consequatur, est, sint?';
  const slicedTextInArr = originalText.slice(0, charactersPerLine * linesCount).split(' ');
  slicedTextInArr.pop();
  const displayedText = slicedTextInArr.join(' ');

  return (
    <div className="card">
      <img className="card__image" alt="movie-poster" />
      <div className="card__info movie">
        <h2 className="movie__title">The way back</h2>
        <p className="movie__date">March 5, 2020</p>
        <ul className="movie__genres-list">
          <li className="movie__genre">
            <div className="genre">Action</div>
          </li>
          <li className="movie__genre">
            <div className="genre">Drama</div>
          </li>
        </ul>
        <p className="movie__description">{displayedText + ' ...'}</p>
      </div>
    </div>
  );
};

export default Card;
