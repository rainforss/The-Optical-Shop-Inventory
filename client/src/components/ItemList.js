import React, { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import {
  Container,
  Button,
  CardTitle,
  CardSubtitle,
  Card,
  Spinner,
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";
import { Image, Transformation, Placeholder } from "cloudinary-react";
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
import Footer from "./common/Footer";

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
  const { items, totalCount } = item;
  const { height, width } = useWindowDimensions();
  const [modalOpen, setModalOpen] = useState(false);
  const [serverError, setServerError] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  const [currentItem, setCurrentItem] = useState({});
  const [itemImage, setItemImage] = useState({});
  const [inputModified, setInputModified] = useState({});
  const [colorDropDownOpen, setColorDropDownOpen] = useState(false);
  const [colorSearchValue, setColorSearchValue] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [clearItems, setClearItems] = useState(false);
  const [itemFilters, setItemFilters] = useState({
    keywords: null,
    pageNum: 1,
    pageSize: 6,
    colorGroup: [],
    material: [],
    frameShape: [],
    frameType: [],
    hingeType: [],
    hasNosePads: [],
    itemType: [],
    sortBy: null,
  });

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
    setClearItems(true);
    setItemFilters({
      ...itemFilters,
      [filterName]: [...targetArray],
      pageNum: 1,
    });
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
    setItemFilters({ ...itemFilters, keywords: searchKeywords, pageNum: 1 });
  };

  const onDelete = (e) => {
    const id = e.target.name;
    const itemInfo = items.find((item) => item._id === id);
    const imgIds = {};
    if (itemInfo.hasFront) {
      imgIds.front = `${itemInfo.name}AND${itemInfo.barcode}FRONT`;
    }
    if (itemInfo.hasSide) {
      imgIds.side = `${itemInfo.name}AND${itemInfo.barcode}SIDE`;
    }
    deleteItem(id, imgIds);
  };
  const onChange = (e) => {
    setCurrentItem({
      ...currentItem,
      [e.target.name]: e.target.value,
    });
    setInputModified({ ...inputModified, [e.target.name]: true });
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onKeywordApply();
    }
  };

  const toggle = () => {
    if (modalOpen) {
      clearErrors();
      setInputModified({});
      setItemImage({});
    }
    setModalOpen(!modalOpen);
  };

  const changeImage = (e) => {
    setItemImage({ ...itemImage, [e.target.name]: e.target.files[0] });
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

    updateItem(updatedItem, itemImage, currentItem._id);
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
    getItems(itemFilters, clearItems);
    window.scrollBy(0, 1000);
  }, [itemFilters, clearItems]);
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
          xs={3}
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
          xs={3}
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
            sortName="Sort By"
            onClick={(e) => {
              setClearItems(true);
              setItemFilters({
                ...itemFilters,
                sortBy: e.currentTarget.name,
                pageNum: 1,
              });
            }}
            selected={itemFilters.sortBy}
          />
        </Col>
        <Col
          xs={6}
          sm={2}
          className="d-flex justify-content-start align-items-center"
        >
          <SortOptions
            options={[
              { text: "3 items per page", value: 3 },
              { text: "6 items per page", value: 6 },
              { text: "12 items per page", value: 12 },
              { text: "24 items per page", value: 24 },
              { text: "48 items per page", value: 48 },
            ]}
            sortName={`${itemFilters.pageSize} Per Page`}
            onClick={(e) => {
              setClearItems(true);
              setItemFilters({
                ...itemFilters,
                pageSize: e.currentTarget.name,
                pageNum: 1,
              });
            }}
            selected={itemFilters.pageSize}
          />
        </Col>
        <Col xs={12} sm={6}>
          <SearchBar
            onSearch={onKeywordApply}
            onKeyPress={onKeyPress}
            onChange={(e) => setSearchKeywords(e.target.value)}
            value={searchKeywords}
          />
        </Col>
      </Row>

      <Container>
        <div className="item-list d-flex flex-wrap justify-content-start">
          {items
            ? items.map(
                ({
                  _id,
                  name,
                  barcode,
                  price,
                  row,
                  column,
                  colorGroup,
                  hasFront,
                  hasSide,
                  frontImageVersion,
                  sideImageVersion,
                  eyeSize,
                  bridgeWidth,
                  templeLength,
                }) => (
                  <Card
                    key={_id}
                    className="item-card mt-4 mb-4 ml-2 mr-2 d-flex flex-column justify-content-around align-items-center p-2"
                  >
                    {/* <CardImg
                        top
                        width="100%"
                        height="40%"
                        src={imageURL}
                        alt="Item image"
                      /> */}
                    <Container fluid className="p-0 flip-card">
                      <div className="flip-card-inner">
                        <div className="flip-card-front">
                          {/* <img
                              src={imageURL}
                              alt="Picture"
                              style={{ width: "100%", height: "100%" }}
                            /> */}
                          <Image
                            cloudName="rainforss"
                            loading="lazy"
                            publicId={
                              hasFront ? `${name}AND${barcode}FRONT` : "sample"
                            }
                            version={frontImageVersion}
                          >
                            <Placeholder type="pixelate" />
                            <Transformation
                              quality="auto"
                              fetchFormat="auto"
                              width={width < 410 ? "250" : "300"}
                              height={width < 410 ? "170" : "200"}
                              crop="scale"
                            />
                          </Image>
                        </div>
                        <div className="flip-card-back">
                          <Image
                            cloudName="rainforss"
                            loading="lazy"
                            publicId={
                              hasSide ? `${name}AND${barcode}SIDE` : "sample"
                            }
                            version={sideImageVersion}
                          >
                            <Transformation
                              quality="auto"
                              fetchFormat="auto"
                              width={width < 410 ? "250" : "300"}
                              height={width < 410 ? "170" : "200"}
                              crop="scale"
                            />
                          </Image>
                        </div>
                      </div>
                    </Container>
                    <CardTitle className="text-center font-weight-bold">
                      {name}
                    </CardTitle>
                    <CardSubtitle className="text-center">
                      Dimension: {eyeSize}-{bridgeWidth}-{templeLength}
                    </CardSubtitle>
                    <CardSubtitle className="text-center">
                      Color Group: {colorGroup}
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
                )
              )
            : null}
        </div>
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
      <Container
        style={{ height: "50vh" }}
        className={
          (item.loading ? "d-flex" : "d-none") +
          " justify-content-center align-items-center"
        }
      >
        <Spinner color="success" style={{ height: "50px", width: "50px" }} />
      </Container>
      {item.loading ? null : (
        <Footer
          progressText={`Displaying ${items.length} items out of ${totalCount}`}
          buttonText={
            items.length === totalCount ? "End of the list" : "Load more items"
          }
          value={items.length}
          max={totalCount}
          onClick={() => {
            setClearItems(false);
            setItemFilters({
              ...itemFilters,
              pageNum: itemFilters.pageNum + 1,
            });
          }}
        />
      )}
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
