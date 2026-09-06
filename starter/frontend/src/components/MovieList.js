import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function MovieList({ onMovieClick }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Ensure base URL fallback if environment variable was not injected at build time
    const baseUrl = process.env.REACT_APP_MOVIE_API_URL || '';

    axios
      .get(`${baseUrl}/movies`)
      .then((response) => {
        // Safely extract movies array whether returned as { movies: [...] } or direct array [...]
        const data = response.data;
        if (data && Array.isArray(data.movies)) {
          setMovies(data.movies);
        } else if (Array.isArray(data)) {
          setMovies(data);
        } else {
          setMovies([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching movies:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading movies...</div>;
  if (error) return <div>Error loading movies: {error}</div>;

  return (
    <ul>
      {(movies || []).map((movie) => (
        <li
          className="movieItem"
          key={movie.id}
          onClick={() => onMovieClick && onMovieClick(movie)}
        >
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