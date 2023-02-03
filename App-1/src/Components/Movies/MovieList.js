import React, { Fragment } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';

const MovieList = (props) => {
	return (
		<Fragment>
            <Accordion alwaysOpen>
            {props.movies.map((movie, key) => (
                <Accordion.Item eventKey={key}>
                  <Accordion.Header>{movie.Title}</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup>
                      <ListGroup.Item>Release Year : {movie.Year}</ListGroup.Item>
                      <ListGroup.Item>Imdb Id : {movie.imdbID}</ListGroup.Item>
                      <ListGroup.Item>Type : {movie.Type}</ListGroup.Item>
                      <ListGroup.Item><img src={movie.Poster} alt='movie'></img> </ListGroup.Item>
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
		</Fragment>
	);
};

export default MovieList;