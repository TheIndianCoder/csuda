import React, { useEffect, useState } from 'react'
import { Select, Option, Button, Textarea, Checkbox, Tooltip, Switch } from "@material-tailwind/react";
import TextField from '@mui/material/TextField';
import { getCookieByName } from '@/utils/RequireAuth';
import { ColorRingCustom, NotFoundErrorMessageCustom } from '@/utils/commonComponents';
import { FILL_ALL_MANDATORY_FIELDS, SOMETHING_WENT_WRONG, SUDA_TOKEN, SUDA_USER_ID } from '@/utils/appConstants';
import { isBlankString, isStringContainOnlyDigits } from '@/utils/formValidatorUtils';
import { useMaterialTailwindController } from '@/Dashboard/context';
import FloatingMessage from '@/utils/floatingMessage';

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL
let unique2 = []
function AddNewRenterForm({
  showModal, currModal, nextModal, switchOnPrevModalNOffCurrModal, consumerItemForView,
  prevModal
}) { 
  const [controller, dispatch] = useMaterialTailwindController();

  const [formCounter, setFormCounter] = useState(1);
  const [forms, setForms] = useState([]);
  const { safAllInputFromAPI, consumerCategoryDetailsFromAPI,
    consumerRangeDetailsFromAPI } = controller;

  const [consumerDetails, setConsumerDetails] = useState(null)
  const [isConsumerDetailsLoading, setIsConsumerDetailsLoading] = useState(null)
  const [isConsumerDetailsLoaded, setIsConsumerDetailsLoaded] = useState(null)

  const [isConsumerCreationDuplicate, setIsConsumerCreationDuplicate] =
    useState(null);

  const [rentalDetails, setRentalDetails] = useState({
    consumer_cat_mstr_id: "",
    consumer_dtl_id: "",
    consumer_mstr_id: "",
    consumer_range_mstr_id: "",
    consumer_rate_mstr_id: 0,
    created_byid: 0,
    financial_year: "",
    financial_year_id: 0,
    house_flat_no: "",
    month: 0,
    rate_chart_id: 0,
    renter_gradian_name: "string",
    renter_mobile_no: "",
    renter_name: "",
    renter_relation: "",
    ward_id: ""
  })

  const [isRenterDetailsValid, setIsRenterDetailsValid] = useState(null)
  const [isRenterCreationInProgress, setIsRenterCreationInProgress] = useState(null)
  const [isRenterCreationInSuccessful, setIsRenterCreationInSuccessful] = useState(null)

  const [monthlyAmount, setMonthlyAmount] = useState(null)
  const [isMonthlyAmountLoading, setIsMonthlyAmountLoading] = useState(null)
  const [isMonthlyAmountLoaded, setIsMonthlyAmountLoaded] = useState(null)
  const [selectedCustomercategory, setSelectedCustomercategory] = useState([]);
  const [consumerRangeDrop, setConsumerRangeDrop] = useState({});
  const [consumerCategory, setConsumerCategory] = useState({});
  const [amountPerMonth, setAmountPerMonth] = useState({});
  const [details, setDetails] = useState("");
  const [fetchedYears, setFetchedYears] = useState({});

  const [selectedYear, setSelectedYear] = useState({});
  const [selectedMonth, setSelectedMonth] = useState({});

  const [selectedYearRange, setSelectedYearRange] = useState({});

  const [monthAmount, setMonthAmount] = useState(0);

  const [allMonthAmount, setAllMonthAmount] = useState({});

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


  const fetchFromAPI = async (url, requestOptions, setter, setIsLoading, setIsLoaded) => {
    setIsLoaded(null)
    setIsLoading(true)
    try {
      let response = null, responseBody = null
      response = await fetch(url, requestOptions)
      responseBody = await response?.json()
      console.log("searching with api...")
      console.log(responseBody)
      if (response?.status == '200') {
        setIsLoaded(true)
        setter(responseBody)
      } else {
        setter([])
        setIsLoaded(false)
      }
    } catch (err) {
      console.error(err)
      setIsLoaded(false)
    } finally {
      setIsLoading(false)
    }
  }

  // const fetchFromAPIWithOutSetter = async (url, requestOptions, setIsLoading, setIsLoaded) => {
  //   setIsLoaded(null)
  //   setIsLoading(true)
  //   try {
  //     let response = null, responseBody = null
  //     response = await fetch(url, requestOptions)
  //     responseBody = await response?.text()
  //     console.log(responseBody)
  //     if (response?.status == '200') {
  //       setIsLoaded(true)
  //     } else {
  //       setIsLoaded(false)
  //     }
  //   } catch (err) {
  //     console.error(err)
  //     setIsLoaded(false)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const handleRenterDetailsChange = (event) => {
    console.log(event)
    const eventId = event?.target?.id
    const eventVal = event?.target?.value
    const eventStr = event + ""
    if (eventId) {
      setRentalDetails(prevState => {
        return {
          ...prevState, [eventId]: eventVal
        }
      })
    } else if (eventStr.includes('category_name')) {
      const item = JSON.parse(event)
      setRentalDetails(prevState => {
        return {
          ...prevState, consumer_cat_mstr_id: item.id
        }
      })
    }
    else if (event.toString().includes("relation")) {
      let relation = event.toString().split("_")[1]
      document.getElementById("renter_relation").innerHTML = event.toString().split("_")[1];
      setRentalDetails((prevState) => {
        return {
          ...prevState,
          renter_relation: relation
        }
      })
    }
    else if (eventStr.includes('range_name')) {
      const item = JSON.parse(event)
      setRentalDetails(prevState => {
        return {
          ...prevState, consumer_range_mstr_id: item.id
        }
      })
      const url = `${SUDA_API_BASE_URL}/user/fetchMonthlyAmount?consumer_range_mstr_id=${rentalDetails?.consumer_range_mstr_id}`
      const requestOptions = {
        method: "GET",
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName(SUDA_TOKEN)}` },
      }
      fetchFromAPI(url, requestOptions, setMonthlyAmount, setIsMonthlyAmountLoading, setIsMonthlyAmountLoaded)
    } else if (eventStr.includes('fy_name')) {
      const item = JSON.parse(event)
      setRentalDetails(prevState => {
        return {
          ...prevState, financial_year: item.fy_name, financial_year_id: item.id
        }
      })
    } else if (eventStr.includes('month')) {
      setRentalDetails(prevState => {
        return {
          ...prevState, month: parseInt(eventStr.split('_')[1])
        }
      })
    } else if (eventStr.includes('relation')) {
      setRentalDetails(prevState => {
        return {
          ...prevState, renter_relation: eventStr.split('_')[1]
        }
      })
    }
  }

  const handleConsumerDetailsChange = (event, formId) => {
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
      const item = JSON.parse(event);
      if (allMonthAmount[formId]) {
        allMonthAmount[formId] = "reset";
      }
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
      if (allMonthAmount[formId]) {
        allMonthAmount[formId] = "reset";
      }
      const item = JSON.parse(event);

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
      if (allMonthAmount[formId]) {
        allMonthAmount[formId] = "reset";
      }
      const item = JSON.parse(event);

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

  useEffect(() => {
    console.log(rentalDetails, "rentalDetails")
  }, [rentalDetails])
  const handleRenterCreation = async () => {
    // const requestBody = {
    //   ...rentalDetails,
    //   consumer_mstr_id: consumerDetails[0]?.consumer_mstr_id,
    //   consumer_dtl_id: consumerItemForView?.id,
    //   consumer_rate_mstr_id: monthlyAmount?.id,
    //   created_byid: parseInt(getCookieByName(SUDA_USER_ID)),
    //   rate_chart_id: monthlyAmount?.id,
    //   house_flat_no: consumerDetails[0]?.house_flat_no,
    //   ward_id: consumerDetails[0]?.ward_id,
    // }
    // console.log(requestBody)
    // // throw new Error("test")
    // const url = `${SUDA_API_BASE_URL}/user/addRenter`
    //   const requestOptions = {
    //     method: "POST",
    //     headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName(SUDA_TOKEN)}` },
    //     body: JSON.stringify(requestBody)
    //   }
    // fetchFromAPIWithOutSetter(url, requestOptions, setIsRenterCreationInProgress, setIsRenterCreationInSuccessful)
    setIsRenterCreationInSuccessful(null);
    setIsRenterCreationInProgress(true);
    try {
      let convertedData = {
        consumer_mstr_id: consumerDetails[0].consumer_mstr_id,
        // consumer_dtl_id: consumerDetails[0].consumer_mstr_id,
        ward_id: consumerDetails[0].ward_id,
        renter_name: rentalDetails.renter_name,
        renter_mobile_no: rentalDetails.renter_mobile_no,
        house_flat_no: consumerDetails[0].house_flat_no,
        renter_gradian_name: rentalDetails.gradian_name,
        renter_relation: rentalDetails.relation,
        created_byid: parseInt(getCookieByName(SUDA_USER_ID)),
        area_details: Object.keys(consumerDetails)
          .filter((key) => key !== "0")
          .map((key) => {
            const detail = consumerDetails[key];
            console.log("detail", detail);
            if (detail.consumer_cat_mstr_id === 0 || detail.consumer_range_mstr_id === 0 || detail.consumer_rate_mstr_id === 0
              || detail.rate_chart_id === 0 || detail.financial_year === "" || detail.financial_year_id === 0
              || detail.month === 0) {
              setIsRenterCreationInSuccessful(false);
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
                monthlyAmount: allMonthAmount[key].amt,
                created_byid: parseInt(getCookieByName(SUDA_USER_ID)),
                ward_id: consumerDetails[0].ward_id,
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
      if (convertedData.renter_name === "" || convertedData.renter_mobile_no === "") {
        setIsRenterCreationInSuccessful(false);
        return
      }
      // clearFields();
      const url = `${SUDA_API_BASE_URL}/user/addRenter`;
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
        setIsRenterCreationInSuccessful(true);
        clearFields();
        setForms([]);
        setFormCounter(1);
        // setConsumerDetails({});
        setSelectedCustomercategory([]);
        setAllMonthAmount({});
        // document.getElementById("holding_no").value = "";
        // document.getElementById("consumer_name").value = "";
        // document.getElementById("mobile_no").value = "";
        document.getElementById("renter_gradian_name").value = "";
        // document.getElementById("house_flat_no").value = "";
        // document.getElementById("address").value = "";
        // document.getElementById("land_mark").value = "";
        // document.getElementById("police_station").value = "";
        // document.getElementById("ward_id").innerHTML = "";
        document.getElementById("renter_relation").innerHTML = "";
        document.getElementById("consumer_category1").innerHTML = "";
        document.getElementById("consumer_range1").innerHTML = "";
        document.getElementById("consumer_year_of_effect1").innerHTML = "";
        document.getElementById("consumer_month_of_effect1").innerHTML = "";
        setMonthAmount(0)
        convertedData = {};
      } else {
        // clearFields()
        setIsRenterCreationInSuccessful(false);
        // window.location.reload();
        convertedData = {};
      }
    } catch (err) {
      console.error(err);
      setIsRenterCreationInSuccessful(false);
    } finally {
      setIsRenterCreationInProgress(false);
    }
  }

  const clearFields = () => {
    console.log('clearFields', consumerDetails);

    // Create a copy of the consumerDetails object
    const updatedConsumerDetails = { ...consumerDetails };

    // Get the keys of the consumerDetails object and filter out the key "0"
    const keysToKeep = Object.keys(updatedConsumerDetails).filter((key) => key === "0");

    // Create a new object containing only the "0" key and its value
    const filteredConsumerDetails = keysToKeep.reduce((result, key) => {
      result[key] = updatedConsumerDetails[key];
      return result;
    }, {});

    // Update the consumerDetails state with the filtered object
    setConsumerDetails(filteredConsumerDetails);

    console.log('clearFields1', consumerDetails);
  }

  useEffect(() => {
    if (isRenterCreationInSuccessful == true) {
      clearState()
    }
  }, [isRenterCreationInSuccessful])

  const clearState = () => {
    setRentalDetails({
      consumer_cat_mstr_id: "",
      consumer_dtl_id: "",
      consumer_mstr_id: "",
      consumer_range_mstr_id: "",
      consumer_rate_mstr_id: 0,
      created_byid: 0,
      financial_year: "",
      financial_year_id: 0,
      house_flat_no: "",
      month: 0,
      rate_chart_id: 0,
      renter_gradian_name: "string",
      renter_mobile_no: "",
      renter_name: "",
      renter_relation: "",
      ward_id: ""
    })
  }

  const closeFloatingMessage = () => {
    setIsRenterCreationInSuccessful(null)
    setIsConsumerCreationDuplicate(null);
  }

  useEffect(() => {
    const { consumer_no, id } = consumerItemForView
    const requestOptions = {
      method: "GET",
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName(SUDA_TOKEN)}` },
    }
    const safSearchUrl = `${SUDA_API_BASE_URL}/user/fetchConsumerDetailByConsumerNo?consumer_no=${consumer_no}&id=${id}`
    fetchFromAPI(safSearchUrl, requestOptions, setConsumerDetails, setIsConsumerDetailsLoading, setIsConsumerDetailsLoaded)
  }, [])

  useEffect(() => {
    if (rentalDetails) {
      let isValid = true
      const { renter_name, renter_mobile_no, consumer_cat_mstr_id,
        consumer_range_mstr_id, financial_year } = rentalDetails
      isValid = isValid && !isBlankString(renter_name) && !isBlankString(consumer_cat_mstr_id) &&
        !isBlankString(consumer_cat_mstr_id) && !isBlankString(consumer_range_mstr_id) && !isBlankString(financial_year) &&
        !isBlankString(renter_mobile_no) && isStringContainOnlyDigits(renter_mobile_no)
        && (renter_mobile_no + "").length == 10
      console.log(`isValid`)
      console.log(isValid)
      setIsRenterDetailsValid(isValid)
    }
  }, [rentalDetails])


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
    const selectedCategoryId = consumerDetails?.consumerDetails?.[formId]?.consumer_cat_mstr_id;
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

  const handleDeleteForm = (formId, e) => {
    e.preventDefault();
    setFormCounter(formCounter - 1);
    // console.log("formCounter", formCounter);
    // console.log("allMonthAmount", allMonthAmount)
    const amtofthisForm = allMonthAmount[formId]?.amt;
    console.log(amtofthisForm);
    setMonthAmount(monthAmount - amtofthisForm)
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

    setAllMonthAmount((prevAmount) => {
      const updatedAmount = { ...prevAmount };
      delete updatedAmount[formId];
      return updatedAmount;
    });

    setSelectedCustomercategory((prevSelectedCategories) =>
      prevSelectedCategories.filter(
        (category) => category.id !== deletedCategoryId
      )
    );
  };



  useEffect(() => {
    // console.log("detailsssssssssss", details);
  }, [details]);

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

  useEffect(() => {
    console.log(consumerDetails?.[0], consumerDetails?.[1]?.consumer_cat_mstr_id      , "consumerDetails");
  }, [consumerDetails]);

  useEffect(() => {
    console.log(selectedYearRange, "selectedYearRange")

  }, [ selectedYearRange])


  useEffect(() => {
    console.log(selectedMonth, "selectedMonth")

  }, [ selectedMonth])

  useEffect(() => {
    if (consumerDetails !== null) {
      Object.keys(consumerDetails)?.forEach((formId) => {
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
    }
  }, [consumerDetails]);

  useEffect(() => {
    // console.log("fetchedYears", fetchedYears);

    function getUnique(array) {
      var uniqueArray = [...new Set(array)].sort();
      return uniqueArray;
    }

    if (consumerDetails  !== null) {
      if(consumerDetails?.[1]?.consumer_cat_mstr_id > 0  && selectedYear?.[1] > 0 ){
      Object.keys(consumerDetails).forEach((formId) => {
        var uniqueNames = getUnique(fetchedYears[formId] || []);
        // console.log(uniqueNames);
        let finalYear = uniqueNames[0]?.split("-")[0];
        console.log(selectedYear[formId] < finalYear, "finalYear");

        if (selectedYear[formId] < finalYear) {
          console.log("1 setSelectedYearRange")
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
                console.log("2 setSelectedYearRange")
                 setSelectedYearRange((prevState) => ({
                   ...prevState,
                   [formId]: uniqueNames,
                 }));
               } else if (Number(selectedMonth[formId]) > Number(finalMonth)) {
                console.log("3 setSelectedYearRange")
                 setSelectedYearRange((prevState) => ({
                   ...prevState,
                   [formId]: uniqueNames,
                 }));
               } else if (Number(selectedMonth[formId]) === Number(finalMonth)) {
                console.log("4 setSelectedYearRange")
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
          console.log("6 setSelectedYearRange")
          setSelectedYearRange((prevState) => ({
            ...prevState,
            [formId]: uniqueNames[index-1],
          }));
  
          }
        }
      });
    }
  }
  }, [fetchedYears, consumerDetails, selectedMonth, selectedYear]);

  // useEffect(() => {
  //   console.log(monthAmount, "monthAmount")

  // }, [monthAmount, selectedYearRange])
  // useEffect(() => {
  // console.log(selectedYearRange, "selectedYearRange", "setSelectedMonth", selectedMonth)
  // }, [selectedYearRange, selectedMonth])

  useEffect(() => {
    if (consumerDetails !== null) {
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
          // console.log("formDetails", formDetails);
          const matchingCategory = details?.categories?.find(
            (category) => category.id === formDetails.consumer_cat_mstr_id
          );

          if (matchingCategory) {
            // console.log("matchingCategory", matchingCategory);
            let matchingRange = matchingCategory.consumerRangeType.find(
              (range) =>
                range.id === formDetails.consumer_range_mstr_id &&
                range.dateOfEffect === selectedYearRange[formId]
            );
            console.log("matching range", matchingRange);
            console.log("allMonthAmount[formId]", allMonthAmount[formId]);
            if (matchingRange && (!allMonthAmount[formId] || allMonthAmount[formId] == "reset")) {
              //if (matchingRange) {
              console.log(matchingRange);
              console.log(monthAmount);
              setAllMonthAmount(prevState => ({
                ...prevState,
                [formId]: {
                  ...prevState[formId],
                  amt: matchingRange.rate,
                }
              }));
              console.log("Hello I am Here", allMonthAmount)
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
              }
               
              else if (allMonthAmount[formId] == "reset") {
                console.log("Here I ame", allMonthAmount[formId], allMonthAmount[formId]?.amt);
                console.log("form Count", formCounter);
                if (formCounter > 0){
                  let amt = 0;
                  for (const key in allMonthAmount) {
                    if (allMonthAmount.hasOwnProperty(key)) {
                      if (allMonthAmount[key] != "reset"){
                        const value = allMonthAmount[key]?.amt;
                        amt += value
                        console.log("amt", amt, key, "i");
                      }
                    }
                  }
                  let amount = (amt) + matchingRange.rate
                  setMonthAmount(amount);
                  console.log("month amount", monthAmount);
                }
              }
            }
          }
        }
      });
    }

  }
    , [ selectedYearRange, fetchedYears, consumerDetails, selectedMonth, selectedYear]);

  useEffect(() => {
    // console.log(monthAmount, "monthAmount");
  }, [monthAmount]);
  // const handleConsumerDetailsChange = (event, formId) => {
  //   if (!consumerDetails[formId] && formId) {
  //     setConsumerDetails(prevState => ({
  //       ...prevState,
  //       [formId]: {
  //         address: "",
  //         consumer_cat_mstr_id: "",
  //         consumer_name: "",
  //         consumer_no: "",
  //         consumer_range_mstr_id: "",
  //         consumer_rate_mstr_id: 0,
  //         created_byid: 0,
  //         financial_year: "",
  //         financial_year_id: "",
  //         gradian_name: "",
  //         holding_no: "",
  //         house_flat_no: "",
  //         land_mark: "",
  //         month: 0,
  //         police_station: "",
  //         rate_chart_id: 0,
  //         relation: "",
  //         ward_id: "",
  //         ward_no: 0,
  //       }
  //     }));
  //   }
  //   const eventId = event?.target?.id;
  //   const eventVal = event?.target?.value;
  //   const eventStr = event + "";

  //   if (eventId && !formId) {
  //     setConsumerDetails(prevState => ({
  //       ...prevState,
  //       "detail": {
  //         ...prevState["detail"],
  //         [eventId]: eventVal
  //       }
  //     }));
  //   } else if (eventStr.includes("ward")) {
  //     const item = JSON.parse(event);
  //     console.log("ward", item);
  //     if (formId) {
  //       setConsumerDetails(prevState => ({
  //         ...prevState,
  //         [formId]: {
  //           ...prevState[formId],
  //           ward_id: item.id,
  //           ward_no: parseInt(item.ward_name)
  //         }
  //       }));
  //     } else {
  //       setConsumerDetails(prevState => ({
  //         ...prevState,
  //         "detail": {
  //           ...prevState["detail"], 
  //           ward_id: item.id,
  //           ward_no: parseInt(item.ward_name)
  //         }
  //       }));
  //       document.getElementById("ward_id").innerHTML = item.ward_name;
  //     }
  //   } else if (eventStr.includes("category_name")) {
  //     const item = JSON.parse(event);
  //     // setMonthAmount('')
  //     setSelectedCustomercategory((prevSelectedCategories) => [
  //       ...prevSelectedCategories,
  //       item,
  //     ]);

  //     var consumerCategoryId = "consumer_category" + formId;
  //     document.getElementById(consumerCategoryId).innerHTML =
  //       item.category_name;
  //     setConsumerDetails(prevState => ({
  //       ...prevState,
  //       [formId]: {
  //         ...prevState[formId],
  //         consumer_cat_mstr_id: item.id,
  //       }
  //     }));

  //     setConsumerRangeDrop((prevRangeDrop) => ({
  //       ...prevRangeDrop,
  //       [formId]: item.consumerRangeType,
  //     }));

  //     // console.log("consumerRange", consumerRangeDrop[formId]);
  //   } else if (eventStr.includes("range_name")) {
  //     const item = JSON.parse(event);

  //     document.getElementById("consumer_range" + formId).innerHTML =
  //       item.range_name;
  //     setConsumerDetails(prevState => ({
  //       ...prevState,
  //       [formId]: {
  //         ...prevState[formId],
  //         consumer_range_mstr_id: item.id
  //       }
  //     }));

  //   } else if (eventStr.includes("fy_name")) {
  //     const item = JSON.parse(event);

  //     document.getElementById("consumer_year_of_effect" + formId).innerHTML =
  //       item.fy_name;

  //     setConsumerDetails(prevState => ({
  //       ...prevState,
  //       [formId]: {
  //         ...prevState[formId],
  //         financial_year: item.fy_name,
  //         financial_year_id: item.id,
  //       }
  //     }));
  //   } else if (eventStr.includes("month")) {

  //     document.getElementById("consumer_month_of_effect" + formId).innerHTML =
  //     getMonthName(parseInt(eventStr.split("_")[1]));

  //     setConsumerDetails(prevState => ({
  //       ...prevState,
  //       [formId]: {
  //         ...prevState[formId],
  //         month: parseInt(eventStr.split("_")[1]),

  //       }
  //     }));
  //   } else if (eventStr.includes("relation")) {
  //     if (formId) {
  //       setConsumerDetails(prevState => ({
  //         ...prevState,
  //         [formId]: {
  //           ...prevState[formId],
  //           relation: eventStr.split("_")[1]
  //         }
  //       }));
  //     } else {
  //       document.getElementById("relation").innerHTML = eventStr.split("_")[1];
  //       setConsumerDetails(prevState => ({
  //         ...prevState,
  //         "detail": {
  //           ...prevState["detail"],
  //           relation: eventStr.split("_")[1]
  //         }
  //       }));
  //     }
  //   }
  // };

  return showModal == true ? (
    <>
      <div>
        <div className="w-full px-0 pt-0 pb-4 m-auto bg-white rounded-none border border-gray-500 lg:max-w-full">
          <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
            <h2 className="text-sm font-semibold text-center text-white">
              Consumer Details
            </h2>
          </nav>
          {
            isConsumerDetailsLoading == true ? (
              <ColorRingCustom />
            ) : null
          }
          {
            isConsumerDetailsLoaded == false ? (
              <NotFoundErrorMessageCustom
                message={SOMETHING_WENT_WRONG}
                text_size={`sm`}
              />
            ) : null
          }
          {
            isConsumerDetailsLoaded == true && consumerDetails ? (
              <div className="flex flex-col">
                <div className="overflow-x-auto">
                  <div className="p-2.5 lg:w-full inline-block align-middle">
                    <div className="overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-gray-50">
                        </thead>
                        <tbody>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-4 py-2 font-semibold text-xs text-gray-900 whitespace-normal">
                              Ward No.
                            </td>
                            <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                              :
                            </td>
                            <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                              {!isBlankString(consumerDetails[0]?.ward_no) ? consumerDetails[0]?.ward_no : `N/A`}
                            </td>
                            <td className="px-4 py-2 font-semibold text-xs text-gray-900 whitespace-normal">
                              Holding No.
                            </td>
                            <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                              :
                            </td>
                            <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                              {!isBlankString(consumerDetails[0]?.holding_no) ? consumerDetails[0]?.holding_no : `N/A`}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-4 py-2 font-semibold text-xs text-gray-900  whitespace-normal">
                              Consumer Name
                            </td>
                            <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                              :
                            </td>
                            <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                              {!isBlankString(consumerDetails[0]?.consumer_name) ? consumerDetails[0]?.consumer_name : `N/A`}
                            </td>
                            <td className="px-4 py-2 font-semibold text-xs text-gray-900  whitespace-normal">
                              Consumer No.
                            </td>
                            <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal ">
                              :
                            </td>
                            <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                              {!isBlankString(consumerDetails[0]?.consumer_no) ? consumerDetails[0]?.consumer_no : `N/A`}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-4 py-2 font-semibold text-xs text-gray-900  whitespace-normal">
                              Guardian Name
                            </td>
                            <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                              :
                            </td>
                            <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                              {!isBlankString(consumerDetails[0]?.gradian_name) ? consumerDetails[0]?.gradian_name : `N/A`}
                            </td>
                            <td className="px-4 py-2 font-semibold text-xs text-gray-900  whitespace-normal">
                              Relation
                            </td>
                            <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                              :
                            </td>
                            <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                              {!isBlankString(consumerDetails[0]?.relation) ? consumerDetails[0]?.relation : `N/A`}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-4 py-2 font-semibold text-xs text-gray-900  whitespace-normal">
                              Mobile No.
                            </td>
                            <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                              :
                            </td>
                            <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                              {!isBlankString(consumerDetails[0]?.mobile_no) ? consumerDetails[0]?.mobile_no : `N/A`}
                            </td>
                            <td className="px-4 py-2 font-semibold text-xs text-gray-900  whitespace-normal">
                              Consumer Type
                            </td>
                            <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                              :
                            </td>
                            <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                              {!isBlankString(consumerDetails[0]?.consumer_type) ? consumerDetails[0]?.consumer_type : `N/A`}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-4 py-2 font-semibold text-xs text-gray-900  whitespace-normal">
                              Address
                            </td>
                            <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal ">
                              :
                            </td>
                            <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                              {!isBlankString(consumerDetails[0]?.address) ? consumerDetails[0]?.address : `N/A`}
                            </td>
                            <td className="px-4 py-2 font-semibold text-xs text-gray-900  whitespace-normal">
                              House/Flat No.
                            </td>
                            <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                              :
                            </td>
                            <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                              {!isBlankString(consumerDetails[0]?.house_flat_no) ? consumerDetails[0]?.house_flat_no : `N/A`}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-4 py-2 font-semibold text-xs text-gray-900 ">
                              Landmark
                            </td>
                            <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                              :
                            </td>
                            <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                              {!isBlankString(consumerDetails[0]?.land_mark) ? consumerDetails[0]?.land_mark : `N/A`}
                            </td>
                            <td className="px-4 py-2 font-semibold text-xs text-gray-900 ">
                              Police Station
                            </td>
                            <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                              :
                            </td>
                            <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                              {!isBlankString(consumerDetails[0]?.police_station) ? consumerDetails[0]?.police_station : `N/A`}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : null
          }
        </div>
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden mt-10 mb-10">
          <div className="w-full px-0 pt-0 pb-4 m-auto bg-white rounded-md border border-gray-500 lg:max-w-full">
            <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-2 navcustomproperty mb-2 ring-1 ring-black rounded-none">
              <h2 className="text-sm font-semibold text-center text-white">
                Add New Renter
              </h2>
            </nav>
            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
              <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                <p className='contents text-red-600 text-xs font-bold'>*Mark indicates mandatory field</p>
              </label>
            </div>
            <form className="mt-4 ">
              <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-none  mt-4 border border-gray-500 lg:max-w-full">
                <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                  <h2 className="text-sm font-semibold text-center text-white">
                    Renter Details
                  </h2>
                </nav>

                <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end">
                  <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                      Renter No.
                    </label>
                    <p>Auto-generated</p>
                    {/* <input
                      className="bg-white-200 appearance-none border rounded w-full py-2 px-4 text-white-700 leading-tight 
                                            focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500 border-gray-500"
                      id="prop_id" type="text" placeholder="Property ID" /> */}
                  </div>
                </div>
                <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end">
                  <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                      Renter Name
                    </label><p className='contents text-red-600 text-sm font-bold'>*</p>
                    <input
                      onChange={handleRenterDetailsChange}
                      value={rentalDetails?.renter_name}
                      className="bg-white-200 appearance-none border rounded w-full py-2 px-4 text-white-700 leading-tight 
                                            focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500 border-gray-500"
                      id="renter_name" type="text" placeholder="Renter Name" />
                  </div>
                  <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                      Mobile No.
                    </label><p className='contents text-red-600 text-sm font-bold'>*</p>
                    <input
                      onChange={handleRenterDetailsChange}
                      value={rentalDetails?.renter_mobile_no}
                      className="bg-white-200 appearance-none border rounded w-full py-2 px-4 text-white-700 leading-tight 
                                            focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500 border-gray-500"
                      id="renter_mobile_no" type="text" placeholder="Renter Mobile No." />
                  </div>


                </div>
                <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                  <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                      Guardian Name
                    </label>
                    <input
                      onChange={handleRenterDetailsChange}
                      value={rentalDetails?.gradian_name}
                      className="bg-white-200 appearance-none border rounded w-full py-2 px-4 text-white-700 leading-tight 
                                            focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500 border-gray-500"
                      id="renter_gradian_name" type="text" placeholder="Renter's Guardian Name" />
                  </div>
                  <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                      Relation
                    </label>
                    <div className='flex w-full items-end '>
                      <Select
                        id='renter_relation'
                        onChange={handleRenterDetailsChange}
                        label="select" className="pl-2 pr-3 py-2 font-bold text-xs text-gray-900">
                        <Option value='relation_S/O' >S/O</Option>
                        <Option value='relation_D/O' >D/O</Option>
                        <Option value='relation_W/O' >W/O</Option>
                        <Option value='relation_C/O' >C/O</Option>
                      </Select>
                    </div>
                  </div>
                </div>


                <div className="mb-6"></div>
              </div>

              {/* ADDING NEW CODE FOR RENTER */}
              {
                consumerDetails !== null ?
                  <>
                    <div className="m-4 mt-4 rounded-none border border-gray-500 bg-white  px-0 pb-4 pt-0 lg:max-w-full">
                      <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
                        <h2 className="text-center text-sm font-semibold text-white">
                          Area Details
                        </h2>
                      </nav>
                      {renderForm(1)}
                      {forms?.map((formId) => renderForm(formId))}
                      <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex ">
                        <div className="mb-6 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                          <label
                            className="mb-2 block text-xs font-bold text-gray-700"
                            htmlFor="password"
                          >
                            Monthly Amount : {monthAmount}
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
                  </>
                  : <ColorRingCustom />
              }

              {/* ADDITON OF NEW CODE ENDS */}


            </form>
            <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-none mt-4 lg:max-w-full">
              {
                isRenterCreationInProgress == true ? (
                  <ColorRingCustom />
                ) : null
              }
              {
                isRenterCreationInSuccessful == true ? (
                  <FloatingMessage
                    message={`Renter has been successfully created`}
                    showMessage={true}
                    closeFloatingMessage={closeFloatingMessage}
                    color={`green`}
                  />
                ) : null
              }
              {
                isRenterCreationInSuccessful == false ? (
                  <FloatingMessage
                    message={SOMETHING_WENT_WRONG}
                    showMessage={true}
                    closeFloatingMessage={closeFloatingMessage}
                    color={`red`}
                  />
                ) : null
              }
              {
                isConsumerCreationDuplicate == true ? (
                  <FloatingMessage
                    message={"Same Consumer Cannot be Selected Multiple times"}
                    showMessage={true}
                    closeFloatingMessage={closeFloatingMessage}
                    color={`red`}
                  />
                ) : null
              }
              {
                isRenterDetailsValid == false ? (
                  <NotFoundErrorMessageCustom
                    message={FILL_ALL_MANDATORY_FIELDS}
                    text_size={`xs`}
                  />
                ) : null
              }
              <div className="container py-2 px-10 mx-0 min-w-full flex flex-col items-center">
                <div className="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
                  <button
                    onClick={() => switchOnPrevModalNOffCurrModal(currModal, prevModal)}
                    className="w-36 h-8 px-4 py-1 mx-4 mb-2 tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
                    Back
                  </button>
                  <button
                    onClick={handleRenterCreation}
                    className={`w-36 h-8 px-4 py-1 mx-4 mb-2 tracking-wide text-white transition-colors 
                    duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none 
                    focus:bg-green-400 cursor-pointer`}>
                    Add
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  ) : null
}

export default AddNewRenterForm