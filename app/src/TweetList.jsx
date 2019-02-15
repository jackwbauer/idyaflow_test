import React, { Component } from "react";
import TweetComponent from './Tweet.jsx';

class TweetList extends Component {
    render() {
        const tweetList = this.props.tweets.map(tweet => {
            return <TweetComponent data={tweet} />
        });
        return (
            <div className="tweets">
                <table className="table">
                    <thead>
                        <th scope="col">Created At</th>
                        <th scope="col">Username</th>
                        <th scope="col">Tweet</th>
                    </thead>
                    <tbody>
                        {tweetList}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TweetList;