import { Component } from "react";
import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';
import { Modal } from '../Modal';

export class ImageGalleryItem extends Component {
    state = {
        isShowModal: false,
    };

    toggleModal = () => {
        this.setState(({isShowModal}) => ({
            isShowModal: !isShowModal
        }));
    }
    
    render() {
        const { url, alt, largeImageURL } = this.props
        return (
            <>
            <Item onClick={this.toggleModal}>
                <Image
                    src={url}
                    alt={alt}
                    loading="lazy" />
                </Item>
                {this.state.isShowModal &&
                    <Modal onClose={this.toggleModal}>
                        <img alt={alt} src={largeImageURL}/>
                    </Modal>
                }
            </>
        )
    }
}

ImageGalleryItem.propTypes = {
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
}