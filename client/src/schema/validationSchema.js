import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  email: yup.string().email("Not a Valid Email").required("Email required"),
  password: yup.string().required("Password required"),
});

export const adminFormValidationSchema = yup.object().shape({
  email: yup.string().email("Not a Valid Email").required("Email required"),
  password: yup.string().required("Password required"),
  name: yup
    .string()
    .required("First Name Required")
    .max(12, "Maximum 12 Characters"),
});

export const onboardValidationSchema = yup.object().shape({
  assetId: yup.string().required("Asset id Required"),
  location: yup.string().required("Location is Required"),
});

export const softwareValidationSchema = yup.object().shape({
  softwareName: yup.string().required("Required"),
});

export const hardwareValidationSchema = yup.object().shape({
  hardwareName: yup.string().required("Required"),
});

export const depreciationValidationSchema = yup.object().shape({});
