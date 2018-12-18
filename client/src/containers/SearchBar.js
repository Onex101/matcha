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
    var updatedList = this.state.initialItems;
    var search = event.target.value.toLowerCase();

    if (search){
      if (search.indexOf('#') === 0){
        //Search tags
        this.setState({items: ["Search tags"]});
        
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
  console.log("Items = " + this.state.items);
  var itemList = this.state.items;
  for(let item in this.state.items) {
    itemList += <li>{item}</li>;
  }

  return  <ul>{ itemList }</ul>
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
        <div className="list">{this.list()}</div>
      </div>
    );
  }
}
