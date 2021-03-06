import React, { Component } from "react";
import "./SearchBar.css";

export default class SearchBar extends Component {
  constructor(props) {
      super(props);

      this.state = {
          initialItems: '',
          items: [],
          search: null,
          // redirect: false
      }
      this.saveAndContinue = this.saveAndContinue.bind(this);
  }

//Check serverside for matching info
//Split by each hash
  // handleSubmit() {

  //   var search = this.refs.search.value.toLowerCase();

  //   var item = [{id: null, name: search}]

  //   this.searchThis.bind(this, item[0])

  // }
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
        //Search users (user matches as suggestions)
        this.setState({items: ["Search users"]});
      }
      else if (search.indexOf('$') === 0){
        //Search fame by no. given No suggestions
        //Prompt "give minimum fame to prompt"
        var ret = ["Search fame", "numbers!"];
        this.setState({items: ret});
      }
      else {
        // search all the things join tags and matches somehow?
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
    // console.log('test')
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
    // console.log("ITEMS TEST 1:")
    // console.info(item)
    if (item.name[0] === '@' || item.name[0] === '#' || item.name[0] === '$') {
      item.name = item.name.substring(1);
    }
    var results;
    var type;

    if (this.state.search[0] === '@') {
      //Do user call
    } else if (this.state.search[0] === '#') {
      //Do tag call

      try {
        fetch(`/tagsearch/` + localStorage.getItem('id') + `/` + item.name, {
          method: "GET",
          headers: {
              "Content-Type": "application/json; charset=utf-8",
          }
        })
        .then(response => response.json())
        .then((responseJSON) => {
          // console.log("SEARCH TAGS RESULTS:")
          // console.info(responseJSON)
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


    } else if (this.state.search[0] === '$') {
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
        <form className="form" onSubmit={this.refs.search && this.refs.search.value ? this.searchThis.bind(this, {id: null, name: this.refs.search.value.toLowerCase()}) : null}>
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
      </div>
    );
  }
}
