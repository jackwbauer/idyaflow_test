import React, { Component } from "react";

class ChatBar extends Component {

    render() {
        return (
            <form className="searchForm" onSubmit={this.props.newSearch}>
                <input name="input" defaultValue="" placeholder="Enter your search here."/>
                <button name="submit">Submit</button>
            </form>
        )
    }
}

export default ChatBar;