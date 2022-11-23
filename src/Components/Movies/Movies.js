import { useState, useEffect } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import './Movies.css';
import Search from "../Layout/Search";
import MovieList from './MovieList';

const API_KEY = '488a1695';
const API_URL = 'http://www.omdbapi.com/?apikey='+API_KEY 
const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const fetchMovies = async (searchText) => {
    setError(null);
    try {
      const url = API_URL +'&s='+searchText;
      const response = await fetch(url);
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const searchHandler = (searchText) => {
    if (searchText === '') {
      return;
    }
    fetchMovies(searchText);
  }

  useEffect(() => {
		
	}, []);

  return (
    <Fragment>
        <Breadcrumb>
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Movies</Breadcrumb.Item>
        </Breadcrumb>
          <ul className="list-group">
            <Search onSearch={searchHandler} />
            <MovieList movies={movies} />
          </ul>
        {error && (
          <p className='error-text'>{error}</p>
        )}
    </Fragment>
  );


}

export default Movies;