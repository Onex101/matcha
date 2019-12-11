import React from "react";
import { Route } from "react-router-dom";

//component creates a Route where the child component that is rendered contains the passed in props
export default ({ component: C, props: cProps, ...rest }) =>
  <Route {...rest} render={props => <C {...props} {...cProps} />} />;