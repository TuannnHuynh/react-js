import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/esm/Container";

const NotFound = () => {
  return (
    <Container className="mt-3">
      <Alert variant="danger">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>Page not found</p>
      </Alert>
    </Container>
  );
};

export default NotFound;
