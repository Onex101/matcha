import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  state = {
    users: [],
    user: {
      first_name: 'first_name',
      last_name: 'last_name',
      email: 'email@email.com',
      password: 'password',
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = _ => {
    fetch('/users')
      .then(response => response.json())
        .then(response  => this.setState({ users: response.data}))
          .catch(err => console.error(err))
  }

  addProductGet = _ => {
    const {product} = this.state;
    fetch(`/products/add?name=${product.name}&price=${product.price}`)
      .then(this.getProducts)
        .catch(err => console.error(err))
  }

  addUserPost = _ => {
    const {user} = this.state;
    // fetch(`/products/add?name=${product.name}&price=${product.price}`)
    // .then(response => response.json())
    fetch(`/users/add`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password
      })
    })
    .then(this.getUsers)
    .catch(err => console.error(err))
  }

  renderUser = ({id, first_name, email}) => <div id = {id} > {first_name} {email}</div>

  render() {
    const {users, user} = this.state;
    console.log(users);
    return (
      <div className="App">
          {users.map(this.renderUser)}
        <div>
          <input 
            value = {user.first_name}
            onChange = {e => this.setState({ user: {...user, first_name: e.target.value}})}/>
          <input 
            value = {user.last_name}
            onChange = {e => this.setState({ user: {...user, last_name: e.target.value}})}/>
          <input
            value = {user.email}
            onChange = {e => this.setState({ user: {...user, email: e.target.value}})}/>
          <input
            value = {user.password}
            onChange = {e => this.setState({ user: {...user, password: e.target.value}})}/>
          <button onClick={this.addUserPost}>Add user</button>
        </div>
      </div>
    );
  }
}

export default App;
