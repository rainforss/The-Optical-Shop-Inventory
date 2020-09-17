import React, { useState } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuid from "uuid";

const ItemList = () => {
  const [items, setItems] = useState([
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
  ]);

  return (
    <Container>
      <Button
        color="dark"
        style={{ marginBottom: "2rem" }}
        onClick={() => {
          const name = prompt("Enter item");
          if (name) {
            setItems([...items, { id: uuid(), name }]);
          }
        }}
      >
        Add Item
      </Button>
      <ListGroup>
        <TransitionGroup className="item-list">
          {items.map(({ id, name }) => (
            <CSSTransition key={id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={() =>
                    setItems(items.filter((item) => item.id !== id))
                  }
                >
                  &times;
                </Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

export default React.memo(ItemList);
