import React, { Component } from "react";
import "./SearchResults.css";
import {ControlLabel } from "react-bootstrap";
import Modal from 'react-responsive-modal';
import ControlledTabs from "./Tabs";
import UserLabel from "./UserLabel";
import { Redirect } from "react-router-dom";

export default class SearchResults extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results     : null,
            type        : null,
            open        : false,
        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
        //Add to the visits
    
        // this.props.userInfo.id
    };
    
    onCloseModal = () => {
        this.setState({ open: false });
    };

    avatar(image, width, height) {
        var image = image,
            style = {
              width: width || 50,
              height: height || 50
            }; 
        if (!image) return null;
        return (<img className="avatar" style={style} src={image} />);
    }

    componentDidMount() { 
        if (this.state.type === null && this.props.resultType !== null) {
            this.setState({type: this.props.resultType})
        }
        if (this.state.results === null) {
            if (this.props.results !== null)
                this.setState({results: this.props.results})
            else
                this.setState({results: "empty"})
        }
        if (this.state.results && this.state.resultType)
            this.props.gotResults(false);
        if (this.state.type && this.props.resultType !== null && this.state.type !== this.props.resultType)
            this.setState({type: this.props.resultType})
        if (this.state.results && this.props.results !== null && this.state.results !== this.props.results)
            this.setState({results: this.props.results})

    }

    componentDidUpdate() {
        if (this.state.type === null && this.props.resultType !== null) {
            this.setState({type: this.props.resultType})
        }
        if (this.state.results === null && this.props.results !== null) {
            if (this.props.results !== null)
                this.setState({results: this.props.results})
            else
                this.setState({results: "empty"})
        }
        if (this.state.results && this.state.resultType)
            this.props.gotResults(false);
        if (this.state.type && this.props.resultType !== null && this.state.type !== this.props.resultType)
            this.setState({type: this.props.resultType})
        if (this.state.results && this.props.results !== null && this.state.results !== this.props.results)
            this.setState({results: this.props.results})

    }

    renderUsername(user) {
        const { open } = this.state;
        return (<div>
            <div className="username"><p onClick={this.onOpenModal}>{user.user_name}</p></div>
            <div>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <ControlledTabs userInfo={user} />
                </Modal>
            </div></div>
        )
    }

    renderResults(results) {
        var resultUsers = []

        for (var elem = 0; results[elem]; elem++) {
            if (results[elem] && results[elem].pic && results[elem].user_name) {
                resultUsers.push(<UserLabel user={results[elem]} key={elem}/>)
            }
        }
        return resultUsers;
    }

    render() {
        const results = this.state.results;

        console.log("SEARCHRESULTS results:")
        console.info(this.state.type)
        console.info(results)

        //Do a check if there's a result type, then either show that, or show loading
        return (this.props.results === null && this.props.resultType === null && this.props.userInfo && this.props.userInfo.id ? <Redirect push to="/" />
                   : this.state.type && this.state.results ?
                        <div id="results"><h2>{this.state.type}</h2><hr />
                        <div >
                            {this.state.results !== "empty" ? <div className="list">{this.renderResults(results)}</div>
                                                            : <h2>There were no results matching your search :(</h2>}
                        </div></div>
                        : <ControlLabel> Loading ... </ControlLabel>);
      }
}