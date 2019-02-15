import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import TweetComponent from './Tweet.jsx';

class TweetList extends Component {
    render() {
        const tweetList = this.props.tweets.map(tweet => {
            return <TweetComponent data={tweet} />
        });
        return (
            <div className="tweets" key='tweetList'>
                <Table>
                    <thead>
                        <th scope="col">Created At</th>
                        <th scope="col">Username</th>
                        <th scope="col">Tweet</th>
                    </thead>
                    <tbody>
                        {tweetList}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default TweetList;