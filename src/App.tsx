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

  const handleSearch = useCallback((value: string, cat?: any) => {
    const categ = cat || category;
    mondayService.fetchItemsPage(value).then((itemsPage: any[]) => {
      const countryObjects = itemsPage.map((item: { id: string; name: string }) => new Country(item.id, item.name));
      setCountries(countryObjects);
      const itemIds = itemsPage.map((item: { id: any }) => item.id);
      mondayService.fetchItems(categ.data, itemIds).then((data: ItemData[]) => {
        if (!data) return;
        data.forEach((itemData: ItemData, index: number) => {
          const country = countryObjects[index];
          itemData.column_values.forEach((column) => {
            const columnId = column.column.id;
            const value = JSON.parse(column.value);
            country.addData(columnId, value);
          });
        });
        setCountries((prevCountries) => [...prevCountries]);
      });
    });
  }, [category]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const cat = categoriesData.categories[1];
    setCategory(cat);
    mondayService.fetchColumns(cat).then((c: Header[]) => {
      setColumns(c);
      handleSearch("", cat);
    });
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
