export default function validate(itemInfo, setErrors) {
  return {
    realTime: (inputModified) => {
      const errors = {};
      if (inputModified.name && itemInfo.name.trim().length < 6) {
        errors.name =
          "Please enter brand name and model number, at least 6 characters";
      } else {
        errors.name = "";
      }
      if (inputModified.eyeSize && itemInfo.eyeSize.trim().length < 2) {
        errors.eyeSize = "Eye size contains at least 2 digits";
      } else {
        errors.eyeSize = "";
      }
      if (inputModified.bridgeWidth && itemInfo.bridgeWidth.trim().length < 2) {
        errors.bridgeWidth = "Bridge width contains at least 2 digits";
      } else {
        errors.bridgeWidth = "";
      }
      if (
        inputModified.templeLength &&
        itemInfo.templeLength.trim().length < 3
      ) {
        errors.templeLength = "Temple length contains at least 3 digits";
      } else {
        errors.templeLength = "";
      }
      if (inputModified.barcode && itemInfo.barcode.trim().length < 6) {
        errors.barcode = "Barcode contains at least 6 digits";
      } else {
        errors.barcode = "";
      }
      if (inputModified.row && itemInfo.row.trim().length === 0) {
        errors.row = "You must enter a row number";
      } else {
        errors.row = "";
      }

      if (inputModified.column && itemInfo.column.trim().length === 0) {
        errors.column = "You must enter a column number";
      } else {
        errors.column = "";
      }
      if (inputModified.price && itemInfo.price.trim().length === 0) {
        errors.price = "You must enter item's price";
      } else {
        errors.price = "";
      }
      setErrors(errors);
    },
    Form: () => {
      const errors = {};
      let errorNumber = 0;
      if (itemInfo.name.trim().length < 6) {
        errors.name =
          "Please enter brand name and model number, at least 6 characters";
        errorNumber++;
      } else {
        errors.name = "";
      }
      if (itemInfo.eyeSize.trim().length < 2) {
        errors.eyeSize = "Eye size contains at least 2 digits";
        errorNumber++;
      } else {
        errors.eyeSize = "";
      }
      if (itemInfo.bridgeWidth.trim().length < 2) {
        errors.bridgeWidth = "Bridge width contains at least 2 digits";
        errorNumber++;
      } else {
        errors.bridgeWidth = "";
      }
      if (itemInfo.templeLength.trim().length < 3) {
        errors.templeLength = "Temple length contains at least 3 digits";
        errorNumber++;
      } else {
        errors.templeLength = "";
      }
      if (itemInfo.barcode.trim().length < 6) {
        errors.barcode = "Barcode contains at least 6 digits";
        errorNumber++;
      } else {
        errors.barcode = "";
      }
      if (itemInfo.row.trim().length === 0) {
        errors.row = "You must enter a row number";
        errorNumber++;
      } else {
        errors.row = "";
      }

      if (itemInfo.column.trim().length === 0) {
        errors.column = "You must enter a column number";
        errorNumber++;
      } else {
        errors.column = "";
      }
      if (itemInfo.price.trim().length === 0) {
        errors.price = "You must enter item's price";
        errorNumber++;
      } else {
        errors.price = "";
      }
      setErrors(errors);

      return errorNumber === 0;
    },
    Shape: () => {
      const regex = RegExp("^[a-zA-Z ]*$");
      const errors = {};
      let errorNumbers = 0;
      if (itemInfo.value.trim().length < 6) {
        errors.value = "Frame shape name must contain at least 6 characters";
        errorNumbers++;
      }
      if (!regex.test(itemInfo.value)) {
        errors.value = "Frame shape name can only contain letters or spaces";
        errorNumbers++;
      }

      setErrors(errors);
      return errorNumbers === 0;
    },
    ShapeRealTime: (inputModified) => {
      const regex = RegExp("^[a-zA-Z ]*$");
      const errors = {};
      if (inputModified.value && itemInfo.value.trim().length < 6) {
        errors.value = "Frame shape name must contain at least 6 characters";
      } else if (inputModified.value && !regex.test(itemInfo.value)) {
        errors.value = "Frame shape name can only contain letters or spaces";
      } else {
        errors.value = "";
      }

      setErrors(errors);
    },
  };
}
