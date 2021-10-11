import React from "react";
// import Users from "./components/users";
import NavBar from "./components/navBar";
import { Redirect, Route, Switch } from "react-router-dom";
import UsersPage from "./components/layouts/usersPage";
import LoginPage from "./components/layouts/loginPage";
import MainPage from "./components/layouts/mainPage";

function App() {
    return (
        <div>
            <NavBar />

            <Switch>
                <Route path="/users/:userId?" exact component={UsersPage} />
                <Route path="/main" exact component={MainPage} />
                <Route path="/login" exact component={LoginPage} />
                <Redirect to={ "/users" }/>
            </Switch>
        </div>
    );
}

export default App;
