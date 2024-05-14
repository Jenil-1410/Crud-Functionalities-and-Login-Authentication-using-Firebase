import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { signOut } from "firebase/auth";
// import { useCrud } from "../features/CrudContext";
import { database } from "../FirebaseConfig";
import { useCrud } from "../features/CrudContext";

function Home() {

  async function loadData(url) {
    axios (url)
    .then((res) => {
      const resData = res.data
      localStorage.setItem("data", JSON.stringify(resData))
      return resData
    })
    .catch((error) => console.log(error))
  }

  const [data, setData] = useState([]);

  const loadDataFromStorage = async () => {
    const existingData = JSON.parse(localStorage.getItem("data"));      
    if (existingData && existingData.length > 0) {
      setData(existingData);
      console.log('Data loaded from local storage');
    } else {
      try {
        const responseData = await loadData("https://jsonplaceholder.typicode.com/users");
        localStorage.setItem("data", JSON.stringify(responseData));
        setData(responseData);
        console.log('Data loaded from API');
      } catch (error) {
        console.error('Error loading data:', error);
      }
    }
  };
  useEffect(() => {
    loadDataFromStorage();
  }, []);
  useEffect(() => {
  }, [data]);
  
  const handleDelete = (id) => {
    console.log(id)
    var alrt = window.confirm('Do you want to delete the Data?');
    if(alrt === true){
      const updatedData = data && data.filter((d) => d.id != id)
      setData(updatedData)
      localStorage.setItem("data", JSON.stringify(updatedData))
    }
    else{
      return
    }
  }

  const { setLogout } = useCrud()

  const handleSignOut = async() => {
    var alrt = window.confirm('Are you sure you want to log out?');
    if(alrt === true){
      await signOut(database)
      setLogout(true)
      // setLoggedIn(false)
    }
    else{
      return
    }
  }

  const [search, setSearch] = useState('')

  return (
    <div className="h-full text-center flex flex-col items-center">
      <div className="w-full flex fixed justify-between items-center">
          <Link to='/'><button className="border border-black rounded bg-black text-white px-2 mt-1 ml-2">Back to Home</button></Link>
          <button onClick={handleSignOut} className="border border-black rounded bg-black text-white px-2 mt-1 mr-2">Sign Out</button>
      </div>

      <h1 className="font-bold text-center h-1/5 text-4xl mt-2 box-border">List of Users</h1>
      <div className="w-fit h-3/5 mt-5 box-border">
        <form>
          <input className="w-full p-1 border border-black rounded" type="text" placeholder="Enter name" onChange={(e) => setSearch(e.target.value)}/>
        </form>
        <table className="overflow-auto mt-2">
          <thead>
            <tr>
              <th className="border border-black border-collapse px-2 py-3">
                ID
              </th>
              <th className="border border-black border-collapse px-2 py-3">
                Name
              </th>
              <th className="border border-black border-collapse px-2 py-3">
                Email
              </th>
              <th className="border border-black border-collapse px-2 py-3">
                Address
              </th>
              <th className="border border-black border-collapse px-2 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {data &&
            data.length > 0 &&
              (data.filter((d) => search.toLowerCase() === '' ? d : d.name.toLowerCase().includes(search))
              .map((d) => (
                <tr key={d.id}>
                  <td className="border border-black border-collapse px-2 py-3">
                    {d.id}
                  </td>
                  <td className="border border-black border-collapse px-2 py-3">
                    {d.name}
                  </td>
                  <td className="border border-black border-collapse px-2 py-3">
                    {d.email}
                  </td>
                  <td className="border border-black border-collapse px-2 py-3">
                    {d.address.street}, {d.address.city}, {d.address.zipcode}
                  </td>
                  <td className="border border-black border-collapse px-2 py-3">
                    <button
                      className="border border-black bg-green-500 rounded px-2 mr-2 mt-1"
                    >
                      <Link to={`/update/${d.id}`}>Edit</Link>
                    </button>
                    <button className="border border-black bg-red-500 rounded px-2 mt-1" onClick={(id) => handleDelete(d.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              )))}
          </tbody>
        </table>
        {/* <Update /> */}
      </div>
      <div className='text-center h-1/5 my-5 box-border'>
        <Link to="/add">
        <button className="border border-black rounded h-10 w-fit px-10 mr-2 mt-1 bg-black text-white">ADD USER</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
