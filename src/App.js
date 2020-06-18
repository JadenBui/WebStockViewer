import React, { useState } from "react";
import Layout from "./Hox/Layout/Layout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import LogOut from "./Pages/LogOut/LogOut";
import axios from "axios";
import ErrorHandler from "./Hox/ErrorHandler/ErrorHandler";
import StockList from "./Components/StockType/Stocks/StockList";
import SingleStock from "./Components/StockType/Stock/SingleStock";
import NotFound from "./Pages/404/NotFound";
axios.defaults.headers.post["Content-Type"] = "application/json";

const EMPTY_STRING = "";
const axios_auth = axios.create({
  baseURL: "https://stocknodeserver.azurewebsites.net/user",
});

const App = () => {
  const [user, setUser] = useState({
    name: EMPTY_STRING,
    email: EMPTY_STRING,
    password: EMPTY_STRING,
  });
  const [response, setResponse] = useState({ auth: false, register: false });
  const [err, setErr] = useState({ show: false, message: EMPTY_STRING });

  const clearUser = () =>
    setUser({
      name: EMPTY_STRING,
      email: EMPTY_STRING,
      password: EMPTY_STRING,
    });

  const handleRegister = async (e) => {
    e.preventDefault();
    const newUser = {
      email: user.email,
      password: user.password,
    };

    try {
      const data = await axios_auth.post("register", newUser);
      const parsedData = data.data;
      if (parsedData) {
        setResponse({ ...response, register: true });
        localStorage.setItem("name", user.name);
        clearUser();
      }
    } catch (e) {
      const errorMessage = e.response.data.message;
      setErr({ show: true, message: errorMessage });
      clearUser();
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const newUser = {
      email: user.email,
      password: user.password,
    };

    try {
      const data = await axios_auth.post("login", newUser);
      const parsedData = data.data;

      localStorage.setItem("email", user.email);
      localStorage.setItem("token", parsedData.token);

      setResponse({ ...response, auth: true });

      clearUser();
    } catch (e) {
      const errorMessage = e.response.data.message;
      setErr({ show: true, message: errorMessage });
      if (errorMessage.includes("email")) {
        clearUser();
      } else {
        setUser({ ...user, password: EMPTY_STRING });
      }
    }
  };

  const handleLogOut = () => {
    clearUser();
    localStorage.clear();
    setResponse({ ...response, auth: false, register: false });
  };

  //control input values
  const handleEmail = (e) => {
    const newEmail = e.target.value;
    setUser((preV) => {
      return { ...preV, email: newEmail };
    });
  };

  const handlePassword = (e) => {
    const newPassword = e.target.value;
    setUser((preV) => {
      return { ...preV, password: newPassword };
    });
  };

  const handleName = (e) => {
    const newName = e.target.value;
    setUser((preV) => {
      return { ...preV, name: newName };
    });
  };

  //close warning backdrop
  const confirmHandler = () => setErr({ show: false, message: EMPTY_STRING });

  return (
    <div className="App">
      <ErrorHandler
        error={err.show}
        confirmHandler={confirmHandler}
        message={err.message}
      />
      <Router>
        <Layout auth={response.auth} handleLogOut={handleLogOut}>
          <Switch>
            <Route exact path="/register">
              <Register
                onSubmit={handleRegister}
                handleEmail={handleEmail}
                handlePassword={handlePassword}
                handleName={handleName}
                register={response.register}
                auth={response.auth}
                user={user}
              />
            </Route>
            <Route path="/stocklist" exact render={() => <StockList />} />
            <Route
              path="/stocklist/stock/:symbol"
              render={(match) => (
                <SingleStock match={match} auth={response.auth} />
              )}
            />
            <Route exact path="/" render={() => <Home />} />
            <Route
              path="/login"
              render={() => (
                <Login
                  onSubmit={handleLogin}
                  handleEmail={handleEmail}
                  handlePassword={handlePassword}
                  auth={response.auth}
                  user={user}
                />
              )}
            ></Route>
            <Route path="/logout" render={() => <LogOut />} />
            <Route path="/:param" render={() => <NotFound />} />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
