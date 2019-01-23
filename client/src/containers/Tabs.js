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
    constructor(props) {
      super(props);
  
      this.handleSelect = this.handleSelect.bind(this);
  
      this.state = {
        key: null,
        userInfo: null
      };
    }
  
    handleSelect(key) {
    //   alert(`selected ${key}`);
      this.setState({ key });
    }
  
    componentDidMount(){
      // console.log("Tabs did mount props:")
      // console.info(this.props)
      // console.log("Tabs did mount state:")
      // console.info(this.state)
      if (!this.state.userInfo){
        // console.log("DM State userinfo is empty")
        if (this.props.userInfo && this.props.userInfo.id){
          // console.log("DM Props userinfo exists")
          this.setState({userInfo: this.props.userInfo})
          this.setState({userInfo: this.props.userInfo.data})
        }
        else if (this.props.userInfo && this.props.userInfo.data && this.props.userInfo.data.id){
          // console.log("DM Props data userinfo exists")
          this.setState({userInfo: this.props.userInfo.data})
        }
        else {
          // console.log("DM Props is empty")
        }
      }
      if (this.state.key === null && this.state.userInfo && this.state.userInfo.id) {
        // console.log("DU Key State")
        // console.info(this.state)
        if (this.state.userInfo.profile_pic_id){
            this.setState({key: 1});
        }
        else {
            this.setState({key: 3});
        }
      }
    }

    componentWillUpdate(){
      // console.log("In tabs test:")
      // console.info(this.props)
      // console.log("Tabs will update props:")
      // console.info(this.props)
      // console.log("Tabs will update state:")
      // console.info(this.state)
      if (!this.state.userInfo){
        // console.log("WU State userinfo is empty")
        if (this.props.userInfo && this.props.userInfo.id){
          // console.log("WU Props userinfo exists")
          this.setState({userInfo: this.props.userInfo})
        }
        else if (this.props.userInfo && this.props.userInfo.data && this.props.userInfo.data.id){
          // console.log("WU Props data userinfo exists")
          this.setState({userInfo: this.props.userInfo.data})
        }
        else {
          // console.log("WU Props is empty")
        }
      }
      if (this.state.key === null && this.state.userInfo && this.state.userInfo.id) {
        // console.log("WU Key State")
        // console.info(this.state)
        if (this.state.userInfo.pic){
            this.setState({key: 1});
        }
        else {
            this.setState({key: 3});
        }
      }
    }
 
    checkValidUser() {
      // console.log("Valid user check:")
      // console.info(this.state)
        if (this.state.userInfo && this.state.userInfo.pic) {
          // console.log("Valid user!")
          return true;
        }
        else
            return false;
        // return true
    }
 
    render() {
      const validity = this.checkValidUser();

      return (
        this.state.userInfo && this.state.userInfo.id ?
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="controlled-tab-example" >
        {validity === true ?
          <Tab eventKey={1} title="Profile" >
            <Profile userInfo = {this.state.userInfo} />
          </Tab>
          : <Tab eventKey={1} title="Profile" disabled ></Tab>}
          
          {/* <Tab eventKey={1} title="Profile">
          {console.log("In tabs test:")}
          {console.info(this.state.userInfo)}
            <Profile userInfo = {this.state.userInfo} />
          </Tab> */}
          {validity === true ? <Tab eventKey={2} title="Likes"></Tab>
              :<Tab eventKey={2} title="Likes" disabled></Tab>}
          {/* <Tab eventKey={2} title="Likes">
            Tab 2 content
          </Tab> */}
          {this.state.userInfo.id == localStorage.getItem("id") ?
            <Tab eventKey={3} title="Settings">
                <Settings 
                // isAuthenticated = {this.props.isAuthenticated}
                            // userHasAuthenticated  = {this.props.userHasAuthenticated}
                            userInfo = {this.props.userInfo}
                            // userProfile = {this.props.userProfile}
                            // userMatches = {this.props.userMatches}
                            setUser = {this.props.setUser} 
                            />
            </Tab> 
          : null}
        </Tabs>
        : <ControlLabel> Loading ... </ControlLabel>
      );
    }
  }
  