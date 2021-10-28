import { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router';
import axios from 'axios';

const AddMovie = () => {
    const [formValues, setFormValues] = useState()
    const [error, setError] = useState(null);
    const history= useHistory()

    const onChangeFormValues =(e)=>{
        const {value, name, type} = e.target

        setFormValues({
            ...formValues,
            [name]:type==="number"?Number(value):value
        })
    }

    const onClickSubmit = async()=>{
        try{
            await axios({
                url:'http://localhost:4000/api/movies',
                method:'POST',
                data:formValues
            })
            history.push('/')
        }catch(e){
            setError(`Error: ${e.message}`);
        }

    }
    return (
        <Card className="m-5">
             {error && <Alert variant="danger">{error}</Alert>}
        <Card.Header>
            <h4>Add a Movie</h4>
        </Card.Header>
        <Card.Body>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Movie Title</Form.Label>
                <Form.Control type="text" name="title" onChange={onChangeFormValues} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="rating">
                <Form.Label>Movie Rating</Form.Label>
                <Form.Control type="number" name="rating" onChange={onChangeFormValues} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="poster">
                <Form.Label>Movie Poster</Form.Label>
                <Form.Control type="text" name="poster" onChange={onChangeFormValues} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="actors">
                <Form.Label>Actors</Form.Label>
                <Form.Control type="text" name="actors" onChange={onChangeFormValues} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="language">
                <Form.Label>Languages</Form.Label>
                <Form.Control type="text" name="language" onChange={onChangeFormValues} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="genre">
                <Form.Label>Genre</Form.Label>
                <Form.Control type="text" name="genre" onChange={onChangeFormValues} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="collections">
                <Form.Label>Collections ($)</Form.Label>
                <Form.Control type="number" name="collections" onChange={onChangeFormValues} />
            </Form.Group>
            <Button variant="primary" type="button" onClick={onClickSubmit}>
                Submit
            </Button>
        </Card.Body>
    </Card>
    )
}

export default AddMovie
