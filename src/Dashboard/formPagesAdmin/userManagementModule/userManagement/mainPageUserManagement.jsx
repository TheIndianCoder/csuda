import React, { useState } from 'react'
import UserManagement from '@/Dashboard/formPagesAdmin/userManagementModule/userManagement/userManagementAdmin'
import ChangePassword from '@/Dashboard/formPagesAdmin/userManagementModule/userManagement/changePassword'

const USER_MANAGEMENT_VIEW = `userManagementView`
const CHANGE_PASSWORD = `changePassword`

function MainPageUserManagement() {
    const [showModalsObj, setShowModalsObj] = useState({
        userManagementView: true,
        changePassword: false,
    })

    const switchOnPrevModalNOffCurrModal = (currModalName, prevModalName) => {
        if (prevModalName && currModalName) {
            console.log(showModalsObj)
            //let showCustomBackButtonVal = 
            setShowModalsObj((prevState) => {
                return {
                    ...prevState,
                    [currModalName]: false,
                    [prevModalName]: true
                }
            })
        }
    }

    const [userIdForPwdChange, setUserIdForPwdChange] = useState(null)

    return (
        <>
            <UserManagement
            showModal={showModalsObj[USER_MANAGEMENT_VIEW]}
                switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
                setUserIdForPwdChange={setUserIdForPwdChange}
                currModal={USER_MANAGEMENT_VIEW}
                nextModal={CHANGE_PASSWORD}
            />
            {
                showModalsObj[CHANGE_PASSWORD] == true ? (
                    <ChangePassword
                        switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
                        userIdForPwdChange={userIdForPwdChange}
                        currModal={CHANGE_PASSWORD}
                        prevModal={USER_MANAGEMENT_VIEW}
                    />
                ) : null
            }
        </>
    )
}

export default MainPageUserManagement