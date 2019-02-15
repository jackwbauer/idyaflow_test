import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap'

class Search extends Component {
    render() {
        const onSubmit = event => {
            event.preventDefault();
            const input = event.target.elements.input;
            this.props.newSearch(input.value);
            input.value = '';
        }
        return (
            <Form className="form-inline searchBar" onSubmit={onSubmit}>
                <Form.Control className="form-control" type="text" name="input" placeholder="Enter your search here."/>
                <Button className="btn btn-primary" type="submit" name="submit">Submit</Button>
            </Form>
        )
    }
}

export default Search;