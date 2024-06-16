export const GET_BOARDS_COLUMNS = `
  query {
    boards {
      columns {
        id
        title
        type
      }
    }
  }
`;

export const GET_BOARDS_ITEMS_PAGE = `
  query GetBoardsItemsPage($columnId: ID!, $compareValue: CompareValue!) {
    boards {
      items_page(
        query_params: {
          rules: [
            { column_id: $columnId, compare_value: $compareValue, operator: contains_text }
          ]
        }
      ) {
        items {
          id
          name
        }
      }
    }
  }
`;

export const GET_ALL_ITEMS_PAGE = `
  query GetAllItemsPage {
    boards {
      items_page {
        items {
          id
          name
        }
      }
    }
  }
`;

// export const GET_ITEMS = `
//   query GetItems($ids: [ID!]!) {
//     items(ids: $ids) {
//       column_values {
//         column {
//           id
//           title
//         }
//         id
//         type
//         value
//       }
//     }
//   }
// `;

export const GET_ITEMS = `
  query GetItems($ids: [ID!]!, $columns: [String!]!) {
    items(ids: $ids) {
      id
      column_values(ids: $columns) { 
        column {
          id
          title
        }
        id
        type
        value
      }
    }
  }
`;