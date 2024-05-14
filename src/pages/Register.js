import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useEffect, useRef } from 'react'
// import axios from '../api/axios'
import { Link } from 'react-router-dom';
import { database, db } from '../FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const REGISTER_URL = '/register';

function Register() {

    const userRef = useRef()
    const errRef = useRef()

    const [usr, setUsr] = useState('')
    const [validUsr, setValidUsr] = useState(false)
    const [usrFocus, setUsrFocus] = useState(false)

    const [email, setEmail] = useState('')

    const [pass, setPass] = useState('')
    const [validPass, setValidPass] = useState(false)
    const [passFocus, setPassFocus] = useState(false)

    const [cpass, setCpass] = useState('')
    const [validCpass, setValidCpass] = useState(false)
    const [cpassFocus, setCpassFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
      const result = USER_REGEX.test(usr)
      setValidUsr(result)
    }, [usr])

    useEffect(() => {
      const result = PASS_REGEX.test(pass)
      setValidPass(result)
      const match = pass === cpass
      setValidCpass(match)
    }, [pass, cpass])

    useEffect(() => {
      setErrMsg('')
    }, [usr, pass, cpass])

    const addUserToFirestore = async (uid, email) => {
      try {
        // Reference the "users" collection
        const usersCollection = collection(db, "users");
        console.log('creating database')
        // Add a new document with the user's information
        await addDoc(usersCollection, {
          uid: uid,
          email: email
          // Add additional user data as needed
        });
    
        console.log("User added to Firestore successfully!");
      } catch (error) {
        console.error("Error adding user to Firestore: ", error);
      }
    };

    const handleSubmit = async(e) => {
      e.preventDefault()
      const v1 = USER_REGEX.test(usr)
      const v2 = PASS_REGEX.test(pass)
      if(!v1 || !v2){
        setErrMsg('Invalid Entry')
        return
      }
      // try {
      createUserWithEmailAndPassword(database, email, pass)
      .then(data => addUserToFirestore(data.user.uid, data.user.email))
      .catch((err)=>{
        setErrMsg(err.message)
      })
    }

  return (
    <>
        <div className='h-screen flex justify-center items-center'>
        <form className='bg-black text-white h-fit w-1/4 p-5' onSubmit={handleSubmit}>
          <p ref={errRef} className={errMsg ? 'text-red-500 text-center' : 'hidden'}>{errMsg}</p>
          <h1 className='text-2xl font-semibold'>Register</h1>
          <br/>
          <div>
              <label htmlFor='usrname'>Username: </label><br />
              <input id='usrname' type='text' ref={userRef} className='w-full rounded-md text-black box-border pl-1' value={usr} autoComplete='on' 
              // onFocus={() => setUsrFocus(true)}
              onBlur={() => (usr === '' ? setUsrFocus(false) : setUsrFocus(true))}
              onChange={(e) => {setUsr(e.target.value)
                                setUsrFocus(false)
              }}></input>
          </div>
          <p id='uidnote' className={usrFocus && !validUsr ? 'visible text-red-600' : 'hidden'}>
              4 to 24 characters.<br />
              Must begin with a letter.<br />
              Letters, numbers, underscore, hyphens allowed.
          </p>
          <br/>
          <div>
              <label htmlFor='email'>Email Id: </label><br />
              <input id='usrname' type='email' className='w-full rounded-md text-black box-border pl-1' value={email} autoComplete='on' 
              // onFocus={() => setUsrFocus(true)}
              // onBlur={() => setUsrFocus(false)}
              onChange={(e) => {setEmail(e.target.value)}}></input>
          </div>
          <br/>
          <div>
              <label htmlFor='pwd'>Password:</label><br />
              <input id='pwd' type='password' className='w-full rounded-md text-black box-border pl-1' value={pass} autoComplete='off' 
              // onFocus={() => setPassFocus(true)}
              onBlur={() => (pass === '' ? setPassFocus(false) : setPassFocus(true))}
              onChange={(e) => {setPass(e.target.value)
                                setPassFocus(false)
              }}></input>
          </div>
          <p id='passnote' className={passFocus && !validPass ? 'visible text-red-600' : 'hidden'}>
              8 to 24 characters.<br />
              Must include uppercase and lowercase letters, a number and a special character.<br />
              Allowed special characters: ! @ # $ %
          </p>
          <br/>
          <div>
              <label htmlFor='cpwd'>Confirm Password:</label><br />
              <input id='cpwd' type='password' className='w-full rounded-md text-black box-border pl-1' value={cpass} autoComplete='off'
              // onFocus={() => setCpassFocus(true)}
              onBlur={() => (cpass === '' ? setCpassFocus(false) : setCpassFocus(true))}
              onChange={(e) => {setCpass(e.target.value)
                                setCpassFocus(false)
              }}></input>
          </div>
          <p id='confirmnote' className={cpassFocus &&!validCpass ? 'visible text-red-600' : 'hidden'}>
              Must match the first password.
          </p>
          <br/>
          <div>
              <button disabled={!validUsr || !validCpass ? true: false} className={ !validUsr || !validCpass ?'bg-gray-500 w-full text-black p-1 rounded-md hover:cursor-not-allowed' : 'bg-white w-full text-black p-1 rounded-md'} >Sign Up</button>
          </div>
          <br/>
          <div>
              <p>Already regsitered?</p>
              <p className='text-blue-500'><u><Link to='/login'>Sign In</Link></u></p>
          </div>
        </form>
      </div>     
    </>
  )
}

export default Register