import logo from "./logo.svg";
import "./App.css";
import TestForm, { ValidationSchemaExample } from "./components/form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";

function App() {
  const [formValues, setFormValues] = useState();
  const hadleSubmit = (values) => {
    console.log(values);
    setFormValues(values);
  };
  return (
    <div className="App">
       <h1>Hobbies Form</h1>
      <Container fluid>
        <Row>
          <Col xs={6}>
            {" "}
            <ValidationSchemaExample onSubmit={hadleSubmit} />
          </Col>
          <Col xs={6}>
            {formValues ? (
              <ListGroup>
                <ListGroup.Item><b>Name:</b> {formValues.firstName}</ListGroup.Item>
                <ListGroup.Item><b>Surname:</b> {formValues.lastName}</ListGroup.Item>
                <ListGroup.Item><b>Email:</b> {formValues.email}</ListGroup.Item>
                <ListGroup.Item><b>Hobbies:</b> {
                  formValues.hobbies.map(hobbie => (
                    hobbie.label + " "
                  ))
                  }</ListGroup.Item>
              </ListGroup>
            ) : 
            <ListGroup>
              <ListGroup.Item>Submite form to view results</ListGroup.Item>
            </ListGroup>
            }
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
