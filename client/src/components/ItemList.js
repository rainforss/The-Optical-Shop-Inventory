import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  CardTitle,
  CardSubtitle,
  Card,
  CardImg,
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import {
  getItems,
  deleteItem,
  updateItem,
  resetStatus,
  searchTerm,
} from "../actions/itemActions";
import { clearErrors } from "../actions/errorActions";
import PropTypes from "prop-types";
import ModifyModal from "./common/ModifyModal";
import validate from "./common/validation";
import SearchBar from "./common/SearchBar";

const ItemList = ({
  getItems,
  deleteItem,
  item,
  isAuthenticated,
  updateItem,
  searchTerm,
  resetStatus,
  error,
  clearErrors,
}) => {
  const { items } = item;
  const [modalOpen, setModalOpen] = useState(false);
  const [serverError, setServerError] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  const [currentItem, setCurrentItem] = useState({});
  const [inputModified, setInputModified] = useState({});
  const [keyWords, setKeyWords] = useState("");

  const onDelete = (e) => {
    const id = e.target.name;
    deleteItem(id);
  };
  const onChange = (e) => {
    setCurrentItem({
      ...currentItem,
      [e.target.name]: e.target.value,
    });
    setInputModified({ ...inputModified, [e.target.name]: true });
  };

  const toggle = () => {
    setModalOpen(!modalOpen);
    clearErrors();
    setInputModified({});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errorFree = validate(currentItem, setInputErrors).Form();
    if (!errorFree) return;
    const updatedItem = {
      name: currentItem.name,
      barcode: currentItem.barcode,
      row: currentItem.row,
      column: currentItem.column,
      price: currentItem.price,
      inStock:
        currentItem.inStock === "YES" || currentItem.inStock === true
          ? true
          : false,
      itemType: currentItem.itemType,
    };
    updateItem(updatedItem, currentItem._id);
  };

  const onView = (e) => {
    const _currentItemId = e.target.name;
    setCurrentItem(items.find((item) => item._id === _currentItemId));
    toggle();
  };

  useEffect(() => {
    validate(currentItem, setInputErrors).realTime(inputModified);
  }, [currentItem]);
  useEffect(() => {
    searchTerm(keyWords);
    console.log(keyWords);
    if (error.id === "ITEM_ERROR") {
      setServerError({ msg: error.msg.msg });
    } else {
      setServerError({ msg: null });
    }
    if (modalOpen) {
      if (item.actionSuccess) {
        resetStatus();
        toggle();
      }
    }
  }, [error, keyWords, item.actionSuccess, modalOpen]);
  return (
    <>
      <SearchBar
        onChange={(e) => setKeyWords(e.target.value)}
        value={keyWords}
      />
      <Container>
        <TransitionGroup className="item-list d-flex flex-wrap justify-content-start">
          {items.map(({ _id, name, barcode, price, row, column, imageURL }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <Card className="item-card mt-4 mb-4 ml-2 mr-2 d-flex flex-column justify-content-around align-items-center p-2">
                <CardImg
                  top
                  width="100%"
                  height="40%"
                  src={imageURL}
                  alt="Item image"
                />
                <CardTitle className="text-center font-weight-bold">
                  {name}
                </CardTitle>
                <CardSubtitle className="text-center">
                  Barcode: {barcode}
                </CardSubtitle>
                <CardSubtitle className="text-center">
                  Price: {price} CAD
                </CardSubtitle>
                <CardSubtitle className="text-center">
                  Position: {row},{column}
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
                <Button
                  className="update-btn"
                  color="info"
                  name={_id}
                  onClick={onView}
                >
                  View Details
                </Button>
              </Card>
            </CSSTransition>
          ))}
        </TransitionGroup>
        <ModifyModal
          modalOpen={modalOpen}
          toggle={toggle}
          currentItem={currentItem}
          inputErrors={inputErrors}
          onChange={onChange}
          onSubmit={onSubmit}
          serverError={serverError}
          isAuthenticated={isAuthenticated}
        />
      </Container>
    </>
  );
};

ItemList.propTypes = {
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  updateItem: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  resetStatus: PropTypes.func.isRequired,
  searchTerm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.error,
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getItems,
  deleteItem,
  updateItem,
  searchTerm,
  resetStatus,
  clearErrors,
})(React.memo(ItemList));
