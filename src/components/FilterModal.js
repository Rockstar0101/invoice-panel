import React, { useState } from 'react';
import Modal from 'react-modal';
import 'font-awesome/css/font-awesome.min.css';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

Modal.setAppElement('#root')

const FilterModal = () => {
    var subtitle;
    const [ modalIsOpen, setIsOpen ] = useState(false);

    const openModal = () => {
      setIsOpen(true);
    }
   
    const afterOpenModal = () => {
      subtitle.style.color = '#f00';
    }
   
    const closeModal = () => {
      setIsOpen(false);
    }

    return (
        <>
            <small className="float-right" style={{fontSize:'20px'}}>
                <button onClick={openModal} className="btn btn-sm btn-info fa fa-sliders" title="Apply filters?"></button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    >
                          <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
                        <button onClick={closeModal}>close</button>
                        <div>I am a modal</div>
                        <form>
                            <input />
                            <button>tab navigation</button>
                            <button>stays</button>
                            <button>inside</button>
                            <button>the modal</button>
                        </form>
                </Modal>
            </small>

        </>
    )
}

export default FilterModal
