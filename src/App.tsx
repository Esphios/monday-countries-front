import React, { useState, useEffect, useCallback } from "react";
import Card from 'react-bootstrap/Card';

import CountryTable, { Header } from "./components/CountryTable";
import SearchBox from "./components/SearchBox";

import categoriesData from './assets/categories/categories.json';
import Country from './classes/country';

import "./App.css";

const mondayService: any = require("./services/mondayService");


interface ItemData {
  id: string;
  name: string;
  column_values: { column: { id: string }, value: string }[];
}

const App: React.FC = () => {
  const [category, setCategory] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [columns, setColumns] = useState<Header[]>([]);

  const handleSearch = useCallback(async (value: string, cat?: any) => {
    const categ = cat || category;
    try {
      const itemsPage = await mondayService.fetchItemsPage(value);
      const countryObjects = itemsPage.map((item: { id: string; name: string }) => new Country(item.id, item.name));
      setCountries(countryObjects);

      const itemIds = itemsPage.map((item: { id: any }) => item.id);
      const data = await mondayService.fetchItems(categ.data, itemIds);

      if (data) {
        data.forEach((itemData: ItemData) => {
          const country = countryObjects.find((country: any) => country.id === itemData.id);
          itemData.column_values.forEach((column) => {
            const columnId = column.column.id;
            const value = JSON.parse(column.value);
            country.addData(columnId, value);
          });
        });
        setCountries([...countryObjects]); 
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      // Handle error as needed
    }
  }, [category]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    handleSearch(value);
    setSearchQuery(value);
  };

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const cat = categoriesData.categories[1];
        setCategory(cat);
        const c = await mondayService.fetchColumns(cat);
        setColumns(c);
        await handleSearch("", cat);
      } catch (error) {
        console.error("Error initializing app:", error);
        // Handle initialization error
      }
    };
    initializeApp();
  }, [handleSearch]);

  return (
    <div className="p-4">
      <Card className="shadow-sm w-100 h-100" style={{ minHeight: 0 }}>
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
