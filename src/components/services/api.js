import axios from "axios";

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const options = {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzN2Y3MDZlMTRiMzliYzJmMTI2YTMzMmFmNmJlN2NkNyIsIm5iZiI6MTczODE1MTY2OC43Mjk5OTk4LCJzdWIiOiI2NzlhMTZmNGEzZmVmNjU3Y2RhOTc0MmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.XmHdELTbQn5N0JqEiesv_7L-TE2dmpW7f-XQ3sSk2R0',
    accept: 'application/json',
  }
};

const fetchTrandingMovies = async () => {
  const { data } = await axios.get('/trending/movie/day?language=en-US',
    options);
    return data.results;

}

const fetchMovieDescription = async (movieId) => {
  const { data } = await axios.get(`/movie/${movieId}?language=en-US`, 
    options
  )
  return data;
}

const fetchMovieCredits = async (movieId) => {
  const { data } = await axios.get(`/movie/${movieId}/credits?language=en-US`, 
    options
  )
  
  return data.cast;

  
}

const fetchMovieReviews = async (movieId) => {
  const { data } = await axios.get(`/movie/${movieId}/reviews?language=en-US`, 
    options
  )
  
  return data;

  
}

const fetchMovieByQuery = async (query) => {
  const { data } = await axios.get(`/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, 
    options
  )
  
  return data.results;

  
}

export  {fetchTrandingMovies, fetchMovieDescription, fetchMovieCredits, fetchMovieReviews, fetchMovieByQuery };