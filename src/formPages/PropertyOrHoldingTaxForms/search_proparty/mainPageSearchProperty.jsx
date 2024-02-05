import React, { useState } from 'react'
import SelectMunicipal from '../saf_form_for_new_property/selectMunicipal'
import SearchProperty from './searchProperty'

const SELECT_MUNICIPALITY_MODAL = `showSelectMunicipalModal`
const SEARCH_MODAL = `showSearchModal`

function MainPageSearchProperty() {

    let [showModals, setShowModals] = useState({
        showSelectMunicipalModal: true,
        showSearchModal: false,
    })

    const switchOnNextModalNOffCurrModal = async (currModalName, nextModalName) => {
        if (nextModalName && currModalName) {
            let showModalsObj = showModals
            console.log(showModalsObj)
            let showCustomBackButtonVal =
                setShowModals(showModals => {
                    return {
                        ...showModals,
                        [currModalName]: false,
                        [nextModalName]: true
                    }
                })
        }
    }

    return (
        <>
            <SelectMunicipal switchOnNextModalNOffCurrModal={switchOnNextModalNOffCurrModal} nextModal={SEARCH_MODAL}
                currModal={SELECT_MUNICIPALITY_MODAL}
                showSelectMunicipalModal={showModals.showSelectMunicipalModal} />
            <SearchProperty switchOnNextModalNOffCurrModal={switchOnNextModalNOffCurrModal} nextModal={SEARCH_MODAL}
                currModal={SELECT_MUNICIPALITY_MODAL}
                showSearchModal={showModals.showSearchModal} />
        </>
    )
}

export default MainPageSearchProperty