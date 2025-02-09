import { Link, useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";

const MovieList = ({ movies, isLoading }) => {
  const location = useLocation();

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <ul>
          {movies.map((item) => (
            <li key={item.id}>
              <Link to={`/movies/${item.id}`} state={location}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default MovieList;
