import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import _ from "lodash";
import ModalUser from "./ModalUser";
import { fetchAllUser } from "../services/UserService";

const TableUsers = () => {
  const [listUser, setListUser] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [action, setAction] = useState("");
  const [dataEdit, setDataEdit] = useState({});

  const [isShowModal, setIsShowModal] = useState(false);

  const handleClose = () => {
    setIsShowModal(false);
  };
  useEffect(() => {
    //call api
    getUser(1);
  }, []);

  const getUser = async (page) => {
    const res = await fetchAllUser(page);
    if (res && res.data) {
      setPageCount(res.total_pages);
      setListUser(res.data);
    }
  };
  const handlePageClick = (e) => {
    getUser(e.selected + 1);
  };
  const handleAddUser = (user) => {
    setListUser([user, ...listUser]);
  };
  const handleEditUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUser);
    let index = cloneListUser.findIndex((item) => item.id === user.id);
    cloneListUser[index].first_name = user.first_name;
    setListUser(cloneListUser);
  };
  const handleEditUser = (user) => {
    setAction("edit");
    setDataEdit(user);
    setIsShowModal(true);
  };
  return (
    <>
      <div className="add-new my-3 d-flex justify-content-between">
        <span className="fs-4">
          <b>LIST USER:</b>
        </span>
        <button
          onClick={() => {
            setAction("add");
            setIsShowModal(true);
          }}
          className="btn btn-success"
        >
          Add new user
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((val, idx) => {
              return (
                <tr key={`users-${idx}`}>
                  <td>{val.id}</td>
                  <td>{val.email}</td>
                  <td>{val.first_name}</td>
                  <td>{val.last_name}</td>
                  <td style={{ width: "15%" }}>
                    <button
                      onClick={() => {
                        handleEditUser(val);
                      }}
                      className="btn btn-warning me-2"
                    >
                      Edit
                    </button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalUser
        handleAddUser={handleAddUser}
        show={isShowModal}
        handleClose={handleClose}
        action={action}
        dataEdit={dataEdit}
        handleEditUserFromModal={handleEditUserFromModal}
      />
    </>
  );
};

export default TableUsers;
