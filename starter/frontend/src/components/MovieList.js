import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function MovieList({ onMovieClick }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_MOVIE_API_URL || '';

    axios
      .get(`${baseUrl}/movies`)
      .then((response) => {
        const data = response.data;
        if (data && Array.isArray(data.movies)) {
          setMovies(data.movies);
        } else if (Array.isArray(data)) {
          setMovies(data);
        } else {
          setMovies([]);
        }
      })
      .catch(() => setError(true));
  }, []);

  if (error) {
    return <p role="alert">Unable to load movies. Please try again later.</p>;
  }

  return (
    <ul>
      {(movies || []).map((movie) => (
        <li className="movieItem" key={movie.id} onClick={() => onMovieClick && onMovieClick(movie)}>
          {movie.title}
        </li>
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieList;