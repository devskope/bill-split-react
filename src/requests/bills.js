import Axios from "./axios";
import { buildPath } from "../helpers";

const networkError =
  "A network error occured, verify your internet connection and try again";

const basePath = "/bills";

const tokenObj = JSON.parse(localStorage.getItem("billsplit::token"));

const authTokenHeader = {
  headers: { authorization: `${tokenObj?.type} ${tokenObj?.accessToken}` }
};

const user_account_id = JSON.parse(localStorage.getItem("billsplit::user"))
  ?.user_account_id;

export default {
  async get({ path, options = {} }) {
    const response = { data: null, error: null };
    try {
      const {
        data: { message }
      } = await Axios.get(buildPath(basePath, path), options);
      response.data = message;

      return response;
    } catch ({ message, response: res }) {
      if (message === "Network Error") {
        response.error = {
          message: {
            networkError
          }
        };

        return response;
      }
      if (res?.data) {
        response.error = res.data;
      } else {
        response.error = {
          message: {
            error: networkError
          }
        };
      }

      return response;
    }
  },
  async post({ path, payload, options = {} }) {
    const response = { data: null, error: null };
    try {
      const {
        data: { message }
      } = await Axios.post(buildPath(basePath, path), payload, options);
      response.data = message;

      return response;
    } catch ({ message, response: res }) {
      if (message === "Network Error") {
        response.error = {
          message: {
            networkError
          }
        };

        return response;
      }
      if (res?.data) {
        response.error = res.data;
      } else {
        response.error = {
          message: {
            error: networkError
          }
        };
      }

      return response;
    }
  },

  async postUser({ mode, payload, dispatch }) {
    const path = mode === "login" ? "/login" : "/signup";

    dispatch({ type: "CLEAR_AUTH_ERROR" });

    const response = await this.post({ path, payload });

    if (response.data) {
      const { user, ...token } = response.data;

      const saveUserInfo = () => {
        localStorage.setItem(
          "billsplit::user",
          JSON.stringify({
            username: user.username,
            user_account_id: user.user_account_id
          })
        );
      };

      if (mode === "login") {
        localStorage.setItem(
          "billsplit::token",
          JSON.stringify({
            type: token.token_type,
            expiresIn: token.expires_in,
            accessToken: token.access_token,
            refreshToken: token.refresh_token
          })
        );

        saveUserInfo();
        dispatch({ type: "LOGIN" });
      } else {
        saveUserInfo();
        dispatch({ type: "SIGNUP" });
      }
    }

    if (response.error?.message) {
      dispatch({ type: "AUTH_ERROR", payload: response.error });
    }
  },

  async createBill({ payload, dispatch }) {
    const path = "/create";

    dispatch({ type: "RESET_CREATE_BILL" });

    const response = await this.post({
      path,
      payload: { ...payload, user_account_id },
      options: authTokenHeader
    });

    if (response.data) dispatch({ type: "CREATE_BILL" });

    if (response.error?.message)
      dispatch({ type: "BILL_ERROR", payload: response.error });
  },

  async fetchBills(dispatch) {
    const accountId = JSON.parse(localStorage.getItem("billsplit::user"))[
      "user_account_id"
    ];
    const path = `/list?user_account_id=${accountId}`;

    dispatch({ type: "CLEAR_BILL_ERROR" });

    const response = await this.get({ path, options: authTokenHeader });

    if (response.data)
      dispatch({ type: "FETCH_BILLS", payload: response.data });

    if (response.error?.message)
      dispatch({
        type: "BILL_ERROR",
        payload: response.error
      });
  }
};
