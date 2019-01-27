import React, { Component } from "react";
import "./SearchBar.css";

export default class SearchBar extends Component {
  constructor(props) {
      super(props);

      this.state = {
          initialItems: '',
          items: []
      }
      this.saveAndContinue = this.saveAndContinue.bind(this);
  }

//Check serverside for matching info
//Split by each hash
  filterList = event => {
    // var updatedList = this.state.initialItems;
    var search = event.target.value.toLowerCase();

    if (search){
      if (search.indexOf('#') === 0){
        //Search tags
        // Get suggestions
        // if (this.state.suggestions === null) {
          try {
              fetch('/interests/', {
                method: "GET",
                headers: {
                  "Content-Type": "application/json; charset=utf-8",
                },
              })
              .then(response => response.json())
              .then((responseJSON) => {
                this.setState({items: responseJSON})
              })
              .catch(err => console.error(err))
              } catch (e) {
                alert("Settings 3: " + e.message);
              }
        // }
        // this.setState({items: ["Search tags"]});
        
      }
      else if (search.indexOf('@') === 0){
        //Search users
        this.setState({items: ["Search users"]});
      }
      else if (search.indexOf('$') === 0){
        //Search fame by no. given
        //Prompt "give minimum fame to prompt"
        var ret = ["Search fame", "numbers!"];
        this.setState({items: ret});
      }
      else {
        // search all the things
        this.setState({items: ["Search all the things"]});
      }
    }
    else {
      // search all the things
      this.setState({items: null});
    }
  }

  componentWillMount(){
    this.setState({items: this.state.initialItems})
  }

  saveAndContinue() {
    console.log('test')
  }

  mapping (item) {
    return <li className="list-group-item" data-category={item} key={item}>{item}</li>
  }

list() {
  console.log("Items = ")
  console.info(this.state.items);
  var itemList;
  var items = this.state.items;
  // for(let item in this.state.items) {
  for(var i = 0; i < items.length; i++) {
    if (items[i].name) {
      console.log("Item[" + i + "] = " + items[i].name)
      // console.info(items[i].name)
      itemList += <li>{items[i].name}</li>;
    }
  }

  return  <ul className="suggestions">{ itemList }</ul>
}

  render(){
    return (
      <div className="filter-list">
        <form className="form">
        <fieldset className="form-group">
        <input type="text" className="form-control form-control-lg" placeholder="Search" onChange={this.filterList}/>
        {/* <input type="text" className="searchBar" placeholder="Search" onChange={this.filterList}/> */}
        </fieldset>
        </form>
        {this.state.items ? <div className="list">{this.list()}</div> :null}
      </div>
    );
  }
}
