import { useState, useEffect } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { isEmpty } from "lodash"

import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');
    const history = useHistory();

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            setLoading(true);
            const response = await axios(`http://localhost:4000/api/movies?searchText=${searchText}`);
            setLoading(false);
            setMovies(response.data);
            setError(null);
        }
        catch (e) {
            setLoading(false);
            setError(`Server Error: ${e.message}`);
        }
    }

    const onClickViewMovie = ({ id }) => {
        history.push(`/${id}`);
    }

    return (
        <>
            <SearchBar onClickSearch={fetchMovies} setSearchText={setSearchText} searchText={searchText} />
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ?
                <Loader />
                : <>
                    <div className="d-flex flex-wrap justify-content-around">
                        {isEmpty(movies) ?
                            <div className="d-flex m-5 p-5">
                                <h1>Movie Not Available</h1>
                            </div> :
                            movies.map(movie => {
                                const { title, id, rating, genre, language, actors } = movie;

                                return (
                                    <Card key={id} className="m-3 movie-card">
                                        <Card.Title className="bg-secondary p-2 text-white" ><h2>{title}</h2></Card.Title>
                                        <Card.Body>
                                            <Card.Text>
                                                <div>
                                                    <h5>IMDB rating : </h5>{rating}
                                                </div>
                                                <div>
                                                  <h5>  Genre : </h5> {genre}
                                                </div>
                                                <div>
                                                    <h5>Language : </h5> {language}
                                                </div>
                                                <div>
                                                    <h4>Actors : </h4>{actors}
                                                </div>
                                            </Card.Text>
                                            <Button
                                                variant="success"
                                                onClick={() => onClickViewMovie(movie)}>
                                                View Movie
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                )
                            })
                        }
                    </div>
                </>
            }
        </>
    )
}

export default Home;