import { Container, Row, Col } from 'react-bootstrap';
import FormRegister from '../components/FormRegister/FormRegister';
import '../styles/landing.css';
import '../styles/main.css';

const LandingPage = () => {

    return(
        <Container fluid className="main-content cover-background-landing">
            <Row>
                <Container>
                    <Row className='landing-text' >
                        <Col sm={12} md={6}>
                            <Container className="p-3 mt-5">
                                <div>
                                    <h3>COURSES A<span className="text-danger">K</span>ADEMY</h3>
                                    <hr className="deep-purple accent-2 mb-3 mt-0 d-inline-block mx-auto"></hr>
                                    <p className="mt-2">We invite you to try some of the many courses offered by this learning platform.</p>
                                    <p>The programming courses we offer are the future, increase your income immediately after finishing one of our courses, don't miss it!</p>
                                </div>
                            </Container>
                        </Col>
                        <Col sm={12} md={6}>
                            <Container className="p-3 mt-5">
                                <FormRegister />
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </Row>
        </Container>
    );
}

export default LandingPage