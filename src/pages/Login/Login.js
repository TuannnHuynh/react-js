import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { handleLoginRedux } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const isLoading = useSelector((state) => state.user.isLoading);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const inputRef = useRef();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email/Password is required");
      return;
    }
    dispatch(handleLoginRedux(email, password));
  };
  useEffect(() => {
    if (user && user.isError === true) {
      setEmail("");
      setPassword("");
      inputRef.current.focus();
    }
    if (user.account && user.account.auth === true) {
      navigate("/");
      toast.success("Login Successfully");
    }
  }, [user]);
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
