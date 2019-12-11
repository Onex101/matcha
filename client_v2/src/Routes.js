import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";

import AppliedRoute from "./components/AppliedRoute";

// Switch rebders the first matching route that is defined within it
export default ({ childProps }) =>
    <BrowserRouter>
        <Switch>
            <AppliedRoute path="/" exact component={Home} props={childProps} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
    ;




// impo////
// import Settings from "./containers/Settings";
// import Profile from "./containers/Profile";
// import Chat from "./containers/Chat";
// import ControlledTabs from "./containers/Tabs";
// import SearchResults from "./containers/SearchResults";

//<AppliedRoute path="/login" exact component={Login} props={childProps} />
//<AppliedRoute path="/signup" exact component={Signup} props={childProps} />
//
//{/* <AppliedRoute path="/settings" exact component={Settings} props={childProps} /> */}
//{/* <AppliedRoute path="/settings" exact component={Profile} props={childProps} /> */}
//<AppliedRoute path="/settings" exact component={ControlledTabs} props={childProps} />
//
//{/* {console.log("test: " + JSON.stringify(childProps))} */}
//  <AppliedRoute path="/chat" exact component={Chat} props={childProps} />
//{ /* Finally, catch all unmatched routes */ }
//<AppliedRoute path="/searchResults" exact component={SearchResults} props={childProps} />
//<AppliedRoute path="/forgot" exact component={ForgotPassword} props={childProps} />