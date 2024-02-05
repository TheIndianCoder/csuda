import React from 'react'

const SEARCH_PROPERTY = `searchProperty`
const PROPERTY_DETAILS = `propertyDetails`
function MainUploadTearOffReceipt() {
    const [showModalsObj, setShowModalsObj] = useState({
        searchProperty: true,
        propertyDetails: false
      })
    
      const switchOnPrevModalNOffCurrModal = async (currModalName, prevModalName) => {
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
  return (
    <div>mainUploadTearOffReceipt</div>
  )
}

export default MainUploadTearOffReceipt