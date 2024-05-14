import React,{ useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCrud } from '../features/CrudContext'

function Intro() {

  const { user } = useCrud()
  const [err, setErr] = useState('')
  const history = useNavigate()
  const handleClick = (e) => {
    e.preventDefault()
    if(!user){
      setErr('You need to login to acces the databse.')
      return
    }
    else{
      history('/home')
    }
  }

  return (
    <div>
      <h1 className='text-center w-screen text-4xl mt-2 font-extrabold'>CRUD Functionalities</h1>
      <div className='flex justify-center'>
      <div className='mt-2 w-3/5 p-2 bg-white'>
        <div className='text-right'>
          <p className='text-red-500 text-center text-xl'>{err}</p>
          <Link to='/home'>
            <button onClick={handleClick} className='border border-black rounded px-1 bg-red-700 text-white'>DATABASE</button>
          </Link>
        </div>
        <p>CRUD, which stands for Create, Read, Update, and Delete, represents the four basic functions that can be performed on persistent data in a database or any other data storage system. These operations are fundamental in the context of database management systems and data-driven applications.</p>
        <div className='flex justify-around gap-4 my-4'>
            <div className='border border-black rounded text-center bg-purple-300'>
                <p>"Create" involves adding new data entries to the system, typically through insertion operations.</p>
            </div>
            <div className='border border-black rounded text-center bg-purple-300'>
                <p>"Read" refers to retrieving existing data from the database, enabling users or applications to access and view stored information.</p>
            </div>
            <div className='border border-black rounded text-center bg-purple-300'>
                <p>"Update" allows for modifying or altering existing data records, enabling changes to be made to specific fields or attributes.</p>
            </div>
            <div className='border border-black rounded text-center bg-purple-300'>
                <p>"Delete" involves removing data entries from the database, providing the capability to eliminate obsolete or unnecessary information.</p>
            </div>
        </div>
        <p>Together, these CRUD operations form the backbone of data management systems, facilitating the manipulation and maintenance of data throughout its lifecycle.</p>
        <div className='flex mt-4 justify-center'>
            <div className='border border-black rounded w-2/5 text-center p-4 mb-4'>
                <p>To add the data and perform CRUD operations, You need to be a registered user.</p>
                <div className='flex justify-center gap-2 mt-2'>
                    <Link to='/register'>
                    <button className='border border-black rounded px-1 bg-red-300'>Sign-Up</button></Link>
                    <Link to='/login'>
                    <button className='border border-black rounded px-1 bg-red-300'>Log-In</button></Link>
                </div>
            </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Intro
