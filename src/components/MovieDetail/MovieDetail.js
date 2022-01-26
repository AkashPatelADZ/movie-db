import React, { useEffect } from "react";
import "./MovieDetail.scss";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncMovieOrShow,
  getMovieOrShow,
  removeSelectedMovieOrShow,
} from "../../features/movies/movieSlice";

function MovieDetail() {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(getMovieOrShow);

  useEffect(() => {
    dispatch(fetchAsyncMovieOrShow(imdbID));
    return () => {
      dispatch(removeSelectedMovieOrShow());
    };
  }, [dispatch, imdbID]);

  const calcVotesSuffix = votes => {
    if (votes.length > 8)
      return votes.substring(0, votes.indexOf(",")).concat("M");

    if (votes.length > 4)
      return votes.substring(0, votes.indexOf(",")).concat("K");

    return votes;
  };

  return (
    <div className="movie-section">
      {Object.keys(data).length === 0 ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="section-left">
            <div className="movie-title">{data.Title}</div>

            <div className="movie-rating">
              <pre>
                <i className="fa fa-star"></i> {data.imdbRating}
              </pre>
              <pre>
                <i className="fa fa-thumbs-up"></i>{" "}
                {calcVotesSuffix(data.imdbVotes)}
              </pre>
              <pre>
                <i className="fa fa-film"></i> {data.Runtime}
              </pre>
              <pre>
                <i className="fa fa-calendar"></i> {data.Year}
              </pre>
            </div>

            <div className="movie-plot">{data.Plot}</div>

            <div className="movie-info">
              <span>Director</span>
              <span className="movie-info-data">{data.Director}</span>
              <span>Actors</span>
              <span className="movie-info-data">{data.Actors}</span>
              <span>Genres</span>
              <span className="movie-info-data">{data.Genre}</span>
              <span>Languages</span>
              <span className="movie-info-data">{data.Language}</span>
              <span>Awards</span>
              <span className="movie-info-data">{data.Awards}</span>
            </div>

            {/* <div className="movie-info">
              <div>
                <span>Director</span>
                <span>{data.Director}</span>
              </div>
              <div>
                <span>Actors</span>
                <span>{data.Actors}</span>
              </div>
              <div>
                <span>Genres</span>
                <span>{data.Genre}</span>
              </div>
              <div>
                <span>Languages</span>
                <span>{data.Language}</span>
              </div>
              <div>
                <span>Awards</span>
                <span>{data.Awards}</span>
              </div>
            </div> */}
          </div>
          <div className="section-right">
            <img src={data.Poster} alt={data.Title} />
          </div>
        </>
      )}
    </div>
  );
}

export default MovieDetail;
