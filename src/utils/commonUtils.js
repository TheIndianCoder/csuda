import { getCookieByName } from "./RequireAuth";
import { SUDA_USER_ROLE } from "./appConstants";
import { isBlankString } from "./formValidatorUtils";

let a = [
  "",
  "One ",
  "Two ",
  "Three ",
  "Four ",
  "Five ",
  "Six ",
  "Seven ",
  "Eight ",
  "Nine ",
  "Ten ",
  "Eleven ",
  "Twelve ",
  "Thirteen ",
  "Fourteen ",
  "Fifteen ",
  "Sixteen ",
  "Seventeen ",
  "Eighteen ",
  "Nineteen ",
];
let b = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

export function inWords(num) {
  if ((num = num.toString()).length > 9) return "overflow";
  let n = ("000000000" + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = "";
  str +=
    n[1] != 0
      ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "Crore "
      : "";
  str +=
    n[2] != 0
      ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "Lakh "
      : "";
  str +=
    n[3] != 0
      ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "Thousand "
      : "";
  str +=
    n[4] != 0
      ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "Hundred "
      : "";
  str +=
    n[5] != 0
      ? (str != "" ? "and " : "") +
        (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
        ""
      : "";
  return str;
}

export const convertDateToAPIFormat = (dateObj) => {
  let newDate = "";
  if (isBlankString(dateObj)) {
    return newDate;
  }
  try {
    // console.log(`[convertDateToAPIFormat] dateObj : ${dateObj}`)
    let dateStr = dateObj + "";
    // console.log(`[convertDateToAPIFormat] dateStr : ${dateStr}`)
    let tempDate = new Date(dateStr);
    // console.log(`[convertDateToAPIFormat] tempDate : ${tempDate}`)
    const singleMonthPlaceholder =
      (tempDate.getMonth() + 1 + "").length < 2 ? `0` : ``;
    const singleYearPlaceholder =
      (tempDate.getDate() + 1 + "").length < 2 ? `0` : ``;
    newDate = `${tempDate.getFullYear()}-${singleMonthPlaceholder}${
      tempDate.getMonth() + 1
    }-${singleYearPlaceholder}${tempDate.getDate()}`;
    // console.log(`[convertDateToAPIFormat] newDate : ${newDate}`)
  } catch (err) {
    console.error(err);
  }
  return newDate;
};

export const convertNewDateToAPIFormat = (dateObj) => {
  let newDate = "";
  if (isBlankString(dateObj)) {
    return newDate;
  }
  try {
    // console.log(`[convertDateToAPIFormat] dateObj : ${dateObj}`)
    let dateStr = dateObj + "";
    // console.log(`[convertDateToAPIFormat] dateStr : ${dateStr}`)
    let tempDate = new Date(dateStr);
    // console.log(`[convertDateToAPIFormat] tempDate : ${tempDate}`)
    const singleMonthPlaceholder =
      (tempDate.getMonth() + 1 + "").length < 2 ? `0` : ``;
    const singleYearPlaceholder =
      (tempDate.getDate() + 1 + "").length < 2 ? `0` : (tempDate.getDate() + 1 + "") === `${10}` ? `0` :``;
      
      newDate = `${tempDate.getFullYear()}-${singleMonthPlaceholder}${
        tempDate.getMonth() + 1
      }-${singleYearPlaceholder}${tempDate.getDate()}`;

    console.log("singleMonthPlaceholder",singleMonthPlaceholder)
    console.log("singleYearPlaceholder",singleYearPlaceholder)
    console.log("date",(tempDate.getDate() + 1 + "") === `${10}`),tempDate.getDate() + 1 + "",
     typeof(tempDate.getDate() + 1 + "")
  } catch (err) {
    console.error(err);
  }
  return newDate;
};


export const convertDateFormat = (dateObj) => {
  let newDate = "";
  let y = "";
  if (isBlankString(dateObj)) {
    return newDate;
  }
  try {
    // console.log(`[convertDateToAPIFormat] dateObj : ${dateObj}`)
    let dateStr = dateObj + "";
    // console.log(`[convertDateToAPIFormat] dateStr : ${dateStr}`)
    let tempDate = new Date(dateStr);
    // console.log(`[convertDateToAPIFormat] tempDate : ${tempDate}`)
    const singleMonthPlaceholder =
      (tempDate.getMonth() + 1 + "").length < 2 ? `0` : ``;
    const singleYearPlaceholder =
      (tempDate.getDate() + 1 + "").length < 2 ? `0` : ``;
    //newDate = `${singleYearPlaceholder}${tempDate.getDate()}/${singleMonthPlaceholder}${tempDate.getMonth() + 1}/${tempDate.getFullYear()}`
    newDate = `${singleMonthPlaceholder}${
      tempDate.getMonth() + 1
    }/${singleYearPlaceholder}${tempDate.getDate()}/${tempDate.getFullYear()}`;
  } catch (err) {
    console.error(err);
  }
  console.log("DATE", newDate);
  return newDate;
};

export const isUserAdmin = () => {
  try {
    let userRoleArrStr = getCookieByName(SUDA_USER_ROLE);
    let userRolesArr = JSON.parse(userRoleArrStr);
    let isAdmin = false;
    userRolesArr?.forEach((item) => {
      if ((item?.roleName + "").trim().toUpperCase() == "ADMIN") {
        isAdmin = true;
      }
    });
    return isAdmin;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const copyStyles = (src, dest) => {
  // console.log("at the start of copying stylesheets")
  Array.from(src.styleSheets).forEach((styleSheet) => {
    // console.log("copying stylesheets")
    // console.log(styleSheet.ownerNode)
    dest.head.appendChild(styleSheet.ownerNode.cloneNode(true));
  });
  Array.from(src.fonts).forEach((font) => dest.fonts.add(font));
};

export const convertStringToLowerCaseNTrim = (str) => {
  return (str + "").trim().toLowerCase();
};

export const convertTransactionDateToFYFormat = (dateStr) => {
  if (isBlankString(dateStr)) {
    return "N/A";
  }
  let dateObj = new Date(dateStr);
  let currentYear = dateObj.getFullYear();
  let prevYear = dateObj.getFullYear() - 1;
  let retDateStr = `${prevYear}-${currentYear}`;
  // console.log(retDateStr)
  return retDateStr;
};

const fileNameValidatorPatternPngJpgJpegPdf =
  /^(?:[\w]\:|\\)(\\[a-z_\-\s0-9\.]+)+\.(png|jpg|jpeg|pdf)$/;
export const validateFilename = (filename) => {
  return fileNameValidatorPatternPngJpgJpegPdf.test(filename);
};

export const countWords = (s) => {
  s = s.replace(/(^\s*)|(\s*$)/gi, ""); //exclude  start and end white-space
  s = s.replace(/[ ]{2,}/gi, " "); //2 or more space to 1
  s = s.replace(/\n /, "\n"); // exclude newline with a start spacing
  return s.split(" ").filter(function (str) {
    return str != "";
  }).length;
  //return s.split(' ').filter(String).length; - this can also be used
};

export const fetchFromAPI = async (
  url,
  requestOptions,
  setter,
  setIsLoading,
  setIsLoaded
) => {
  setIsLoaded(null);
  setIsLoading(true);
  try {
    let response = null,
      responseBody = null;
    response = await fetch(url, requestOptions);
    responseBody = await response?.json();
    // console.log("searching with api...")
    // console.log(responseBody)
    if (response?.status == "200") {
      setIsLoaded(true);
      setter(responseBody);
    } else {
      setter(null);
      setIsLoaded(false);
    }
  } catch (err) {
    console.error(err);
    setIsLoaded(false);
  } finally {
    setIsLoading(false);
  }
};

export const fetchFromAPIWithOutSetter = async (
  url,
  requestOptions,
  setIsLoading,
  setIsLoaded
) => {
  setIsLoaded(null);
  setIsLoading(true);
  try {
    let response = null,
      responseBody = null;
    response = await fetch(url, requestOptions);
    responseBody = await response?.text();
    console.log(responseBody);
    if (response?.status == "200") {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  } catch (err) {
    console.error(err);
    setIsLoaded(false);
  } finally {
    setIsLoading(false);
  }
};

export const fetchFromAPIWithSetterForTextAsResponse = async (
  url,
  requestOptions,
  setter,
  setIsLoading,
  setIsLoaded
) => {
  setIsLoaded(null);
  setIsLoading(true);
  try {
    let response = null,
      responseBody = null;
    response = await fetch(url, requestOptions);
    responseBody = await response?.text();
    console.log(responseBody);
    if (response?.status == "200") {
      setter(responseBody);
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  } catch (err) {
    console.error(err);
    setIsLoaded(false);
  } finally {
    setIsLoading(false);
  }
};

const ipUrl = `https://geolocation-db.com/json/`;
export const getIPAddressOfUser = async () => {
  let ipAddress = "";
  try {
    let responseIp = await fetch(ipUrl);
    let responseBodyOfIp = await responseIp.json();
    ipAddress = responseBodyOfIp?.IPv4 ? responseBodyOfIp.IPv4 : "0.0.0.0";
  } catch (err) {
    console.error(err);
    ipAddress = "0.0.0.0";
  }
  return ipAddress;
};

export function convertDateToGenericSlashFormat(date) {
  return new Date(date).toLocaleDateString("en-GB");
}

export function convertDateToGenericDashFormat(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function SwapStringPlaces(inputString) {
  var parts = inputString.split("-");
  var transformedString = parts[1] + "-" + parts[0];
  return transformedString;
}
