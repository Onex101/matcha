import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import queryString from 'query-string'

export default class Verification extends Component {
  constructor() {
    super();

    this.state = {
      user_name: '',
      veri_code: '',
      updated: false,
      isLoading: true,
      error: false,
      errorMessage: '',
    };
  }

  componentDidMount() {
    // console.log(this.props.location.search) // "?filter=top&origin=im"
    // console.log(this.props.location.search.user) // "?filter=top&origin=im"

    // var inputString = JSON.stringify(this.props.location.search);
    // console.log("TESTER")

    const values = queryString.parse(this.props.location.search)

    // console.log(values.user) // "top"
    // console.log(values.origin) // "im"
    this.setState({user_name: values.user, veri_code: values.origin});

    try {
        const user = this.props.fieldValues;
        // console.log( values.user);
        //   console.log(this.state.confirmationCode);
        fetch(`/signup/verify`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            user_name         :  values.user,
            veri_code         :  values.origin,
          })
        })
        .then(response => response.json())
        .then((responseJSON) => {
            // console.log(responseJSON);
            // console.log(responseJSON);
          if (responseJSON["success"] || responseJSON["error"]) {
              if (responseJSON["error"] === null && responseJSON["success"] === "veri-code is correct") {
                this.setState({ updated: true , isLoading: false})
              } else if (responseJSON["error"] === "verification update fail" && responseJSON["success"] === null){
                  alert("Invalid Confirmation Code!");
                  this.setState({ isLoading: false });
                  this.setState({ error: true })
                } 
          }
          else {
              alert("Something went wrong :(");
              this.setState({ isLoading: false });
              this.setState({ error: true })
            }
        })
        .catch(err => console.error(err))
        } catch (e) {
          alert(e.message);
        }
  }

  render() {
    const {  error, isLoading, updated } = this.state;

    if (error) {
      return (
        <div>
          <div>
            <h4>A problem occured with your registration.</h4>
          </div>
        </div>
      );
    } else if (isLoading) {
      return (
        <div>
          <div>Loading...</div>
        </div>
      );
    } else {
      return (
        <div>
          {updated && (
            <div>
              <p>
                You are ready to go! Please log in to find your Match!
              </p>
            </div>
          )}
        </div>
      );
    }
  }
}