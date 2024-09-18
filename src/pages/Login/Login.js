import { useState, useRef, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { loginAPI } from "../../services/UserService";
import { UserContext } from "../../context/UserContext";

import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { loginContext } = useContext(UserContext);
  const navigate = useNavigate();
  const inputRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email/Password is required");
      return;
    }
    setIsLoading(true);
    let res = await loginAPI(email, password);

    if (res && res.token) {
      loginContext(email, res.token);
      navigate("/");
      toast.success("Log in success!");
    } else {
      if (res && res.status === 400) {
        setEmail("");
        setPassword("");
        inputRef.current.focus();
        toast.error(res.data.error);
      }
    }
    setIsLoading(false);
  };
  return (
    <section className="login col-11 col-sm-4 col-md-6 col-lg-5 col-xl-4">
      <form>
        <h2>Log in</h2>
        <div className="input-user">
          <label>Email or username</label>
          <input
            ref={inputRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter user or email..."
          />
        </div>
        <div className="input-password">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={isShowPassword === true ? "text" : "password"}
            placeholder="Enter password..."
          />
          <i
            onClick={() => setIsShowPassword(!isShowPassword)}
            className={
              isShowPassword === true
                ? "fa-regular fa-eye"
                : "fa-regular fa-eye-slash"
            }
          ></i>
        </div>
        <button
          disabled={email && password ? false : true}
          className={email && password ? "active" : ""}
          onClick={(e) => handleLogin(e)}
        >
          {isLoading && (
            <i className="fa-solid fa-circle-notch fa-spin me-1"></i>
          )}
          Login
        </button>
      </form>
      <div className="go-back">
        <Link to="/">
          <span>
            <i className="fa-solid fa-angle-left"></i>Go back
          </span>
        </Link>
      </div>
    </section>
  );
};

export default Login;
