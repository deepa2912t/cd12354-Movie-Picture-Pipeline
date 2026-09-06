import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { movieApiUrl } from '../api';

function MovieDetail({ movie }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (!movie || !movie.id) return;

    axios.get(`${movieApiUrl}/movies/${movie.id}`).then((response) => {
      setDetails(response.data);
    });
  }, [movie]);

  if (!movie) return <div>Select a movie to view details.</div>;

  return (
    <div className="movieDetail">
      <h2>{details?.movie?.title}</h2>
      <p>{details?.movie?.description}</p>
    </div>
  );
}

MovieDetail.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default MovieDetail;

