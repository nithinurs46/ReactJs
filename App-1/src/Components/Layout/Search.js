import { useRef } from 'react';
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";

const Search = (props) => {
    const searchTermRef = useRef();
    const handleSearch = () => {
        props.onSearch(searchTermRef.current.value);
    }
    const keyUpHandler=(event)=>{
        if (event.key === "Enter") {
            props.onSearch(searchTermRef.current.value);
          }
    }
    return (
        <Row>
            <Col>
                <input type="text" size="lg" className="form-control mt-1" 
                placeholder="Enter text to search" ref={searchTermRef} 
                onKeyUp={keyUpHandler} />
            </Col>
            <Col>
                <button type="button"
                    className="button"
                    
                    onClick={() => handleSearch()}>Search</button>
            </Col>
        </Row>
    )
}

export default Search;