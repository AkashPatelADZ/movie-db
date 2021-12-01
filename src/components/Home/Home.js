import React, { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";
import { useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const movieTitle = "Harry";
    const showTitle = "Friends";
    dispatch(fetchAsyncMovies(movieTitle));
    dispatch(fetchAsyncShows(showTitle));
  }, [dispatch]);

  return (
    <div>
      <MovieListing />
    </div>
  );
}

export default Home;
