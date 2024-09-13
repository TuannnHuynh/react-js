import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { validateForm } from "../services/validation";

const ModalAddNewUser = ({ handleClose, show }) => {
  const initForm = {
    touched: {
      name: false,
      job: false,
    },
  };
  const [formData, setFormData] = useState(initForm);
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  useEffect(() => {
    if (!show) {
      setJob("");
      setName("");
      setFormData(initForm);
    }
  }, [show]);
  const handleSaveUser = () => {
    console.log("Name: ", name, "---- Job: ", job);
  };
  const onBlur = (e) => {
    const { name } = e.target;
    console.log(name);

    setFormData({
      touched: { ...formData.touched, [name]: true },
    });
  };

  const errors = validateForm(formData, name, job);
  const isFormValid = !errors.name && !errors.job && name && job;
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                className="form-control"
                onBlur={onBlur}
              />
              {errors.name && (
                <small className="d-block text-danger">{errors.name}</small>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Job</label>
              <input
                onChange={(e) => setJob(e.target.value)}
                type="text"
                value={job}
                name="job"
                className="form-control"
                onBlur={onBlur}
              />
              {errors.job && (
                <small className="d-block text-danger">{errors.job}</small>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            disabled={!isFormValid}
            variant="primary"
            onClick={() => handleSaveUser()}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNewUser;
