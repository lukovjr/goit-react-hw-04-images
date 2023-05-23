import { useState } from "react";
import PropTypes from 'prop-types';
import { Header, Form, Button, SearchIcon, ButtonLabel, Input } from './Searchbar.styled';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const Searchbar = ({ onSubmit }) => {
    const [query, setQuery] = useState('');

    const handleChange = e => setQuery(e.currentTarget.value);

    const handleSubmit = e => {
        e.preventDefault();
        if (query.trim(" ") === " ") {
            toast.warn('You can enter something');
            return;
        }
        onSubmit(query);
    };

        return (
            <Header>
                <Form onSubmit={handleSubmit}>
                    <Button type="submit"
                        aria-label="Search">
                        <SearchIcon size={20} />
                        <ButtonLabel>Search</ButtonLabel>
                    </Button>
                    <Input autoComplete="off"
                        type="text"
                        value={query}
                        onChange={handleChange}
                        autoFocus
                        placeholder="Search images and photos" />
                </Form>
            </Header>
        );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};