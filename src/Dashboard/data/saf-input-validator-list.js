import { PROP_ID_LENGTH } from "@/utils/appConstants"

export const safInputValidatorMsgList = {
    validPropIdMsg: `Property ID should not be empty and should only contain ${PROP_ID_LENGTH} digits !`,
    validZoneMsg: "Zone must be selected !",
    validWardMsg: "Ward must be selected !",
    validEntryTypeMsg: "Entry type must be selected !",
    validHonorificMsg: "Honorific must be selected !",
    validOwnerNameMsg: "Owner name must not be empty !",
    validOwnerGenderMsg: "Gender must be selected !",
    validOwnerGuardianNameMsg: "Guardian name must not be empty !",
    validOwnerRelationMsg: "Owner relation with guardian must be selected !",
    validMobileNumMsg: "Mobile number must not be empty and should be of 10 digits only !",
    validOwnerAadharMsg: "Aadhar number must be of 12 digits only or empty !",
    validOwnerEmailMsg: "Email ID must be in the format - abc@xyz.com or empty !",
    validOwnerPanNumMsg: "Pan number should only contain letters and numbers. Example - ABCDE1234F or can be empty !",
    validBuildingConstPeriodFromMsg: "Building construction period from date must not be empty and must be before To date !",
    validBuildingConstPeriodToMsg: "Building construction period to date must not be empty and must be after from date !",
    validPlotArea: "Plot Area must not be empty and can only contain digits !",
    validPlotNumMsg: "Plot number must not be empty !",
    validKhataNumMsg: "Khata number must not be empty !",
    validPropAddressMsg: "Proprty address must not be empty !",
    validPropDistrictMsg: "Proprty District must not be empty !",
    validPropPinMsg: "Property pincode must contain numbers only or can be empty !",
    validMohallaMsg: "Property village or mohalla must not be empty !",
    validPropCityMsg: "Property city must not be empty !",
    validPropertyTypeMsg: "Property type must be selected !",
    validRoadTypeMsg: "Road type must be selected !",
    validPropertyFloorDetailsMsg: "Please validate all floor details, these must be filled for New / Re-Assessment !",
    validPropertyFloorSelectMsg: "You have already selected the same floor in either existing or new floor section, please select any other floor !",
    validPropertOtherDetailsMsg: "Please validate all the other detail fields, these must be filled !",
    validPropertyUniqueFloorMsg: "All floor numbers should be unique ! If issue persists please connect with support team !"
}

export const safInputStateToValidatorMapping = {
    prop_id: "isPropIdValid",
    zone_id: "isZoneValid",
    ward_id: "isWardValid",
    entry_type_id: "isEntryTypeValid",
    owner_title: "isOwnerHonorificValid",
    prop_owner_name: "isOwnerNameValid",
    owner_gender: "isOwnerGenderValid",
    father_name: "isOwnerGuardianNameValid",
    owner_relation: "isOwnerRelationValid",
    mobile_no: "isOwnerMobileNumValid",
    aadhar: "isOwnerAadharValid",
    panno: "isOwnerPanValid",
    email: "isOwnerEmailValid",
    building_const_period_from: "isBuildingConstPeriodFromValid",
    building_const_period_to: "isBuildingConstPeriodToValid",
    plot_area: "isPlotAreaValid",
    plot_no: "isPlotNumValid",
    khata_no: "isKhataNumValid",
    prop_address: "isPropAddressValid",
    district: "isPropDistrictValid",
    pin: "isPropPinValid",
    city: "isPropCityValid",
    mohalla: "isPropMohallaValid",
    property_type_id: "isPropertyTypeValid",
    road_type_id: "isRoadTypeValid",
    floor_details: "isFloorDetailsValid",
    floor_details1: "isAnyFloorDetailsValueEmpty",
    floor_details2: "isAnyFloorContainsDuplicateFloor",
    other_details: "isOtherDetailsValid",
}

export const addExistingConsumerMsgList = {
    validOldConsumerNoMsg: `Old consumer no should be selected !`,
    validHoldingNoMsg: `Holding no should be entered !`,
    validNameMsg:`Name must be valid!`,
    validisMobileNumberMsg: `Mobile number must be valid!`,
    validConnectionTypeMsg: `Connection type should be selected`,
    validArearAmountMsg:`Arear amount must be valid`,
}