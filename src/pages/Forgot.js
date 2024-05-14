import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { database, db } from '../FirebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

function Forgot() {
    const [recEmail, setRecEmail] = useState('')
    const [recEmailMsg, setRecEmailMsg] = useState('')
    const [recEmailErr, setRecEmailErr] = useState('')

    const fetchAllUsers = async () => {
        const usersCollection = collection(db, "users");
        const querySnapshot = await getDocs(usersCollection);
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.uid, ...doc.data() });
        });
        return users;
    };
    const usrs = fetchAllUsers()

    // const allUsers = [];
    // const listAllUsers = async (nextPageToken) => {
    //     const res = await database.listUsers(1000, nextPageToken);
    //     allUsers.push(...res.users);
    //     if (res.pageToken) {
    //         await listAllUsers(res.pageToken);
    //     }
    // };
    // listAllUsers()
    // console.log(allUsers)

    const handleSubmit = async(e) => {
        e.preventDefault()
        // Send password reset email if the email is registered
        const urs = (await usrs).filter((usr) => 
            usr.email === recEmail
        )
        console.log(urs)
        if(urs.length === 0){
            setRecEmailErr('user is not registered')
        }
        else{
            sendPasswordResetEmail(database,recEmail)
                .then(() => {
                    setRecEmailMsg('Password link has been sent to this email.')
                })
                .catch((error)=> {
                    setRecEmailErr(error.message)
                })
        }

        // ;(await usrs).forEach((usr) => {
        //     if(usr.email === recEmail){
        //         sendPasswordResetEmail(database,recEmail)
        //             .then(() => {
        //                 setRecEmailMsg('Password link has been sent to this email.')
        //             })
        //             .catch((error)=> {
        //                 setRecEmailErr(error.message)
        //             })
        //         return
        //     }
        // })
        // setRecEmailErr('user is not registered')
        }
            // Check if the email exists in Firebase authentication
            // const userExists = await database.fetchSignInMethodsForEmail(recEmail);
            // if (userExists.length === 0) {
            //   setRecEmailErr("This email is not registered.");
            //   return;
            // }
            
        // catch (error) {
        //     const errorMessage = error.message;
        //     setRecEmailErr(errorMessage)
        // };

  return (
    <div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-fit z-10 bg-slate-500 border rounded">
        <form
          className="border border-black rounded py-4 px-8"
          onSubmit={handleSubmit}
        >
          <div className="mb-2 flex">
            <label id="email" className="w-1/4 text-left">
              E-mail :
            </label>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="Enter Your Email"
              className="px-2 w-3/4 border border-black rounded"
              // value={values.email}
              onChange={(e) => {setRecEmail(e.target.value)
                                setRecEmailErr('')
                                setRecEmailMsg('')
            }}
            />
          </div>
          <div className='text-green-500 text-right'>
            <p>{recEmailMsg}</p>
          </div>
          <div className='text-red-500 text-right'>
            <b>{recEmailErr}</b>
          </div>
          <div className="mb-2">
            <button
              type="submit"
              className="border border-black rounded px-1 mt-1 mr-4 bg-green-500 text-white"
            >
              RESET
            </button>
            <Link to="/login">
            <button className="border border-black rounded px-1 mt-1 bg-red-500 text-white">
              CLOSE
            </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Forgot
