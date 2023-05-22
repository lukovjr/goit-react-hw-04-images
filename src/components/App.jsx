import { Component } from "react";
import { Container } from './App.styled';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { ToastContainer } from 'react-toastify';


export class App extends Component {
  state = {
    query: '',
  }
  
  handleSearchImage = (query) => {
    this.setState({ query });
  };

  render() {
    return(
      <Container>
        <Searchbar onSubmit={this.handleSearchImage} />
        <ImageGallery query={this.state.query} />
        <ToastContainer autoClose =  {1000}/>
      </Container>
    );
  };
};