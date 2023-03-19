import PropTypes from 'prop-types';
import { useEffect} from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalEl } from "./Modal.styled";
import { ModalImg } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');

export const Modal = ({onClose, selectedImg}) =>{
     const  handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
          onClose();
        }
      };
    
      useEffect(()=>{
        const handleKeyDown = e => {
          if (e.code === 'Escape') {
            onClose();
          }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () =>{
              window.removeEventListener('keydown', handleKeyDown); }              
      }, [onClose])


    return createPortal(
        <Overlay onClick={handleBackdropClick}>
            <ModalEl>
            <ModalImg src={selectedImg[0].largeImageURL} alt ={selectedImg[0].tags}></ModalImg></ModalEl>
        </Overlay>,
        modalRoot,
    )
}
Modal.propTypes ={
  onClose: PropTypes.func.isRequired,
  selectedImg: PropTypes.array.isRequired,
}