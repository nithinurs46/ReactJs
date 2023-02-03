import { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import NewsLayout from "./NewsLayout";
import LoadingSpinner from "../Layout/LoadingSpinner";
import loaderClasses from "../Layout/LoadingSpinner.module.css";
import { getData } from "../../lib/api";
import { Col, Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import Search from "../Layout/Search";

const News = () => {
  const url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=<ENTER_KEY_HERE>';
  const [apiUrl, setApiUrl] = useState(url);
  const { sendRequest, status, data, error } = useHttp(getData, true);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    sendRequest(apiUrl)
  }, [sendRequest, searchText]);

  if (status === 'pending') {
    return (
      <div className={loaderClasses.loading}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className='centered focused'>{error}</p>;
  }

  if (status === 'completed' && (!data || data.length === 0)) {
    return <p>No news found...</p>;
  }

  const searchHandler = (text) => {
    setSearchText(text);
    const searchUrl = 'https://newsapi.org/v2/everything?q=' + text + '&apiKey=39554764832b4c7785272937f1256688';
    setApiUrl(searchUrl);
  }

  let newsCard = data.articles.map(news => {
    return (
      <Col sm="4">
        <NewsLayout url={news.url} urlToImage={news.urlToImage} title={news.title}
          content={news.content} description={news.description} />
      </Col>
    )
  })
  return (
    <Container fluid>
      <Search onSearch={searchHandler} />
      <Row>
        {newsCard}
      </Row>
    </Container>
  )

}

export default News;
