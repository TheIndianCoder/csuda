import React, { Component, useEffect, useState } from "react";
import {
  Select,
  Option,
  Button,
  Textarea,
  Checkbox,
  Tooltip,
  Switch,
} from "@material-tailwind/react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import CustomBackButton from "@/formPages/PropertyOrHoldingTaxForms/saf_form_for_new_property/customBackButton";
import { districtData } from "@/Dashboard/data/district-list";
import {
  safInputValidatorMsgList,
  safInputStateToValidatorMapping,
} from "@/Dashboard/data/saf-input-validator-list";
import { getCookieByName } from "@/utils/RequireAuth";
import {
  isBlankString,
  isObjectFullyEmpty,
  isStringValid,
  validateSAFReassessmentForm,
} from "@/utils/formValidatorUtils";
import FloatingMessage from "@/utils/floatingMessage";
import { ColorRing } from "react-loader-spinner";
import {
  InfoMessageCustom,
  NotFoundErrorMessageCustom,
} from "@/utils/commonComponents";
import { SUPER } from "@/utils/appConstants";

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL;
let floorStack = [];
let finalReqObjForSafNewEntry = {};
export function SafReassessmentEdit(props) {
  const {
    showSAFNewFormModal,
    nextModal,
    currModal,
    switchOnPrevModalNOffCurrModal,
    prevModal,
    setPropertyId,
    propId,
    propertyNo,
    setPropertyNo,
  } = props;
  console.log("prop id == " + propId);
  console.log("prop no == " + propertyNo);
  const currUrl = window.location.href.toLowerCase();
  const isPublicSAF = currUrl.includes("dashboard") ? false : true;
  const [safNewFormAllInputFromAPI, setSafNewFormAllInputFromAPI] = useState({
    zone: [],
    ward: [],
    floor: [],
    building_type: [],
    property_type: [],
    occupation_type: [],
    uses_type: [],
    roadType: [],
    entry_type: [],
    financial_year: [],
  });
  const [isSAFAllInputFromAPILoaded, setIsSAFAllInputFromAPILoaded] =
    useState(null);
  const [safNewFormValidator, setSAFNewFormValidator] = useState({
    // isPropIdValid: null, isZoneValid: null, isEntryTypeValid: null, isBuildingConstPeriodFromValid: null,
    //isBuildingConstPeriodToValid: null, isFloorDetailsValid: null, isOtherDetailsValid: null,
    isWardValid: null,
    isOwnerHonorificValid: null,
    isOwnerNameValid: null,
    isOwnerGenderValid: null,
    isOwnerGuardianNameValid: null,
    isOwnerRelationValid: null,
    isOwnerMobileNumValid: null,

    isOwnerAadharValid: null,
    isOwnerEmailValid: null,
    isOwnerPanValid: null,
    isPlotNumValid: null,
    isKhataNumValid: null,
    isPropAddressValid: null,
    isFloorDetailsValid: null,
    isPropDistrictValid: null,

    isPropPinValid: null,
    isPropMohallaValid: null,

    isPropCityValid: null,
    isPropertyTypeValid: null,
    isRoadTypeValid: null,
    isAnyFloorDetailsValueEmpty: null,
    isAnyFloorContainsDuplicateFloor: null,
  });
  const [isSAFFormValid, setIsSAFFormValid] = useState(null);
  const [showFloatingMessage, setShowFloatingMessage] = useState(null);
  //=====================================================================
  /**
   * SAF new form owner property address details
   */
  const [isCorrAddressSelected, setIsCorrAddressSelected] = useState(false);
  const handleCorrAddressCheckboxChange = (event) => {
    // console.log("checkbox==========")
    console.log(event.target.value);
    setIsCorrAddressSelected(!isCorrAddressSelected);
  };
  //==========================================================================
  /**
   * SAF Reassessment property and owner details change
   */
  const [safReassessmentData, setSAFReassessmentData] = useState(null);
  const [
    isSAFReassessDataMappedWithExistingData,
    setIsSAFReassessDataMappedWithExistingData,
  ] = useState(null);
  const handleSAFReassessmentDetailsChange = (event) => {
    console.log("handleSAFReassessmentDetailsChange");
    // console.log(safReassessmentData)
    // console.log(event)
    if (event?.target?.id) {
      const eventId = event.target.id;
      if (eventId.includes("road")) {
        setSAFReassessmentData((prevState) => {
          return {
            ...prevState,
            road_type_id:
              prevState.road_type_id == 2 ? parseInt(eventId.split("-")[1]) : 2,
          };
        });
      } else if (eventId.includes("rain")) {
        setSAFReassessmentData((prevState) => {
          return {
            ...prevState,
            rain_harvest: prevState.rain_harvest == "Yes" ? "No" : "Yes",
          };
        });
      } else if (eventId.includes("widow")) {
        setSAFReassessmentData((prevState) => {
          return {
            ...prevState,
            is_widow: prevState.is_widow == "Yes" ? "No" : "Yes",
          };
        });
      } else if (eventId.includes("handicapped")) {
        setSAFReassessmentData((prevState) => {
          return {
            ...prevState,
            is_handicapped: prevState.is_handicapped == "Yes" ? "No" : "Yes",
          };
        });
      } else if (eventId.includes("isdp")) {
        setSAFReassessmentData((prevState) => {
          return {
            ...prevState,
            is_isdp: prevState.is_isdp == "Yes" ? "No" : "Yes",
          };
        });
      } else if (eventId.includes("school")) {
        setSAFReassessmentData((prevState) => {
          return {
            ...prevState,
            is_school: prevState.is_school == "Yes" ? "No" : "Yes",
          };
        });
      } else if (eventId.includes("complex")) {
        setSAFReassessmentData((prevState) => {
          return {
            ...prevState,
            is_complex: prevState.is_complex == "Yes" ? "No" : "Yes",
          };
        });
      } else {
        setSAFReassessmentData((prevState) => {
          return {
            ...prevState,
            [eventId]: event.target.value,
          };
        });
      }
    }
  };
  /**
   * SAF new form floor details for capturing existing floor details
   */
  const [safNewFormPropertyFloorDetails, setSAFNewFormPropertyFloorDetails] =
    useState([
      {
        built_up_area: "",
        construction_type: "",
        floor_id: 0,
        floor_name: "",
        from_date: "",
        occup_type_id: 0,
        occupancy_type: "",
        to_date: "",
        usage_type_id: 0,
        uses_type_name: "",
        from_date_obj: "",
        to_date_obj:
          safNewFormAllInputFromAPI.financial_year[
            safNewFormAllInputFromAPI.financial_year.length - 1
          ]?.fy_name,
      },
    ]);

  useEffect(() => {
    console.log(
      "safNewFormPropertyFloorDetails onload",
      safNewFormPropertyFloorDetails
    );
  }, []);
  useEffect(() => {
    console.log(
      "safNewFormPropertyFloorDetails onload",
      safNewFormPropertyFloorDetails
    );
  }, [safNewFormPropertyFloorDetails]);
  /**
   * SAF new form floor details for capturing new floor details
   */
  const [
    safNewFormPropertyFloorDetailsNewAdd,
    setSAFNewFormPropertyFloorDetailsNewAdd,
  ] = useState([
    {
      built_up_area: "",
      construction_type: "",
      floor_id: 0,
      floor_name: "",
      from_date: "",
      occup_type_id: 0,
      occupancy_type: "",
      to_date: "",
      usage_type_id: 0,
      uses_type_name: "",
      from_date_obj: "",
      to_date_obj: "",
    },
  ]);
  const [
    safReassessmentStaticFloorDetails,
    setSafReassessmentStaticFloorDetails,
  ] = useState([]);

  // useEffect(() => {
  //     floorStack
  // }, [safReassessmentStaticFloorDetails])

  const [isSelectedFloorValid, setIsSelectedFloorValid] = useState(true);
  //Floor add or delete logic
  const handleFloorAddOrDelete = (addOrDelete, index) => {
    console.log(addOrDelete);
    if (addOrDelete == "ADD") {
      setSAFNewFormPropertyFloorDetailsNewAdd((prevState) => {
        return [
          ...prevState,
          {
            built_up_area: "",
            construction_type: "",
            floor_id: "",
            floor_name: "",
            from_date: "",
            occup_type_id: 0,
            occupancy_type: "",
            to_date: "",
            usage_type_id: 0,
            uses_type_name: "",
            from_date_obj: "",
            to_date_obj:
              safNewFormAllInputFromAPI.financial_year[
                safNewFormAllInputFromAPI.financial_year.length - 1
              ]?.fy_name,
          },
        ];
      });
    } else if (addOrDelete == "DELETE") {
      console.log(`original array before delete -`);
      console.log(safNewFormPropertyFloorDetailsNewAdd);
      let newFloorDetailsArr = safNewFormPropertyFloorDetailsNewAdd.map(
        (item) => item
      );
      newFloorDetailsArr.splice(index, 1);
      console.log("new saf floor array after delete");
      console.log(newFloorDetailsArr);
      setSAFNewFormPropertyFloorDetailsNewAdd(newFloorDetailsArr);
      floorStack = floorStack.filter(
        (floorItem) =>
          floorItem != safNewFormPropertyFloorDetailsNewAdd[index].floor_id
      );
    }
  };
  const handleSAFNewFormPropertyFloorDetailsChange = (
    event,
    index,
    field_name
  ) => {
    console.log("handle floor details change handleer-----");
    console.log("onChange triggered");
    console.log(safNewFormPropertyFloorDetails);
    // console.log(event)
    // console.log("handle select")
    if (event?.target?.id) {
      let newSingleFloorDetails = {
        ...safNewFormPropertyFloorDetails[index],
        [event.target.id]: event.target.value,
      };
      const newFloorDetailsArr = safNewFormPropertyFloorDetails.map(
        (item) => item
      );
      newFloorDetailsArr.splice(index, 1, newSingleFloorDetails);
      setSAFNewFormPropertyFloorDetails(newFloorDetailsArr);
    } else if (event.target.value.toString().includes("floor_name")) {
      event = JSON.parse(event.target.value);
      console.log("comparing===");
      console.log(event.id);
      console.log(floorStack);
      console.log(floorStack.includes(event.id));
      // if (!floorStack.includes(event.id)) {
      console.log("selected floor is valid");
      let newSingleFloorDetails = {
        ...safNewFormPropertyFloorDetails[index],
        floor_id: event.id,
        floor_name: event.floor_name,
      };
      const newFloorDetailsArr = safNewFormPropertyFloorDetails.map(
        (item) => item
      );
      newFloorDetailsArr.splice(index, 1, newSingleFloorDetails);
      setSAFNewFormPropertyFloorDetails(newFloorDetailsArr);
      floorStack.push(event.id);
      console.log("floorstack=========");
      console.log(floorStack);
      setIsSelectedFloorValid(true);
      // } else {
      //     console.log("selected floor is not valid")
      //     console.log(safNewFormPropertyFloorDetails)
      //     setIsSelectedFloorValid(false)
      // }
    } else if (event.target.value.toString().includes("occup_type")) {
      event = JSON.parse(event.target.value);
      let newSingleFloorDetails = {
        ...safNewFormPropertyFloorDetails[index],
        occup_type_id: event.id,
        occupancy_type: event.occup_type,
      };
      const newFloorDetailsArr = safNewFormPropertyFloorDetails.map(
        (item) => item
      );
      newFloorDetailsArr.splice(index, 1, newSingleFloorDetails);
      setSAFNewFormPropertyFloorDetails(newFloorDetailsArr);
    } else if (event.target.value.toString().includes("uses_type_name")) {
      event = JSON.parse(event.target.value);
      let newSingleFloorDetails = {
        ...safNewFormPropertyFloorDetails[index],
        usage_type_id: event.id,
        uses_type_name: event.uses_type_name,
      };
      const newFloorDetailsArr = safNewFormPropertyFloorDetails.map(
        (item) => item
      );
      newFloorDetailsArr.splice(index, 1, newSingleFloorDetails);
      setSAFNewFormPropertyFloorDetails(newFloorDetailsArr);
    } else if (event.target.value.toString().includes("const_type")) {
      event = JSON.parse(event.target.value);
      let newSingleFloorDetails = {
        ...safNewFormPropertyFloorDetails[index],
        construction_type: event.const_type,
      };
      const newFloorDetailsArr = safNewFormPropertyFloorDetails.map(
        (item) => item
      );
      newFloorDetailsArr.splice(index, 1, newSingleFloorDetails);
      setSAFNewFormPropertyFloorDetails(newFloorDetailsArr);
    } else if (event.target.value.toString().includes("fy_name")) {
      event = JSON.parse(event.target.value);
      console.log("event=" + field_name);
      console.log(event);
      let newSingleFloorDetails = {
        ...safNewFormPropertyFloorDetails[index],
        [field_name]: event.fy_name,
        [field_name.includes("from") ? `from_date_obj` : `to_date_obj`]: event,
      };
      const newFloorDetailsArr = safNewFormPropertyFloorDetails.map(
        (item) => item
      );
      newFloorDetailsArr.splice(index, 1, newSingleFloorDetails);
      setSAFNewFormPropertyFloorDetails(newFloorDetailsArr);
    }
    console.log("just before resetting validation==============");
    setSAFNewFormValidator((prevState) => {
      return {
        ...prevState,
        [safInputStateToValidatorMapping["floor_details"]]: null,
        [safInputStateToValidatorMapping["floor_details1"]]: null,
        [safInputStateToValidatorMapping["floor_details2"]]: null,
      };
    });
  };
  /**
   * Floor details changefor adding new floors
   */
  const handleSAFNewFormPropertyFloorDetailsChangeForNewAdd = (
    event,
    index,
    field_name
  ) => {
    console.log(
      safNewFormAllInputFromAPI.financial_year[
        safNewFormAllInputFromAPI.financial_year.length - 1
      ]?.fy_name
    );
    console.log(event);
    // console.log("debmalya", event?.target?.value?.fy_name);
    console.log("handle new floor details change handleer-----");
    console.log(safNewFormPropertyFloorDetailsNewAdd);
    // console.log(event)
    // console.log("handle select")
    if (event?.target?.id) {
      let newSingleFloorDetails = {
        ...safNewFormPropertyFloorDetailsNewAdd[index],
        [event.target.id]: event.target.value,
      };
      const newFloorDetailsArr = safNewFormPropertyFloorDetailsNewAdd.map(
        (item) => item
      );
      newFloorDetailsArr.splice(index, 1, newSingleFloorDetails);
      setSAFNewFormPropertyFloorDetailsNewAdd(newFloorDetailsArr);
    } else if (event.target.value.toString().includes("floor_name")) {
      event = JSON.parse(event.target.value);
      console.log("comparing===");
      console.log(event.id);
      console.log(floorStack);
      console.log(floorStack.includes(event.id));
      if (!floorStack.includes(event.id)) {
        console.log("selected floor is valid");
        let newSingleFloorDetails = {
          ...safNewFormPropertyFloorDetailsNewAdd[index],
          floor_id: event.id,
          floor_name: event.floor_name,
        };
        const newFloorDetailsArr = safNewFormPropertyFloorDetailsNewAdd.map(
          (item) => item
        );
        newFloorDetailsArr.splice(index, 1, newSingleFloorDetails);
        setSAFNewFormPropertyFloorDetailsNewAdd(newFloorDetailsArr);
        floorStack.push(event.id);
        console.log("floorstack=========");
        console.log(floorStack);
        setIsSelectedFloorValid(true);
      } else {
        console.log("selected floor is not valid");
        console.log(safNewFormPropertyFloorDetailsNewAdd);
        setIsSelectedFloorValid(false);
      }
    } else if (event.target.value.toString().includes("occup_type")) {
      event = JSON.parse(event.target.value);
      let newSingleFloorDetails = {
        ...safNewFormPropertyFloorDetailsNewAdd[index],
        occup_type_id: event.id,
        occupancy_type: event.occup_type,
      };
      const newFloorDetailsArr = safNewFormPropertyFloorDetailsNewAdd.map(
        (item) => item
      );
      newFloorDetailsArr.splice(index, 1, newSingleFloorDetails);
      setSAFNewFormPropertyFloorDetailsNewAdd(newFloorDetailsArr);
    } else if (event.target.value.toString().includes("uses_type_name")) {
      event = JSON.parse(event.target.value);
      let newSingleFloorDetails = {
        ...safNewFormPropertyFloorDetailsNewAdd[index],
        usage_type_id: event.id,
        uses_type_name: event.uses_type_name,
      };
      const newFloorDetailsArr = safNewFormPropertyFloorDetailsNewAdd.map(
        (item) => item
      );
      newFloorDetailsArr.splice(index, 1, newSingleFloorDetails);
      setSAFNewFormPropertyFloorDetailsNewAdd(newFloorDetailsArr);
    } else if (event.target.value.toString().includes("const_type")) {
      event = JSON.parse(event.target.value);
      let newSingleFloorDetails = {
        ...safNewFormPropertyFloorDetailsNewAdd[index],
        construction_type: event.const_type,
      };
      const newFloorDetailsArr = safNewFormPropertyFloorDetailsNewAdd.map(
        (item) => item
      );
      newFloorDetailsArr.splice(index, 1, newSingleFloorDetails);
      setSAFNewFormPropertyFloorDetailsNewAdd(newFloorDetailsArr);
    } else if (event.target.value.toString().includes("fy_name")) {
      event = JSON.parse(event.target.value);
      console.log("event=" + field_name);
      console.log(event);
      let newSingleFloorDetails = {
        ...safNewFormPropertyFloorDetailsNewAdd[index],
        [field_name]: event.fy_name,
        [field_name.includes("from") ? `from_date_obj` : `to_date_obj`]: event,
      };
      const newFloorDetailsArr = safNewFormPropertyFloorDetailsNewAdd.map(
        (item) => item
      );
      newFloorDetailsArr.splice(index, 1, newSingleFloorDetails);


      const lastFinancialYear =
        safNewFormAllInputFromAPI.financial_year[
          safNewFormAllInputFromAPI.financial_year.length - 1
        ];


const updatedFloorDetailsArr = newFloorDetailsArr.map((floorDetails) => {
  if (
    floorDetails.to_date.trim() === "" &&
    floorDetails.to_date_obj.trim() === ""
  ) {
    floorDetails.to_date = lastFinancialYear?.fy_name || "";
    floorDetails.to_date_obj = lastFinancialYear;
  }
  return floorDetails;
});
      console.log("Debmalya",updatedFloorDetailsArr);
      setSAFNewFormPropertyFloorDetailsNewAdd(updatedFloorDetailsArr);
    }
    console.log("just before resetting validation==============");
    setSAFNewFormValidator((prevState) => {
      return {
        ...prevState,
        [safInputStateToValidatorMapping["floor_details"]]: null,
        [safInputStateToValidatorMapping["floor_details1"]]: null,
        [safInputStateToValidatorMapping["floor_details2"]]: null,
      };
    });
  };
  //======================================================================
  /**
   * Handle SAF new form submission
   */
  const handleSAFNewFormValidation = async () => {
    console.log("floor details inside saf validation==================");
    console.log(safNewFormPropertyFloorDetails);
    setShowFloatingMessage(true);
    let totalBuiltUpArea = 0;
    // console.log(safNewFormBasicDetails)
    // console.log(safNewFormOwnerPersonalDetails)
    // console.log(safNewFormOwnerBuildingConstPeriod)
    // console.log(safNewFormOwnerPropertyDetails)
    // console.log(safNewFormOwnerPropertyAddress)
    // console.log(safNewFormPropertyTypeDetails)
    // console.log(safNewFormPropertyFloorDetails)
    // console.log(safNewFormOtherDetails)
    // let safNewFormPropertyFloorDetailsCopy = []
    // safNewFormPropertyFloorDetails.forEach(floorItem => {
    //     let newFloorItem = { ...floorItem }
    //     delete newFloorItem.from_date_obj
    //     delete newFloorItem.to_date_obj
    //     if (!isObjectFullyEmpty(newFloorItem)) {
    //         safNewFormPropertyFloorDetailsCopy.push(newFloorItem)
    //     }
    // })
    finalReqObjForSafNewEntry = {
      ...safReassessmentData,
      //sending existing floor details
      floor_details: safNewFormPropertyFloorDetails.map((floorItem) => {
        let newFloorItem = { ...floorItem };
        delete newFloorItem.from_date_obj;
        delete newFloorItem.to_date_obj;
        return newFloorItem;
      }),
      // floor_details: []
    };

    safNewFormPropertyFloorDetailsNewAdd.map((floorItem) => {
      let newFloorItem = { ...floorItem };
      const {
        built_up_area,
        construction_type,
        floor_id,
        floor_name,
        from_date,
        occup_type_id,
        occupancy_type,
        to_date,
        usage_type_id,
        uses_type_name,
      } = newFloorItem;

      if (
        !isBlankString(built_up_area) &&
        !isBlankString(construction_type) &&
        !isBlankString(floor_id) &&
        !isBlankString(floor_name) &&
        !isBlankString(from_date) &&
        !isBlankString(occup_type_id) &&
        !isBlankString(occupancy_type) &&
        !isBlankString(to_date) &&
        !isBlankString(usage_type_id) &&
        !isBlankString(uses_type_name)
      ) {
        delete newFloorItem.from_date_obj;
        delete newFloorItem.to_date_obj;
        finalReqObjForSafNewEntry.floor_details.push(newFloorItem);
      }
    });
    console.log("++++++++++++both floors++++++++++++++++++++++++++++++");
    console.log(finalReqObjForSafNewEntry.floor_details);
    console.log("+++++++++++++both floor details");

    safNewFormPropertyFloorDetails.forEach((floorItem) => {
      if (
        !isBlankString(floorItem.built_up_area) &&
        isStringValid(floorItem.built_up_area)
      ) {
        totalBuiltUpArea += parseFloat(floorItem.built_up_area);
      }
    });

    safNewFormPropertyFloorDetailsNewAdd.forEach((floorItem) => {
      if (
        !isBlankString(floorItem.built_up_area) &&
        isStringValid(floorItem.built_up_area)
      ) {
        totalBuiltUpArea += parseFloat(floorItem.built_up_area);
      }
    });
    finalReqObjForSafNewEntry.total_built_up_area = totalBuiltUpArea; //+ safReassessmentData.total_built_up_area
    finalReqObjForSafNewEntry.user_id = parseInt(
      getCookieByName("SUDA_USER_ID")
    );

    console.log("final request object===========================");
    console.log("finalReqObjForSafNewEntry", finalReqObjForSafNewEntry);

    //Form validation
    // validateSAFNewForm(finalReqObjForSafNewEntry, setSAFNewFormValidator)

    //SAF Re assessment form validation
    validateSAFReassessmentForm(
      finalReqObjForSafNewEntry,
      setSAFNewFormValidator
    );
  };

  const [
    isSAFReAssessmentSubmissionLoading,
    setIsSAFReAssessmentSubmissionLoading,
  ] = useState(null);
  const [
    isSAFReAssessmentSubmissionSuccess,
    setIsSAFReAssessmentSubmissionSuccess,
  ] = useState(null);
  const handleSAFReassessmentSubmission = async () => {
    console.log("Final Floor", finalReqObjForSafNewEntry);
    setIsSAFReAssessmentSubmissionSuccess(null);
    if (isSAFFormValid === true || isSAFFormValid === "validation_success") {
      setIsSAFReAssessmentSubmissionLoading(true);
      try {
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
          },
          body: JSON.stringify(finalReqObjForSafNewEntry),
        };

        const safNewEntryUrl = `${SUDA_API_BASE_URL}/user/SAFUpdate/${propId}`;
        let response = null;
        try {
          response = await fetch(safNewEntryUrl, requestOptions);
          // const responseBody = await response.json()
        } catch (err) {
          console.log("Unable to put re-assesment");
          setIsSAFFormValid(false);
        }

        console.log("woohooo");
        console.log(response);
        if (response?.status == "200") {
          setPropertyNo(propertyNo);
          switchOnPrevModalNOffCurrModal(currModal, nextModal);
          clearAllStateForSAFForm();
          finalReqObjForSafNewEntry = {};
        } else {
        }
      } catch (err) {
        setIsSAFReAssessmentSubmissionSuccess(false);
        console.log(err);
      } finally {
        setIsSAFReAssessmentSubmissionLoading(false);
      }
    } else {
      setIsSAFFormValid(false);
      finalReqObjForSafNewEntry = {};
    }
  };

  useEffect(() => {
    console.log("inside validator useeffect");
    console.log(safNewFormValidator);
    let isSafFormValidNew = true;
    for (const key in safNewFormValidator) {
      // console.log("inside for loop of validator========")
      // console.log(safNewFormValidator[key])
      isSafFormValidNew = safNewFormValidator[key];
      if (
        isSafFormValidNew == false ||
        isSafFormValidNew == null ||
        isSafFormValidNew == undefined
      ) {
        console.log("validation break");
        break;
      }
    }
    console.log(isSafFormValidNew);
    // making property document upload mandatory
    // isSafFormValidNew = isSafFormValidNew && isFloorImageUploaded ? true : false
    // if (safReassessmentData?.rain_harvest == 'Yes') {
    //     isSafFormValidNew = isSafFormValidNew && isRainWaterFileUploaded ? true : false
    // }

    console.log("is saf valid============start");
    console.log(safNewFormValidator);
    console.log(isSafFormValidNew);
    console.log("is saf valid =========== end");
    setIsSAFFormValid(isSafFormValidNew);
  }, [safNewFormValidator]);

  const closeFloatingMessage = () => {
    //setIsSAFFormValid("validation_success")
    setShowFloatingMessage(false);
  };

  const [ownerImageFile, setOwnerImageFile] = useState();
  const [isOwnerImageUploaded, setIsOwnerImageUploaded] = useState(null);
  const [floorImageFiles, setFloorImageFiles] = useState([]);
  const [isFloorImageUploaded, setIsFloorImageUploaded] = useState(null);
  const [rainWaterFile, setRainWaterFile] = useState();
  const [isRainWaterFileUploaded, setIsRainWaterFIleUploaded] = useState(null);
  const handleFileChange = (event) => {
    console.log(event?.target?.id);
    const eventId = event?.target?.id;
    if (!eventId.toString().includes("floor")) {
      console.log(event?.target?.files?.length);
      if (eventId?.toString().includes("owner")) {
        setOwnerImageFile(event.target.files[0]);
      } else if (eventId?.toString().includes("rain")) {
        setRainWaterFile(event.target.files[0]);
      }
    } else {
      let files = event.target.files;
      console.log(files.length);
      console.log(files);

      for (let i = 0; i < files.length; i++) {
        console.log("inside set floor files loop");
        console.log(files[i]);
        setFloorImageFiles((prevState) => {
          return [...prevState, files[i]];
        });
      }
    }
  };
  const uploadFile = async (event) => {
    console.log(
      "uploading file with fy_id=====" + safNewFormOtherDetails.fy_id
    );
    const userID = getCookieByName("SUDA_USER_ID");
    const fileUploadUrl = `${SUDA_API_BASE_URL}/user/SAFDocumentUpload?doc_mstr_id=103&fy_id=${safNewFormOtherDetails.fy_id}&prop_id=${safNewFormBasicDetails.prop_id}&user_id=${userID}`;

    const eventId = event?.target?.id.toString();
    let uploadTypeFlag = null;
    let formData = new FormData();
    console.log("upload id::" + event.target.id);
    if (eventId.includes("floor")) {
      uploadTypeFlag = "floor";
      console.log(floorImageFiles);
      floorImageFiles.forEach((item) => {
        formData.append("file", item);
      });
    } else if (eventId.includes("owner")) {
      uploadTypeFlag = "owner";
      formData.append("file", ownerImageFile);
    } else if (eventId.includes("rain")) {
      uploadTypeFlag = "rain";
      formData.append("file", rainWaterFile);
    }

    const requestOptions = {
      method: "POST",
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
        // 'Content-Length': `${ownerImageFile.size}`,
        // 'mode': 'no-cors',
      },
      body: formData,
    };

    let response = null;
    try {
      response = await fetch(fileUploadUrl, requestOptions);
    } catch (ex) {
      if (uploadTypeFlag == "floor") {
        setIsFloorImageUploaded(false);
      } else if (uploadTypeFlag == "owner") {
        setIsOwnerImageUploaded(false);
      } else if (uploadTypeFlag == "rain") {
        setIsRainWaterFIleUploaded(false);
      }
      console.log(ex);
    }
    let responseBody = null;
    try {
      responseBody = await response?.json();
    } catch (ex) {
      console.log(ex);
    }
    console.log("wooohooo file uploading.........");
    console.log(response);
    console.log(responseBody);
    if (response?.status == "200") {
      if (uploadTypeFlag == "floor") {
        setIsFloorImageUploaded(true);
      } else if (uploadTypeFlag == "owner") {
        setIsOwnerImageUploaded(true);
      } else if (uploadTypeFlag == "rain") {
        setIsRainWaterFIleUploaded(true);
      }
    } else {
      if (uploadTypeFlag == "floor") {
        setIsFloorImageUploaded(false);
      } else if (uploadTypeFlag == "owner") {
        setIsOwnerImageUploaded(false);
      } else if (uploadTypeFlag == "rain") {
        setIsRainWaterFIleUploaded(false);
      }
    }
  };

  const clearAllStateForSAFForm = () => {
    setSAFNewFormPropertyFloorDetails([
      {
        built_up_area: "",
        construction_type: "",
        floor_id: 0,
        floor_name: "",
        from_date: "",
        occup_type_id: 0,
        occupancy_type: "",
        to_date: "",
        usage_type_id: 0,
        uses_type_name: "",
        from_date_obj: "",
        to_date_obj: "",
      },
    ]);
    setSAFReassessmentData(null);
    setRainWaterFile(null);
    floorStack = [];
  };
  //======================================================================
  useEffect(() => {
    floorStack = [];
    let fetchSAFDropDownLists = async () => {
      const url = `${SUDA_API_BASE_URL}/SAFAllDropDownList`;
      const response = await fetch(url);
      const responseBody = await response.json();
      // console.log(responseBody)
      if (response.status == "200") {
        setSafNewFormAllInputFromAPI((prevState) => {
          return {
            ...prevState,
            ...responseBody,
          };
        });
      }
    };
    fetchSAFDropDownLists();
  }, []);

  useEffect(() => {
    console.log(safNewFormAllInputFromAPI, "safNewFormAllInputFromAPI");
  }, [safNewFormAllInputFromAPI]);
  useEffect(() => {
    setIsSAFAllInputFromAPILoaded(true);
  }, [safNewFormAllInputFromAPI]);

  //=============================================================================
  const [existingSAFData, setExistingSAFData] = useState(null);
  const [isExistingSAFDataLoaded, setIsExistingSAFDataLoaded] = useState(null);
  useEffect(() => {
    let fetchSAFPropertyDetailsForReassessment = async () => {
      const url = `${SUDA_API_BASE_URL}/getPropertyByPropNo?property_no=${propertyNo}`;
      let response = null,
        responseBody = null;
      try {
        response = await fetch(url);
        responseBody = await response.json();

        if (response?.status == "200") {
          setExistingSAFData(responseBody);
          setIsExistingSAFDataLoaded(true);
          // console.log("reassess============start")
          // console.log(responseBody)
          // console.log("reassess============end")
        } else {
          setIsExistingSAFDataLoaded(false);
        }
      } catch (err) {
        setIsExistingSAFDataLoaded(false);
      }
    };
    fetchSAFPropertyDetailsForReassessment();
  }, []);

  // const findObjectSelectByProcessingInputNExistingData = (param, key, srcObj) => {
  //     console.log(`findObjectSelectByProcessingInputNExistingData with params :: ${param}, ${key}, ${srcObj}`)
  //     let selectedObj = null;
  //     console.log(safNewFormAllInputFromAPI)
  //     console.log()
  //     safNewFormAllInputFromAPI[srcObj].every(item => {
  //         console.log(param?.toString().toLowerCase().trim() === item[key]?.toString().toLowerCase().trim(),
  //         param?.toString().toLowerCase().trim() ,item[key]?.toString().toLowerCase().trim()
  //             ,typeof(param?.toString().toLowerCase().trim()) , typeof(item[key]?.toString().toLowerCase().trim()),"conditionchecking ")
  //         if (param?.toString().toLowerCase().trim() === item[key]?.toString().toLowerCase().trim()) {
  //             selectedObj = item
  //             return false
  //         }
  //         return true
  //     })
  //     console.log(`just before returning selectedObj ::`)
  //     console.log(selectedObj,"selectedObj")
  //     return selectedObj
  // }

  // const mapFloorDetailsWithExistingData = (existingSAFData) => {
  //     console.log("before mapping",existingSAFData)
  //     const newFloorDetailsAfterMapping = existingSAFData?.safarvDetailsBean?.map(item => {
  //         const { built_up_area, construction_type, floor_name, fy_year_date, fy_end_date,
  //             occupancy_type, usage_type_id, } = item
  //         let uses_type_obj = null, occupation_type = null, floor_obj = null
  //         console.log("inside mapFloorDetailsWithExistingData-------------------------start")
  //         console.log(usage_type_id)
  //         console.log(floor_name)
  //         console.log(occupancy_type)
  //         console.log("inside mapFloorDetailsWithExistingData-------------------------end")
  //         uses_type_obj = findObjectSelectByProcessingInputNExistingData(usage_type_id, 'id', 'uses_type')
  //         floor_obj = findObjectSelectByProcessingInputNExistingData(floor_name, 'floor_name', 'floor')
  //         occupation_type = findObjectSelectByProcessingInputNExistingData(occupancy_type, 'occup_type', 'occupation_type')
  //         console.log("found match+++++++++++++++++++++++++++++++++++start")
  //         console.log(uses_type_obj)
  //         console.log(occupation_type)
  //         console.log(floor_obj,"floor_obj")
  //         console.log("found match+++++++++++++++++++++++++++++++++++end")
  //         // floorStack.push(floor_obj?.id)
  //         return {
  //             built_up_area: built_up_area,
  //             construction_type: construction_type,
  //             floor_id: floor_obj?.id, // not coming from api
  //             floor_name: (floor_name + "").toUpperCase().trim(),
  //             from_date: fy_year_date,
  //             occup_type_id: occupation_type?.id, // not coming from api
  //             occupancy_type: (occupancy_type + "").toUpperCase().trim(),
  //             to_date: fy_end_date,
  //             usage_type_id: usage_type_id,
  //             uses_type_name: uses_type_obj?.uses_type_name, // not coming from api
  //             from_date_obj: "DUMMY",
  //             to_date_obj: "DUMMY",
  //         }
  //     })
  //     console.log("after mapping", newFloorDetailsAfterMapping)
  //     return newFloorDetailsAfterMapping
  // }

  useEffect(() => {
    // const { propertyMasterBean, ownerDetailsBean[0]} = existingSAFData

    //added
    const findObjectSelectByProcessingInputNExistingData = (
      param,
      key,
      srcObj
    ) => {
      console.log(
        `findObjectSelectByProcessingInputNExistingData with params :: ${param}, ${key}, ${srcObj}`
      );
      let selectedObj = null;
      console.log(
        safNewFormAllInputFromAPI,
        "safNewFormAllInputFromAPI inside fun",
        srcObj
      );
      console.log(
        safNewFormAllInputFromAPI[srcObj],
        "safNewFormAllInputFromAPI[srcObj]"
      );
      safNewFormAllInputFromAPI[srcObj].map((item) => {
        console.log(
          param?.toString().toLowerCase().trim() ===
            item[key]?.toString().toLowerCase().trim(),
          param?.toString().toLowerCase().trim(),
          item[key]?.toString().toLowerCase().trim(),
          typeof param?.toString().toLowerCase().trim(),
          typeof item[key]?.toString().toLowerCase().trim(),
          "conditionchecking "
        );
        if (
          param?.toString().toLowerCase().trim() ===
          item[key]?.toString().toLowerCase().trim()
        ) {
          selectedObj = item;
          //  return false
        }
        //return true
      });
      console.log(`just before returning selectedObj ::`);
      console.log(selectedObj, "selectedObj");
      return selectedObj;
    };

    const mapFloorDetailsWithExistingData = (existingSAFData) => {
      console.log("before mapping", existingSAFData);
      const newFloorDetailsAfterMapping =
        existingSAFData?.safarvDetailsBean?.map((item) => {
          const {
            built_up_area,
            construction_type,
            floor_name,
            fy_year_date,
            fy_end_date,
            occupancy_type,
            usage_type_id,
          } = item;
          let uses_type_obj = null,
            occupation_type = null,
            floor_obj = null;
          console.log(
            "inside mapFloorDetailsWithExistingData-------------------------start"
          );
          console.log(usage_type_id);
          console.log(floor_name);
          console.log(occupancy_type);
          console.log(
            "inside mapFloorDetailsWithExistingData-------------------------end"
          );
          uses_type_obj = findObjectSelectByProcessingInputNExistingData(
            usage_type_id,
            "id",
            "uses_type"
          );
          floor_obj = findObjectSelectByProcessingInputNExistingData(
            floor_name,
            "floor_name",
            "floor"
          );
          occupation_type = findObjectSelectByProcessingInputNExistingData(
            occupancy_type,
            "occup_type",
            "occupation_type"
          );
          console.log("found match+++++++++++++++++++++++++++++++++++start");
          console.log(uses_type_obj);
          console.log(occupation_type);
          console.log(floor_obj, "floor_obj");
          console.log("found match+++++++++++++++++++++++++++++++++++end");
          // floorStack.push(floor_obj?.id)
          return {
            built_up_area: built_up_area,
            construction_type: construction_type,
            floor_id: floor_obj?.id, // not coming from api
            floor_name: (floor_name + "").toUpperCase().trim(),
            from_date: fy_year_date,
            occup_type_id: occupation_type?.id, // not coming from api
            occupancy_type: (occupancy_type + "").toUpperCase().trim(),
            to_date: fy_end_date,
            usage_type_id: usage_type_id,
            uses_type_name: uses_type_obj?.uses_type_name, // not coming from api
            from_date_obj: "DUMMY",
            to_date_obj: "DUMMY",
          };
        });
      console.log("after mapping", newFloorDetailsAfterMapping);
      return newFloorDetailsAfterMapping;
    };

    //added till here

    console.log("prop details............");
    console.log(existingSAFData);
    const newFloorDetails = mapFloorDetailsWithExistingData(existingSAFData);
    console.log("new floor details after mapping");
    console.log(newFloorDetails);
    console.log("details added");
    setSAFNewFormPropertyFloorDetails(newFloorDetails);

    //The below code is for static floor capturing only
    setSafReassessmentStaticFloorDetails(newFloorDetails);
    console.log(
      "first++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++start"
    );
    console.log(
      !isBlankString(existingSAFData?.ownerDetailsBean[0].aadhar_no) &&
        isStringValid(existingSAFData?.ownerDetailsBean[0].aadhar_no)
    );
    console.log(
      "first---------------------------------------------------------------------"
    );
    setSAFReassessmentData({
      aadhar:
        isBlankString(existingSAFData?.ownerDetailsBean[0].aadhar_no) &&
        isStringValid(existingSAFData?.ownerDetailsBean[0].aadhar_no)
          ? existingSAFData?.ownerDetailsBean[0].aadhar_no
          : "",
      area_id: existingSAFData?.propertyMasterBean[0].area_id,
      city:
        !isBlankString(existingSAFData?.propertyMasterBean[0].city) &&
        isStringValid(existingSAFData?.propertyMasterBean[0].city)
          ? existingSAFData?.propertyMasterBean[0].city
          : "",
      construction_date_from: "",
      construction_date_upto: "",
      current_financial_year: "",
      district: existingSAFData?.propertyMasterBean[0].district,
      effective_date: "",
      email:
        !isBlankString(existingSAFData?.ownerDetailsBean[0].email_id) &&
        isStringValid(existingSAFData?.ownerDetailsBean[0].email_id)
          ? existingSAFData?.ownerDetailsBean[0].email_id
          : "",
      entry_type_id: 2,
      entry_type_name: "Re Assessment",
      father_name:
        !isBlankString(existingSAFData?.ownerDetailsBean[0].guardian_name) &&
        isStringValid(existingSAFData?.ownerDetailsBean[0].guardian_name)
          ? existingSAFData?.ownerDetailsBean[0].guardian_name
          : "",
      financial_year: "",
      fy_id: 0,
      isMobileTower: existingSAFData?.propertyMasterBean[0].is_mobile_tower,
      is_complex: existingSAFData?.propertyMasterBean[0].complex_case,
      is_handicapped: existingSAFData?.propertyMasterBean[0].phys_disable,
      is_isdp: existingSAFData?.propertyMasterBean[0].isdp_case,
      is_school: existingSAFData?.propertyMasterBean[0].school_case,
      is_widow: existingSAFData?.propertyMasterBean[0].widow_case,
      khata_no:
        !isBlankString(existingSAFData?.propertyMasterBean[0].khata_no) &&
        isStringValid(existingSAFData?.propertyMasterBean[0].khata_no)
          ? existingSAFData?.propertyMasterBean[0].khata_no
          : "",
      mobile_no:
        !isBlankString(existingSAFData?.ownerDetailsBean[0].mobile_no) &&
        isStringValid(existingSAFData?.ownerDetailsBean[0].mobile_no)
          ? existingSAFData?.ownerDetailsBean[0].mobile_no
          : "",
      module_id: 1,
      module_name: "PROPERTY",
      mohalla:
        !isBlankString(existingSAFData?.propertyMasterBean[0].mohalla) &&
        isStringValid(existingSAFData?.propertyMasterBean[0].mohalla)
          ? existingSAFData?.propertyMasterBean[0].mohalla
          : "",
      old_ward_id: existingSAFData?.propertyMasterBean[0].old_ward_id,
      owner_gender: existingSAFData?.ownerDetailsBean[0].gender,
      owner_pic: existingSAFData?.ownerDetailsBean[0].owner_pic,
      owner_relation: existingSAFData?.ownerDetailsBean[0].relation,
      owner_title: existingSAFData?.ownerDetailsBean[0].title,
      panno:
        !isBlankString(existingSAFData?.ownerDetailsBean[0].pan_no) &&
        isStringValid(existingSAFData?.ownerDetailsBean[0].pan_no)
          ? existingSAFData?.ownerDetailsBean[0].pan_no
          : "",
      pin:
        !isBlankString(existingSAFData?.propertyMasterBean[0].pincode) &&
        isStringValid(existingSAFData?.propertyMasterBean[0].pincode)
          ? existingSAFData?.propertyMasterBean[0].pincode
          : "",
      plot_no:
        !isBlankString(existingSAFData?.propertyMasterBean[0].plot_no) &&
        isStringValid(existingSAFData?.propertyMasterBean[0].plot_no)
          ? existingSAFData?.propertyMasterBean[0].plot_no
          : "",
      prop_address:
        !isBlankString(
          existingSAFData?.propertyMasterBean[0].property_address
        ) &&
        isStringValid(existingSAFData?.propertyMasterBean[0].property_address)
          ? existingSAFData?.propertyMasterBean[0].property_address
          : "",
      prop_age_count: -1,
      prop_id: existingSAFData?.propertyMasterBean[0].property_no,
      prop_owner_name:
        !isBlankString(existingSAFData?.ownerDetailsBean[0].owner_name) &&
        isStringValid(existingSAFData?.ownerDetailsBean[0].owner_name)
          ? existingSAFData?.ownerDetailsBean[0].owner_name
          : "",
      property_type_id: existingSAFData?.propertyMasterBean[0].property_type_id,
      purchase_date: existingSAFData?.ownerDetailsBean[0].purchase_date,
      rain_harvest: existingSAFData?.propertyMasterBean[0].rain_harvest,
      rain_water_docs: existingSAFData?.ownerDetailsBean[0].rain_wtr_doc,
      road_type_id: existingSAFData?.propertyMasterBean[0].road_type_id,
      total_built_up_area:
        existingSAFData?.propertyMasterBean[0].totalbuilbup_area,
      user_id: existingSAFData?.ownerDetailsBean[0].user_id,
      vsrno: existingSAFData?.propertyMasterBean[0].vsrno,
      ward_id: existingSAFData?.propertyMasterBean[0].ward_id,
      zone_id:
        !isBlankString(existingSAFData?.safarvDetailsBean[0].zone_id) &&
        isStringValid(existingSAFData?.safarvDetailsBean[0].zone_id)
          ? existingSAFData?.safarvDetailsBean[0].zone_id
          : 0,
    });
  }, [
    existingSAFData,
    safNewFormAllInputFromAPI,
    //  mapFloorDetailsWithExistingData, findObjectSelectByProcessingInputNExistingData
  ]);

  useEffect(() => {
    console.log("res", safNewFormValidator);
  }, [safNewFormValidator]);
  useEffect(() => {
    console.log("static floor details============");
    console.log(safReassessmentStaticFloorDetails, "static floor details");
  }, [safReassessmentStaticFloorDetails]);

  useEffect(() => {
    console.log("saf reassess data start-----------------");
    console.log(safReassessmentData);
    setIsSAFReassessDataMappedWithExistingData(true);
    console.log("saf reassess data end-----------------");
  }, [safReassessmentData]);

  const [canSAFFormBeRendered, setCanSAFFormBeRendered] = useState(false);
  useEffect(() => {
    console.log("all render condition checking=================");
    console.log(
      showSAFNewFormModal == true &&
        isExistingSAFDataLoaded == true &&
        isSAFReassessDataMappedWithExistingData == true &&
        isSAFAllInputFromAPILoaded == true
    );
    if (
      showSAFNewFormModal == true &&
      isExistingSAFDataLoaded == true &&
      isSAFReassessDataMappedWithExistingData == true &&
      isSAFAllInputFromAPILoaded == true
    ) {
      setCanSAFFormBeRendered(true);
    } else {
      setCanSAFFormBeRendered(false);
    }
  }, [
    showSAFNewFormModal,
    isExistingSAFDataLoaded,
    isSAFReassessDataMappedWithExistingData,
    isSAFAllInputFromAPILoaded,
  ]);

  return canSAFFormBeRendered == true ? (
    <div className="relative mb-10 mt-10 flex min-h-screen flex-col justify-center overflow-hidden">
      <div
        className={`w-${
          isPublicSAF ? "11/12" : "full"
        } m-auto rounded-md  bg-white px-0 pb-4 pt-0 lg:max-w-full`}
      >
        <nav className="navcustomproperty bg-orange-800 relative mb-2 flex flex-wrap items-center justify-between rounded-md py-2 pl-2 pr-0 ring-1 ring-orange-500">
          <h2 className="text-center text-sm font-semibold text-white">
            Re Assesment Form
          </h2>
          <button
            onClick={() => switchOnPrevModalNOffCurrModal(currModal, prevModal)}
            className="mx-4 my-0 h-8 w-24 transform rounded-md bg-green-400 px-0 py-0 text-sm font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-green-700 focus:bg-green-400 focus:outline-none"
          >
            Back
          </button>
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
          <div className="m-4 rounded-non bg-white px-0  pb-4 pt-0 lg:max-w-full">
            <nav className="navcustomproperty bg-orange-800 relative mb-1 flex flex-wrap items-center justify-between rounded-md py-1 pl-2 pr-0 ring-1 ring-orange-500 h-10">
              <h2 className="text-center text-sm font-semibold text-white">
                Basic Details
              </h2>
            </nav>
            <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex ">
              <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                <label
                  className="mb-2 block text-xs font-bold text-gray-700"
                  htmlFor="password"
                >
                  Property No.
                  <p className="contents text-sm font-bold text-red-600">*</p>
                </label>
                <Tooltip
                  className={`text-black-900 inline w-64 bg-red-300 text-xs
                                ${
                                  safNewFormValidator.isPropIdValid == false
                                    ? ``
                                    : `hidden`
                                }`}
                  placement="top"
                  content={safInputValidatorMsgList.validPropIdMsg}
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <input
                    onChange={() =>
                      console.log("prop no onchange handler...do nothing")
                    }
                    value={propertyNo}
                    className={`bg-white-200 appearance-none border ${
                      safNewFormValidator.isPropIdValid == false
                        ? `border-red-900`
                        : `border-gray-500`
                    } text-white-700 w-full cursor-not-allowed rounded px-4 py-2
                                            leading-tight focus:border-2 focus:border-orange-5000 focus:bg-white focus:outline-none
                                            `}
                    id="prop_id"
                    type="text"
                    placeholder="Property ID"
                    disabled
                  />
                </Tooltip>
              </div>
              {/* <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                    Zone No. - Zone Name<p className='contents text-red-600 text-sm font-bold'>*</p>
                                </label>
                                <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64
                                ${safNewFormValidator.isZoneValid == false ? `` : `hidden`}`}
                                    placement='top'
                                    content={safInputValidatorMsgList.validZoneMsg}
                                    animate={{
                                        mount: { scale: 1, y: 0 },
                                        unmount: { scale: 0, y: 25 },
                                    }} >
                                    <Select onChange={handleSAFReassessmentDetailsChange}
                                        label="select" color="orange" className={`pl-2 pr-3 py-2 font-bold text-xs text-gray-900
                                        ${safNewFormValidator.isZoneValid == false ?
                                                `border-red-900` : ``}`}>
                                        {
                                            safNewFormAllInputFromAPI.zone.length > 0 ?
                                                (safNewFormAllInputFromAPI.zone.map((item) => {
                                                    const { id, zone_code, zone_name, stamp_date, user_id, status } = item
                                                    return <Option key={id} value={JSON.stringify(item)}>{`${zone_code} - ${zone_name}`}</Option>
                                                })) : (<Option>Loading...</Option>)
                                        }
                                    </Select>
                                </Tooltip>
                            </div> */}
              <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                <label
                  className="mb-2 block text-xs font-bold text-gray-500"
                  htmlFor="password"
                >
                  Ward No.
                  <p className="contents text-sm font-bold text-red-600">*</p>
                </label>
                <Tooltip
                  className={`text-black-900 inline w-64 bg-red-300 text-xs
                                ${
                                  safNewFormValidator.isWardValid == false
                                    ? ``
                                    : `hidden`
                                }`}
                  placement="top"
                  content={safInputValidatorMsgList.validWardMsg}
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  {/* <Select value={`${safReassessmentData.ward_id}`}
                                        onChange={handleSAFReassessmentDetailsChange}
                                        label="select" className={`pl-2 pr-3 py-2 font-bold text-xs text-gray-900
                                        ${safNewFormValidator.isWardValid == false ?
                                                `border-red-900` : ``}`}>
                                        {
                                            safNewFormAllInputFromAPI.ward.length > 0 ?
                                                (safNewFormAllInputFromAPI.ward.map((item) => {
                                                    const { id, zone_mstr_id, ward_name, area_name, stampdate, user_id, status } = item
                                                    // console.log("hola...............")
                                                    // console.log(`${id.toString().trim()}`)
                                                    const valueStr = id.toString().trim()
                                                    return <Option key={id} value={`${id}`} >{`${id}`}</Option>
                                                })) : (<Option>Loading...</Option>)
                                        }
                                        <Option key={-2} value={`124`}>{`124`}</Option>
                                        <Option key={-3} value={`125`}>{`hoo`}</Option>
                                    </Select> */}
                  {/* w-56 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 */}
                  <select
                    disabled={
                      !isBlankString(
                        existingSAFData?.propertyMasterBean[0]?.ward_id
                      ) &&
                      isStringValid(
                        existingSAFData?.propertyMasterBean[0]?.ward_id
                      )
                        ? true
                        : false
                    }
                    id="ward_id"
                    color="orange"
                    onChange={handleSAFReassessmentDetailsChange}
                    className={`w-56 rounded-lg border border-gray-500 bg-gray-50 text-sm text-gray-900
                                        ${
                                          !isBlankString(
                                            existingSAFData
                                              ?.propertyMasterBean[0]?.ward_id
                                          ) &&
                                          isStringValid(
                                            existingSAFData
                                              ?.propertyMasterBean[0]?.ward_id
                                          )
                                            ? `cursor-not-allowed`
                                            : ``
                                        }
                                        block w-full p-2.5 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700
                                        dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500
                                    ${
                                      safNewFormValidator.isWardValid == false
                                        ? `border-red-900`
                                        : ``
                                    }`}
                  >
                    {safNewFormAllInputFromAPI.ward.length > 0 ? (
                      safNewFormAllInputFromAPI.ward.map((item) => {
                        const {
                          id,
                          zone_mstr_id,
                          ward_name,
                          area_name,
                          stampdate,
                          user_id,
                          status,
                        } = item;
                        const valueStr = id.toString().trim();
                        return (
                          <option
                            key={id}
                            className="font-roboto"
                            value={id}
                            selected={id == safReassessmentData.ward_id}
                          >
                            {ward_name}
                          </option>
                        );
                      })
                    ) : (
                      <option>Loading...</option>
                    )}
                  </select>
                </Tooltip>
              </div>
              <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                <label
                  className="mb-2 block text-xs font-bold text-gray-700"
                  htmlFor="password"
                >
                  Entry Type
                  <p className="contents text-sm font-bold text-red-600">*</p>
                </label>
                <Tooltip
                  className={`text-black-900 inline w-64 bg-red-300 text-xs
                                ${
                                  safNewFormValidator.isEntryTypeValid == false
                                    ? ``
                                    : `hidden`
                                }`}
                  placement="top"
                  content={safInputValidatorMsgList.validEntryTypeMsg}
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  {/* <Select value='Re Assessment'
                                        onChange={handleSAFReassessmentDetailsChange}
                                        label="select" color="orange" className={`pl-2 pr-3 py-2 font-bold text-xs text-gray-900 cursor-not-allowed
                                        ${safNewFormValidator.isEntryTypeValid == false ?
                                                `border-red-900` : ``}`} disabled
                                    >
                                        {
                                            safNewFormAllInputFromAPI.entry_type.length > 0 ?
                                                (safNewFormAllInputFromAPI.entry_type.map((item) => {
                                                    const { id, entry_type, status } = item
                                                    if (entry_type?.includes('Re Assessment')) {
                                                        return <Option key={id} value={entry_type.toString().trim()}>{entry_type}</Option>
                                                    } else {
                                                        return <Option key={id} value='' hidden >N/A</Option>
                                                    }
                                                })) : (<Option>Loading...</Option>)
                                        }

                                    </Select> */}
                  <select
                    id="entry_type_id"
                    onChange={handleSAFReassessmentDetailsChange}
                    className={`block w-56 w-full cursor-not-allowed rounded-lg border border-gray-500
                                    bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600
                                    dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500
                                    dark:focus:ring-blue-500
                                    ${
                                      safNewFormValidator.isEntryTypeValid ==
                                      false
                                        ? `border-red-900`
                                        : ``
                                    }`}
                    disabled
                  >
                    {safNewFormAllInputFromAPI.entry_type.length > 0 ? (
                      safNewFormAllInputFromAPI.entry_type.map((item) => {
                        const { id, entry_type, status } = item;
                        if (entry_type?.includes("Re Assessment")) {
                          return (
                            <option key={id} value={entry_type} selected>
                              {entry_type}
                            </option>
                          );
                        }
                      })
                    ) : (
                      <option>Loading...</option>
                    )}
                  </select>
                </Tooltip>
              </div>
            </div>
            {/* {
                            safNewFormBasicDetails.entry_type_id == 4 ? (
                                <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                            Old Property No. (If any)
                                        </label>
                                        <input
                                            onChange={handleSAFReassessmentDetailsChange}
                                            value={safNewFormBasicDetails.old_property_no}
                                            className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                                            id="old_property_no" type="text" placeholder="Old Property No." />
                                    </div>

                                </div>
                            )
                                : null
                        } */}
          </div>
          <div className="mb-6"></div>

          <div className="m-4 mt-4 rounded-none bg-white  px-0 pb-4 pt-0 lg:max-w-full">
            <nav className="navcustomproperty bg-orange-800 relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-orange-500 h-10">
              <h2 className="text-center text-sm font-semibold text-white">
                Owner Details
              </h2>
            </nav>
            <div className="m-4 mt-4 rounded-none  bg-white px-0 pb-4 pt-0 lg:max-w-full">
              <nav className="navcustomproperty bg-orange-800 relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-orange-500 h-10">
                <h2 className="text-center text-sm font-semibold text-white">
                  Personal Details
                </h2>
              </nav>
              <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex">
                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                  <label
                    className="mb-2 block text-xs font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Honorific
                    <p className="contents text-sm font-bold text-red-600">*</p>
                  </label>
                  <Tooltip
                    className={`text-black-900 inline w-64 bg-red-300 text-xs
                                ${
                                  safNewFormValidator.isOwnerHonorificValid ==
                                  false
                                    ? ``
                                    : `hidden`
                                }`}
                    placement="top"
                    content={safInputValidatorMsgList.validHonorificMsg}
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    {/* <Select value={`title_${safReassessmentData?.owner_title}`}
                                            onChange={handleSAFReassessmentDetailsChange}
                                            label="Select" className={`w-72 pl-2 pr-3 py-2 font-bold text-xs text-gray-900
                                            ${safNewFormValidator.isOwnerHonorificValid == false ?
                                                    `border-red-900` : ``}`}>
                                            <Option value='title_Mr.' >Mr</Option>
                                            <Option value='title_Mrs.' >Mrs</Option>
                                            <Option value='title_Ms.' >Ms</Option>
                                            <Option value='title_Mx.' >Mx</Option>
                                        </Select> */}
                    <select
                      disabled={
                        !isBlankString(
                          existingSAFData?.ownerDetailsBean[0]?.title
                        ) &&
                        isStringValid(
                          existingSAFData?.ownerDetailsBean[0]?.title
                        )
                          ? true
                          : false
                      }
                      id="owner_title"
                      color="orange"
                      onChange={handleSAFReassessmentDetailsChange}
                      className={`w-56 rounded-lg border border-gray-500 bg-gray-50 text-sm text-gray-900
                                            ${
                                              !isBlankString(
                                                existingSAFData
                                                  ?.ownerDetailsBean[0]?.title
                                              ) &&
                                              isStringValid(
                                                existingSAFData
                                                  ?.ownerDetailsBean[0]?.title
                                              )
                                                ? `cursor-not-allowed`
                                                : ``
                                            }
                                    block w-full p-2.5 focus:border-orange-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700
                                    dark:text-white dark:placeholder-gray-400 dark:focus:border-orange-500 dark:focus:ring-blue-500
                                    ${
                                      safNewFormValidator.isOwnerHonorificValid ==
                                      false
                                        ? `border-red-900`
                                        : ``
                                    }`}
                    >
                      <option
                        value="Mr."
                        selected={safReassessmentData.owner_title == "Mr."}
                      >
                        Mr
                      </option>
                      <option
                        value="Mrs."
                        selected={safReassessmentData.owner_title == "Mrs."}
                      >
                        Mrs
                      </option>
                      <option
                        value="Ms."
                        selected={safReassessmentData.owner_title == "Ms."}
                      >
                        Ms
                      </option>
                      <option
                        value="Mx."
                        selected={safReassessmentData.owner_title == "Mx."}
                      >
                        Mx
                      </option>
                    </select>
                  </Tooltip>
                </div>
                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                  <label
                    className="mb-2 block text-xs font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Owner Name
                    <p className="contents text-sm font-bold text-red-600">*</p>
                  </label>
                  <Tooltip
                    className={`text-black-900 inline w-64 bg-red-300 text-xs
                                ${
                                  safNewFormValidator.isOwnerNameValid == false
                                    ? ``
                                    : `hidden`
                                }`}
                    placement="top"
                    content={safInputValidatorMsgList.validOwnerNameMsg}
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    <input
                      disabled={
                        !isBlankString(
                          existingSAFData?.ownerDetailsBean[0]?.owner_name
                        ) &&
                        isStringValid(
                          existingSAFData?.ownerDetailsBean[0]?.owner_name
                        )
                          ? true
                          : false
                      }
                      value={
                        !isBlankString(safReassessmentData.prop_owner_name) &&
                        isStringValid(safReassessmentData.prop_owner_name)
                          ? safReassessmentData.prop_owner_name
                          : ""
                      }
                      onChange={handleSAFReassessmentDetailsChange}
                      className={`bg-white-200 w-56 appearance-none rounded border border-gray-500
                                            ${
                                              !isBlankString(
                                                existingSAFData
                                                  ?.ownerDetailsBean[0]
                                                  ?.owner_name
                                              ) &&
                                              isStringValid(
                                                existingSAFData
                                                  ?.ownerDetailsBean[0]
                                                  ?.owner_name
                                              )
                                                ? `cursor-not-allowed`
                                                : ``
                                            }
                                             text-white-700 px-4 py-2 leading-tight focus:border-2 focus:border-blue-500 focus:bg-white
                                            focus:outline-none ${
                                              safNewFormValidator.isOwnerNameValid ==
                                              false
                                                ? `border-red-900`
                                                : ``
                                            }`}
                      id="prop_owner_name"
                      type="text"
                      color="orange"
                      placeholder="Owner Name"
                    />
                  </Tooltip>
                </div>
                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                  <label
                    className="mb-2 block text-xs font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Gender
                    <p className="contents text-sm font-bold text-red-600">*</p>
                  </label>
                  <Tooltip
                    className={`text-black-900 inline w-64 bg-red-300 text-xs
                                ${
                                  safNewFormValidator.isOwnerGenderValid ==
                                  false
                                    ? ``
                                    : `hidden`
                                }`}
                    placement="top"
                    content={safInputValidatorMsgList.validOwnerGenderMsg}
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    {/* <Select onChange={handleSAFReassessmentDetailsChange}
                                            label="Select" className={`w-72 pl-2 pr-3 py-1 font-bold text-xs text-gray-900
                                            ${safNewFormValidator.isOwnerGenderValid == false ?
                                                    `border-red-900` : ``}`}>
                                            <Option value='gender_Male' >Male</Option>
                                            <Option value='gender_Female' >Female</Option>
                                            <Option value='gender_Transgender' >Transgender</Option>
                                        </Select> */}
                    <select
                      id="owner_gender"
                      color="orange"
                      onChange={handleSAFReassessmentDetailsChange}
                      disabled={
                        !isBlankString(
                          existingSAFData?.ownerDetailsBean[0]?.gender
                        ) &&
                        isStringValid(
                          existingSAFData?.ownerDetailsBean[0]?.gender
                        )
                          ? true
                          : false
                      }
                      className={`w-56 rounded-lg border border-gray-500 bg-gray-50 text-sm text-gray-900
                                            ${
                                              !isBlankString(
                                                existingSAFData
                                                  ?.ownerDetailsBean[0]?.gender
                                              ) &&
                                              isStringValid(
                                                existingSAFData
                                                  ?.ownerDetailsBean[0]?.gender
                                              )
                                                ? `cursor-not-allowed`
                                                : ``
                                            }
                                    block w-full p-2.5 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700
                                    dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500
                                    ${
                                      safNewFormValidator.isOwnerGenderValid ==
                                      false
                                        ? `border-red-900`
                                        : ``
                                    }`}
                    >
                      <option
                        value="Male"
                        selected={safReassessmentData.owner_gender == "Male"}
                      >
                        Male
                      </option>
                      <option
                        value="Female"
                        selected={safReassessmentData.owner_gender == "Female"}
                      >
                        Female
                      </option>
                      <option
                        value="Transgender"
                        selected={
                          safReassessmentData.owner_gender == "Transgender"
                        }
                      >
                        Transgender
                      </option>
                    </select>
                  </Tooltip>
                </div>
              </div>
              <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex ">
                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                  <label
                    className="mb-2 block text-xs font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Guardian Name
                    <p className="contents text-sm font-bold text-red-600">*</p>
                  </label>
                  <Tooltip
                    className={`text-black-900 inline w-64 bg-red-300 text-xs
                                ${
                                  safNewFormValidator.isOwnerGuardianNameValid ==
                                  false
                                    ? ``
                                    : `hidden`
                                }`}
                    placement="top"
                    content={safInputValidatorMsgList.validOwnerGuardianNameMsg}
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    <input
                      disabled={
                        !isBlankString(
                          existingSAFData?.ownerDetailsBean[0]?.guardian_name
                        ) &&
                        isStringValid(
                          existingSAFData?.ownerDetailsBean[0]?.guardian_name
                        )
                          ? true
                          : false
                      }
                      onChange={handleSAFReassessmentDetailsChange}
                      value={
                        !isBlankString(safReassessmentData.father_name) &&
                        isStringValid(safReassessmentData.father_name)
                          ? safReassessmentData.father_name
                          : ""
                      }
                      className={`bg-white-200 w-56 appearance-none rounded border border-gray-500
                                            ${
                                              !isBlankString(
                                                existingSAFData
                                                  ?.ownerDetailsBean[0]
                                                  ?.guardian_name
                                              ) &&
                                              isStringValid(
                                                existingSAFData
                                                  ?.ownerDetailsBean[0]
                                                  ?.guardian_name
                                              )
                                                ? `cursor-not-allowed`
                                                : ``
                                            }
                                             text-white-700 px-4 py-2 leading-tight focus:border-2 focus:border-orange-500 focus:bg-white focus:outline-none
                                            ${
                                              safNewFormValidator.isOwnerGuardianNameValid ==
                                              false
                                                ? `border-red-900`
                                                : `border-gray-500`
                                            }`}
                      id="father_name"
                      type="text"
                      placeholder="Guardian Name"
                    />
                  </Tooltip>
                </div>
                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                  <label
                    className="mb-2 block text-xs font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Relation
                    <p className=" contents text-sm font-bold text-red-600">
                      *
                    </p>
                  </label>
                  <div className="flex w-full items-end ">
                    <Tooltip
                      className={`text-black-900 inline w-64 bg-red-300 text-xs
                                ${
                                  safNewFormValidator.isOwnerRelationValid ==
                                  false
                                    ? ``
                                    : `hidden`
                                }`}
                      placement="top"
                      content={safInputValidatorMsgList.validOwnerRelationMsg}
                      animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0, y: 25 },
                      }}
                    >
                      {/* <Select onChange={handleSAFNewFormOwnerDetailsChange}
                                                label="Select" className={`w-72 pl-2 pr-3 py-1 font-bold text-xs text-gray-900
                                                ${safNewFormValidator.isOwnerRelationValid == false ?
                                                        `border-red-900` : ``}`}>
                                                <Option value='relation_S/O' >S/O</Option>
                                                <Option value='relation_D/O' >D/O</Option>
                                                <Option value='relation_W/O' >W/O</Option>
                                                <Option value='relation_C/O' >C/O</Option>
                                            </Select> */}
                      <select
                        disabled={
                          !isBlankString(
                            existingSAFData?.ownerDetailsBean[0]?.relation
                          ) &&
                          isStringValid(
                            existingSAFData?.ownerDetailsBean[0]?.relation
                          )
                            ? true
                            : false
                        }
                        id="owner_relation"
                        color="orange"
                        onChange={handleSAFReassessmentDetailsChange}
                        className={`w-56 rounded-lg border border-gray-500 bg-gray-50 text-sm text-gray-900
                                                ${
                                                  !isBlankString(
                                                    existingSAFData
                                                      ?.ownerDetailsBean[0]
                                                      ?.relation
                                                  ) &&
                                                  isStringValid(
                                                    existingSAFData
                                                      ?.ownerDetailsBean[0]
                                                      ?.relation
                                                  )
                                                    ? `cursor-not-allowed`
                                                    : ``
                                                }
                                    block w-full p-2.5 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700
                                    dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500
                                    ${
                                      safNewFormValidator.isOwnerRelationValid ==
                                      false
                                        ? `border-red-900`
                                        : ``
                                    }`}
                      >
                        <option
                          value="S/O"
                          selected={safReassessmentData.owner_relation == "S/O"}
                        >
                          S/O
                        </option>
                        <option
                          value="D/O"
                          selected={safReassessmentData.owner_relation == "D/O"}
                        >
                          D/O
                        </option>
                        <option
                          value="W/O"
                          selected={safReassessmentData.owner_relation == "W/O"}
                        >
                          W/O
                        </option>
                        <option
                          value="C/O"
                          selected={safReassessmentData.owner_relation == "C/O"}
                        >
                          C/O
                        </option>
                      </select>
                    </Tooltip>
                  </div>
                </div>
                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                  <label
                    className="mb-2 block text-xs font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Mobile No.
                    <p className="contents text-sm font-bold text-red-600">*</p>
                  </label>
                  <Tooltip
                    className={`text-black-900 inline w-64 bg-red-300 text-xs
                                ${
                                  safNewFormValidator.isOwnerMobileNumValid ==
                                  false
                                    ? ``
                                    : `hidden`
                                }`}
                    placement="top"
                    content={safInputValidatorMsgList.validMobileNumMsg}
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    {/* <input
                                        disabled={!isBlankString(existingSAFData?.ownerDetailsBean[0]?.mobile_no) &&
                                            isStringValid(existingSAFData?.ownerDetailsBean[0]?.mobile_no) ? true : false}
                                            type="tel" id="mobile_no"
                                            value={!isBlankString(safReassessmentData.mobile_no) &&
                                                isStringValid(safReassessmentData.mobile_no) ? safReassessmentData.mobile_no :
                                                ''}
                                            onChange={handleSAFReassessmentDetailsChange}
                                            className={`bg-white-200 appearance-none border border-gray-500 rounded w-56 py-2 px-2
                                        text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2
                                        focus:border-blue-500" placeholder="0123-45-6789" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}
                                        ${!isBlankString(existingSAFData?.ownerDetailsBean[0]?.mobile_no) &&
                                                    isStringValid(existingSAFData?.ownerDetailsBean[0]?.mobile_no) ? `cursor-not-allowed` : ``}
                                        ${safNewFormValidator.isOwnerMobileNumValid == false ?
                                                    `border-red-900` : `border-gray-500`}`} ></input> */}

                    <input
                      // disabled={!isBlankString(existingSAFData?.ownerDetailsBean[0]?.mobile_no) &&
                      //     isStringValid(existingSAFData?.ownerDetailsBean[0]?.mobile_no) ? true : false}
                      type="tel"
                      id="mobile_no"
                      maxLength="10"
                      name="mobile_no"
                      value={
                        !isBlankString(safReassessmentData.mobile_no) &&
                        isStringValid(safReassessmentData.mobile_no)
                          ? safReassessmentData.mobile_no
                          : ""
                      }
                      onChange={handleSAFReassessmentDetailsChange}
                      className={`bg-white-200 text-white-700 focus:border-blue-500" placeholder="0123-45-6789" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3} w-56 appearance-none rounded
                                        border border-gray-500 px-2 py-2 leading-tight
                                        focus:border-2 focus:bg-white focus:outline-none
                                        ${
                                          safNewFormValidator.isOwnerMobileNumValid ==
                                          false
                                            ? `border-red-900`
                                            : `border-gray-500`
                                        }`}
                    ></input>
                  </Tooltip>
                </div>
              </div>
              <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex ">
                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                  <label
                    className="mb-2 block text-xs font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Aadhar No.
                  </label>
                  <Tooltip
                    className={`text-black-900 inline w-64 bg-red-300 text-xs
                                ${
                                  safNewFormValidator.isOwnerAadharValid ==
                                  false
                                    ? ``
                                    : `hidden`
                                }`}
                    placement="top"
                    content={safInputValidatorMsgList.validOwnerAadharMsg}
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    <input
                      type="tel"
                      id="aadhar"
                      onChange={handleSAFReassessmentDetailsChange}
                      value={
                        !isBlankString(safReassessmentData.aadhar) &&
                        isStringValid(safReassessmentData.aadhar)
                          ? safReassessmentData.aadhar
                          : ""
                      }
                      className={`bg-white-200 text-white-700 focus:border-orange-500" placeholder="0123-4525-6789" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3} w-56 appearance-none rounded border border-gray-500 px-2 py-2 leading-tight focus:border-2 focus:bg-white focus:outline-none
                                        ${
                                          safNewFormValidator.isOwnerAadharValid ==
                                          false
                                            ? `border-red-900`
                                            : `border-gray-500`
                                        }`}
                    ></input>
                  </Tooltip>
                </div>
                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                  <label
                    className="mb-2 block text-xs font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Email Id
                  </label>
                  <Tooltip
                    className={`text-black-900 inline w-64 bg-red-300 text-xs
                                ${
                                  safNewFormValidator.isOwnerEmailValid == false
                                    ? ``
                                    : `hidden`
                                }`}
                    placement="top"
                    content={safInputValidatorMsgList.validOwnerEmailMsg}
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    <input
                      type="email"
                      onChange={handleSAFReassessmentDetailsChange}
                      value={
                        !isBlankString(safReassessmentData.email) &&
                        isStringValid(safReassessmentData.email)
                          ? safReassessmentData.email
                          : ""
                      }
                      className={`bg-white-200 text-white-700 w-56 appearance-none rounded border border-orange-500 px-4 py-2 leading-tight focus:border-2 focus:border-blue-500 focus:bg-white focus:outline-none
                                        ${
                                          safNewFormValidator.isOwnerEmailValid ==
                                          false
                                            ? `border-red-900`
                                            : `border-gray-500`
                                        }`}
                      id="email"
                      placeholder="Email Id"
                    />
                  </Tooltip>
                </div>

                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                  <label
                    className="mb-2 block text-xs font-bold text-gray-700"
                    htmlFor="password"
                  >
                    PAN No.
                  </label>
                  <Tooltip
                    className={`text-black-900 inline w-64 bg-red-300 text-xs
                                ${
                                  safNewFormValidator.isOwnerPanValid == false
                                    ? ``
                                    : `hidden`
                                }`}
                    placement="top"
                    content={safInputValidatorMsgList.validOwnerPanNumMsg}
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    <input
                      onChange={handleSAFReassessmentDetailsChange}
                      value={
                        !isBlankString(safReassessmentData.panno) &&
                        isStringValid(safReassessmentData.panno)
                          ? safReassessmentData.panno
                          : ""
                      }
                      className={`bg-white-200 text-white-700 w-56 appearance-none rounded border border-gray-500 px-2 py-2 leading-tight focus:border-2 focus:border-orange-500 focus:bg-white focus:outline-none
                                        ${
                                          safNewFormValidator.isOwnerPanValid ==
                                          false
                                            ? `border-red-900`
                                            : `border-gray-500`
                                        }`}
                      id="panno"
                      type="text"
                      placeholder="PAN No."
                    />
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="mb-6"></div>

            <div className="mb-6"></div>
            <div className="mb-6"></div>
            <div className="m-4 mt-4 rounded-non bg-white px-0 pb-4 pt-0 lg:max-w-full">
              <nav className="navcustomproperty bg-orange-800 relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-red-700 h-10">
                <h2 className="text-center text-sm font-semibold text-white">
                  Property Details
                </h2>
              </nav>
              <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex ">
                {/* <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Plot Area(Sq.ft.)
                                        <p className='contents text-red-600 text-sm font-bold'>*</p>
                                    </label>
                                    <input onChange={handleSAFNewFormOwnerPropertyDetailsChange}
                                        value={safNewFormOwnerPropertyDetails.plot_area}
                                        className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                                        id="plot_area" type="text" placeholder="Plot Area" />
                                </div> */}
                {/* <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Vacant Land Area(Sq.ft.)
                                    </label>
                                    <input onChange={handleSAFNewFormOwnerPropertyDetailsChange}
                                        value={safNewFormOwnerPropertyDetails.vacant_land_area}
                                        className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                                        id="vacant_land_area" type="text" placeholder="Open Land Area" />
                                </div> */}
                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                  <label
                    className="mb-2 block text-xs font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Plot No.
                    {/* <p className='contents text-red-600 text-sm font-bold'>*</p> */}
                  </label>
                  {/* <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64
                                ${safNewFormValidator.isPlotNumValid == false ? `` : `hidden`}`}
                                        placement='top'
                                        content={safInputValidatorMsgList.validPlotNumMsg}
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }} > */}
                  {/* <input disabled={!isBlankString(existingSAFData?.propertyMasterBean[0]?.plot_no) &&
                                            isStringValid(existingSAFData?.propertyMasterBean[0]?.plot_no) ? true : false}
                                            onChange={handleSAFReassessmentDetailsChange}
                                            value={!isBlankString(safReassessmentData.plot_no) &&
                                                isStringValid(safReassessmentData.plot_no) ? safReassessmentData.plot_no : ''}
                                            className={`bg-white-200 appearance-none border border-gray-500 rounded w-full
                                            ${!isBlankString(existingSAFData?.propertyMasterBean[0]?.plot_no) &&
                                                    isStringValid(existingSAFData?.propertyMasterBean[0]?.plot_no) ? `cursor-not-allowed` : ``}
                                            py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500
                                            ${safNewFormValidator.isPlotNumValid == false ?
                                                    `border-red-900` : `border-gray-500`}`}
                                            id="plot_no" type="text" placeholder="Plot No." /> */}
                  <Tooltip
                    className={`text-black-900 inline w-64 bg-red-300 text-xs
                                ${
                                  safNewFormValidator.isPlotNumValid == false
                                    ? ``
                                    : `hidden`
                                }`}
                    placement="top"
                    content={safInputValidatorMsgList.validPlotNumMsg}
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    <input
                      disabled={
                        !isBlankString(
                          existingSAFData?.propertyMasterBean[0]?.plot_no
                        ) &&
                        isStringValid(
                          existingSAFData?.propertyMasterBean[0]?.plot_no
                        )
                          ? true
                          : false
                      }
                      onChange={handleSAFReassessmentDetailsChange}
                      value={
                        !isBlankString(safReassessmentData.plot_no) &&
                        isStringValid(safReassessmentData.plot_no)
                          ? safReassessmentData.plot_no
                          : ""
                      }
                      //     className={`bg-white-200 appearance-none border border-gray-500 rounded w-full

                      //     py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500
                      //    `}
                      className={`bg-white-200 w-full appearance-none rounded border border-gray-500
                                        ${
                                          !isBlankString(
                                            existingSAFData
                                              ?.propertyMasterBean[0]?.plot_no
                                          ) &&
                                          isStringValid(
                                            existingSAFData
                                              ?.propertyMasterBean[0]?.plot_no
                                          )
                                            ? `cursor-not-allowed`
                                            : ``
                                        }
                                        text-white-700 px-4 py-2 leading-tight focus:border-2 focus:border-orange-500 focus:bg-white focus:outline-none
                                        ${
                                          safNewFormValidator.isPlotNumValid ==
                                          false
                                            ? `border-red-900`
                                            : `border-gray-500`
                                        }`}
                      id="plot_no"
                      type="text"
                      placeholder="Plot No."
                    />
                  </Tooltip>
                </div>
                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                  <label
                    className="mb-2 block text-xs font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Khata No.
                    {/* <p className='contents text-red-600 text-sm font-bold'>*</p> */}
                  </label>
                  <Tooltip
                    className={`text-black-900 inline w-64 bg-red-300 text-xs
                                ${
                                  safNewFormValidator.isKhataNumValid == false
                                    ? ``
                                    : `hidden`
                                }`}
                    placement="top"
                    content={safInputValidatorMsgList.validKhataNumMsg}
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    <input
                      disabled={
                        !isBlankString(
                          existingSAFData?.propertyMasterBean[0]?.khata_no
                        ) &&
                        isStringValid(
                          existingSAFData?.propertyMasterBean[0]?.khata_no
                        )
                          ? true
                          : false
                      }
                      onChange={handleSAFReassessmentDetailsChange}
                      value={
                        !isBlankString(safReassessmentData.khata_no) &&
                        isStringValid(safReassessmentData.khata_no)
                          ? safReassessmentData.khata_no
                          : ""
                      }
                      className={`bg-white-200 text-white-700 w-full appearance-none
                                            rounded border border-gray-500 px-4 py-2 leading-tight focus:border-2 focus:border-orange-500
                                            focus:bg-white focus:outline-none
                                            ${
                                              safNewFormValidator.isKhataNumValid ==
                                              false
                                                ? `border-red-900`
                                                : `border-gray-500`
                                            } `}
                      id="khata_no"
                      type="text"
                      placeholder="Khata No."
                    />
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="mb-6"></div>
            <div className="m-4 mt-4 rounded-non bg-white px-0 pb-4 pt-0 lg:max-w-full">
              <nav className="navcustomproperty bg-orange-800 relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-red-700 h-10 ">
                <h2 className="text-center text-sm font-semibold text-white">
                  Property Address
                </h2>
              </nav>

              <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex ">
                <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                  <label
                    className="mb-2 block text-xs font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Property Address
                    <p className="contents text-sm font-bold text-red-600">*</p>
                  </label>
                  <Tooltip
                    className={`text-black-900 inline w-64 bg-red-300 text-xs
                                ${
                                  safNewFormValidator.isPropAddressValid ==
                                  false
                                    ? ``
                                    : `hidden`
                                }`}
                    placement="top"
                    content={safInputValidatorMsgList.validPropAddressMsg}
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    <textarea
                      disabled={
                        !isBlankString(
                          existingSAFData?.ownerDetailsBean[0]?.owner_address
                        ) &&
                        isStringValid(
                          existingSAFData?.ownerDetailsBean[0]?.owner_address
                        )
                          ? true
                          : false
                      }
                      onChange={handleSAFReassessmentDetailsChange}
                      color="red"
                      value={
                        !isBlankString(safReassessmentData.prop_address) &&
                        isStringValid(safReassessmentData.prop_address)
                          ? safReassessmentData.prop_address
                          : ""
                      }
                      className={`bg-white-200 h-10 w-full appearance-none rounded border border-gray-500
                                            ${
                                              !isBlankString(
                                                existingSAFData
                                                  ?.ownerDetailsBean[0]
                                                  ?.owner_address
                                              ) &&
                                              isStringValid(
                                                existingSAFData
                                                  ?.ownerDetailsBean[0]
                                                  ?.owner_address
                                              )
                                                ? `cursor-not-allowed`
                                                : ``
                                            }
                                            text-white-700 px-4 py-2 leading-tight focus:border-2 focus:border-orange-500 focus:bg-white focus:outline-none
                                        ${
                                          safNewFormValidator.isPropAddressValid ==
                                          false
                                            ? `border-red-900`
                                            : `border-gray-500`
                                        }`}
                      id="prop_address"
                      name="w3review"
                      rows="4"
                      cols="20"
                    ></textarea>
                  </Tooltip>
                </div>
                <div className="mb-4 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
                  <label
                    className="mb-2 block text-xs font-bold text-gray-700"
                    htmlFor="password"
                  >
                    District
                    {/* <p className='contents text-red-600 text-sm font-bold'>*</p> */}
                  </label>
                  <Tooltip
                    className={`text-black-900 inline w-64 bg-red-300 text-xs
                                ${
                                  safNewFormValidator.isPropDistrictValid ==
                                  false
                                    ? ``
                                    : `hidden`
                                }`}
                    placement="top"
                    content={safInputValidatorMsgList.validPropDistrictMsg}
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    {/* <Select onChange={handleSAFNewFormOwnerPropertyAddressChange}
                                            label="District" className={`pl-2 pr-3 py-2 font-bold text-xs text-gray-900
                                        ${safNewFormValidator.isPropDistrictValid == false ?
                                                    `border-red-900` : ``}`}>
                                            {
                                                districtData.length > 0 ? (districtData.map(item => {
                                                    const { id, districtName } = item
                                                    return (<Option key={id} value={`property_${districtName}`}>{districtName}</Option>)
                                                })) : (<Option key="abc" value="">Loading...</Option>)
                                            }
                                        </Select> */}
                    <select
                      disabled={
                        // !isBlankString(existingSAFData?.propertyMasterBean[0]?.district) &&
                        isStringValid(
                          existingSAFData?.propertyMasterBean[0]?.district
                        )
                          ? true
                          : false
                      }
                      id="district"
                      color="orange"
                      onChange={handleSAFReassessmentDetailsChange}
                      className={`w-56 rounded-lg border border-gray-500 bg-gray-50 text-sm text-gray-900
                                            ${
                                              !isBlankString(
                                                existingSAFData
                                                  ?.propertyMasterBean[0]
                                                  ?.district
                                              ) &&
                                              isStringValid(
                                                existingSAFData
                                                  ?.propertyMasterBean[0]
                                                  ?.district
                                              )
                                                ? `cursor-not-allowed`
                                                : ``
                                            }
                                    block w-full p-2.5 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700
                                    dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500
                                    ${
                                      safNewFormValidator.isPropDistrictValid ==
                                      false
                                        ? `border-red-900`
                                        : ``
                                    }`}
                    >
                      {districtData.length > 0 ? (
                        districtData.map((item) => {
                          const { id, districtName } = item;
                          return (
                            <option
                              key={id}
                              value={safReassessmentData?.district}
                              //value={`${districtName}`}
                              // selected={districtName == safReassessmentData.district}
                            >
                              {existingSAFData?.propertyMasterBean[0]
                                ?.district === ""
                                ? `No records found`
                                : safReassessmentData?.district}
                            </option>
                          );
                        })
                      ) : (
                        <option key="abc" value="">
                          Loading...
                        </option>
                      )}
                    </select>
                  </Tooltip>
                </div>
                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                  <label
                    className="mb-2 block text-xs font-bold text-gray-700"
                    htmlFor="password"
                  >
                    PIN Code
                    {/* <p className='contents text-red-600 text-xs font-bold'>*</p> */}
                  </label>
                  <Tooltip
                    className={`text-black-900 inline w-64 bg-red-300 text-xs
                                ${
                                  safNewFormValidator.isPropPinValid == false
                                    ? ``
                                    : `hidden`
                                }`}
                    placement="top"
                    content={safInputValidatorMsgList.validPropPinMsg}
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    <input
                      disabled={
                        !isBlankString(
                          existingSAFData?.propertyMasterBean[0]?.pincode
                        ) &&
                        isStringValid(
                          existingSAFData?.propertyMasterBean[0]?.pincode
                        )
                          ? true
                          : false
                      }
                      onChange={handleSAFReassessmentDetailsChange}
                      value={
                        !isBlankString(safReassessmentData.pin) &&
                        isStringValid(safReassessmentData.pin)
                          ? safReassessmentData.pin
                          : ""
                      }
                      className={`bg-white-200 w-full appearance-none rounded border border-gray-500 px-4 py-2
                                            ${
                                              !isBlankString(
                                                existingSAFData
                                                  ?.propertyMasterBean[0]
                                                  ?.pincode
                                              ) &&
                                              isStringValid(
                                                existingSAFData
                                                  ?.propertyMasterBean[0]
                                                  ?.pincode
                                              )
                                                ? "cursor-not-allowed"
                                                : ""
                                            }
                                            text-white-700 leading-tight focus:border-2 focus:border-orange-500 focus:bg-white focus:outline-none
                                        ${
                                          safNewFormValidator.isPropPinValid ==
                                          false
                                            ? `border-red-900`
                                            : `border-gray-500`
                                        }`}
                      id="pin"
                      type="text"
                      placeholder="PIN Code"
                    />
                  </Tooltip>
                </div>
              </div>
              <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex ">
                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                  <label
                    className="mb-2 block text-xs font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Village(Mohalla)
                    {/* <p className='contents text-red-600 text-xs font-bold'>*</p> */}
                  </label>
                  <Tooltip
                    className={`text-black-900 inline w-64 bg-red-300 text-xs
                                ${
                                  safNewFormValidator.isPropMohallaValid ==
                                  false
                                    ? ``
                                    : `hidden`
                                }`}
                    placement="top"
                    content={safInputValidatorMsgList.validMohallaMsg}
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    {/* <input disabled={!isBlankString(existingSAFData?.propertyMasterBean[0]?.mohalla) &&
                                            isStringValid(existingSAFData?.propertyMasterBean[0]?.mohalla) ? true : false}
                                            onChange={handleSAFReassessmentDetailsChange}
                                            value={!isBlankString(safReassessmentData.mohalla) &&
                                                isStringValid(safReassessmentData.mohalla) ? safReassessmentData.mohalla : ''}
                                            className={`bg-white-200 appearance-none border border-gray-500 rounded w-full
                                            ${!isBlankString(existingSAFData?.propertyMasterBean[0]?.mohalla) &&
                                                    isStringValid(existingSAFData?.propertyMasterBean[0]?.mohalla) ? `cursor-not-allowed` : ``}
                                            py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white
                                            focus:border-2 focus:border-orange-500
                                        ${safNewFormValidator.isPropMohallaValid == false ?
                                                    `border-red-900` : `border-gray-500`}`}
                                            id="mohalla" type="text" placeholder="Village" /> */}
                    <input
                      disabled={
                        !isBlankString(
                          existingSAFData?.propertyMasterBean[0]?.mohalla
                        ) &&
                        isStringValid(
                          existingSAFData?.propertyMasterBean[0]?.mohalla
                        )
                          ? true
                          : false
                      }
                      onChange={handleSAFReassessmentDetailsChange}
                      value={
                        !isBlankString(safReassessmentData.mohalla) &&
                        isStringValid(safReassessmentData.mohalla)
                          ? safReassessmentData.mohalla
                          : ""
                      }
                      className={`bg-white-200 w-full appearance-none rounded border border-gray-500
                                            ${
                                              !isBlankString(
                                                existingSAFData
                                                  ?.propertyMasterBean[0]
                                                  ?.mohalla
                                              ) &&
                                              isStringValid(
                                                existingSAFData
                                                  ?.propertyMasterBean[0]
                                                  ?.mohalla
                                              )
                                                ? `cursor-not-allowed`
                                                : ``
                                            }
                                            text-white-700 px-4 py-2 leading-tight focus:border-2 focus:border-orange-500
                                            focus:bg-white focus:outline-none
                                            ${
                                              safNewFormValidator.isPropMohallaValid ==
                                              false
                                                ? `border-red-900`
                                                : `border-gray-500`
                                            }
                                        `}
                      id="mohalla"
                      type="text"
                      placeholder="Village"
                    />
                  </Tooltip>
                </div>
                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                  <label
                    className="mb-2 block text-xs font-bold text-gray-700"
                    htmlFor="password"
                  >
                    City
                    <p className="contents text-xs font-bold text-red-600">*</p>
                  </label>
                  <Tooltip
                    className={`text-black-900 inline w-64 bg-red-300 text-xs
                                ${
                                  safNewFormValidator.isPropCityValid == false
                                    ? ``
                                    : `hidden`
                                }`}
                    placement="top"
                    content={safInputValidatorMsgList.validPropCityMsg}
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    <input
                      disabled={
                        !isBlankString(
                          existingSAFData?.propertyMasterBean[0]?.city
                        ) &&
                        isStringValid(
                          existingSAFData?.propertyMasterBean[0]?.city
                        )
                          ? true
                          : false
                      }
                      onChange={handleSAFReassessmentDetailsChange}
                      value={
                        !isBlankString(safReassessmentData.city) &&
                        isStringValid(safReassessmentData.city)
                          ? safReassessmentData.city
                          : ""
                      }
                      className={`bg-white-200 w-full appearance-none rounded border border-gray-500
                                            ${
                                              !isBlankString(
                                                safReassessmentData.city
                                              ) &&
                                              isStringValid(
                                                safReassessmentData.city
                                              )
                                                ? `cursor-not-allowed`
                                                : ``
                                            }
                                            text-white-700 px-4 py-2 leading-tight focus:border-2 focus:border-orange-500 focus:bg-white focus:outline-none
                                        ${
                                          safNewFormValidator.isPropCityValid ==
                                          false
                                            ? `border-red-900`
                                            : `border-gray-500`
                                        }`}
                      id="city"
                      type="text"
                      placeholder="City"
                    />
                  </Tooltip>
                </div>
              </div>
              {/* <div className="flex min-w-fit  text-sm">
                                <Checkbox onClick={handleCorrAddressCheckboxChange}
                                    color="teal" label="If Corresponding Address Different from Property Address" />
                            </div> */}
              {/* {
                                isCorrAddressSelected ? (<><div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                                    <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                            Correspondence Address

                                        </label>
                                        <textarea onChange={handleSAFNewFormOwnerPropertyAddressChange}
                                            value={safNewFormOwnerPropertyAddress.prop_address_corr}
                                            className="bg-white-200 appearance-none border border-gray-500 rounded w-full h-10 py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                                            id="prop_address_corr" name="w3review" rows="4" cols="20"></textarea>
                                    </div>
                                    <div className="mb-4 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
                                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                            District
                                        </label>
                                        <Select onChange={handleSAFNewFormOwnerPropertyAddressChange}
                                            label="District" className='pl-2 pr-3 py-2 font-bold text-sm text-gray-900'>
                                            {
                                                districtData.length > 0 ? (districtData.map(item => {
                                                    const { id, districtName } = item
                                                    return (<Option key={id} value={`corr_${districtName}`}>{districtName}</Option>)
                                                })) : (<Option key="abc" value="">Loading...</Option>)
                                            }
                                        </Select>
                                    </div>
                                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                            PIN Code
                                        </label>
                                        <input onChange={handleSAFNewFormOwnerPropertyAddressChange}
                                            value={safNewFormOwnerPropertyAddress.pin_corr}
                                            className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                                            id="pin_corr" type="text" placeholder="PIN Code" />
                                    </div>
                                </div>

                                    <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                                        <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                            <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                                Village(Mohalla)
                                            </label>
                                            <input onChange={handleSAFNewFormOwnerPropertyAddressChange}
                                                value={safNewFormOwnerPropertyAddress.mohalla_corr}
                                                className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                                                id="mohalla_corr" type="text" placeholder="Village" />
                                        </div>
                                        <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                            <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                                City
                                            </label>
                                            <input onChange={handleSAFNewFormOwnerPropertyAddressChange}
                                                value={safNewFormOwnerPropertyAddress.city_corr}
                                                className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                                                id="city_corr" type="text" placeholder="City" />
                                        </div>
                                    </div></>) : null
                            } */}
            </div>
            <div className="mb-6"></div>
            <div className="m-4 mt-4 rounded-non bg-white px-0 pb-4 pt-0 lg:max-w-full">
              <nav className="navcustomproperty bg-orange-800 relative mb-1 flex flex-wrap items-center justify-between rounded-md py-1 pl-2 pr-0 ring-1 ring-red-700 h-10">
                <h2 className="text-center text-sm font-semibold text-white">
                  Property Type Details
                </h2>
              </nav>
              <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex ">
                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                  <label
                    className="mb-2 block text-xs font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Property Type
                    <p className=" contents text-sm font-bold text-red-600">
                      *
                    </p>
                  </label>
                  <Tooltip
                    className={`text-black-900 inline w-64 bg-red-300 text-xs
                                ${
                                  safNewFormValidator.isPropertyTypeValid ==
                                  false
                                    ? ``
                                    : `hidden`
                                }`}
                    placement="top"
                    content={safInputValidatorMsgList.validPropertyTypeMsg}
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    {/* <Select onChange={handleSAFNewFormPropertyTypeDetails}
                                            label="Select" className={`pl-2 pr-3 py-2 font-bold text-xs text-gray-900
                                        ${safNewFormValidator.isPropertyTypeValid == false ?
                                                    `border-red-900` : ``}`}>
                                            {
                                                safNewFormAllInputFromAPI.property_type.length > 0 ?
                                                    (safNewFormAllInputFromAPI.property_type.map((item) => {
                                                        const { id, property_type_name, status } = item
                                                        return <Option key={id} value={JSON.stringify(item)}>{property_type_name}</Option>
                                                    })) : (<Option>Loading...</Option>)
                                            }
                                        </Select> */}
                    <select
                      id="property_type_id"
                      onChange={handleSAFReassessmentDetailsChange}
                      className={`block w-56 w-full rounded-lg border border-gray-500 bg-gray-50
                                    p-2.5 text-sm text-gray-900 focus:border-orange-500 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700
                                    dark:text-white dark:placeholder-gray-400 dark:focus:border-orange-500 dark:focus:ring-orange-500
                                    ${
                                      safNewFormValidator.isPropertyTypeValid ==
                                      false
                                        ? `border-red-900`
                                        : ``
                                    }`}
                    >
                      {safNewFormAllInputFromAPI.property_type.length > 0 ? (
                        safNewFormAllInputFromAPI.property_type.map((item) => {
                          const { id, property_type_name, status } = item;
                          return (
                            <option
                              key={id}
                              value={id}
                              selected={
                                id == safReassessmentData.property_type_id
                              }
                            >
                              {property_type_name}
                            </option>
                          );
                        })
                      ) : (
                        <option>Loading...</option>
                      )}
                    </select>
                  </Tooltip>
                </div>
                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                  <label
                    className="mb-2 block text-xs font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Road Type
                  </label>
                  <div className="custom-checkbox min-w-fit max-w-fit items-end gap-4 md:flex-1 lg:flex">
                    <Checkbox
                      disabled={true}
                      id={`road_type_id-${safNewFormAllInputFromAPI.roadType[0]?.id}`}
                      checked={
                        safReassessmentData.road_type_id ==
                        safNewFormAllInputFromAPI.roadType[0]?.id
                      }
                      onChange={handleSAFReassessmentDetailsChange}
                      color="orange"
                      className="custom-checkbox cursor-not-allowed"
                      label={safNewFormAllInputFromAPI.roadType[0]?.road_name}
                    />
                  </div>
                </div>
              </div>

              <div className="m-2 mt-4 rounded-non bg-white px-0 pb-4 pt-0 lg:max-w-full">
                <nav className="navcustomproperty bg-orange-800 relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-red-700 h-10">
                  <h2 className="text-center text-sm font-semibold text-white">
                    Existing Floor Details
                  </h2>
                </nav>
                {safNewFormValidator.isFloorDetailsValid == false ? (
                  <p className="m-3 text-xs font-bold text-red-600">
                    {safInputValidatorMsgList.validPropertyFloorDetailsMsg}
                  </p>
                ) : null}
                {safNewFormValidator.isSelectedFloorValid == false ? (
                  <p className="m-3 text-xs font-bold text-red-600">
                    {safInputValidatorMsgList.validPropertyFloorSelectMsg}
                  </p>
                ) : null}
                {safNewFormValidator.isAnyFloorDetailsValueEmpty == false ? (
                  <p className="m-3 text-xs font-bold text-red-600">
                    {safInputValidatorMsgList.validPropertyFloorSelectMsg}
                  </p>
                ) : null}
                {safNewFormValidator.isAnyFloorContainsDuplicateFloor ==
                false ? (
                  <p className="m-3 text-xs font-bold text-red-600">
                    {safInputValidatorMsgList.validPropertyUniqueFloorMsg}
                  </p>
                ) : null}
                {
                  //This part is rendering the existing floor details array
                  /**
                   * ***************************************************************
                   */
                  safNewFormPropertyFloorDetails.map(
                    (floorObj, floorIndex, floorArr) => {
                      // console.log("floor ara")
                      console.log(JSON.stringify(floorObj), "floorObjjj");
                      return (
                        <div className="border-none" key={floorIndex}>
                          <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex ">
                            <div className="mb-4 ml-3 mr-2 mt-2 min-w-fit max-w-fit">
                              <label
                                className="mb-2 block text-xs font-bold text-gray-700"
                                htmlFor="password"
                              >
                                Floor No.
                                <p className="contents text-sm font-bold text-red-600">
                                  *
                                </p>
                              </label>
                              <select
                                // disabled={ !isBlankString(safReassessmentStaticFloorDetails[floorIndex].floor_name) &&
                                // isStringValid(safReassessmentStaticFloorDetails[floorIndex].floor_name) ? true : false }
                                // value={JSON.stringify(safNewFormPropertyFloorDetails.from_date_obj)}
                                onChange={(e) =>
                                  handleSAFNewFormPropertyFloorDetailsChange(
                                    e,
                                    floorIndex
                                  )
                                }
                                color="orange"
                                className={`w-full rounded-md border border-gray-500 bg-white p-2 text-gray-500
                                                            shadow-sm outline-none focus:border-orange-500`}
                              >
                                {/* ${ !isBlankString(safReassessmentStaticFloorDetails[floorIndex].floor_name) &&
                                                                isStringValid(safReassessmentStaticFloorDetails[floorIndex].floor_name) ? 'cursor-not-allowed' : '' } */}

                                <option value="">Select an option</option>
                                {safNewFormAllInputFromAPI.floor.length > 0 ? (
                                  safNewFormAllInputFromAPI.floor.map(
                                    (item, index) => {
                                      const {
                                        id,
                                        floor_name,
                                        status,
                                        discount_per,
                                        short_name,
                                      } = item;
                                      const isSelected =
                                        floor_name == floorObj.floor_name;
                                      return (
                                        <option
                                          key={index}
                                          selected={isSelected}
                                          value={JSON.stringify(item)}
                                        >
                                          {floor_name}
                                        </option>
                                      );
                                    }
                                  )
                                ) : (
                                  <option value="">Loading...</option>
                                )}
                              </select>
                            </div>

                            <div className="mb-4 ml-2 mt-2 min-w-fit max-w-fit">
                              <label
                                className="mb-2 block text-xs font-bold text-gray-700"
                                htmlFor="password"
                              >
                                Ocuupancy Type
                                <p className=" contents text-sm font-bold text-red-600">
                                  *
                                </p>
                              </label>
                              <select
                                // disabled={ !isBlankString(safReassessmentStaticFloorDetails[floorIndex].occupancy_type) &&
                                // isStringValid(safReassessmentStaticFloorDetails[floorIndex].occupancy_type) ? true : false }
                                // value={JSON.stringify(safNewFormPropertyFloorDetails.from_date_obj)}
                                onChange={(e) =>
                                  handleSAFNewFormPropertyFloorDetailsChange(
                                    e,
                                    floorIndex
                                  )
                                }
                                color="orange"
                                className={`w-full rounded-md border border-gray-500 bg-white p-2 text-gray-500
                                                            shadow-sm outline-none focus:border-orange-500`}
                              >
                                {/* ${ !isBlankString(safReassessmentStaticFloorDetails[floorIndex].occupancy_type) &&
                                                                isStringValid(safReassessmentStaticFloorDetails[floorIndex].occupancy_type) ? 'cursor-not-allowed' : '' } */}
                                <option value="">Select an option</option>
                                {safNewFormAllInputFromAPI.occupation_type
                                  .length > 0 ? (
                                  safNewFormAllInputFromAPI.occupation_type.map(
                                    (item, index) => {
                                      const { id, occup_type, status } = item;
                                      const isSelected =
                                        occup_type == floorObj.occupancy_type;
                                      return (
                                        <option
                                          key={index}
                                          selected={isSelected}
                                          value={JSON.stringify(item)}
                                        >
                                          {occup_type}
                                        </option>
                                      );
                                    }
                                  )
                                ) : (
                                  <option value="">Loading...</option>
                                )}
                              </select>
                            </div>
                            <div className="mb-4 ml-2 mt-2 min-w-fit max-w-fit">
                              <label
                                className="mb-2 block text-xs font-bold text-gray-700"
                                htmlFor="password"
                              >
                                Usage Type
                                <p className=" contents text-sm font-bold text-red-600">
                                  *
                                </p>
                              </label>
                              <select
                                // disabled={ !isBlankString(safReassessmentStaticFloorDetails[floorIndex].uses_type_name) &&
                                // isStringValid(safReassessmentStaticFloorDetails[floorIndex].uses_type_name) ? true : false }
                                // value={JSON.stringify(safNewFormPropertyFloorDetails.from_date_obj)}
                                onChange={(e) =>
                                  handleSAFNewFormPropertyFloorDetailsChange(
                                    e,
                                    floorIndex
                                  )
                                }
                                color="orange"
                                className={`w-full rounded-md border border-gray-500 bg-white p-2 text-gray-500
                                                            shadow-sm outline-none focus:border-orange-500`}
                              >
                                {/* ${ !isBlankString(safReassessmentStaticFloorDetails[floorIndex].uses_type_name) &&
                                                                isStringValid(safReassessmentStaticFloorDetails[floorIndex].uses_type_name) ? 'cursor-not-allowed' : '' } */}
                                <option value="">Select an option</option>
                                {safNewFormAllInputFromAPI.uses_type.length >
                                0 ? (
                                  safNewFormAllInputFromAPI.uses_type.map(
                                    (item, index) => {
                                      const {
                                        id,
                                        uses_type_name,
                                        status,
                                        short_name,
                                      } = item;
                                      const isSelected =
                                        uses_type_name ==
                                        floorObj.uses_type_name;
                                      // const isSelected = uses_type_name
                                      // floorObj.uses_type_name =  uses_type_name
                                      return (
                                        <option
                                          key={index}
                                          selected={isSelected}
                                          value={JSON.stringify(item)}
                                        >
                                          {uses_type_name}
                                        </option>
                                      );
                                    }
                                  )
                                ) : (
                                  <option value="">Loading...</option>
                                )}
                              </select>
                            </div>
                            <div className="mb-4 ml-2 mt-2 min-w-fit max-w-fit">
                              <label
                                className="mb-2 block text-xs font-bold text-gray-700"
                                htmlFor="password"
                              >
                                {safReassessmentData.property_type_id == "3"
                                  ? SUPER
                                  : ``}
                                Build Up Area(In Sq.ft.)
                                <p className="contents text-sm font-bold text-red-600">
                                  *
                                </p>
                              </label>
                              <input
                                // disabled={ !isBlankString(safReassessmentStaticFloorDetails[floorIndex].built_up_area) &&
                                // isStringValid(safReassessmentStaticFloorDetails[floorIndex].built_up_area) ? true : false }
                                onChange={(e) =>
                                  handleSAFNewFormPropertyFloorDetailsChange(
                                    e,
                                    floorIndex
                                  )
                                }
                                value={
                                  !isBlankString(floorObj.built_up_area) &&
                                  isStringValid(floorObj.built_up_area)
                                    ? floorObj.built_up_area
                                    : ""
                                }
                                className={`bg-white-200 text-white-700 w-full cursor-not-allowed appearance-none
                                                            rounded border border-gray-500 px-4 py-2 leading-tight focus:border-2
                                                            focus:border-orange-500 focus:bg-white
                                                            focus:outline-none`}
                                // ${ !isBlankString(safReassessmentStaticFloorDetails[floorIndex].built_up_area) &&
                                //     isStringValid(safReassessmentStaticFloorDetails[floorIndex].built_up_area) ? 'cursor-not-allowed' : '' }
                                id="built_up_area"
                                type="text"
                                placeholder="Build Up Area"
                              />
                            </div>
                          </div>
                          <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex ">
                            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                              <label
                                className="mb-2 block text-xs font-bold text-gray-700"
                                htmlFor="password"
                              >
                                Date From
                                <p className="contents text-sm font-bold text-red-600">
                                  *
                                </p>
                              </label>
                              <select
                                // disabled={ !isBlankString(safReassessmentStaticFloorDetails[floorIndex].from_date) &&
                                // isStringValid(safReassessmentStaticFloorDetails[floorIndex].from_date) ? true : false }
                                // value={JSON.stringify(safNewFormPropertyFloorDetails.from_date_obj)}
                                onChange={(e) =>
                                  handleSAFNewFormPropertyFloorDetailsChange(
                                    e,
                                    floorIndex,
                                    "from_date"
                                  )
                                }
                                color="orange"
                                className={`w-full rounded-md border border-gray-500 bg-white p-2 text-gray-500
                                                            shadow-sm outline-none focus:border-orange-500`}
                              >
                                {/* ${ !isBlankString(safReassessmentStaticFloorDetails[floorIndex].from_date) &&
                                                                isStringValid(safReassessmentStaticFloorDetails[floorIndex].from_date) ? 'cursor-not-allowed' : '' } */}
                                <option value="">Select an option</option>
                                {safNewFormAllInputFromAPI.financial_year
                                  .length > 0 ? (
                                  safNewFormAllInputFromAPI.financial_year.map(
                                    (item, index) => {
                                      const { id, fy_name, status } = item;
                                      const isSelected =
                                        fy_name == floorObj.from_date;
                                      return (
                                        <option
                                          key={index}
                                          selected={isSelected}
                                          value={JSON.stringify(item)}
                                        >
                                          {fy_name}
                                        </option>
                                      );
                                    }
                                  )
                                ) : (
                                  <option value="">Loading...</option>
                                )}
                              </select>
                            </div>
                            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                              <label
                                className="mb-2 block text-xs font-bold text-gray-700"
                                htmlFor="password"
                              >
                                Date UpTo
                                <p className="contents text-sm font-bold text-red-600">
                                  *
                                </p>
                              </label>
                              <select
                                // disabled={ !isBlankString(safReassessmentStaticFloorDetails[floorIndex].to_date) &&
                                // isStringValid(safReassessmentStaticFloorDetails[floorIndex].to_date) ? true : false }
                                // value={JSON.stringify(safNewFormPropertyFloorDetails.from_date_obj)}
                                onChange={(e) =>
                                  handleSAFNewFormPropertyFloorDetailsChange(
                                    e,
                                    floorIndex,
                                    "to_date"
                                  )
                                }
                                color="orange"
                                className={`w-full rounded-md border border-gray-500 bg-white p-2 text-gray-500
                                                            shadow-sm outline-none focus:border-orange-500`}
                              >
                                {/* ${ !isBlankString(safReassessmentStaticFloorDetails[floorIndex].to_date) &&
                                                                isStringValid(safReassessmentStaticFloorDetails[floorIndex].to_date) ? 'cursor-not-allowed' : '' } */}
                                <option value="">Select an option</option>
                                {safNewFormAllInputFromAPI.financial_year
                                  .length > 0 ? (
                                  safNewFormAllInputFromAPI.financial_year.map(
                                    (item, index) => {
                                      const { id, fy_name, status } = item;
                                      const isSelected =
                                        fy_name == floorObj.to_date;
                                      return (
                                        <option
                                          key={index}
                                          selected={isSelected}
                                          value={JSON.stringify(item)}
                                        >
                                          {fy_name}
                                        </option>
                                      );
                                    }
                                  )
                                ) : (
                                  <option value="">Loading...</option>
                                )}
                              </select>
                            </div>
                            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                              <label
                                className="mb-2 block text-xs font-bold text-gray-700"
                                htmlFor="password"
                              >
                                Building Type
                                <p className="contents text-sm font-bold text-red-600">
                                  *
                                </p>
                              </label>
                              <select
                                // disabled={ !isBlankString(safReassessmentStaticFloorDetails[floorIndex].construction_type) &&
                                // isStringValid(safReassessmentStaticFloorDetails[floorIndex].construction_type) ? true : false }
                                // value={JSON.stringify(floorObj.const_type)}
                                onChange={(e) =>
                                  handleSAFNewFormPropertyFloorDetailsChange(
                                    e,
                                    floorIndex,
                                    "to_date"
                                  )
                                }
                                color="orange"
                                className={`w-full rounded-md border border-gray-500 bg-white p-2 text-gray-500
                                                            shadow-sm outline-none focus:border-orange-500`}
                              >
                                {/* ${ !isBlankString(safReassessmentStaticFloorDetails[floorIndex].construction_type) &&
                                                                isStringValid(safReassessmentStaticFloorDetails[floorIndex].construction_type) ? 'cursor-not-allowed' : '' } */}
                                <option value="">Select an option</option>
                                {safNewFormAllInputFromAPI.building_type
                                  .length > 0 ? (
                                  safNewFormAllInputFromAPI.building_type.map(
                                    (item, index) => {
                                      const { id, const_type, status } = item;
                                      const isSelected =
                                        const_type ==
                                        floorObj.construction_type;
                                      // console.log("const_type is selected+++++++++")
                                      // console.log(`${const_type}=====${floorObj.const_type}`)
                                      // console.log(isSelected)
                                      return (
                                        <option
                                          key={index}
                                          selected={isSelected}
                                          value={JSON.stringify(item)}
                                        >
                                          {const_type}
                                        </option>
                                      );
                                    }
                                  )
                                ) : (
                                  <option value="">Loading...</option>
                                )}
                              </select>
                            </div>
                            {/* <div className="mb-4 ml-3 mt-2 flex min-w-fit max-w-fit">
                                                        {
                                                            floorIndex == floorArr.length - 1 ?
                                                                (<Button onClick={() => handleFloorAddOrDelete("ADD")}
                                                                    color="green"
                                                                    className='w-16 px-2 mr-1 py-1 bg-green-700 text-white text-xs rounded-md custom_button_add'>
                                                                    <h3>Add</h3>
                                                                </Button>) : null
                                                        }
                                                        {
                                                            floorArr.length > 1 ? (<Button onClick={() => handleFloorAddOrDelete("DELETE", floorIndex)}
                                                                color="red" className='w-16 px-2 mr-1 py-1 text-white text-xs bg-red-700 rounded-md'>
                                                                <h3>DELETE</h3>
                                                            </Button>)
                                                                : null
                                                        }
                                                    </div> */}
                          </div>
                        </div>
                      );
                    }
                  )
                }
              </div>

              {/* This part is for new floor array which can be added by user */}
              <div className="m-2 mt-4 rounded-non bg-white px-0 pb-4 pt-0 lg:max-w-full">
                <nav className="navcustomproperty bg-orange-800 relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-red-700 h-10">
                  <h2 className="text-center text-sm font-semibold text-white">
                    New Floor Details for Re-Assessment
                  </h2>
                </nav>
                <InfoMessageCustom
                  text_size={`xs`}
                  message={`Note: If you are not entering any new floor details then please leave all fields empty !`}
                />
                {safNewFormValidator.isFloorDetailsValid == false ? (
                  <p className="m-3 text-xs font-bold text-red-600">
                    {safInputValidatorMsgList.validPropertyFloorDetailsMsg}
                  </p>
                ) : null}
                {safNewFormValidator.isSelectedFloorValid == false ? (
                  <p className="m-3 text-xs font-bold text-red-600">
                    {safInputValidatorMsgList.validPropertyFloorSelectMsg}
                  </p>
                ) : null}
                {safNewFormValidator.isAnyFloorDetailsValueEmpty == false ? (
                  <p className="m-3 text-xs font-bold text-red-600">
                    {safInputValidatorMsgList.validPropertyFloorSelectMsg}
                  </p>
                ) : null}
                {safNewFormValidator.isAnyFloorContainsDuplicateFloor ==
                false ? (
                  <p className="m-3 text-xs font-bold text-red-600">
                    {safInputValidatorMsgList.validPropertyUniqueFloorMsg}
                  </p>
                ) : null}
                {
                  //This part is rendering the new floor details array
                  /**
                   * ***************************************************************
                   */
                  safNewFormPropertyFloorDetailsNewAdd.map(
                    (floorObj, floorIndex, floorArr) => {
                      // console.log("floor ara")
                      console.log(JSON.stringify(floorObj.from_date_obj));
                      return (
                        <div className="border-none" key={floorIndex}>
                          <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex ">
                            <div className="mb-4 ml-3 mr-2 mt-2 min-w-fit max-w-fit">
                              <label
                                className="mb-2 block text-xs font-bold text-gray-700"
                                htmlFor="password"
                              >
                                Floor No.
                                <p className="contents text-sm font-bold text-red-600">
                                  *
                                </p>
                              </label>
                              <select
                                // value={JSON.stringify(safNewFormPropertyFloorDetails.from_date_obj)}
                                onChange={(e) =>
                                  handleSAFNewFormPropertyFloorDetailsChangeForNewAdd(
                                    e,
                                    floorIndex
                                  )
                                }
                                color="orange"
                                className="w-full rounded-md border border-gray-500 bg-white p-2 text-gray-500 shadow-sm outline-none focus:border-orange-500 "
                              >
                                <option value="">Select an option</option>
                                {safNewFormAllInputFromAPI.floor.length > 0 ? (
                                  safNewFormAllInputFromAPI.floor.map(
                                    (item, index) => {
                                      const {
                                        id,
                                        floor_name,
                                        status,
                                        discount_per,
                                        short_name,
                                      } = item;
                                      const isSelected =
                                        floor_name == floorObj.floor_name;
                                      return (
                                        <option
                                          key={index}
                                          selected={isSelected}
                                          value={JSON.stringify(item)}
                                        >
                                          {floor_name}
                                        </option>
                                      );
                                    }
                                  )
                                ) : (
                                  <option value="">Loading...</option>
                                )}
                              </select>
                            </div>

                            <div className="mb-4 ml-2 mt-2 min-w-fit max-w-fit">
                              <label
                                className="mb-2 block text-xs font-bold text-gray-700"
                                htmlFor="password"
                              >
                                Ocuupancy Type
                                <p className=" contents text-sm font-bold text-red-600">
                                  *
                                </p>
                              </label>
                              <select
                                // value={JSON.stringify(safNewFormPropertyFloorDetails.from_date_obj)}
                                onChange={(e) =>
                                  handleSAFNewFormPropertyFloorDetailsChangeForNewAdd(
                                    e,
                                    floorIndex
                                  )
                                }
                                color="orange"
                                className="w-full rounded-md border border-gray-500 bg-white p-2 text-gray-500 shadow-sm outline-none focus:border-orange-500 "
                              >
                                <option value="">Select an option</option>
                                {safNewFormAllInputFromAPI.occupation_type
                                  .length > 0 ? (
                                  safNewFormAllInputFromAPI.occupation_type.map(
                                    (item, index) => {
                                      const { id, occup_type, status } = item;
                                      const isSelected =
                                        occup_type == floorObj.occupancy_type;
                                      return (
                                        <option
                                          key={index}
                                          selected={isSelected}
                                          value={JSON.stringify(item)}
                                        >
                                          {occup_type}
                                        </option>
                                      );
                                    }
                                  )
                                ) : (
                                  <option value="">Loading...</option>
                                )}
                              </select>
                            </div>
                            <div className="mb-4 ml-2 mt-2 min-w-fit max-w-fit">
                              <label
                                className="mb-2 block text-xs font-bold text-gray-700"
                                htmlFor="password"
                              >
                                Usage Type
                                <p className=" contents text-sm font-bold text-red-600">
                                  *
                                </p>
                              </label>
                              <select
                                // value={JSON.stringify(safNewFormPropertyFloorDetails.from_date_obj)}
                                onChange={(e) =>
                                  handleSAFNewFormPropertyFloorDetailsChangeForNewAdd(
                                    e,
                                    floorIndex
                                  )
                                }
                                color="orange"
                                className="w-full rounded-md border border-gray-500 bg-white p-2 text-gray-500 shadow-sm outline-none focus:border-orange-500 "
                              >
                                <option value="">Select an option</option>
                                {safNewFormAllInputFromAPI.uses_type.length >
                                0 ? (
                                  safNewFormAllInputFromAPI.uses_type.map(
                                    (item, index) => {
                                      const {
                                        id,
                                        uses_type_name,
                                        status,
                                        short_name,
                                      } = item;
                                      const isSelected =
                                        uses_type_name ==
                                        floorObj.uses_type_name;
                                      return (
                                        <option
                                          key={index}
                                          selected={isSelected}
                                          value={JSON.stringify(item)}
                                        >
                                          {uses_type_name}
                                        </option>
                                      );
                                    }
                                  )
                                ) : (
                                  <option value="">Loading...</option>
                                )}
                              </select>
                            </div>
                            <div className="mb-4 ml-2 mt-2 min-w-fit max-w-fit">
                              <label
                                className="mb-2 block text-xs font-bold text-gray-700"
                                htmlFor="password"
                              >
                                Build Up Area(In Sq.ft.)
                                <p className="contents text-sm font-bold text-red-600">
                                  *
                                </p>
                              </label>
                              <input
                                onChange={(e) =>
                                  handleSAFNewFormPropertyFloorDetailsChangeForNewAdd(
                                    e,
                                    floorIndex
                                  )
                                }
                                value={floorObj.built_up_area}
                                className="bg-white-200 text-white-700 w-full appearance-none rounded border border-gray-500 px-4 py-2 leading-tight focus:border-2 focus:border-orange-500 focus:bg-white focus:outline-none"
                                id="built_up_area"
                                type="text"
                                placeholder="Build Up Area"
                              />
                            </div>
                          </div>
                          <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex ">
                            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                              <label
                                className="mb-2 block text-xs font-bold text-gray-700"
                                htmlFor="password"
                              >
                                Date From
                                <p className="contents text-sm font-bold text-red-600">
                                  *
                                </p>
                              </label>
                              <select
                                // value={JSON.stringify(safNewFormPropertyFloorDetails.from_date_obj)}
                                onChange={(e) =>
                                  handleSAFNewFormPropertyFloorDetailsChangeForNewAdd(
                                    e,
                                    floorIndex,
                                    "from_date"
                                  )
                                }
                                color="orange"
                                className="w-full rounded-md border border-gray-500 bg-white p-2 text-gray-500 shadow-sm outline-none focus:border-blue-500 "
                              >
                                <option value="">Select an option</option>
                                {safNewFormAllInputFromAPI.financial_year
                                  .length > 0 ? (
                                  safNewFormAllInputFromAPI.financial_year.map(
                                    (item, index) => {
                                      const { id, fy_name, status } = item;
                                      const isSelected =
                                        fy_name == floorObj.from_date;
                                      return (
                                        <option
                                          key={index}
                                          selected={isSelected}
                                          value={JSON.stringify(item)}
                                        >
                                          {fy_name}
                                        </option>
                                      );
                                    }
                                  )
                                ) : (
                                  <option value="">Loading...</option>
                                )}
                              </select>
                            </div>
                            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                              <label
                                className="mb-2 block text-xs font-bold text-gray-700"
                                htmlFor="password"
                              >
                                Date UpTo
                                {/* <p className='contents text-red-600 text-sm font-bold'>*</p> */}
                              </label>
                              <select
                                onChange={(e) =>
                                  handleSAFNewFormPropertyFloorDetailsChangeForNewAdd(
                                    e,
                                    floorIndex,
                                    "to_date"
                                  )
                                }
                                color="orange"
                                className="w-full rounded-md border border-gray-500 bg-white p-2 text-gray-500 shadow-sm outline-none focus:border-orange-500"
                              >
                                <option
                                  selected={true}
                                  value={JSON.stringify(
                                    safNewFormAllInputFromAPI.financial_year[
                                      safNewFormAllInputFromAPI.financial_year
                                        .length - 1
                                    ]?.fy_name
                                  )}
                                >
                                  Select an option
                                </option>
                                {safNewFormAllInputFromAPI.financial_year
                                  .length > 0 ? (
                                  safNewFormAllInputFromAPI.financial_year.map(
                                    (item, index) => {
                                      const { id, fy_name, status } = item;
                                      const isSelected =
                                        fy_name === floorObj.to_date;
                                      return (
                                        <option
                                          key={index}
                                          selected={isSelected}
                                          value={JSON.stringify(item)}
                                        >
                                          {fy_name}
                                        </option>
                                      );
                                    }
                                  )
                                ) : (
                                  <option value="">Loading...</option>
                                )}
                              </select>
                            </div>
                            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                              <label
                                className="mb-2 block text-xs font-bold text-gray-700"
                                htmlFor="password"
                              >
                                Building Type
                                <p className="contents text-sm font-bold text-red-600">
                                  *
                                </p>
                              </label>
                              <select
                                // value={JSON.stringify(floorObj.const_type)}
                                onChange={(e) =>
                                  handleSAFNewFormPropertyFloorDetailsChangeForNewAdd(
                                    e,
                                    floorIndex,
                                    "to_date"
                                  )
                                }
                                color="orange"
                                className="w-full rounded-md border border-gray-500 bg-white p-2 text-gray-500 shadow-sm outline-none focus:border-orange-500 "
                              >
                                <option value="">Select an option</option>
                                {safNewFormAllInputFromAPI.building_type
                                  .length > 0 ? (
                                  safNewFormAllInputFromAPI.building_type.map(
                                    (item, index) => {
                                      const { id, const_type, status } = item;
                                      const isSelected =
                                        const_type ==
                                        floorObj.construction_type;
                                      // console.log("const_type is selected+++++++++")
                                      // console.log(`${const_type}=====${floorObj.const_type}`)
                                      // console.log(isSelected)
                                      return (
                                        <option
                                          key={index}
                                          selected={isSelected}
                                          value={JSON.stringify(item)}
                                        >
                                          {const_type}
                                        </option>
                                      );
                                    }
                                  )
                                ) : (
                                  <option value="">Loading...</option>
                                )}
                              </select>
                            </div>
                            <div className="mb-4 ml-3 mt-2 flex min-w-fit max-w-fit">
                              {floorIndex == floorArr.length - 1 ? (
                                <Button
                                  onClick={() => handleFloorAddOrDelete("ADD")}
                                  color="green"
                                  className="custom_button_add mr-1 w-16 rounded-md bg-green-700 px-2 py-1 text-xs text-white"
                                >
                                  <h3>Add</h3>
                                </Button>
                              ) : null}
                              {floorArr.length > 1 ? (
                                <Button
                                  onClick={() =>
                                    handleFloorAddOrDelete("DELETE", floorIndex)
                                  }
                                  color="red"
                                  className="mr-1 w-16 rounded-md bg-red-700 px-2 py-1 text-xs text-white"
                                >
                                  <h3>DELETE</h3>
                                </Button>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )
                }
              </div>
            </div>
            <div className="mb-6"></div>
            <div className="m-4 mt-4 rounded-md bg-white px-0 pb-4 pt-0 lg:max-w-full">
              <nav className="navcustomproperty bg-orange-800 relative mb-1 flex flex-wrap items-center justify-between rounded-md py-1 pl-2 pr-0 ring-1 ring-red-800 h-10">
                <h2 className="text-center text-sm font-semibold text-white">
                  Others Details
                </h2>
              </nav>
              {safNewFormValidator.isOtherDetailsValid == false ? (
                <p className="m-3 text-xs font-bold text-red-600">
                  {safInputValidatorMsgList.validPropertOtherDetailsMsg}
                </p>
              ) : null}
              {/* <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4">
                                <div className="flex justify-center">
                                    <div className="mb-4 ml-3 mt-2 lg:w-96  gap-4">
                                        <label htmlFor="formFile" className="form-label inline-block mb-0 text-xs font-bold text-gray-900">
                                            Owner's Image(jpg,png,jpeg)
                                        </label>
                                        <input onChange={handleFileChange}
                                            className="text-xs form-control
                                            block
                                            w-full
                                            px-3
                                            py-2
                                            font-normal
                                            text-gray-900
                                            bg-white bg-clip-padding
                                            border border-solid border-gray-400
                                            rounded
                                            transition
                                            ease-in-out
                                            m-0
                                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file"
                                            id="owner_file" />
                                    </div>
                                </div>
                                <div className="mb-4 ml-3 mt-2 flex min-w-fit max-w-fit gap-4 ">
                                    <Button onClick={uploadFile}
                                        id='owner_file_btn'
                                        color="green" type='button'
                                        className='h-6 w-16 px-2 py-1 bg-green-700 rounded custom_button_add'>Upload</Button>

                                    {
                                        isOwnerImageUploaded == true ? (
                                            <p className="m-3 text-green-700 text-xs font-bold">
                                                Owner document has been successfully uploaded
                                            </p>
                                        ) : isOwnerImageUploaded == false ? (<p className="m-3 text-red-700 text-xs font-bold">
                                            Something went wrong! Please make sure to enter property id, if issue persists contact support team.
                                        </p>) : null
                                    }
                                </div>


                            </div> */}
              {/* <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4">
                                <div className="flex justify-center">
                                    <div className="mb-4 ml-3 mt-2 lg:w-96  gap-4">
                                        <label htmlFor="formFile" className="form-label inline-block mb-0 text-xs font-bold text-gray-900">Property Documents(jpg,png,jpeg,pdf)
                                            <p className='contents text-red-600 text-sm font-bold'>*</p>
                                        </label>
                                        <input onChange={handleFileChange}
                                            className="text-xs  form-control
                                    block
                                    w-full
                                    px-3
                                    py-2
                                    font-normal
                                    text-gray-900
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-400
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file"
                                            id="floor_files" multiple />
                                    </div>
                                </div>


                                <script type="text/javascript">
                                    const checkbox = document.getElementById("flexCheckIndeterminate");
                                    checkbox.indeterminate = true;
                                </script>
                                <div className="mb-4 ml-3 mt-2 flex min-w-fit max-w-fit gap-4 ">
                                    <Button onClick={uploadFile}
                                        id='floor_files_btn'
                                        color="green" type='button'
                                        className='h-6 w-16 px-2 py-1 bg-green-700 rounded custom_button_add'>Upload</Button>

                                </div>
                                {
                                    isFloorImageUploaded == true ? (
                                        <p className="m-3 text-green-700 text-xs font-bold">
                                            Floor documents have been successfully uploaded
                                        </p>
                                    ) : isFloorImageUploaded == false ? (<p className="m-3 text-red-700 text-xs font-bold">
                                        Something went wrong! Please make sure to enter property id, if issue persists contact support team.
                                    </p>) : null
                                }

                            </div> */}

              <div className="min-w-fit max-w-fit items-end gap-4 md:flex-1 lg:flex">
                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                  <label
                    className="mb-2 block text-xs font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Does Property Have Mobile Tower?
                    <p className="contents text-sm font-bold text-red-600">*</p>
                  </label>
                  {/* <Select onChange={handleSAFNewFormOtherDetailsChange}
                                        label="Select" className='lg:w-72 pl-2 pr-3 py-1 font-bold text-sm text-gray-900'>
                                        <Option value='mobiletower_Yes' >Yes</Option>
                                        <Option value='mobiletower_No' >No</Option>
                                    </Select> */}
                  <select
                    disabled={
                      existingSAFData?.propertyMasterBean[0]?.is_mobile_tower ==
                      "Yes"
                    }
                    id="isMobileTower"
                    onChange={handleSAFReassessmentDetailsChange}
                    className={`block w-56 w-full rounded-lg border border-gray-500 bg-gray-50
                                    p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700
                                    dark:text-white dark:placeholder-gray-400 dark:focus:border-orange-500 dark:focus:ring-red-500
                                    ${
                                      existingSAFData?.propertyMasterBean[0]
                                        ?.is_mobile_tower == "Yes"
                                        ? `cursor-not-allowed`
                                        : ``
                                    }
                                    ${
                                      safNewFormValidator.isPropertyTypeValid ==
                                      false
                                        ? `border-red-900`
                                        : ``
                                    }`}
                  >
                    <option
                      value="Yes"
                      selected={safReassessmentData.isMobileTower == "Yes"}
                    >
                      Yes
                    </option>
                    <option
                      value="No"
                      selected={safReassessmentData.isMobileTower == "No"}
                    >
                      No
                    </option>
                  </select>
                </div>
              </div>

              <div className="custom-checkbox min-w-fit max-w-fit items-end gap-4 md:flex-1 lg:flex">
                <Checkbox
                  disabled={
                    existingSAFData?.propertyMasterBean[0]?.rain_harvest ===
                    "Yes"
                  }
                  id="rain_harvest"
                  checked={safReassessmentData.rain_harvest == "Yes"}
                  onChange={handleSAFReassessmentDetailsChange}
                  color="teal"
                  className={`custom-checkbox ${
                    existingSAFData?.propertyMasterBean[0]?.rain_harvest ==
                    "Yes"
                      ? `cursor-not-allowed`
                      : ``
                  }`}
                  label="Does the property have Rainwater Harvesting Provision?If Yes then select Checkbox"
                />
              </div>

              {safReassessmentData?.rain_harvest == "Yes" ? (
                <>
                  <div className="min-w-fit max-w-fit items-end gap-4 md:flex-1 lg:flex">
                    {" "}
                    <div className="flex justify-center">
                      <div className="mb-4 ml-3 mt-2 gap-4  lg:w-96">
                        <label
                          htmlFor="formFile"
                          className="form-label mb-0 inline-block text-xs font-bold text-gray-900"
                        >
                          Rainwater Harvest Docs(jpg,png,jpeg,pdf)
                          {/* <p className='contents text-red-600 text-sm font-bold'>*</p> */}
                        </label>
                        <input
                          onChange={handleFileChange}
                          className="form-control m-0
                                            block
                                            w-full
                                            rounded
                                            border
                                            border-solid
                                            border-gray-500
                                            bg-white bg-clip-padding
                                            px-3 py-2 text-xs
                                            font-normal
                                            text-gray-900
                                            transition
                                            ease-in-out
                                            focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                          type="file"
                          id="rain_water_harvest_file"
                        />
                      </div>
                    </div>
                    <div className="mb-4 ml-3 mt-2 flex min-w-fit max-w-fit gap-4 ">
                      <Button
                        onClick={uploadFile}
                        id="rain_water_harvest_file_btn"
                        color="green"
                        type="button"
                        className="custom_button_add h-6 w-16 rounded bg-green-700 px-2 py-1"
                      >
                        Upload
                      </Button>
                    </div>
                    {isRainWaterFileUploaded == true ? (
                      <p className="m-3 text-xs font-bold text-green-700">
                        Rain water harvest document has been successfully
                        uploaded
                      </p>
                    ) : isRainWaterFileUploaded == false ? (
                      <p className="m-3 text-xs font-bold text-red-700">
                        Something went wrong! Please make sure to enter property
                        id, if issue persists contact support team.
                      </p>
                    ) : null}
                  </div>
                </>
              ) : null}

              <div className="custom-checkbox min-w-fit max-w-fit items-end gap-4 md:flex-1 lg:flex">
                <Checkbox
                  disabled={
                    existingSAFData?.propertyMasterBean[0]?.widow_case ==
                      "Yes" ||
                    existingSAFData?.propertyMasterBean[0].isdp_case == "Yes" ||
                    existingSAFData?.propertyMasterBean[0].phys_disable == "Yes"
                  }
                  id="is_widow"
                  checked={safReassessmentData.is_widow == "Yes"}
                  onChange={handleSAFReassessmentDetailsChange}
                  color="teal"
                  className={`custom-checkbox ${
                    existingSAFData?.propertyMasterBean[0]?.widow_case ==
                      "Yes" ||
                    existingSAFData?.propertyMasterBean[0].isdp_case == "Yes" ||
                    existingSAFData?.propertyMasterBean[0].phys_disable == "Yes"
                      ? `cursor-not-allowed`
                      : ``
                  }`}
                  label="Does Property belongs to Widow/Abandoment/Mentally Disabled/Visually Impaired/Ex-Army?If Yes then select Checkbox"
                />
              </div>

              <div className="custom-checkbox min-w-fit max-w-fit items-end gap-4 md:flex-1 lg:flex">
                <Checkbox
                  disabled={
                    existingSAFData?.propertyMasterBean[0]?.widow_case ==
                      "Yes" ||
                    existingSAFData?.propertyMasterBean[0].isdp_case == "Yes" ||
                    existingSAFData?.propertyMasterBean[0].phys_disable == "Yes"
                  }
                  id="is_handicapped"
                  checked={safReassessmentData.is_handicapped === "Yes"}
                  onChange={handleSAFReassessmentDetailsChange}
                  color="teal"
                  className={`custom-checkbox
                                    ${
                                      existingSAFData?.propertyMasterBean[0]
                                        ?.widow_case == "Yes" ||
                                      existingSAFData?.propertyMasterBean[0]
                                        .isdp_case == "Yes" ||
                                      existingSAFData?.propertyMasterBean[0]
                                        .phys_disable == "Yes"
                                        ? `cursor-not-allowed`
                                        : ``
                                    }`}
                  label="Does Property belong to Physically Disabled? If Yes then select this checkbox"
                />
              </div>

              <div className="custom-checkbox min-w-fit max-w-fit items-end gap-4 md:flex-1 lg:flex">
                <Checkbox
                  disabled={
                    existingSAFData?.propertyMasterBean[0]?.widow_case ==
                      "Yes" ||
                    existingSAFData?.propertyMasterBean[0].isdp_case == "Yes" ||
                    existingSAFData?.propertyMasterBean[0].phys_disable == "Yes"
                  }
                  id="is_isdp"
                  checked={safReassessmentData.is_isdp === "Yes"}
                  onChange={handleSAFReassessmentDetailsChange}
                  color="teal"
                  className={`custom-checkbox ${
                    existingSAFData?.propertyMasterBean[0]?.widow_case ==
                      "Yes" ||
                    existingSAFData?.propertyMasterBean[0].isdp_case == "Yes" ||
                    existingSAFData?.propertyMasterBean[0].phys_disable == "Yes"
                      ? `cursor-not-allowed`
                      : ``
                  }`}
                  label="If Property belongs to IHSDP? If Yes then select this checkbox"
                />
              </div>

              <div className="custom-checkbox min-w-fit max-w-fit items-end gap-4 md:flex-1 lg:flex">
                <Checkbox
                  disabled={
                    existingSAFData?.propertyMasterBean[0].school_case == "Yes"
                  }
                  id="is_school"
                  checked={safReassessmentData.is_school === "Yes"}
                  onChange={handleSAFReassessmentDetailsChange}
                  color="teal"
                  className={`custom-checkbox ${
                    existingSAFData?.propertyMasterBean[0].school_case == "Yes"
                      ? `cursor-not-allowed`
                      : ``
                  }`}
                  label="If School? If Yes then select this checkbox"
                />
              </div>

              <div className="custom-checkbox min-w-fit max-w-fit items-end gap-4 md:flex-1 lg:flex">
                <Checkbox
                  disabled={
                    existingSAFData?.propertyMasterBean[0].complex_case == "Yes"
                  }
                  id="is_complex"
                  checked={safReassessmentData.is_complex === "Yes"}
                  onChange={handleSAFReassessmentDetailsChange}
                  color="teal"
                  className={`custom-checkbox ${
                    existingSAFData?.propertyMasterBean[0].complex_case == "Yes"
                      ? `cursor-not-allowed`
                      : ``
                  }`}
                  label="If Complex? If Yes then select this checkbox"
                />
              </div>
            </div>

            <div className="mb-6"></div>
          </div>
        </form>
        {showFloatingMessage === true ? (
          isSAFFormValid == true ? (
            <FloatingMessage
              color="green"
              closeFloatingMessage={closeFloatingMessage}
              showMessage={true}
              message="All inputs in the form have been validated, now you can submit the form!"
            />
          ) : isSAFFormValid == false ? (
            <FloatingMessage
              color="red"
              closeFloatingMessage={closeFloatingMessage}
              showMessage={true}
              message="Some inputs in the form is not valid! Please re-verify the details and validate again!"
            />
          ) : null
        ) : null}

        {/* {
                    isSAFFormValid == false ? (
                        <FloatingMessage
                            color='red'
                            closeFloatingMessage={closeFloatingMessage}
                            showMessage={true}
                            message='Some inputs in the form is not valid! Please re-verify the details and validate again!' />
                    ) : null
                }

                {
                    isSAFFormValid == true ? (
                        <FloatingMessage
                            color='green'
                            closeFloatingMessage={closeFloatingMessage}
                            showMessage={true}
                            message='All inputs in the form have been validated, now you can submit the form!' />
                    ) : null
                } */}
        {isSAFReAssessmentSubmissionSuccess == false ? (
          <FloatingMessage
            color="false"
            closeFloatingMessage={closeFloatingMessage}
            showMessage={true}
            message="Something went wrong during form submission, please try again !"
          />
        ) : null}
        {isSAFReAssessmentSubmissionLoading == true ? (
          <div className="m-auto h-24 w-24">
            <ColorRing
              visible={true}
              height="40"
              width="40"
              colors={["#2fa158", "#2fa158", "#2fa158", "#2fa158", "#2fa158"]}
            />
          </div>
        ) : null}
        <div className="m-4 mt-4 rounded-none bg-white px-0 pb-4 pt-0 lg:max-w-full">
          <div className="container mx-0 flex min-w-full flex-col items-center px-10 py-2">
            <div className="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
              {isPublicSAF ? (
                <CustomBackButton
                  showCustomBackButton={true}
                  switchOnPrevModalNOffCurrModal={
                    switchOnPrevModalNOffCurrModal
                  }
                  currModal={currModal}
                  prevModal={prevModal}
                />
              ) : null}
              <button
                onClick={handleSAFNewFormValidation}
                className="mx-4 mb-2 h-8 w-36 transform rounded-md bg-green-400 px-4 py-1 tracking-wide text-white transition-colors duration-200 hover:bg-green-700 focus:bg-green-400 focus:outline-none"
              >
                Validate
              </button>
              <button
                disabled={!isSAFFormValid}
                onClick={() => handleSAFReassessmentSubmission()}
                className={`mx-4 mb-2 h-8 w-36  transform rounded-md bg-green-400 px-4 py-1 tracking-wide text-white transition-colors duration-200 hover:bg-green-700 focus:bg-green-400 focus:outline-none ${
                  !isSAFFormValid ? "cursor-not-allowed" : ""
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : isExistingSAFDataLoaded == null ? (
    <div>
      <button
        onClick={() => switchOnPrevModalNOffCurrModal(currModal, prevModal)}
        className="mx-4 my-0 h-8 w-24 transform rounded-md bg-green-400 px-0 py-0 text-sm font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-green-700 focus:bg-green-400 focus:outline-none"
      >
        Back
      </button>
      <div className="m-auto h-16 w-16">
        <ColorRing
          visible={isExistingSAFDataLoaded == null}
          height="40"
          width="40"
          colors={["#2fa158", "#2fa158", "#2fa158", "#2fa158", "#2fa158"]}
        />
      </div>
    </div>
  ) : (
    <>
      <p>
        Unable to existing Self Assessment Form data for Re-assessment, please
        try again.
      </p>
      <button
        onClick={() => switchOnPrevModalNOffCurrModal(currModal, prevModal)}
        className="mx-4 my-0 h-8 w-24 transform rounded-md bg-green-400 px-0 py-0 text-sm font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-green-700 focus:bg-green-400 focus:outline-none"
      >
        Back
      </button>
    </>
  );
}

export default SafReassessmentEdit;
