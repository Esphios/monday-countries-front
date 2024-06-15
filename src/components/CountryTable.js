import React, { useState } from 'react';
import { Table, Container } from 'react-bootstrap';
import CountryModal from './CountryModal';

const CountryTable = ({ headers, data }) => {
    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClick = (rowData) => {
        setSelectedRow(rowData);
    };

    const handleCloseModal = () => {
        setSelectedRow(null);
    };

    return (
        <Container className="m-0 p-0 mw-100">
            <Table className="m-0 p-0" striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        {headers.map((header) =>
                            header.id === 'name' ? null : (
                                <th key={header.id}>{header.title}</th>
                            )
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} onClick={() => handleRowClick(item)}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            {headers.map((header) =>
                                header.id === 'name' ? null : (
                                    <td key={header.id}>
                                        {renderCellValue(header.id, item.additionalData[header.id])}
                                    </td>
                                )
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>

            <CountryModal
                show={selectedRow !== null}
                onHide={handleCloseModal}
                rowData={selectedRow}
            />
        </Container>
    );
};

const renderCellValue = (headerId, value) => {
    return (typeof value === 'object' && value !== null) ?
        JSON.stringify(value) : value;
};

export default CountryTable;