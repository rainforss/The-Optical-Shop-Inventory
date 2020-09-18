import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";

const ItemList = ({ getItems, deleteItem, item, isAuthenticated }) => {
  useEffect(() => {
    getItems();
  }, [getItems]);

  const onDelete = (e) => {
    const id = e.target.name;
    deleteItem(id);
  };

  const { items } = item;
  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="item-list">
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                {isAuthenticated ? (
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    name={_id}
                    onClick={onDelete}
                  >
                    &times;
                  </Button>
                ) : (
                  ""
                )}

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
  deleteItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getItems, deleteItem })(
  React.memo(ItemList)
);
