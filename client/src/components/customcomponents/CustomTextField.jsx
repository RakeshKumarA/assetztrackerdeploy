import React from "react";

//Formik Imports
import { Field } from "formik";

//Formik Material ui
import { TextField } from "formik-material-ui";

const CustomTextField = ({
  variant,
  color,
  InputLabelProps,
  InputProps,
  fullWidth,
  size,
  ...props
}) => {
  return (
    <Field
      component={TextField}
      variant="outlined"
      color="secondary"
      fullWidth={true}
      size={"small"}
      {...props}
    >
      {props.children}
    </Field>
  );
};

export default CustomTextField;
