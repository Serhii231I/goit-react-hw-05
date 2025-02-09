import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits } from "../services/api";
import Loader from "../Loader/Loader";

const MovieCast = () => {
  const { moviesId } = useParams();

  const [cast, setCast] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getCast = async () => {
      setIsLoading(true);
      try {
        const movie = await fetchMovieCredits(moviesId);
        setCast(movie);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (moviesId) {
      getCast();
    }
  }, [moviesId]);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : cast.length === 0 ? (
        <p>No cast is avialable</p>
      ) : (
        <ul>
          {cast?.map((actor) => (
            <div key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
              />
              <li>
                {actor.name}
                <p>{actor.character}</p>
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};
export default MovieCast;
