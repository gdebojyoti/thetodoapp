import React, { useEffect, useState } from 'react'
import GoogleLogin from 'react-google-login'

import { getValue } from '../../utilities/localStorage'
import { onGoogleLoginSuccess, onGoogleLoginFailure } from '../../actions/auth'
import config from '../../config'

import './style'

const Login = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const { name, email } = getValue('profile') || {}
    setName(name)
    setEmail(email)
  }, [])

  const onSuccess = googleUser => {
    // send details to server & update local storage
    onGoogleLoginSuccess(googleUser)

    // update view
    const profile = googleUser.getBasicProfile()
    setEmail(profile.getEmail())
    setName(profile.getName())
  }

  return (
    <div className='login'>
      {name && <div>Hi {name}. You are currently signed in with {email}.</div>}

      {!name && (
        <GoogleLogin
          clientId={config.GOOGLE_CLIENT_ID}
          onSuccess={onSuccess}
          onFailure={onGoogleLoginFailure}
          cookiePolicy='single_host_origin'
          // buttonText='Login'
        />
      )}

      {/* <button onClick={postGoogleLogin}>Fetch token</button> */}
    </div>
  )
}

export default Login
