import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { act, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { validateForm } from "../../services/validation";
import "./ModalUser.scss";
import {
  postCreateUser,
  putUpdateUser,
  deleteUser,
} from "../../services/UserService";

const ModalUser = ({
  handleAddUser,
  handleClose,
  show,
  action,
  dataEdit,
  dataDelete,
  handleEditUserFromModal,
  handleDeleteUserFromModal,
}) => {
  const initForm = {
    touched: {
      name: false,
      job: false,
    },
  };
  const [formData, setFormData] = useState(initForm);
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const handleSaveUser = async () => {
    let res = await postCreateUser(name, job);
    if (res && res.id) {
      //success
      handleClose();
      setName("");
      setJob("");
      setFormData(initForm);
      toast.success("A User is created succeed");
      handleAddUser({ first_name: res.name, id: res.id, job: res.job });
    } else {
      //error
      toast.error("An error...");
    }
  };
  const handleEditUser = async () => {
    let res = await putUpdateUser(dataEdit.id, name, job);
    if (res && res.updatedAt) {
      handleEditUserFromModal({
        first_name: name,
        id: dataEdit.id,
      });
      setName("");
      setJob("");
      handleClose();
      setFormData(initForm);
      toast.success("User updated successfully!");
    } else {
      toast.error("An error occurred while updating.");
    }
  };
  const handleDeleteUser = async () => {
    let res = await deleteUser(dataDelete.id);
    if (res && +res.statusCode === 204) {
      toast.success("Delete user succeed!");
      handleClose();
      handleDeleteUserFromModal(dataDelete);
    } else {
      toast.error("Error delete user");
    }
  };
  useEffect(() => {
    if (show) {
      setName(dataEdit.first_name);
      setJob(dataEdit.job || "");
    }
  }, [dataEdit, show]);
  useEffect(() => {
    if (!show || action === "add") {
      setFormData(initForm);
      setJob("");
      setName("");
    }
  }, [show]);
  const onBlur = (e) => {
    const { name } = e.target;
    setFormData({
      touched: { ...formData.touched, [name]: true },
    });
  };

  let errors = validateForm(formData, name, job);
  const isFormValid = !errors.name && !errors.job && name && job;
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          {action === "add" ? (
            <Modal.Title>Add new user</Modal.Title>
          ) : action === "edit" ? (
            <Modal.Title>Edit user</Modal.Title>
          ) : (
            <Modal.Title>Delete user</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          {action === "delete" ? (
            <div>
              This action can't be undone! Do want to delete this user?
              <br />
              <b>email = {dataDelete.email}</b>
            </div>
          ) : (
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
          )}
        </Modal.Body>
        <Modal.Footer>
          {action === "add" ? (
            <>
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
            </>
          ) : action === "edit" ? (
            <>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                disabled={!isFormValid}
                variant="primary"
                onClick={() => handleEditUser()}
              >
                Confirm
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={() => handleDeleteUser()}>
                Confirm
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
