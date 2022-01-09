import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, provider } from '../firebase'


function signIn(props) {
    const loginWithGoogle = () => {
        signInWithPopup(auth, provider)

    }
    return (
        <div className=' flex justify-center items-center h-screen'>
            <button className=' bg-black text-white rounded p-2 ' onClick={() => loginWithGoogle()} >Sign in google </button>
        </div>
    )
}


export default signIn

