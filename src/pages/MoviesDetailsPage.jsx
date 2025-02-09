import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchMovieDescription } from "../components/services/api";
import Loader from "../components/Loader/Loader";

const MoviesDetailsPage = () => {
  const { moviesId } = useParams();
  const location = useLocation();
  const goBackRef = useRef(location.state);
  const [isLoading, setIsLoading] = useState(false);

  const [description, setDescription] = useState(null);
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const movie = await fetchMovieDescription(moviesId);
        setDescription(movie);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [moviesId]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            <Link to={goBackRef.current}>Go back</Link>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500${description?.poster_path}`}
                alt={description?.title}
              />
            </div>
            <h2>{description?.title}</h2>
            <h3>Average vote</h3>
            <p>{description?.vote_average}</p>
            <h3>Overview</h3>
            <p>{description?.overview}</p>
            <h3>Genres</h3>
            <p>{description?.genres?.map((genre) => genre.name).join(" ")}</p>
          </div>
          <div>
            <p>Additional information</p>
            <ul>
              <li>
                <Link to={`/movies/${moviesId}/cast`}>Cast</Link>
              </li>
              <li>
                <Link to={`/movies/${moviesId}/reviews`}>Reviews</Link>
              </li>
            </ul>
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};
export default MoviesDetailsPage;
