import React from "react";
import ItemList from "../ItemList";
import ItemModal from "../ItemModal";
import SiteBanner from "../SiteBanner";

const ItemsPage = () => {
  return (
    <>
      <SiteBanner />
      <ItemModal />
      <ItemList />
    </>
  );
};

export default ItemsPage;
