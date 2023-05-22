import { Component } from "react";
import PropTypes from 'prop-types';
import { Header, Form, Button, SearchIcon, ButtonLabel, Input } from './Searchbar.styled';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export class Searchbar extends Component  {
    state = {
        query: '',
    };

    handleChange  = e => {
        this.setState({ query: e.currentTarget.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.query.trim() === '') {
            toast.warn('You can enter something');
            return;
        }

        this.props.onSubmit(this.state.query);
        this.setState({ query: '' });
    }

    render() {
        return (
            <Header>
                <Form onSubmit={this.handleSubmit}>
                    <Button type="submit"
                        aria-label="Search">
                        <SearchIcon size={20} />
                        <ButtonLabel>Search</ButtonLabel>
                    </Button>
                    <Input autoComplete="off"
                        type="text"
                        value={this.state.query}
                        onChange={this.handleChange }
                        autoFocus
                        placeholder="Search images and photos" />
                </Form>
            </Header>
        );
    };
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};