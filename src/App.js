import React, { useState } from 'react'
import Layout from './Hox/Layout/Layout'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import StockTable from './Components/StockTable/StockTable'
import Register from './Pages/Register/Register'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import LogOut from './Pages/LogOut/LogOut'
import axios from 'axios'
import BackDrop from './Hox/BackDrop/BackDrop'
import { MDBBadge } from 'mdbreact'

axios.defaults.headers.post['Content-Type'] = 'application/json';

const App = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" })
  const [response, setResponse] = useState({ auth: false, register: false });
  const [error, setError] = useState(null);

  const clearUser = () => setUser({ name: "", email: "", password: "" });

  const handleRegister = async (e) => {
    e.preventDefault();
    const newUser = {
      email: user.email,
      password: user.password
    }

    try {
      const data = await axios.post('http://131.181.190.87:3000/user/register', newUser)
      const parsedData = data.data;
      if (parsedData) {
        setResponse({ ...response, register: true });
        localStorage.setItem('name', user.name);
        clearUser();
      }
    } catch (e) {
      setError(e.response.data);
      clearUser();
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const newUser = {
      email: user.email,
      password: user.password
    }

    try {
      const data = await axios.post('http://131.181.190.87:3000/user/login', newUser)
      const parsedData = data.data;
      
      setResponse({ ...response, auth: true });
      localStorage.setItem('name', user.name);
      localStorage.setItem('email', user.email);
      localStorage.setItem('token', parsedData.token);
      
    } catch (e) {
      setError(e.response.data);
      clearUser();
    }
  }

  const handleEmail = (e) => {
    const value = e.target.value;
    setUser(preV => { return { ...preV, email: value } });
  }

  const handlePassword = (e) => {
    const value = e.target.value;
    setUser(preV => { return { ...preV, password: value } });
  }

  const handleName = (e) => {
    const value = e.target.value;
    setUser(preV => { return { ...preV, name: value } });
  }

  const handleLogOut = () => {
    clearUser();
    localStorage.clear();
    setResponse({ ...response, auth: false, register: false })
  }



  return (
    <div className="App">
      <BackDrop show={error} clickHandler={() => setError(null)}>
        <h1 className="alert-danger message">There's something wrong with your request:<MDBBadge color="young-passion-gradient">{error ? error.message : null}</MDBBadge> </h1>
      </BackDrop>
      <Router>
        <Layout auth={response.auth} handleLogOut={handleLogOut}>
          <Switch>
            <Route exact path="/">
              <Register onSubmit={handleRegister}
                handleEmail={handleEmail}
                handlePassword={handlePassword}
                handleName={handleName}
                register={response.register}
                user={user}
              />
            </Route>
            <Route path="/stocks"><StockTable user={user} /></Route>
            <Route path="/home"><Home /></Route>
            <Route path="/login">
              <Login onSubmit={handleLogin}
                handleEmail={handleEmail}
                handlePassword={handlePassword}
                auth={response.auth}
                user={user} />
            </Route>
            <Route path="/logout"><LogOut /></Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  )
}



export default App;