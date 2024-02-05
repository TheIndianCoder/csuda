
import React, { useEffect, useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useMaterialTailwindController } from "@/Dashboard/context";
import { convertStringToLowerCaseNTrim } from "@/utils/commonUtils";
import { getCookieByName } from "@/utils/RequireAuth";
import { SUDA_TOKEN, SUDA_USER_ID } from "@/utils/appConstants";
import { ColorRingCustom } from "@/utils/commonComponents";
import { NotFoundErrorMessageCustom } from "@/utils/commonComponents";
import { SOMETHING_WENT_WRONG } from "@/utils/appConstants";
import { isBlankString } from "@/utils/formValidatorUtils";
import { isStringContainOnlyDigits } from "@/utils/formValidatorUtils";
import FloatingMessage from "@/utils/floatingMessage";

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL;
let unique2 = []
function AddNewUserForm({
  showModal,
  currModal,
  nextModal,
  switchOnPrevModalNOffCurrModal,
}) {
  const [controller, dispatch] = useMaterialTailwindController();
  const [details, setDetails] = useState("");
  const [formCounter, setFormCounter] = useState(1);
  const [forms, setForms] = useState([]);
  const [isConsumerDetailsValid, setIsConsumerDetailsValid] = useState(null);
  const [isConsumerCreationInProgress, setIsConsumerCreationInProgress] =
    useState(null);
  const [isConsumerCreationInSuccessful, setIsConsumerCreationInSuccessful] =
    useState(null);
  const [isConsumerCreationDuplicate, setIsConsumerCreationDuplicate] =
    useState(null);
  const [consumerNumberAfterCreation, setConsumerNumberAfterCreation] =
    useState(null);
  const [consumerRange, setConsumerRange] = useState("");
  const [monthlyAmount, setMonthlyAmount] = useState(null);
  const [isMonthlyAmountLoading, setIsMonthlyAmountLoading] = useState(null);
  const [isMonthlyAmountLoaded, setIsMonthlyAmountLoaded] = useState(null);
  const [selectedCustomercategory, setSelectedCustomercategory] = useState([]);
  const [consumerRangeDrop, setConsumerRangeDrop] = useState({});
  const [consumerCategory, setConsumerCategory] = useState({});
  const [amountPerMonth, setAmountPerMonth] = useState({});
  const [consumerDetails, setConsumerDetails] = useState([]);
  const [fetchedYears, setFetchedYears] = useState({});

  const [selectedYear, setSelectedYear] = useState({});
  const [selectedMonth, setSelectedMonth] = useState({});

  const [selectedYearRange, setSelectedYearRange] = useState({});

  const [monthAmount, setMonthAmount] = useState(0);

  const [allMonthAmount, setAllMonthAmount] = useState({});
  const [testamt, setTestAmt] = useState(0)
  useEffect(()=>{
    console.log(allMonthAmount,"allMonthAmount")
  },[allMonthAmount])

  useEffect(()=>{
    console.log(consumerDetails,"consumerDetails")
  },[consumerDetails])
  const getMonthName = (monthNumber) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months[monthNumber - 1];
  };

  const handleAddForm = (e) => {
    e.preventDefault();
    const newFormId = formCounter + 1;
    setFormCounter(newFormId);
    setForms([...forms, newFormId]);
    setSelectedCustomercategory((prevSelectedCategories) => [
      ...prevSelectedCategories,
      { formId: newFormId, category: null },
    ]);
  };
useEffect(()=>{
  console.log(monthAmount,"monthAmount")
},[monthAmount])

  const handleDeleteForm = (formId, e) => {
    e.preventDefault();
    setFormCounter(formCounter - 1);
    // console.log("formCounter", formCounter);
    // console.log("allMonthAmount", allMonthAmount)
    const amtofthisForm = allMonthAmount[formId]?.amt;
    console.log(amtofthisForm,"amtofthisForm");
    if (amtofthisForm) {
      setMonthAmount(monthAmount - amtofthisForm)
      setTestAmt((prevAmount) => prevAmount - amtofthisForm);
    }
    const updatedForms = forms.filter((id) => id !== formId);
    const deletedCategoryId = consumerDetails[formId]?.consumer_cat_mstr_id;

    var consumerCategoryId = "consumer_category" + formId;
    var consumerYear = "consumer_year_of_effect" + formId;
    var consumerMonth = "consumer_month_of_effect" + formId;
    if (formCounter > 2 && formId !== formCounter) {
      var consumerCategoryIdNext = "consumer_category" + (formId + 1);
      var selectedYearIdNext = "consumer_year_of_effect" + (formId + 1);
      var selectedMonthIdNext = "consumer_month_of_effect" + (formId + 1);
      document.getElementById(consumerCategoryId).innerHTML =
        document.getElementById(consumerCategoryIdNext).innerHTML;
      document.getElementById(consumerYear).innerHTML = document.getElementById(selectedYearIdNext).innerHTML;
      document.getElementById(consumerMonth).innerHTML = document.getElementById(selectedMonthIdNext).innerHTML;
    }

    setForms(updatedForms);
    setConsumerDetails((prevState) => {
      const updatedDetails = { ...prevState };
      delete updatedDetails[formId];
      return updatedDetails;
    });

    // let up = allMonthAmount
    // delete up[formId];
    // setAllMonthAmount(up)
    setAllMonthAmount((prevAmount) => {
      const updatedAmount = { ...prevAmount };
      //console.log(updatedAmount[formId],"updatedAmount")
      delete updatedAmount[formId];
      //console.log(updatedAmount,"updatedAmount[formId]")
      return updatedAmount;
    });

    setSelectedCustomercategory((prevSelectedCategories) =>
      prevSelectedCategories.filter(
        (category) => category.id !== deletedCategoryId
      )
    );
  };

  const {
    safAllInputFromAPI,
    consumerCategoryDetailsFromAPI,
    consumerRangeDetailsFromAPI,
  } = controller;

  

  useEffect(() => {
    const viewDemandPayment = async (e) => {
      try {
        const paymentReceiptDetailsGetUrl = `${SUDA_API_BASE_URL}/UserCharge/AllDropDown`;
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
          },
        };
        let response = null,
          responseBody = null;
        response = await fetch(paymentReceiptDetailsGetUrl, requestOptions);
        responseBody = await response.json();
        //console.log("details", response, responseBody)
        if (response?.status == "200" && !responseBody?.errors) {
          // console.log("receipt in main form 200", response, responseBody)
          setDetails(responseBody);
        } else if (response?.status == "200" && responseBody?.errors) {
          // toast.error(responseBody.errors.message, {
          // position: toast.POSITION.TOP_CENTER
          // });
        } else {
          // toast.error(responseBody.errors.message, {
          //   position: toast.POSITION.TOP_CENTER
          //   });
        }
      } catch (err) {
        console.log(err);
        // toast.error(err, {
        //   position: toast.POSITION.TOP_CENTER
        //   });
      } finally {
      }
    };
    viewDemandPayment();
  }, []);

  // useEffect(() => {
  //   console.log(consumerDetails, "consumerDetails");
  // }, [consumerDetails]);

  // useEffect(()=>{
  //   console.log(formId,"formId")
  // },[formId])
  // useEffect(()=>{
  //   console.log(selectedYear[1],"selectedYear")
  // },[selectedYear])
  useEffect(() => {
    Object.keys(consumerDetails).forEach((formId) => {
      let year = consumerDetails[formId]?.financial_year;
      let month = consumerDetails[formId]?.month;
      let eventStr = year + "";
      let finalYear = eventStr.split("-")[1];
      // console.log(year, month, finalYear);
      setSelectedYear((prevState) => ({
        ...prevState,
        [formId]: finalYear,
      }));

      setSelectedMonth((prevState) => ({
        ...prevState,
        [formId]: month,
      }));
      if (details?.categories?.length > 0) {
        details?.categories.map((category) => {
          if (category.id === consumerDetails[formId].consumer_cat_mstr_id) {
            category?.consumerRangeType.map((consumerRange) => {
              setFetchedYears((prevState) => ({
                ...prevState,
                [formId]: [
                  ...(prevState[formId] || []),
                  consumerRange.dateOfEffect,
                ],
              }));
            });
          }
        });
        let arr = [];
        if (fetchedYears[formId] && fetchedYears[formId].length > 0) {
          fetchedYears[formId].forEach((fetchedYear) => {
            let finalYear = fetchedYear.split("-")[0];
            arr.push(finalYear);
          });
          // console.log(arr.sort(), "arr");
        }
      }
    });
  }, [consumerDetails]);

  useEffect(() => {
    // console.log("fetchedYears", fetchedYears);

    function getUnique(array) {
      var uniqueArray = [...new Set(array)].sort();
      return uniqueArray;
    }

    Object.keys(consumerDetails).forEach((formId) => {
      var uniqueNames = getUnique(fetchedYears[formId] || []);
      console.log(uniqueNames);
      let finalYear = uniqueNames[0]?.split("-")[0];
      console.log(selectedYear[formId], finalYear, "finalYear");

      if (selectedYear[formId] < finalYear) {
        setSelectedYearRange((prevState) => ({
          ...prevState,
          [formId]: uniqueNames[0],
        }));
      }
       else {
        let flag = false, arr = []
        uniqueNames?.map((uniqueNames,index) => {
          let uniYear = uniqueNames?.split("-")[0];
          arr.push(uniYear)
          if(uniYear === selectedYear[formId]){
             //console.log(selectedYear[formId], uniYear, "same");
            flag = true
             let finalMonth = uniqueNames.split("-")[1];
             console.log(
               "Selected month - ",
               selectedMonth[formId],
               
               "Final month - ",
               finalMonth
             );
 
             if (Number(selectedMonth[formId]) < Number(finalMonth)) {
               setSelectedYearRange((prevState) => ({
                 ...prevState,
                 [formId]: uniqueNames,
               }));
             } else if (Number(selectedMonth[formId]) > Number(finalMonth)) {
               setSelectedYearRange((prevState) => ({
                 ...prevState,
                 [formId]: uniqueNames,
               }));
             } else if (Number(selectedMonth[formId]) === Number(finalMonth)) {
              //console.log("matched",Number(selectedMonth[formId]) === Number(finalMonth),uniqueNames)
               setSelectedYearRange((prevState) => ({
                 ...prevState,
                 [formId]: uniqueNames,
               }));
             } else {
               // Handle the else case if needed
             }
          }
        })

        if(flag === false){
        console.log(arr,"arr")
        uniqueNames.push(selectedYear[formId])
        uniqueNames.sort()
       // console.log(uniqueNames,"arr sorted")
        let index = uniqueNames.indexOf(selectedYear[formId]);
       // console.log(uniqueNames[index-1],"tt")
        
        setSelectedYearRange((prevState) => ({
          ...prevState,
          [formId]: uniqueNames[index-1],
        }));

        }
        // uniqueNames.forEach((uniqueYear, index) => {
        //   let uniYear = uniqueYear?.split("-")[0];
          

        //   if (selectedYear[formId] > uniYear) {
        //     setSelectedYearRange((prevState) => ({
        //       ...prevState,
        //       [formId]: uniqueYear,
        //     }));
        //   } 
        //   else if (selectedYear[formId] === uniYear) {
            
        //   } else {
        //     // Handle the else case if needed
        //   }
        // });
      }
    });
  }, [fetchedYears, consumerDetails, selectedMonth, selectedYear]);

  useEffect(() => {
    console.log(selectedYearRange, "selectedYearRange")

  }, [ selectedYearRange])

  // useEffect(() => {
  // console.log(selectedYearRange, "selectedYearRange", "setSelectedMonth", selectedMonth)
  // }, [selectedYearRange, selectedMonth])

  useEffect(() => {
    Object.keys(consumerDetails).forEach((formId) => {
      const formDetails = consumerDetails[formId];

      if (
        formDetails.consumer_cat_mstr_id &&
        formDetails.consumer_range_mstr_id &&
        formDetails.financial_year &&
        formDetails.financial_year_id &&
        formDetails.month > 0
      ) {
        // console.log("formDetails", formDetails)
        //console.log("formDetails", formDetails);
        const matchingCategory = details?.categories?.find(
          (category) => category.id === formDetails.consumer_cat_mstr_id
        );

        if (matchingCategory) {
          // console.log("matchingCategory", matchingCategory,selectedYearRange[formId]);
          let matchingRange = matchingCategory.consumerRangeType.find(
            (range) =>
              range.id === formDetails.consumer_range_mstr_id &&
              range.dateOfEffect === selectedYearRange[formId]
          );
          //console.log("matching range", matchingRange);
          //console.log("allMonthAmount[formId]", allMonthAmount);
          console.log("formCounter", formId)
          if (matchingRange && (!allMonthAmount[formId] || allMonthAmount[formId] == "reset") || formId == 0) {
          // if (matchingRange) {
            setAllMonthAmount(prevState => ({
              ...prevState,
              [formId]: {
                ...prevState[formId],
                amt: matchingRange.rate,
              }
            }));
            // let am = matchingRange?.rate 
            // setTestAmt(am)
            setConsumerDetails(prevState => ({
              ...prevState,
              [formId]: {
                ...prevState[formId],
                consumer_rate_mstr_id: matchingRange.consumer_cat_mstr_id,
                rate_chart_id: matchingRange.rateId
              }
            }));
            if (!allMonthAmount[formId]) {
            setMonthAmount((prevAmount) => prevAmount + matchingRange.rate);
            // setTestAmt((prevAmount) => prevAmount + matchingRange.rate);
            } 
             else if (allMonthAmount[formId] == "reset") {
              // else {
               // setTestAmt(prev => prev + matchingRange?.rate);
               console.log("Here I ame", allMonthAmount, allMonthAmount[0], matchingRange.rate);
              // console.log("form Count", formCounter);
              // console.log(allMonthAmount,"allMonthAmount")
              if (formCounter > 0){
                console.log("here")
                let amt = 0;
                for (const key in allMonthAmount) {
                  if (allMonthAmount.hasOwnProperty(key)) {
                    console.log(allMonthAmount[key],"key")
                    if (allMonthAmount[key] != "reset"){
                      const value = allMonthAmount[key]?.amt;
                      amt += value
                      //console.log("amt", amt, key, "i");
                    }
                  }
                }
              //   console.log(allMonthAmount, monthAmount)
                let amount = (amt) + matchingRange?.rate
                // let amount = (amt) 
                //matchingRange?.rate
                setMonthAmount(amount);
              //   setTestAmt(amount);
              //   //console.log("month amount", monthAmount);
              }
            }
          }
        }
      }
    });
  },
  // [selectedMonth, selectedYearRange, monthAmount,consumerDetails, selectedYear]);
  [ selectedYearRange, fetchedYears, consumerDetails, selectedMonth, selectedYear]);
  //[consumerDetails?.[formId]?.consumer_cat_mstr_id,consumerDetails[formId]?.consumer_range_mstr_id, 
  //consumerDetails[formId]?.financial_year, consumerDetails[formId]?.month
 //]);
  //[selectedYear]);
  useEffect(() => {
    // console.log(monthAmount, "monthAmount");
  }, [monthAmount]);
  const handleConsumerDetailsChange = (event, formId) => {
    ///console.log(event)
    if (!consumerDetails[formId] && formId) {
      setConsumerDetails(prevState => ({
        ...prevState,
        [formId]: {
          address: "",
          consumer_cat_mstr_id: "",
          consumer_name: "",
          consumer_no: "",
          consumer_range_mstr_id: "",
          consumer_rate_mstr_id: 0,
          created_byid: 0,
          financial_year: "",
          financial_year_id: "",
          gradian_name: "",
          holding_no: "",
          house_flat_no: "",
          land_mark: "",
          month: 0,
          police_station: "",
          rate_chart_id: 0,
          relation: "",
          ward_id: "",
          ward_no: 0,
        }
      }));
    }
    const eventId = event?.target?.id;
    const eventVal = event?.target?.value;
    const eventStr = event + "";

    if (eventId && !formId) {
      setConsumerDetails(prevState => ({
        ...prevState,
        "detail": {
          ...prevState["detail"],
          [eventId]: eventVal
        }
      }));
    } else if (eventStr.includes("ward")) {
      const item = JSON.parse(event);
      console.log("ward", item);
      if (formId) {
        setConsumerDetails(prevState => ({
          ...prevState,
          [formId]: {
            ...prevState[formId],
            ward_id: item.id,
            ward_no: parseInt(item.ward_name)
          }
        }));
      } else {
        setConsumerDetails(prevState => ({
          ...prevState,
          "detail": {
            ...prevState["detail"],
            ward_id: item.id,
            ward_no: parseInt(item.ward_name)
          }
        }));
        document.getElementById("ward_id").innerHTML = item.ward_name;
      }
    } else if (eventStr.includes("category_name")) {
      if (allMonthAmount[formId] ){
        allMonthAmount[formId] = "reset"; 
      }      
      const item = JSON.parse(event);
      // setMonthAmount('')
      setSelectedCustomercategory((prevSelectedCategories) => [
        ...prevSelectedCategories,
        item,
      ]);

      var consumerCategoryId = "consumer_category" + formId;
      document.getElementById(consumerCategoryId).innerHTML =
        item.category_name;
      setConsumerDetails(prevState => ({
        ...prevState,
        [formId]: {
          ...prevState[formId],
          consumer_cat_mstr_id: item.id,
        }
      }));

      setConsumerRangeDrop((prevRangeDrop) => ({
        ...prevRangeDrop,
        [formId]: item.consumerRangeType,
      }));

      // console.log("consumerRange", consumerRangeDrop[formId]);
    } else if (eventStr.includes("range_name")) {
      const item = JSON.parse(event);
      if (allMonthAmount[formId] ){
        allMonthAmount[formId] = "reset"; 
      }

      document.getElementById("consumer_range" + formId).innerHTML =
        item.range_name;
      setConsumerDetails(prevState => ({
        ...prevState,
        [formId]: {
          ...prevState[formId],
          consumer_range_mstr_id: item.id
        }
      }));

    } else if (eventStr.includes("fy_name")) {
      const item = JSON.parse(event);
      if (allMonthAmount[formId] ){
        allMonthAmount[formId] = "reset"; 
      }
      document.getElementById("consumer_year_of_effect" + formId).innerHTML =
        item.fy_name;

      setConsumerDetails(prevState => ({
        ...prevState,
        [formId]: {
          ...prevState[formId],
          financial_year: item.fy_name,
          financial_year_id: item.id,
        }
      }));
    } else if (eventStr.includes("month")) {

      document.getElementById("consumer_month_of_effect" + formId).innerHTML =
        getMonthName(parseInt(eventStr.split("_")[1]));

      setConsumerDetails(prevState => ({
        ...prevState,
        [formId]: {
          ...prevState[formId],
          month: parseInt(eventStr.split("_")[1]),

        }
      }));
    } else if (eventStr.includes("relation")) {
      if (formId) {
        setConsumerDetails(prevState => ({
          ...prevState,
          [formId]: {
            ...prevState[formId],
            relation: eventStr.split("_")[1]
          }
        }));
      } else {
        document.getElementById("relation").innerHTML = eventStr.split("_")[1];
        setConsumerDetails(prevState => ({
          ...prevState,
          "detail": {
            ...prevState["detail"],
            relation: eventStr.split("_")[1]
          }
        }));
      }
    }
  };

  const handleCreateNewUser = async () => {
    setIsConsumerCreationInSuccessful(null);
    setIsConsumerCreationInProgress(true);
    try {
      let convertedData = {
        holding_no: consumerDetails.detail?.holding_no || "",
        ward_id: consumerDetails.detail?.ward_id || "",
        consumer_name: consumerDetails.detail?.consumer_name || "",
        mobile_no: consumerDetails.detail?.mobile_no || "",
        house_flat_no: consumerDetails.detail?.house_flat_no || "",
        gradian_name: consumerDetails.detail?.gradian_name || "",
        relation: consumerDetails.detail?.relation || "",
        police_station: consumerDetails.detail?.police_station || "",
        land_mark: consumerDetails.detail?.land_mark || "",
        address: consumerDetails.detail?.address || "",
        created_byid: parseInt(getCookieByName(SUDA_USER_ID)),
        ward_no: consumerDetails.detail?.ward_no || 0,
        area_details: Object.keys(consumerDetails)
          .filter((key) => key !== "detail")
          .map((key) => {
            const detail = consumerDetails[key];
            if (detail.consumer_cat_mstr_id === 0 || detail.consumer_range_mstr_id === 0 || detail.consumer_rate_mstr_id === 0
              || detail.rate_chart_id === 0 || detail.financial_year === "" || detail.financial_year_id === 0
              || detail.month === 0 || consumerDetails.detail?.ward_id === "") {
              setIsConsumerCreationInSuccessful(false);
              return
            } else {
              return {
                consumer_cat_mstr_id: detail.consumer_cat_mstr_id || 0,
                consumer_range_mstr_id: detail.consumer_range_mstr_id || 0,
                consumer_rate_mstr_id: detail.consumer_rate_mstr_id || 0,
                rate_chart_id: detail.rate_chart_id || 0,
                financial_year: detail.financial_year || "",
                financial_year_id: detail.financial_year_id || 0,
                month: detail.month || 0,
                created_byid: parseInt(getCookieByName(SUDA_USER_ID)),
                ward_id: consumerDetails.detail?.ward_id || "",
              }
            }
          }),
      };
      console.log("convertedData", convertedData);
      for (let i = 0; i < convertedData.area_details.length; i++) {
        let consumer_category = convertedData.area_details[i].consumer_cat_mstr_id;
        console.log("I am here", convertedData.area_details.length);
        for (let j = i + 1; j < convertedData.area_details.length; j++) {
          if (consumer_category === convertedData.area_details[j].consumer_cat_mstr_id) {
            setIsConsumerCreationDuplicate(true);
            return;
          }
        }
      }
      
      if (convertedData.ward_no === 0 || convertedData.ward_id === "" || convertedData.consumer_name === "" || convertedData.mobile_no === "" || convertedData.house_flat_no === "" || convertedData.address === "") {
        setIsConsumerCreationInSuccessful(false);
        return
      }
      // clearFields();
      const url = `${SUDA_API_BASE_URL}/user/createConsumer`;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookieByName(SUDA_TOKEN)}`,
        },
        body: JSON.stringify(convertedData),
      };
      let response = null,
        responseBody = null;
      response = await fetch(url, requestOptions);
      responseBody = await response.text();

      if (response?.status == "200") {
        // console.log("responseBody =============")
        console.log(responseBody);
        setConsumerNumberAfterCreation(responseBody);
        setIsConsumerCreationInSuccessful(true);
        clearFields();
        setForms([]);
        setFormCounter(1);
        setConsumerDetails({});
        setSelectedCustomercategory([]);
        setAllMonthAmount({});
        document.getElementById("holding_no").value = "";
        document.getElementById("consumer_name").value = "";
        document.getElementById("mobile_no").value = "";
        document.getElementById("gradian_name").value = "";
        document.getElementById("house_flat_no").value = "";
        document.getElementById("address").value = "";
        document.getElementById("land_mark").value = "";
        document.getElementById("police_station").value = "";
        document.getElementById("ward_id").innerHTML = "";
        document.getElementById("relation").innerHTML = "";
        document.getElementById("consumer_category1").innerHTML = "";
        document.getElementById("consumer_range1").innerHTML = "";
        document.getElementById("consumer_year_of_effect1").innerHTML = "";
        document.getElementById("consumer_month_of_effect1").innerHTML = "";
        setMonthAmount(0)
        convertedData = {};
      } else {
        // clearFields()
        setIsConsumerCreationInSuccessful(false);
        // window.location.reload();
        convertedData = {};
      }
    } catch (err) {
      console.error(err);
      setIsConsumerCreationInSuccessful(false);
    } finally {
      setIsConsumerCreationInProgress(false);
    }
  };

  const clearFields = () => {
    console.log('clearFields', consumerDetails);
    setConsumerDetails({
      "detail": {
        holding_no: "",
        ward_id: "",
        ward_no: "",
        consumer_name: "",
        mobile_no: "",
        gradian_name: "",
        relation: "",
        house_flat_no: "",
        address: "",
        land_mark: "",
        police_station: "",
      }
    });
    console.log('clearFields1', consumerDetails);

  }

  const closeFloatingMessage = () => {
    setIsConsumerCreationInSuccessful(null);
    setIsConsumerCreationDuplicate(null);
  };

  useEffect(() => {
    if (consumerDetails) {
      let isValid = true;

      Object.values(consumerDetails).forEach((details) => {
        const {
          ward_id,
          consumer_name,
          mobile_no,
          house_flat_no,
          address,
          consumer_cat_mstr_id,
          consumer_range_mstr_id,
          financial_year,
        } = details;

        isValid =
          isValid &&
          !isBlankString(ward_id) &&
          !isBlankString(consumer_name) &&
          !isBlankString(house_flat_no) &&
          !isBlankString(address) &&
          !isBlankString(consumer_cat_mstr_id) &&
          !isBlankString(consumer_range_mstr_id) &&
          !isBlankString(financial_year) &&
          !isBlankString(mobile_no) &&
          isStringContainOnlyDigits(mobile_no) &&
          (mobile_no + "").length === 10;
      });

      setIsConsumerDetailsValid(isValid);
    }
  }, [consumerDetails]);

 
  const renderForm = (formId) => {
    // console.log(details.categories)
    // console.log(selectedCustomercategory)
    // const filteredDetails =
    //   details &&
    //   details.categories.filter(
    //     (detail) =>
    //       !selectedCustomercategory.some(
    //         (category) => category.id === detail.id
    //       )
    //   );
    const selectedCategoryId = consumerDetails[formId]?.consumer_cat_mstr_id;
    const consumerRangeDropdownValue = consumerRangeDrop[formId];
    unique2 = consumerRangeDropdownValue?.filter((obj, index) => {
      return index === consumerRangeDropdownValue?.findIndex(o => obj.id === o.id && obj.range_name === o.range_name);
    })
    return (
      <div
        className="flex flex-row justify-between py-5"
        id={`area-detail${formId}`}
      >
        <div>
          <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex ">
            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
              <label
                className="mb-2 block text-xs font-bold text-gray-700"
                htmlFor="password"
              >
                Consumer Category
                <p className="contents text-sm font-bold text-red-600">*</p>
              </label>
              <div className="flex w-full items-end ">
                <Select
                  onChange={(e) => handleConsumerDetailsChange(e, formId)}
                  id={`consumer_category${formId}`}
                  value={selectedCategoryId}
                  label="select"
                  className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
                >
                  {details.categories?.length > 0 ? (
                    details.categories?.map((item) => {
                      const {
                        id,
                        category_name,
                        description,
                        user_id,
                        stampdate,
                        status,
                      } = item;
                      return (
                        <Option key={id} value={JSON.stringify(item)}>
                          {category_name}
                        </Option>
                      );
                    })
                  ) : (
                    <Option>Loading...</Option>
                  )}
                </Select>
              </div>
            </div>
            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
              <label
                className="mb-2 block text-xs font-bold text-gray-700"
                htmlFor="password"
              >
                Consumer Range Type
                <p className="contents text-sm font-bold text-red-600">*</p>
              </label>
              <div className="flex w-full items-end ">
                <Select
                  onChange={(e) => handleConsumerDetailsChange(e, formId)}
                  id={`consumer_range${formId}`}
                  label="select"
                  className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
                >
                  {consumerRangeDropdownValue?.length > 0 ? (
                    
                    <>
                    {

         
                       

unique2?.map((item) => {
                        const {
                          id,
                          consumer_cat_mstr_id,
                          range_name,
                          rate,
                          dateOfEffect,
                        } = item; 
                        return (
                          <Option key={id} value={JSON.stringify(item)}>
                            {range_name} 
                          </Option>
                        );
                      })
                    }
                    </>
                  ) : (
                    <Option>Loading...</Option>
                  )}
                </Select>
              </div>
            </div>
          </div>
          <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex ">
            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
              <label
                className="mb-2 block text-xs font-bold text-gray-700"
                htmlFor="password"
              >
                Date Of Effect
                <p className="contents text-sm font-bold text-red-600">*</p>
              </label>
              <div className="flex w-full grid-cols-2 items-end gap-4">
                <Select
                  onChange={(e) => handleConsumerDetailsChange(e, formId)}
                  id={`consumer_year_of_effect${formId}`}
                  label="Select Year"
                  className="mr-2 py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
                >
                  {details?.dateOfEffect?.length > 0 ? (
                    details?.dateOfEffect.map((item) => {
                      const { id, fy_name, effective_date, yr_id, status } =
                        item;
                      return (
                        <Option key={id} value={JSON.stringify(item)}>
                          {fy_name}
                        </Option>
                      );
                    })
                  ) : (
                    <Option>Loading...</Option>
                  )}
                </Select>
                <Select
                  onChange={(e) => handleConsumerDetailsChange(e, formId)}
                  id={`consumer_month_of_effect${formId}`}
                  label="Select Month"
                  className="mr-2 py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
                >
                  <Option key={1} value={`month_1`}>
                    January
                  </Option>
                  <Option key={2} value={`month_2`}>
                    February
                  </Option>
                  <Option key={3} value={`month_3`}>
                    March
                  </Option>
                  <Option key={4} value={`month_4`}>
                    April
                  </Option>
                  <Option key={5} value={`month_5`}>
                    May
                  </Option>
                  <Option key={6} value={`month_6`}>
                    June
                  </Option>
                  <Option key={7} value={`month_7`}>
                    July
                  </Option>
                  <Option key={8} value={`month_8`}>
                    August
                  </Option>
                  <Option key={9} value={`month_9`}>
                    September
                  </Option>
                  <Option key={10} value={`month_10`}>
                    October
                  </Option>
                  <Option key={11} value={`month_11`}>
                    November
                  </Option>
                  <Option key={12} value={`month_12`}>
                    December
                  </Option>
                </Select>
              </div>
            </div>
          </div>
        </div>
        {formId === 1 ? (
          <div className="mb-6">
            <button
              className="m-8 mb-2 h-8 transform  rounded-md bg-blue-400 px-4 py-1 
                tracking-wide text-white transition-colors duration-200 hover:bg-blue-700 focus:bg-blue-400 
                focus:outline-none"
              onClick={handleAddForm}
            >
              Add New Consumer Category
            </button>
          </div>
        ) : (
          <div className="mb-6">
            <button
              className="m-8 mb-2 h-8 transform  rounded-md bg-red-400 px-4 py-1 
          tracking-wide text-white transition-colors duration-200 hover:bg-red-700 focus:bg-red-400 
          focus:outline-none"
              onClick={(e) => handleDeleteForm(formId, e)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  };

//   useEffect(() => {
   
   
//    });
         
//  }, [consumerRangeDropdownValue]);

//  useEffect(()=>{
//    console.log("unique2",unique2)
//  },[unique2])

  return showModal == true ? (
    <div className="relative mb-10 mt-10 flex min-h-screen flex-col justify-center overflow-hidden">
      <div className="m-auto w-full rounded-md border border-gray-500 bg-white px-0 pb-4 pt-0 lg:max-w-full">
        <nav className="navcustomproperty relative mb-2 flex flex-wrap items-center justify-between rounded-none py-2 pl-2 pr-0 ring-1 ring-black">
          <h2 className="text-center text-sm font-semibold text-white">
            Add New Consumer
          </h2>
        </nav>
        <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
          <label
            className="mb-2 block text-xs font-bold text-gray-700"
            htmlFor="password"
          >
            <p className="contents text-xs font-bold text-red-600">
              *Mark indicates mandatory field
            </p>
          </label>
        </div>
        <form className="mt-4 ">
          <div className="m-4 rounded-none border border-gray-500 bg-white px-0  pb-4 pt-0 lg:max-w-full">
            <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
              <h2 className="text-center text-sm font-semibold text-white">
                Holding Details
              </h2>
            </nav>
            <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex ">
              <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                <label
                  className="mb-2 block text-xs font-bold text-gray-700"
                  htmlFor="password"
                >
                  Holding No.
                </label>
                <input
                  onChange={(e) => handleConsumerDetailsChange(e)}
                  value={consumerDetails.detail?.holding_no}
                  className="bg-white-200 text-white-700 w-full appearance-none rounded border border-gray-500 px-4 py-2 
                                            leading-tight focus:border-2 focus:border-blue-500 focus:bg-white focus:outline-none"
                  id="holding_no"
                  type="text"
                  placeholder="Holding No."
                />
              </div>
              <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                <label
                  className="mb-2 block text-xs font-bold text-gray-700"
                  htmlFor="password"
                >
                  Ward No.
                  <p className="contents text-sm font-bold text-red-600">*</p>
                </label>
                <Select
                  id="ward_id"
                  onChange={(e) => handleConsumerDetailsChange(e)}
                  label="select"
                  // value={String(consumerDetails.detail?.ward_id)}
                  className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
                >
                  {safAllInputFromAPI?.ward?.length > 0 ? (
                    safAllInputFromAPI.ward.map((item) => {
                      const {
                        id,
                        zone_mstr_id,
                        ward_name,
                        area_name,
                        stampdate,
                        user_id,
                        status,
                      } = item;
                      return (
                        <Option key={id} value={JSON.stringify(item)}>
                          {ward_name}
                        </Option>
                      );
                    })
                  ) : (
                    <Option>Loading...</Option>
                  )}
                </Select>
              </div>
            </div>
          </div>
          <div className="mb-6"></div>

          <div className="m-4 mt-4 rounded-none border border-gray-500 bg-white  px-0 pb-4 pt-0 lg:max-w-full">
            <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
              <h2 className="text-center text-sm font-semibold text-white">
                Consumer Details
              </h2>
            </nav>
            <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex">
              <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                <label
                  className="mb-2 block text-xs font-bold text-gray-700"
                  htmlFor="password"
                >
                  Consumer No.
                </label>
                <p>Auto-generated</p>
                {/* <input
                   onChange={(e) => handleConsumerDetailsChange(e)}
                  value={consumerDetails.consumer_no}
                  className="bg-white-200 appearance-none border rounded w-full py-2 px-4 text-white-700 leading-tight 
                                            focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500 border-gray-500"
                  id="consumer_no" type="text" placeholder="Consumer No." /> */}
              </div>
              <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                <label
                  className="mb-2 block text-xs font-bold text-gray-700"
                  htmlFor="password"
                >
                  Consumer Name
                  <p className="contents text-sm font-bold text-red-600">*</p>
                </label>
                <input
                  onChange={(e) => handleConsumerDetailsChange(e)}
                  value={consumerDetails.detail?.consumer_name}
                  className="bg-white-200 text-white-700 w-full appearance-none rounded border border-gray-500 px-4 py-2 
                                            leading-tight focus:border-2 focus:border-blue-500 focus:bg-white focus:outline-none"
                  id="consumer_name"
                  type="text"
                  placeholder="Consumer Name"
                />
              </div>
              <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                <label
                  className="mb-2 block text-xs font-bold text-gray-700"
                  htmlFor="password"
                >
                  Mobile No.
                  <p className="contents text-sm font-bold text-red-600">*</p>
                </label>
                <input
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                    handleConsumerDetailsChange(e);
                  }}
                  value={consumerDetails.detail?.mobile_no}
                  className="bg-white-200 text-white-700 w-full appearance-none rounded border border-gray-500 px-4 py-2 
                                            leading-tight focus:border-2 focus:border-blue-500 focus:bg-white focus:outline-none"
                  type="tel"
                  pattern="[0-9]{0,10}"
                  id="mobile_no"
                  placeholder="Mobile No."
                />
              </div>
            </div>
            <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex ">
              <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                <label
                  className="mb-2 block text-xs font-bold text-gray-700"
                  htmlFor="password"
                >
                  Guardian Name
                </label>
                <input
                  onChange={(e) => handleConsumerDetailsChange(e)}
                  value={consumerDetails.detail?.gradian_name}
                  className="bg-white-200 text-white-700 w-full appearance-none rounded border border-gray-500 px-4 py-2 
                                            leading-tight focus:border-2 focus:border-blue-500 focus:bg-white focus:outline-none"
                  id="gradian_name"
                  type="text"
                  placeholder="Guardian Name"
                />
              </div>
              <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                <label
                  className="mb-2 block text-xs font-bold text-gray-700"
                  htmlFor="password"
                >
                  Relation
                </label>
                <div className="flex w-full items-end ">
                  <Select
                    id="relation"
                    onChange={(e) => handleConsumerDetailsChange(e)}
                    label="select"
                    // value={consumerDetails.detail?.relation}
                    className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
                  >
                    <Option value="relation_S/O">S/O</Option>
                    <Option value="relation_D/O">D/O</Option>
                    <Option value="relation_W/O">W/O</Option>
                    <Option value="relation_C/O">C/O</Option>
                  </Select>
                </div>
              </div>
              <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                <label
                  className="mb-2 block text-xs font-bold text-gray-700"
                  htmlFor="password"
                >
                  House/Flat No.
                  <p className="contents text-sm font-bold text-red-600">*</p>
                </label>
                <input
                  onChange={(e) => handleConsumerDetailsChange(e)}
                  value={consumerDetails.detail?.house_flat_no}
                  className="bg-white-200 text-white-700 w-full appearance-none rounded border border-gray-500 px-4 py-2 
                                            leading-tight focus:border-2 focus:border-blue-500 focus:bg-white focus:outline-none"
                  id="house_flat_no"
                  type="text"
                  placeholder="House / Flat No."
                />
              </div>
            </div>
            <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex ">
              <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                <label
                  className="mb-2 block text-xs font-bold text-gray-700"
                  htmlFor="password"
                >
                  Property Address
                  <p className="contents text-sm font-bold text-red-600">*</p>
                </label>
                <textarea
                  onChange={(e) => handleConsumerDetailsChange(e)}
                  value={consumerDetails.detail?.address}
                  className="bg-white-200 text-white-700 h-10 w-full appearance-none rounded border border-gray-500 px-4 py-2 leading-tight focus:border-2 focus:border-blue-500 focus:bg-white focus:outline-none "
                  id="address"
                  name="w3review"
                  rows="4"
                  cols="20"
                ></textarea>
              </div>
              <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                <label
                  className="mb-2 block text-xs font-bold text-gray-700"
                  htmlFor="password"
                >
                  Landmark
                </label>
                <input
                  onChange={(e) => handleConsumerDetailsChange(e)}
                  value={consumerDetails.detail?.land_mark}
                  className="bg-white-200 text-white-700 w-full appearance-none rounded border border-gray-500 px-4 py-2 
                                            leading-tight focus:border-2 focus:border-blue-500 focus:bg-white focus:outline-none"
                  id="land_mark"
                  type="text"
                  placeholder="Landmark"
                />
              </div>

              <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                <label
                  className="mb-2 block text-xs font-bold text-gray-700"
                  htmlFor="password"
                >
                  Police Station
                </label>
                <input
                  onChange={(e) => handleConsumerDetailsChange(e)}
                  value={consumerDetails.detail?.police_station}
                  className="bg-white-200 text-white-700 w-full appearance-none rounded border border-gray-500 px-4 py-2 
                                            leading-tight focus:border-2 focus:border-blue-500 focus:bg-white focus:outline-none"
                  id="police_station"
                  type="text"
                  placeholder="Police Station"
                />
              </div>
            </div>

            <div className="mb-6"></div>
          </div>
          <div className="m-4 mt-4 rounded-none border border-gray-500 bg-white  px-0 pb-4 pt-0 lg:max-w-full">
            <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
              <h2 className="text-center text-sm font-semibold text-white">
                Area Details
              </h2>
            </nav>
            {renderForm(1)}
            {forms.map((formId) => renderForm(formId))}
            <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex ">
              <div className="mb-6 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                <label
                  className="mb-2 block text-xs font-bold text-gray-700"
                  htmlFor="password"
                >
                  Monthly Amount : {monthAmount}
                  {/* Tset Amount : {testamt} */}
                </label>
                {/* {
          isMonthlyAmountLoading == true ? (
            <ColorRingCustom />
          ) : null
        }
        {
          isMonthlyAmountLoaded == true && monthlyAmount ? (
            <p className="text-green-500 font-bold text-xs mt-2 pl-1">{monthlyAmount?.amount}</p>
          ) : null
        }
        {
          isMonthlyAmountLoaded == false ? (
            <NotFoundErrorMessageCustom
              message={SOMETHING_WENT_WRONG}
              text_size={`xs`}
            />
          ) : null
        } */}
              </div>
            </div>
          </div>
        </form>
        <div className="m-4 mt-4 rounded-none bg-white px-0 pb-4 pt-0 lg:max-w-full">
          {isConsumerCreationInProgress == true ? <ColorRingCustom /> : null}
          {isConsumerCreationInSuccessful == true &&
            consumerNumberAfterCreation ? (
            <FloatingMessage
              message={`Consumer with "${consumerNumberAfterCreation}" has been successfully created`}
              showMessage={true}
              closeFloatingMessage={closeFloatingMessage}
              color={`green`}
            />
          ) : null}
          {isConsumerCreationInSuccessful == false ? (
            <FloatingMessage
              message={SOMETHING_WENT_WRONG}
              showMessage={true}
              closeFloatingMessage={closeFloatingMessage}
              color={`red`}
            />
          ) : null}
          {
            isConsumerCreationDuplicate == true ? (
              <FloatingMessage
              message={"Same Consumer Cannot be Selected Multiple times"}
              showMessage={true}
              closeFloatingMessage={closeFloatingMessage}
              color={`red`}
            />
            ): null
          }
          <div className="container mx-0 flex min-w-full flex-col items-center px-10 py-2">
            <div className="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
              {/* <button
                className="w-36 h-8 px-4 py-1 mx-4 mb-2 tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
                Back
              </button> */}
              <button
                onClick={handleCreateNewUser}
                className="mx-4 mb-2 h-8 w-36 transform rounded-md bg-green-400 px-4 py-1 
                tracking-wide text-white transition-colors duration-200 hover:bg-green-700 focus:bg-green-400 
                focus:outline-none cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default AddNewUserForm;