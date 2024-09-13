import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import Container from "react-bootstrap/Container";
import "./App.scss";
import ModalAddNewUser from "./components/ModalAddNewUser";
import { useState } from "react";

function App() {
  const [isShowModal, setIsShowModal] = useState(false);

  const handleClose = () => {
    setIsShowModal(false);
  };
  return (
    <div className="app-container">
      <Header />
      <Container>
        <div className="add-new my-3 d-flex justify-content-between">
          <span className="fs-4">
            <b>LIST USER:</b>
          </span>
          <button
            onClick={() => setIsShowModal(true)}
            className="btn btn-success"
          >
            Add new user
          </button>
        </div>
        <TableUsers />
      </Container>
      <ModalAddNewUser show={isShowModal} handleClose={handleClose} />
    </div>
  );
}

export default App;
