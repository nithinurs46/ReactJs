import { useState, useEffect, useCallback, Fragment, useContext } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Accordion from 'react-bootstrap/Accordion';
import './Movies.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import LoadingSpinner from '../Layout/LoadingSpinner';
import loaderClasses from "../Layout/LoadingSpinner.module.css"

const StarWarsMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films', {
        method: 'GET'
      },  { mode: 'no-cors'});
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      const transformMovies = data.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date,
          director: movie.director,
          producer: movie.producer,
          characters:movie.characters,
          actors:''
        }
      })
      transformMovies.sort((a, b) => (a.id > b.id) ? 1 : -1)
      setMovies(transformMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]); //No dependencies added, so re-render will not happen when something changes.
  //UseCallback to load the changes when state changes.

  const loadCharacters =  (characters, id) =>  async (event, newExpanded) => {
    let castNames = [];
    const loadAll = await Promise.all(
      characters.map(async (ch) => {
        const response = await fetch(ch);
        const data = await response.json();
        castNames.push(data.name)
      })
    );
    let selectedMovie = movies[id-1];
    selectedMovie.actors = castNames.join();
    const updatedMovies =  movies.map(m => m.id !== selectedMovie.id ? m : selectedMovie);
    setMovies(updatedMovies);  
    
  };

  const handleSearch = (event) => {
    if (event.target.value === "") {
      setMovies(fetchMovies());
      return;
    }
    const filteredMovies = movies.filter(
      (item) =>
        item.title.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
    );
    setMovies(filteredMovies);
  };

  return (
    <Fragment>
      <div className="container" style={{ marginTop: '60px' }}>
        <Breadcrumb>
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Movies</Breadcrumb.Item>
        </Breadcrumb>
        <button onClick={fetchMovies} >Fetch Movies</button>
        <br /><br />
        {isLoading && (
          <div className={loaderClasses.loading}>
          <LoadingSpinner />
        </div>
        )}
        {!isLoading && (

          <ul className="list-group">
            <Row>
              <Form.Label column lg={1}>
                Search
              </Form.Label>
              <Col>
                <Form.Control type="text" placeholder="Enter Title" onChange={handleSearch} />
              </Col>
            </Row>

            <Accordion alwaysOpen>
              {movies.map((item, key) => (
                <Accordion.Item eventKey={key} onClick={loadCharacters(item.characters, item.id)}>
                  <Accordion.Header>Epsisode {item.id}. {item.title} ({item.releaseDate})</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup>
                      <ListGroup.Item>{item.openingText}</ListGroup.Item>
                      <ListGroup.Item>Director: {item.director}</ListGroup.Item>
                      <ListGroup.Item>Producer: {item.producer}</ListGroup.Item>
                      <ListGroup.Item>Actors: {item.actors}</ListGroup.Item>
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>

              ))}
            </Accordion>
          </ul>
        )}
        {error && (
          <p className='error-text'>{error}</p>
        )}
      </div>
    </Fragment>
  );


}

export default StarWarsMovies;