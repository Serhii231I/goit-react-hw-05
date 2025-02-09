import { Field, Form, Formik } from "formik";
import MovieList from "../components/MovieList/MovieList";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMovieByQuery } from "../components/services/api";
import Loader from "../components/Loader/Loader";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [isLoader, setIsLoader] = useState(false);
  useEffect(() => {
    if (!query) {
      return;
    }

    const getData = async () => {
      setIsLoader(true);
      try {
        const data = await fetchMovieByQuery(query);
        setMovies(data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoader(false);
      }
    };
    getData();
  }, [query]);

  const onSubmit = (values) => {
    if (!values.query.trim()) {
      setSearchParams({});
      return;
    }
    setSearchParams({ query: values.query });
  };

  return (
    <div>
      <Formik initialValues={{ query: "" }} onSubmit={onSubmit}>
        <Form>
          <Field
            name="query"
            type="text"
            placeholder="Enter your movie"
          ></Field>
          <button type="submit">Search</button>
        </Form>
      </Formik>
      {query && !isLoader && (
        <>
          {movies.length > 0 ? (
            <MovieList movies={movies}></MovieList>
          ) : (
            <p>This {query} movie not exist</p>
          )}
        </>
      )}
      {isLoader && <Loader />}
    </div>
  );
};
export default MoviesPage;
