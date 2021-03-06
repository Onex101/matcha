import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import ForgotPassword from "./containers/ForgotPasswordEmail";
// import Settings from "./containers/Settings";
// import Profile from "./containers/Profile";
import Chat from "./containers/Chat";
import ControlledTabs from "./containers/Tabs";
import SearchResults from "./containers/SearchResults";
import AppliedRoute from "./components/AppliedRoute";
import ResetPassword from "./containers/ResetPassword";
import Verification from "./containers/Verification";
import Search from "./containers/Search";

// Switch rebders the first matching route that is defined within it
export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    
    {/* <AppliedRoute path="/settings" exact component={Settings} props={childProps} /> */}
    {/* <AppliedRoute path="/settings" exact component={Profile} props={childProps} /> */}
    <AppliedRoute path="/settings" exact component={ControlledTabs} props={childProps} />
    
    {/* {console.log("test: " + JSON.stringify(childProps))} */}
	  <AppliedRoute path="/chat" exact component={Chat} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <AppliedRoute path="/searchResults" exact component={SearchResults} props={childProps} />
    <AppliedRoute path="/forgot" exact component={ForgotPassword} props={childProps} />
    <AppliedRoute path="/ResetPassword" exact component={ResetPassword} props={childProps} />
    <AppliedRoute path="/Verification" exact component={Verification} props={childProps} />
    <AppliedRoute path="/search" exact component={Search} props={childProps} />
    <Route component={NotFound} />
  </Switch>;