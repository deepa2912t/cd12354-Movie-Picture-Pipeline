import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function MovieDetail({ movie }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movie || !movie.id) return;

    const baseUrl = process.env.REACT_APP_MOVIE_API_URL || '';
    setLoading(true);
    setError(null);

    axios
      .get(`${baseUrl}/movies/${movie.id}`)
      .then((response) => {
        const data = response.data;
        setDetails(data.movie || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching movie details:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [movie?.id]);

  if (!movie) return <div>Select a movie to view details.</div>;
  if (loading) return <div>Loading movie details...</div>;
  if (error) return <div>Error loading details: {error}</div>;

  return (
    <div className="movieDetail">
      <h2>{details?.title || movie.title}</h2>
      <p>{details?.description || 'No description available.'}</p>
    </div>
  );
}

MovieDetail.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default MovieDetail;