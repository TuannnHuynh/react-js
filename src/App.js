import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "./context/UserContext";
import "./App.scss";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import ManageUsers from "./pages/ManageUsers/ManageUsers";
import Login from "./pages/Login/Login";

function App() {
  const { user, loginContext } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginContext(
        localStorage.getItem("email"),
        localStorage.getItem("token")
      );
    }
  }, []);
  return (
    <>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ManageUsers" element={<ManageUsers />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
