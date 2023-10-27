import React from 'react'
import {Button} from "@mui/material"
import firebase from "firebase/compat/app";
import {auth} from "../firebase"

function SignIn() {
  const singInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <div>
      <Button onClick={singInWithGoogle}>
        Sing in with Google
      </Button>
    </div>
  )
}

export default SignIn
