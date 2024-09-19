import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/esm/Container";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const user = useSelector((state) => state.user.account);

  if (user && !user.auth) {
    return (
      <Container className="mt-3">
        <Alert variant="danger">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>You don't have permission to access this route</p>
        </Alert>
      </Container>
    );
  }

  return <>{props.children}</>;
};

export default PrivateRoute;
