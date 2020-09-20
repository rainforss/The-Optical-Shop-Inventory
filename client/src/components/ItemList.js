import React, { useEffect } from "react";
import { Container, Button, CardTitle, CardSubtitle, Card } from "reactstrap";
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
      <TransitionGroup className="item-list d-flex flex-wrap justify-content-around">
        {items.map(({ _id, name, barcode, price, itemType }) => (
          <CSSTransition key={_id} timeout={500} classNames="fade">
            <Card className="item-card mt-4 mb-4 d-flex flex-column justify-content-around align-items-center">
              <CardTitle className="text-center">{name}</CardTitle>
              <CardSubtitle className="text-center">
                Barcode: {barcode}
              </CardSubtitle>
              <CardSubtitle className="text-center">
                Price: {price} CAD
              </CardSubtitle>
              <CardSubtitle className="text-center">
                Type: {itemType}
              </CardSubtitle>
              {isAuthenticated ? (
                <Button
                  className="remove-btn"
                  color="danger"
                  name={_id}
                  onClick={onDelete}
                >
                  Remove Item
                </Button>
              ) : (
                ""
              )}
            </Card>
          </CSSTransition>
        ))}
      </TransitionGroup>
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
