import React from 'react'

class TweetComponent extends React.Component {
    render() {
        return (
            <tr key={this.props.data.id}>
                <td>{new Date(Date.parse(this.props.data.created_at)).toUTCString()}</td>
                <td>{this.props.data.user.screen_name}</td>
                <td>{this.props.data.text}</td>
            </tr>
        )
    }
}

export default TweetComponent;