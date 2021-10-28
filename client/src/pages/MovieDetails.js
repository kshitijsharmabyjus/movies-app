import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import Loader from '../components/Loader';

function MovieDetails() {
    const { movieId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [details, setDetails] = useState({});

    useEffect(() => {
        fetchMovieDetails();
    }, [])

    const fetchMovieDetails = async () => {
        try {
            setLoading(true);
            const response = await axios({
                method: 'get',
                url: `http://localhost:4000/api/movies/${movieId}`
            });
            setLoading(false);
            setDetails(response.data.movie);
        }
        catch (e) {
            setError(e.message);
        }
    }

    return (
        <Card bg="primary" text="white">
            {error && <Alert variant='danger'>{error}</Alert>}
            {loading ?
                <Loader />
                :
                <>
                    <Card.Header><h1>{details.title}</h1></Card.Header>
                    <Card.Body>
                        <div className="d-flex">
                            <Card.Img variant="top" src={details.poster} style={{ width: "40vw", height: "40vh" }} />
                            <Card.Text className="m-5 p-3">
                                <div>Rating: {details.rating}</div>
                                <div>Collections ($): {details.collections}</div>
                                <div>Created At: {moment(details.createdAt).format('DD-MMM-YYYY')}</div>
                                <div>Updated At: {moment(details.updatedAt).format('DD-MMM-YYYY')}</div>
                            </Card.Text>
                        </div>
                    </Card.Body>
                </>
            }
        </Card>
    )
}

export default MovieDetails;