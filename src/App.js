/* eslint-disable */
import React, { useState, useEffect } from "react";
import mondaySdk from "monday-sdk-js";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import "./App.css";
import CountryTable from "./components/table";
import {
  GET_BOARDS_COLUMNS,
  GET_BOARDS_ITEMS_PAGE,
  GET_ITEMS,
  GET_ALL_ITEMS_PAGE
} from './graphql/queries';
import Country from "./classes/country";
import categoriesData from './assets/categories/categories.json';


const monday = mondaySdk();

const App = () => {
  const [category, setCategory] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [columns, setColumns] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const cat = categoriesData.categories[3]
    setCategory(cat);
    fetchColumns(cat).then(c => {
      setColumns(c);
      handleSearch("", cat);
    });
  }, []);



  const fetchColumns = async (cat) => {
    const categ = cat || category;
    try {
      const response = await monday.api(GET_BOARDS_COLUMNS);
      return response.data.boards[0].columns.filter(item => categ.data.includes(item.id));;
    } catch (error) {
      // console.error("Error fetching columns:", error);
    }
  };

  const fetchAllItemsPage = async () => {
    const response = await monday.api(GET_ALL_ITEMS_PAGE);
    return response.data.boards[0].items_page.items;
  };

  const fetchFilteredItemsPage = async (compareValue) => {
    const response = await monday.api(GET_BOARDS_ITEMS_PAGE, {
      variables: { columnId: "name", compareValue },
    });
    return response.data.boards[0].items_page.items
  }

  const fetchItemsPage = async (value) => {
    try {
      if (!value || !value.trim())
        return await fetchAllItemsPage();
      else
        return await fetchFilteredItemsPage(value);
    } catch (error) {
      // console.error("Error fetching items page:", error);
    }
  };

  const fetchItems = async (columns, ids) => {
    if (ids.length === 0) {
      return;
    }
    try {
      const response = await monday.api(GET_ITEMS, {
        variables: { columns, ids },
      });
      setShowTable(true);
      return response.data.items;
    } catch (error) {
      // console.error("Error fetching items:", error);
    }
  };

  const handleSearch = (value, cat) => {
    const categ = cat || category;
    fetchItemsPage(value).then(itemsPage => {
      const countryObjects = itemsPage.map(item => new Country(item.id, item.name));
      setCountries(countryObjects);
      console.log({itemsPage});
      const itemIds = itemsPage.map(item => item.id);
      fetchItems(categ.data, itemIds).then(data => {
        if (!data) return;
        // Assign additional data to corresponding country objects
        data.forEach((itemData, index) => {
          const country = countryObjects[index];
          itemData.column_values.forEach(column => {
            const columnId = column.column.id;
            const value = JSON.parse(column.value);
            country.addData(columnId, value);
          });
        });

        // Update state to trigger re-render with updated data
        setCountries(prevCountries => [...prevCountries]);
        // console.log(countries)
      });
    });
  };
  const handleChange = (event) => {
    handleSearch(event.target.value);
    setSearchQuery(event.target.value);
  };

  return (
    <div className="App p-4">
      <div className="SearchBox">
        <Card className="shadow-sm w-100 h-100" style={{ width: 'inherit' }}>
          <Card.Header className="p-3">
            <Form.Control
              type="text"
              placeholder="Input the country's name fragment..."
              value={searchQuery}
              onChange={handleChange} />
          </Card.Header>
          <Card.Body className="p-0">
            {showTable ? <CountryTable headers={columns} data={countries} /> : null}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default App;
