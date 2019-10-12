import { getValue, setValue } from '../utilities/localStorage'
import config from '../config'

export function onGoogleLoginSuccess (googleUser) {
  // The ID token you need to pass to your backend:
  const tokenId = googleUser.getAuthResponse().id_token
  console.log('ID Token:', tokenId)

  // save token ID in local storage
  setValue('GOOGLE_AUTH_TOKEN_ID', tokenId)

  saveDetails(googleUser)

  postGoogleLogin()
}

export function onGoogleLoginFailure (err) {
  console.warn(err)
}

export function onGoogleSignOut () {
  if (!window.gapi) {
    return
  }
  var auth2 = window.gapi.auth2.getAuthInstance()
  auth2.signOut().then(function () {
    console.log('User signed out.')
  })
}

// save user details (email, name, etc) in local storage
function saveDetails (googleUser) {
  // Useful data for your client-side scripts:
  const profile = googleUser.getBasicProfile()
  console.log('ID:', profile.getId()) // Don't send this directly to your server!

  const data = {
    email: profile.getEmail(),
    name: profile.getName(),
    fname: profile.getGivenName(),
    lname: profile.getFamilyName(),
    image: profile.getImageUrl()
  }

  setValue('profile', data)
}

// @TODO: Use async await
// connect to server & validate Google auth token; create user if email is new; fetch server generated token
export function postGoogleLogin () {
  window.fetch(config.BACKEND_SERVER + '/postGoogleLogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: getValue('GOOGLE_AUTH_TOKEN_ID')
    })
  })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      const { token } = json
      // if found, save token in local storage
      if (token) {
        setValue('token', token)
      }
    })
    .catch(err => console.warn('err', err))
}
