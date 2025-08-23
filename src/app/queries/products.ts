import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
   products {
    id
    name
    price
    category {
      id
      name
    }
    image
  }
  }
`;

export const GET_CATEGORIES = gql`
  query {
    categories {
      id
      name
    }
  }
`;

export const FILTER_PRODUCTS = gql`
  query FilterProducts($categoryId: ID, $minPrice: Int, $maxPrice: Int) {
    productsByFilter(categoryId: $categoryId, minPrice: $minPrice, maxPrice: $maxPrice) {
      id
      name
      price
      image
      category {
        id
        name
      }
    }
  }
`;