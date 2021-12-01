import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
};

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async movieTitle => {
    const response = await movieApi.get(
      `/?apikey=${APIKey}&s=${movieTitle}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async showTitle => {
    const response = await movieApi.get(
      `/?apikey=${APIKey}&s=${showTitle}&type=series`
    );
    return response.data;
  }
);

export const fetchAsyncMovieOrShow = createAsyncThunk(
  "movies/fetchAsyncMovieOrShow",
  async imdbID => {
    const response = await movieApi.get(
      `/?apiKey=${APIKey}&i=${imdbID}&plot=full`
    );
    return response.data;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: state => {
      state.selectedMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("Fetched Movies");
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("Failed while fething movies");
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log("Fetched Shows");
      return { ...state, shows: payload };
    },
    [fetchAsyncShows.rejected]: () => {
      console.log("Failed while fetching shows");
    },
    [fetchAsyncMovieOrShow.fulfilled]: (state, { payload }) => {
      console.log("Fetched Movie/Show");
      return { ...state, selectedMovieOrShow: payload };
    },
    [fetchAsyncMovieOrShow.rejected]: () => {
      console.log("Failed tofetch Movie/Show");
    },
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = state => state.movies.movies;
export const getAllShows = state => state.movies.shows;
export const getMovieOrShow = state => state.movies.selectedMovieOrShow;
export default movieSlice.reducer;
