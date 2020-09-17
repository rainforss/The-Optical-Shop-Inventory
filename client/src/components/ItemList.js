import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuid from "uuid";
import { connect } from "react-redux";
import { getItems } from "../actions/itemActions";
import PropTypes from "prop-types";

const ItemList = ({ getItems, item }) => {
  useEffect(() => {
    getItems();
  }, [getItems]);
  console.log("run");
  const { items } = item;
  return (
    <Container>
      <Button color="dark" style={{ marginBottom: "2rem" }}>
        Add Item
      </Button>
      <ListGroup>
        <TransitionGroup className="item-list">
          {items.map(({ id, name }) => (
            <CSSTransition key={id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button className="remove-btn" color="danger" size="sm">
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

ItemList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { getItems })(React.memo(ItemList));
