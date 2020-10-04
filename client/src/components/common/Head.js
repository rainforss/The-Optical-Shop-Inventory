import React from "react";
import { Helmet } from "react-helmet";

const Head = () => {
  return (
    <Helmet>
      <meta
        name="description"
        content="Inventory management application for The Optical Shop On Whyte. Designed for professional optometrists and opticians, inventory management is only part of the app. Boost your sales and improve customer satisfaction using the well-rounded search filters, find the exact styles your customers need."
      />
      <meta
        name="title"
        property="og:title"
        content="The Optical Shop On Whyte IMS"
      />
      <meta property="og:type" content="Website" />
      <meta
        name="image"
        property="og:image"
        content="https://res.cloudinary.com/rainforss/image/upload/v1601784856/opticalshopIMS_qluwrf.png"
      />
      <meta
        name="description"
        property="og:description"
        content="Inventory management application for The Optical Shop On Whyte. Designed for professional optometrists and opticians, inventory management is only part of the app. Boost your sales and improve customer satisfaction using the well-rounded search filters, find the exact styles your customers need."
      />
      <meta name="author" content="Jake Chen" />
    </Helmet>
  );
};

export default Head;
