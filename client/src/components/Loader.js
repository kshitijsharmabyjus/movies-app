import {  Spinner } from "react-bootstrap"

const Loader = () => {
    return (
        <div className="d-flex justify-content-center mt-5">
            <Spinner animation="border" size="100px"/>
        </div>
           
    )
}

export default Loader
