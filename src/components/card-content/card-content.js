import React from 'react';
import { format } from 'date-fns';

const shortenText = (charactersPerLine, linesCount, text) => {
  const slicedTextInArr = text.slice(0, charactersPerLine * linesCount).split(' ');
  slicedTextInArr.pop();
  return slicedTextInArr.join(' ') + ' ...';
};

const convertImgPath = (path) =>
  path ? `https://image.tmdb.org/t/p/original${path}` : process.env.PUBLIC_URL + '/default.jpg';

const convertDescription = (description) => {
  const charactersPerLine = 35;
  const linesCount = 4;
  return description.length > charactersPerLine * linesCount
    ? shortenText(charactersPerLine, linesCount, description)
    : description;
};

const convertGenres = (genreIds, genreNamesArr) => {
  return genreIds
    .map((id) => genreNamesArr.find((genre) => id === genre.id))
    .map((genre) => (
      <li className="movie__genre" key={genre.id}>
        <div className="genre">{genre.name}</div>
      </li>
    ));
};

const convertReleaseDate = (date) => (date ? format(new Date(date), 'MMMM d, y') : null);

const CardContent = ({ genres, ...movie }) => {
  const movieName = movie.title;
  const movieImgPath = convertImgPath(movie.backdrop_path);
  const movieDescription = convertDescription(movie.overview);
  const movieGenres = convertGenres(movie.genre_ids, genres);
  const movieReleaseDate = convertReleaseDate(movie.release_date);

  return (
    <React.Fragment>
      <img className="card__image" alt="movie-poster" src={movieImgPath} />
      <div className="card__info movie">
        <h2 className="movie__name">{movieName}</h2>
        <p className="movie__date">{movieReleaseDate}</p>
        <ul className="movie__genres-list">{movieGenres}</ul>
        <p className="movie__description">{movieDescription}</p>
      </div>
    </React.Fragment>
  );
};

export default CardContent;
