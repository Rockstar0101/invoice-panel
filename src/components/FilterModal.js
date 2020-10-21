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
    },
    close: {
        fontSize            : '12px',
        position            : 'absolute',
        top                 : '12px',
        right               : '12px'
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
                    contentLabel="Filter Invoices"
                    >
                        <button onClick={closeModal} className="btn btn-sm btn-dark fa fa-times" style={customStyles.close}></button>
                        <h2 ref={_subtitle => (subtitle = _subtitle)}>Filter Invoices</h2>
                        <form>
                            <div className="form-group m-0">
                                <label className="m-0">Name:</label>
                                <input type="text" className="form-control p-0" style={{height: '2em'}} />
                            </div>
                            <div className="form-group m-0">
                                <label className="m-0">Amount:</label>
                                <div className="form-row">
                                    <input type="number" className="col-6 form-control p-0" style={{height: '2em'}} />
                                    <input type="number" className="col-6 form-control p-0" style={{height: '2em'}} />
                                </div>
                            </div>
                            <div className="form-group m-0">
                                <label className="m-0">Date:</label>
                                <div className="form-row">
                                    <input type="date" className="col-6 form-control p-0" style={{height: '2em'}} />
                                    <input type="date" className="col-6 form-control p-0" style={{height: '2em'}} />
                                </div>
                            </div>
                            <div className="m-3">
                                <button className="btn btn-sm btn-success float-right">Apply</button>
                            </div>
                        </form>
                </Modal>
            </small>

        </>
    )
}

export default FilterModal
