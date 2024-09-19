import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.scss";
import { handleReload } from "./redux/actions/userActions";
import Header from "./components/Header/Header";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(handleReload());
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
