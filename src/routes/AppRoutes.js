import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import ManageUsers from "../pages/ManageUsers/ManageUsers";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route
        path="/ManageUsers"
        element={
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
