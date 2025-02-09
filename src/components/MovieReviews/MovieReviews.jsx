import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../services/api";
import Loader from "../Loader/Loader";

const MovieReviews = () => {
  const { moviesId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      setIsLoading(true);

      try {
        const movie = await fetchMovieReviews(moviesId);
        setReviews(movie.results);
      } catch (error) {
        console.log("Error fetching reviews", error);
        setReviews([]);
      } finally {
        setIsLoading(false);
      }
    };
    if (moviesId) {
      getReviews();
    }
  }, [moviesId]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : reviews.length === 0 ? (
        <p>No available reviews</p>
      ) : (
        <ul>
          {reviews.map((item) => (
            <li key={item.id}>
              <h3>{item.author}</h3>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default MovieReviews;
