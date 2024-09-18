import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import "@fortawesome/fontawesome-free/css/all.min.css";
import _ from "lodash";
import Papa from "papaparse";
import { debounce } from "lodash";
import ModalUser from "../../components/ModelUser/ModalUser";
import { fetchAllUser } from "../../services/UserService";
import { toast } from "react-toastify";
import "./ManageUsers.scss";

const TableUsers = () => {
  const [listUser, setListUser] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [action, setAction] = useState("");
  const [dataEdit, setDataEdit] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");
  const [dataExport, setDataExport] = useState([]);
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
  const handleDeleteUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUser);
    let list = cloneListUser.filter((val) => val.id !== user.id);
    setListUser(list);
  };
  const handleEditUser = (user) => {
    setAction("edit");
    setDataEdit(user);
    setIsShowModal(true);
  };
  const handleDeleteUser = (user) => {
    setAction("delete");
    setDataDelete(user);
    setIsShowModal(true);
  };
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListUser = _.cloneDeep(listUser);
    cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
    setListUser(cloneListUser);
  };
  const handleSearch = debounce((e) => {
    let search = e.target.value;
    if (search) {
      let cloneListUser = _.cloneDeep(listUser);
      cloneListUser = cloneListUser.filter((item) =>
        item.email.includes(search)
      );
      setListUser(cloneListUser);
    } else {
      getUser(1);
    }
  }, 400);
  const getDataExport = (event, done) => {
    let result = [];
    if (listUser && listUser.length > 0) {
      result.push(["Id", "Email", "First name", "Last name"]);
      listUser.map((val) => {
        let arr = [];
        arr[0] = val.id;
        arr[1] = val.email;
        arr[2] = val.first_name;
        arr[3] = val.last_name;
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
  };
  const handleImportCSV = (e) => {
    let file = e.target.files[0];
    let totalSizeMB = file.size / Math.pow(1024, 2);

    if (file.type !== "text/csv") {
      toast.error("Only accept CSV file...");
      return;
    }
    if (totalSizeMB > 5) {
      toast.error("File smaller than 5MB ");
      return;
    }
    Papa.parse(file, {
      //header: true
      complete: function (results) {
        let rawCSV = results.data;
        if (rawCSV.length > 0) {
          if (rawCSV[0] && rawCSV[0].length === 3) {
            if (
              rawCSV[0][0] !== "email" ||
              rawCSV[0][1] !== "first_name" ||
              rawCSV[0][2] !== "last_name"
            ) {
              toast.error("Wrong format Header CSV file");
            } else {
              let result = [];
              rawCSV.map((val, idx) => {
                if (idx > 0 && val.length === 3) {
                  let obj = {};
                  obj.email = val[0];
                  obj.first_name = val[0];
                  obj.last_name = val[0];
                  result.push(obj);
                }
              });
              setListUser(result);
            }
          } else {
            toast.error("Wrong format CSV file");
          }
        }
      },
    });
  };
  return (
    <section className="page-manage">
      <Container>
        <div className="my-3">
          <span className="fs-3">
            <b>LIST USER:</b>
          </span>
        </div>
        <div className="mb-4 d-md-flex justify-content-between align-items-center">
          <div className="col-12 col-md-6">
            <input
              className="d-block border border-2 fs-6 mb-2 mb-md-0 col-12 col-md-11 col-lg-8 px-2 py-1 rounded-2"
              placeholder="Enter your search email..."
              onChange={(e) => handleSearch(e)}
            />
          </div>
          <div className="btn-groups col-12 col-md-6 d-flex justify-content-between justify-content-lg-end">
            <div className="col-sm-4 col-lg-3">
              <label
                className="btn btn-warning px-3 px-sm-0 col-12"
                htmlFor="import"
              >
                <i className="fa-solid fa-file-export me-1"></i>Import
              </label>
              <input
                onChange={(e) => handleImportCSV(e)}
                id="import"
                type="file"
                hidden
              />
            </div>

            <CSVLink
              data={dataExport}
              asyncOnClick={true}
              onClick={getDataExport}
              filename={"users.csv"}
              className="btn btn-primary mx-1 mx-sm-0 col-sm-3 mx-lg-3"
            >
              <i className="fa-solid fa-file-arrow-down me-1"></i>Export
            </CSVLink>

            <button
              onClick={() => {
                setAction("add");
                setIsShowModal(true);
              }}
              className="btn btn-success px-3 px-sm-0 col-sm-4 col-lg-3"
            >
              <i className="fa-solid fa-circle-plus me-1"></i>Add new
            </button>
          </div>
        </div>
        <div className="table">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="d-flex justify-content-between">
                  <span className="me-1 me-md-0">ID</span>
                  <div className="d-flex d-md-block">
                    <span role="button" style={{ marginRight: "2px" }}>
                      <i
                        className="fa-solid fa-arrow-up-long"
                        onClick={() => handleSort("asc", "id")}
                      ></i>
                    </span>
                    <span role="button">
                      <i
                        className="fa-solid fa-arrow-down-long"
                        onClick={() => handleSort("desc", "id")}
                      ></i>
                    </span>
                  </div>
                </th>
                <th>Email</th>
                <th className="d-flex justify-content-between">
                  <span>First Name</span>
                  <div className="d-flex d-md-block">
                    <span role="button" style={{ marginRight: "2px" }}>
                      <i
                        className="fa-solid fa-arrow-up-long"
                        onClick={() => handleSort("asc", "first_name")}
                      ></i>
                    </span>
                    <span role="button">
                      <i
                        className="fa-solid fa-arrow-down-long"
                        onClick={() => handleSort("desc", "first_name")}
                      ></i>
                    </span>
                  </div>
                </th>
                <th>Last Name</th>
                <th className="col-lg-2">Actions</th>
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
                      <td className="d-md-flex align-center justify-content-center">
                        <button
                          onClick={() => {
                            handleEditUser(val);
                          }}
                          className="btn btn-warning mb-1 mb-md-0 me-md-2"
                        >
                          <i className="fa-solid fa-pen-to-square me-1"></i>Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(val)}
                          className="btn btn-danger"
                        >
                          <i className="fa-solid fa-trash-can me-1"></i>Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
        <ReactPaginate
          className="pagination"
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
          dataDelete={dataDelete}
          handleEditUserFromModal={handleEditUserFromModal}
          handleDeleteUserFromModal={handleDeleteUserFromModal}
        />
      </Container>
    </section>
  );
};

export default TableUsers;
