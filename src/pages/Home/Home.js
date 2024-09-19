import Container from "react-bootstrap/Container";
import "./Home.scss";

const Home = () => {
  return (
    <section className="page-home">
      <Container>
        <h1 className="my-3">Project React JS</h1>
        <h3 className="fs-3 mb-3 text-primary-emphasis">Analysis</h3>
        <div className="project">
          <ol className="list-group list-group-numbered">
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-semibold">
                  Create git repos, setup git local
                </div>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-semibold">
                  Login, use Axios to send a request and store to local storage.
                </div>
                <ul>
                  <li>Use hook useContext</li>
                  <li>Integrate Redux and remove useContext</li>
                </ul>
              </div>
              <span className="badge text-bg-primary rounded-pill">2</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-semibold">CRUD users</div>
                <ul>
                  <li>List users</li>
                  <li>Create a user</li>
                  <li>Edit a user</li>
                  <li>Delete a user</li>
                </ul>
              </div>
              <span className="badge text-bg-primary rounded-pill">4</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-semibold">Custommize list user</div>
                <ul>
                  <li>Paginate list user</li>
                  <li>Filter by id</li>
                  <li>Sort by first name</li>
                  <li>Search by email</li>
                </ul>
              </div>
              <span className="badge text-bg-primary rounded-pill">4</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-semibold">Working with excel</div>
                <ul>
                  <li>Import csv (read file csv)</li>
                  <li>Export csv</li>
                </ul>
              </div>
              <span className="badge text-bg-primary rounded-pill">2</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-semibold">
                  Authentication for Manage Users Page
                </div>
                <ul>
                  <li>Require user login to access the Manage Users page</li>
                </ul>
              </div>
              <span className="badge text-bg-primary rounded-pill">1</span>
            </li>
          </ol>
        </div>
      </Container>
    </section>
  );
};

export default Home;
