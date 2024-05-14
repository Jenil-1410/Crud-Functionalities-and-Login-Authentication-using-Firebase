import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Intro from "./pages/Intro";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Add from "./pages/Add";
import Update from "./pages/Update";
import { useCrud } from "./features/CrudContext";
import Forgot from "./pages/Forgot";


function App() {
  const { user, isLoading, logout } = useCrud();
  const [isAuthResolved, setIsAuthResolved] = useState(false);

  useEffect(() => {
    setIsAuthResolved(true); // Set isAuthResolved to true when authentication state is resolved
  }, [user]);

  // While isLoading is true or the authentication state is not yet resolved, render a loading message
  if (isLoading || !isAuthResolved) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route
          path="/home"
          element={user ? <Home /> : logout ? <Navigate to="/" /> : <Navigate to='/login' />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/home" /> : <Register />}
        />
        <Route 
          path="/add" 
          element={user ? <Add /> : <Navigate to='/login' />}
        />
        <Route 
          path="/update/:id" 
          element={user ? <Update /> : <Navigate to='/login' />}
        />
        <Route
          path="/forgot"
          element={<Forgot />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
