import { Route, Routes } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import css from "./App.module.css";
import { lazy, Suspense } from "react";
const HomePage = lazy(() => import("../../pages/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage"));
const MoviesDetailsPage = lazy(() => import("../../pages/MoviesDetailsPage"));
const MoviesCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MoviesReviews = lazy(() =>
  import("../../components/MovieReviews/MovieReviews")
);
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));

function App() {
  return (
    <div className={css.container}>
      <Navigation />
      <Suspense fallback={<div>Page is loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:moviesId" element={<MoviesDetailsPage />}>
            <Route path="cast" element={<MoviesCast />} />
            <Route path="reviews" element={<MoviesReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}
export default App;
