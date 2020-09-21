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
      if (inputModified.barcode && itemInfo.barcode.trim().length < 4) {
        errors.barcode = "Barcode contains at least 4 digits";
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
      if (itemInfo.barcode.trim().length < 4) {
        errors.barcode = "Barcode contains at least 4 digits";
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
  };
}
