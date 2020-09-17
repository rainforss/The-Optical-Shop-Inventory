import uuid from "uuid";
import * as types from "../actions/types";

const initialState = {
  items: [
    {
      id: uuid(),
      name: "Rayban 1105",
      barcode: "100001",
      row: 1,
      column: 1,
      price: "259.99",
      itemType: "Sunglasses",
      inStock: true,
      lastModifiedBy: "jake@gmail.com",
    },
    {
      id: uuid(),
      name: "Rayban 1305",
      barcode: "100002",
      row: 1,
      column: 2,
      price: "259.99",
      itemType: "Sunglasses",
      inStock: true,
      lastModifiedBy: "jake@gmail.com",
    },
    {
      id: uuid(),
      name: "Rayban 2107",
      barcode: "100003",
      row: 2,
      column: 1,
      price: "259.99",
      itemType: "Sunglasses",
      inStock: true,
      lastModifiedBy: "jake@gmail.com",
    },
    {
      id: uuid(),
      name: "Rayban 5105",
      barcode: "100004",
      row: 2,
      column: 2,
      price: "259.99",
      itemType: "Sunglasses",
      inStock: true,
      lastModifiedBy: "jake@gmail.com",
    },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_ITEMS:
      return {
        ...state,
      };
    default:
      return state;
  }
}
