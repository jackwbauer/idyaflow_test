import React, { Component } from 'react';
import Search from './Search.jsx'

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      searchResults: [],
      data: null
    }
    this.newSearch = this.newSearch.bind(this);
  }

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/tweets');
    const body = await response.json();

    if(response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  newSearch(input) {
    // send search term to express server to perform twitter search

    this.setState({searchInput: input});
    console.log(input);
  }

  render() {
    return (
      <div>
        <Search newSearch={this.newSearch}/>
        <h2>{this.state.searchResults}</h2>
      </div>
    );
  }
}

export default App;