import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Invoices from "./components/Invoices";
import TableHeader from './components/TableHeader';
import Pagination from './components/Pagination';
import FilterModal from './components/FilterModal';

function App() {
  const [ invoices, setInvoices ] = useState([]);
  const [ filteredInvoices, setFilteredInvoices ] = useState([]);
  const [ isFilter, setIsFilter ] = useState(false);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ invoicesPerPage ] = useState(15);

  // Create Random Data by own
  const customData = () => {
      let nameStr = "abacdegehikilmonopurstuy",
          invoiceArr = [];
      const randomName = () => {
          let name = "";
          for (let i = 0; i < (4 + Math.floor(5*Math.random())); i++) { //Generate Strings(4,9) for Name 
              name += nameStr[Math.floor(nameStr.length*Math.random())];
          }
          return name;
      }

      for (let i = 0; i < 100; i++) {
          invoiceArr.push({
              invNo: 1245781 + i,
              name: randomName(),
              amount: (100 + (25* Math.floor(Math.random()*100))).toFixed(2),
              date: moment(new Date(+(new Date()) - Math.floor(Math.random()*10000000000))).format('DD/MM/YYYY')
          })
      }
      localStorage.setItem('invoiceList', JSON.stringify(invoiceArr));
      return JSON.parse(localStorage.getItem('invoiceList'));
  }

  useEffect(() => {
      setInvoices(customData());
  }, [])

  // Get Current invoices
  const viewingInvoices = (isFilter? filteredInvoices: invoices);
  const currentInvoices = viewingInvoices.slice((currentPage-1) * invoicesPerPage, currentPage * invoicesPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-3">
        <h1 className="text-primary">Invoice Details 
            <FilterModal setCurrentPage={setCurrentPage} invoices={invoices} setFilteredInvoices={setFilteredInvoices} setIsFilter={setIsFilter} />
        </h1>
        <div style={{ textAlign: 'right' }}>(showing {viewingInvoices.length} results)</div>
        <table className="table table-striped table-bordered text-center">
          <TableHeader />
          <tbody>
            <Invoices invoices={currentInvoices} />
          </tbody>
        </table>
        <Pagination totalInvoices={viewingInvoices.length} invoicesPerPage={invoicesPerPage} paginate={paginate} />
    </div>
  );
}

export default App;
