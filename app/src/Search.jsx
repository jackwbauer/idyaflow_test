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
            <form className="form-inline" onSubmit={onSubmit}>
                <input className="form-control" type="text" name="input" placeholder="Enter your search here."/>
                <button className="btn btn-primary" type="submit" name="submit">Submit</button>
            </form>
        )
    }
}

export default Search;