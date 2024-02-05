import React from "react";
import PropTypes from "prop-types";

export const MaterialTailwind = React.createContext(null);
MaterialTailwind.displayName = "MaterialTailwindContext";

export function reducer(state, action) {
  console.log("inside reducer ::: ")
  console.log(state)
  console.log(action)
  switch (action.type) {
    case "OPEN_SIDENAV": {
      console.log("open sidenav!!")
      return { ...state, openSidenav: action.value };
    }
    case "SIDENAV_TYPE": {
      return { ...state, sidenavType: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "SET_JWT_TOKEN": {
      return { ...state, jwtToken: action.value };
    }
    case "SET_USER_NAME": {
      return { ...state, userNameAfterLogin: action.value };
    }
    case "SET_IS_JWT_VALID": {
      return { ...state, isJwtValid: action.value };
    }
    case "SET_SAF_ALL_INPUT_FROM_API": {
      return { ...state, safAllInputFromAPI: action.value };
    }
    case "SET_PAYMENT_MODE_DETAILS_FROM_API": {
      return { ...state, paymentModeDetailsInputFromAPI: action.value };
    }
    case "SET_USER_DETAILS_INPUT_FROM_API": {
      return { ...state, allUserDetailsInputFromAPI: action.value };
    }
    case "SET_CONSUMER_CATEGORY_DETAILS_INPUT_FROM_API": {
      return { ...state, consumerCategoryDetailsFromAPI: action.value };
    }
    case "SET_CONSUMER_RANGE_DETAILS_INPUT_FROM_API": {
      return { ...state, consumerRangeDetailsFromAPI: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function MaterialTailwindControllerProvider({ children }) {
  const initialState = {
    openSidenav: true,
    sidenavColor: "red",
    sidenavType: "dark",
    transparentNavbar: true,
    fixedNavbar: false,
    openConfigurator: false,
    jwtToken: null,
    userNameAfterLogin: "null",
    isJwtValid: false,
    safAllInputFromAPI: {},
    paymentModeDetailsInputFromAPI: {},
    allUserDetailsInputFromAPI: [],
    consumerCategoryDetailsFromAPI: [],
    consumerRangeDetailsFromAPI: [],
  };

  const [controller, dispatch] = React.useReducer(reducer, initialState);
  const value = React.useMemo(
    () => [controller, dispatch],
    [controller, dispatch]
  );

  return (
    <MaterialTailwind.Provider value={value}>
      {children}
    </MaterialTailwind.Provider>
  );
}

export function useMaterialTailwindController() {
  const context = React.useContext(MaterialTailwind);
  // console.log("inside useMaterialTailwindController() :: " + context)

  if (!context) {
    throw new Error(
      "useMaterialTailwindController should be used inside the MaterialTailwindControllerProvider."
    );
  }

  return context;
}

MaterialTailwindControllerProvider.displayName = "/src/Dashboard/context/index.jsx";

MaterialTailwindControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const setOpenSidenav = (dispatch, value) =>
  dispatch({ type: "OPEN_SIDENAV", value });
export const setSidenavType = (dispatch, value) =>
  dispatch({ type: "SIDENAV_TYPE", value });
export const setSidenavColor = (dispatch, value) =>
  dispatch({ type: "SIDENAV_COLOR", value });
export const setTransparentNavbar = (dispatch, value) =>
  dispatch({ type: "TRANSPARENT_NAVBAR", value });
export const setFixedNavbar = (dispatch, value) =>
  dispatch({ type: "FIXED_NAVBAR", value });
export const setOpenConfigurator = (dispatch, value) =>
  dispatch({ type: "OPEN_CONFIGURATOR", value });
export const setJwtToken = (dispatch, value) =>
  dispatch({ type: "SET_JWT_TOKEN", value });
export const setUserNameAfterLogin = (dispatch, value) =>
  dispatch({ type: "SET_USER_NAME", value });
export const setIsJwtValid = (dispatch, value) =>
  dispatch({ type: "SET_IS_JWT_VALID", value });
export const setSAFAllInputFromAPI = (dispatch, value) =>
  dispatch({ type: "SET_SAF_ALL_INPUT_FROM_API", value });
export const setPaymentModeDetailsInputFromAPI = (dispatch, value) =>
  dispatch({ type: "SET_PAYMENT_MODE_DETAILS_FROM_API", value });
export const setAllUserDetailsInputFromAPI = (dispatch, value) =>
  dispatch({ type: "SET_USER_DETAILS_INPUT_FROM_API", value });
export const setConsumerCategoryDetailsInputFromAPI = (dispatch, value) =>
  dispatch({ type: "SET_CONSUMER_CATEGORY_DETAILS_INPUT_FROM_API", value });
export const setConsumerRangeDetailsInputFromAPI = (dispatch, value) =>
  dispatch({ type: "SET_CONSUMER_RANGE_DETAILS_INPUT_FROM_API", value });
