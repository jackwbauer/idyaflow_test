import React, { Component } from 'react';
import Search from './Search.jsx'
import TwitterLogin from 'react-twitter-auth'
import axios from 'axios'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const server = 'http://localhost:3001';

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
      .then(res => this.setState({ searchResults: res.results }))
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/tweets');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  newSearch(input) {
    // send search term to express server to perform twitter search

    this.setState({ searchInput: input });
    console.log(input);

    axios({
      method: 'post',
      url: `${server}/search`,
      data: {
        search: input
      }
    })
    .then((res) => {
      console.log(res.results);
    })
    .catch((error) => {
      console.log(error.response);
    })
  }

  render() {
    return (
      <div>
        <TwitterLogin loginUrl="http://localhost:3001/api/v1/auth/twitter"
          onFailure={this.onFailed} onSuccess={this.onSuccess}
          requestTokenUrl="http://localhost:3001/api/v1/auth/twitter/reverse" />
        <Search newSearch={this.newSearch} />
        <h2>{this.state.searchResults}</h2>
      </div>
    );
  }
}

export default App;