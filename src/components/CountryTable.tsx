import React, { useState } from 'react';
import { Table, Container } from 'react-bootstrap';
import CountryModal from './CountryModal';

export interface Header {
  id: string;
  title: string;
}

export interface DataRow {
  id: string;
  name: string;
  additionalData: {
    [key: string]: any;
  };
}

interface Props {
  headers: Header[];
  data: DataRow[];
}

const CountryTable: React.FC<Props> = ({ headers, data }) => {
  const [selectedRow, setSelectedRow] = useState<DataRow | null>(null);

  const handleRowClick = (rowData: DataRow) => {
    setSelectedRow(rowData);
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
  };

  const renderCellValue = (headerId: string, value: any) => {
    return typeof value === 'object' && value !== null
      ? JSON.stringify(value)
      : value;
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
                    {renderCellValue(
                      header.id,
                      item.additionalData[header.id]
                    )}
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

export default CountryTable;
