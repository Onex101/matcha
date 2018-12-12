import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";

// import AccountFields from "./containers/AccountFields";
// import SurveyFields from "./containers/SurveyFields";
// import Confirmation from "./containers/Confirmation";
// import Success from "./containers/Success";

import AppliedRoute from "./components/AppliedRoute";

// Switch rebders the first matching route that is defined within it
export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
