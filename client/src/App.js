import {BrowserRouter as Router} from "react-router-dom";
import { Container } from "react-bootstrap";

import Header from "./components/Header";
import Routes from "./Routes";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Container className="mt-5">
        <Routes/>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
