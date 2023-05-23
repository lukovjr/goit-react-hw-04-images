import { useState } from "react";
import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';
import { Modal } from '../Modal';

export const ImageGalleryItem = ({ url, alt, largeImageURL }) => {
    const [isShowModal, setIsShowModal] = useState(false);

    const toggleModal = () => setIsShowModal(prev => !prev);

    return (
        <>
            <Item onClick={toggleModal}>
                <Image
                    src={url}
                    alt={alt}
                    loading="lazy" />
            </Item>
            {isShowModal &&
                <Modal onClose={toggleModal}>
                    <img alt={alt} src={largeImageURL} />
                </Modal>
            }
        </>
    );
}

ImageGalleryItem.propTypes = {
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
};