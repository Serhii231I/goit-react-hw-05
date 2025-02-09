import { useEffect, useState } from "react";
import { fetchTrandingMovies } from "../components/services/api";
import MovieList from "../components/MovieList/MovieList";
import Loader from "../components/Loader/Loader";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      try {
        const data = await fetchTrandingMovies();
        setMovies(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2>Trending today</h2>
          <MovieList movies={movies}></MovieList>
        </>
      )}
    </div>
  );
};
export default HomePage;
