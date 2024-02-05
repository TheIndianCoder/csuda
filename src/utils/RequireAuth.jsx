import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { useMaterialTailwindController, setJwtToken, setUserNameAfterLogin, setIsJwtValid } from "@/Dashboard/context";
// import * as jwt from 'jsonwebtoken'
// import { useJwt } from 'react-jwt'
// const jwt = require('jsonwebtoken')
// import jwt from '@types/jsonwebtoken'

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL
const SUDA_SECRET = `MY_NAME_IS_SUBHA`
export const getCookieByName = (name) => {
  let cookies = document.cookie;
  let cookiesArr = cookies.split(`;`)
  let cookieVal = ""
  for (let i = 0; i < cookiesArr.length; i++) {
    const item = cookiesArr[i]
    const keyValPairArr = item.trim().split("=")
    if (keyValPairArr[0] === name) {
      cookieVal = keyValPairArr[1]
      break;
    }
  }
  return cookieVal
}

export const validateJwtToken = (jwtTokenIn) => {
  // console.log("inside validateJwtToken")
  jwtTokenIn = jwtTokenIn?.toString()
  let decoded = null;
  if (jwtTokenIn && jwtTokenIn.trim() != "") {
    try {
      //decoded = jwt.verify(jwtTokenIn, SUDA_SECRET)
    } catch (err) {
      console.log(err)
      return false
    }
    return true;
  } else {
    return false
  }
}

function RequireAuth({ children, accessToken }) {
  // const [isJwtTokenValid, setIsJwtTokenValid] = useState(false)
  const [controller, dispatch] = useMaterialTailwindController();
  const { isJwtValid } = controller
  //const { jwtToken } = controller
  //const jwtToken = window.sessionStorage.getItem("SUDA_TOKEN")
  //const jwtToken = window.localStorage.getItem("SUDA_TOKEN")
  const jwtToken = getCookieByName("SUDA_TOKEN")
  // console.log("holaaaa")
  let location = useLocation();
  // console.log(location)
  // console.log("inside RequireAuth ==" + jwtToken)
  if (!validateJwtToken(jwtToken)) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />
  }
  return children

}

export default RequireAuth