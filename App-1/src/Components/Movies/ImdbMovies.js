import { useState, Fragment } from 'react';
import './Movies.css';
import Results from './Results';
import Search from '../Layout/Search';
import MovieDetailsDialog from './MovieDetailsDialog';
import LoadingSpinner from '../Layout/LoadingSpinner';
import loaderClasses from "../Layout/LoadingSpinner.module.css"

const API_KEY = '488a1695';
const API_URL = 'http://www.omdbapi.com/?apikey=' + API_KEY;
const ImdbMovies =  () => {
    const [details, setDetails] = useState(false);
    const [movie, setMovie] = useState({
        s: "",
        results: [],
        selected: {},
    });
    const [isLoading, setIsLoading] = useState(false);
    
    const searchHandler = async (searchText) => {
      setIsLoading(true);
            const url = API_URL + '&s=' + searchText;
            try {
              const response = await fetch(url);
              const data = await response.json();
              const results = data.Search;
              setMovie((prevState) => {
                return { ...prevState, results: results };
            });
            } catch (error) {
              console.log(error);
              setIsLoading(false);
            }
            setIsLoading(false);
    };

    const openDetail = async (id) => {
        const url = API_URL + '&i=' + id;
        try {
          const response = await fetch(url);
          const results = await response.json();
          setDetails(true);
          setMovie((prevState) => {
            return { ...prevState, selected: results, details };
        });
        } catch (error) {
          console.log(error);
        }
    };

    const closeDetail = () => {
      setDetails(false);
      setMovie((prevState) => {
            return { ...prevState, selected: {} };
        });
    };

    return (
        <Fragment>
            <h6>Search Movie from OMDB</h6>
          <Search onSearch={searchHandler} />
          {isLoading && (
          <div className={loaderClasses.loading}>
          <LoadingSpinner />
        </div>
        )}
        {!isLoading && (
            <Results results={movie.results} openDetail={openDetail} />
        )}
            {details && (
              <MovieDetailsDialog modalState={details} selected={movie.selected} closeDetail={closeDetail}></MovieDetailsDialog>
            )}
        </Fragment>
      );
}

export default ImdbMovies;