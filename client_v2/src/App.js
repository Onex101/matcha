import React from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from "./Routes";

function App() {
  const childProps = {
    // isAuthenticated       : this.state.isAuthenticated,
    // userHasAuthenticated  : this.userHasAuthenticated,
    // userInfo              : this.state.userInfo,
    // userProfile           : this.state.userProfile,
    // userMatches           : this.state.userMatches,
    // setUser               : this.setUser,
    // socket                : this.state.socket,
    // socketUser            : this.state.socketUser,
    // getSearchResults      : this.getSearchResults,
    // gotResults            : this.gotResults,
    // results               : this.state.results,
    // resultType            : this.state.resultType,
    // getMatches            : this.getMatches
  };
  // var style = {
  //   display: 'flex',
  // }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className="App-content">
          <Routes childProps={childProps} />
        </div>
    </div>
    
  );
}

export default App;


//  <div className="App-setup">
//       <div className="App-container">
//         <Navbar fluid collapseOnSelect>
//           <Navbar.Header>
//             <Navbar.Brand>
//               <Link to="/" className="App-logo">Matcha</Link>
//             </Navbar.Brand>
//             <div style={style}>
//               {this.searchCheck()}
//               <Navbar.Toggle />
//             </div>
//           </Navbar.Header>
//           {localStorage.getItem('user')
//             ? this.renderUser()
//             : <Navbar.Collapse><Nav pullRight>
//               <Fragment>
//                 <LinkContainer to="/signup">
//                   <NavItem>Signup</NavItem>
//                 </LinkContainer>
//                 <LinkContainer to="/login">
//                   <NavItem>Login</NavItem>
//                 </LinkContainer>
//               </Fragment>
//             </Nav></Navbar.Collapse>
//           }
//         </Navbar>
//         {console.log("Childprops: ")}
//         {console.log("Test for re-render")}
//         {console.info(childProps)}
//         {this.state.redirect ?
//           <Redirect push to="/searchResults" /> : null}
//         <div className="App-content">
//           <Routes childProps={childProps} />
//         </div>
//       </div>
//     </div> 