import { useEffect } from "react";
import PropTypes from 'prop-types';
import { Overlay, ModalStyled } from './Modal.styled';
import { createPortal } from "react-dom";

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ children, onClose}) => {
    useEffect(() => {
        const handleKeyDown = e => {
            if (e.code === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose])

    const handleClickBackdrop = e => {
        if (e.target === e.currentTarget) onClose();
    };

    return createPortal(
        <Overlay onClick={handleClickBackdrop}>
            <ModalStyled>
                {children}
            </ModalStyled>
        </Overlay>,
        modalRoot,
    );
};

Modal.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired
};