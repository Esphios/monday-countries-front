import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from 'react-bootstrap';

import categoriesData from '../assets/categories/categories.json';
import { getWeatherData } from '../services/apiService';
import * as mondayService from '../services/mondayService';

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
      [key: string]: unknown;
    };
  } | null;
}

const HIDDEN_FIELDS = new Set(['region', 'subregion', 'timezones']);

const CountryModal: React.FC<Props> = ({ show, onHide, rowData }) => {
  const [additionalData, setAdditionalData] = useState<DataItem[]>([]);
  const [weatherData, setWeatherData] = useState<Awaited<ReturnType<typeof getWeatherData>> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (show && rowData) {
          const data = await mondayService.fetchItems(categoriesData.categories[0].data, [rowData.id]);
          if (data.length > 0 && data[0].column_values) {
            const columns = data[0].column_values;
            const lat = getValue(columns, 'latitude');
            const lng = getValue(columns, 'longitude');

            if (lat && lng) {
              setWeatherData(await getWeatherData(`${lat},${lng}`));
            } else {
              setWeatherData(null);
            }

            setAdditionalData(columns);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [show, rowData]);

  const getValue = (columns: Array<{ id: string; value?: string }>, id: string): string => {
    const column = columns.find((item) => item.id === id);
    return column?.value?.replace(/"/g, '') ?? '';
  };

  const parseValue = (id: string, value: string): JSX.Element => {
    if (HIDDEN_FIELDS.has(id)) {
      return <></>;
    }

    if (id === 'location') {
      const location = JSON.parse(value);
      return <span>{`${location.address} (${location.lat}, ${location.lng})`}</span>;
    }

    if (value) {
      return <span>{value.replace(/"/g, '')}</span>;
    }

    return <span>No Information</span>;
  };

  if (!show || !rowData) {
    return null;
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Row style={{ width: '110%' }}>
          <Modal.Title>
            <Row className="align-items-center">
              <Col xs={8}>Additional Information</Col>
              {weatherData && (
                <Col xs={4} className="d-flex justify-content-end align-items-center">
                  <p className="mb-0 mr-2">{`${weatherData.temperature}\u00B0C`}</p>
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
            <li key={rowData.id}>
              <strong>ID: </strong>
              {rowData.id}
            </li>
            <li key={rowData.name}>
              <strong>Name: </strong>
              {rowData.name}
            </li>
            {additionalData.map((item) =>
              HIDDEN_FIELDS.has(item.id) ? null : (
                <li key={item.id}>
                  <strong>{item.column.title}: </strong>
                  {parseValue(item.id, item.value)}
                </li>
              )
            )}
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CountryModal;
