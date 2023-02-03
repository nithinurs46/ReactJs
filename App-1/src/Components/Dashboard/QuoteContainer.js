import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import RefreshIcon from '@mui/icons-material/Refresh';

const QuoteContainer = ({ quotes }) => {

    const [quote, setQuote] = useState({});
    useEffect(() => {
        randomizeQuotes();
    }, []);

    const randomizeQuotes = () => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(prevRandomQuote => {
            return {
                ...prevRandomQuote,
                quote: randomQuote.quote,
                source: randomQuote.source
            };
        });
    }

    return (
        <div>
            <blockquote className="blockquote mb-0">
                <p className="text-center" style={{ fontSize: 17 }}>
                    <span>&#8220;</span>{quote.quote}<span>&#8221;</span>
                </p>
                <p className="text-center">
                    <footer className="blockquote-footer"><i>{quote.source}</i>
                    </footer>
                </p>
            </blockquote>
            <div style={{ display: "flex", justifyContent: 'flex-end' }}>
                <IconButton>
                    <RefreshIcon onClick={() => randomizeQuotes()} />
                </IconButton>
            </div>
        </div>
    )
}
export default QuoteContainer;