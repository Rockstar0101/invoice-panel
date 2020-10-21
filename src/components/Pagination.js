import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';

const Pagination = ({ totalInvoices, invoicesPerPage, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalInvoices / invoicesPerPage); i++) {
        pageNumbers.push(i);       
    }
    return (
        <nav>
          <ul className="pagination float-right">
		  <Router>
                { pageNumbers.map(number => (
                    <li key={number} className="page-item" >
                        <Link onClick={() => paginate(number)} to="" className="page-link">
                            { number }
                        </Link>
                    </li>
                )) }
			</Router>
          </ul>  
        </nav>
    )
}

export default Pagination
