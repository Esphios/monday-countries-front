import React from 'react';
import { Table, Container } from 'react-bootstrap';

const CountryTable = ({ headers, data }) => {
    console.log("table", headers, data)
    if (!headers || headers.length === 0 || !data || data.length === 0) {
        return null;
    }
    return (
        <Container className="m-0 p-0">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        {headers.map((header) => header.id === "name" ? null : (
                            <th key={header.id}>{header.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            {headers.map((header) => header.id === "name" ? null : (
                                <td key={header.id}>
                                    {renderCellValue(header.id, item.additionalData[header.id])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

const renderCellValue = (headerId, value) => {
    // Custom rendering based on headerId and value
    if (typeof value === 'object' && value !== null) {
        if (headerId === 'location') {
            return `${value.lat}, ${value.lng}`;
        } else if (headerId === 'timezones') {
            const timezones = JSON.parse(value);
            return timezones.map((zone) => zone.zoneName).join(', ');
        } else {
            return JSON.stringify(value); // Handle other objects as string
        }
    } else {
        return value; // Render as-is for non-objects
    }
};

export default CountryTable;