import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function Update() {

  const REGEX = /^[0-9-]+$/
  const [users, setUsers] = useState({
    id: '',
    name: '',
    email: '',
    address: {
      street: '',
      city: '',
      zipcode: ''
    }
  })

  const [nameErr, setNameErr] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [stErr, setStErr] = useState('')
  const [cityErr, setCityErr] = useState('')
  const [zipErr, setZipErr] = useState('')

  // const [user, setUser] = useState({})
  const {id} = useParams();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"))
    console.log(data)
    const user = data && data.find((d) =>  d.id == id)
    setUsers(user)
  },[id])

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = JSON.parse(localStorage.getItem("data"))
    console.log(data)

    if(!users.name){
      setNameErr('Name of the user is required.')
      return
    }
    if(!users.email){
      setEmailErr('Email of the user is required.')
      return
    }
    if(!users.address.street){
      setStErr('Street is required.')
      return
    }
    if(!users.address.city){
      setCityErr('City is required.')
      return
    }

    if(!users.address.zipcode){
      setZipErr('Zip code is required.')
      return
    }else if(!REGEX.test(users.address.zipcode)){
      setZipErr('Zip-Code includes numbers and hyphen only')
      return
    }

    console.log(users)
    const updatedData = data && data.map((d) => 
      d.id == id ? {...d, name: users.name, email: users.email, address: {street: users.address.street, city: users.address.city, zipcode: users.address.zipcode},
      } : d
    );
    console.log(updatedData)
    localStorage.setItem("data", JSON.stringify(updatedData))
    navigate('/home')
  }

  return (
    <div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-fit z-10 bg-slate-500 border rounded">
        <form
          className="border border-black rounded py-4 px-8"
          onSubmit={handleSubmit}
        >
          <div className="mb-2 flex">
            <label id="name" className="w-1/4 text-left">
              Name :
            </label>
            <input
              name="name"
              id="name"
              type="text"
              placeholder="Enter Your Name"
              className="px-2 w-3/4 border border-black rounded"
              value={users && users.name}
              onChange={(e) => {setUsers({...users, name: e.target.value})
                                setNameErr('')
            }}
            />
          </div>
          <div className='text-red-500 text-right'>
            <b>{nameErr}</b>
          </div>
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
              value={users && users.email}
              onChange={(e) => {setUsers({...users, email: e.target.value})
                                setEmailErr('')
            }}
            />
          </div>
          <div className='text-red-500 text-right'>
            <b>{emailErr}</b>
          </div>
          <div className="mb-2 flex">
            <label id="address" className="w-1/4 text-left">
              Address :
            </label>
            <div className="w-3/4">
              <input
                name="street"
                id="street"
                type="text"
                placeholder="Enter Your Street"
                className="px-2 w-full border border-black rounded"
                value={users && users.address && users.address.street}
                onChange={(e) => {setUsers({...users, address:{...users.address, street: e.target.value}})
                                  setStErr('')
              }}
              />
              <div className='text-red-500 text-right'>
                <b>{stErr}</b>
              </div>
              <input
                name="city"
                id="city"
                type="text"
                placeholder="Enter Your City"
                className="px-2 w-full border border-black rounded"
                value={users && users.address && users.address.city}
                onChange={(e) => {setUsers({...users, address:{...users.address, city: e.target.value}})
                                  setCityErr('')
              }}
              />
              <div className='text-red-500 text-right'>
                <b>{cityErr}</b>
              </div>
              <input
                name="zipcode"
                id="zipCode"
                type="text"
                placeholder="Enter Your Zip-code"
                className="px-2 w-full border border-black rounded"
                value={users && users.address && users.address.zipcode}
                onChange={(e) => {setUsers({...users, address:{...users.address, zipcode: e.target.value}})
                                  setZipErr('')
              }}
              />
              <div className='text-red-500 text-right'>
                <b>{zipErr}</b>
              </div>
            </div>
          </div>
          <div className="mb-2">
            <button
              type="submit"
              className="border border-black rounded px-1 mt-1 mr-4 bg-green-500 text-white"
            >
              UPDATE USER
            </button>
            <Link to="/home">
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

export default Update
