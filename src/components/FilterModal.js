import React, { useState } from 'react';
import Modal from 'react-modal';
import 'font-awesome/css/font-awesome.min.css';
import moment from 'moment';
import { extendMoment } from 'moment-range';
const MomentRange  = extendMoment(moment);

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
    },
    miniInput: {
        height              : '2em'
    }
  };

Modal.setAppElement('#root')

const FilterModal = ({ invoices, setFilteredInvoices, setIsFilter, setCurrentPage }) => {
    var subtitle;
    const [ modalIsOpen, setIsOpen ] = useState(false);
    const [ filters, setFilters ] = useState({});

    const openModal = () => {
      setIsOpen(true);
    }
   
    const afterOpenModal = () => {
      subtitle.style.color = '#f00';
    }
   
    const closeModal = () => {
      setIsOpen(false);
    }

    const handleChange = type => e => {
        setFilters({...filters, [type]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        const { fromDate, toDate, minAmount, maxAmount } = filters;

        if (invalidFilters(minAmount, maxAmount, 'amount') || invalidFilters(fromDate, toDate, 'dates')) return;

        setFilters({...filters, error: ''});
        applyFilters();
        setIsOpen(false);
    }

    const applyFilters = () => {
        const { keyword, fromDate, toDate, minAmount, maxAmount } = filters;
        if (keyword || fromDate || minAmount) {
            setFilteredInvoices(invoices.filter(data => {
                console.log(keyword);
                let keywordCheck = (keyword? data.name.includes(keyword): true);
                let dateCheck = (fromDate)? (moment(fromDate).valueOf() <= moment(data.date, 'DD/MM/YYYY').valueOf() && moment(toDate).valueOf() >= moment(data.date, 'DD/MM/YYYY').valueOf()): true;
                let amountCheck = (minAmount)? (parseFloat(minAmount) <= data.amount && parseFloat(maxAmount) >= data.amount):true;
                return keywordCheck && dateCheck && amountCheck;
            }))
            setIsFilter(true);
            setCurrentPage(1);
        }}

    const invalidFilters = (from, to, type) => {
        if ((from && !to) || (!from && to)) {
            setFilters({...filters, error: `*Please provide both ${type}`});
            return true;
        }
        
        let orderCheck = type === 'dates'? moment(from).isAfter(to): (parseFloat(from) > parseFloat(to));
        if (from && to && orderCheck) {
            setFilters({...filters, error: `*Invalid ${type} range!`});
            return true;
        }
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
                                <label className="m-0">Name: (keyword)</label>
                                <input onChange={handleChange('keyword')} value={filters.keyword?? ''} type="text" className="form-control p-0" style={customStyles.miniInput} />
                            </div>
                            <div className="form-group m-0">
                                <label className="m-0">Amount:</label>
                                <div className="form-row">
                                    <input onChange={handleChange('minAmount')} value={filters.minAmount?? ''} type="number" placeholder="from" className="col-6 form-control p-0 text-center" style={customStyles.miniInput} />
                                    <input onChange={handleChange('maxAmount')} value={filters.maxAmount?? ''} type="number" placeholder="to" className="col-6 form-control p-0 text-center" style={customStyles.miniInput} />
                                </div>
                            </div>
                            <div className="form-group m-0">
                                <label className="m-0">Date:</label>
                                <div className="form-row">
                                    <input onChange={handleChange('fromDate')} value={filters.fromDate?? ''} type="date" className="col-6 form-control p-0" style={customStyles.miniInput} />
                                    <input onChange={handleChange('toDate')} value={filters.toDate?? ''} type="date" className="col-6 form-control p-0" style={customStyles.miniInput} />
                                </div>
                            </div>
                            <div className="m-3">
                                <span className="text-danger">{filters.error?? ''}</span>
                                <button onClick={handleSubmit} className="btn btn-sm btn-success float-right">Apply</button>
                            </div>
                        </form>
                </Modal>
            </small>
        </>
    )
}

export default FilterModal
