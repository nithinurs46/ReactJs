import React from "react";
import Result from "./Result";
  
function Results({ results, openDetail }) {
  return (
    <section className="results">
      {results  ? (
        results.map((result) => (
          <Result key={result.imdbID} result
              ={result} openDetail={openDetail} />
        ))
      ) : (
          <h6 className="error-text">Movie not found...</h6>
      )}
    </section>
  );
}
  
export default Results;