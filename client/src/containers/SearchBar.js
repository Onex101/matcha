import React, { Component } from "react";
import "./SearchBar.css";

export default class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initialItems: ''
        }
        this.saveAndContinue = this.saveAndContinue.bind(this);
    }
// var FilteredList = React.createClass({
    filterList(event){
      var updatedList = this.state.initialItems;
      updatedList = updatedList.filter(function(item){
        return item.toLowerCase().search(
          event.target.value.toLowerCase()) !== -1;
      });
      this.setState({items: updatedList});
    }

    getInitialState(){
       return {
         initialItems: [
           "Apples",
           "Broccoli",
           "Chicken",
           "Duck",
           "Eggs",
           "Fish",
           "Granola",
           "Hash Browns"
         ],
         items: []
       }
    }

    componentWillMount(){
      this.setState({items: this.state.initialItems})
    }

    saveAndContinue() {
        console.log('test')
    }

    map (item) {
        return <li className="list-group-item" data-category={item} key={item}>{item}</li>
    }
    list(){
        const item = this.state.items
        return (
          <ul className="list-group">
          {this.map(item) }
          </ul>
        )  
      }
    render(){
      return (
        <div className="filter-list">
          <form>
          <fieldset className="form-group">
          <input type="text" className="form-control form-control-lg" placeholder="Search" onChange={this.filterList}/>
          </fieldset>
          </form>
          <div className="list">{this.list()}</div>
        </div>
      );
    }
}
