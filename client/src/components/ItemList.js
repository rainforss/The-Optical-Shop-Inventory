import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  CardTitle,
  CardSubtitle,
  Card,
  CardImg,
  Spinner,
  Row,
  Col,
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import {
  getItems,
  deleteItem,
  updateItem,
  resetStatus,
} from "../actions/itemActions";
import { clearErrors } from "../actions/errorActions";
import PropTypes from "prop-types";
import ModifyModal from "./common/ModifyModal";
import validate from "./common/validation";
import SearchBar from "./common/SearchBar";
import { toast } from "react-toastify";
import Filter from "./Filter";
import SortOptions from "./common/SortOptions";

const ItemList = ({
  getItems,
  deleteItem,
  item,
  isAuthenticated,
  updateItem,
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
  const [colorDropDownOpen, setColorDropDownOpen] = useState(false);
  const [colorSearchValue, setColorSearchValue] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [itemFilters, setItemFilters] = useState({
    keywords: null,
    pageNum: null,
    pageSize: null,
    colorGroup: [],
    material: [],
    frameShape: [],
    frameType: [],
    hingeType: [],
    hasNosePads: [],
    itemType: [],
    sortBy: null,
  });

  // const [itemQuery, setItemQuery] = useState({
  //   keywords: null,
  //   pageNum: null,
  //   pageSize: null,
  //   priceMax: null,
  //   priceMin: null,
  //   colorGroup: null,
  //   material: null,
  //   eyeSizeMax: null,
  //   eyeSizeMin: null,
  //   templeLengthMax: null,
  //   templeLengthMin: null,
  //   frameShape: null,
  //   frameType: null,
  //   hingeType: null,
  //   nosePads: null,
  //   eyewearType: null,
  // });

  const toggleColorDropDown = () => {
    setColorDropDownOpen(!colorDropDownOpen);
  };

  const onColorSelect = (e) => {
    setCurrentItem({
      ...currentItem,
      frameColor: e.currentTarget.name,
      colorGroup: e.currentTarget.dataset.group,
    });
    setInputModified({ ...inputModified, [e.currentTarget.name]: true });
  };

  const onFilterSelect = (e) => {
    const filterName = e.target.name;
    const targetArray = [...itemFilters[filterName]];
    if (targetArray.includes(e.target.dataset.name)) {
      const index = targetArray.findIndex(
        (element) => element === e.target.dataset.name
      );
      targetArray.splice(index, 1);
    } else {
      targetArray.push(e.target.dataset.name);
    }
    setItemFilters({ ...itemFilters, [filterName]: [...targetArray] });
  };

  const removeFilter = (e) => {
    const filterName = e.currentTarget.name;
    const value = e.currentTarget.value;
    const targetArray = [...itemFilters[filterName]];
    const index = targetArray.findIndex((element) => element === value);
    targetArray.splice(index, 1);
    setItemFilters({ ...itemFilters, [filterName]: [...targetArray] });
  };

  const onKeywordApply = () => {
    setItemFilters({ ...itemFilters, keywords: searchKeywords });
  };

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

  // const onSearch = (e) => {
  //   // setItemQuery({...itemQuery,keywords:})
  //   getItems(itemQuery);
  // };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onKeywordApply();
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
      inStock: currentItem.inStock,
      itemType: currentItem.itemType,
      eyeSize: currentItem.eyeSize,
      bridgeWidth: currentItem.bridgeWidth,
      templeLength: currentItem.templeLength,
      material: currentItem.material,
      frameShape: currentItem.frameShape,
      frameType: currentItem.frameType,
      frameColor: currentItem.frameColor,
      colorGroup: currentItem.colorGroup,
      hingeType: currentItem.hingeType,
      hasNosePads: currentItem.hasNosePads,
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
    getItems(itemFilters);
  }, [itemFilters]);
  useEffect(() => {
    if (error.id === "ITEM_ERROR") {
      setServerError({ msg: error.msg.msg });
    } else {
      setServerError({ msg: null });
    }
    if (modalOpen) {
      if (item.actionSuccess) {
        toast.success("Changes have been saved succesfully.");
        resetStatus();
        toggle();
      }
    }
  }, [error, item.actionSuccess, modalOpen]);

  return (
    <>
      <Row>
        <Col
          xs={4}
          sm={2}
          className="d-flex justify-content-start align-items-center"
        >
          <Filter
            filterOpen={filterOpen}
            toggleFilter={() => {
              setFilterOpen(!filterOpen);
            }}
            onChange={onFilterSelect}
            filterInfo={itemFilters}
            removeFilter={removeFilter}
            applyFilter={() => {
              setFilterOpen(!filterOpen);
            }}
          />
        </Col>
        <Col
          xs={4}
          sm={2}
          className="d-flex justify-content-start align-items-center"
        >
          <SortOptions
            options={[
              { text: "Price:low to high", value: "price asc" },
              { text: "Price:high to low", value: "price desc" },
              { text: "Eyesize:low to high", value: "eyeSize asc" },
              { text: "Eyesize:high to low", value: "eyeSize desc" },
              { text: "Temple length:low to high", value: "templeLength asc" },
              { text: "Temple length:high to low", value: "templeLength desc" },
            ]}
            onClick={(e) =>
              setItemFilters({ ...itemFilters, sortBy: e.currentTarget.name })
            }
            selected={itemFilters.sortBy}
          />
        </Col>
        <Col xs={12} sm={8}>
          <SearchBar
            onSearch={onKeywordApply}
            onKeyPress={onKeyPress}
            onChange={(e) => setSearchKeywords(e.target.value)}
            value={searchKeywords}
          />
        </Col>
      </Row>

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
          colorDropDownOpen={colorDropDownOpen}
          toggleColorDropDown={toggleColorDropDown}
          colorSearchValue={colorSearchValue}
          onColorSelect={onColorSelect}
          changeSearchValue={(e) => setColorSearchValue(e.target.value)}
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
  resetStatus,
  clearErrors,
})(ItemList);
