import React from "react";
// import Users from "./components/users";
import NavBar from "./components/ui/navBar";
import { Redirect, Route, Switch } from "react-router-dom";
import Users from "./layouts/users";
import Login from "./layouts/login";
import Main from "./layouts/main";

function App() {
    return (
        <div>
            <NavBar />

            <Switch>
                <Route path="/users/:userId?/:edit?" exact component={Users} />
                <Route path="/main" exact component={Main} />
                <Route path="/login/:type?" exact component={Login} />
                <Redirect to={"/"} />
            </Switch>
        </div>
    );
}

export default App;
