import React, { Component } from "react";
import { Tabs, Tab, ControlLabel} from "react-bootstrap";
import Settings from "./Settings";
import Profile from "./Profile";

// export default class ControlledTabs extends Component {
//     constructor(props, context) {
//       super(props, context);
  
//       this.handleSelect = this.handleSelect.bind(this);
  
//       this.state = {
//         key: null,
//         id: null
//       };
//     }
  
//     handleSelect(key) {
//       this.setState({ key });
//     }

//     checkValidUser() {
//         // if (this.props.userInfo && this.props.userInfo.profile)
//         //     return true;
//         // else
//         //     return false;
//         return true
//     }

//     componentDidMount(){
//         // if (this.props.userInfo && this.props.userInfo.id && this.state.id === null)
//         //     this.setState({id: this.props.userInfo.id});
//         if (this.props.userInfo && this.props.userInfo.profile){
//             this.setState({key: 1});
//         }
//         else {
//             this.setState({key: 3});
//         }
//     }

//     componentDidUpdate(){
//         // if (this.props.userInfo && this.props.userInfo.id && this.state.id === null)
//         //     this.setState({id: this.props.userInfo.id});
//         if (this.state.key === null) {
//             if (this.props.userInfo && this.props.userInfo.profile){
//                 this.setState({key: 1});
//             }
//             else {
//                 this.setState({key: 3});
//             }
//         }
//     }

//     componentWillReceiveProps(nextProps) {
//         console.log("SDFKJHDSKFJHSDKJFHSDKFH: ", nextProps)
//         this.setState({id: nextProps.userInfo.id})
//     }
  
//     render() {
//         const validity = this.checkValidUser();
//         // var childProps = this.props;
//         if (this.props.userInfo){
//             console.log("STATE ID TEST: ");
//             console.info(this.state.id);
//             // console.log(JSON.stringify(this.props.userInfo.data));
//         }
//         else
//             console.log("STATE ID TEST: NO PROPS");
//         return(this.props.userInfo && this.props.userInfo.id ?
//             // <p>Got props</p>
//             // : <p>No props</p>
//             // return (this.state.key ?
//                 <Tabs activeKey={this.state.key}
//                             onSelect={this.handleSelect}
//                             id="controlled-tab-example" >

//                 {validity === true ?
//                             <Tab eventKey={1} title="Profile" >
//                                 <Profile isAuthenticated = {this.props.isAuthenticated}
//                                     userHasAuthenticated  = {this.props.userHasAuthenticated}
//                                     userInfo = {this.props.userInfo}
//                                     userProfile = {this.props.userProfile}
//                                     userMatches = {this.props.userMatches}
//                                     setUser = {this.props.setUser} />
//                             </Tab>
//                             : <Tab eventKey={1} title="Profile" disabled ></Tab>}
//                 {validity === true ? <Tab eventKey={2} title="Likes"></Tab>
//                 :<Tab eventKey={2} title="Likes" disabled></Tab>}
//                 {this.props.userInfo && this.props.userInfo.id == localStorage.getItem('id') ? 
//                     <Tab eventKey={3} title="Settings">
//                         <Settings isAuthenticated = {this.props.isAuthenticated}
//                             userHasAuthenticated  = {this.props.userHasAuthenticated}
//                             userInfo = {this.props.userInfo}
//                             userProfile = {this.props.userProfile}
//                             userMatches = {this.props.userMatches}
//                             setUser = {this.props.setUser} />
//                     </Tab>:null}
//                 </Tabs>
//             :<ControlLabel> Loading ... </ControlLabel>
//             );
//     }
// }









export default class ControlledTabs extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleSelect = this.handleSelect.bind(this);
  
      this.state = {
        key: 1,
        userInfo: null
      };
    }
  
    handleSelect(key) {
    //   alert(`selected ${key}`);
      this.setState({ key });
    }
  
    componentDidMount(){
        if (this.props.userInfo && this.props.userInfo.id && this.state.userInfo === null)
            this.setState({userInfo: this.props.userInfo})
    }

    componentWillUpdate(){
        if (this.props.userInfo && this.props.userInfo.id && this.state.userInfo === null)
            this.setState({userInfo: this.props.userInfo})
    }

    componentWillReceiveProps(nextProps){
        if (this.props.userInfo && this.props.userInfo.id) {
            if( nextProps.userInfo !== this.props.userInfo)
                this.setState({userInfo: nextProps.userInfo});
        }
    }
    
    render() {
      return (
        // this.props.userInfo && this.props.userInfo.id ?
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="controlled-tab-example"
        >
          <Tab eventKey={1} title="Profile">
          <Profile userInfo = {this.props.userInfo} />
          </Tab>
          <Tab eventKey={2} title="Likes">
            Tab 2 content
          </Tab>
          {/* {this.props.userInfo.id == localStorage.getItem("id") ? */}
            <Tab eventKey={3} title="Settings">
                Tab 3 content
            </Tab> 
            {/* : null} */}
        </Tabs>
        // : <ControlLabel> Loading ... </ControlLabel>
      );
    }
  }
  