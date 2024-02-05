import React, { useEffect, useState } from "react";
import { SUDA_TOKEN } from "@/utils/appConstants";
import { getCookieByName } from "@/utils/RequireAuth";
import { Select, Option } from "@material-tailwind/react";
import { useMaterialTailwindController } from "@/Dashboard/context";
import { isBlankString } from "@/utils/formValidatorUtils";
import { isStringContainOnlyDigits } from "@/utils/formValidatorUtils";
import { fetchFromAPI } from "@/utils/commonUtils";
import ViewConsumerDetails from "@/Dashboard/formPagesAdmin/userChargesModule/userChargesDemandAndPayment/viewConsumerDetails";
import FloatingMessage from "@/utils/floatingMessage";
import { SUDA_USER_ID } from "@/utils/appConstants";
import { ColorRing } from "react-loader-spinner";

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL;
let unique2 = [];
function ViewUserUpdateConsumer({
  showModal,
  currModal,
  switchOnPrevModalNOffCurrModal,
  prevModal,
  consumerItemForView,
}) {
  useEffect(() => {
    console.log("consumerItemForView detail", consumerItemForView);
  }, [consumerItemForView]);
  // Function to get month name based on month number
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
  const [isConsumerCreationInSuccessful, setIsConsumerCreationInSuccessful] =
    useState(null);

  const [isConsumerCreationInFailed, setIsConsumerCreationInFailed] =
    useState(null);

  const [isConsumerUpdationInSuccessful, setIsConsumerUpdationInSuccessful] =
    useState(null);

  const [isConsumerUpdationInFailed, setIsConsumerUpdationInFailed] =
    useState(null);

  const [validData, setValidData] = useState(true);
  const closeFloatingMessage = () => {
    setIsConsumerCreationInSuccessful(null);
    setIsConsumerCreationInFailed(null);
    setIsConsumerUpdationInSuccessful(null);
    setIsConsumerUpdationInFailed(null);
  };

  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(null);

  /**
   * consumer details
   */
  const [consumerDetailsCurrent, setConsumerDetailsCurrent] = useState(null);
  const [isConsumerDetailsLoading, setIsConsumerDetailsLoading] =
    useState(null);
  const [isConsumerDetailsLoaded, setIsConsumerDetailsLoaded] = useState(null);
  const [rateId, setRateId] = useState(null);
  const [flag, setFlag] = useState("add");
  const [monthlyAmountSet, setMonthlyAmountSet] = useState(false);

  const [consumerCategory, setConsumerCategory] = useState(null);
  const [consumerRange, setConsumerRange] = useState(null);
  const [consumerDate, setConsumerDate] = useState(null);
  const [consumerAmount, setConsumerAmount] = useState(null);

  useEffect(() => {
    console.log(consumerItemForView);
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookieByName(SUDA_TOKEN)}`,
      },
    };
    //consumer details
    let url = `${SUDA_API_BASE_URL}/user/fetchConsumerDetailByConsumerNo?consumer_no=${consumerItemForView?.consumer_no}&id=${consumerItemForView?.consumer_master_id}`;
    fetchFromAPI(
      url,
      requestOptions,
      setConsumerDetailsCurrent,
      setIsConsumerDetailsLoading,
      setIsConsumerDetailsLoaded
    );

    console.log("consumerDetails", consumerDetailsCurrent);
  }, [consumerItemForView, trigger]);

  const [showModalCurrent, setShowModalCurrent] = useState(false);
  const [formCounter, setFormCounter] = useState(1);
  const [forms, setForms] = useState([]);
  const [controller, dispatch] = useMaterialTailwindController();
  const [details, setDetails] = useState("");
  const [areaDetail, setAreaDetail] = useState("");
  const [isConsumerDetailsValid, setIsConsumerDetailsValid] = useState(null);
  const [selectedCustomercategory, setSelectedCustomercategory] = useState([]);
  const [consumerRangeDrop, setConsumerRangeDrop] = useState({});
  const [consumerDetails, setConsumerDetails] = useState({});
  const [fetchedYears, setFetchedYears] = useState({});

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRange, setSelectedRange] = useState("");
  const [selectedYearInput, setSelectedYearInput] = useState("");
  const [selectedMonthInput, setSelectedMonthInput] = useState("");

  const [selectedYear, setSelectedYear] = useState({});
  const [selectedMonth, setSelectedMonth] = useState({});

  const [selectedYearRange, setSelectedYearRange] = useState({});

  const [monthAmount, setMonthAmount] = useState(0);

  const [allMonthAmount, setAllMonthAmount] = useState({});
  const [consumerRateId, setconsumerRateId] = useState("");
  const [consumerNo, setConsumerNo] = useState("");
  const [wardId, setwardId] = useState("");
  const [oldRateChartId, setoldRateChartId] = useState(0);
  const {
    safAllInputFromAPI,
    consumerCategoryDetailsFromAPI,
    consumerRangeDetailsFromAPI,
  } = controller;

  useEffect(() => {
    console.log(areaDetail, "areaDetail");
  }, [areaDetail]);

  useEffect(() => {
    console.log(consumerDetails, "consumerDetails");
  }, [consumerDetails]);
  useEffect(() => {
    const fetchAreaDetailByConsumerNo = async (e) => {
      try {
        // const Url = `${SUDA_API_BASE_URL}/user/fetchAreaDetailByConsumerNo?consumer_no=${consumerItemForView?.consumer_no}&id=${consumerItemForView?.consumer_master_id}`;
        const Url = `${SUDA_API_BASE_URL}/user/fetchAreaDetailByConsumerNo?consumer_no=${consumerItemForView?.consumer_no}`;
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
          },
        };
        let response = null,
          responseBody = null;
        response = await fetch(Url, requestOptions);
        responseBody = await response.json();
        //console.log("details", response, responseBody)
        if (response?.status == "200" && !responseBody?.errors) {
          console.log("fetchAreaDetailByConsumerNo", responseBody);
          setAreaDetail(responseBody);
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
    fetchAreaDetailByConsumerNo();
  }, []);

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
    console.log(consumerItemForView, "consumerItemForView");
  }, [consumerItemForView]);

  useEffect(() => {
    if (consumerItemForView !== null) {
      console.log(
        "detailsssssssssss",
        details?.wards,
        consumerItemForView?.ward_no
      );
      setConsumerNo(consumerItemForView?.consumer_no);
      let wardNo = details?.wards?.filter(
        (ward) => Number(ward.ward_name) === consumerItemForView?.ward_no
      );
      console.log("wardNo", wardNo?.[0]?.id);
      setwardId(wardNo?.[0]?.id);
    }
  }, [details, consumerItemForView]);

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
    console.log("fetchedYears", fetchedYears);

    function getUnique(array) {
      var uniqueArray = [...new Set(array)].sort();
      return uniqueArray;
    }

    Object.keys(consumerDetails).forEach((formId) => {
      var uniqueNames = getUnique(fetchedYears[formId] || []);
      // console.log(uniqueNames);
      let finalYear = uniqueNames[0]?.split("-")[0];
      // console.log(selectedYear[formId], finalYear, "finalYear");

      if (selectedYear[formId] < finalYear) {
        setSelectedYearRange((prevState) => ({
          ...prevState,
          [formId]: uniqueNames[0],
        }));
      } else {
        let flag = false,
          arr = [];
        uniqueNames?.map((uniqueNames, index) => {
          let uniYear = uniqueNames?.split("-")[0];
          arr.push(uniYear);
          if (uniYear === selectedYear[formId]) {
            //console.log(selectedYear[formId], uniYear, "same");
            flag = true;
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
        });

        if (flag === false) {
          console.log(arr, "arr");
          uniqueNames.push(selectedYear[formId]);
          uniqueNames.sort();
          // console.log(uniqueNames,"arr sorted")
          let index = uniqueNames.indexOf(selectedYear[formId]);
          // console.log(uniqueNames[index-1],"tt")

          setSelectedYearRange((prevState) => ({
            ...prevState,
            [formId]: uniqueNames[index - 1],
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
    Object.keys(consumerDetails).forEach((formId) => {
      const formDetails = consumerDetails[formId];

      console.log("formDetails", formDetails);

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
          console.log("matchingCategory", matchingCategory);
          const matchingRange = matchingCategory.consumerRangeType.find(
            (range) =>
              range.id === formDetails.consumer_range_mstr_id &&
              range.dateOfEffect === selectedYearRange[formId]
          );
          console.log("allMonthAmount[formId]", allMonthAmount[formId]);
          setConsumerDate(selectedYearRange[formId]);
          if (matchingRange && monthlyAmountSet === false) {
            console.log("I am here");
            console.log(matchingRange);
            console.log(monthAmount);
            setAllMonthAmount((prevState) => ({
              ...prevState,
              [formId]: {
                ...prevState[formId],
                amt: matchingRange.rate,
              },
            }));
            setConsumerDetails((prevState) => ({
              ...prevState,
              [formId]: {
                ...prevState[formId],
                consumer_rate_mstr_id: matchingRange.consumer_cat_mstr_id,
                rate_chart_id: matchingRange.rateId,
              },
            }));
            setMonthAmount(matchingRange.rate);
            setConsumerAmount(matchingRange.rate);
            setMonthlyAmountSet(true);
            setValidData(false);
          }
        }
      }
    });
  }, [selectedMonth]);

  useEffect(() => {
    console.log(monthAmount, "monthAmount");
  }, [monthAmount]);

  const clearState = () => {
    setConsumerDetails((prevState) => {
      const clearedState = {};
      Object.keys(prevState).forEach((formId) => {
        clearedState[formId] = {
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
          mobile_no: "",
          month: 0,
          police_station: "",
          rate_chart_id: 0,
          relation: "",
          ward_id: "",
          ward_no: 0,
        };
      });
      return clearedState;
    });
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

  const handleUpdate = (e, index, detail) => {
    console.log(e, index, detail, "b4 update");
    sessionStorage.setItem("dataKey", index);
    console.log("handleupdate", detail);
    setFlag("update");
    setconsumerRateId(detail?.consumerRateId);
    setShowModalCurrent(true);

    const trElement = document.querySelector(`tr[data-key="${index}"]`);
    // if (trElement) {
    const dateElement = trElement.querySelector("td:nth-child(6)");
    console.log("dataElement: " + dateElement.innerHTML);
    // }

    setSelectedCategory(areaDetail[index].consumer_category);

    setSelectedRange(areaDetail[index].consumer_range);
    setMonthAmount(areaDetail[index].amount);
    setSelectedMonth(0);
    setSelectedYear("");
    setSelectedMonth(0);
    setSelectedYear("");
    setConsumerDetails({
      1: {
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
        mobile_no: "",
        month: 0,
        police_station: "",
        rate_chart_id: 0,
        relation: "",
        ward_id: "",
        ward_no: 0,
      },
    });

    setTimeout(() => {
      const categoryElement = document.getElementById("consumer_category11");
      const rangeElement = document.getElementById("consumer_range11");
      const yearElement = document.getElementById("consumer_year_of_effect11");
      const monthElement = document.getElementById(
        "consumer_month_of_effect11"
      );

      if (categoryElement) {
        categoryElement.innerHTML = areaDetail[index].consumer_category;
        console.log("areaDetail", areaDetail);
        const selectedCategory = details?.categories?.find(
          (category) =>
            category.category_name === areaDetail[index].consumer_category
        );
        setConsumerCategory(areaDetail[index].consumer_category);
        if (selectedCategory) {
          console.log("selectedCategory", selectedCategory);
          categoryElement.innerHTML = selectedCategory.category_name;
          setConsumerDetails((prevState) => ({
            ...prevState,
            [1]: {
              ...prevState[1],
              consumer_cat_mstr_id: selectedCategory.id,
            },
          }));
          setConsumerRangeDrop((prevRangeDrop) => ({
            ...prevRangeDrop,
            [1]: selectedCategory.consumerRangeType,
          }));
        }
        if (rangeElement) {
          let ranges = selectedCategory.consumerRangeType;
          console.log("ranges", ranges);
          rangeElement.innerHTML = areaDetail[index].consumer_range;
          const selectedRange = ranges?.find(
            (range) => range.range_name === areaDetail[index].consumer_range
          );
          setConsumerRange(areaDetail[index].consumer_range);
          if (selectedRange) {
            console.log("selectedRange", selectedRange);
            rangeElement.innerHTML = selectedRange.range_name;
            setConsumerDetails((prevState) => ({
              ...prevState,
              [1]: {
                ...prevState[1],
                consumer_range_mstr_id: selectedRange.id,
              },
            }));
          }
          if (yearElement) {
            const yearValue = areaDetail[index].doe.split("-")[0];
            const yearRange = `${yearValue}-${parseInt(yearValue) + 1}`;
            yearElement.innerHTML = yearRange;
            setSelectedYearInput(yearValue);

            console.log("fetching Year", fetchedYears);

            // Calculate other details based on the selected values
            const matchingCategory = details?.categories?.find(
              (category) => category.id === selectedCategory.id
            );

            if (matchingCategory) {
              console.log("matchingCategory", matchingCategory);
              const matchingRange = matchingCategory.consumerRangeType.find(
                (range) =>
                  range.id === selectedRange.id &&
                  range.dateOfEffect === dateElement.innerHTML
              );

              if (matchingRange) {
                console.log("matchingRange", matchingRange);
                setRateId(matchingRange.rateId);
                const finalYear = parseInt(
                  matchingRange?.dateOfEffect?.split("-")[0]
                );
                console.log("finalYear", finalYear);
                setSelectedYearRange((prevState) => ({
                  ...prevState,
                  1: `${finalYear}-${finalYear + 1}`,
                }));
                yearElement.innerHTML = `${finalYear}-${
                  parseInt(finalYear) + 1
                }`;
                setSelectedYearInput(`${finalYear}-${finalYear + 1}`);

                console.log(details?.dateOfEffect);
                setConsumerDate(details?.dateOfEffect);
                const selectedRangeYear = details?.dateOfEffect?.find(
                  (item) => item.fy_name === `${finalYear}-${finalYear + 1}`
                );
                console.log("selectedRangeyeaaaaaaaaar", selectedRangeYear);

                setConsumerDetails((prevState) => ({
                  ...prevState,
                  1: {
                    ...prevState[1],
                    financial_year: selectedRangeYear?.fy_name,
                    financial_year_id: selectedRangeYear?.id,
                  },
                }));

                setAllMonthAmount((prevState) => ({
                  ...prevState,
                  1: {
                    amt: matchingRange.rate,
                  },
                }));

                setConsumerDetails((prevState) => ({
                  ...prevState,
                  1: {
                    ...prevState[1],
                    consumer_rate_mstr_id: matchingRange.consumer_cat_mstr_id,
                    rate_chart_id: matchingRange.rateId,
                  },
                }));

                setMonthAmount(matchingRange.rate);
                setConsumerAmount(matchingRange.rate);
              }
            }
          }

          if (monthElement) {
            const monthValue = areaDetail[index].doe.split("-")[1];
            const monthName = getMonthName(parseInt(monthValue));
            monthElement.innerHTML = monthName;
            setSelectedMonthInput(`month_${monthValue}`);

            // Set the month value in consumerDetails
            setConsumerDetails((prevState) => ({
              ...prevState,
              1: {
                ...prevState[1],
                month: parseInt(monthValue),
              },
            }));
          }
        }
      }
    }, 0);

    const formId = 1; // Assuming only one form is used in the update scenario

    const updateFields = {
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
      mobile_no: "",
      month: 0,
      police_station: "",
      rate_chart_id: 0,
      relation: "",
      ward_id: "",
      ward_no: 0,
    };

    setConsumerDetails((prevState) => ({
      ...prevState,
      [formId]: {
        ...prevState[formId],
        ...updateFields,
      },
    }));

    // Call handleConsumerDetailsChange for each field to update consumerDetails
    Object.keys(updateFields).forEach((field) => {
      handleConsumerDetailsChange(
        { target: { id: field, value: areaDetail[index][field] } },
        formId
      );
    });
  };

  const addHandle = async (e) => {
    console.log("clicked add", wardId);
    setLoading(true);
    try {
      const Url = `${SUDA_API_BASE_URL}/user/userCharges/CategoryEntry`;
      const responseData = {
        consumerRateId: consumerDetailsCurrent[0]?.consumer_mstr_id,
        consumer_category: consumerCategory,
        consumer_range: consumerRange,
        noof_sqft_truck_room: areaDetail[0]?.noof_sqft_truck_room,
        doe: consumerDate,
        amount: consumerAmount,
      };
      const convertedData = {
        consumer_details_id: consumerDetailsCurrent[0]?.consumer_mstr_id,
        consumer_cat_mstr_id: consumerDetails[1].consumer_cat_mstr_id,
        consumer_range_mstr_id: consumerDetails[1].consumer_range_mstr_id,
        consumer_rate_mstr_id: consumerDetails[1].consumer_rate_mstr_id,
        rate_chart_id: consumerDetails[1].rate_chart_id,
        financial_year: consumerDetails[1].financial_year,
        financial_year_id: consumerDetails[1].financial_year_id,
        month: consumerDetails[1].month,
        // ward_id: consumerItemForView?.ward_id,
        ward_id: wardId,
        created_byid: parseInt(getCookieByName(SUDA_USER_ID)),
        monthlyAmount: monthAmount,
        noOfRoomTable: areaDetail[0]?.noof_sqft_truck_room,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
        },
        body: JSON.stringify(convertedData),
      };

      await fetch(Url, requestOptions).then(() => {
        console.log("successful");
        setIsConsumerCreationInSuccessful(true);
        setLoading(false);
        setValidData(true);
        setAreaDetail((prevAreaDetail) => [...prevAreaDetail, responseData]);
        console.log(areaDetail, responseData);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      // toast.error(err, {
      //   position: toast.POSITION.TOP_CENTER
      //   });
    } finally {
    }
    setShowModalCurrent(false);
  };

  const UpdateHandle = async (e) => {
    setLoading(true);
    console.log("update clicked", consumerDetails[1], consumerDetails);

    try {
      // const Url = `${SUDA_API_BASE_URL}/user/userCharges/consumerRateDetailsUpdateById?rateDetailsId=${consumerDetailsCurrent[0]?.consumer_mstr_id}`;
      const Url = `${SUDA_API_BASE_URL}/user/userCharges/consumerRateDetailsUpdateById?rateDetailsId=${consumerRateId}&consumerNo=${consumerNo}&chartId=${areaDetail[0].old_rate_chart_id}`;
      const convertedData = {
        consumer_cat_mstr_id: consumerDetails[1].consumer_cat_mstr_id,
        consumer_range_mstr_id: consumerDetails[1].consumer_range_mstr_id,
        consumer_rate_mstr_id: consumerDetails[1].consumer_rate_mstr_id,
        rate_chart_id: consumerDetails[1].rate_chart_id,
        financial_year: consumerDetails[1].financial_year,
        financial_year_id: consumerDetails[1].financial_year_id,
        month: consumerDetails[1].month,
        // "ward_id": consumerItemForView?.ward_id,
        ward_id: wardId,
        created_byid: parseInt(getCookieByName(SUDA_USER_ID)),
      };
      console.log(convertedData);
      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
        },
        body: JSON.stringify(convertedData),
      };

      // await fetch(Url, requestOptions);
      let response = null,
        responseBody = null;
      response = await fetch(Url, requestOptions);
      responseBody = await response.json();
      console.log("receipt in main form", response, responseBody);
      if (response?.status == "200" && responseBody === "OK") {
        console.log("successful");
        setIsConsumerUpdationInSuccessful(true);
        setLoading(false);
        setValidData(true);
        let dataKey = sessionStorage.getItem("dataKey");
        const trElement = document.querySelector(`tr[data-key="${dataKey}"]`);
        console.log(trElement);
        const dateElement = trElement.querySelector("td:nth-child(6)");
        const categoryElement = trElement.querySelector("td:nth-child(2)");
        const rangeElement = trElement.querySelector("td:nth-child(3)");
        const amountElement = trElement.querySelector("td:nth-child(5)");
        console.log("dateElement.innerHTML", dateElement.innerHTML);

        dateElement.innerHTML = consumerDate;
        categoryElement.innerHTML = consumerCategory;
        rangeElement.innerHTML = consumerRange;
        amountElement.innerHTML = consumerAmount;
      }
    } catch (err) {
      console.log(err);
      // toast.error(err, {
      //   position: toast.POSITION.TOP_CENTER
      //   });
    } finally {
    }
    setShowModalCurrent(false);
  };

  const handleAddForm = (e) => {
    e.preventDefault();
    setFlag("add");
    setShowModalCurrent(true);
    setConsumerDetails({
      1: {
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
        mobile_no: "",
        month: 0,
        police_station: "",
        rate_chart_id: 0,
        relation: "",
        ward_id: "",
        ward_no: 0,
      },
    });
    setSelectedCategory("");
    setSelectedRange("");
    setSelectedYearInput("");
    setSelectedMonthInput("");
    setMonthAmount(0);
    setAllMonthAmount({});
    document.getElementById("consumer_category11").innerHTML = "";
    document.getElementById("consumer_range11").innerHTML = "";
    document.getElementById("consumer_year_of_effect11").innerHTML = "";
    document.getElementById("consumer_month_of_effect11").innerHTML = "";
  };

  const handleConsumerDetailsChange = (event, formId) => {
    setAllMonthAmount((prevState) => ({
      ...prevState,
      [1]: {
        ...prevState[1],
        amt: 0,
      },
    }));
    if (!consumerDetails[formId]) {
      setConsumerDetails({
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
          mobile_no: "",
          month: 0,
          police_station: "",
          rate_chart_id: 0,
          relation: "",
          ward_id: "",
          ward_no: 0,
        },
      });
    }
    const eventId = event?.target?.id;
    const eventVal = event?.target?.value;
    const eventStr = event + "";

    if (eventId) {
      setConsumerDetails((prevState) => {
        return {
          [formId]: {
            ...prevState[formId],
            [eventId]: eventVal,
          },
        };
      });
    } else if (eventStr.includes("ward")) {
      const item = JSON.parse(event);
      setConsumerDetails((prevState) => {
        return {
          [formId]: {
            ...prevState[formId],
            ward_id: item.value,
          },
        };
      });
      console.log(item);
    } else if (eventStr.includes("category_name")) {
      const item = JSON.parse(event);
      // setMonthAmount('')
      setSelectedCustomercategory((prevSelectedCategories) => [
        ...prevSelectedCategories,
        item,
      ]);

      //   var consumerCategoryId = "consumer_category" + formId;
      //   document.getElementById(consumerCategoryId).innerHTML =
      //       item.category_name;
      setConsumerDetails((prevState) => {
        return {
          [formId]: {
            ...prevState[formId],
            consumer_cat_mstr_id: item.id,
            //consumer_range_mstr_id: ''
          },
        };
      });
      setConsumerRangeDrop((prevRangeDrop) => ({
        ...prevRangeDrop,
        [formId]: item.consumerRangeType,
      }));
      document.getElementById("consumer_category11").innerHTML =
        item.category_name;
      setConsumerCategory(item.category_name);
      console.log("consumerRange", consumerRangeDrop[formId]);
    } else if (eventStr.includes("range_name")) {
      const item = JSON.parse(event);
      setConsumerDetails((prevState) => {
        return {
          [formId]: { ...prevState[formId], consumer_range_mstr_id: item.id },
        };
      });
      document.getElementById("consumer_range11").innerHTML = item.range_name;
      setConsumerRange(item.range_name);
    } else if (eventStr.includes("fy_name")) {
      setMonthlyAmountSet(false);
      const item = JSON.parse(event);
      setConsumerDetails((prevState) => {
        return {
          [formId]: {
            ...prevState[formId],
            financial_year: item.fy_name,
            financial_year_id: item.id,
          },
        };
      });
      document.getElementById("consumer_year_of_effect11").innerHTML =
        item.fy_name;
    } else if (eventStr.includes("month")) {
      setMonthlyAmountSet(false);
      setConsumerDetails((prevState) => {
        return {
          [formId]: {
            ...prevState[formId],
            month: parseInt(eventStr.split("_")[1]),
          },
        };
      });
      document.getElementById("consumer_month_of_effect11").innerHTML =
        getMonthName(parseInt(eventStr.split("_")[1]));
    } else if (eventStr.includes("relation")) {
      setConsumerDetails((prevState) => {
        return {
          [formId]: { ...prevState[formId], relation: eventStr.split("_")[1] },
        };
      });
    }
  };

  const renderForm = (formId) => {
    // console.log(details.categories)
    // console.log(selectedCustomercategory)

    const selectedCategoryId = consumerDetails[formId]?.consumer_cat_mstr_id;
    const consumerRangeDropdownValue = consumerRangeDrop[formId];
    unique2 = consumerRangeDropdownValue?.filter((obj, index) => {
      return (
        index ===
        consumerRangeDropdownValue?.findIndex(
          (o) => obj.id === o.id && obj.range_name === o.range_name
        )
      );
    });

    return (
      <div className="flex flex-row justify-between py-5" id={`area-detail11`}>
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
                  id={`consumer_category11`}
                  value={selectedCategory}
                  label="select"
                  className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
                >
                  {details?.categories?.length > 0 ? (
                    details?.categories?.map((item) => {
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
                  id={`consumer_range11`}
                  label="select"
                  value={selectedRange}
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
                  id={`consumer_year_of_effect11`}
                  label="Select Year"
                  value={selectedYearInput}
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
                  id={`consumer_month_of_effect11`}
                  label="Select Month"
                  value={selectedMonthInput}
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
        {flag === "add" ? (
          <>
            {loading ? (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                colors={["#2fa158", "#2fa158", "#2fa158", "#2fa158", "#2fa158"]}
              />
            ) : (
              <button
                disabled={validData}
                className="m-8 mb-2 h-8 transform  rounded-md bg-blue-400 px-4 py-1
              tracking-wide text-white transition-colors duration-200 hover:bg-blue-700 focus:bg-blue-400
              focus:outline-none"
                onClick={addHandle}
              >
                Add
              </button>
            )}
          </>
        ) : (
          <>
            {loading ? (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                colors={["#2fa158", "#2fa158", "#2fa158", "#2fa158", "#2fa158"]}
              />
            ) : (
              <button
                id="update-btn"
                className="m-8 mb-2 h-8 transform  rounded-md bg-blue-400 px-4 py-1
              tracking-wide text-white transition-colors duration-200 hover:bg-blue-700 focus:bg-blue-400
              focus:outline-none"
                onClick={UpdateHandle}
              >
                Update
              </button>
            )}
          </>
        )}
      </div>
    );
  };

  return showModal == true ? (
    <div>
      <ViewConsumerDetails
        consumerDetails={consumerDetailsCurrent}
        isConsumerDetailsLoading={isConsumerDetailsLoading}
        isConsumerDetailsLoaded={isConsumerDetailsLoaded}
      />

      {consumerItemForView !== null ? (
        <>
          <div className="m-4 rounded-none border border-gray-500 bg-white px-0  pb-4 pt-0 lg:max-w-full">
            <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
              <h2 className="text-center text-sm font-semibold text-white">
                Consumer Rate Details
              </h2>
            </nav>
            <div className="m-5">
              <div className="mb-1 flex flex-col">
                <div className="overflow-x-auto">
                  <div className="inline-block p-2.5 align-middle lg:w-full">
                    <div className="overflow-hidden">
                      <table className="min-w-full">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="border border-gray-300 px-6 py-2 text-center  text-xs font-bold uppercase text-gray-700"
                            >
                              Action
                            </th>
                            <th
                              scope="col"
                              className="border border-gray-300 px-6 py-2 text-center  text-xs font-bold uppercase text-gray-700"
                            >
                              Consumer Category
                            </th>
                            <th
                              scope="col"
                              className="border border-gray-300 px-6 py-2 text-center  text-xs font-bold uppercase text-gray-700"
                            >
                              Consumer Range
                            </th>
                            <th
                              scope="col"
                              className="border border-gray-300 px-6 py-2 text-center  text-xs font-bold uppercase text-gray-700 "
                            >
                              No. of House
                            </th>
                            <th
                              scope="col"
                              className="border border-gray-300 px-6 py-2 text-center  text-xs font-bold  uppercase text-gray-700"
                            >
                              Amount
                            </th>
                            <th
                              scope="col"
                              className="border border-gray-300 px-6 py-2 text-center  text-xs font-bold uppercase text-gray-700 "
                            >
                              Date of Effect
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {areaDetail &&
                            areaDetail.map((detail, index) => (
                              <tr
                                key={index}
                                data-key={index}
                                className="hover:bg-gray-50 dark:hover:bg-gray-600"
                              >
                                <th
                                  scope="col"
                                  className="border border-gray-300 text-sm"
                                >
                                  <button
                                    type="submit"
                                    className="mx-4 mb-2 mt-2 transform cursor-pointer rounded-md bg-green-400 px-4 py-1 tracking-wide text-white transition-colors duration-200 hover:bg-green-700 focus:bg-green-400 focus:outline-none"
                                    onClick={(e) =>
                                      handleUpdate(e, index, detail)
                                    }
                                  >
                                    Update
                                  </button>
                                </th>
                                <td className="whitespace-nowrap border border-gray-300 px-6 py-2 text-center text-xs font-medium text-gray-700">
                                  {detail.consumer_category}
                                </td>
                                <td className="whitespace-nowrap border border-gray-300 px-6 py-2 text-center text-xs font-medium text-gray-700">
                                  {detail.consumer_range}
                                </td>
                                <td className="whitespace-nowrap border border-gray-300 px-6 py-2 text-center text-xs font-medium text-gray-700">
                                  {detail.noof_sqft_truck_room}
                                </td>
                                <td className="whitespace-nowrap border border-gray-300 px-6 py-2 text-center text-xs font-medium text-gray-700">
                                  {detail.amount}
                                </td>
                                <td className="whitespace-nowrap border border-gray-300 px-6 py-2 text-center text-xs font-medium text-gray-700">
                                  {detail.doe.split("T")[0]}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                className=" mb-2 h-8 transform  rounded-md bg-blue-400 px-4 py-1
                    tracking-wide text-white transition-colors duration-200 hover:bg-blue-700 focus:bg-blue-400
                    focus:outline-none"
                onClick={handleAddForm}
              >
                Add New Consumer Category
              </button>
            </div>
          </div>
        </>
      ) : (
        <ColorRing
          visible={true}
          height="40"
          width="40"
          colors={["#2fa158", "#2fa158", "#2fa158", "#2fa158", "#2fa158"]}
        />
      )}

      {showModalCurrent && (
        <div className="m-4 mt-4 rounded-none border border-gray-500 bg-white  px-0 pb-4 pt-0 lg:max-w-full">
          <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
            <h2 className="text-center text-sm font-semibold text-white">
              Category Details
            </h2>
          </nav>
          {renderForm(1)}
          <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex ">
            <div className="mb-6 ml-3 mt-2 min-w-fit max-w-fit gap-4">
              <label
                className="mb-2 block text-xs font-bold text-gray-700"
                htmlFor="password"
              >
                Monthly Amount : {monthAmount}
              </label>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-0 mb-10 flex min-w-full flex-col items-center px-10 py-2">
        <div className="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
          <button
            onClick={() => switchOnPrevModalNOffCurrModal(currModal, prevModal)}
            className="mx-4 mb-2 h-8 w-36 transform rounded-md bg-green-400 px-4 py-1 tracking-wide text-white transition-colors duration-200 hover:bg-green-700 focus:bg-green-400 focus:outline-none"
          >
            Back
          </button>
        </div>
      </div>
      {isConsumerUpdationInSuccessful && (
        <FloatingMessage
          message={`Consumer has been updated successfully`}
          showMessage={true}
          closeFloatingMessage={closeFloatingMessage}
          color={`green`}
        />
      )}
      {isConsumerUpdationInFailed && (
        <FloatingMessage
          message={`Something went wrong while updating consumer`}
          showMessage={true}
          closeFloatingMessage={closeFloatingMessage}
          color={`red`}
        />
      )}
      {isConsumerCreationInSuccessful && (
        <FloatingMessage
          message={`Consumer has been created successfully`}
          showMessage={true}
          closeFloatingMessage={closeFloatingMessage}
          color={`green`}
        />
      )}
      {isConsumerCreationInFailed && (
        <FloatingMessage
          message={`Something went wrong while creating consumer`}
          showMessage={true}
          closeFloatingMessage={closeFloatingMessage}
          color={`red`}
        />
      )}
    </div>
  ) : null;
}

export default ViewUserUpdateConsumer;
