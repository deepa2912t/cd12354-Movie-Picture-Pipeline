const configuredApiUrl =
  process.env.REACT_APP_MOVIE_API_URL ||
  'http://a5f0b01e6710e48a0ac7e8a1743f1c9d-1032739996.us-east-1.elb.amazonaws.com';

export const movieApiUrl = configuredApiUrl
  .replace(/^\uFEFF/, '')
  .trim()
  .replace(/\/+$/, '')
  .replace(/\/movies$/, '');