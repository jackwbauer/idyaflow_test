import React, { Component } from 'react';
import Search from './Search.jsx'

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      searchResults: []
    }
    this.newSearch = this.newSearch.bind(this);
  }

  newSearch(input) {
    // perform twitter search
    this.setState.searchInput = input;
    console.log(input);
  }

  render() {
    return (
      <div>
        <Search newSearch={this.newSearch}/>
        <h2>{this.state.searchInput}</h2>
      </div>
    );
  }
}

export default App;