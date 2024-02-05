import React, { Component } from 'react'
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { SimpleFooter } from "@/widgets/layout";
import SelectMunicipal from './selectMunicipal';
import Manual from './manual';
import Manual2 from './manual2';
import SAF_Form from './saf_form';
import SAF_form_preview from './saf_form_preview';
import Saf_form_otp from './saf_form_otp';
import CustomBackButton from './customBackButton';

const SELECT_MUNICIPALITY_MODAL = `showSelectMunicipalModal`
const MANUAL_MODAL = `showManualModal`
const SAF_NEW_FORM_MODAL = `showSAFNewFormModal`
const SAF_NEW_FORM_PREVIEW = `showSAFNewFormPreview`
const SAF_OTP_FORM = `showSAFOtpForm`
const CUSTOM_BACK_BUTTON = `showCustomBackButton`

export class MainPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showModals: {
        showSAFOtpForm: true,
        showSelectMunicipalModal: false,
        showManualModal: false,
        showSAFNewFormModal: false,
        showSAFNewFormPreview: false,
        showCustomBackButton: false
      },
      showCustomBackButton: false
    }
  }

  switchOnNextModalNOffCurrModal = async (currModalName, nextModalName) => {
    if(nextModalName && currModalName){
      let showModalsObj = this.state.showModals
      console.log(showModalsObj)
      //let showCustomBackButtonVal = 
      await this.setState({
        showModals: {
          ...showModalsObj,
          [currModalName]: false,
          [nextModalName]: true
        },
        
      })
    }  
  }

  switchOnPrevModalNOffCurrModal = async (currModalName, prevModalName) => {
    if(prevModalName && currModalName){
      let showModalsObj = this.state.showModals
      console.log(showModalsObj)
      //let showCustomBackButtonVal = 
      await this.setState({
        showModals: {
          ...showModalsObj,
          [currModalName]: false,
          [prevModalName]: true
        },
        
      })
    }  
  }

  render() {
    const { showSelectMunicipalModal, showManualModal, showSAFNewFormModal, showSAFNewFormPreview,
      showSAFOtpForm, showCustomBackButton } = this.state.showModals
    return (
      <div>
        {/* <img
          src="/img/background-2.jpg"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        /> */}
        {/* <div className="absolute inset-0 z-0 h-full w-full bg-black/50" /> */}
        {/* <CustomBackButton showCustomBackButton={showCustomBackButton}  /> */}
        <Saf_form_otp switchOnNextModalNOffCurrModal={this.switchOnNextModalNOffCurrModal} nextModal={SELECT_MUNICIPALITY_MODAL}
        currModal={SAF_OTP_FORM} showSAFOtpForm={showSAFOtpForm} />

        <SelectMunicipal switchOnNextModalNOffCurrModal={this.switchOnNextModalNOffCurrModal} nextModal={MANUAL_MODAL} 
        currModal={SELECT_MUNICIPALITY_MODAL}
        showSelectMunicipalModal={showSelectMunicipalModal} />

        {/* <Manual showManualModal={showManualModal} closeModals={this.closeModals} /> */}

        <Manual2 showManualModal={showManualModal} nextModal={SAF_NEW_FORM_MODAL} currModal={MANUAL_MODAL}
        prevModal={SELECT_MUNICIPALITY_MODAL}
        switchOnNextModalNOffCurrModal={this.switchOnNextModalNOffCurrModal} 
        switchOnPrevModalNOffCurrModal={this.switchOnPrevModalNOffCurrModal} />

        <SAF_Form showSAFNewFormModal={showSAFNewFormModal} switchOnNextModalNOffCurrModal={this.switchOnNextModalNOffCurrModal} 
        nextModal={SAF_NEW_FORM_PREVIEW} currModal={SAF_NEW_FORM_MODAL}
        switchOnPrevModalNOffCurrModal={this.switchOnPrevModalNOffCurrModal}
        prevModal={MANUAL_MODAL} />

        <SAF_form_preview showSAFNewFormPreview={showSAFNewFormPreview} 
        switchOnNextModalNOffCurrModal={this.switchOnNextModalNOffCurrModal}
        switchOnPrevModalNOffCurrModal={this.switchOnPrevModalNOffCurrModal}
        prevModal={SAF_NEW_FORM_MODAL} currModal={SAF_NEW_FORM_PREVIEW} />

        <div className="container  bottom-6 left-2/4 z-10 mx-auto text-black">
          <SimpleFooter />
        </div>
      </div>
    )
  }
}

export default MainPage