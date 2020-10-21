import React from 'react'

const Invoices = ({ invoices }) => {
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
