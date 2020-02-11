import React from "react";

export const stateContext = React.createContext();

export const initialState = {
  auth: {
    loggedIn: false,
    signedUp: false,
    error: null,
    user: null,
    token: null
  },
  bills: {
    created: false,
    error: null,
    list: []
  }
};

export const stateReducer = (state, action) => {
  switch (action.type) {
    case "SIGNUP": {
      const auth = { ...state.auth };
      auth.signedUp = true;
      auth.loggedIn = false;
      auth.token = null;
      auth.user = JSON.parse(localStorage.getItem("billsplit::user"));
      return { ...state, auth };
    }
    case "LOGIN": {
      const auth = { ...state.auth };
      const { type, accessToken } = JSON.parse(
        localStorage.getItem("billsplit::token")
      );
      auth.loggedIn = true;
      auth.signedUp = false;
      auth.token = `${type} ${accessToken}`;
      auth.user = JSON.parse(localStorage.getItem("billsplit::user"));
      return { ...state, auth };
    }
    case "LOGOUT": {
      localStorage.removeItem("billsplit::state");
      localStorage.removeItem("billsplit::token");
      localStorage.removeItem("billsplit::user");
      return { ...initialState };
    }
    case "AUTH_ERROR": {
      return { ...state, auth: { ...state.auth, error: action.payload } };
    }
    case "CLEAR_AUTH_ERROR": {
      return { ...state, auth: { ...state.auth, error: null } };
    }
    case "CREATE_BILL": {
      return { ...state, bills: { ...state.bills, created: true } };
    }
    case "FETCH_BILLS": {
      return {
        ...state,
        bills: { list: action.payload, created: false, error: null }
      };
    }
    case "RESET_CREATE_BILL": {
      return {
        ...state,
        bills: { ...state.bills, created: false, error: null }
      };
    }
    case "BILL_ERROR": {
      return { ...state, bills: { ...state.bills, error: action.payload } };
    }
    case "CLEAR_BILL_ERROR": {
      return { ...state, bills: { ...state.bills, error: null } };
    }
    default:
      break;
  }
};
