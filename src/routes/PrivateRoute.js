import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/esm/Container";

const PrivateRoute = (props) => {
  const { user } = useContext(UserContext);

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
  console.log("dasdasdasd");

  return <>{props.children}</>;
};

export default PrivateRoute;
