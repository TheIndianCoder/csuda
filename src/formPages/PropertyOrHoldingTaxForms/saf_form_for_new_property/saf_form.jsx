import React, { Component, useEffect, useState } from 'react'
import { Select, Option, Button, Textarea, Checkbox, Tooltip, Switch } from "@material-tailwind/react";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import CustomBackButton from './customBackButton';
import { districtData } from '../../../Dashboard/data/district-list'
import { safInputValidatorMsgList, safInputStateToValidatorMapping } from '../../../Dashboard/data/saf-input-validator-list'
import { getCookieByName } from '@/utils/RequireAuth';
import { isBlankString, isStringContainOnlyDigits, isStringContainsSpecialChar, validateSAFNewForm } from '@/utils/formValidatorUtils';
import FloatingMessage from '@/utils/floatingMessage';
import { ColorRing } from 'react-loader-spinner';

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL 
let floorStack = [] 
let finalReqObjForSafNewEntry = {}

export function SAF_Form(props) {
    const { showSAFNewFormModal, switchOnNextModalNOffCurrModal, nextModal, currModal,
        switchOnPrevModalNOffCurrModal, prevModal, setPropertyId } = props
    const currUrl = window.location.href.toLowerCase()
    const isPublicSAF = currUrl.includes("dashboard") ? false : true
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
    })
    const [safNewFormValidator, setSAFNewFormValidator] = useState({
        //isBuildingConstPeriodFromValid: null, isBuildingConstPeriodToValid: null,
        isPropIdValid: null, isZoneValid: null, isWardValid: null, isEntryTypeValid: null, isOwnerHonorificValid: null,
        isOwnerNameValid: null, isOwnerGenderValid: null, isOwnerGuardianNameValid: null, isOwnerRelationValid: null,
        isOwnerMobileNumValid: null, isPlotAreaValid: null, isOwnerAadharValid: null, isPlotNumValid: null, 
        isKhataNumValid: null, isPropDistrictValid: null, isPropPinValid: null, isPropMohallaValid:null,
        isPropAddressValid: null,  isPropCityValid: null, isOwnerEmailValid: null, isOwnerPanValid: null,
        isPropertyTypeValid: null, isRoadTypeValid: null, isOtherDetailsValid: null,
    })
    const [isSAFFormValid, setIsSAFFormValid] = useState(null)
    const [isSAFFormSubmissionLoading, setIsSAFFormSubmissionLoading] = useState(null)
    const [isSAFFormSubmissionSuccess, setIsSAFFormSubmissionSuccess] = useState(null)
    const [showFloatingMessage, setShowFloatingMessage] = useState(null)
    const [isSAFNewFormInitialRender, setIsSAFNewFormInitialRender] = useState(true)
    // const [safNewFormValidators]
    /**
     * SAF new form basic details like entry type and all that
     */
    const [safNewFormBasicDetails, setSafNewFormBasicDetails] = useState({
        prop_id: "",
        zone_id: "",
        ward_id: "",
        entry_type_id: "1",
        entry_type_name: "New Assessment",
        old_property_no: "",
    })
    const handleSAFNewFormBasicDetails = (event) => {
        setShowFloatingMessage(false)
        console.log(safNewFormBasicDetails)
        // console.log(event)
        if (event?.target?.id) {
            if (event.target.id == "prop_id") {
                setSafNewFormBasicDetails((prevState) => {
                    return {
                        ...prevState,
                        [event.target.id]: event.target.value
                    }
                })
                setSAFNewFormValidator(prevState => { return { ...prevState, [safInputStateToValidatorMapping[event.target.id]]: null } })
            } else if (event.target.id == "old_property_no") {
                setSafNewFormBasicDetails((prevState) => {
                    return {
                        ...prevState,
                        [event.target.id]: event.target.value
                    }
                })
            }
        } else if (event.toString().includes("zone_name")) {
            let zoneItem = JSON.parse(event)
            // console.log(zoneItem)
            let entryType = {}
            safNewFormAllInputFromAPI.entry_type.every(entryItem => {
                if (entryItem.entry_type == "New Assessment") { entryType = entryItem; return false }
                return true
            })
            setSafNewFormBasicDetails((prevState) => {
                return {
                    ...prevState,
                    zone_id: zoneItem.id,
                    entry_type_id: entryType.id,
                    entry_type_name: entryType.entry_type
                }
            })
            setSAFNewFormValidator(prevState => { return { ...prevState, [safInputStateToValidatorMapping['zone_id']]: null } })
        } else if (event.toString().includes("area_name")) {
            let wardItem = JSON.parse(event)
            // console.log(wardItem)
            setSafNewFormBasicDetails((prevState) => {
                return {
                    ...prevState,
                    ward_id: wardItem.id
                }
            })
            setSAFNewFormValidator(prevState => { return { ...prevState, [safInputStateToValidatorMapping['ward_id']]: null } })
        } else if (event.toString().includes("entry_type")) {
            let entryItem = JSON.parse(event)
            // console.log(entryItem)
            setSafNewFormBasicDetails((prevState) => {
                return {
                    ...prevState,
                    entry_type_id: entryItem.id,
                    entry_type_name: entryItem.entry_type
                }
            })
            setSAFNewFormValidator(prevState => { return { ...prevState, [safInputStateToValidatorMapping['entry_type_id']]: null } })
        }

    }
    //============================================================
    /**
     * SAF new form owner details
     */
    const [safNewFormOwnerPersonalDetails, setSafNewFormOwnerPersonalDetails] = useState({
        owner_title: "",
        prop_owner_name: "",
        owner_gender: "",
        father_name: "",
        owner_relation: "",
        mobile_no: "",
        aadhar: "",
        panno: "",
        email: "",
    })
    const handleSAFNewFormOwnerDetailsChange = (event) => {
        setShowFloatingMessage(false)
        console.log(safNewFormOwnerPersonalDetails)
        // console.log(event)
        if (event?.target?.id) {
            setSafNewFormOwnerPersonalDetails((prevState) => {
                return {
                    ...prevState,
                    [event.target.id]: event.target.value
                }
            })
            setSAFNewFormValidator(prevState => { return { ...prevState, [safInputStateToValidatorMapping[event.target.id]]: null } })
        } else if (event.toString().includes("title")) {
            let title = event.toString().split("_")[1]
            // console.log(zoneItem)
            setSafNewFormOwnerPersonalDetails((prevState) => {
                return {
                    ...prevState,
                    owner_title: title
                }
            })
            setSAFNewFormValidator(prevState => { return { ...prevState, [safInputStateToValidatorMapping['owner_title']]: null } })
        } else if (event.toString().includes("gender")) {
            let gender = event.toString().split("_")[1]
            // console.log(zoneItem)
            setSafNewFormOwnerPersonalDetails((prevState) => {
                return {
                    ...prevState,
                    owner_gender: gender
                }
            })
            setSAFNewFormValidator(prevState => { return { ...prevState, [safInputStateToValidatorMapping['owner_gender']]: null } })
        } else if (event.toString().includes("relation")) {
            let relation = event.toString().split("_")[1]
            // console.log(zoneItem)
            setSafNewFormOwnerPersonalDetails((prevState) => {
                return {
                    ...prevState,
                    owner_relation: relation
                }
            })
            setSAFNewFormValidator(prevState => { return { ...prevState, [safInputStateToValidatorMapping['owner_relation']]: null } })
        }
    }
    //===============================================================
    /**
     * SAF new form building construction period calculation
     */
    const [safNewFormOwnerBuildingConstPeriod, setSafNewFormOwnerBuildingConstPeriod] = useState({
        prop_age_count: -1,
        building_const_period_from: "",
        building_const_period_to: ""
    })
    let handleDatePickerChange = (event, param) => {
        // console.log(event)
        // console.log(param)
        console.log(safNewFormOwnerBuildingConstPeriod)
        setSafNewFormOwnerBuildingConstPeriod((prevState) => {
            return {
                ...prevState,
                [param]: event.$d
            }
        })

    }
    useEffect(() => {
        const { building_const_period_from, building_const_period_to } = safNewFormOwnerBuildingConstPeriod
        if (building_const_period_from && building_const_period_from != ""
            && building_const_period_to && building_const_period_to != "") {
            const fromDate = Date.parse(building_const_period_from)
            const toDate = Date.parse(building_const_period_to)
            if (toDate > fromDate) {
                const age = Math.trunc(((toDate - fromDate) / (365 * 24 * 60 * 60 * 1000)) * 100) / 100
                console.log(`age = ${age}`)
                setSafNewFormOwnerBuildingConstPeriod((prevState) => {
                    return {
                        ...prevState,
                        prop_age_count: age
                    }
                })
                setSAFNewFormOtherDetails((prevState) => {
                    console.log("more than 20")
                    return {
                        ...prevState,
                        is_property_more_than_20_years_old: age > 20 ? 'Yes' : 'No'
                    }
                })
                setSAFNewFormValidator(prevState => {
                    return { ...prevState, isBuildingConstPeriodFromValid: true, isBuildingConstPeriodToValid: true }
                })
            } else {
                console.log("building const period not valid")
                setSAFNewFormValidator(prevState => {
                    return { ...prevState, isBuildingConstPeriodFromValid: false, isBuildingConstPeriodToValid: false }
                })
            }
        }
    }, [safNewFormOwnerBuildingConstPeriod.building_const_period_from,
    safNewFormOwnerBuildingConstPeriod.building_const_period_to])
    //=================================================================
    /**
     * SAF new form property details
     */
    const [safNewFormOwnerPropertyDetails, setSafNewFormOwnerPropertyDetails] = useState({
        plot_area: "",
        vacant_land_area: "",
        plot_no: "",
        khata_no: ""
    })
    const handleSAFNewFormOwnerPropertyDetailsChange = (event) => {
        setShowFloatingMessage(false)
        // console.log(event?.target)
        console.log(safNewFormOwnerPropertyDetails)
        setSafNewFormOwnerPropertyDetails((prevState) => {
            return {
                ...prevState,
                [event.target.id]: event.target.value
            }
        })
        if (safInputStateToValidatorMapping[event.target.id]) {
            setSAFNewFormValidator(prevState => { return { ...prevState, [safInputStateToValidatorMapping[event.target.id]]: null } })
        }
    }
    //=====================================================================
    /**
     * SAF new form owner property address details
     */
    const [isCorrAddressSelected, setIsCorrAddressSelected] = useState(false)
    const handleCorrAddressCheckboxChange = (event) => {
        console.log("checkbox==========")
        console.log(event.target.value)
        setIsCorrAddressSelected(!isCorrAddressSelected)
    }
    const [safNewFormOwnerPropertyAddress, setSafNewFormOwnerPropertyAddress] = useState({
        prop_address: "",
        district: "",
        pin: "",
        city: "",
        mohalla: "",
        prop_address_corr: "",
        district_corr: "",
        pin_corr: "",
        city_corr: "",
        mohalla_corr: "",
    })
    const handleSAFNewFormOwnerPropertyAddressChange = (event) => {
        setShowFloatingMessage(false)
        console.log(safNewFormOwnerPropertyAddress)
        // console.log(event)
        if (event?.target?.id) {
            setSafNewFormOwnerPropertyAddress((prevState) => {
                return {
                    ...prevState,
                    [event.target.id]: event.target.value
                }
            })
            setSAFNewFormValidator(prevState => { return { ...prevState, [safInputStateToValidatorMapping[event.target.id]]: null } })
        } else if (event.toString().includes("property")) {
            let district = event.toString().split("_")[1]
            setSafNewFormOwnerPropertyAddress((prevState) => {
                return {
                    ...prevState,
                    district: district
                }
            })
            setSAFNewFormValidator(prevState => { return { ...prevState, [safInputStateToValidatorMapping['district']]: null } })
        } else if (event.toString().includes("corr")) {
            let district = event.toString().split("_")[1]
            setSafNewFormOwnerPropertyAddress((prevState) => {
                return {
                    ...prevState,
                    district_corr: district
                }
            })
        }
    }
    //=====================================================================
    /**
     * SAF new form property type details
     */
    const [safNewFormPropertyTypeDetails, setSAFNewFormPropertyTypeDetails] = useState({
        property_type_id: "",
        road_type_id: 2,
    })
    const handleSAFNewFormPropertyTypeDetails = (event) => {
        setShowFloatingMessage(false)
        console.log(safNewFormPropertyTypeDetails)
        console.log(event)
        const eventId = event?.target?.id
        if (eventId?.toString().includes('road')) {
            console.log(eventId)
            setSAFNewFormPropertyTypeDetails((prevState) => {
                return {
                    ...prevState,
                    road_type_id: prevState.road_type_id == 2 ? parseInt(eventId.split('_')[2]) : 2
                }
            })
            setSAFNewFormValidator(prevState => { return { ...prevState, [safInputStateToValidatorMapping['road_type_id']]: null } })
        }
        else if (event.toString().includes("property_type_name")) {
            const propertyTypeItem = JSON.parse(event)
            setSAFNewFormPropertyTypeDetails((prevState) => {
                return {
                    ...prevState,
                    property_type_id: propertyTypeItem.id
                }
            })
            setSAFNewFormValidator(prevState => { return { ...prevState, [safInputStateToValidatorMapping['property_type_id']]: null } })
        }
        // else if (event.toString().includes("road_name")) {
        //     const roadTypeItem = JSON.parse(event)
        //     setSAFNewFormPropertyTypeDetails((prevState) => {
        //         return {
        //             ...prevState,
        //             road_type_id: roadTypeItem.id
        //         }
        //     })
        //     setSAFNewFormValidator(prevState => { return { ...prevState, [safInputStateToValidatorMapping['road_type_id']]: null } })
        // }
    }
    //==========================================================================
    /**
     * SAF new form floor details
     */
    const [safNewFormPropertyFloorDetails, setSAFNewFormPropertyFloorDetails] = useState([
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
    ])

    useEffect(()=>{
    if(safNewFormPropertyFloorDetails.to_date === ''){
        safNewFormPropertyFloorDetails.to_date = '2023-2024'
    }
    },[safNewFormPropertyFloorDetails.to_date, isSAFFormValid,safNewFormValidator])

    const [isSelectedFloorValid, setIsSelectedFloorValid] = useState(true)
    //Floor add or delete logic
    const handleFloorAddOrDelete = (addOrDelete, index) => {
        console.log(addOrDelete)
        if (addOrDelete == 'ADD') {
            setSAFNewFormPropertyFloorDetails((prevState) => {
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
                        to_date_obj: "",
                    },
                ]
            })
        } else if (addOrDelete == 'DELETE') {
            console.log(`original array before delete -`)
            console.log(safNewFormPropertyFloorDetails)
            let newFloorDetailsArr = safNewFormPropertyFloorDetails.map(item => item)
            newFloorDetailsArr.splice(index, 1)
            console.log('new saf floor array after delete')
            console.log(newFloorDetailsArr)
            setSAFNewFormPropertyFloorDetails(newFloorDetailsArr)
            floorStack = floorStack.filter(floorItem => floorItem !=
                safNewFormPropertyFloorDetails[index].floor_id)
        }
    }
    const handleSAFNewFormPropertyFloorDetailsChange = (event, index, field_name) => {
        setShowFloatingMessage(false)
        console.log(safNewFormPropertyFloorDetails)
        // console.log(event)
        // console.log("handle select")
        if (event?.target?.id) {
            let newSingleFloorDetails = {
                ...safNewFormPropertyFloorDetails[index],
                [event.target.id]: event.target.value
            }
            const newFloorDetailsArr = safNewFormPropertyFloorDetails.map(item => item)
            newFloorDetailsArr.splice(index, 1, newSingleFloorDetails)
            setSAFNewFormPropertyFloorDetails(newFloorDetailsArr)
        } else if (event.target.value.toString().includes("floor_name")) {
            event = JSON.parse(event.target.value)
            console.log("comparing===")
            console.log(event.id)
            console.log(floorStack)
            console.log(floorStack.includes(event.id))
            if (!floorStack.includes(event.id)
                || true
            ) {
                console.log("selected floor is valid")
                let newSingleFloorDetails = {
                    ...safNewFormPropertyFloorDetails[index],
                    floor_id: event.id,
                    floor_name: event.floor_name
                }
                const newFloorDetailsArr = safNewFormPropertyFloorDetails.map(item => item)
                newFloorDetailsArr.splice(index, 1, newSingleFloorDetails)
                setSAFNewFormPropertyFloorDetails(newFloorDetailsArr)
                floorStack.push(event.id)
                console.log("floorstack=========")
                console.log(floorStack)
                setIsSelectedFloorValid(true)
            } else {
                console.log("selected floor is not valid")
                console.log(safNewFormPropertyFloorDetails)
                setIsSelectedFloorValid(false)
            }
        } else if (event.target.value.toString().includes("occup_type")) {
            event = JSON.parse(event.target.value)
            let newSingleFloorDetails = {
                ...safNewFormPropertyFloorDetails[index],
                occup_type_id: event.id,
                occupancy_type: event.occup_type
            }
            const newFloorDetailsArr = safNewFormPropertyFloorDetails.map(item => item)
            newFloorDetailsArr.splice(index, 1, newSingleFloorDetails)
            setSAFNewFormPropertyFloorDetails(newFloorDetailsArr)
        } else if (event.target.value.toString().includes("uses_type_name")) {
            event = JSON.parse(event.target.value)
            let newSingleFloorDetails = {
                ...safNewFormPropertyFloorDetails[index],
                usage_type_id: event.id,
                uses_type_name: event.uses_type_name
            }
            const newFloorDetailsArr = safNewFormPropertyFloorDetails.map(item => item)
            newFloorDetailsArr.splice(index, 1, newSingleFloorDetails)
            setSAFNewFormPropertyFloorDetails(newFloorDetailsArr)
        } else if (event.target.value.toString().includes("const_type")) {
            event = JSON.parse(event.target.value)
            let newSingleFloorDetails = {
                ...safNewFormPropertyFloorDetails[index],
                construction_type: event.const_type
            }
            const newFloorDetailsArr = safNewFormPropertyFloorDetails.map(item => item)
            newFloorDetailsArr.splice(index, 1, newSingleFloorDetails)
            setSAFNewFormPropertyFloorDetails(newFloorDetailsArr)
        } else if (event.target.value.toString().includes("fy_name")) {
            event = JSON.parse(event.target.value)
            console.log("event=" + field_name)
            console.log(event)
            let newSingleFloorDetails = {
                ...safNewFormPropertyFloorDetails[index],
                [field_name]: event.fy_name,
                [field_name.includes('from') ? `from_date_obj` : `to_date_obj`]: event
            }
            const newFloorDetailsArr = safNewFormPropertyFloorDetails.map(item => item)
            newFloorDetailsArr.splice(index, 1, newSingleFloorDetails)
            setSAFNewFormPropertyFloorDetails(newFloorDetailsArr)
        }
        console.log("just before resetting validation==============")
        setSAFNewFormValidator(prevState =>
             { return { ...prevState, [safInputStateToValidatorMapping['floor_details']]: null } })
    }
    //==========================================================================
    /**
     * SAF new form other details
     */
    const [safNewFormOtherDetails, setSAFNewFormOtherDetails] = useState({
        isMobileTower: "No",
        rain_harvest: "No",
        is_widow_ex_army: "No",
        is_handicapped: "No",
        is_property_more_than_20_years_old: "",
        is_property_waived_off: "",
        is_isdp: "No",
        is_school: "No",
        is_complex: "No",
        financial_year: "",
        fy_id: -1
    })
    const handleSAFNewFormOtherDetailsChange = (event) => {
        setShowFloatingMessage(false)
        console.log(event?.target?.value)
        console.log(safNewFormOtherDetails)
        const splitParam = event.toString().includes('_') ? event.toString().split('_') : null
        if (event.toString().includes('mobiletower')) {
            setSAFNewFormOtherDetails((prevState) => {
                return {
                    ...prevState,
                    isMobileTower: splitParam[1]
                }
            })
        } else if (event.toString().includes('rainwater')) {
            setSAFNewFormOtherDetails((prevState) => {
                return {
                    ...prevState,
                    rain_harvest: splitParam[1]
                }
            })
        } else if (event.toString().includes('iswidow')) {
            setSAFNewFormOtherDetails((prevState) => {
                return {
                    ...prevState,
                    is_widow_ex_army: splitParam[1]
                }
            })
        } else if (event.toString().includes('handicapped')) {
            setSAFNewFormOtherDetails((prevState) => {
                return {
                    ...prevState,
                    is_handicapped: splitParam[1]
                }
            })
        } else if (event.toString().includes('age20')) {
            setSAFNewFormOtherDetails((prevState) => {
                return {
                    ...prevState,
                    is_property_more_than_20_years_old: splitParam[1]
                }
            })
        } else if (event.toString().includes('waivedoff')) {
            setSAFNewFormOtherDetails((prevState) => {
                return {
                    ...prevState,
                    is_property_waived_off: splitParam[1]
                }
            })
        } else if (event.toString().includes('ihsdp')) {
            setSAFNewFormOtherDetails((prevState) => {
                return {
                    ...prevState,
                    is_isdp: splitParam[1]
                }
            })
        } else if (event.toString().includes('school')) {
            setSAFNewFormOtherDetails((prevState) => {
                return {
                    ...prevState,
                    is_school: splitParam[1]
                }
            })
        } else if (event.toString().includes('complex')) {
            setSAFNewFormOtherDetails((prevState) => {
                return {
                    ...prevState,
                    is_complex: splitParam[1]
                }
            })
        } else if (event.toString().includes('fy_name')) {
            event = JSON.parse(event)
            console.log("financial year selected...")
            console.log(event)
            setSAFNewFormOtherDetails((prevState) => {
                return {
                    ...prevState,
                    financial_year: event.fy_name,
                    fy_id: event.id
                }
            })
        }
        setSAFNewFormValidator(prevState => { return { ...prevState, [safInputStateToValidatorMapping['other_details']]: null } })
    }

    const handleSAFNewFormOtherDetailsCheckboxChange = (event) => {
        setShowFloatingMessage(false)
        // const { is_widow_ex_army } = safNewFormOtherDetails
        // console.log(event)
        if (event?.target?.id) {
            const eventId = event.target.id
            if (eventId.includes('widow')) {
                setSAFNewFormOtherDetails((prevState) => {
                    return {
                        ...prevState,
                        is_widow_ex_army: prevState.is_widow_ex_army == 'Yes' ? 'No' : 'Yes'
                    }
                })
            } else if (eventId.includes('handicapped')) {
                setSAFNewFormOtherDetails((prevState) => {
                    return {
                        ...prevState,
                        is_handicapped: prevState.is_handicapped == 'Yes' ? 'No' : 'Yes'
                    }
                })
            } else if (eventId.includes('isdp')) {
                setSAFNewFormOtherDetails((prevState) => {
                    return {
                        ...prevState,
                        is_isdp: prevState.is_isdp == 'Yes' ? 'No' : 'Yes'
                    }
                })
            } else if (eventId.includes('school')) {
                setSAFNewFormOtherDetails((prevState) => {
                    return {
                        ...prevState,
                        is_school: prevState.is_school == 'Yes' ? 'No' : 'Yes'
                    }
                })
            } else if (eventId.includes('complex')) {
                setSAFNewFormOtherDetails((prevState) => {
                    return {
                        ...prevState,
                        is_complex: prevState.is_complex == 'Yes' ? 'No' : 'Yes'
                    }
                })
            } else if (eventId.includes('rain')) {
                setSAFNewFormOtherDetails((prevState) => {
                    return {
                        ...prevState,
                        rain_harvest: prevState.rain_harvest == 'Yes' ? 'No' : 'Yes'
                    }
                })
            }
        }
        setSAFNewFormValidator(prevState => { return { ...prevState, [safInputStateToValidatorMapping['other_details']]: null } })
    }
    //========================================================================================
    /**
     * file upload
     */
    const [ownerImageFile, setOwnerImageFile] = useState()
    const [isOwnerImageUploaded, setIsOwnerImageUploaded] = useState(null)
    const [isOwnerImageUploading, setIsOwnerImageUploading] = useState(null)
    const [floorImageFiles, setFloorImageFiles] = useState([])
    const [isFloorImageUploaded, setIsFloorImageUploaded] = useState(null)
    const [isFloorImageUploading, setIsFloorImageUploading] = useState(null)
    const [rainWaterFile, setRainWaterFile] = useState()
    const [isRainWaterFileUploaded, setIsRainWaterFIleUploaded] = useState(null)
    const [isRainWaterFileUploading, setIsRainWaterFIleUploading] = useState(null)
    
    const handleFileChange = (event) => {
        setShowFloatingMessage(false)
        console.log(event?.target?.id)
        const eventId = event?.target?.id
        if (!eventId.toString().includes('floor')) {
            console.log(event?.target?.files?.length)
            if (eventId?.toString().includes('owner')) {
                setOwnerImageFile(event.target.files[0])
            } else if (eventId?.toString().includes('rain')) {
                setRainWaterFile(event.target.files[0])
            }
        } else {
            let files = event.target.files
            console.log(files.length)
            console.log(files)

            for (let i = 0; i < files.length; i++) {
                console.log("inside set floor files loop")
                console.log(files[i])
                setFloorImageFiles(prevState => {
                    return [
                        ...prevState,
                        files[i]
                    ]
                })
            }
        }
    }
    const uploadFile = async (event) => {  // document upload API
        console.log("uploading file with fy_id=====" + safNewFormOtherDetails.fy_id)
        const userID = getCookieByName('SUDA_USER_ID')
        const fileUploadUrl = `${SUDA_API_BASE_URL}/user/SAFDocumentUpload?doc_mstr_id=103&fy_id=${safNewFormOtherDetails.fy_id}&prop_id=${safNewFormBasicDetails.prop_id}&user_id=${userID}`

        const eventId = event?.target?.id.toString()
        let uploadTypeFlag = null
        let formData = new FormData()
        console.log("upload id::" + event.target.id)
        if (eventId.includes('floor')) {
            setIsFloorImageUploading(true)
            uploadTypeFlag = "floor"
            console.log(floorImageFiles)
            floorImageFiles.forEach(item => {
                formData.append('file', item)
            })
        } else if (eventId.includes('owner')) {
            setIsOwnerImageUploading(true)
            uploadTypeFlag = "owner"
            formData.append('file', ownerImageFile)
        } else if (eventId.includes('rain')) {
            setIsRainWaterFIleUploading(true)
            uploadTypeFlag = "rain"
            formData.append('file', rainWaterFile)
        }

        const requestOptions = {
            method: "POST",
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}`,
                // 'Content-Length': `${ownerImageFile.size}`,
                // 'mode': 'no-cors',
            },
            body: formData
        }

        let response = null
        try {
            response = await fetch(fileUploadUrl, requestOptions)
        } catch (ex) {
            if (uploadTypeFlag == 'floor') {
                setIsFloorImageUploading(false)
                setIsFloorImageUploaded(false)
            } else if (uploadTypeFlag == 'owner') {
                setIsOwnerImageUploading(false)
                setIsOwnerImageUploaded(false)
            } else if (uploadTypeFlag == 'rain') {
                setIsRainWaterFIleUploading(false)
                setIsRainWaterFIleUploaded(false)
            }
            console.log(ex)
        }
        let responseBody = null
        try {
            responseBody = await response?.json()
        } catch (ex) {
            console.log(ex)
        }
        console.log("wooohooo file uploading.........", uploadTypeFlag, isFloorImageUploaded)
        console.log(response)
        console.log(responseBody)
        if (response?.status == '200') {
            if (uploadTypeFlag == 'floor') {
                setIsFloorImageUploading(false)
                setIsFloorImageUploaded(true)
            } else if (uploadTypeFlag == 'owner') {
                setIsOwnerImageUploading(false)
                setIsOwnerImageUploaded(true)
            } else if (uploadTypeFlag == 'rain') {
                setIsRainWaterFIleUploading(false)
                setIsRainWaterFIleUploaded(true)
            }
        } else {
            if (uploadTypeFlag == 'floor') {
                setIsFloorImageUploading(false)
                setIsFloorImageUploaded(false)
            } else if (uploadTypeFlag == 'owner') {
                setIsOwnerImageUploading(false)
                setIsOwnerImageUploaded(false)
            } else if (uploadTypeFlag == 'rain') {
                setIsRainWaterFIleUploaded(false)
            }
        }
    }
    //======================================================================
    /**
     * Handle SAF new form submission
     */
    const handleSAFNewFormValidation = async () => {
        setShowFloatingMessage(true)
        let totalBuiltUpArea = 0
        // console.log(safNewFormBasicDetails)
        // console.log(safNewFormOwnerPersonalDetails)
        // console.log(safNewFormOwnerBuildingConstPeriod)
        // console.log(safNewFormOwnerPropertyDetails)
        // console.log(safNewFormOwnerPropertyAddress)
        // console.log(safNewFormPropertyTypeDetails)
        // console.log(safNewFormPropertyFloorDetails)
        // console.log(safNewFormOtherDetails)
        finalReqObjForSafNewEntry = {
            ...safNewFormBasicDetails,
            ...safNewFormOwnerPersonalDetails,
            aadhar: parseInt(safNewFormOwnerPersonalDetails.aadhar),
            mobile_no: parseInt(safNewFormOwnerPersonalDetails.mobile_no),
            construction_date_from: JSON.stringify(safNewFormOwnerBuildingConstPeriod.building_const_period_from).split("T")[0].split("\"")[1],
            construction_date_upto: JSON.stringify(safNewFormOwnerBuildingConstPeriod.building_const_period_to).split("T")[0].split("\"")[1],
            prop_age_count: safNewFormOwnerBuildingConstPeriod.prop_age_count,
            plot_area: safNewFormOwnerPropertyDetails.plot_area,
            khata_no: safNewFormOwnerPropertyDetails.khata_no,
            plot_no: safNewFormOwnerPropertyDetails.plot_no,
            city: safNewFormOwnerPropertyAddress.city,
            district: safNewFormOwnerPropertyAddress.district,
            mohalla: safNewFormOwnerPropertyAddress.mohalla,
            pin: safNewFormOwnerPropertyAddress.pin,
            prop_address: safNewFormOwnerPropertyAddress.prop_address,
            ...safNewFormPropertyTypeDetails,
            floor_details: safNewFormPropertyFloorDetails.map(floorItem => {
                let newFloorItem = { ...floorItem }
                delete newFloorItem.from_date_obj
                delete newFloorItem.to_date_obj
                return newFloorItem
            }),
            ...safNewFormOtherDetails,
            is_widow: safNewFormOtherDetails.is_widow_ex_army
        }
        delete finalReqObjForSafNewEntry.is_property_more_than_20_years_old
        delete finalReqObjForSafNewEntry.is_property_waived_off
        delete finalReqObjForSafNewEntry.is_widow_ex_army
        //deleting old property no. as it's not required
        delete finalReqObjForSafNewEntry.old_property_no

        //hardcoded values for now
        finalReqObjForSafNewEntry.area_id = 1
        finalReqObjForSafNewEntry.module_id = 1
        finalReqObjForSafNewEntry.module_name = "PROPERTY"
        finalReqObjForSafNewEntry.owner_pic = ""
        finalReqObjForSafNewEntry.purchase_date = ""
        finalReqObjForSafNewEntry.rain_water_docs = ""
        safNewFormPropertyFloorDetails.forEach(floorItem => {
            totalBuiltUpArea += parseFloat(floorItem.built_up_area)
        })
        finalReqObjForSafNewEntry.total_built_up_area = totalBuiltUpArea
        finalReqObjForSafNewEntry.vsrno = ""
        finalReqObjForSafNewEntry.user_id = parseInt(getCookieByName("SUDA_USER_ID"))
        finalReqObjForSafNewEntry.current_financial_year = "2022-2023"
        finalReqObjForSafNewEntry.effective_date = ""
        finalReqObjForSafNewEntry.old_ward_id = 0
        finalReqObjForSafNewEntry.financial_year = "2022-2023"
        console.log("to year value to be added",safNewFormAllInputFromAPI.financial_year[safNewFormAllInputFromAPI.financial_year.length - 1].fy_name)
        console.log("finalReqObjForSafNewEntry",finalReqObjForSafNewEntry)
          if(finalReqObjForSafNewEntry?.floor_details[0]?.to_date === ''){
            finalReqObjForSafNewEntry.floor_details[0].to_date = 
            safNewFormAllInputFromAPI.financial_year[safNewFormAllInputFromAPI.financial_year.length - 1].fy_name
        }
        console.log("test tset", finalReqObjForSafNewEntry?.floor_details?.length, finalReqObjForSafNewEntry?.floor_details)
        if(finalReqObjForSafNewEntry?.floor_details?.length > 0){
            finalReqObjForSafNewEntry?.floor_details?.map((floor_detail) => {
                if(floor_detail?.to_date === ''){
                    floor_detail.to_date = 
                    safNewFormAllInputFromAPI.financial_year[safNewFormAllInputFromAPI.financial_year.length - 1].fy_name
                }
            }) 
    
        }
      

        // if(finalReqObjForSafNewEntry.floor_details[0].to_date === ''){
        //     finalReqObjForSafNewEntry.floor_details[0].to_date = 
        //     safNewFormAllInputFromAPI.financial_year[safNewFormAllInputFromAPI.financial_year.length - 1].fy_name
        // }
        console.log("final request object===========================")
        console.log(finalReqObjForSafNewEntry)

      
        validateSAFNewForm(finalReqObjForSafNewEntry, setSAFNewFormValidator)
        // val(finalReqObjForSafNewEntry, setSAFNewFormValidator)
     
    }
   useEffect(()=>{
    console.log("res", safNewFormValidator)
   },[safNewFormValidator])
    useEffect(() => {
        const validator = () => {
            let isSafFormValidNew = true
            for (const key in safNewFormValidator) {
                isSafFormValidNew = safNewFormValidator[key]
                console.log(" isSafFormValidNew ", isSafFormValidNew )
                if (isSafFormValidNew == false || 
                    isSafFormValidNew == null ||
                     isSafFormValidNew == undefined) {
                    console.log("validation break")
                    break
                }
            }
            console.log(safNewFormValidator)
            console.log(isSafFormValidNew)
            //making property document upload mandatory
            if ((isFloorImageUploaded == null || isRainWaterFileUploaded == null) 
            && isSAFNewFormInitialRender == true) {
                setIsSAFFormValid(null)
                setIsSAFNewFormInitialRender(false)
                return;
            }
            console.log("isSafFormValidNew && isFloorImageUploaded",isSafFormValidNew , isFloorImageUploaded)
            isSafFormValidNew = isSafFormValidNew && isFloorImageUploaded ? true : false
            if (safNewFormOtherDetails.rain_harvest == 'Yes') {
                isSafFormValidNew = isSafFormValidNew && isRainWaterFileUploaded ? true : false
            }

            console.log("is saf valid============start")
            console.log(isSafFormValidNew)
            console.log("is saf valid =========== end")
            setIsSAFFormValid(isSafFormValidNew)
        }
        validator()
    }, [safNewFormValidator])

    const closeFloatingMessage = () => {
       // setIsSAFFormValid('validation_success') 
        //setIsSAFFormValid(null)
        setShowFloatingMessage(false)
    }

    const closeFloatingMessageForSAFNewSubmissionFailure = () => {
        setIsSAFFormSubmissionSuccess(null)
    }

    const handleSAFNewFormSubmission = async () => {
        floorStack = []
        // if (isSAFFormValid == true || isSAFFormValid == 'validation_success') {
            try {
                setIsSAFFormSubmissionLoading(true)
                const requestOptions = {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
                    body: JSON.stringify(finalReqObjForSafNewEntry),
                }

                const safNewEntryUrl = `${SUDA_API_BASE_URL}/user/SAFEntry`
                const response = await fetch(safNewEntryUrl, requestOptions)
                // const responseBody = await response.json()
                console.log("woohooo")
                console.log(response)
                if (response?.status == "200") {
                    setIsSAFFormSubmissionSuccess(true)
                    setIsSAFFormSubmissionLoading(false)
                    setPropertyId(safNewFormBasicDetails.prop_id)
                    switchOnNextModalNOffCurrModal(currModal, nextModal)
                    clearAllStateForSAFForm()
                    finalReqObjForSafNewEntry = {}
                } else {
                    setIsSAFFormSubmissionSuccess(false)
                    setIsSAFFormSubmissionLoading(false)
                }
            } catch (err) {
                setIsSAFFormSubmissionSuccess(false)
                console.error(err)
            }

        // } else {
        //     setIsSAFFormValid(false)
        // }

    }

    const clearAllStateForSAFForm = () => {
        setSafNewFormBasicDetails({
            prop_id: "",
            zone_id: "",
            ward_id: "",
            entry_type_id: "",
            entry_type_name: "",
            old_property_no: "",
        })
        setSafNewFormOwnerPersonalDetails({
            owner_title: "",
            prop_owner_name: "",
            owner_gender: "",
            father_name: "",
            owner_relation: "",
            mobile_no: "",
            aadhar: "",
            panno: "",
            email: "",
        })
        setSafNewFormOwnerBuildingConstPeriod({
            prop_age_count: -1,
            building_const_period_from: "",
            building_const_period_to: ""
        })
        setSafNewFormOwnerPropertyDetails({
            plot_area: "",
            vacant_land_area: "",
            plot_no: "",
            khata_no: ""
        })
        setIsCorrAddressSelected(false)
        setSafNewFormOwnerPropertyAddress({
            prop_address: "",
            district: "",
            pin: "",
            city: "",
            mohalla: "",
            prop_address_corr: "",
            district_corr: "",
            pin_corr: "",
            city_corr: "",
            mohalla_corr: "",
        })
        setSAFNewFormPropertyTypeDetails({
            property_type_id: "",
            road_type_id: "",
        })
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
        ])
        setSAFNewFormOtherDetails({
            isMobileTower: "",
            rain_harvest: "",
            is_widow_ex_army: "",
            is_handicapped: "",
            is_property_more_than_20_years_old: "",
            is_property_waived_off: "",
            is_isdp: "",
            is_school: "",
            is_complex: "",
            financial_year: "",
            fy_id: -1
        })
        setOwnerImageFile(null)
        setIsOwnerImageUploaded(null)
        setFloorImageFiles([])
        setIsFloorImageUploaded(null)
        setRainWaterFile(null)
        setIsRainWaterFIleUploaded(null)
        floorStack = []
    }
    //======================================================================
    useEffect(() => {
        floorStack = []
        let fetchSAFDropDownLists = async () => {
            const url = `${SUDA_API_BASE_URL}/SAFAllDropDownList`
            const response = await fetch(url)
            const responseBody = await response.json()
            // console.log(responseBody)
            if (response.status == "200") {
                setSafNewFormAllInputFromAPI((prevState) => {
                    return {
                        ...prevState,
                        ...responseBody
                    }
                })
            }
        }
        fetchSAFDropDownLists()
    }, [])

    return showSAFNewFormModal ? (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden mt-10 mb-10">


            <div className={`w-${isPublicSAF ? "11/12" : "full"} px-0 pt-0 pb-4 m-auto bg-white rounded-md lg:max-w-full`}>                
                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                        <p className='contents text-red-600 text-xs font-bold'>*Mark indicates mandatory field</p>
                    </label>
                </div>
                <form className="mt-4 ">
                    <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-none lg:max-w-full">
                        <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red rounded-md h-10 shadow-lg">
                            <h2 className="text-sm font-semibold text-center text-white">
                                Basic Details
                            </h2>
                        </nav>
                        <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                    Property ID<p className='contents text-red-600 text-sm font-bold'>*</p>
                                </label>
                                <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                                ${safNewFormValidator.isPropIdValid == false ? `` : `hidden`}`}
                                    placement='top'
                                    content={safInputValidatorMsgList.validPropIdMsg}
                                    animate={{
                                        mount: { scale: 1, y: 0 },
                                        unmount: { scale: 0, y: 25 },
                                    }} >
                                    <input onChange={handleSAFNewFormBasicDetails}
                                        value={safNewFormBasicDetails.prop_id}
                                        maxLength='10'
                                        className={`bg-white-200 appearance-none border ${safNewFormValidator.isPropIdValid == false ?
                                            `border-red-900` : `border-gray-500`} rounded w-full py-2 px-4 text-white-700 leading-tight 
                                            focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500`}
                                        id="prop_id" type="text" placeholder="Property ID" />
                                </Tooltip>
                            </div>
                            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
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
                                    <Select onChange={handleSAFNewFormBasicDetails}
                                        label="select" color='orange' className={`pl-2 pr-3 py-2 font-bold text-xs text-gray-900
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
                            </div>
                            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                    Ward No.<p className='contents text-red-600 text-sm font-bold'>*</p>
                                </label>
                                <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64
                                ${safNewFormValidator.isWardValid == false ? `` : `hidden`}`}
                                    placement='top'
                                    content={safInputValidatorMsgList.validWardMsg}
                                    animate={{
                                        mount: { scale: 1, y: 0 },
                                        unmount: { scale: 0, y: 25 },
                                    }} >
                                    <Select onChange={handleSAFNewFormBasicDetails}
                                        label="select" color='orange' className={`pl-2 pr-3 py-2 font-bold text-xs text-gray-900
                                        ${safNewFormValidator.isWardValid == false ?
                                                `border-red-900` : ``}`}>
                                        {
                                            safNewFormAllInputFromAPI.ward.length > 0 ?
                                                (safNewFormAllInputFromAPI.ward.map((item) => {
                                                    const { id, zone_mstr_id, ward_name, area_name, stampdate, user_id, status } = item
                                                    return <Option key={id} value={JSON.stringify(item)}>{`${ward_name}`}</Option>
                                                })) : (<Option>Loading...</Option>)
                                        }
                                    </Select>
                                </Tooltip>
                            </div>
                            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                    Entry Type<p className='contents text-red-600 text-sm font-bold'>*</p>
                                </label>
                                <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64
                                ${safNewFormValidator.isEntryTypeValid == false ? `` : `hidden`}`}
                                    placement='top'
                                    content={safInputValidatorMsgList.validEntryTypeMsg}
                                    animate={{
                                        mount: { scale: 1, y: 0 },
                                        unmount: { scale: 0, y: 25 },
                                    }} >
                                    <Select disabled={true}
                                        value='New Assessment'
                                        onChange={handleSAFNewFormBasicDetails}
                                        label="select" color='orange' className={`cursor-not-allowed pl-2 pr-3 py-2 font-bold text-xs text-gray-900
                                        ${safNewFormValidator.isEntryTypeValid == false ?
                                                `border-red-900` : ``}`}
                                    >
                                        {/* {
                                            safNewFormAllInputFromAPI.entry_type.length > 0 ?
                                                (safNewFormAllInputFromAPI.entry_type.map((item) => {
                                                    const { id, entry_type, status } = item
                                                    if (entry_type?.includes('New') 
                                                    // || entry_type?.includes('Legacy')
                                                    ) {
                                                        return <Option key={id} value={JSON.stringify(item)}>{entry_type}</Option>
                                                    } else {
                                                        return <Option key={id} hidden >N/A</Option>
                                                    }
                                                })) : (<Option>Loading...</Option>)
                                        } */}
                                        <Option value='New Assessment' >New Assessment</Option>
                                        <Option value='Loading' >Loading...</Option>
                                    </Select>
                                </Tooltip>
                            </div>

                        </div>
                        {
                            safNewFormBasicDetails.entry_type_id == 4 ? (
                                <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                            Old Property No. (If any)
                                        </label>
                                        <input
                                            onChange={handleSAFNewFormBasicDetails}
                                            value={safNewFormBasicDetails.old_property_no}
                                            className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                                            id="old_property_no" type="text" placeholder="Old Property No." />
                                    </div>

                                </div>
                            )
                                : null
                        }
                    </div>
                    {/* <div className="mb-6"></div> */}

                    <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-none mt-4 lg:max-w-full">                        
                        <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-none mt-4 lg:max-w-full">
                            <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red rounded-md h-10 drop-shadow-xl">
                                <h2 className="text-sm font-semibold text-center text-white">
                                Personal Details
                                </h2>
                            </nav>
                            
                            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end">
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Honorific<p className='contents text-red-600 text-sm font-bold'>*</p>
                                    </label>
                                    <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-50 
                                    ${safNewFormValidator.isOwnerHonorificValid == false ? `` : `hidden`}`}
                                        placement='top'
                                        content={safInputValidatorMsgList.validHonorificMsg}
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }} >
                                        <Select onChange={handleSAFNewFormOwnerDetailsChange}
                                            label="Select" color='orange' className={`w-72 pl-2 pr-3 py-2 font-bold text-xs text-gray-900
                                            ${safNewFormValidator.isOwnerHonorificValid == false ?
                                                    `border-red-900` : ``}`}>
                                            <Option value='title_Mr.' >Mr</Option>
                                            <Option value='title_Mrs.' >Mrs</Option>
                                            <Option value='title_Ms.' >Ms</Option>
                                            <Option value='title_Mx.' >Mx</Option>
                                        </Select>
                                    </Tooltip>
                                </div>
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Owner Name<p className='contents text-red-600 text-sm font-bold'>*</p>
                                    </label>
                                    <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                                ${safNewFormValidator.isOwnerNameValid == false ? `` : `hidden`}`}
                                        placement='top'
                                        content={safInputValidatorMsgList.validOwnerNameMsg}
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }} >
                                        <input value={safNewFormOwnerPersonalDetails.prop_owner_name}
                                            onChange={handleSAFNewFormOwnerDetailsChange}
                                            className={`bg-white-200 appearance-none border border-gray-500 rounded w-72 py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 
                                            focus:border-orange-500 ${safNewFormValidator.isOwnerNameValid == false ?
                                                    `border-red-900` : ``}`}
                                            id="prop_owner_name" type="text" placeholder="Owner Name" />
                                    </Tooltip>
                                </div>
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Gender<p className='contents text-red-600 text-sm font-bold'>*</p>
                                    </label>
                                    <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                                ${safNewFormValidator.isOwnerGenderValid == false ? `` : `hidden`}`}
                                        placement='top'
                                        content={safInputValidatorMsgList.validOwnerGenderMsg}
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }} >
                                        <Select onChange={handleSAFNewFormOwnerDetailsChange}
                                            label="Select" color='orange' className={`w-72 pl-2 pr-3 py-1 font-bold text-xs text-gray-900
                                            ${safNewFormValidator.isOwnerGenderValid == false ?
                                                    `border-red-900` : ``}`}>
                                            <Option value='gender_Male' >Male</Option>
                                            <Option value='gender_Female' >Female</Option>
                                            <Option value='gender_Transgender' >Transgender</Option>
                                        </Select>
                                    </Tooltip>
                                </div>

 
                            </div>
                            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Guardian Name<p className='contents text-red-600 text-sm font-bold'>*</p>
                                    </label>
                                    <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                                ${safNewFormValidator.isOwnerGuardianNameValid == false ? `` : `hidden`}`}
                                        placement='top'
                                        content={safInputValidatorMsgList.validOwnerGuardianNameMsg}
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }} >
                                        <input onChange={handleSAFNewFormOwnerDetailsChange}
                                            value={safNewFormOwnerPersonalDetails.father_name}
                                            className={`bg-white-200 appearance-none border border-gray-500 rounded w-72 py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500
                                            ${safNewFormValidator.isOwnerGuardianNameValid == false ?
                                                    `border-red-900` : `border-gray-500`}`}
                                            id="father_name" type="text" placeholder="Guardian Name" />
                                    </Tooltip>
                                </div>
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Relation<p className=' contents text-red-600 text-sm font-bold'>*</p>
                                    </label>
                                    <div className='flex w-full items-end '>
                                        <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                                ${safNewFormValidator.isOwnerRelationValid == false ? `` : `hidden`}`}
                                            placement='top'
                                            content={safInputValidatorMsgList.validOwnerRelationMsg}
                                            animate={{
                                                mount: { scale: 1, y: 0 },
                                                unmount: { scale: 0, y: 25 },
                                            }} >
                                            <Select onChange={handleSAFNewFormOwnerDetailsChange}
                                                label="Select" color='orange' className={`w-72 pl-2 pr-3 py-1 font-bold text-xs text-gray-900
                                                ${safNewFormValidator.isOwnerGenderValid == false ?
                                                        `border-red-900` : ``}`}>
                                                <Option value='relation_S/O' >S/O</Option>
                                                <Option value='relation_D/O' >D/O</Option>
                                                <Option value='relation_W/O' >W/O</Option>
                                                <Option value='relation_C/O' >C/O</Option>
                                            </Select>
                                        </Tooltip>
                                    </div>

                                </div>
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Mobile No.<p className='contents text-red-600 text-sm font-bold'>*</p>
                                    </label>
                                    <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                                ${safNewFormValidator.isOwnerMobileNumValid == false ? `` : `hidden`}`}
                                        placement='top'
                                        content={safInputValidatorMsgList.validMobileNumMsg}
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }} >
                                        <input type="tel" id="mobile_no" 
                                        maxLength='10'
                                            value={safNewFormOwnerPersonalDetails.mobile_no}
                                            onChange={handleSAFNewFormOwnerDetailsChange}
                                            className={`bg-white-200 appearance-none border border-gray-500 rounded w-72 py-2 px-2 
                                        text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 
                                        focus:border-orange-500" placeholder="0123-45-6789" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}
                                        ${safNewFormValidator.isOwnerMobileNumValid == false ?
                                                    `border-red-900` : `border-gray-500`}`} ></input>
                                    </Tooltip>
                                </div>

                            </div>
                            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Aadhar No.
                                        {/* <p className='contents text-red-600 text-sm font-bold'>*</p> */}
                                    </label>
                                    <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                                ${safNewFormValidator.isOwnerAadharValid == false ? `` : `hidden`}`}
                                        placement='top'
                                        content={safInputValidatorMsgList.validOwnerAadharMsg}
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }} >
                                        <input type="tel" id="aadhar"
                                        maxLength='12'
                                            onChange={handleSAFNewFormOwnerDetailsChange}
                                            value={safNewFormOwnerPersonalDetails.aadhar}
                                            className={`bg-white-200 appearance-none border border-gray-500 rounded w-72 py-2 px-2 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500" placeholder="0123-4525-6789" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}
                                        ${safNewFormValidator.isOwnerAadharValid == false ?
                                                    `border-red-900` : `border-gray-500`}`} ></input>
                                    </Tooltip>
                                </div>
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Email Id
                                        {/* <p className='contents text-red-600 text-sm font-bold'>*</p> */}
                                    </label>
                                    <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                                ${safNewFormValidator.isOwnerEmailValid == false ? `` : `hidden`}`}
                                        placement='top'
                                        content={safInputValidatorMsgList.validOwnerEmailMsg}
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }} >
                                        <input type="email"
                                            onChange={handleSAFNewFormOwnerDetailsChange}
                                            value={safNewFormOwnerPersonalDetails.email}
                                            className={`bg-white-200 appearance-none border border-gray-500 rounded w-72 py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500
                                        ${safNewFormValidator.isOwnerEmailValid == false ?
                                                    `border-red-900` : `border-gray-500`}`}
                                            id="email" placeholder="Email Id" />
                                    </Tooltip>
                                </div>

                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        PAN No.
                                        {/* <p className='contents text-red-600 text-sm font-bold'>*</p> */}
                                    </label>
                                    <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                                ${safNewFormValidator.isOwnerPanValid == false ? `` : `hidden`}`}
                                        placement='top'
                                        content={safInputValidatorMsgList.validOwnerPanNumMsg}
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }} >
                                        <input onChange={handleSAFNewFormOwnerDetailsChange}
                                            value={safNewFormOwnerPersonalDetails.panno}
                                            maxLength='10'
                                            className={`bg-white-200 appearance-none border border-gray-500 rounded w-72 py-2 px-2 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500
                                        ${safNewFormValidator.isOwnerPanValid == false ?
                                                    `border-red-900` : `border-gray-500`}`}
                                            id="panno" type="text" placeholder="PAN No." />
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                        <div className="mb-6"></div>

                        <div className="mb-6"></div>
                        {/* <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-none mt-4 border border-gray-500 lg:max-w-full">
                            <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                                <h2 className="text-sm font-semibold text-center text-white">
                                    Building Construction Period
                                </h2>
                            </nav>
                            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Building Construction Period From
                                        <p className='contents text-red-600 text-sm font-bold'>*</p>
                                    </label>

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <Stack spacing={3}>
                                            <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64
                                ${safNewFormValidator.isBuildingConstPeriodFromValid == false ? `` : `hidden`}`}
                                                placement='top'
                                                content={safInputValidatorMsgList.validBuildingConstPeriodFromMsg}
                                                animate={{
                                                    mount: { scale: 1, y: 0 },
                                                    unmount: { scale: 0, y: 25 },
                                                }} >
                                                <DesktopDatePicker
                                                    // label="Date desktop"
                                                    id="building_const_period_from"
                                                    onChange={(e) => handleDatePickerChange(e, "building_const_period_from")}
                                                    inputFormat="MM/DD/YYYY"
                                                    value={safNewFormOwnerBuildingConstPeriod.building_const_period_from}
                                                    renderInput={(params) => <TextField {...params} />}
                                                    className={`${safNewFormValidator.isBuildingConstPeriodFromValid == false ?
                                                        `border-red-900` : ``}`}
                                                />
                                            </Tooltip>
                                        </Stack>
                                    </LocalizationProvider>

                                </div>
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Building Construction Period To
                                        <p className='contents text-red-600 text-sm font-bold'>*</p>
                                    </label>

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <Stack spacing={3}>
                                            <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                                ${safNewFormValidator.isBuildingConstPeriodToValid == false ? `` : `hidden`}`}
                                                placement='top'
                                                content={safInputValidatorMsgList.validBuildingConstPeriodToMsg}
                                                animate={{
                                                    mount: { scale: 1, y: 0 },
                                                    unmount: { scale: 0, y: 25 },
                                                }} >
                                                <DesktopDatePicker
                                                    // label="Date desktop"
                                                    id="building_const_period_to"
                                                    inputFormat="MM/DD/YYYY"
                                                    onChange={(e) => handleDatePickerChange(e, "building_const_period_to")}
                                                    value={safNewFormOwnerBuildingConstPeriod.building_const_period_to}
                                                    renderInput={(params) => <TextField {...params} />}
                                                    className={`${safNewFormValidator.isBuildingConstPeriodToValid == false ?
                                                        `border-red-900` : ``}`}
                                                />
                                            </Tooltip>
                                        </Stack>
                                    </LocalizationProvider>

                                </div>
                            </div>

                        </div> */}
                        <div className="mb-6"></div>
                        <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-lg mt-4  lg:max-w-full">
                            <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-orange-700 h-10 rounded-md drop-shadow-xl">
                                <h2 className="text-sm font-semibold text-center text-white">
                                    Property Details
                                </h2>
                            </nav>
                            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Plot Area(Sq.ft.)
                                        <p className='contents text-red-600 text-sm font-bold'>*</p>
                                    </label>
                                    <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                                ${safNewFormValidator.isPlotAreaValid == false ? `` : `hidden`}`}
                                        placement='top'
                                        content={safInputValidatorMsgList.validPlotArea}
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }} >
                                        <input onChange={handleSAFNewFormOwnerPropertyDetailsChange}
                                            value={safNewFormOwnerPropertyDetails.plot_area}
                                            className={`bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 
                                            px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 
                                            focus:border-orange-500
                                            ${safNewFormValidator.isPlotAreaValid == false ?
                                                    `border-red-900` : `border-gray-500`}`}
                                            id="plot_area" type="text" placeholder="Plot Area" />
                                    </Tooltip>
                                </div>
                                {/* <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Vacant Land Area(Sq.ft.)
                                        <p className='contents text-red-600 text-sm font-bold'>*</p>
                                    </label>
                                    <input onChange={handleSAFNewFormOwnerPropertyDetailsChange}
                                        value={safNewFormOwnerPropertyDetails.vacant_land_area}
                                        className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                                        id="vacant_land_area" type="text" placeholder="Open Land Area" />
                                </div> */}
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
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
                                        {/* <input onChange={handleSAFNewFormOwnerPropertyDetailsChange}
                                            value={safNewFormOwnerPropertyDetails.plot_no}
                                            className={`bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500
                                            ${safNewFormValidator.isPlotNumValid == false ?
                                                    `border-red-900` : `border-gray-500`}`}
                                            id="plot_no" type="text" placeholder="Plot No." /> */}
                                              <input onChange={handleSAFNewFormOwnerPropertyDetailsChange}
                                            value={safNewFormOwnerPropertyDetails.plot_no}
                                            className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500
                                           
                                                "
                                            id="plot_no" type="text" placeholder="Plot No." />
                                    {/* </Tooltip> */}
                                </div>
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Khata No.
                                        {/* <p className='contents text-red-600 text-sm font-bold'>*</p> */}
                                    </label>
                                    {/* <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                                ${safNewFormValidator.isKhataNumValid == false ? `` : `hidden`}`}
                                        placement='top'
                                        content={safInputValidatorMsgList.validKhataNumMsg}
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }} > */}
                                        {/* <input onChange={handleSAFNewFormOwnerPropertyDetailsChange}
                                            value={safNewFormOwnerPropertyDetails.khata_no}
                                            className={`bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500
                                            ${safNewFormValidator.isKhataNumValid == false ?
                                                    `border-red-900` : `border-gray-500`}`}
                                            id="khata_no" type="text" placeholder="Khata No." /> */} 
                                             <input onChange={handleSAFNewFormOwnerPropertyDetailsChange}
                                            value={safNewFormOwnerPropertyDetails.khata_no}
                                            className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500
                                           "
                                            id="khata_no" type="text" placeholder="Khata No." />
                                    {/* </Tooltip> */}
                                </div>

                            </div>
                        </div>
                        <div className="mb-6"></div>
                        <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-none mt-4 lg:max-w-full">
                            <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-orange-500 h-10 rounded-md drop-shadow-xl">
                                <h2 className="text-sm font-semibold text-center text-white">
                                    Property Address
                                </h2>
                            </nav>

                            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                                <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Property Address
                                        <p className='contents text-red-600 text-sm font-bold'>*</p>
                                    </label>
                                    <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                                ${safNewFormValidator.isPropAddressValid == false ? `` : `hidden`}`}
                                        placement='top'
                                        content={safInputValidatorMsgList.validPropAddressMsg}
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }} >
                                        <textarea onChange={handleSAFNewFormOwnerPropertyAddressChange}
                                            value={safNewFormOwnerPropertyAddress.prop_address}
                                            className={`bg-white-200 appearance-none border border-gray-500 rounded w-full h-10 py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500
                                        ${safNewFormValidator.isPropAddressValid == false ?
                                                    `border-red-900` : `border-gray-500`}`}
                                            id="prop_address" name="w3review" rows="4" cols="20"></textarea>
                                    </Tooltip>
                                </div>
                                <div className="mb-4 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        District
                                        {/* <p className='contents text-red-600 text-sm font-bold'>*</p> */}
                                    </label>
                                    {/* <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                                ${safNewFormValidator.isPropDistrictValid == false ? `` : `hidden`}`}
                                        placement='top'
                                        content={safInputValidatorMsgList.validPropDistrictMsg}
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }} > */}
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
                                         <Select onChange={handleSAFNewFormOwnerPropertyAddressChange}
                                            label="District" color='orange' className={`pl-2 pr-3 py-2 font-bold text-xs text-gray-900
                                         `}>
                                            {
                                                districtData.length > 0 ? (districtData.map(item => {
                                                    const { id, districtName } = item
                                                    return (<Option key={id} value={`property_${districtName}`}>{districtName}</Option>)
                                                })) : (<Option key="abc" value="">Loading...</Option>)
                                            }
                                        </Select>
                                    {/* </Tooltip> */}
                                </div>
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        PIN Code
                                        {/* <p className='contents text-red-600 text-xs font-bold'>*</p> */}
                                    </label>
                                    <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                                ${safNewFormValidator.isPropPinValid == false ? `` : `hidden`}`}
                                        placement='top'
                                        content={safInputValidatorMsgList.validPropPinMsg}
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }} >
                                        <input onChange={handleSAFNewFormOwnerPropertyAddressChange}
                                            value={safNewFormOwnerPropertyAddress.pin}
                                            className={`bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500
                                        ${safNewFormValidator.isPropPinValid == false ?
                                                    `border-red-900` : `border-gray-500`}`}
                                            id="pin" type="text" placeholder="PIN Code" />
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Village(Mohalla)
                                        {/* <p className='contents text-red-600 text-xs font-bold'>*</p> */}
                                    </label>
                                    <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                                ${safNewFormValidator.isPropMohallaValid == false ? `` : `hidden`}`}
                                        placement='top'
                                        content={safInputValidatorMsgList.validMohallaMsg}
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }} >
                                        <input onChange={handleSAFNewFormOwnerPropertyAddressChange}
                                            value={safNewFormOwnerPropertyAddress.mohalla}
                                            className={`bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500
                                            ${safNewFormValidator.isPropMohallaValid == false ?
                                                `border-red-900` : `border-gray-500`}
                                            `}
                                            id="mohalla" type="text" placeholder="Village" />
                                    </Tooltip>
                                </div>
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        City
                                        <p className='contents text-red-600 text-xs font-bold'>*</p>
                                    </label>
                                    <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                                ${safNewFormValidator.isPropCityValid == false ? `` : `hidden`}`}
                                        placement='top'
                                        content={safInputValidatorMsgList.validPropCityMsg}
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }} >
                                        <input onChange={handleSAFNewFormOwnerPropertyAddressChange}
                                            value={safNewFormOwnerPropertyAddress.city}
                                            className={`bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500
                                        ${safNewFormValidator.isPropCityValid == false ?
                                                    `border-red-900` : `border-gray-500`}`}
                                            id="city" type="text" placeholder="City" />
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

                        <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-md mt-4 lg:max-w-full">
                            <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-orange-500 h-10 rounded-md drop-shadow-xl" >
                                <h2 className="text-sm font-semibold text-center text-white">
                                    Property Type Details
                                </h2>
                            </nav>
                            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Property Type<p className=' contents text-red-600 text-sm font-bold'>*</p>
                                    </label>
                                    <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                                ${safNewFormValidator.isPropertyTypeValid == false ? `` : `hidden`}`}
                                        placement='top'
                                        content={safInputValidatorMsgList.validPropertyTypeMsg}
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }} >
                                        <Select onChange={handleSAFNewFormPropertyTypeDetails}
                                            label="Select" color='orange' className={`pl-2 pr-3 py-2 font-bold text-xs text-gray-900
                                        ${safNewFormValidator.isPropertyTypeValid == false ?
                                                    `border-red-900` : ``}`}>
                                            {
                                                safNewFormAllInputFromAPI.property_type.length > 0 ?
                                                    (safNewFormAllInputFromAPI.property_type.map((item) => {
                                                        const { id, property_type_name, status } = item
                                                        return <Option key={id} value={JSON.stringify(item)}>{property_type_name}</Option>
                                                    })) : (<Option>Loading...</Option>)
                                            }
                                        </Select>
                                    </Tooltip>
                                </div>
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" 
                                    htmlFor="password">
                                        Road Type
                                        {/* <p className=' contents text-red-600 text-sm font-bold'>*</p> */}
                                    </label>
                                    {/* <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                                ${safNewFormValidator.isRoadTypeValid == false ? `` : `hidden`}`}
                                        placement='top'
                                        content={safInputValidatorMsgList.validRoadTypeMsg}
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }} >
                                        <Select onChange={handleSAFNewFormPropertyTypeDetails}
                                            label="Select" className={`pl-2 pr-3 py-2 font-bold text-xs text-gray-900
                                        ${safNewFormValidator.isRoadTypeValid == false ?
                                                    `border-red-900` : ``}`}>
                                            {
                                                safNewFormAllInputFromAPI.roadType.length > 0 ?
                                                    (safNewFormAllInputFromAPI.roadType.map((item) => {
                                                        const { id, road_name, status } = item
                                                        return <Option key={id} value={JSON.stringify(item)}>{road_name}</Option>
                                                    })) : (<Option>Loading...</Option>)
                                            }
                                        </Select>
                                    </Tooltip> */}
                                    <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4 custom-checkbox">
                                        <Checkbox
                                            id={`road_type_${safNewFormAllInputFromAPI.roadType[0]?.id}`}
                                            checked={safNewFormPropertyTypeDetails.road_type_id ==
                                                safNewFormAllInputFromAPI.roadType[0]?.id}
                                            onChange={handleSAFNewFormPropertyTypeDetails}
                                            color="orange"
                                            className="custom-checkbox"
                                            label={safNewFormAllInputFromAPI.roadType[0]?.road_name} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-0 pt-0 pb-4 m-2 bg-white rounded-none mt-4  lg:max-w-full">
                                <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red h-10 rounded-lg drop-shadow-xl">
                                    <h2 className="text-sm font-semibold text-center text-white">
                                        Floor Details
                                    </h2>
                                </nav>
                                {
                                    safNewFormValidator.isFloorDetailsValid == false ?
                                        (<p className='m-3 text-red-600 text-xs font-bold'>{safInputValidatorMsgList.validPropertyFloorDetailsMsg}</p>)
                                        : null
                                }
                                {
                                    safNewFormValidator.isSelectedFloorValid == false ?
                                        (<p className='m-3 text-red-600 text-xs font-bold'>{safInputValidatorMsgList.validPropertyFloorSelectMsg}</p>)
                                        : null
                                }
                                {
                                    //This part is rendering the floor details array
                                    /**
                                     * ***************************************************************
                                     */
                                    safNewFormPropertyFloorDetails.map((floorObj, floorIndex, floorArr) => {
                                        // console.log("floor ara")
                                        console.log(JSON.stringify(floorObj.from_date_obj))
                                        return (
                                            <div className="border-none" key={floorIndex}>
                                                <div
                                                    className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                                                    <div className="mb-4 ml-3 mr-2 mt-2 min-w-fit max-w-fit">
                                                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                                            Floor No.
                                                            <p className='contents text-red-600 text-sm font-bold'>*</p>
                                                        </label>
                                                        {/* <Select onChange={(e) => handleSAFNewFormPropertyFloorDetailsChange(e, floorIndex)}
                                                            label="Select" className='pl-2 pr-3 py-2 font-bold text-xs text-gray-900'>
                                                            {
                                                                safNewFormAllInputFromAPI.floor.length > 0 ?
                                                                    (safNewFormAllInputFromAPI.floor.map((item, index) => {
                                                                        const { id, floor_name, status, discount_per, short_name } = item
                                                                        return <Option key={index} value={JSON.stringify(item)}>{floor_name}</Option>
                                                                    })) : (<Option>Loading...</Option>)
                                                            }
                                                        </Select> */}
                                                        <select
                                                            // value={JSON.stringify(safNewFormPropertyFloorDetails.from_date_obj)}
                                                            onChange={(e) => handleSAFNewFormPropertyFloorDetailsChange(e, floorIndex)}
                                                            color='orange'
                                                            className="w-full p-2 text-gray-500 bg-white border border-blue-gray-200 rounded-md shadow-sm outline-none focus:border-orange-500 ">
                                                            <option value="">Select an option</option>
                                                            {
                                                                safNewFormAllInputFromAPI.floor.length > 0 ?
                                                                    (safNewFormAllInputFromAPI.floor.map((item, index) => {
                                                                        const { id, floor_name, status, discount_per, short_name } = item
                                                                        const isSelected = floor_name == floorObj.floor_name
                                                                        return <option key={index}
                                                                            selected={isSelected}
                                                                            value={JSON.stringify(item)}
                                                                        >{floor_name}</option>
                                                                    })) : (<option value=''>Loading...</option>)
                                                            }
                                                        </select>
                                                    </div>


                                                    <div className="mb-4 ml-2 mt-2 min-w-fit max-w-fit">
                                                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                                            Ocuupancy Type<p className=' contents text-red-600 text-sm font-bold'>*</p>
                                                        </label>
                                                        {/* <Select onChange={(e) => handleSAFNewFormPropertyFloorDetailsChange(e, floorIndex)}
                                                            label="Select" className='pl-2 pr-3 py-2 font-bold text-xs text-gray-900'>
                                                            {
                                                                safNewFormAllInputFromAPI.occupation_type.length > 0 ?
                                                                    (safNewFormAllInputFromAPI.occupation_type.map((item, index) => {
                                                                        const { id, occup_type, status } = item
                                                                        return <Option key={index} value={JSON.stringify(item)}>{occup_type}</Option>
                                                                    })) : (<Option>Loading...</Option>)
                                                            }
                                                        </Select> */}
                                                        <select
                                                            // value={JSON.stringify(safNewFormPropertyFloorDetails.from_date_obj)}
                                                            onChange={(e) => handleSAFNewFormPropertyFloorDetailsChange(e, floorIndex)}
                                                            color='orange'
                                                            className="w-full p-2 text-gray-500 bg-white border border-blue-gray-200 rounded-md shadow-sm outline-none focus:border-orange-500 ">
                                                            <option value="">Select an option</option>
                                                            {
                                                                safNewFormAllInputFromAPI.occupation_type.length > 0 ?
                                                                    (safNewFormAllInputFromAPI.occupation_type.map((item, index) => {
                                                                        const { id, occup_type, status } = item
                                                                        const isSelected = occup_type == floorObj.occupancy_type
                                                                        return <option key={index}
                                                                            selected={isSelected}
                                                                            value={JSON.stringify(item)}>{occup_type}</option>
                                                                    })) : (<option value=''>Loading...</option>)
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="mb-4 ml-2 mt-2 min-w-fit max-w-fit">
                                                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                                            Usage Type<p className=' contents text-red-600 text-sm font-bold'>*</p>
                                                        </label>
                                                        {/* <Select onChange={(e) => handleSAFNewFormPropertyFloorDetailsChange(e, floorIndex)}
                                                            label="Select" className='pl-2 pr-3 py-2 font-bold text-xs text-gray-900'>
                                                            {
                                                                safNewFormAllInputFromAPI.uses_type.length > 0 ?
                                                                    (safNewFormAllInputFromAPI.uses_type.map((item, index) => {
                                                                        const { id, uses_type_name, status, short_name } = item
                                                                        return <Option key={index} value={JSON.stringify(item)}>{uses_type_name}</Option>
                                                                    })) : (<Option>Loading...</Option>)
                                                            }
                                                        </Select> */}
                                                        <select
                                                            // value={JSON.stringify(safNewFormPropertyFloorDetails.from_date_obj)}
                                                            onChange={(e) => handleSAFNewFormPropertyFloorDetailsChange(e, floorIndex)}
                                                            color='orange'
                                                            className="w-full p-2 text-gray-500 bg-white border border-blue-gray-200 rounded-md shadow-sm outline-none focus:border-orange-500 ">
                                                            <option value="">Select an option</option>
                                                            {
                                                                safNewFormAllInputFromAPI.uses_type.length > 0 ?
                                                                    (safNewFormAllInputFromAPI.uses_type.map((item, index) => {
                                                                        const { id, uses_type_name, status, short_name } = item
                                                                        const isSelected = uses_type_name == floorObj.uses_type_name
                                                                        return <option key={index}
                                                                            selected={isSelected}
                                                                            value={JSON.stringify(item)}>{uses_type_name}</option>
                                                                    })) : (<option value=''>Loading...</option>)
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="mb-4 ml-2 mt-2 min-w-fit max-w-fit">
                                                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                                            {
                                                                safNewFormPropertyTypeDetails.property_type_id == '3' ? 
                                                                `Super ` : ``
                                                            }
                                                            Build Up Area(In Sq.ft.)
                                                            <p className='contents text-red-600 text-sm font-bold'>*</p>
                                                        </label>
                                                        <input onChange={(e) => handleSAFNewFormPropertyFloorDetailsChange(e, floorIndex)}
                                                            value={floorObj.built_up_area}
                                                            className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                                                            id="built_up_area" type="text" placeholder="Build Up Area" />
                                                    </div>


                                                </div>
                                                <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                                                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                                            Date From<p className='contents text-red-600 text-sm font-bold'>*</p>
                                                        </label>
                                                        {/* <Select  
                                                        onChange={(e) => handleSAFNewFormPropertyFloorDetailsChange(e, floorIndex, 'from_date')}
                                                        value={JSON.stringify(floorObj.from_date_obj)}
                                                            label="Select" className='pl-2 pr-3 py-2 font-bold text-xs text-gray-900'>
                                                            {
                                                                safNewFormAllInputFromAPI.financial_year.length > 0 ?
                                                                    (safNewFormAllInputFromAPI.financial_year.map((item, index) => {
                                                                        const { id, fy_name, status } = item
                                                                        return <Option key={index} value={JSON.stringify(item)}>{fy_name}</Option>
                                                                    })) : (<Option value='value'>Loading...</Option>)
                                                            }
                                                            <Option value='' hidden >empty</Option>
                                                        </Select> */}
                                                        <select
                                                            // value={JSON.stringify(safNewFormPropertyFloorDetails.from_date_obj)}
                                                            onChange={(e) => handleSAFNewFormPropertyFloorDetailsChange(e, floorIndex, 'from_date')}
                                                            color='orange'
                                                            className="w-full p-2 text-gray-500 bg-white border border-blue-gray-200 rounded-md shadow-sm outline-none focus:border-orange-500 ">
                                                            <option value="">Select an option</option>
                                                            {
                                                                safNewFormAllInputFromAPI.financial_year.length > 0 ?
                                                                    (safNewFormAllInputFromAPI.financial_year.map((item, index) => {
                                                                        const { id, fy_name, status } = item
                                                                        const isSelected = fy_name == floorObj.from_date
                                                                        return <option key={index}
                                                                            selected={isSelected}
                                                                            value={JSON.stringify(item)}>{fy_name}</option>
                                                                    })) : (<option value=''>Loading...</option>)
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                                            Date UpTo
                                                        {/* <p className='contents text-red-600 text-sm font-bold'>*</p> */}
                                                        </label>
                                                        {/* <Select onChange={(e) => handleSAFNewFormPropertyFloorDetailsChange(e, floorIndex, 'to_date')}
                                                            label="Select" className='pl-2 pr-3 py-2 font-bold text-xs text-gray-900'>
                                                            {
                                                                safNewFormAllInputFromAPI.financial_year.length > 0 ?
                                                                    (safNewFormAllInputFromAPI.financial_year.map((item, index) => {
                                                                        const { id, fy_name, status } = item
                                                                        return <Option key={index} value={JSON.stringify(item)}>{fy_name}</Option>
                                                                    })) : (<Option>Loading...</Option>)
                                                            }
                                                        </Select> */}
                                                        <select
                                                            // value={JSON.stringify(safNewFormPropertyFloorDetails.from_date_obj)}
                                                            color='orange'
                                                            onChange={(e) => handleSAFNewFormPropertyFloorDetailsChange(e, floorIndex, 'to_date')}  
                                                            className="w-full p-2 text-gray-500 bg-white border border-blue-gray-200 rounded-md shadow-sm outline-none focus:border-orange-500 ">
                                                            <option value="">Select an option</option>
                                                            {
                                                                safNewFormAllInputFromAPI.financial_year.length > 0 ?
                                                                    (safNewFormAllInputFromAPI.financial_year.map((item, index) => {
                                                                        const { id, fy_name, status } = item
                                                                        const isSelected = fy_name == floorObj.to_date
                                                                        return <option key={index}
                                                                            selected={isSelected}
                                                                            value={JSON.stringify(item)}>{fy_name}</option>
                                                                    })) : (<option value=''>Loading...</option>)
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                                            Building Type<p className='contents text-red-600 text-sm font-bold'>*</p>
                                                        </label>
                                                        {/* <Select onChange={(e) => handleSAFNewFormPropertyFloorDetailsChange(e, floorIndex)}
                                                            label="Select" className='pl-2 pr-3 py-2 font-bold text-xs text-gray-900'>
                                                            {
                                                                safNewFormAllInputFromAPI.building_type.length > 0 ?
                                                                    (safNewFormAllInputFromAPI.building_type.map((item, index) => {
                                                                        const { id, const_type, status } = item
                                                                        return <Option key={index} value={JSON.stringify(item)}>{const_type}</Option>
                                                                    })) : (<Option key='abc' >Loading...</Option>)
                                                            }
                                                        </Select> */}
                                                        <select
                                                            // value={JSON.stringify(floorObj.const_type)}
                                                            onChange={(e) => handleSAFNewFormPropertyFloorDetailsChange(e, floorIndex, 'to_date')}
                                                            color='orange'
                                                            className="w-full p-2 text-gray-500 bg-white border border-blue-gray-200 rounded-md shadow-sm outline-none focus:border-orange-500 ">
                                                            <option value="">Select an option</option>
                                                            {
                                                                safNewFormAllInputFromAPI.building_type.length > 0 ?
                                                                    (safNewFormAllInputFromAPI.building_type.map((item, index) => {
                                                                        const { id, const_type, status } = item
                                                                        //changed from const_type to construction_type
                                                                        const isSelected = const_type == floorObj.construction_type
                                                                        return <option key={index}
                                                                            selected={isSelected}
                                                                            value={JSON.stringify(item)}>{const_type}</option>
                                                                    })) : (<option value=''>Loading...</option>)
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="mb-4 ml-3 mt-2 flex min-w-fit max-w-fit">
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
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                        </div>
                        <div className="mb-6"></div>

                        <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-none mt-4  lg:max-w-full">
                            <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red h-10 rounded-md drop-shadow-xl">
                                <h2 className="text-sm font-semibold text-center text-white">
                                    Others Details
                                </h2>
                            </nav>
                            {
                                safNewFormValidator.isOtherDetailsValid == false ? (
                                    <p className='text-xs text-red-600 m-3 font-bold'>{safInputValidatorMsgList.validPropertOtherDetailsMsg}</p>
                                ) : null
                            }
                            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4">
                                <div className="flex justify-center">
                                    <div className="mb-4 ml-3 mt-2 lg:w-96  gap-4">
                                        <label htmlFor="formFile" className="form-label 
                                        inline-block mb-0 text-xs font-bold text-gray-900">
                                            Owner's Image(jpg,png,jpeg)
                                            {/* <p className='contents text-red-600 text-sm font-bold'>*</p> */}
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
                                            focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none" type="file"
                                            id="owner_file" />
                                    </div>
                                </div>
                                <div className="mb-4 ml-3 mt-2 flex min-w-fit max-w-fit gap-4 ">
                                    <Button onClick={uploadFile}
                                        id='owner_file_btn'
                                        color="green" type='button'
                                        className='h-6 w-16 px-2 py-1 bg-green-700 rounded custom_button_add'>Upload</Button>
                                    {/* <Button color="red" type='button'
                                        className='h-6 w-16 px-2 py-1 bg-red-700 rounded'>Delete</Button> */}
                                    {
                                        isOwnerImageUploading == true ? (
                                            <div className="m-auto w-24 h-24">
                                                <ColorRing
                                                    visible={true}
                                                    height="40"
                                                    width="40"
                                                    colors={['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000']}
                                                />
                                            </div>
                                        ) : null
                                    }
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


                            </div>
                            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4">
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
                                    focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none" type="file"
                                            id="floor_files" color='orange' multiple />
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
                                    {/* <Button color="red" type='button'
                                        className='h-6 w-16 px-2 py-1 bg-red-700 rounded'>Delete</Button> */}
                                </div>
                                {
                                    isFloorImageUploading == true ? (
                                        <div className="m-auto w-24 h-24">
                                            <ColorRing
                                                visible={true}
                                                height="40"
                                                width="40"
                                                colors={['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000']}
                                            />
                                        </div>
                                    ) : null
                                }
                                {
                                    isFloorImageUploaded == true ? (
                                        <p className="m-3 text-green-700 text-xs font-bold">
                                            Floor documents have been successfully uploaded
                                        </p>
                                    ) : isFloorImageUploaded == false ? (<p className="m-3 text-red-700 text-xs font-bold">
                                        Something went wrong! Please make sure to enter property id, if issue persists contact support team.
                                    </p>) : null
                                }

                            </div>
                            {/* <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4">
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Please select the financial year <p className='contents text-red-600 text-sm font-bold'>*</p>
                                    </label>
                                    <Select
                                        onChange={handleSAFNewFormOtherDetailsChange}
                                        // value={JSON.stringify()}
                                        label="Select" className='lg:w-72 pl-2 pr-3 py-2 font-bold text-xs text-gray-900'>
                                        {
                                            safNewFormAllInputFromAPI.financial_year.length > 0 ?
                                                (safNewFormAllInputFromAPI.financial_year.map((item, index) => {
                                                    const { id, fy_name, status } = item
                                                    return <Option key={index} value={JSON.stringify(item)}>{fy_name}</Option>
                                                })) : (<Option value='value'>Loading...</Option>)
                                        }
                                        <Option value='' hidden >empty</Option>
                                    </Select>
                                </div>
                            </div> */}
                            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4">


                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Does Property Have Mobile Tower?<p className='contents text-red-600 text-sm font-bold'>*</p>
                                    </label>
                                    <Select onChange={handleSAFNewFormOtherDetailsChange}
                                        label="Select" color='orange' className='lg:w-72 pl-2 pr-3 py-1 font-bold text-sm text-gray-900'>
                                        <Option value='mobiletower_Yes' >Yes</Option>
                                        <Option value='mobiletower_No' >No</Option>
                                    </Select>
                                </div>


                            </div>

                            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4 custom-checkbox">
                                <Checkbox
                                    id='rain_harvest'
                                    checked={safNewFormOtherDetails.rain_harvest === 'Yes'}
                                    onChange={handleSAFNewFormOtherDetailsCheckboxChange}
                                    color="orange"
                                    className="custom-checkbox"
                                    label="Does the property have Rainwater Harvesting Provision?If Yes then select Checkbox" />
                            </div>



                            {
                                safNewFormOtherDetails.rain_harvest == "Yes" ? (<><div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4">   <div className="flex justify-center">
                                    <div className="mb-4 ml-3 mt-2 lg:w-96  gap-4">
                                        <label htmlFor="formFile" className="form-label inline-block mb-0 text-xs font-bold text-gray-900">Rainwater Harvest Docs(jpg,png,jpeg,pdf)
                                            <p className='contents text-red-600 text-sm font-bold'>*</p>
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
                                            focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none" type="file"
                                            id="rain_water_harvest_file" />
                                    </div>
                                </div>
                                    <div className="mb-4 ml-3 mt-2 flex min-w-fit max-w-fit gap-4 ">
                                        <Button onClick={uploadFile}
                                            id='rain_water_harvest_file_btn'
                                            color="green" type='button'
                                            className='h-6 w-16 px-2 py-1 bg-green-700 rounded custom_button_add'>Upload</Button>
                                        {/* <Button color="red" type='button'
                                            className='h-6 w-16 px-2 py-1 bg-red-700 rounded'>Delete</Button> */}
                                    </div>
                                    {
                                        isRainWaterFileUploading == true ? (
                                            <div className="m-auto w-24 h-24">
                                                <ColorRing
                                                    visible={true}
                                                    height="40"
                                                    width="40"
                                                    colors={['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000']}
                                                />
                                            </div>
                                        ) : null
                                    }
                                    {
                                        isRainWaterFileUploaded == true ? (
                                            <p className="m-3 text-green-700 text-xs font-bold">
                                                Rain water harvest document has been successfully uploaded
                                            </p>
                                        ) : isRainWaterFileUploaded == false ? (<p className="m-3 text-red-700 text-xs font-bold">
                                            Something went wrong! Please make sure to enter property id, if issue persists contact support team.
                                        </p>) : null
                                    }
                                </div></>) : null

                            }


                            {/* <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4">
                                <div className="flex min-w-fit  text-sm">
                                <Checkbox 
                                    id='rain_harvest'
                                    checked={safNewFormOtherDetails.rain_harvest === 'Yes'}
                                    onChange={handleSAFNewFormOtherDetailsCheckboxChange}
                                    color="teal" 
                                    label="Does the property have Rainwater Harvesting Provision?If Yes then select Checkbox" />
                            </div>
                            
                                {
                                    safNewFormOtherDetails.rain_harvest == "Yes" ? (<><div className="flex justify-center">
                                        <div className="mb-4 ml-3 mt-2 lg:w-96  gap-4">
                                            <label htmlFor="formFile" className="form-label inline-block mb-0 text-xs font-bold text-gray-900">Rainwater Harvest Docs(jpg,png,jpeg,pdf)
                                                <p className='contents text-red-600 text-sm font-bold'>*</p>
                                            </label>
                                            <input className="text-xs form-control
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
                                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" />
                                        </div>
                                    </div>
                                        <div className="mb-4 ml-3 mt-2 flex min-w-fit max-w-fit gap-4 ">
                                            <Button color="green" type='button'
                                                className='h-6 w-16 px-2 py-1 bg-green-700 rounded custom_button_add'>Upload</Button>
                                            <Button color="red" type='button'
                                                className='h-6 w-16 px-2 py-1 bg-red-700 rounded'>Delete</Button>
                                        </div></>) : null
                                }
                               
                            </div> */}
                            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4 custom-checkbox">
                                <Checkbox
                                    //disabled={safNewFormOtherDetails.is_handicapped == 'Yes'}
                                    id='is_widow_ex_army'
                                    checked={safNewFormOtherDetails.is_widow_ex_army === 'Yes'}
                                    onChange={handleSAFNewFormOtherDetailsCheckboxChange}
                                    color="orange"
                                    className="custom-checkbox"
                                    label="Does Property belongs to Widow/Abandoment/Mentally Disabled/Visually Impaired/Ex-Army?If Yes then select Checkbox" />
                            </div>
                            {/* <div className="flex min-w-fit  text-sm">
                                
                            </div> */}
                            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4 custom-checkbox">
                                <Checkbox
                                    //disabled={safNewFormOtherDetails.is_widow_ex_army == 'Yes'}
                                    id='is_handicapped'
                                    checked={safNewFormOtherDetails.is_handicapped === 'Yes'}
                                    onChange={handleSAFNewFormOtherDetailsCheckboxChange}
                                    color="orange"
                                    className="custom-checkbox"
                                    label="Does Property belong to Physically Disabled? If Yes then select this checkbox" />
                            </div>
                            {/* <div className="flex min-w-fit  text-sm">
                                
                            </div> */}
                            {
                                //The below 2 divs contain changes which is not needed right now, commenting==================
                            }
                            {/* <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4">
                                <div className="mb-4 ml-3 mt-2 lg:w-96 w-64 gap-4 break-words">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Is Property More Than 20 Years Old? (This will be calculated automatically based on Building Construction Period Time)<p className='contents text-red-600 text-sm font-bold'>*</p>
                                    </label>
                                    <Select
                                        value={safNewFormOtherDetails.is_property_more_than_20_years_old == 'Yes' ?
                                            `age20_Yes` : `age20_No`}
                                        onChange={handleSAFNewFormOtherDetailsChange}
                                        disabled
                                        label="Select"
                                        className='w-full pl-2 pr-3 py-1 font-bold text-sm text-gray-900 cursor-not-allowed'>
                                        <Option value='age20_Yes' >Yes</Option>
                                        <Option value='age20_No' >No</Option>
                                    </Select>
                                </div>
                            </div> */}
                            {/* <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4">
                                <div className="mb-4 ml-3 mt-2 lg:w-96 w-64 gap-4 break-words">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Old Property waived Off In 2022-2023? If Yes Then Select Yes<p className='contents text-red-600 text-sm font-bold'>*</p>
                                    </label>
                                    <Select onChange={handleSAFNewFormOtherDetailsChange}
                                        label="Select" className='w-full pl-2 pr-3 py-1 font-bold text-sm text-gray-900'>
                                        <Option value='waivedoff_Yes' >Yes</Option>
                                        <Option value='waivedoff_No' >No</Option>
                                    </Select>
                                </div>
                            </div> */}
                            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4 custom-checkbox">
                                <Checkbox
                                    id='is_isdp'
                                    checked={safNewFormOtherDetails.is_isdp === 'Yes'}
                                    onChange={handleSAFNewFormOtherDetailsCheckboxChange}
                                    color="orange"
                                    className="custom-checkbox"
                                    label="If Property belongs to IHSDP? If Yes then select this checkbox" />
                            </div>
                            {/* <div className="flex min-w-fit  text-sm">
                                
                            </div> */}
                            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4 custom-checkbox">
                                <Checkbox
                                    id='is_school'
                                    checked={safNewFormOtherDetails.is_school === 'Yes'}
                                    onChange={handleSAFNewFormOtherDetailsCheckboxChange}
                                    color="orange"
                                    className="custom-checkbox"
                                    label="If School? If Yes then select this checkbox" />
                            </div>
                            {/* <div className="flex min-w-fit  text-sm">
                               
                            </div> */}
                            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4 custom-checkbox">
                                <Checkbox
                                    id='is_complex'
                                    checked={safNewFormOtherDetails.is_complex === 'Yes'}
                                    onChange={handleSAFNewFormOtherDetailsCheckboxChange}
                                    color="orange"
                                    className="custom-checkbox"
                                    label="If Complex? If Yes then select this checkbox" />
                            </div>
                            {/* <div className="flex min-w-fit  text-sm">
                               
                            </div> */}
                        </div>
                        <div className="mb-6"></div>

                    </div>



                </form>
              {
                showFloatingMessage === true ? isSAFFormValid == true ? (
                    <FloatingMessage
                        color='green'
                        closeFloatingMessage={closeFloatingMessage}
                        showMessage={true}
                        message='All inputs in the form have been validated, now you can submit the form!' />
                ) : isSAFFormValid == false ? (
                    <FloatingMessage
                        color='red'
                        closeFloatingMessage={closeFloatingMessage}
                        showMessage={true}
                        message='Some inputs in the form is not valid! Please re-verify the details and validate again!' />
                ) : null: null
              }
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
                {
                    isSAFFormSubmissionLoading == true ? (
                        <div className="m-auto w-24 h-24">
                            <ColorRing
                                visible={true}
                                height="40"
                                width="40"
                                colors={['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000']}
                            />
                        </div>
                    ) : null
                }
                {
                    isSAFFormSubmissionSuccess == false ? (
                        <FloatingMessage
                            color='red'
                            closeFloatingMessage={closeFloatingMessageForSAFNewSubmissionFailure}
                            showMessage={true}
                            message='Something went wrong during form submission(Make sure to put unique Property No.)! Please try again' />
                    ) : null
                }
                <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-none mt-4 lg:max-w-full">
                    <div className="container py-2 px-10 mx-0 min-w-full flex flex-col items-center">
                        <div className="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
                            {isPublicSAF ? (
                                <CustomBackButton showCustomBackButton={true}
                                    switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
                                    currModal={currModal} prevModal={prevModal} />
                            ) : null
                            }
                            <button onClick={handleSAFNewFormValidation}
                                className="w-36 h-8 px-4 py-1 mx-4 mb-2 tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
                                Validate
                            </button>

                            {/* <button disabled={!isSAFFormValid}
                                onClick={() => handleSAFNewFormSubmission()}
                                className={`w-36 h-8 px-4 py-1  mx-4 mb-2 tracking-wide text-white transition-colors duration-200 
                                ${!isSAFFormValid ? `cursor-not-allowed` : ``}
                                transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400`}>
                                Submit
                            </button> */}
                            <button 
                                onClick={() => handleSAFNewFormSubmission()}
                                className={`w-36 h-8 px-4 py-1  mx-4 mb-2 tracking-wide text-white transition-colors duration-200
                                
                                transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400`}>
                                Submit
                            </button>
                        </div>
                    </div>

                </div>

            </div> 

        </div>
    ) : null
}


export default SAF_Form