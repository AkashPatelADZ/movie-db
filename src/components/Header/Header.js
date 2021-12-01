import React, { useState } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import user_logo from "../../images/user.jpg";
import { useDispatch } from "react-redux";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";

function Header() {
  const [searchKey, setSearchKey] = useState("");
  const dispatch = useDispatch();

  const searchHandler = e => {
    e.preventDefault();
    if (searchKey === "") return alert("Please enter text in search");
    dispatch(fetchAsyncMovies(searchKey));
    dispatch(fetchAsyncShows(searchKey));
    setSearchKey("");
  };

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">The Movie DB</Link>
      </div>
      <div className="search-bar">
        <form onSubmit={searchHandler}>
          <input
            type="text"
            value={searchKey}
            placeholder="Search"
            onChange={e => setSearchKey(e.target.value)}
          />
          <button type="submit">
            <i className="fa fa-search" />
          </button>
        </form>
      </div>
      <div className="user-image">
        <img src={user_logo} alt="user.jpg" />
      </div>
    </div>
  );
}

export default Header;
