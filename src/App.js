import { ToastContainer } from "react-toastify";
import { useEffect, useContext } from "react";
import { UserContext } from "./context/UserContext";
import "./App.scss";
import Header from "./components/Header/Header";
import AppRoutes from "./routes/AppRoutes";

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
        <AppRoutes />
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
