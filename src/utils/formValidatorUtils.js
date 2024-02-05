import { AADHAR_NUM_LENGTH, PAN_NUM_LENGTH, PROP_ID_LENGTH } from "./appConstants.js"

const containsDigitsPattern = /\d/
const containsOnlyDigitsPattern = /^\d+$/
const containsSpecialCharPattern = /[^A-Za-z0-9]/
const emailPattern = /^\S+@\S+\.\S+$/

export const isBlankString = (inStr) => {
    // console.log(inStr)
    if (inStr === undefined || inStr == null || inStr.toString().trim() === "" || inStr.toString() === "null"
        || `${inStr}` == 'NaN') {
        // console.log("222")
        return true
    } else {
        return false
    }
}

export const isStringValid = (inStr) => {
    try {
        let inStrInLowerCase = inStr.toString().toLowerCase().trim()
        if (inStrInLowerCase == 'n/a' || inStrInLowerCase == 'na') {
            return false
        } else {
            return true
        }
    } catch (err) {
        console.log(err)
        return false
    }

}

export const isStringContainDigits = (inStr) => {
    return containsDigitsPattern.test(inStr)
}

export const isStringContainOnlyDigits = (inStr) => {
    return containsOnlyDigitsPattern.test(inStr)
}

export const isStringContainsSpecialChar = (inStr) => {
    return containsSpecialCharPattern.test(inStr)
}

export const isStringValidEmail = (inStr) => {
    console.log(inStr)
    return emailPattern.test(inStr)
}

export const isObjectFullyEmpty = (inObj) => {
    let isEmpty = true
    try {
        for (let key in inObj) {
            if (!isBlankString(inObj[key])) {
                return !isEmpty
            }
        }
    } catch (err) {
        console.error(err)
        return true
    }
    return isEmpty
}

// console.log("first")
// console.log(isBlankString("abc@abc.com") || (!isBlankString("abc@abc.com") && isStringValidEmail("abc@abc.com")))
// console.log(isStringValid("n/a"))
console.log("first")
console.log(isStringContainOnlyDigits("111")) 

export const validateSAFNewForm = (safObj, setSAFNewFormValidator) => {
    // isPropIdValid: null, isZoneValid: null, isWardValid: null, isEntryTypeValid: null, isOwnerHonorificValid: null, isOwnerNameValid: null,
    //     isOwnerGenderValid: null, isOwnerGuardianNameValid: null, isOwnerRelationValid: null, isOwnerMobileNumValid: null,
    //         isOwnerAadharValid: null, isOwnerEmailValid: null, isOwnerPanValid: null, isBuildingConstPeriodFromValid: null,
    //             isBuildingConstPeriodToValid: null, isPlotNumValid: null, isKhataNumValid: null, isPropAddressValid: null, 
    // isPropDistrictValid: null, isPropPinValid: null, isPropMohallaValid: null, isPropCityValid: null,
    // isPropertyTypeValid: null, isRoadTypeValid: null, isFloorDetailsValid: null, isOtherDetailsValid: null, isPlotAreaValid
    const { prop_id, zone_id, ward_id, entry_type_id,
        owner_title, prop_owner_name, owner_gender, father_name, owner_relation, mobile_no, aadhar, panno, email,
        plot_area, plot_no, khata_no, prop_address, district, pin, mohalla, city, property_type_id,
        road_type_id, floor_details, isMobileTower, rain_harvest, is_handicapped, is_isdp, is_school,
        is_complex, financial_year, is_widow } = safObj
    //==========================================================================================
    //1. prop_id validation
    if (!isBlankString(prop_id) && isStringContainOnlyDigits(prop_id) &&
        prop_id.toString().length == PROP_ID_LENGTH) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPropIdValid: true } 
        })
    } else {
        // console.log("prop id invalid")
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPropIdValid: false }
        })
    }
    //===================================================================================
    //2. zone_id validation
    // console.log('zone id =' + zone_id + '+')
    if (!isBlankString(zone_id)) {
        // console.log('zone id is valid')
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isZoneValid: true }
        })
    } else {
        // console.log('zone id is not valid')
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isZoneValid: false }
        })
    }
    //=========================================================================
    //3. ward_id validation
    if (!isBlankString(ward_id)) {
        // console.log('zone id is valid')
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isWardValid: true }
        })
    } else {
        // console.log('zone id is not valid')
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isWardValid: false }
        })
    }
    //=================================================================================
    //Entry type validatio=========================
    if (!isBlankString(entry_type_id)) {
        // console.log('zone id is valid')
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isEntryTypeValid: true }
        })
    } else {
        // console.log('zone id is not valid')
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isEntryTypeValid: false }
        })
    }
    //=================================================================================
    //4. Owner personal details validation -- Honorific
    if (!isBlankString(owner_title)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerHonorificValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerHonorificValid: false }
        })
    } //owner name validation
    if (!isBlankString(prop_owner_name)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerNameValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerNameValid: false }
        })
    }
    if (!isBlankString(owner_gender)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerGenderValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerGenderValid: false }
        })
    }
    if (!isBlankString(father_name)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerGuardianNameValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerGuardianNameValid: false }
        })
    }
    if (!isBlankString(owner_relation)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerRelationValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerRelationValid: false }
        })
    }
    if (!isBlankString(mobile_no) && mobile_no.toString().length == 10 && isStringContainOnlyDigits(mobile_no)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerMobileNumValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerMobileNumValid: false }
        })
    }
    console.log("validating aadhar===================")
    console.log(aadhar)
    if (isBlankString(aadhar) || (!isBlankString(aadhar) && 
       isStringContainOnlyDigits(aadhar) &&
        aadhar.toString().length == AADHAR_NUM_LENGTH)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerAadharValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerAadharValid: false }
        })
    }
    if (isBlankString(email) || (!isBlankString(email) && isStringValidEmail(email))) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerEmailValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerEmailValid: false }
        })
    }
    if (isBlankString(panno) || (!isBlankString(panno) && panno.toString().length == PAN_NUM_LENGTH)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerPanValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerPanValid: false }
        })
    }
    //============================================================================
    //5. Property details
    console.log( "plot area validating :: " + plot_area )
    if ( !isBlankString(plot_area) && isStringContainOnlyDigits(plot_area) ) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPlotAreaValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPlotAreaValid: false }
        })
    }

    if (isBlankString(plot_no) || (!isBlankString(plot_no))) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPlotNumValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPlotNumValid: false }
        })
    }
    if (isBlankString(khata_no) || !isBlankString(khata_no)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isKhataNumValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isKhataNumValid: false }
        })
    }
    //===========================================================================
    //6. Property address must be valid
    if (!isBlankString(prop_address)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPropAddressValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPropAddressValid: false }
        })
    }
    if (isBlankString(district) || !isBlankString(district)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPropDistrictValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPropDistrictValid: false }
        })
    }
    if (isBlankString(pin) || (!isBlankString(pin) && isStringContainOnlyDigits(pin) && pin.toString().length == 6)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPropPinValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPropPinValid: false }
        })
    }
    if (isBlankString(mohalla) || !isBlankString(mohalla)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPropMohallaValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPropMohallaValid: false }
        })
    }
    if (!isBlankString(city)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPropCityValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPropCityValid: false }
        })
    }

    //7. Property type validations
    if (!isBlankString(property_type_id)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPropertyTypeValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPropertyTypeValid: false }
        })
    }
    if (!isBlankString(road_type_id)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isRoadTypeValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isRoadTypeValid: false }
        })
    }

    //8. Property floor details validation
    console.log("validating floor details===============")
    console.log(floor_details)
    floor_details.every(floorItem => {
        for (const key in floorItem) {
            if (isBlankString(floorItem[key].toString())) {
                setSAFNewFormValidator(prevState => {
                    return { ...prevState, isFloorDetailsValid: false }
                })
                return false
            }
        }
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isFloorDetailsValid: true }
        })
        return true
    })

    //9. Other details validation
    if (!isBlankString(isMobileTower) && !isBlankString(rain_harvest) && !isBlankString(is_handicapped) && !isBlankString(is_isdp) &&
        !isBlankString(is_school) && !isBlankString(is_complex) && !isBlankString(financial_year) && !isBlankString(is_widow)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOtherDetailsValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOtherDetailsValid: false }
        })
    }
 
}

export const validateSAFReassessmentForm = (safObj, setSAFNewFormValidator) => {
    // isPropIdValid: null, isZoneValid: null, isWardValid: null, isEntryTypeValid: null, isOwnerHonorificValid: null, isOwnerNameValid: null,
    //     isOwnerGenderValid: null, isOwnerGuardianNameValid: null, isOwnerRelationValid: null, isOwnerMobileNumValid: null,
    //         isOwnerAadharValid: null, isOwnerEmailValid: null, isOwnerPanValid: null, isBuildingConstPeriodFromValid: null,
    //             isBuildingConstPeriodToValid: null, isPlotNumValid: null, isKhataNumValid: null, isPropAddressValid: null, 
    // isPropDistrictValid: null, isPropPinValid: null, isPropMohallaValid: null, isPropCityValid: null,
    // isPropertyTypeValid: null, isRoadTypeValid: null, isFloorDetailsValid: null, isOtherDetailsValid: null,
    const { aadhar, area_id, city, construction_date_from, construction_date_upto, current_financial_year, district,
        effective_date, email_id, entry_type_id, entry_type_name, father_name, financial_year, fy_id, isMobileTower,
        is_complex, is_handicapped, is_isdp, is_school, is_widow, khata_no, mobile_no, module_id, module_name,
        mohalla, old_ward_id, owner_gender, owner_pic, owner_relation, owner_title, panno, pin,
        plot_no, prop_address, prop_age_count, prop_id, prop_owner_name, property_type_id,
        purchase_date, rain_harvest, rain_water_docs, road_type_id, total_built_up_area, user_id, vsrno,
        ward_id, zone_id, floor_details } = safObj
    //=========================================================================================
    //===================================================================================
    //2. zone_id validation
    // console.log('zone id =' + zone_id + '+')
    // if (!isBlankString(zone_id)) {
    //     // console.log('zone id is valid') 
    //     setSAFNewFormValidator(prevState => {
    //         return { ...prevState, isZoneValid: true }
    //     })
    // } else {
    //     // console.log('zone id is not valid')
    //     setSAFNewFormValidator(prevState => {
    //         return { ...prevState, isZoneValid: false }
    //     })
    // }
    //=========================================================================
    //3. ward_id validation
    if (!isBlankString(ward_id)) {
        // console.log('zone id is valid')
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isWardValid: true }
        })
    } else {
        // console.log('zone id is not valid')
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isWardValid: false }
        })
    }
    //=================================================================================
    //Entry type validatio=========================
    if (!isBlankString(entry_type_id)) {
        // console.log('zone id is valid')
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isEntryTypeValid: true }
        })
    } else {
        // console.log('zone id is not valid')
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isEntryTypeValid: false }
        })
    }
    //=================================================================================
    //4. Owner personal details validation -- Honorific
    if (!isBlankString(owner_title)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerHonorificValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerHonorificValid: false }
        })
    } //owner name validation
    if (!isBlankString(prop_owner_name)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerNameValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerNameValid: false }
        })
    }
    if (!isBlankString(owner_gender)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerGenderValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerGenderValid: false }
        })
    }
    if (!isBlankString(father_name)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerGuardianNameValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerGuardianNameValid: false }
        })
    }
    if (!isBlankString(owner_relation)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerRelationValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerRelationValid: false }
        })
    }
    if (!isBlankString(mobile_no) && mobile_no.toString().length == 10 && isStringContainOnlyDigits(mobile_no)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerMobileNumValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerMobileNumValid: false }
        })
    }
    if (isBlankString(aadhar) || 
    (!isBlankString(aadhar)
     && isStringContainOnlyDigits(aadhar) &&
        aadhar.toString().length == AADHAR_NUM_LENGTH)
        ) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerAadharValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerAadharValid: false }
        })
    }
    if (isBlankString(email_id) || (!isBlankString(email_id) && isStringValidEmail(email_id))) {
        console.log("email valid++++++++")
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerEmailValid: true }
        })
    } else {
        console.log("email invalid+++++++")
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerEmailValid: false }
        })
    }
    if (isBlankString(panno) || (!isBlankString(panno) && panno.toString().length == PAN_NUM_LENGTH)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerPanValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isOwnerPanValid: false }
        })
    }
    //============================================================================
    //5. Property details
    if (isBlankString(plot_no) ||  !isBlankString(plot_no)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPlotNumValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPlotNumValid: false }
        })
    }
    if (isBlankString(khata_no) ||  !isBlankString(khata_no)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isKhataNumValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isKhataNumValid: false }
        })
    }
    //===========================================================================
    //6. Property address must be valid
    if (!isBlankString(prop_address)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPropAddressValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPropAddressValid: false }
        })
    }
    if (isBlankString(district) || !isBlankString(district)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPropDistrictValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPropDistrictValid: false }
        })
    }
    if (isBlankString(pin) || (!isBlankString(pin) && isStringContainOnlyDigits(pin) && pin.toString().length == 6)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPropPinValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPropPinValid: false }
        })
    }
    if (isBlankString(mohalla) || !isBlankString(mohalla)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPropMohallaValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPropMohallaValid: false }
        })
    }
    if (!isBlankString(city)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPropCityValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPropCityValid: false }
        })
    }

    //7. Property type validations
    if (!isBlankString(property_type_id)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPropertyTypeValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isPropertyTypeValid: false }
        })
    }
    if (!isBlankString(road_type_id)) {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isRoadTypeValid: true }
        })
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isRoadTypeValid: false }
        })
    }

    //8. Property floor details validation
    let isAnyFloorDetailsValueEmptyVar = false, isAnyFloorContainsDuplicateFloorVar = false
    if(floor_details?.length > 0){
        //checking empty values in floor details
        floor_details.every(floorItem => {
            for (const key in floorItem) {
                try {
                    if (isBlankString(floorItem[key].toString())) {
                        setSAFNewFormValidator(prevState => {
                            return { ...prevState, isAnyFloorDetailsValueEmpty: false }
                        })
                        isAnyFloorDetailsValueEmptyVar = false
                        return false
                    }
                } catch (err) {
                    console.log(err)
                    setSAFNewFormValidator(prevState => {
                        return { ...prevState, isAnyFloorDetailsValueEmpty: false }
                    })
                    isAnyFloorDetailsValueEmptyVar = false
                }
                // isAnyFloorDetailsValueEmpty = false
            }
            setSAFNewFormValidator(prevState => {
                //false means validated true logically
                return { ...prevState, isAnyFloorDetailsValueEmpty: true }
            })
            isAnyFloorDetailsValueEmptyVar = true
            return true
        })
        // //checking duplicate entries in array
        let floorIdsArr = floor_details.map(item => {
            return (item.floor_id + '').trim()
        })
        let isDuplicateEntryFound = true;
        floorIdsArr.every((item, index, arr) => {
            if( arr.indexOf(item) != index ) {
                isDuplicateEntryFound = false
                return false
            }
            return true
        })
        isDuplicateEntryFound = true //added to remove floor number validation in re-assessment
        isAnyFloorContainsDuplicateFloorVar = isDuplicateEntryFound
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isAnyFloorContainsDuplicateFloor: isDuplicateEntryFound, 
                isFloorDetailsValid: (isAnyFloorDetailsValueEmptyVar && isAnyFloorContainsDuplicateFloorVar) }
        })
        console.log("isDuplicateEntryFound :::::")
        console.log(isDuplicateEntryFound)
    } else {
        setSAFNewFormValidator(prevState => {
            return { ...prevState, isAnyFloorDetailsValueEmpty: false, isAnyFloorContainsDuplicateFloor: false, isFloorDetailsValid: false }
        })
    }

    

    //9. Other details validation
    // if( !isBlankString(isMobileTower) && !isBlankString(rain_harvest) && !isBlankString(is_handicapped) && !isBlankString(is_isdp) &&
    //     !isBlankString(is_school) && !isBlankString(is_complex) && !isBlankString(financial_year) && !isBlankString(is_widow) ) {
    //         setSAFNewFormValidator(prevState => {
    //             return { ...prevState, isOtherDetailsValid: true }
    //         })
    // } else {
    //     setSAFNewFormValidator(prevState => {
    //         return { ...prevState, isOtherDetailsValid: false }
    //     })
    // }

}

const test = () => {
    // let floorIdsArr = floors.map(item => {
    //     return (item.floor_id + '').trim()
    // })
    let floorIdsArr = [1, 2, 3]
    let isDuplicateEntryFound = false;
    floorIdsArr.every((item, index, arr) => {
        if( arr.indexOf(item) != index ) {
            isDuplicateEntryFound = true
            return false
        }
        return true
    })
    console.log("isDuplicateEntryFound")
    console.log(isDuplicateEntryFound)
}
test()
// console.log("hola")

