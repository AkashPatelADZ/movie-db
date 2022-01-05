import React from "react";
import { useSelector } from "react-redux";
import { getAllMovies, getAllShows } from "../../features/movies/movieSlice";
import { Settings } from "../../common/settings";
import MovieCard from "../MovieCard/MovieCard";
import Slider from "react-slick";
import "./MovieListing.scss";

function MovieListing() {
  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);

  let renderMovies = "";
  let renderShows = "";

  renderMovies =
    movies.Response === "True" ? (
      movies.Search.filter(movie => movie.Poster !== "N/A").map(
        (movie, index) => <MovieCard key={index} data={movie} />
      )
    ) : (
      <h3>{movies.Error}</h3>
    );

  renderShows =
    shows.Response === "True" ? (
      shows.Search.filter(show => show.Poster !== "N/A").map((show, index) => (
        <MovieCard key={index} data={show} />
      ))
    ) : (
      <h3>{shows.Error}</h3>
    );

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Movies</h2>
        <div className="movie-container">
          {renderMovies instanceof Array ? (
            Object.keys(renderMovies).length === 0 ? (
              <p className="secondary-color">No Movies found</p>
            ) : (
              <Slider {...Settings}>{renderMovies}</Slider>
            )
          ) : (
            <p className="secondary-text">Loading...</p>
          )}
        </div>
      </div>
      <div className="show-list">
        <h2>Shows</h2>
        <div className="show-container">
          {renderShows instanceof Array ? (
            Object.keys(renderShows).length === 0 ? (
              <p className="secondary-text">No shows found</p>
            ) : (
              <Slider {...Settings}>{renderShows}</Slider>
            )
          ) : (
            <p className="secondary-text">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieListing;
