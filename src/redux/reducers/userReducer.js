import {
  FETCH_USER_LOGIN,
  FETCH_USER_ERROR,
  FETCH_USER_SUCCESS,
  USER_LOGOUT,
  USER_RELOAD,
} from "../actions/userActions";

const INITIAL_STATE = {
  account: { email: "", auth: null, token: "" },
  isLoading: false,
  isError: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        account: {
          email: action.data.email,
          auth: true,
          token: action.data.token,
        },
        isLoading: false,
        isError: false,
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
        account: {
          auth: false,
        },
        isLoading: false,
        isError: true,
      };
    case USER_LOGOUT:
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      return {
        ...state,
        account: {
          email: "",
          auth: false,
          token: "",
        },
        isLoading: false,
        isError: false,
      };
    case USER_RELOAD:
      return {
        ...state,
        account: {
          email: localStorage.getItem("email"),
          auth: true,
          token: localStorage.getItem("token"),
        },
      };
    default:
      return state;
  }
};

export default userReducer;
