import { useState, useEffect } from "react";
import QuoteContainer from "./QuoteContainer";
import Spinner from 'react-bootstrap/Spinner';

const Quotes = () => {
    const url = 'https://autumnchris-quotes.herokuapp.com/api/quotes';
    const [quotes, setQuotes] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        loadQuote();
    }, []);


    const loadQuote = async () => {
        try {
            const response = await fetch(url, { mode: 'cors' });
            const data = await response.json();
            setQuotes(data);
            setIsLoading(false);
        }
        catch (e) {
            console.log(e)
        }
    }
    if (isLoading) {
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
      </Spinner>
    }

    return (
        <QuoteContainer quotes={quotes} />
    )
}

export default Quotes;