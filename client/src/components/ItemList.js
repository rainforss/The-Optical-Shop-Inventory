import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Button,
  CardTitle,
  CardSubtitle,
  Card,
  CardImg,
  Spinner,
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
import { toast } from "react-toastify";

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
  const [itemImage, setItemImage] = useState();
  const [inputModified, setInputModified] = useState({});
  const [keyWords, setKeyWords] = useState("");

  const onDelete = (e) => {
    const id = e.target.name;
    const itemInfo = items.find((item) => item._id === id);
    const imgId = itemInfo.imageID;
    deleteItem(id, imgId);
  };
  const onChange = (e) => {
    setCurrentItem({
      ...currentItem,
      [e.target.name]: e.target.value,
    });
    setInputModified({ ...inputModified, [e.target.name]: true });
  };

  const onSearch = () => {
    searchTerm(keyWords);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      searchTerm(keyWords);
    }
  };

  const toggle = () => {
    if (modalOpen) {
      clearErrors();
      setInputModified({});
      setItemImage();
    }
    setModalOpen(!modalOpen);
  };

  const changeImage = (e) => {
    setItemImage(e.target.files[0]);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const errorFree = validate(currentItem, setInputErrors).Form();
    if (!errorFree) return;
    let file;
    if (itemImage) {
      file = new FormData();
      file.append("file", itemImage);
      file.append("public_id", `${currentItem.name}AND${currentItem.barcode}`);
    }
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

    updateItem(updatedItem, currentItem._id, file);
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
    getItems();
  }, []);
  useEffect(() => {
    if (error.id === "ITEM_ERROR") {
      setServerError({ msg: error.msg.msg });
    } else {
      setServerError({ msg: null });
    }
    if (modalOpen) {
      if (item.actionSuccess) {
        toast.success("Changes have been saved succesfully.");
        console.log("aped");
        resetStatus();
        toggle();
      }
    }
  }, [error, item.actionSuccess, modalOpen]);
  return (
    <>
      <SearchBar
        onSearch={onSearch}
        onKeyPress={onKeyPress}
        onChange={(e) => setKeyWords(e.target.value)}
        value={keyWords}
      />
      <Container
        style={{ height: "50vh" }}
        className={
          (item.loading ? "d-flex" : "d-none") +
          " justify-content-center align-items-center"
        }
      >
        <Spinner color="success" style={{ height: "50px", width: "50px" }} />
      </Container>
      <Container>
        <TransitionGroup className="item-list d-flex flex-wrap justify-content-start">
          {items
            ? items.map(
                ({ _id, name, barcode, price, row, column, imageURL }) => (
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
                )
              )
            : null}
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
          changeImage={changeImage}
          itemImage={itemImage}
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
})(ItemList);
