/* eslint-disable */
import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';

import CountryTable from "./components/CountryTable";
import SearchBox from "./components/SearchBox";

import { fetchColumns, fetchItems, fetchItemsPage } from "./services/mondayService";

import categoriesData from './assets/categories/categories.json';

import Country from './classes/country'

import "./App.css";

const App = () => {
  const [category, setCategory] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const cat = categoriesData.categories[1];
    setCategory(cat);
    fetchColumns(cat).then(c => {
      setColumns(c);
      handleSearch("", cat);
    });
  }, []);

  const handleSearch = (value, cat) => {
    const categ = cat || category;
    fetchItemsPage(value).then(itemsPage => {
      const countryObjects = itemsPage.map(item => new Country(item.id, item.name));
      setCountries(countryObjects);
      const itemIds = itemsPage.map(item => item.id);
      fetchItems(categ.data, itemIds).then(data => {
        if (!data) return;
        data.forEach((itemData, index) => {
          const country = countryObjects[index];
          itemData.column_values.forEach(column => {
            const columnId = column.column.id;
            const value = JSON.parse(column.value);
            country.addData(columnId, value);
          });
        });
        setCountries(prevCountries => [...prevCountries]);
      });
    });
  };

  const handleChange = (event) => {
    handleSearch(event.target.value);
    setSearchQuery(event.target.value);
  };

  return (
    <div className="p-4">
        <Card className="shadow-sm w-100 h-100" style={{minHeight: 0}}>
          <Card.Header className="p-3">
            <SearchBox searchQuery={searchQuery} handleChange={handleChange} />
          </Card.Header>
          <Card.Body className="p-0">
            <CountryTable headers={columns} data={countries} /> 
          </Card.Body>
        </Card>
    </div>
  );
};

export default App;
