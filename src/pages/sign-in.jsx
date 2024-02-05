import { Link, useNavigate } from "react-router-dom";
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
import jwt from 'jwt-decode'
import bcrypt from 'bcryptjs'
import { SimpleFooter } from "@/widgets/layout";
import { useState, useEffect, useCallback } from "react";
import OTPField from "@/widgets/cards/otp-field";
import { useMaterialTailwindController, setJwtToken, setUserNameAfterLogin } from "@/Dashboard/context";
// import useUnload from "@/utils/useUnload";
import { useBeforeunload } from "react-beforeunload";
import { ColorRing } from "react-loader-spinner";

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL

export function SignIn() {
  //const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL
  const [controller, dispatch] = useMaterialTailwindController();
  const navigate = useNavigate()
  let intervalID;
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginErrorMessage, setLoginErrorMessage] = useState(null)
  const [OTPObject, setOTPObject] = useState({
    showOTPModal: false,
    showOTPCountdownMsg: false,
    message: "OTP has been sent to your registered mobile number. You can request for another OTP in : ",
  })
  const [otpTimer, setOTPTimer] = useState(30) //otp cooldown timer
  const timeOutCallback = useCallback(() => setOTPTimer(currTimer => currTimer - 1), [])

  const [isLoginInProgress, setIsLoginInProgress] = useState(null)

  let handleOTPChange = () => {
    setOTPObject((prevState) => ({
      ...prevState,
      showOTPModal: true,
      showOTPCountdownMsg: true,
      isOTPSentOnce: false
    }))
    // intervalObj = setInterval(() => {
    //   setOTPTimer((prevTimer) => prevTimer - 1 )
    // }, 1000)
  }

  let handleUserNameChange = (e) => {
    //console.log(e.target.value)
    setUsername(username => {
      const newUsername = e.target.value
      //console.log(newUsername)
      return newUsername
    })
  }
  let handlePasswordChange = (e) => {
    //console.log(e.target.value)
    setPassword(password => {
      const newPassword = e.target.value
      //console.log(newPassword)
      return newPassword
    })
  }
  let handleSignIn = async () => {
    setIsLoginInProgress(true)
    try {
      const signInUrl = `${SUDA_API_BASE_URL}/login/`
      const options = {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          userName: username,
          userPassword: password
        })
      }
      //console.log(signInUrl, options)
      let response = null, responseBody = null
      try {
        response = await fetch(signInUrl, options)
        responseBody = await response.json()
      } catch (err) {
        setLoginErrorMessage("Unable to login! Please try again.")
      }
      console.log(response)
      console.log(responseBody)
      if (response?.status == "200") {
        console.log("valid pwd")
        const decodedJWT = responseBody?.jwtToken ? jwt(responseBody.jwtToken) : null
        const isSamePwd = bcrypt.compareSync(password, responseBody?.user?.userPassword)
        if (decodedJWT && decodedJWT?.sub === username && username === responseBody?.user?.userName && isSamePwd) {
          //setUserNameAfterLogin(dispatch, responseBody.userName)
          setJwtToken(dispatch, responseBody.jwtToken)
          console.log("controller::")
          console.log(controller)
          //window.localStorage.setItem("SUDA_TOKEN", responseBody.jwtToken)
          document.cookie = `SUDA_TOKEN=${responseBody.jwtToken};path=/`
          document.cookie = `SUDA_USER_ID=${responseBody.user.user_id};path=/`
          document.cookie = `SUDA_USER_NAME=${responseBody.user.userName};path=/`
          document.cookie = `SUDA_USER_ROLE=${JSON.stringify(responseBody.user.role)};path=/`

          const hashedPassword = bcrypt.hashSync(password, 10)
          // console.log("isSamePwd--" + isSamePwd)
          // console.log("hashed pwd --" + hashedPassword)
          navigate("/dashboard/dashboard/home")
          setUsername("")
          setPassword("")
          setLoginErrorMessage(null)

        }
      } else if (response?.status != "200") {
        console.log("invalid pwd")
        if (response.status == "401" || response.status == "403") {
          setLoginErrorMessage("Invalid username or password!!!")
        } else {
          setLoginErrorMessage("Something went wrong at the server end, please try again.")
        }
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoginInProgress(false)
    }
  }

  useEffect(() => {
    // console.log("inside useEffect");
    (otpTimer > -1 && OTPObject.showOTPCountdownMsg) && setTimeout(timeOutCallback, 1000);
    if (otpTimer === -1 && OTPObject.showOTPCountdownMsg) {
      setOTPObject(prevState => ({
        ...prevState,
        showOTPCountdownMsg: false,
        isOTPSentOnce: true
      }));
      setOTPTimer(10)
    }
  }, [otpTimer, timeOutCallback, OTPObject.showOTPCountdownMsg])

  return (
    <>
      <img
        src="/img/background-3.jpg"
        // src="https://images.pexels.com/photos/1493832/pexels-photo-1493832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      {/* <div className="absolute inset-0 z-0 h-full w-full" /> */}
      <div className="container mx-auto p-4 bg-red-800">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4 p-5">
          <CardHeader
            // variant="gradient"
            // color="blue"
            // className="mb-4 grid h-28 place-items-center bg-blue-gray-800"
          >
            {/* <Typography variant="h3" color="white">
              Official Login
            </Typography> */}
            
          </CardHeader>
          <img src="/img/ch_logo.png" alt="logo" className="h-[20rem]" />
          <CardBody className="flex flex-col gap-4">
            {
              loginErrorMessage ? <p className="text-xs text-red-700 font-bold" >{loginErrorMessage}</p> : null
            }
            <Input className="success" variant="outlined" type="text" label="User Name" color="orange" size="md" value={username} onChange={handleUserNameChange} />
            <Input
              className="success"
              variant="outlined"
              color="orange"
              type="password"
              label="Password"
              size="md"
              value={password}
              onChange={handlePasswordChange}
            />
            {/* <Button variant="gradient" onClick={handleOTPChange} fullWidth disabled={OTPObject.showOTPCountdownMsg}>
              {!OTPObject.isOTPSentOnce ? "Request OTP" : "Resend OTP"}
            </Button>
            {
              OTPObject.showOTPCountdownMsg ? <p className="text-sm">{OTPObject.message} <p className="text-red-700 contents">{otpTimer}</p> seconds</p> : null
            }
            {
              OTPObject.showOTPModal ? <OTPField /> : null
            } */}
            <div className="-ml-2.5">
              {/* <Checkbox label="Remember Me" /> */}
            </div>
          </CardBody>
          {
            isLoginInProgress == true ? (
              <div className="m-auto w-10 h-10">
                <ColorRing
                  visible={true}
                  height="40"
                  width="40"
                  colors={['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000']}
                />
              </div>
            ) : null
          }
          <CardFooter className="pt-0">
            <Button  className="bg-orange-700 hover:bg-white hover:text-black hover:border-red-700" onClick={handleSignIn} fullWidth>
              Sign In
            </Button>

            {/* <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="http://localhost:80/">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Back
                </Typography>
              </Link>
            </Typography> */}

            {/* <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography> */}
          </CardFooter>
        </Card>
      </div>
      <div className="container absolute bottom-6 left-2/4 z-10 mx-auto -translate-x-2/4 text-white ">
        <SimpleFooter />
      </div>
    </>
  );
}

export default SignIn;
