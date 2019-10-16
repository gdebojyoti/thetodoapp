import React, { useEffect, useState } from 'react'
import GoogleLogin from 'react-google-login'

import { getValue } from '../../utilities/localStorage'
import { onGoogleLoginSuccess, onGoogleLoginFailure } from '../../actions/auth'
import { syncTodos } from '../../actions/todo'
import config from '../../config'

import './style'

const Login = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const { name, email } = getValue('profile') || {}
    setName(name)
    setEmail(email)

    setIsLoggedIn(getValue('isLoggedIn'))

    // check push notification support
    if (!('PushManager' in window)) {
      console.warn('Push API is not supported on this browser')
    }
    if (!('Notification' in window)) {
      console.warn('Notification API is not supported on this browser')
    }
  }, [])

  const onSuccess = googleUser => {
    // send details to server & update local storage
    onGoogleLoginSuccess(googleUser)

    // update view
    const profile = googleUser.getBasicProfile()
    setEmail(profile.getEmail())
    setName(profile.getName())
    setIsLoggedIn(true)
  }

  const goHome = () => {
    window.location.href = '/'
  }

  const syncTodosFunc = () => {
    syncTodos(() => {
      setIsLoggedIn(false)
    })
  }

  const requestPermission = async () => {
    console.log('attempting to trigger push notification')
    const permission = await window.Notification.requestPermission()
    if (permission !== 'granted') {
      console.warn('Permission not granted for Notification')
    } else {
      console.info('Yipeee! Permission granted')
    }
  }

  const notify = () => {
    var event = new CustomEvent('custompushnotification', { msg: 'some val' })

    // Dispatch the event.
    document.dispatchEvent(event)
  }

  return (
    <div className='login'>
      {isLoggedIn && <div>Hi {name}. You are currently signed in with {email}.</div>}

      {!isLoggedIn && (
        <GoogleLogin
          clientId={config.GOOGLE_CLIENT_ID}
          onSuccess={onSuccess}
          onFailure={onGoogleLoginFailure}
          cookiePolicy='single_host_origin'
          // buttonText='Login'
        />
      )}

      <button className='login__home' onClick={goHome}>Back to Home</button>
      <button className='login__home' onClick={syncTodosFunc}>Sync data</button>
      <button className='login__home' onClick={requestPermission}>Request</button>
      <button className='login__home' onClick={notify}>Notify</button>
    </div>
  )
}

export default Login
