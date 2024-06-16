import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col } from 'react-bootstrap';

import categoriesData from '../assets/categories/categories.json';

import { getWeatherData } from '../services/apiService';

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
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (show && rowData) {
          const data = await mondayService.fetchItems(categoriesData.categories[0].data, [rowData.id]);
          if (data.length > 0 && data[0].column_values) {
            const columns = data[0].column_values;

            const lat = getValue(columns, 'latitude');
            const lng = getValue(columns, 'longitude');

            const weatherData = await getWeatherData(`${lat},${lng}`);
            setWeatherData(weatherData);

            setAdditionalData(columns);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error as needed
      }
    };

    fetchData();
  }, [show, rowData]);

  const getValue = (columns: any[], id: string): string => {
    return columns.find((col: any) => col.id === id).value.replace(/"/g, '');
  }

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
        if (value)
          return <span>{value.replace(/"/g, '')}</span>;

        return <span>No Information</span>;
    }
  };

  return (show && rowData) ? (
    <Modal show={show} onHide={onHide} >
      <Modal.Header>
        <Row style={{ width: '110%' }}><Modal.Title>
          <Row className="align-items-center">
            <Col xs={8}>
              Additional Information
            </Col>
            {weatherData && (
              <Col xs={4} className="d-flex justify-content-end align-items-center">
                <p className="mb-0 mr-2">{weatherData.temperature}°C</p>
                <img src={weatherData.icon} alt="Weather Icon" />
              </Col>
            )}
          </Row>
        </Modal.Title>
        </Row>
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
              (
                item.id === 'region' ||
                item.id === 'subregion' ||
                item.id === 'timezones'
              ) ? null :
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
  ) : null;
};

export default CountryModal;
