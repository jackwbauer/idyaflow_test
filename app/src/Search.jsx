import React, { Component } from "react";

class Search extends Component {
    render() {
        const onSubmit = event => {
            event.preventDefault();
            const input = event.target.elements.input;
            this.props.newSearch(input.value);
            input.value = '';
        }
        return (
            <form className="searchForm" onSubmit={onSubmit}>
                <input name="input" defaultValue="" placeholder="Enter your search here."/>
                <button name="submit">Submit</button>
            </form>
        )
    }
}

export default Search;