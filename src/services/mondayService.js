import mondaySdk from "monday-sdk-js";
import { GET_BOARDS_COLUMNS, GET_BOARDS_ITEMS_PAGE, GET_ITEMS, GET_ALL_ITEMS_PAGE } from '../graphql/queries';

const monday = mondaySdk();

export const fetchColumns = async (cat) => {
  try {
    const response = await monday.api(GET_BOARDS_COLUMNS);
    return response.data.boards[0].columns.filter(item => cat.data.includes(item.id));
  } catch (error) {
    console.error("Error fetching columns:", error);
  }
};

export const fetchAllItemsPage = async () => {
  const response = await monday.api(GET_ALL_ITEMS_PAGE);
  return response.data.boards[0].items_page.items;
};

export const fetchFilteredItemsPage = async (compareValue) => {
  const response = await monday.api(GET_BOARDS_ITEMS_PAGE, {
    variables: { columnId: "name", compareValue },
  });
  return response.data.boards[0].items_page.items;
};

export const fetchItemsPage = async (value) => {
  try {
    if (!value || !value.trim())
      return await fetchAllItemsPage();
    else
      return await fetchFilteredItemsPage(value);
  } catch (error) {
    console.error("Error fetching items page:", error);
  }
};

export const fetchItems = async (columns, ids) => {
  if (ids.length === 0) {
    return;
  }
  try {
    const response = await monday.api(GET_ITEMS, {
      variables: { columns, ids },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};
