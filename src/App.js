import React, { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

//"http://www.omdbapi.com/?apikey=[yourkey]&"
const API_URL = `http://www.omdbapi.com/?apikey=b6003d8a&`;

// dummy data from the API
// const movie1 = {
//   Title: "Superman II",
//   Year: "1980",
//   imdbID: "tt0081573",
//   Type: "movie",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BODk2NjgzNTEtYzZhZC00ZTBkLTllMGQtMmMxMzU1NDRkM2RlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg",
// };

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    console.log(data.Search);
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Superman");
  }, []);

  return (
    <div className="app">
      <h1> KXNG Theatre </h1>

      <div className="search">
        <input
          placeholder="Search for a film..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => searchMovies(search)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {/* <MovieCard movie1={movies[0]} /> */}
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2> No films found </h2>
        </div>
      )}
    </div>
  );
};

export default App;
