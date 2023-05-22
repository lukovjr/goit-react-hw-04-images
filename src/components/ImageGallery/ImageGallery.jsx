import { Component } from "react";
import PropTypes from 'prop-types';
import { Button } from '../Button';
import { Loader } from '../Loader';
import { fetchImages } from '../../servises/API';
import { ImageGalleryItem } from '../ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
import { toast } from 'react-toastify';


export class ImageGallery extends Component {
    state = {
        gallery: [],
        error: null,
        status: 'idle',
        page: 1,
    };

    async componentDidUpdate(prevProps, prevState) {
        
        if (prevProps.query !== this.props.query) {
            this.setState({ status: 'pending', page: 1 });

            try {
                const { hits } = await fetchImages(this.props.query, 1);

               
                

                this.setState(prevState => {
                    return {
                        gallery: hits,
                        status: 'resolved',
                        page: prevState.page + 1,
                    }
                });
            } catch (error) {throw new Error(error.message)}
        };
    };

    handleClickLoadMore = async () => { 
        try {
            const { hits } = await fetchImages(this.props.query, this.state.page);
            this.setState(prevState => {
                    return {
                        gallery: [...prevState.gallery, ...hits],
                        page: prevState.page + 1,
                    }
                });
        } catch (error) {this.setState({ error, status: 'rejected' })}
    };

    render() {
        const { gallery, error, status } = this.state;

        if (status === 'pending') {
            return <Loader/>
        };

        if (status === 'rejected') {
            toast.warn(`${error.message}`)
            return;
        };

        if (status === 'resolved') {
            return <>
                    <Gallery>
                    {gallery.map(({ id, webformatURL, tags, largeImageURL }) => (
                        <ImageGalleryItem
                            key={id}
                            url={webformatURL}
                            alt={tags}
                            largeImageURL={largeImageURL}
                        />
                    ))}
                    </Gallery>
                    <Button onClick={this.handleClickLoadMore}>Load more</Button>
            </>
        };
    };
}

ImageGallery.propTypes = {
    query: PropTypes.string.isRequired,
}