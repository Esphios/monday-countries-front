import React, { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';

import categoriesData from '../assets/categories/categories.json';

const mondayService: any = require("../services/mondayService");

interface Column {
  id: string;
  title: string;
}

interface DataItem {
  column: Column;
  id: string;
  type: string;
  value: string;
}
interface Props {
  show: boolean;
  onHide: () => void;
  rowData: {
    id: string;
    name: string;
    additionalData: {
      [key: string]: any;
    };
  } | null;
}

const CountryModal: React.FC<Props> = ({ show, onHide, rowData }) => {
  const [additionalData, setAdditionalData] = useState<DataItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (show && rowData) {
          const data = await mondayService.fetchItems(categoriesData.categories[0].data, [rowData.id]);
          if (data.length > 0 && data[0].column_values) {
            console.log(data[0].column_values)
            setAdditionalData(data[0].column_values);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error as needed
      }
    };

    fetchData();
  }, [show, rowData]);

  const parseValue = (id: string, value: string): JSX.Element => {

    switch (id) {
      case 'region':
      case 'subregion':
      case 'timezones':
        return <></>;
      case 'location':
        const location = JSON.parse(value);
        return <span>{`${location.address} (${location.lat}, ${location.lng})`}</span>;
      default:
        return <span>{value.replace(/"/g, '')}</span>;
    }
  };

  return (show && rowData) ? (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Additional Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <ul>
            <li key={rowData!.id}>
              <strong>ID: </strong>
              {rowData!.id}
            </li>
            <li key={rowData!.name}>
              <strong>Name: </strong>
              {rowData!.name}
            </li>
            {additionalData.map((item) => (
              (item.id === 'region' || item.id === 'subregion' || item.id === 'timezones') ? null :
                <li key={item.id}>
                  <strong>{item.column.title}: </strong>
                  {parseValue(item.id, item.value)}
                </li>
            ))}
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  ):null;
};

export default CountryModal;
