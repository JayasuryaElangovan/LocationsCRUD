import * as Yup from "yup";
export const validationSchema = Yup.object({
  branch_id: Yup.string()
    .min(3, "Must be at least 3 characters long")
    .max(10, "Must be max 10 characters or less")
    .required("Branch id is required"),
  address: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .max(50, "Must be max 50 characters or less")
    .required("Address field is required"),
  address2: Yup.string().max(50, "Must be max 50 characters or less"),
  city: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .max(30, "Must be max 30 characters or less")
    .required("City is required"),
  state: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .max(30, "Must be 30 characters or less")
    .required("State is required"),
  zip_code: Yup.string()
    .min(4, "Must be at least 4 characters long")
    .max(20, "Must be max 20 characters or less")
    .required("Zip Code  is required"),
  country: Yup.string()
    .min(2, "Must be 2 characters")
    .max(2, "Must be 2 characters")
    .required("Country is required"),
  country_description: Yup.string()
    .min(3, "Must be at least 3 charcaters long")
    .max(30, "Must be 30 characters or less ")
    .required("Country Description is required"),
});
