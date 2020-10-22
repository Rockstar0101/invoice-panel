import React from 'react'

const Invoices = ({ invoices }) => {
    if (!invoices.length) {
        return (<tr><td colSpan="4">No data Available to show</td></tr>)
    }
    return (
        <>
            {invoices.map(invoice => (
                <tr key={invoice.invNo}>
                    <td>{invoice.invNo}</td>
                    <td>{invoice.name}</td>
                    <td>{invoice.amount}</td>
                    <td>{invoice.date}</td>
                </tr>
            ))}
        </>
    )
}

export default Invoices
