import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { fetchAllUser } from "../services/UserService";

const TableUsers = () => {
  const [listUser, setListUser] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    //call api
    getUser(1);
  }, []);

  const getUser = async (page) => {
    const res = await fetchAllUser(page);
    if (res && res.data) {
      setTotalUser(res.total);
      setPageCount(res.total_pages);
      setListUser(res.data);
    }
  };
  const handlePageClick = (e) => {
    getUser(e.selected + 1);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
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
    </>
  );
};

export default TableUsers;
