import React from 'react';
import { format } from 'date-fns';

const CardContent = (props) => {
  let movieName;
  let movieImgPath;
  let movieDescription = {
    text: '',
    charactersPerLine: 35,
    linesCount: 4,
  };
  let movieGenresArr;
  let movieReleaseDate;

  const shortenText = (charactersPerLine, linesCount, text) => {
    const slicedTextInArr = text.slice(0, charactersPerLine * linesCount).split(' ');
    slicedTextInArr.pop();
    return slicedTextInArr.join(' ') + ' ...';
  };

  const convertParamsToDisplay = ({ name, date, genres, description, img }) => {
    movieName = name;
    movieImgPath = img ? `https://image.tmdb.org/t/p/original${img}` : process.env.PUBLIC_URL + '/default.jpg';
    movieDescription.text =
      description.length > movieDescription.charactersPerLine * movieDescription.linesCount
        ? shortenText(movieDescription.charactersPerLine, movieDescription.linesCount, description)
        : description;
    movieGenresArr = genres.map((genre) => (
      <li className="movie__genre" key={genre.id}>
        <div className="genre">{genre.name}</div>
      </li>
    ));
    movieReleaseDate = date ? format(new Date(date), 'MMMM d, y') : null;
  };

  convertParamsToDisplay(props);

  return (
    <React.Fragment>
      <img className="card__image" alt="movie-poster" src={movieImgPath} />
      <div className="card__info movie">
        <h2 className="movie__name">{movieName}</h2>
        <p className="movie__date">{movieReleaseDate}</p>
        <ul className="movie__genres-list">{movieGenresArr}</ul>
        <p className="movie__description">{movieDescription.text}</p>
      </div>
    </React.Fragment>
  );
};

export default CardContent;
