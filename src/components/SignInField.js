import React from 'react'
import GoogleButton from 'react-google-button'

import SignInInputField from './SignInInputField';

const SignInField = () => {
  return (
    <div className="flex justify-center items-center">
      <SignInInputField />
      {/* <GoogleButton
          onClick={() => { console.log('Google button clicked') }}
      /> */}
    </div>
  )
}

export default SignInField;