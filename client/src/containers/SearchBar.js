import React, { Component } from "react";
import "./SearchBar.css";
import { Link } from "react-router-dom";

export default class SearchBar extends Component {
  constructor(props) {
      super(props);

      this.state = {
          initialItems: '',
          items: [],
          search: null
      }
      this.saveAndContinue = this.saveAndContinue.bind(this);
  }

//Check serverside for matching info
//Split by each hash
  filterList = event => {
    // var updatedList = this.state.initialItems;
    var search = event.target.value.toLowerCase();

    this.setState({search: search})
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

  //////////Steps for listing suggestions//////////
  escapeForRegExp (query) {
    return query.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')
  }

  markIt (input, query) {
    const regex = RegExp(this.escapeForRegExp(query), 'gi')
    // console.log("regex")
    // console.info(regex)
    // console.log("Input test:      " + input.replace(regex, '<mark>$&</mark>'))
    return {
      __html: input.replace(regex, '<mark>$&</mark>')
    }
  }

  searchThis(item, e){
    e.preventDefault()

    //Test
    var searchType;
    if (this.state.search[0] === '@') {
      searchType = "user";
    } else if (this.state.search[0] === '#') {
      searchType = "tag";
    } else if (this.state.search[0] === '$') {
      searchType = "fame";
    } else {
      searchType = "all";
    }

    var results;
    var type;


    if (searchType === "user") {
      //Do user call
    } else if (searchType === "tag") {
      //Do tag call

      try {
        // const user = this.state;
        fetch(`/tagsearch/` + localStorage.getItem('id') + `/` + item.name, {
          method: "GET",
          headers: {
              "Content-Type": "application/json; charset=utf-8",
          }
        })
        .then(response => response.json())
        .then((responseJSON) => {
          console.log("SEARCH TAGS RESULTS:")
          console.info(responseJSON)
          results = responseJSON;
          type = 'These are the users who have the tag "' + item.name + '":'
          this.props.getSearchResults(results, type);
          this.setState({search: null})
          this.refs.search.value = '';
        })
        .catch(err => console.error(err))
        } catch (e) {
          alert(e.message);
        }


    } else if (searchType === "fame") {
      //Do fame call
    } else {
      //Do all call
    }

    // this.props.getSearchResults(results, type);
    // this.setState({search: null})
    // this.refs.search.value = '';
  }

  list() {
    if (!this.state.search || !this.state.items) {
      return null;
    }

    var search = this.state.search;
    if (search[0] === '@' || search[0] === '#' || search[0] === '$') {
      search = search.substring(1);
    }
    var itemList = this.state.items;
    const regex = new RegExp(`(?:^|\\s)${this.escapeForRegExp(search)}`, 'i')
    itemList = this.state.items.filter((item) => regex.test(item.name)).slice(0);

    const options = itemList.map((item, i) => {
      const key = i;

      return (<li 
        id={key}
        key={key}
        role='option'
        aria-disabled={item.disabled === true}
        // onClick={this.searchThis()}
        onClick={this.searchThis.bind(this, item)}
        className="options"
        >
        <span dangerouslySetInnerHTML={this.markIt(item.name, search)} /></li>) 
    })

    return (<ul role='suggestions' className='suggestions'>{options}</ul>)
  }
  /////////////////////////////////////////////////

  render(){
    return (
      <div className="filter-list">
        <Link to="/searchResults" className="App-logo">
        <form className="form">
        <fieldset className="form-group">
        <input 
          type="text"
          className="form-control form-control-lg"
          placeholder="Search"
          ref="search"
          onChange={this.filterList}/>
        </fieldset>
        </form>
        {this.state.items ? <div className="list">{this.list()}</div> :null}
        </Link>
      </div>
    );
  }
}
