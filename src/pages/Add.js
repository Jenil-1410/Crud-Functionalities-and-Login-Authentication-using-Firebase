import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { CrudContext, useCrud } from "./Home";


function Add() {

  // const {addData} = useCrud();
  const REGEX = /^[0-9]+[0-9-]+$/
  const data = JSON.parse(localStorage.getItem("data"))
  // useEffect(() => {
  //   localStorage.setItem("data", JSON.stringify(data))
  //   console.log(data)
  // },[data])

  const [values, setValues] = useState({
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

  // const addData = (d) => {
  //   setData((prev) => [...prev, {id: Date.now, ...d}])
  //   console.log(data)
  // }

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setValues((prevValues) => ({
  //     ...prevValues,
  //     [name]: value
  //   }));
  // };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!values.name){
      setNameErr('Name of the user is required.')
      return
    }
    if(!values.email){
      setEmailErr('Email of the user is required.')
      return
    }
    if(!values.address.street){
      setStErr('Street is required.')
      return
    }
    if(!values.address.city){
      setCityErr('City is required.')
      return
    }
    if(!values.address.zipcode){
      setZipErr('Zip code is required.')
      return
    }else if(!REGEX.test(values.address.zipcode)){
      setZipErr('Zip-Code includes numbers and hyphen only')
      return
    }
    console.log(data)
    data.push({id: data[data.length-1].id + 1 , name: values.name, email: values.email, address: {street: values.address.street, city: values.address.city, zipcode: values.address.zipcode}})
    console.log(data)
    localStorage.setItem("data", JSON.stringify(data))
    // addData({name: values.name, email: values.email, address: {street: values.address.street, city: values.address.city, zipcode: values.address.zipcode}})
    // setData((prev) => [...prev, {id: Date.now(), ...data}])
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
              // value={values.name}
              onChange={(e) => {setValues({...values, name: e.target.value})
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
              // value={values.email}
              onChange={(e) => {setValues({...values, email: e.target.value})
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
                // value={value.address.street}
                onChange={(e) => {setValues({...values, address:{...values.address, street: e.target.value}})
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
                // value={value.address.city}
                onChange={(e) => {setValues({...values, address:{...values.address, city: e.target.value}})
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
                // pattern="(?:\d|-)+"
                placeholder="Enter Your Zip-code"
                className="px-2 w-full border border-black rounded"
                // value={value.address.zipCode}
                onChange={(e) => {setValues({...values, address:{...values.address, zipcode: e.target.value}})
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
              ADD USER
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
  );
}

export default Add;
